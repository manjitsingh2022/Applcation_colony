import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../slices/message";
import societyDataService from "../../services/societyMember.service";

export const fetchSocieties = createAsyncThunk('societies/fetchSocieties', async (_, thunkAPI) => {
    try {
        const response = await societyDataService.fetchSocietyDataRequest();
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
});


// Create an async thunk for creating a society
export const createSociety = createAsyncThunk('societies/createSociety', async (societyData, thunkAPI) => {
    try {
        const response = await societyDataService.createSocietyDataRequest(societyData);
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
});


// Create an async thunk for updating a society
export const updateSociety = createAsyncThunk('societies/updateSociety', async (societyData, thunkAPI) => {
    try {
        const response = await societyDataService.updateSocietyDataRequest(societyData);
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
});


// Create an async thunk for deleting a society
export const deleteSociety = createAsyncThunk('societies/deleteSociety', async (societyId, thunkAPI) => {
    try {
        const response = await societyDataService.deleteSocietyDataRequest(societyId);
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
});
