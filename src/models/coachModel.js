// src/models/coachModel.js
const mongoose = require("mongoose");
const User = require("./userModel");

const coachSchema = new mongoose.Schema({
  // Add any specific fields for Coach here
  expertise: {
    type: String,
    required: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

const Coach = User.discriminator("Coach", coachSchema);

module.exports = Coach;
