const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { protect, adminMiddleware } = require('../middleware/authMiddleware');

// Create a new event
router.post('/events', protect, adminMiddleware, eventController.createEvent);

// Get all events
router.get('/events', protect, eventController.getAllEvents);

// Get a specific event by ID
router.get('/events/:id', protect, eventController.getEventById);

// Update a specific event by ID
router.put('/events/:id', protect, adminMiddleware, eventController.updateEventById);

// Delete a specific event by ID
router.delete('/events/:id', protect, adminMiddleware, eventController.deleteEventById);

module.exports = router;
