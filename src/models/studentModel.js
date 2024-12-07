// src/models/studentModel.js
const mongoose = require("mongoose");
const User = require("./userModel");

const studentSchema = new mongoose.Schema({
  // Add any specific fields for Student here
  //Generate Posts
    posts: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        },
  ],
  //Schedules Sessions
    sessions: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Session",
        },
    ],
    //network analysis
    network: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        },
    ],
});

const Student = User.discriminator("Student", studentSchema);

module.exports = Student;
