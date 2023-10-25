const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for the event']
    },
    date: Date,
    attendees: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ],
    // Other event-related fields
});

module.exports = mongoose.model('Event', eventSchema);
