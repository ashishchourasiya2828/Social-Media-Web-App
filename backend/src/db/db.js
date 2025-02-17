const mongoose = require("mongoose");
const config = require("../config/config");

function db() {
  mongoose
    .connect(config.MONGO_URI)
    .then(() => {
      console.log("connect to database");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = db;
