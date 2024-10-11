const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Token not found unauthorized user" });
    }
    token = token.split(" ")[1];
    // console.log("Received token:", token);
    let user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user.id;
    next();
  } catch (error) {
    // console.log("Unauthorized user ", error.message);
    res.status(401).json({ message: "Unauthorized user!" });
  }
};

module.exports = auth;
