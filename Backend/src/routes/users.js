// users.js
import express from 'express';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Only allow updating certain fields
    const allowedUpdates = ['email', 'password'];
    const updateFields = Object.keys(updates);
    const isValidOperation = updateFields.every(field => allowedUpdates.includes(field));

    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates' });
    }

    updateFields.forEach(field => {
      user[field] = updates[field];
    });

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user profile' });
  }
});

// Delete user account
router.delete('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user account' });
  }
});

export default router;
