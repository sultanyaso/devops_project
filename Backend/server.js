import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.js";
import userRoutes from "./src/routes/users.js";
import coachRoutes from "./src/routes/coaches.js";
import adminRoutes from "./src/routes/admin.js";
import sessionsRoutes from "./src/routes/sessions.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Middleware to log every request
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next(); // Pass control to the next middleware or route handler
});


// Database connection
const MONGODB_URI = process.env.MONGODB_URI;

try {
  await mongoose.connect(MONGODB_URI);
  console.log("MongoDB connected successfully");
} catch (error) {
  console.error("MongoDB connection error:", error);
}

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/coaches", coachRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/sessions", sessionsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
