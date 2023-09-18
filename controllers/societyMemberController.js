const SocietyMember = require('../models/societyMemberModel');
const asyncHandler = require('express-async-handler');

// Create a new society member
const createSocietyMember = asyncHandler(async (req, res) => {
    try {
        const societyMember = new SocietyMember(req.body);
        await societyMember.save();
        res.status(201).json(societyMember);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create society member' });
    }
});

// Get all society members
const getAllSocietyMembers = asyncHandler(async (req, res) => {
    try {
        const societyMembers = await SocietyMember.find();
        res.status(200).json(societyMembers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve society members' });
    }
});

// Get a specific society member by ID
const getSocietyMemberById = asyncHandler(async (req, res) => {
    const memberId = req.params.id;
    try {
        const societyMember = await SocietyMember.findById(memberId);
        if (!societyMember) {
            return res.status(404).json({ error: 'Society member not found' });
        }
        res.status(200).json(societyMember);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve society member' });
    }
});

// Update a specific society member by ID
const updateSocietyMemberById = asyncHandler(async (req, res) => {
    const memberId = req.params.id;
    try {
        const updatedSocietyMember = await SocietyMember.findByIdAndUpdate(memberId, req.body, { new: true });
        if (!updatedSocietyMember) {
            return res.status(404).json({ error: 'Society member not found' });
        }
        res.status(200).json(updatedSocietyMember);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update society member' });
    }
});

// Delete a specific society member by ID
const deleteSocietyMemberById = asyncHandler(async (req, res) => {
    const memberId = req.params.id;
    try {
        const deletedSocietyMember = await SocietyMember.findByIdAndRemove(memberId);
        if (!deletedSocietyMember) {
            return res.status(404).json({ error: 'Society member not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete society member' });
    }
});
module.exports = { createSocietyMember, getAllSocietyMembers, getSocietyMemberById, updateSocietyMemberById, deleteSocietyMemberById }
