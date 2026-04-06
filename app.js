// App Exports
const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");

// App Setup
const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDb");
  })
  .catch(console.error);

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "69d373e50402eb435af6ddfe",
  };
  next();
});
app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
