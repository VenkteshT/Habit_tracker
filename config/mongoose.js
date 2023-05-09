const mongoose = require("mongoose");

const DB = process.env.DATABASE;

const db = mongoose
  .connect(DB, {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connection success :)");
  })
  .catch((err) => {
    console.log("Error in connecting to database:", err.message);
  });

module.exports = db;
