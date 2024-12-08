  import mongoose from "mongoose";

  const sessionsSchema = new mongoose.Schema(
    {
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
        type: Number,
        required: false,
      },
    },
    { timestamps: true }
  );

  sessionsSchema.methods.findById = async function (id) {
    return mongoose.model("Sessions").findOne({ _id: id });
  };

  sessionsSchema.methods.findByIdAndUpdate = async function (id, update) {
    return mongoose.model("Sessions").findOneAndUpdate({ _id: id }, update, {
      new: true,
    });
  };

  export default mongoose.model("Sessions", sessionsSchema);
