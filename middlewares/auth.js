const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const ERRORS = require("../utils/error");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(ERRORS.UNAUTHORIZED.status)
      .send({ message: ERRORS.UNAUTHORIZED.message });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error(err);
    return res
      .status(ERRORS.UNAUTHORIZED.status)
      .send({ message: ERRORS.UNAUTHORIZED.message });
  }

  req.user = payload;
  return next();
};

module.exports = auth;
