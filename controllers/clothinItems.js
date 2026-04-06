const ClothingItem = require("../models/clothingItem");
const ERRORS = require("../utils/error");

// GET /items
const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(ERRORS.SUCCESS.status).send(items))
    .catch((err) => {
      console.error(err);
      return res
        .status(ERRORS.SERVER_ERROR.status)
        .send({ message: ERRORS.SERVER_ERROR.message });
    });
};

// POST /items
const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(ERRORS.CREATED.status).send(item))
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

// DELETE /items/:itemId
const deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(ERRORS.SUCCESS.status).send(item))
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

// Likes and Dislikes
const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(ERRORS.SUCCESS.status).send(item))
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

const unlikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(ERRORS.SUCCESS.status).send(item))
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

module.exports = {
  getClothingItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
};
