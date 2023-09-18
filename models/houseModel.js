const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
    houseNumber: {
        type: String,
        required: [true, 'Please provide a house number']
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please specify an owner']
    },
    residents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
    propertyType: String,

});

module.exports = mongoose.model('House', houseSchema);
