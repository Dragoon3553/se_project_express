const express = require("express");
const mongoose = require("mongoose");

// Server Port
const { PORT = 3001 } = process.env;

const app = express();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");
