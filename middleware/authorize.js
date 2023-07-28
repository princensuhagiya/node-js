const User = require("../model/User");
const { verifyToken } = require("../service/jwt");

module.exports = (req, res, next) => {
  try {
    const authorization = req.headers?.authorization;
    const token = authorization?.split(" ")[1];
    if (!token) return res.status(401).send("you are not authorize");
    else {
      const data = verifyToken(token);
      next();
    }
  } catch (error) {
    console.log({ error });
    return res.status(401).send("you are not authorize");
  }
  // if()
};
