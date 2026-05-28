// App Exports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Middleware Exports
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");

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
app.use(requestLogger);

app.use("/", mainRouter);

app.use(errorLogger); // enabling the error logger

app.use(errors()); // celebrate error handler
app.use(errorHandler); // centralized error handler

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
