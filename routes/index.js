const express = require("express");
const restrictToLoggedinUserOnly = require("../middleware/auth");

const authorize = require("../middleware/authorize");
const { register } = require("../controllers/user");
const { auth } = require("../controllers/auth");
const { reset } = require("../controllers/reset");
// const { route } = require("./auth");
// const router = express.Router();
// router.use("/auth", require("./auth"));

module.exports = router;
