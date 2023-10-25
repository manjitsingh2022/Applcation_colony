import axios from "axios";
import { authHeader } from "./auth-header";
import { API_URL } from "../config/config";

export const fetchEventsRequest = async (page) => {
    return await axios
        .get(`${API_URL}events?${page}`, {
            headers: authHeader()
        })
        .then((response) => {
            return response.data;
        });
};

export const createEventRequest = async (eventData) => {
    try {
        const response = await axios.post(API_URL + "events", eventData, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error creating event:', error);
        throw error;
    }
};

export const updateEventRequest = async (eventData) => {
    return await axios
        .put(API_URL + "events/" + eventData._id, eventData, {
            headers: authHeader()
        })
        .then((response) => {
            return response.data;
        });
};

export const deleteEventRequest = async (eventId) => {
    return await axios
        .delete(API_URL + "events/" + eventId, {
            headers: authHeader()
        })
        .then((response) => {
            return response.data;
        });
};

const eventService = {
    fetchEventsRequest,
    createEventRequest,
    updateEventRequest,
    deleteEventRequest,
};

export default eventService;
