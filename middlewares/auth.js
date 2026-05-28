const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

// Error Constructor Imports
const NotFoundError = require("../errors/not-found-err");
const BadRequestError = require("../errors/bad-request-err");
const UnauthorizedError = require("../errors/unathorized-err");
// const ERRORS = require("../utils/error");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError("Authorization header is missing or malformed");
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError("Invalid token");
  }

  req.user = payload;
  return next();
};

module.exports = auth;
