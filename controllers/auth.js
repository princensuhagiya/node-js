const User = require("../model/User");
const read = (exports.auth = async (req, res) => {
  const userRecord = await User.find();
  // console.log(userRecord);
});

read();
