const express = require('express');
const router = express.Router();
const houseController = require('../controllers/houseController');
const { protect, adminMiddleware } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Houses
 *   description: House management APIs
 */

/**
 * @swagger
 * /houses:
 *   post:
 *     summary: Create a new house
 *     description: Create a new house (Admin access required).
 *     tags: [Houses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HouseModel'
 *           example:
 *             houseNumber: "123"
 *             owner: "60a123456789012345678901"
 *             residents: []
 *             propertyType: "Single-Family Home"
 *     responses:
 *       201:
 *         description: Successfully created a new house.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/House'
 *       400:
 *         description: Bad request. Check request body for errors.
 */

router.post('/houses', protect, adminMiddleware, houseController.createHouse);

/**
 * @swagger
 * /houses:
 *   get:
 *     summary: Get all houses
 *     description: Get a list of all houses.
 *     tags: [Houses]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of houses.
 *       401:
 *         description: Unauthorized. User is not logged in.
 */

router.get('/houses', protect, houseController.getAllHouses);

/**
 * @swagger
 * /houses/{id}:
 *   get:
 *     summary: Get a specific house by ID
 *     description: Get information about a specific house by ID (Admin access required).
 *     tags: [Houses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: House ID
 *     responses:
 *       200:
 *         description: Successfully retrieved house information.
 *       401:
 *         description: Unauthorized. User is not logged in.
 *       404:
 *         description: House not found.
 */

router.get('/houses/:id', protect, adminMiddleware, houseController.getHouseById);

/**
 * @swagger
 * /houses/{id}:
 *   put:
 *     summary: Update a specific house by ID
 *     description: Update information about a specific house by ID (Admin access required).
 *     tags: [Houses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: House ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HouseModel'
 *           example:
 *             houseNumber: "456"
 *             owner: "60a123456789012345678901"
 *             residents: ["60a234567890123456789012", "60a345678901234567890123"]
 *             propertyType: "Apartment"
 *     responses:
 *       200:
 *         description: Successfully updated house information.
 *       401:
 *         description: Unauthorized. User is not logged in.
 *       404:
 *         description: House not found.
 */

router.put('/houses/:id', protect, adminMiddleware, houseController.updateHouseById);

/**
 * @swagger
 * /houses/{id}:
 *   delete:
 *     summary: Delete a specific house by ID
 *     description: Delete a specific house by ID (Admin access required).
 *     tags: [Houses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: House ID
 *     responses:
 *       204:
 *         description: Successfully deleted house.
 *       401:
 *         description: Unauthorized. User is not logged in.
 *       404:
 *         description: House not found.
 */

router.delete('/houses/:id', protect, adminMiddleware, houseController.deleteHouseById);

module.exports = router;
