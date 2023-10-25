const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken')
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        // Check if the token is in the 'Authorization' header
        if (!token && req.headers.cookie) {
            // If token is not in 'Authorization' header, check cookies
            const cookies = req.headers.cookie.split(';');
            for (const cookie of cookies) {
                const [name, value] = cookie.trim().split('=');
                if (name === 'token') {
                    token = value;
                    break;
                }
            }
        }

        // If token still not found, return unauthorized
        if (!token) {
            return res.status(401).json({ message: 'Not authorized, please login' });
        }

        // Remove 'Bearer ' prefix from token if it exists
        if (token.startsWith('Bearer ')) {
            token = token.slice(7);
        }

        // Verify the JWT token
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by the token's ID
        const user = await User.findById(verified.id).select('-password');

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
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Assuming the user's role is stored in a 'role' property of the user object
    const userRole = req.user.role;

    if (userRole === 'admin') {
        next();
    } else {
        console.log('reqqq', userRole)
        res.status(403).json({ message: 'Permission denied' });
    }
});




const formatResponse = (res, status, success, message, data, error) => {
    const responseData = {
        success,
        message,
        data,
        error,
    };

    res.status(status).json(responseData);
};


module.exports = { protect, adminMiddleware, formatResponse }