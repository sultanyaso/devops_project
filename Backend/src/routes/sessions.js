import express from "express";
import Sessions from "../models/Sessions.js";

const router = express.Router();

// Create a new session
router.post("/create", async (req, res) => {
  try {
    const { title, date, time, duration, coachUserId, studentUserId } =
      req.body;

    if (!title || !date || !time || !coachUserId || !studentUserId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const session = new Sessions({
      title,
      date,
      time,
      duration,
      coachUserId,
      studentUserId,
    });

    await session.save();
    res.status(201).json({ message: "Session created successfully", session });
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ message: "Error creating session" });
  }
});

// Get all sessions
router.get("/", async (req, res) => {
  try {
    const sessions = await Sessions.find();
    res.json(sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ message: "Error fetching sessions" });
  }
});

// Get sessions by student ID
router.get("/student/:id", async (req, res) => {
  try {
    const sessions = await Sessions.find({ studentUserId: req.params.id });
    res.json(sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ message: "Error fetching sessions" });
  }
});

// Get sessions by coach ID
router.get("/coach/:id", async (req, res) => {
  try {
    const sessions = await Sessions.find({ coachUserId: req.params.id });
    res.json(sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ message: "Error fetching sessions" });
  }
});

// Get session by ID
router.get("/:id", async (req, res) => {
  try {
    const session = await Sessions.findOne({ _id: req.params.id });
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.json(session);
  } catch (error) {
    console.error("Error fetching session:", error);
    res.status(500).json({ message: "Error fetching session" });
  }
});

// Update session by ID
router.patch("/:id", async (req, res) => {
  try {
    const session = await Sessions.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.json({ message: "Session updated successfully", session });
  } catch (error) {
    console.error("Error updating session:", error);
    res.status(500).json({ message: "Error updating session" });
  }
});

// Delete session by ID
router.delete("/:id", async (req, res) => {
  try {
    const session = await Sessions.findOneAndDelete({
      _id: req.params.id,
    });
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.json({ message: "Session deleted successfully", session });
  } catch (error) {
    console.error("Error deleting session:", error);
    res.status(500).json({ message: "Error deleting session" });
  }
});

export default router;
