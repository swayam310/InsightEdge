const express = require('express');
const router = express.Router();
const { uploadFileData, saveManualData, getUserData, getDashboardStats } = require('../../controllers/dataController');
const { isAuthenticated } = require('../../middleware/auth');
const upload = require('../../middleware/upload');

// All routes require authentication
router.use(isAuthenticated);

// Upload financial data file
router.post('/upload', upload.single('file'), uploadFileData);

// Save manually entered data
router.post('/manual', saveManualData);

// Get all financial data for a user
router.get('/', getUserData);

// Get dashboard statistics
router.get('/dashboard', getDashboardStats);

module.exports = router;