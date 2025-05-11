const jwt = require("jsonwebtoken");

auth = (req, res, next) => {
  // const authHeader = req.header("Authorization");
  const cookie = req.cookies.jwt;

  if (!cookie)
    return res.status(401).json({ message: "No token, authorization denied" });

  // const token = cookie.split(" ")[1];

  try {
    const decoded = jwt.verify(cookie, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = auth;
