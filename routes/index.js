const router = require("express").Router();
const auth = require("../middlewares/auth");

// Error Constructor Imports
const NotFoundError = require("../errors/not-found-err");

const { createUser, loginUser } = require("../controllers/users");
const userRouter = require("./users");
const itemRouter = require("./clothingItems");

router.post("/signup", createUser);
router.post("/signin", loginUser);
router.use("/items", itemRouter);
router.use("/users", auth, userRouter);
router.use((req, res) => {
  throw new NotFoundError("The requested resource was not found");
});

module.exports = router;
