const asyncHandler = require('express-async-handler');
const House = require('../models/houseModel');

// Create a new house
const createHouse = asyncHandler(async (req, res) => {
    try {
        const { houseNumber, owner, residents, propertyType } = req.body;

        console.log(req.body, 'housessss')
        const newHouse = new House({
            houseNumber,
            owner,
            residents,
            propertyType,
        });

        const createdHouse = await newHouse.save();

        res.status(201).json({ message: 'Successfully create a new house.' }, createdHouse);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get all houses
const getAllHouses = asyncHandler(async (req, res) => {
    try {
        const houses = await House.find();
        res.status(200).json(houses);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get a specific house by ID
const getHouseById = asyncHandler(async (req, res) => {
    try {
        const house = await House.findById(req.params.id);

        if (!house) {
            return res.status(404).json({ message: 'House not found' });
        }

        res.status(200).json(house);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Update a specific house by ID
const updateHouseById = asyncHandler(async (req, res) => {
    try {
        const house = await House.findById(req.params.id);

        if (!house) {
            return res.status(404).json({ message: 'House not found' });
        }

        house.houseNumber = req.body.houseNumber || house.houseNumber;
        house.owner = req.body.owner || house.owner;
        house.residents = req.body.residents || house.residents;
        house.propertyType = req.body.propertyType || house.propertyType;

        const updatedHouse = await house.save();

        res.status(200).json(updatedHouse);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Delete a specific house by ID
const deleteHouseById = asyncHandler(async (req, res) => {
    try {
        const house = await House.findById(req.params.id);

        if (!house) {
            return res.status(404).json({ message: 'House not found' });
        }

        await house.remove();

        res.status(204).json({ message: 'House removed' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Delete all notices
const deleteAllHouse = asyncHandler(async (req, res) => {

    try {
        await noticeModel.deleteMany({});
        res.status(200).json({ message: 'All notices deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = {
    createHouse,
    getAllHouses,
    getHouseById,
    updateHouseById,
    deleteHouseById, deleteAllHouse
};
