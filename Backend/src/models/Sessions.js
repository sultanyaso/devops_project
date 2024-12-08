import mongoose from "mongoose";

const sessionsSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    studentUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    coachUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
    meetingLink: {
      type: String,
      required: false,
    },
    sessionNotes: {
      type: String,
      required: false,
    },
    duration: {
      type: Number, // Duration in minutes
      required: false,
    },
    feedback: {
      type: String,
      required: false,
    },
    ratings: {
      type: Number, // Ratings out of 5
      required: false,
    },
  },
  { timestamps: true }
);

sessionsSchema.pre("save", async function (next) {
  this.updatedAt = Date.now();
  next();
});

sessionsSchema.pre("updateOne", async function (next) {
  this.updatedAt = Date.now();
  next();
});

sessionsSchema.methods.findById = async function (id) {
  return this.model("Session").findOne({ sessionId: id });
};

sessionsSchema.methods.findByIdAndUpdate = async function (id, update) {
  return this.model("Session").findOneAndUpdate({ sessionId: id }, update, {
    new: true,
  });
};

export default mongoose.model("Sessions", sessionsSchema);
