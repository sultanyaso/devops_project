const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "coach", "admin"],
    default: "student",
  },
  status: {
    type: String,
    enum: ["active", "pending", "suspended"],
    default: "pending",
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
