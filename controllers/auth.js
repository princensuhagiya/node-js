const User = require("../model/User");
const { createToken } = require("../service/jwt");
const bcrypt = require("bcrypt");
exports.auth = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    const isValid = await bcrypt.compare(req.body.password, user.password);
    let response = {};
    console.log({ isValid });
    if (isValid) {
      // generate token
      response.message = "login successfully";
      response.token = createToken({
        name: user.name,
        email: user.email,
        userId: user._id,
      });
      console.log(response.token);
    } else if (req.body.email !== user.email) {
      response.message = "Email is incorrect";
    } else {
      response.message = "password is incorrect";
    }
    if (response.token) {
      res.cookie("user", response.token, {
        // httpOnly: true,
      });
      return res.redirect("/");
    }

    res.send(response);
  } catch (error) {
    console.log(error);
  }
};
