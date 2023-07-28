const jwt = require("jsonwebtoken");
const secret = "thisIsMySecret";

function createToken(data) {
  return jwt.sign(data, secret);
}
function verifyToken(token) {
  //   try {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, data) => {
      if (err) throw Error("Token is not valid");
      resolve(data);
    });
  });
  //   } catch (error) {
  // error;
  //   }
}

module.exports = { createToken: createToken, verifyToken: verifyToken };
