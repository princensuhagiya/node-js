/** @type {import('mongoose').Model} */
const bcrypt = require("bcrypt");
const User = require("../model/User");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Request} res
 */
exports.register = async (req, res) => {
  console.log(req.body);
  //   const user = new User({name: 'dummy'})
  //   user.name='dummy'

  //   await user.save()

  // const password = hash(req.body.password);

  const salt = await bcrypt.genSalt();
  const hashpassword = await bcrypt.hash(req.body.password, salt);
  console.log(salt);
  console.log(hashpassword);

  const user = await User.create({
    name: `${req.body.first_name} ${req.body.last_name}`,
    email: req.body.email,
    password: hashpassword,
  });
  res.redirect("/login");
};
