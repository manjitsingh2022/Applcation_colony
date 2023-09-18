
const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');
const { protect, adminMiddleware } = require('../middleware/authMiddleware');

// Create a new notice
router.post('/notices', protect, adminMiddleware, noticeController.createNotice);

// Get all notices
router.get('/notices', protect, noticeController.getAllNotices);

// Get a specific notice by ID
router.get('/notices/:id', protect, adminMiddleware, noticeController.getNoticeById);

// Update a notice by ID
router.put('/notices/:id', protect, adminMiddleware, noticeController.updateNotice);


// Delete all notices
router.delete('/notices/allDelete', noticeController.deleteAllNotice);

// Delete a notice by ID
router.delete('/notices/:id', protect, adminMiddleware, noticeController.deleteNotice);




module.exports = router;
