const express = require('express');
const User = require('../models/users');
const { generateToken } = require('../utils/jwt');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Signup Route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    // Generate JWT token
    const token = generateToken(newUser._id);

    res.status(201).json({ token, user: { username: newUser.username, email: newUser.email } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    res.json({ token, user: { username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
