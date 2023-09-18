const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
    try {
        const token = req.headers.cookie;
        const cookies = token.split(';');
        let tokenValue = null;

        for (const cookie of cookies) {
            const [name, value] = cookie.trim().split('=');

            if (name === 'token') {
                tokenValue = value;
                break;
            }
        }

        if (tokenValue) {
            console.log('Token Value:', tokenValue);
        } else {
            console.log('Token not found in the cookie string');
        }
        if (!tokenValue) {
            return res.status(401).json({ message: 'Not authorized, please login' });
        }
        const verified = jwt.verify(tokenValue, process.env.JWT_SECRET);
        const user = await User.findById(verified.id).select("-password");

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, please login' });
    }
});


const adminMiddleware = asyncHandler(async (req, res, next) => {
    const userRole = req.user.role;
    if (userRole === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Permission denied' });
    }
});




module.exports = { protect, adminMiddleware }