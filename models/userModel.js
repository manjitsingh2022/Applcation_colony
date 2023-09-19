const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema;
const bcrypt = require('bcryptjs')

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const userSchema = mongoose.Schema({

    name: {
        type: String,
        require: [true, 'Please add a name']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: [6, 'password must be up to 6 Characters']
    },
    role: {
        type: String,
        required: true,
        default: 'admin',
        enum: ['customer', 'admin', 'members', 'society member']
    },
    photo: {
        type: String,
        required: [true, 'Please add a photo'],
        default: "https://i.ibb.co/4pDNDK1/avatar.png"

    },
    phone: {
        type: String,
        default: '+124232382'
    },
    address: {
        type: Object,

    },
    status: {
        type: Boolean,
        default: true
    },
    isActive: {
        type: Boolean,
        default: false
    }

})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next
    }
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
})

const User = mongoose.model("User", userSchema)
module.exports = User;