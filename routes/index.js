const express = require("express");
const restrictToLoggedinUserOnly = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const { register } = require("../controllers/user");
const { auth } = require("../controllers/auth");

const router = express.Router();
router.use("/auth", require("./auth"));
router.get("/", restrictToLoggedinUserOnly, (req, res) => {
  res.render("index");
});
router.get("/registor", (req, res) => {
  res.render("registor");
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/reset-pass", (req, res) => {
  res.render("reset-password");
});
router.get("/private", authorize, (req, res) => {
  // console.log;
  res.send("my name is this");
});

// Post Route Request
router.post("/registor", register);
router.post("/login", auth);

router.get("/getcookie", (req, res) => {
  //show the saved cookies
  console.log(req.cookies);

  res.send(req.headers.cookie);
});

module.exports = router;
