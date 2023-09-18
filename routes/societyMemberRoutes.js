const express = require('express');
const router = express.Router();
const societyMemberController = require('../controllers/societyMemberController');
const { protect, adminMiddleware } = require('../middleware/authMiddleware');

// Create a new society member
router.post('/societyMembers', protect, adminMiddleware, societyMemberController.createSocietyMember);

// Get all society members
router.get('/societyMembers', protect, societyMemberController.getAllSocietyMembers);

// Get a specific society member by ID
router.get('/societyMembers/:id', protect, adminMiddleware, societyMemberController.getSocietyMemberById);

// Update a specific society member by ID
router.put('/societyMembers/:id', protect, adminMiddleware, societyMemberController.updateSocietyMemberById);

// Delete a specific society member by ID
router.delete('/societyMembers/:id', protect, adminMiddleware, societyMemberController.deleteSocietyMemberById);

module.exports = router;
