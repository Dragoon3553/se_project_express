const router = require("express").Router();
const {
  getClothingItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothinItems");

router.get("/", getClothingItems);
router.post("/", createItem);
router.delete("/:itemId", deleteItem);
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", unlikeItem);

module.exports = router;
