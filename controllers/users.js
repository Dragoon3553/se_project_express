const User = require("../models/user");
const ERRORS = require("../utils/error");

// GET /users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(ERRORS.SUCCESS.status).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(ERRORS.SERVER_ERROR.status)
        .send({ message: ERRORS.SERVER_ERROR.message });
    });
};

// GET /users/:userId
const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(ERRORS.SUCCESS.status).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(ERRORS.NOT_FOUND.status)
          .send({ message: ERRORS.NOT_FOUND.message });
      } else if (err.name === "CastError") {
        return res
          .status(ERRORS.CAST_ERROR.status)
          .send({ message: ERRORS.CAST_ERROR.message });
      }
      return res
        .status(ERRORS.SERVER_ERROR.status)
        .send({ message: ERRORS.SERVER_ERROR.message });
    });
};

// POST /users
const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(ERRORS.CREATED.status).send(user))
    .catch((err) => {
      console.error(err);
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

module.exports = { getUsers, getUser, createUser };
