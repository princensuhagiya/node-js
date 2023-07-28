const express = require("express");
var mongoose = require("mongoose");
const User = require("./model/User");
const cookieParser = require("cookie-parser");
const restrictToLoggedinUserOnly = require("./middleware/auth");
const { register } = require("./controllers/user");
const { auth } = require("./controllers/auth");
const authorize = require("./middleware/authorize");
const routes = require("./routes");
const app = express();
const CONNECTION_PORT =
  "mongodb+srv://princesuhagiya:1234@cluster0.z3axyxi.mongodb.net/blog_app?retryWrites=true&w=majority";
const PORT = "3000";
app.set("view engine", "ejs");
app.use(routes);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
