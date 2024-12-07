<<<<<<< HEAD
import mongoose from "mongoose";  
=======
import mongoose from "mongoose";
>>>>>>> 20368886c02c76c9c6a4fc04affcf7fc5788f61d

const connectDB = async () => {
  try {
    await mongoose.connect(import.meta.env.VITE_MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
<<<<<<< HEAD
=======
      useCreateIndex: true,
>>>>>>> 20368886c02c76c9c6a4fc04affcf7fc5788f61d
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;