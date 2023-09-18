const asyncHandler = require('express-async-handler');
const MaintenanceRequest = require('../models/maintenanceRequestModel');

// Create a new maintenance request
const createMaintenanceRequest = asyncHandler(async (req, res) => {
    try {
        const { requester, description, status } = req.body;

        const maintenanceRequest = await MaintenanceRequest.create({ requester, description, status });

        res.status(201).json(maintenanceRequest);
    } catch (error) {
        // Handle the error, e.g., send an error response
        res.status(500).json({ error: 'Unable to create maintenance request' });
    }
});

// Get all maintenance requests
const getMaintenanceRequests = asyncHandler(async (req, res) => {
    try {
        const maintenanceRequests = await MaintenanceRequest.find();

        res.status(200).json(maintenanceRequests);
    } catch (error) {
        // Handle the error, e.g., send an error response
        res.status(500).json({ error: 'Unable to fetch maintenance requests' });
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
            return res.status(404).json({ error: 'Maintenance request not found' });
        }

        res.status(200).json(maintenanceRequest);
    } catch (error) {
        res.status(500).json({ error: 'Unable to update maintenance request status' });
    }
});





// const updateMaintenanceRequestStatus = asyncHandler(async (req, res) => {
//     const requestId = req.params.id;
//     const requestData = req.body;

//     try {
//         const updatedRequest = maintenanceController.updateMaintenanceRequest(requestId, requestData);

//         res.status(200).json(updatedRequest);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

const deleteMaintenanceRequest = asyncHandler(async (req, res) => {
    const requestId = req.params.id;
    console.log(requestId, 'idddd');

    try {
        const deletedRequest = await MaintenanceRequest.deleteOne({ _id: requestId });
        if (!deletedRequest) {
            return res.status(404).json({ error: 'Maintenance request not found' });
        }

        // Send a success message along with a 204 status code
        res.status(204).json({ message: 'Maintenance request deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});









module.exports = { createMaintenanceRequest, getMaintenanceRequests, updateMaintenanceRequestStatus, deleteMaintenanceRequest };
