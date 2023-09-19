const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');
const { protect, adminMiddleware } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Notices
 *   description: Notice management APIs
 */

/**
 * @swagger
 * /notices:
 *   post:
 *     summary: Create a new notice
 *     description: Create a new notice (Admin access required).
 *     tags: [Notices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notice'
 *           example:
 *             title: New Notice
 *             content: This is a new notice.
 *             # Add other fields as needed
 *     responses:
 *       201:
 *         description: Successfully created a new notice.
 *       400:
 *         description: Bad request. Check request body for errors.
 */
router.post('/notices', protect, adminMiddleware, noticeController.createNotice);


/**
 * @swagger
 * /notices:
 *   get:
 *     summary: Get all notices
 *     description: Get a list of all notices.
 *     tags: [Notices]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of notices.
 *       401:
 *         description: Unauthorized. User is not logged in.
 */
router.get('/notices', protect, noticeController.getAllNotices);

/**
 * @swagger
 * /notices/{id}:
 *   get:
 *     summary: Get a specific notice by ID
 *     description: Get information about a specific notice by ID (Admin access required).
 *     tags: [Notices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notice ID
 *     responses:
 *       200:
 *         description: Successfully retrieved notice information.
 *       401:
 *         description: Unauthorized. User is not logged in.
 *       404:
 *         description: Notice not found.
 */
router.get('/notices/:id', protect, adminMiddleware, noticeController.getNoticeById);

/**
 * @swagger
 * /notices/{id}:
 *   put:
 *     summary: Update a notice by ID
 *     description: Update information about a specific notice by ID (Admin access required).
 *     tags: [Notices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notice ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notice'
 *           example:
 *             title: Updated Notice
 *             content: This is an updated notice.
 *             #// Add other fields as needed
 *     responses:
 *       200:
 *         description: Successfully updated notice information.
 *       401:
 *         description: Unauthorized. User is not logged in.
 *       404:
 *         description: Notice not found.
 */
router.put('/notices/:id', protect, adminMiddleware, noticeController.updateNotice);

/**
 * @swagger
 * /notices/allDelete:
 *   delete:
 *     summary: Delete all notices
 *     description: Delete all notices.
 *     tags: [Notices]
 *     responses:
 *       204:
 *         description: Successfully deleted all notices.
 */
router.delete('/notices/allDelete', noticeController.deleteAllNotice);

/**
 * @swagger
 * /notices/{id}:
 *   delete:
 *     summary: Delete a specific notice by ID
 *     description: Delete a specific notice by ID (Admin access required).
 *     tags: [Notices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notice ID
 *     responses:
 *       204:
 *         description: Successfully deleted notice.
 *       401:
 *         description: Unauthorized. User is not logged in.
 *       404:
 *         description: Notice not found.
 */
router.delete('/notices/:id', protect, adminMiddleware, noticeController.deleteNotice);

module.exports = router;
