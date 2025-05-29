const passport = require('passport');
const User = require('../models/User');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, name } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create new user
    const user = await User.create({
      username,
      email,
      password,
      name
    });
    
    // Log in the user after registration
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error logging in after registration' });
      }
      
      return res.status(201).json({
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
exports.loginUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      
      return res.json({
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name
      });
    });
  })(req, res, next);
};

// Logout user
exports.logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    
    res.status(200).json({ message: 'Successfully logged out' });
  });
};

// Get current user
exports.getCurrentUser = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  
  res.json({
    id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    name: req.user.name
  });
};