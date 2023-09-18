const asyncHandler = require('express-async-handler');
const noticeModel = require('../models/noticeModel');
const UserModel = require('../models/userModel')

const createNotice = asyncHandler(async (req, res) => {
    try {
        const { title, content, selectedUsers } = req.body;
        const senderId = req.user._id;

        let recipientUserIds = [];


        if (selectedUsers && selectedUsers.length > 0) {
            recipientUserIds = [...selectedUsers];
        } else {
            const allUsers = await UserModel.find({});
            recipientUserIds = allUsers.map(user => user._id);
        }
        const currentDateTime = new Date().toISOString().split('.')[0];

        recipientUserIds.sort();


        const notice = new noticeModel({
            title,
            content,
            sender: senderId,
            receiver: recipientUserIds,
            dateTime: currentDateTime,
        });

        await notice.save();

        res.status(201).json({ message: 'Notices send all successfully', notice });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});








// Get all notices
const getAllNotices = asyncHandler(async (req, res) => {
    try {
        const notices = await noticeModel.find();
        res.status(200).json(notices);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a specific notice by ID

const getNoticeById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const notice = await noticeModel.findById(id);
        if (!notice) {
            return res.status(404).json({ error: 'Notice not found' });
        }
        res.status(200).json(notice);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a notice by ID
const updateNotice = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updatedNotice = await noticeModel.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!updatedNotice) {
            return res.status(404).json({ error: 'Notice not found' });
        }
        res.status(200).json(updatedNotice);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a notice by ID
const deleteNotice = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deletedNotice = await noticeModel.findByIdAndRemove(id);
        if (!deletedNotice) {
            return res.status(404).json({ error: 'Notice not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Delete all notices
const deleteAllNotice = asyncHandler(async (req, res) => {

    try {
        await noticeModel.deleteMany({});
        res.status(200).json({ message: 'All notices deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




module.exports = { createNotice, getAllNotices, getNoticeById, updateNotice, deleteNotice, deleteAllNotice }