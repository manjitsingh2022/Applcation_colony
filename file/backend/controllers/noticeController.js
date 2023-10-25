const asyncHandler = require('express-async-handler');
const noticeModel = require('../models/noticeModel');
const UserModel = require('../models/userModel');
const { formatResponse } = require('../middleware/authMiddleware');
const mongoose = require('mongoose');

// Create a new notice
const createNotice = asyncHandler(async (req, res) => {
    try {
        const { title, content, selectedUsers } = req.body;
        const senderId = req.user._id;

        let recipientUserIds = [];

        if (selectedUsers && selectedUsers.length > 0) {
            recipientUserIds = [...selectedUsers];
        } else {
            const allUsers = await UserModel.find({});
            recipientUserIds = allUsers.map((user) => user._id);
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

        formatResponse(res, 201, true, 'Notices sent successfully', notice);

    } catch (error) {
        console.error(error);
        formatResponse(res, 500, false, 'Internal Server Error', null, 'Internal Server Error');
    }
});

// Get all notices
const getAllNotices = asyncHandler(async (req, res) => {
    try {
        const { page = 1, limit = 10, noticeId } = req.query;
        const matchCriteria = {};

        if (noticeId) {
            matchCriteria._id = mongoose.Types.ObjectId(noticeId);
        }

        const pipeline = [
            {
                $match: matchCriteria,
            },
            {
                $lookup: {
                    from: 'users', // Assuming you have a 'users' collection
                    localField: 'sender',
                    foreignField: '_id',
                    as: 'senderDetails',
                },
            },
            {
                $unwind: {
                    path: '$senderDetails',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'users', // Assuming you have a 'users' collection
                    localField: 'receiver',
                    foreignField: '_id',
                    as: 'receiverDetails',
                },
            },
            {
                $unwind: {
                    path: '$receiverDetails',
                    preserveNullAndEmptyArrays: true,
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
                    id: '$_id',
                    title: 1,
                    content: 1,
                    sender: {
                        _id: '$senderDetails._id',
                        name: '$senderDetails.name',
                    },
                    receiver: {
                        _id: '$receiverDetails._id',
                        name: '$receiverDetails.name',
                    },
                },
            },
        ];

        const data = await noticeModel.aggregate(pipeline);
        const total_count = await noticeModel.countDocuments(matchCriteria);

        if (data.length === 0) {
            formatResponse(res, 404, false, 'Notice not found', null);
        } else {
            if (noticeId) {
                formatResponse(res, 200, true, 'Successfully fetched the notice by ID', data[0]);
            } else {
                formatResponse(res, 200, true, 'Successfully fetched paginated notices with details', {
                    total_count,
                    data,
                });
            }
        }
    } catch (error) {
        console.error('Error fetching notices:', error);
        formatResponse(res, 500, false, 'Internal Server Error', null);
    }
});



// Get a specific notice by ID
const getNoticeById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const notice = await noticeModel.findById(id);
        if (!notice) {
            return formatResponse(res, 404, false, 'Notice not found', null, 'Notice not found');
        }
        formatResponse(res, 200, true, 'Notice fetched successfully', notice);
    } catch (error) {
        formatResponse(res, 500, false, 'Internal Server Error', null, 'Internal Server Error');
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
            return formatResponse(res, 404, false, 'Notice not found', null, 'Notice not found');
        }
        formatResponse(res, 200, true, 'Notice updated successfully', updatedNotice);
    } catch (error) {
        formatResponse(res, 500, false, 'Internal Server Error', null, 'Internal Server Error');
    }
});

// Delete a notice by ID
const deleteNotice = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deletedNotice = await noticeModel.findByIdAndRemove(id);
        if (!deletedNotice) {
            return formatResponse(res, 404, false, 'Notice not found', null, 'Notice not found');
        }
        formatResponse(res, 204, true, 'Notice deleted successfully', null);
    } catch (error) {
        formatResponse(res, 500, false, 'Internal Server Error', null, 'Internal Server Error');
    }
});

// Delete all notices
const deleteAllNotice = asyncHandler(async (req, res) => {
    try {
        await noticeModel.deleteMany({});
        formatResponse(res, 200, true, 'All notices deleted successfully', null);
    } catch (error) {
        formatResponse(res, 500, false, 'Internal Server Error', null, 'Internal Server Error');
    }
});

module.exports = {
    createNotice,
    getAllNotices,
    getNoticeById,
    updateNotice,
    deleteNotice,
    deleteAllNotice
};