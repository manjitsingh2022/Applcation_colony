const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { protect, adminMiddleware } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event management APIs
 */

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     description: Create a new event (Admin access required).
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *           example:
 *             title: Annual Conference
 *             date: "2023-10-15T09:00:00Z"
 *             attendees:
 *               - "65004859c2156e541edb6875"
 *               - "65004859c2156e541edb6876"
 *             property: Conference Center
 *     responses:
 *       201:
 *         description: Successfully created a new event.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Bad request. Check request body for errors.
 */

router.post('/events', protect, adminMiddleware, eventController.createEvent);

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     description: Get a list of all events.
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of events.
 *       401:
 *         description: Unauthorized. User is not logged in.
 */

router.get('/events', protect, eventController.getAllEvents);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get a specific event by ID
 *     description: Get information about a specific event by ID.
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Successfully retrieved event information.
 *       401:
 *         description: Unauthorized. User is not logged in.
 *       404:
 *         description: Event not found.
 */

router.get('/events/:id', protect, eventController.getEventById);

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Update a specific event by ID
 *     description: Update information about a specific event by ID (Admin access required).
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *           example:
 *             title: Updated Conference
 *             date: "2023-10-16T10:00:00Z"
 *             attendees:
 *               - "65004859c2156e541edb6875"
 *             property: Convention Center
 *     responses:
 *       200:
 *         description: Successfully updated event information.
 *       401:
 *         description: Unauthorized. User is not logged in.
 *       404:
 *         description: Event not found.
 */

router.put('/events/:id', protect, adminMiddleware, eventController.updateEventById);

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete a specific event by ID
 *     description: Delete a specific event by ID (Admin access required).
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       204:
 *         description: Successfully deleted event.
 *       401:
 *         description: Unauthorized. User is not logged in.
 *       404:
 *         description: Event not found.
 */

router.delete('/events/:id', protect, adminMiddleware, eventController.deleteEventById);

module.exports = router;
