const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.get("Authorization");
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }
  let decoded;
  try {
    decoded = jwt.verify(token, "secretKeyForToken");
    console.group(decoded);
  } catch (error) {
    req.isAuth = false;
    return next();
  }
  if (!decoded) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.userId = decoded.userId;
  return next();
};
