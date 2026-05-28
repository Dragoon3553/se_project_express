const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
// const ERRORS = require("../utils/error");

// Error Constructor Imports
const NotFoundError = require("../errors/not-found-err");
const BadRequestError = require("../errors/bad-request-err");
const ConflictError = require("../errors/conflict-err");
const UnauthorizedError = require("../errors/unathorized-err");

// GET /users/me
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => {
      if (!user) {
        throw new NotFoundError("No user with matching ID found");
      }

      res.send(user);
      // res.status(ERRORS.SUCCESS.status).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("The id string is in an invalid format"));
      } else {
        next(err);
      }
      // return res
      //   .status(ERRORS.SERVER_ERROR.status)
      //   .send({ message: ERRORS.SERVER_ERROR.message });
    });
};

// PATCH /users/me
const updateCurrentUser = (req, res, next) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => {
      if (!user) {
        throw new NotFoundError("No user with matching ID found");
      }

      res.send(user);
      // res.status(ERRORS.SUCCESS.status).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Unable to validate the user"));
      } else {
        next(err);
      }
    });
};

// POST /users
const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("The 'email' and 'password' fields are required");
    // return res.status(ERRORS.BAD_REQUEST.status).send({
    //   message: "The 'email' and 'password' fields are required",
    // });
  }

  return bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({ name, avatar, email, password: hash })
        .then((user) => {
          if (!user) {
            throw new NotFoundError("No user with matching ID found");
          }

          // Omit password from response
          const userObj = user.toObject();
          delete userObj.password;
          res.send(userObj);
          // res.status(ERRORS.CREATED.status).send(userObj);
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError("This resource already exists"));
            // return res
            //   .status(ERRORS.DUPLICATE_KEY.status)
            //   .send({ message: ERRORS.DUPLICATE_KEY.message });
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Unable to validate the user"));
        //   return res
        //     .status(ERRORS.VALIDATION_ERROR.status)
        //     .send({ message: ERRORS.VALIDATION_ERROR.message });
      } else {
        next(err);
      }
    });
};

// User login
const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("The 'email' and 'password' fields are required");
    // return res.status(ERRORS.BAD_REQUEST.status).send({
    //   message: ERRORS.BAD_REQUEST.message,
    // });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("No user with matching ID found");
      }

      // Authentication successful, generate token or set session here
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.send({ token });
    })
    .catch((err) => {
      // Authentication failed
      // if (err.name === "InvalidEmailError") {
      //   return res
      //     .status(ERRORS.INVALID_EMAIL.status)
      //     .send({ message: ERRORS.INVALID_EMAIL.message });
      // }
      if (err.name === "AuthenticationError") {
        next(new UnauthorizedError("Unauthorized to access resource"));
        // return res
        //   .status(ERRORS.UNAUTHORIZED.status)
        //   .send({ message: ERRORS.UNAUTHORIZED.message });
      } else {
        next(err);
      }
    });
};

// Controller exports
module.exports = {
  getCurrentUser,
  updateCurrentUser,
  createUser,
  loginUser,
};
