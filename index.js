const express = require("express");
var mongoose = require("mongoose");
const User = require("./model/User");
const bcrypt = require("bcrypt");
const { register } = require("./controllers/user");
const { auth } = require("./controllers/auth");
const app = express();
const CONNECTION_PORT =
  "mongodb+srv://princesuhagiya:1234@cluster0.z3axyxi.mongodb.net/blog_app?retryWrites=true&w=majority";
const PORT = "3000";
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
const data = mongoose
  .connect(CONNECTION_PORT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/registor", (req, res) => {
  res.render("registor");
});
app.post("/registor", register);
app.post("/login", auth);
app.get("/login", (req, res) => {
  res.render("login");
});
