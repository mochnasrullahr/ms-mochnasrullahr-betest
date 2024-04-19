const express = require('express');
const User = require('../models/userModel'); // Import User model

const router = express.Router();

// Create user (POST)
router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Error creating user' });
    }
});

// Get all users (GET)
router.get('/', async (req, res) => {
    try {
        
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err);
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Update user by ID
  router.put('/:id', async (req, res) => {
    const userId = req.params.id;
    const updates = req.body; // User data to update
  
    try {
      const user = await User.findByIdAndUpdate(userId, updates, { new: true }); // Return updated user
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Delete user by ID 
  router.delete('/:id', async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  module.exports = router;