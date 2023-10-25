const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs');
const bcrypt = require('bcrypt');
const { formatResponse } = require("../middleware/authMiddleware");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" }); // Expires in one day
}


// const registerUser = asyncHandler(async (req, res) => {

//     const { name, email, password } = req.body;
//     if (!name || !email || !password) {
//         res.status(400);
//         throw new Error('Please fill in all required fields')
//     }

//     if (password.length < 6) {
//         res.status(400);
//         throw new Error('Password must be up to 6 characters');
//     }
//     const userExists = await User.findOne({ email })
//     if (userExists) {
//         res.status(400);
//         throw new Error('Email has already been registered')
//     }

//     const user = await User.create({ name, email, password })

//     const token = generateToken(user._id)

//     if (user) {
//         const { _id, name, email, role } = user
//         res.cookie('token', token, { path: "/", httpOnly: true, expires: new Date(Date.now() + 1000 * 86400) })

//         res.status(201).json({ _id, name, email, role, token })
//     } else {
//         res.status(400);
//         throw new Error("Invalid user Data");

//     }
// })

// registerUser function
const registerUser = asyncHandler(async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return formatResponse(res, 400, false, 'Please fill in all required fields');
        }

        if (password.length < 6) {
            return formatResponse(res, 400, false, 'Password must be at least 6 characters long');
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return formatResponse(res, 400, false, 'Email has already been registered');
        }

        // Create and save the user
        const newUser = new User({ name, email, password, role: 'admin' });

        await newUser.save(); // Await the save operation

        if (newUser) {
            console.log(newUser, 'newUser')
            return formatResponse(res, 200, true, 'Successfully created admin user. Please log in now', newUser);
        } else {
            return formatResponse(res, 400, false, 'Failed to create user');
        }
    } catch (error) {
        return formatResponse(res, 500, false, 'Server error', { error: error.message });
    }
});



// createUserByAdmin function
const createUserByAdmin = asyncHandler(async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (req.user && req.user.role !== 'admin') {
            return formatResponse(res, 403, false, 'Only administrators can create new users');
        }

        if (!name || !email || !password || !role) {
            return formatResponse(res, 400, false, 'Please fill in all required fields');
        }

        if (password.length < 6) {
            return formatResponse(res, 400, false, 'Password must be at least 6 characters long');
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return formatResponse(res, 400, false, 'Email has already been registered');
        }

        const user = await User.create({ name, email, password, role });

        if (user) {
            const token = generateToken(user._id);
            const { _id, name, email, role } = user;
            console.log(user, token, 'createUserByAdmin')
            return formatResponse(res, 200, true, 'User created successfully', { _id, name, email, role, token });
        } else {

            return formatResponse(res, 400, false, 'Invalid user data');
        }
    } catch (error) {
        return formatResponse(res, 500, false, 'Server error', { error: error.message });
    }
});



// changePassword function
const changePassword = asyncHandler(async (req, res) => {
    const { password, newPassword } = req.body;

    console.log(password, 'password', newPassword, 'newPassword')
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            return formatResponse(res, 400, false, 'User does not exist.');
        }
        // Verify old password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return formatResponse(res, 401, false, 'Incorrect old password');
        }
        user.password = newPassword;

        await user.save();
        console.log(user, 'changePassword')
        return formatResponse(res, 200, true, 'Password updated successfully', user);
    } catch (error) {
        console.error(error);
        return formatResponse(res, 500, false, 'Server error');
    }
});


// loginUser function
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return formatResponse(res, 400, false, 'Please provide both email and password');
    }

    const user = await User.findOne({ email });
    if (!user) {
        return formatResponse(res, 400, false, 'User does not exist.');
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (passwordIsCorrect) {
        const userRole = user.userRole;
        const token = generateToken({ _id: user._id, userRole });

        // Set the 'Authorization' header
        res.setHeader('Authorization', `Bearer ${token}`);
        res.setHeader("Access-Control-Allow-Headers", "application/json");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        // Set the token as a cookie
        res.cookie('token', token, {
            path: '/',
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
        });
        console.log(user, token, 'login')
        return formatResponse(res, 201, true, 'User logged in successfully', { user, token });
    } else {
        return formatResponse(res, 400, false, 'Invalid email or password');
    }
});


// logoutUser function
const logoutUser = asyncHandler(async (req, res) => {
    // Clear the token cookie
    res.cookie('token', '', { path: '/', httpOnly: true, expires: new Date(0) });

    // Remove the 'Authorization' header
    res.removeHeader('Authorization');

    // Send a response indicating successful logout
    return formatResponse(res, 201, true, 'Successfully logged out');
});


// getUser
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');

    if (user) {
        return formatResponse(res, 200, true, 'User retrieved successfully', user);
    } else {
        return formatResponse(res, 404, false, 'User not found');
    }
});

// getLogInStatus
const getLogInStatus = asyncHandler(async (req, res) => {
    // Parse the cookie string into an object
    const cookies = req.headers.cookie.split('; ').reduce((acc, cookie) => {
        const [name, value] = cookie.split('=');
        acc[name] = value;
        return acc;
    }, {});

    // Retrieve the value of the "token" cookie
    const token = cookies.token;
    if (!token) {
        return formatResponse(res, 200, true, 'User not logged in', false);
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified) {
        return formatResponse(res, 200, true, 'User logged in', true);
    } else {
        return formatResponse(res, 200, true, 'User not logged in', false);
    }
});

// updateUser
const updateUser = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        // Check if the user exists
        const user = await User.findById(userId);
        console.log(user, 'userssers')
        if (!user) {
            return formatResponse(res, 404, false, 'User not found');
        }

        if (req.user.role === 'admin') {
            user.email = req.body.email || user.email;
        }
        user.name = req.body.name || user.name;
        user.phone = req.body.phone || user.phone;
        user.address = req.body.address || user.address;
        // user.isActive = req.body.isActive || user.isActive;
        const updatedUser = await user.save();
        return formatResponse(res, 200, true, 'User updated successfully', updatedUser);
    } catch (error) {
        return formatResponse(res, 500, false, 'Internal Server Error');
    }
});

// updatePhoto
const updatePhoto = asyncHandler(async (req, res) => {
    const { photo } = req.body
    const user = await User.findById(req.user._id);
    user.photo = photo
    const updatedUser = await user.save()
    return formatResponse(res, 200, true, 'Photo updated successfully', updatedUser);
});


const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const { page = 1, limit = 8 } = req.query;

        const total_count = await User.countDocuments();
        const data = await User.aggregate([
            {
                $skip: (page - 1) * limit,
            },
            {
                $limit: parseInt(limit),
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    phone: 1,
                    address: 1,
                    role: 1,
                    photo: 1,
                    // Add more fields as needed
                },
            },
        ]);

        console.log('Paginated and detailed data fetched.');

        // Respond with the total count, paginated, and detailed data
        formatResponse(res, 200, true, 'Successfully fetched paginated users with details', {
            total_count,
            data,
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        formatResponse(res, 500, false, 'Internal Server Error', null);
    }
});


const updateUserByAdmin = asyncHandler(async (req, res) => {
    console.log('valueeeee', req.body,)
    try {
        const userId = req.params.id;
        const updatedUserData = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return formatResponse(res, 404, false, 'User not found');
        }

        user.set(updatedUserData);
        const updatedUser = await user.save();

        return formatResponse(res, 200, true, 'User updated successfully', updatedUser);
    } catch (error) {
        return formatResponse(res, 500, false, 'Internal Server Error');
    }
});

const deleteUserById = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId);
        if (!user) {
            return formatResponse(res, 404, false, 'User not found');
        }

        await user.remove();

        return formatResponse(res, 200, true, 'User deleted successfully');

    } catch (error) {
        console.error(error);
        return formatResponse(res, 500, false, 'Internal Server Error', error.message);
    }
});


module.exports = {
    registerUser, createUserByAdmin, loginUser, changePassword, logoutUser,
    getUser, getLogInStatus, updateUser, updatePhoto, getAllUsers, updateUserByAdmin,
    deleteUserById
};