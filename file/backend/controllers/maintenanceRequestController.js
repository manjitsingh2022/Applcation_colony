const asyncHandler = require('express-async-handler');
const MaintenanceRequest = require('../models/maintenanceRequestModel');
const { formatResponse } = require('../middleware/authMiddleware');

// Create a new maintenance request
const createMaintenanceRequest = asyncHandler(async (req, res) => {
    try {
        const { requester, description, title, status } = req.body;
        const maintenanceRequest = await MaintenanceRequest.create({ requester, description, title, status });
        formatResponse(res, 201, true, 'Maintenance request created successfully', maintenanceRequest);
    } catch (error) {
        formatResponse(res, 500, false, 'Unable to create maintenance request');
    }
});

// // Get all maintenance requests
// const getMaintenanceRequests = asyncHandler(async (req, res) => {
//     try {
//         const { page = 1, limit = 10, status } = req.query;

//         // Build the filter criteria based on the "status" query parameter
//         const filterCriteria = {};
//         if (status) {
//             filterCriteria.status = status;
//         }

//         // Use Mongoose aggregation
//         const data = await MaintenanceRequest.aggregate([
//             {
//                 $match: filterCriteria,
//             },
//             {
//                 $skip: (page - 1) * limit,
//             },
//             {
//                 $limit: parseInt(limit),
//             },
//             // Include additional aggregation stages as needed
//         ]);

//         // Get the total count of maintenance requests
//         const total_count = await MaintenanceRequest.countDocuments(filterCriteria);

//         // Modify the structure of the data array
//         const modifiedData = data.map((item) => ({
//             id: item._id,
//             requester: item.requester,
//             description: item.description,
//             status: item.status,
//             // Add or remove fields as needed
//         }));

//         console.log('Paginated and detailed maintenance request data fetched.');

//         formatResponse(res, 200, true, 'Successfully fetched paginated maintenance requests with details', {
//             total_count,
//             data: modifiedData,
//         });
//     } catch (error) {
//         console.error('Error fetching maintenance requests:', error);
//         formatResponse(res, 500, false, 'Internal Server Error', null);
//     }
// });


const getMaintenanceRequests = asyncHandler(async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        // Calculate the total count of maintenance requests
        const total_count = await MaintenanceRequest.countDocuments();

        // Use Mongoose aggregation to retrieve and format the data
        const data = await MaintenanceRequest.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'requester',
                    foreignField: '_id',
                    as: 'requesterDetails',
                },
            },
            {
                $unwind: {
                    path: '$requesterDetails',
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
                    title: 1,
                    description: 1,
                    status: 1,
                    requester: {
                        _id: { $ifNull: ['$requesterDetails._id', null] },
                        name: { $ifNull: ['$requesterDetails.name', null] },
                        // Include more fields as needed
                    },
                },
            },
        ]);

        console.log('Paginated and detailed maintenance request data fetched.');

        // Respond with the paginated and detailed data, including the total count
        formatResponse(res, 200, true, 'Successfully fetched paginated maintenance requests with details', {
            total_count, data,
        });
    } catch (error) {
        console.error('Error fetching maintenance requests:', error);
        formatResponse(res, 500, false, 'Internal Server Error', null);
    }
});



// Update the status of a maintenance request by admin
const updateMaintenanceRequestStatus = asyncHandler(async (req, res) => {
    try {
        const requestId = req.params.id;
        const { status } = req.body;

        // You can add authentication and authorization checks here to ensure the user is an admin.

        const maintenanceRequest = await MaintenanceRequest.findByIdAndUpdate(
            requestId,
            { status },
            { new: true }
        );

        if (!maintenanceRequest) {
            return formatResponse(res, 404, 'Maintenance request not found');
        }

        formatResponse(res, 200, true, 'Maintenance request status updated successfully', maintenanceRequest);
    } catch (error) {
        formatResponse(res, 500, false, 'Unable to update maintenance request status');
    }
});

const deleteMaintenanceRequest = asyncHandler(async (req, res) => {
    const requestId = req.params.id;

    try {
        const deletedRequest = await MaintenanceRequest.deleteOne({ _id: requestId });
        if (!deletedRequest) {
            return formatResponse(res, 404, 'Maintenance request not found');
        }

        formatResponse(res, 200, true, 'Maintenance request deleted successfully');
    } catch (error) {
        console.error(error);
        formatResponse(res, 500, false, 'Internal Server Error');
    }
});

module.exports = {
    createMaintenanceRequest,
    getMaintenanceRequests,
    updateMaintenanceRequestStatus,
    deleteMaintenanceRequest
};