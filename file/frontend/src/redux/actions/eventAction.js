import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../slices/message";
import eventService from "../../services/event.service";



// Create an async thunk for fetching events
export const fetchEvents = createAsyncThunk('events/fetchEvents', async (_, thunkAPI) => {
    try {
        const response = await eventService.fetchEventsRequest();
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

// Create an async thunk for creating a event
export const createEvent = createAsyncThunk('events/createEvent',
    async (_, thunkAPI) => {
        try {
            const response = await eventService.createEventRequest(eventData);
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


// Create an async thunk for updating a event
export const updateEvent = createAsyncThunk('events/updateEvent',
    async (_, thunkAPI) => {
        try {
            const response = await eventService.updateEventRequest(eventData);
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


// Create an async thunk for deleting a event
export const deleteEvent = createAsyncThunk('events/deleteEvent',
    async (_, thunkAPI) => {
        try {
            const response = await eventService.deleteEventRequest(eventId);
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
