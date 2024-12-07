import express from 'express';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Get all coaches
router.get('/', async (req, res) => {
  try {
    const coaches = await User.find({ role: 'coach' }).select('-password');
    res.json(coaches);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching coaches' });
  }
});

// Get coach by ID
router.get('/:id', async (req, res) => {
  try {
    const coach = await User.findOne({ _id: req.params.id, role: 'coach' }).select('-password');
    if (!coach) {
      return res.status(404).json({ message: 'Coach not found' });
    }
    res.json(coach);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching coach' });
  }
});

// Update coach profile (only accessible by the coach themselves or admin)
router.put('/:id', authenticateToken, authorizeRole(['coach', 'admin']), async (req, res) => {
  try {
    // Check if user is coach updating their own profile or admin
    if (req.user.role !== 'admin' && req.user.userId !== req.params.id) {
      return res.status(403).json({ message: 'Not authorized to update this profile' });
    }

    const updates = req.body;
    const coach = await User.findOne({ _id: req.params.id, role: 'coach' });
    
    if (!coach) {
      return res.status(404).json({ message: 'Coach not found' });
    }

    // Only allow updating certain fields
    const allowedUpdates = ['name', 'email', 'profilePicture'];
    const updateFields = Object.keys(updates);
    const isValidOperation = updateFields.every(field => allowedUpdates.includes(field));

    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates' });
    }

    updateFields.forEach(field => {
      coach[field] = updates[field];
    });

    await coach.save();
    res.json(coach);
  } catch (error) {
    res.status(500).json({ message: 'Error updating coach profile' });
  }
});

// Delete coach (admin only)
router.delete('/:id', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const coach = await User.findOneAndDelete({ _id: req.params.id, role: 'coach' });
    if (!coach) {
      return res.status(404).json({ message: 'Coach not found' });
    }
    res.json({ message: 'Coach deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting coach' });
  }
});

export default router;
