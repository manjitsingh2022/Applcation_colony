const express = require("express");
const userFunction = require("../controllers/userController");
const { protect, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router()
router.post('/register', userFunction.registerUser)
router.post('/login', userFunction.loginUser)
router.get('/logout', userFunction.logoutUser)
router.get('/getLogInStatus', userFunction.getLogInStatus)
router.get('/user', protect, userFunction.getUser)
router.get('/all-users', protect, adminMiddleware, userFunction.getAllUsers)
router.patch('/updateUser', protect, userFunction.updateUser)
router.patch('/updatePhoto', protect, userFunction.updatePhoto)
router.put('/user/:id', protect, adminMiddleware, userFunction.updateUserByAdmin);


module.exports = router;