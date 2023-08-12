const express = require("express");
var mongoose = require("mongoose");
const User = require("./model/User");
const nodemailer = require("nodemailer");
const flash = require("connect-flash");
var session = require("express-session");
const cookieParser = require("cookie-parser");
const restrictToLoggedinUserOnly = require("./middleware/auth");
const { register } = require("./controllers/user");
const { auth } = require("./controllers/auth");
const authorize = require("./middleware/authorize");
const bodyParser = require("body-parser");
const randomstring = require("randomstring");
// const routes = require("./routes");
const app = express();

app.use(
  session({
    secret: "no-secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
const CONNECTION_PORT =
  "mongodb+srv://princesuhagiya:1234@cluster0.z3axyxi.mongodb.net/blog_app?retryWrites=true&w=majority";
const PORT = "3000";
app.set("view engine", "ejs");
// app.use(routes);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(flash());

const data = mongoose
  .connect(CONNECTION_PORT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(express.json());
//  Get Route Request

app.get("/", restrictToLoggedinUserOnly, (req, res) => {
  res.render("reset");
});

app.post("/reset", async (req, res) => {
  const token = req.query.token;
  const user = await User.findOne({ token: token });
  try {
    if (user) {
      const password = req.body.password;
      const confirm_password = req.body.confirm_password;
      if (password !== confirm_password) {
        res
          .status(200)
          .send({ success: false, msg: "Password and Conform Password" });
      }
      const UserData = await User.updateOne({ password: password });
      res.redirect("/login");
    } else {
      res
        .status(200)
        .send({ success: false, msg: "This Link has Been expire" });
    }
  } catch (error) {}
});

app.get("/registor", (req, res) => {
  res.render("registor");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/forgot", (req, res) => {
  res.render("forgot-password");
});
app.get("/private", authorize, (req, res) => {
  // console.log;
  res.send("my name is this");
});

// Post Route Request
app.post("/registor", register);
app.post("/login", auth);
app.get("/getcookie", (req, res) => {
  //show the saved cookies
  console.log(req.cookies);
  res.send(req.headers.cookie);

  const transporter = nodemailer.createTransport({
    host: "smtp.forwardemail.net",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM",
      pass: "REPLACE-WITH-YOUR-GENERATED-PASSWORD",
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
  }
  main().catch(console.error);
});

app.get("/reset", (req, res) => {
  res.render("reset");
});
app.post("/forgot", async (req, res) => {
  const email = req.body.email;
  // Record Find
  const userReset = await User.findOne({ email: email });
  if (userReset) {
    try {
      const randomString = randomstring.generate();
      const data = await User.updateOne(
        { email: email },
        { $set: { token: randomString } }
      );
      var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "935ecc33087887",
          pass: "c65da396544d93",
        },
      });

      const mailOptions = {
        from: "sender@email.com", // sender address
        to: "to@email.com", // list of receivers
        subject: "Subject of your email", // Subject line
        html: `<h2> ${email} Please click to this Link and reset your password <a href="http://localhost:3000/reset?token=${randomString}" style="color:blue;">reset your password</a></h2>`, // plain text body
      };
      transporter.sendMail(mailOptions, function(err, info) {
        if (err) console.log(err);
        else console.log(info);
      });
      res.status(200).json({ message: "SesscuesFull" });
    } catch (error) {
      console.log(error);
      res.status(error).json({ message: error });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
