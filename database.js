const mongoose = require("mongoose");
require("dotenv").config();
const local_link = process.env.LINK;
mongoose.connect(local_link, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});
const database = mongoose.connection;

database.on("connected", () => {
  console.log("connected to mongodb");
});

database.on("error", (err) => {
  console.error("error", err);
});

database.on("disconnected", () => {
  console.log("disconnected");
});

module.exports = database;
