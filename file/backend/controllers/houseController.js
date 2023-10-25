const asyncHandler = require('express-async-handler');
const House = require('../models/houseModel');
const { formatResponse } = require('../middleware/authMiddleware');

// Create a new house
const createHouse = asyncHandler(async (req, res) => {
    try {
        const { houseNumber, owner, residents, propertyType } = req.body;
        const newHouse = new House({ houseNumber, owner, residents, propertyType });
        const createdHouse = await newHouse.save();

        console.log(createdHouse, 'cretehooseeee');
        formatResponse(res, 201, true, 'Successfully created a new house', createdHouse);
    } catch (error) {
        console.error('Error creating house:', error);
        formatResponse(res, 500, false, 'Internal Server Error', null, error.message);
    }
});


const getAllHouses = asyncHandler(async (req, res) => {
    try {
        const { page = 1, limit = 8 } = req.query;

        const total_count = await House.countDocuments();
        const data = await House.aggregate([
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
                    houseNumber: 1,
                    propertyType: 1,
                    owner: {
                        _id: { $ifNull: ['$ownerDetails._id', null] },
                        name: { $ifNull: ['$ownerDetails.name', null] },
                    },
                    residents: {
                        $filter: {
                            input: {
                                $map: {
                                    input: '$residentDetails',
                                    as: 'resident',
                                    in: {
                                        _id: { $ifNull: ['$$resident._id', null] },
                                        name: { $ifNull: ['$$resident.name', null] },
                                        // Add more fields as needed
                                    },
                                },
                            },
                            as: 'resident',
                            cond: {
                                $ne: ['$$resident', null],
                            },
                        },
                    },
                },
            },
        ]);
        console.log('Paginated and detailed data fetched.');

        // Respond with the total count, paginated, and detailed data
        formatResponse(res, 200, true, 'Successfully fetched paginated houses with details', {
            total_count,
            data,
        });
    } catch (error) {
        console.error('Error fetching houses:', error);
        formatResponse(res, 500, false, 'Internal Server Error', null);
    }
});



// Get a specific house by ID
const getHouseById = asyncHandler(async (req, res) => {
    try {
        const house = await House.findById(req.params.id);
        if (!house) {
            formatResponse(res, 404, false, 'House not found', null);
        } else {
            formatResponse(res, 200, true, 'Successfully fetched the house', house);
        }
    } catch (error) {
        formatResponse(res, 500, false, 'Internal Server Error', null);
    }
});

// Update a specific house by ID
const updateHouseById = asyncHandler(async (req, res) => {
    try {
        const house = await House.findById(req.params.id);
        if (!house) {
            formatResponse(res, 404, false, 'House not found', null);
        } else {
            house.houseNumber = req.body.houseNumber || house.houseNumber;
            house.owner = req.body.owner || house.owner;
            house.residents = req.body.residents || house.residents;
            house.propertyType = req.body.propertyType || house.propertyType;
            const updatedHouse = await house.save();
            formatResponse(res, 200, true, 'Successfully updated the house', updatedHouse);
        }
    } catch (error) {
        formatResponse(res, 500, false, 'Internal Server Error', null);
    }
});

// Delete a specific house by ID
const deleteHouseById = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id;
        const house = await House.findById(userId);

        if (!house) {
            formatResponse(res, 404, false, 'House not found', null);
        } else {
            await house.remove();
            formatResponse(res, 200, true, 'House removed successfully', null);
        }
    } catch (error) {
        console.error('Error deleting house:', error);
        formatResponse(res, 500, false, 'Internal Server Error', null, error.message);
    }
});



// Delete all houses
const deleteAllHouse = asyncHandler(async (req, res) => {
    try {
        await House.deleteMany({});
        formatResponse(res, 200, true, 'All houses deleted successfully', null);
    } catch (error) {
        formatResponse(res, 500, false, 'Internal Server Error', null);
    }
});

module.exports = {
    createHouse,
    getAllHouses,
    getHouseById,
    updateHouseById,
    deleteHouseById,
    deleteAllHouse
};