const express = require('express');
const router = express.Router();
const { saveContactMessage, getContactMessages } = require('../../controllers/contactController');
const { isAuthenticated, isAdmin } = require('../../middleware/auth');

// Save contact message (public)
router.post('/', saveContactMessage);

// Get all contact messages (admin only)
router.get('/', isAuthenticated, getContactMessages);

module.exports = router;