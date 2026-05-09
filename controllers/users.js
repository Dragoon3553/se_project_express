const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ERRORS = require("../utils/error");
const { JWT_SECRET } = require("../utils/config");

// GET /users/me
const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(ERRORS.SUCCESS.status).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(ERRORS.NOT_FOUND.status)
          .send({ message: ERRORS.NOT_FOUND.message });
      }
      if (err.name === "CastError") {
        return res
          .status(ERRORS.CAST_ERROR.status)
          .send({ message: ERRORS.CAST_ERROR.message });
      }
      return res
        .status(ERRORS.SERVER_ERROR.status)
        .send({ message: ERRORS.SERVER_ERROR.message });
    });
};

// PATCH /users/me
const updateCurrentUser = (req, res) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => {
      res.status(ERRORS.SUCCESS.status).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(ERRORS.NOT_FOUND.status)
          .send({ message: ERRORS.NOT_FOUND.message });
      }
      if (err.name === "ValidationError") {
        return res
          .status(ERRORS.VALIDATION_ERROR.status)
          .send({ message: ERRORS.VALIDATION_ERROR.message });
      }
      return res
        .status(ERRORS.SERVER_ERROR.status)
        .send({ message: ERRORS.SERVER_ERROR.message });
    });
};

// POST /users
const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  if (!email || !password) {
    return res.status(ERRORS.BAD_REQUEST.status).send({
      message: "The 'email' and 'password' fields are required",
    });
  }

  return bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({ name, avatar, email, password: hash })
        .then((user) => {
          // Omit password from response
          const userObj = user.toObject();
          delete userObj.password;
          res.status(ERRORS.CREATED.status).send(userObj);
        })
        .catch((err) => {
          console.error(err);
          if (err.name === "ValidationError") {
            return res
              .status(ERRORS.VALIDATION_ERROR.status)
              .send({ message: ERRORS.VALIDATION_ERROR.message });
          }
          if (err.code === 11000) {
            return res
              .status(ERRORS.DUPLICATE_KEY.status)
              .send({ message: ERRORS.DUPLICATE_KEY.message });
          }
          return res
            .status(ERRORS.SERVER_ERROR.status)
            .send({ message: ERRORS.SERVER_ERROR.message });
        });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(ERRORS.VALIDATION_ERROR.status)
          .send({ message: ERRORS.VALIDATION_ERROR.message });
      }
      return res
        .status(ERRORS.CAST_ERROR.status)
        .send({ message: ERRORS.CAST_ERROR.message });
    });
};

// User login
const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(ERRORS.BAD_REQUEST.status).send({
      message: ERRORS.BAD_REQUEST.message,
    });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // Authentication successful, generate token or set session here
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.send({ token });
    })
    .catch((err) => {
      // Authentication failed
      console.error(err);
      if (err.name === "InvalidEmailError") {
        return res
          .status(ERRORS.INVALID_EMAIL.status)
          .send({ message: ERRORS.INVALID_EMAIL.message });
      }
      if (err.name === "AuthenticationError") {
        return res
          .status(ERRORS.UNAUTHORIZED.status)
          .send({ message: ERRORS.UNAUTHORIZED.message });
      }
      return res
        .status(ERRORS.SERVER_ERROR.status)
        .send({ message: ERRORS.SERVER_ERROR.message });
    });
};

// Controller exports
module.exports = {
  getCurrentUser,
  updateCurrentUser,
  createUser,
  loginUser,
};
