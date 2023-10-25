import { createSlice } from '@reduxjs/toolkit';
import {
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
} from '../actions/eventAction';

const initialState = {
    message: '',
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
};

const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                state.data = action.payload.data;
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message;
            })
            .addCase(createEvent.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(createEvent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                state.data = [...state.data, action.payload.data];
            })
            .addCase(createEvent.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message;
            })
            .addCase(updateEvent.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(updateEvent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                state.data = state.payload
            })
            .addCase(updateEvent.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message;
            })
            .addCase(deleteEvent.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(deleteEvent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                state.data = state.payload
            })
            .addCase(deleteEvent.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message;
            });
    },
});

export const { reducer } = eventSlice;
export default reducer;
