const express = require("express");
var mongoose = require("mongoose");
const User = require("./model/User");
const nodemailer = require("nodemailer");
const cookieParser = require("cookie-parser");
const restrictToLoggedinUserOnly = require("./middleware/auth");
const { register } = require("./controllers/user");
const { auth } = require("./controllers/auth");
const authorize = require("./middleware/authorize");
const bodyParser = require("body-parser");
const randomstring = require("randomstring");
// const routes = require("./routes");
const app = express();
const CONNECTION_PORT =
  "mongodb+srv://princesuhagiya:1234@cluster0.z3axyxi.mongodb.net/blog_app?retryWrites=true&w=majority";
const PORT = "3000";
app.set("view engine", "ejs");
// app.use(routes);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
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
  res.render("index");
});
app.get("/registor", (req, res) => {
  res.render("registor");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/reset", (req, res) => {
  res.render("reset-password");
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

const sendresetPasswordMail = async (req, res, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "princetesting@010@gmail.com",
        pass: "rznwibdetlinjiji",
      },
    });
    const mailOptions = {
      from: "princetesting@010@gmail.com",
      to: email,
      subject: "For Reset Password",
      html:
        "<p> Hii " +
        name +
        ',<a href="http://localhost:3000/reset-password' +
        token +
        '">Add reset your Password</a> </p>',
    };
    transporter.sendMail(mailOptions);
  } catch (error) {}
};

app.post("/reset", async (req, res) => {
  const email = req.body.email;
  const userReset = await User.findOne({ email: email });
  if (userReset) {
    const randomString = randomstring.generate();
    const data = await User.updateOne(
      { email: email },
      { $set: { token: randomString } }
    );
    sendresetPasswordMail(userReset.name, userReset.email, randomString);
  } else {
  }
});

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
