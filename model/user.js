const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Pleae provide your email"],
    },
    password: {
      type: String,
      required: [true, "please enter your password"],
    },
    name: {
      type: String,
      required: [true, "please provide your name"],
    },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("User", userSchema);

module.exports = user;
