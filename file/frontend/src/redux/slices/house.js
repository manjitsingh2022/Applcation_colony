import { createSlice } from '@reduxjs/toolkit';
import {
    fetchHouses,
    createHouse,
    updateHouse,
    deleteHouse,
} from '../actions/houseAction';

const initialState = {
    message: '',
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    payload: {
        message: '',
        data: null,
    },

};

const houseSlice = createSlice({
    name: 'houses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHouses.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchHouses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = action.payload.success;
                state.message = action.payload.message;
                state.data = action.payload.data.data;
            })
            .addCase(fetchHouses.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message;
            })
            .addCase(createHouse.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(createHouse.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = action.payload.success;
                state.message = action.payload.message;
                state.payload = action.payload;// Update payload data
            })
            .addCase(createHouse.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = action.payload.success;
                state.isError = true;
                state.message = action.error.message;
            })
            .addCase(updateHouse.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(updateHouse.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = action.payload.success;
                state.message = action.payload.message;
                state.payload = action.payload.data; // Update payload data
            })
            .addCase(updateHouse.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message;
            })
            .addCase(deleteHouse.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(deleteHouse.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = action.payload.success;
                state.message = action.payload.message;
                state.payload = action.payload.data; // Update payload data
            })
            .addCase(deleteHouse.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message;
            });
    },
});

export const { reducer } = houseSlice;
export default reducer;
