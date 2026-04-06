const router = require("express").Router();
const { NOT_FOUND } = require("../utils/error");

const userRouter = require("./users");
const itemRouter = require("./clothingItems");

router.use("/users", userRouter);
router.use("/items", itemRouter);
router.use((req, res) =>
  res.status(NOT_FOUND.status).send({ message: NOT_FOUND.message })
);

module.exports = router;
