const { formatResponse } = require('../middleware/authMiddleware');
const SocietyMember = require('../models/societyMemberModel');
const asyncHandler = require('express-async-handler');
// Create a new society member

const createSocietyMember = asyncHandler(async (req, res) => {
    try {
        const societyMember = new SocietyMember(req.body);
        await societyMember.save();

        if (societyMember) {
            formatResponse(res, 201, true, 'Society member created successfully', societyMember, null);
        } else {
            formatResponse(res, 400, false, 'Failed to create society member', null, 'Bad Request');
        }
    } catch (error) {
        formatResponse(res, 500, false, 'Internal Server Error', null, error.message);
    }
});






// Get all society members
const getAllSocietyMembers = asyncHandler(async (req, res) => {
    try {
        const { page = 1, limit = 2, membershipStatus } = req.query;

        // Build the filter criteria based on the "membershipStatus" query parameter
        const filterCriteria = {};
        if (membershipStatus) {
            filterCriteria.membershipStatus = membershipStatus;
        }

        // Use Mongoose aggregation
        const data = await SocietyMember.aggregate([
            {
                $match: filterCriteria,
            },
            {
                $skip: (page - 1) * limit,
            },
            {
                $limit: parseInt(limit),
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'userData',
                },
            },
            {
                $unwind: {
                    path: '$userData',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    membershipStatus: 1,
                    dues: 1,
                    user: {
                        _id: '$userData._id',
                        name: '$userData.name',
                        status: '$userData.status',
                        phone: '$userData.phone',
                        // Include more user fields as needed
                    },
                },
            },
        ]);

        // Get the total count of society members
        const total_count = await SocietyMember.countDocuments(filterCriteria);

        console.log('Paginated and detailed society member data fetched.');

        formatResponse(res, 200, true, 'Successfully fetched paginated society members with details', {
            total_count,
            data,
        });
    } catch (error) {
        console.error('Error fetching society members:', error);
        formatResponse(res, 500, false, 'Internal Server Error', null);
    }
});



// Get a specific society member by ID
const getSocietyMemberById = asyncHandler(async (req, res) => {
    const memberId = req.params.id;
    try {
        const societyMember = await SocietyMember.findById(memberId);
        if (!societyMember) {
            return formatResponse(res, 404, null, 'Society member not found');
        }
        formatResponse(res, 200, societyMember, null);
    } catch (error) {
        formatResponse(res, 500, null, 'Failed to retrieve society member');
    }
});

// Update a specific society member by ID
const updateSocietyMemberById = asyncHandler(async (req, res) => {
    const memberId = req.params.id;
    try {
        const updatedSocietyMember = await SocietyMember.findByIdAndUpdate(memberId, req.body, { new: true });
        if (!updatedSocietyMember) {
            return formatResponse(res, 404, null, 'Society member not found');
        }
        formatResponse(res, 200, updatedSocietyMember, null);
    } catch (error) {
        formatResponse(res, 500, null, 'Failed to update society member');
    }
});

// Delete a specific society member by ID
const deleteSocietyMemberById = asyncHandler(async (req, res) => {
    const memberId = req.params.id;
    try {
        const deletedSocietyMember = await SocietyMember.findByIdAndRemove(memberId);
        if (!deletedSocietyMember) {
            return formatResponse(res, 404, null, 'Society member not found');
        }
        formatResponse(res, 204, null, null);
    } catch (error) {
        formatResponse(res, 500, null, 'Failed to delete society member');
    }
});

module.exports = {
    createSocietyMember,
    getAllSocietyMembers,
    getSocietyMemberById,
    updateSocietyMemberById,
    deleteSocietyMemberById
};