// src/models/adminModel.js
const mongoose = require("mongoose");
const User = require("./userModel");

const adminSchema = new mongoose.Schema({
  // Add any specific fields for Admin here
  permissions: {
    type: [String],
    default: ["read", "write", "delete"],
  },
});

const Admin = User.discriminator("Admin", adminSchema);

module.exports = Admin;
