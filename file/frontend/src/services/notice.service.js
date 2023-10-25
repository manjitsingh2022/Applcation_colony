import axios from "axios";
import { authHeader } from "./auth-header";
import { API_URL } from "../config/config";

export const fetchNoticeDataRequest = async (page) => {
    return await axios
        .get(`${API_URL}notices?${page}`, {
            headers: authHeader()
        })
        .then((response) => {
            return response.data;
        });
};

export const createNoticeDataRequest = async (noticeData) => {
    try {
        const response = await axios.post(API_URL + "notices", noticeData, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error creating notice data:', error);
        throw error;
    }
};

export const updateNoticeDataRequest = async (noticeData) => {
    console.log(noticeData, "updateNoticeDataRequest")
    return await axios
        .put(API_URL + "notices/" + noticeData.noticeId, noticeData, {
            headers: authHeader()
        })
        .then((response) => {
            return response.data;
        });
};

export const deleteNoticeDataRequest = async (noticeId) => {
    return await axios
        .delete(API_URL + "notices/" + noticeId, {
            headers: authHeader()
        })
        .then((response) => {
            return response.data;
        });
};

const noticeDataService = {
    fetchNoticeDataRequest,
    createNoticeDataRequest,
    updateNoticeDataRequest,
    deleteNoticeDataRequest,
};

export default noticeDataService;
