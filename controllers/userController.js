const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

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


const registerUser = asyncHandler(async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (req.user && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Only administrators can create new users' });
        }

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'Please fill in all required fields' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Email has already been registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role });

        if (user) {
            const token = generateToken(user._id);
            const { _id, name, email, role } = user;
            res.cookie('token', token, { path: '/', httpOnly: true, expires: new Date(Date.now() + 1000 * 86400) });
            return res.status(201).json({ _id, name, email, role, token });
        } else {
            return res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});







const loginUser = asyncHandler(async (req, res) => {



    const { email, password } = req.body

    if (!email || !password) {
        res.status(400);
        throw new Error('Please add eamil and password')
    }

    const user = await User.findOne({ email })

    if (!user) {
        res.status(400);
        throw new Error('User does not exist.')
    }
    const passwordIsCorrect = await bcrypt.compare(password, user.password)


    if (user && passwordIsCorrect) {
        const newUser = await User.findOne({ email }).select('-password');
        const userRole = newUser.userRole;
        const token = generateToken({ _id: newUser._id, userRole });
        // res.setHeader('Authorization', `Bearer ${token}`);
        // Set the token as a cookie
        res.cookie('token', token, { path: "/", httpOnly: true, expires: new Date(Date.now() + 1000 * 86400) });

        res.status(201).json({ user: newUser, token });
    } else {
        res.status(400);
        throw new Error('Invalid email or password');
    }


})

// logout
const logoutUser = asyncHandler(async (req, res) => {

    res.cookie('token', '', { path: '/', httpOnly: true, expires: new Date(0) })

    res.status(201).json({ message: "Successfully Logged Out" })

})

// getUser 
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


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
        return res.json(false)
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if (verified) {
        res.json(true)
    } else {
        res.json(false)
    }
})


// update the user

const updateUser = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        // Check if the user exists
        const user = await User.findById(userId);
        console.log(user, 'userssers')
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (req.user.role === 'admin') {
            user.email = req.body.email || user.email;
        }
        user.name = req.body.name || user.name;
        user.phone = req.body.phone || user.phone;
        user.address = req.body.address || user.address;
        user.isActive = req.body.isActive || user.isActive;
        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



const updatePhoto = asyncHandler(async (req, res) => {
    const { photo } = req.body
    const user = await User.findById(req.user._id);
    user.photo = photo
    const updatePhoto = await user.save()
    res.status(200).json(updatePhoto)

})


const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const updateUserByAdmin = asyncHandler(async (req, res) => {
    console.log(req, 'req')
    try {
        const userId = req.params.id;
        const updatedUserData = req.body;


        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.set(updatedUserData);

        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});




module.exports = { registerUser, loginUser, logoutUser, getUser, getLogInStatus, updateUser, updatePhoto, getAllUsers, updateUserByAdmin };