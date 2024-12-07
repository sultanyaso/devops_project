const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
  
      res.json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

router.post('/linkedin', async (req, res) => {
  try {
    const { code } = req.body;
    // Add LinkedIn authentication logic here
    // Exchange code for LinkedIn profile
    // Create/update user in database
    // Generate JWT token
    
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'LinkedIn authentication failed' });
  }
});

module.exports = router;