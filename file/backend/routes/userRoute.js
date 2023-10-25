const express = require("express");
const userFunction = require("../controllers/userController");
const { protect, adminMiddleware, authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management APIs
 */

/**
 * @swagger
 * /users/register-only:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Successfully registered a new user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request. Check request body for errors.
 */
router.post('/register-only', userFunction.registerUser);
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Create User By Admin a new user
 *     description: Create a new user account.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Successfully registered a new user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request. Check request body for errors.
 */
router.post('/register', protect, userFunction.createUserByAdmin);
/**
 * @swagger
 * /users/change-password:
 *   post:
 *     summary: Change Password
 *     description: Change a user's password.
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             example:
 *               oldPassword: "oldPassword123"
 *               newPassword: "newPassword456"
 *     responses:
 *       200:
 *         description: Password changed successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: "Password changed successfully"
 *       400:
 *         description: Bad request. Check request body for errors.
 *       401:
 *         description: Unauthorized. User is not authenticated.
 *       500:
 *         description: Internal server error.
 */
router.put('/change-password', protect, userFunction.changePassword);



/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     description: Log in to the application.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@gmail.com
 *               password:
 *                 type: string
 *                 example: user1234
 *     responses:
 *       201:
 *         description: Successfully logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *       400:
 *         description: Bad request. Check request body for errors.
 */
router.post('/login', userFunction.loginUser);

/**
 * @swagger
 * /users/logout:
 *   get:
 *     summary: Log out a user
 *     description: Log out the currently authenticated user.
 *     tags: [User] 
 *     responses:
 *       204:
 *         description: Successfully logged out.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating successful logout.
 *       400:
 *         description: Bad request. Check request body for errors.
 */
router.get('/logout', userFunction.logoutUser);



/**
 * @swagger
 * /users/getLogInStatus:
 *   get:
 *     summary: Get login status
 *     description: Get the login status of the current user.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Successfully retrieved login status.
 *       401:
 *         description: Unauthorized. User is not logged in.
 */
router.get('/getLogInStatus', userFunction.getLogInStatus);

/**
 * @swagger
 * /users/user:
 *   get:
 *     summary: Get user information
 *     description: Get the information of the currently authenticated user.
 *     tags: [User] 
 *     responses:
 *       200:
 *         description: Successfully retrieved user information.
 *       401:
 *         description: Unauthorized. User is not logged in.
 */
router.get('/user', protect, userFunction.getUser);

/**
 * @swagger
 * /users/all-users:
 *   get:
 *     summary: Get all users (Admin)
 *     description: Get a list of all users (Admin access required).
 *     tags: [User] 
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of users.
 *       401:
 *         description: Unauthorized. User is not an admin.
 */
router.get('/all-users', protect, adminMiddleware, userFunction.getAllUsers);
// router.get('/all-users', userFunction.getAllUsers);

/**
 * @swagger
 * /users/updateUser:
 *   patch:
 *     summary: Update user information
 *     description: Update user information for the currently authenticated user.
*     tags: [User] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successfully updated user information.
 *       401:
 *         description: Unauthorized. User is not logged in.
 */
router.patch('/updateUser', protect, userFunction.updateUser);

/**
 * @swagger
 * /users/updatePhoto:
 *   patch:
 *     summary: Update user photo
 *     description: Update the profile photo of the currently authenticated user.
 *     tags: [User] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successfully updated user photo.
 *       401:
 *         description: Unauthorized. User is not logged in.
 */
router.patch('/updatePhoto', protect, userFunction.updatePhoto);

/**
 * @swagger
 * /users/user/{id}:
 *   put:
 *     summary: Update user by admin
 *     description: Update user information by admin.
 *     tags: [User]  
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successfully updated user by admin.
 *       401:
 *         description: Unauthorized. User is not an admin.
 */
router.put('/user/:id', protect, adminMiddleware, userFunction.updateUserByAdmin);


/**
 * @swagger
 * /users/user/{id}:
 *   delete:
 *     summary: Delete user by admin
 *     description: Delete user information by admin.
 *     tags: [User]  
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Successfully deleted user by admin.
 *       401:
 *         description: Unauthorized. User is not an admin.
 */

router.delete('/user/:id', protect, adminMiddleware, userFunction.deleteUserById);

module.exports = router;

