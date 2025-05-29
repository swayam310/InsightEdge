const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getCurrentUser } = require('../../controllers/authController');
const { isAuthenticated } = require('../../middleware/auth');

// Register a new user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Logout user
router.post('/logout', logoutUser);

// Get current user
router.get('/user', getCurrentUser);

module.exports = router;