const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceRequestController');
const { protect, adminMiddleware } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Maintenance Requests
 *   description: Maintenance request management APIs
 */

/**
 * @swagger
 * /maintenance-requests:
 *   post:
 *     summary: Create a new maintenance request
 *     description: Create a new maintenance request.
 *     tags: [Maintenance Requests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MaintenanceRequest'
 *           example:
 *             title: "Water Leak"
 *             description: "There is a water leak in my apartment."
 *             #// Add other fields as needed
 *     responses:
 *       201:
 *         description: Successfully created a new maintenance request.
 *       400:
 *         description: Bad request. Check request body for errors.
 */
router.post('/maintenance-requests', protect, maintenanceController.createMaintenanceRequest);

/**
 * @swagger
 * /maintenance-requests:
 *   get:
 *     summary: Get all maintenance requests
 *     description: Get a list of all maintenance requests.
 *     tags: [Maintenance Requests]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of maintenance requests.
 *       401:
 *         description: Unauthorized. User is not logged in.
 */
router.get('/maintenance-requests', protect, maintenanceController.getMaintenanceRequests);

/**
 * @swagger
 * /maintenance-requests/{id}:
 *   put:
 *     summary: Update maintenance request status by ID
 *     description: Update the status of a maintenance request by ID (Admin access required).
 *     tags: [Maintenance Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Maintenance Request ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MaintenanceRequest'
 *           example:
 *             status: "Completed"
 *             #// Add other fields as needed
 *     responses:
 *       200:
 *         description: Successfully updated maintenance request status.
 *       401:
 *         description: Unauthorized. User is not logged in.
 *       404:
 *         description: Maintenance request not found.
 */
router.put('/maintenance-requests/:id', protect, adminMiddleware, maintenanceController.updateMaintenanceRequestStatus);

/**
 * @swagger
 * /maintenance-requests/{id}:
 *   delete:
 *     summary: Delete a specific maintenance request by ID
 *     description: Delete a specific maintenance request by ID (Admin access required).
 *     tags: [Maintenance Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Maintenance Request ID
 *     responses:
 *       204:
 *         description: Successfully deleted maintenance request.
 *       401:
 *         description: Unauthorized. User is not logged in.
 *       404:
 *         description: Maintenance request not found.
 */
router.delete('/maintenance-requests/:id', protect, adminMiddleware, maintenanceController.deleteMaintenanceRequest);

module.exports = router;
