const router = require("express").Router();
const { NOT_FOUND } = require("../utils/error");
const auth = require("../middlewares/auth");

const { createUser, loginUser } = require("../controllers/users");
const userRouter = require("./users");
const itemRouter = require("./clothingItems");

router.post("/signup", createUser);
router.post("/signin", loginUser);
router.use("/items", itemRouter);
router.use("/users", auth, userRouter);
router.use((req, res) =>
  res.status(NOT_FOUND.status).send({ message: NOT_FOUND.message })
);

module.exports = router;
