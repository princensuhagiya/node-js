const { Schema, model } = require("mongoose");

const UserShceme = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: "",
  },
});
module.exports = model("User", UserShceme);
