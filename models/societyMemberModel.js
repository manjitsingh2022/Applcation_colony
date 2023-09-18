const mongoose = require('mongoose');

const societyMemberSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user']
    },
    membershipStatus: String,
    dues: Number,

});

module.exports = mongoose.model('SocietyMember', societyMemberSchema);
