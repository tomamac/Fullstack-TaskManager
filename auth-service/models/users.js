const mongoose = require("mongoose");
require("dotenv").config();

// const dbUrl = "mongodb://localhost:27017/taskitDB";
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to the Database"))
  .catch((err) => console.log("Database connection error: ", err));

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  displayname: { type: String },
});

let User = mongoose.model("users", userSchema);

module.exports = User;
