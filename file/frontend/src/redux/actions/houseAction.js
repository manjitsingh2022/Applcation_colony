import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../slices/message";
import housesService from "../../services/houses.service"
export const fetchHouses = createAsyncThunk(
    "houses/fetchHouses",
    async (page, thunkAPI) => {
        try {
            const response = await housesService.fetchHousesRequest(page);
            console.log(response, 'fetchHouses')
            return response;
        } catch (error) {
            console.error(error, 'error');
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            throw error;
        }
    }
);


export const deleteHouse = createAsyncThunk(
    "houses/deleteHouse",
    async (houseId, thunkAPI) => {

        console.log(houseId, 'deleteHouse')
        try {
            const response = await housesService.deleteHouseRequest(houseId);
            console.log(response, 'House deleted successfully11111')
            return response;
        } catch (error) {
            console.error(error, 'error');
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            throw error;
        }
    }
);


//  createHouse action
export const createHouse = createAsyncThunk(
    "houses/createHouse",
    async (houseData, thunkAPI) => {

        console.log(houseData, 'createHouse')
        try {
            const response = await housesService.createHouseRequest(houseData);
            console.log(response, 'created house response');


            return response.data;
        } catch (error) {
            console.error(error, 'error');
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            throw error;
        }
    }
);

// Define your updateHouse async action
export const updateHouse = createAsyncThunk(
    "houses/updateHouse",
    async (houseData, thunkAPI) => {

        console.log(houseData, 'checkupdatedHouse')
        try {
            const response = await housesService.updateHouseRequest(houseData);
            return response.data;
        } catch (error) {
            console.error(error, 'error');
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            throw error;
        }
    }
);
