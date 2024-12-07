import express from 'express';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Get all users (admin only)
router.get('/users', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Update user status (admin only)
router.patch('/users/:id/status', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!['active', 'pending', 'suspended'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    user.status = status;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user status' });
  }
});

// Update user role (admin only)
router.patch('/users/:id/role', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!['student', 'coach', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    user.role = role;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user role' });
  }
});

// Delete user (admin only)
router.delete('/users/:id', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

export default router;
