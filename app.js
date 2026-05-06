// App Exports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");

const { createUser, loginUser } = require("./controllers/users");
const auth = require("./middlewares/auth");

// App Setup
const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDb");
  })
  .catch(console.error);

app.use(cors());
// Middleware
app.use(express.json());
app.post("/signup", createUser);
app.post("/signin", loginUser);

app.use(auth);
app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
