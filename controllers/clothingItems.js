const ClothingItem = require("../models/clothingItem");

// Error Constructor Imports
const BadRequestError = require("../errors/bad-request-err");
const NotFoundError = require("../errors/not-found-err");
const ForbiddenError = require("../errors/forbidden-err");

// GET /items
const getClothingItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => {
      if (!items) {
        throw new NotFoundError("Unable to find Items");
      }

      res.send(items);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("The id string is in an invalid format"));
      } else {
        next(err);
      }
    });
};

// POST /items
const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      if (!item) {
        throw new NotFoundError("No item with matching ID found");
      }

      res.send(item);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Unable to validate item"));
      } else {
        next(err);
      }
    });
};

// DELETE /items/:itemId
const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (!item) {
        throw new NotFoundError("No item with matching ID found");
      }
      if (item.owner.toString() !== req.user._id) {
        // Check if the current user is the owner of the item
        throw new ForbiddenError(
          "You do not have permission to delete this item"
        );
      }
      // If the user is the owner, delete the item
      return ClothingItem.findByIdAndDelete(itemId).then((deletedItem) => {
        if (!deletedItem) {
          throw new NotFoundError("No item with matching ID found");
        }

        res.send(deletedItem);
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("The id string is in an invalid format"));
      } else {
        next(err);
      }
    });
};

// Likes and Dislikes
const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      if (!item) {
        throw new NotFoundError("No item with matching ID found");
      }

      res.send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("The id string is in an invalid format"));
      } else {
        next(err);
      }
    });
};

const unlikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      if (!item) {
        throw new NotFoundError("No item with matching ID found");
      }

      res.send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("The id string is in an invalid format"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getClothingItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
};
