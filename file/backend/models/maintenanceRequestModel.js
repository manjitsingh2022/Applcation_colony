const mongoose = require('mongoose');

const maintenanceRequestSchema = new mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please specify a requester']
    },
    title: String,
    description: String,
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending'
    },

});

module.exports = mongoose.model('MaintenanceRequest', maintenanceRequestSchema);
