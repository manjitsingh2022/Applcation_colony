const Event = require('../models/eventModel');
const asyncHandler = require('express-async-handler');
// Create a new event
const createEvent = asyncHandler(async (req, res) => {
    try {
        const event = await Event.create(req.body);
        res.status(201).json({ message: 'Successfully create a new event.' }, event);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create event' });
    }
});

// Get all events
const getAllEvents = asyncHandler(async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve events' });
    }
});

// Get a specific event by ID
const getEventById = asyncHandler(async (req, res) => {
    const eventId = req.params.id;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve event' });
    }
});

// Update a specific event by ID
const updateEventById = asyncHandler(async (req, res) => {
    const eventId = req.params.id;
    try {
        const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update event' });
    }
});

// Delete a specific event by ID
const deleteEventById = asyncHandler(async (req, res) => {
    const eventId = req.params.id;
    try {
        const deletedEvent = await Event.findByIdAndRemove(eventId);
        if (!deletedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete event' });
    }
});



module.exports = { getAllEvents, getEventById, updateEventById, deleteEventById, createEvent }