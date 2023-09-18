const express = require('express');
const router = express.Router();
const houseController = require('../controllers/houseController');
const { protect, adminMiddleware } = require('../middleware/authMiddleware');

// Create a new house
router.post('/houses', protect, adminMiddleware, houseController.createHouse);

// Get all houses
router.get('/houses', protect, houseController.getAllHouses);

// Get a specific house by ID
router.get('/houses/:id', protect, adminMiddleware, houseController.getHouseById);

// Update a specific house by ID
router.put('/houses/:id', protect, adminMiddleware, houseController.updateHouseById);

// Delete a specific house by ID
router.delete('/houses/:id', protect, adminMiddleware, houseController.deleteHouseById);

module.exports = router;
