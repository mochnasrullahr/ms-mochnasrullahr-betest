const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { emailAddress, password } = req.body; // Extract credentials

    // User validation
    const user = await User.findOne({ emailAddress });
    if (!user || !user.comparePassword(password)) { 
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const payload = { userId: user._id }; // Include user ID in payload
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3600s' }); // Token expires in 1 hour

    res.json({ token }); // Send the generated token in response
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
