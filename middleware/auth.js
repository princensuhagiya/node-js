const jwt = require("../service/jwt");

async function restrictToLoggedinUserOnly(req, res, next) {
  try {
    const userUid = req.cookies?.user;
    const user = await jwt.verifyToken(userUid);
    console.log(user);
    if (!userUid) return res.redirect("/login");
    // const user = userUid;

    if (!user) return res.redirect("/login");
    req.user = user;
    next();
  } catch (error) {
    res.redirect("/login");
  }
}
module.exports = restrictToLoggedinUserOnly;
