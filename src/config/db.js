import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(import.meta.env.VITE_MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;