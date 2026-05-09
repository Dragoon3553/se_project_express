const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getClothingItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");

router.get("/", getClothingItems);

// Protecter routes with authentication middleware
router.use(auth);
router.post("/", createItem);
router.delete("/:itemId", deleteItem);
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", unlikeItem);

module.exports = router;
