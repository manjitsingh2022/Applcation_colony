
const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceRequestController');
const { protect, adminMiddleware } = require('../middleware/authMiddleware');


router.post('/maintenance-requests', protect, maintenanceController.createMaintenanceRequest);

// Get all maintenance requests
router.get('/maintenance-requests', protect, maintenanceController.getMaintenanceRequests);

router.put('/maintenance-requests/:id', protect, adminMiddleware, maintenanceController.updateMaintenanceRequestStatus);

router.delete('/maintenance-requests/:id', protect, adminMiddleware, maintenanceController.deleteMaintenanceRequest);

module.exports = router;
