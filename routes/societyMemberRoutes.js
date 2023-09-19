const express = require('express');
const router = express.Router();
const societyMemberController = require('../controllers/societyMemberController');
const { protect, adminMiddleware } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Society Members
 *   description: Society member management APIs
 */




/**
 * @swagger
 * /societyMembers:
 *   get:
 *     summary: Get all society members
 *     description: Get a list of all society members.
 *     tags: [Society Members]
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of society members.
 *       401:
 *         description: Unauthorized. User is not logged in.
 */
router.get('/societyMembers', protect, societyMemberController.getAllSocietyMembers);

/**
 * @swagger
 * /societyMembers/{id}:
 *   get:
 *     summary: Get a specific society member by ID
 *     description: Get information about a specific society member by ID (Admin access required).
 *     tags: [Society Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Society Member ID
 *     responses:
 *       200:
 *         description: Successfully retrieved society member information.
 *       401:
 *         description: Unauthorized. User is not logged in.
 *       404:
 *         description: Society member not found.
 */
router.get('/societyMembers/:id', protect, adminMiddleware, societyMemberController.getSocietyMemberById);

/**
 * @swagger
 * /societyMembers:
 *   post:
 *     summary: Create a new society member
 *     description: Create a new society member (Admin access required).
 *     tags: [Society Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SocietyMember'
 *           example:
 *             name: John Doe
 *             email: john@example.com
 *             phone: +1234567890
 *             #// Add other fields as needed
 *     responses:
 *       201:
 *         description: Successfully created a new society member.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SocietyMember'
 *       400:
 *         description: Bad request. Check request body for errors.
 */
router.post('/societyMembers', protect, adminMiddleware, societyMemberController.createSocietyMember);

/**
 * @swagger
 * /societyMembers/{id}:
 *   put:
 *     summary: Update a specific society member by ID
 *     description: Update information about a specific society member by ID (Admin access required).
 *     tags: [Society Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Society Member ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SocietyMember'
 *           example:
 *             name: Updated Name
 *             email: updated@example.com
 *             phone: +9876543210
 *             #// Add other fields as needed
 *     responses:
 *       200:
 *         description: Successfully updated society member information.
 *       401:
 *         description: Unauthorized. User is not logged in.
 *       404:
 *         description: Society member not found.
 */
router.put('/societyMembers/:id', protect, adminMiddleware, societyMemberController.updateSocietyMemberById);



/**
 * @swagger
 * /societyMembers/{id}:
 *   delete:
 *     summary: Delete a specific society member by ID
 *     description: Delete a specific society member by ID (Admin access required).
 *     tags: [Society Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Society Member ID
 *     responses:
 *       204:
 *         description: Successfully deleted society member.
 *       401:
 *         description: Unauthorized. User is not logged in.
 *       404:
 *         description: Society member not found.
 */
router.delete('/societyMembers/:id', protect, adminMiddleware, societyMemberController.deleteSocietyMemberById);

module.exports = router;
