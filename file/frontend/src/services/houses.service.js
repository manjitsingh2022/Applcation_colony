import axios from "axios";
import { authHeader } from "./auth-header";
import { API_URL } from "../config/config";

export const fetchHousesRequest = async (page) => {
    return await axios
        .get(`${API_URL}houses?page=${page}`, {
            headers: authHeader()
        })
        .then((response) => {
            return response.data;
        });
};

export const createHouseRequest = async (houseData) => {
    try {
        console.log(houseData, 'createHouseRequest');
        const response = await axios.post(API_URL + "houses", houseData, {
            headers: authHeader()
        });
        console.log(response, 'roooooo');
        return response;
    } catch (error) {

        console.error('Error creating house:', error);
        throw error;
    }
};

export const updateHouseRequest = async (houseData) => {

    console.log(houseData, 'updathouseeeeeeeeeeeeeeeeeee')
    try {
        console.log(houseData, 'checked');
        const response = await axios.put(`${API_URL}houses/${houseData.houseId}`, houseData, {
            headers: authHeader()
        });

        console.log(response, 'vallsllslsllslslslsl')
        return response;
    } catch (error) {
        console.error('Error updating house:', error);
        throw error;
    }
};




export const deleteHouseRequest = async (userId) => {
    console.log('deleteHouseRequest', userId)
    try {
        const response = await axios.delete(
            `${API_URL}houses/${userId}`,

            {
                headers: authHeader()
            }
        );
        console.log(response, 'House deleted successfully request')
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

const housesService = {
    fetchHousesRequest,
    createHouseRequest,
    updateHouseRequest,
    deleteHouseRequest,
};

export default housesService;
