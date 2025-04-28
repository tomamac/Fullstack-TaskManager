const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  displayname: { type: String },
});

module.exports = mongoose.model("users", userSchema);
