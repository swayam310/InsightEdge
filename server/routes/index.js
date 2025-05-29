const express = require('express');
const router = express.Router();
const authRoutes = require('./api/auth');
const dataRoutes = require('./api/data');
const contactRoutes = require('./api/contact');

// API routes
router.use('/auth', authRoutes);
router.use('/data', dataRoutes);
router.use('/contact', contactRoutes);

module.exports = router;