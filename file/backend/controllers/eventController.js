const { formatResponse } = require('../middleware/authMiddleware');
const Event = require('../models/eventModel');
const asyncHandler = require('express-async-handler');


// Create a new event
const createEvent = asyncHandler(async (req, res) => {
    try {
        const event = await Event.create(req.body);
        formatResponse(res, 201, true, 'Successfully created a new event', event);
    } catch (error) {
        formatResponse(res, 400, false, 'Failed to create event', null, 'Failed to create event');
    }
});

// Get all events
const getAllEvents = asyncHandler(async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const total_count = await Event.countDocuments({ /* Your match criteria here */ });

        const data = await Event.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'owner',
                    foreignField: '_id',
                    as: 'ownerDetails',
                },
            },
            {
                $unwind: {
                    path: '$ownerDetails',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'residents',
                    foreignField: '_id',
                    as: 'residentDetails',
                },
            },
            {
                $sort: {
                    houseNumber: 1,
                },
            },
            {
                $skip: (page - 1) * limit,
            },
            {
                $limit: parseInt(limit),
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    attendees: 1, // Include the fields you need
                },
            },
        ]);

        console.log('Paginated and detailed event data fetched.');

        formatResponse(res, 200, true, 'Successfully fetched paginated events with details', {
            total_count, data
        });
    } catch (error) {
        console.error('Error fetching events:', error);
        formatResponse(res, 500, false, 'Internal Server Error', null);
    }
});





// Get a specific event by ID
const getEventById = asyncHandler(async (req, res) => {
    const eventId = req.params.id;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return formatResponse(res, 404, false, 'Event not found', null, 'Event not found');
        }
        formatResponse(res, 200, true, 'Successfully retrieved the event', event);
    } catch (error) {
        formatResponse(res, 500, false, 'Failed to retrieve the event', null, 'Failed to retrieve the event');
    }
});

// Update a specific event by ID
const updateEventById = asyncHandler(async (req, res) => {
    const eventId = req.params.id;
    try {
        const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, { new: true });
        if (!updatedEvent) {
            return formatResponse(res, 404, false, 'Event not found', null, 'Event not found');
        }
        formatResponse(res, 200, true, 'Successfully updated the event', updatedEvent);
    } catch (error) {
        formatResponse(res, 500, false, 'Failed to update the event', null, 'Failed to update the event');
    }
});

// Delete a specific event by ID
const deleteEventById = asyncHandler(async (req, res) => {
    const eventId = req.params.id;
    try {
        const deletedEvent = await Event.findByIdAndRemove(eventId);
        if (!deletedEvent) {
            return formatResponse(res, 404, false, 'Event not found', null, 'Event not found');
        }
        formatResponse(res, 204, true, 'Event deleted successfully', null);
    } catch (error) {
        formatResponse(res, 500, false, 'Failed to delete the event', null, 'Failed to delete the event');
    }
});

module.exports = {
    getAllEvents,
    getEventById,
    updateEventById,
    deleteEventById,
    createEvent,
};
