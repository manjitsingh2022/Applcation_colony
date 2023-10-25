import axios from "axios";
import { authHeader } from "./auth-header";
import { API_URL } from "../config/config";

export const fetchSocietyMembersRequest = async (page) => {
    return await axios
        .get(`${API_URL}society-members?${page}`, {
            headers: authHeader()
        })
        .then((response) => {
            return response.data;
        });
};

export const createSocietyMemberRequest = async (societyMemberData) => {
    try {
        const response = await axios.post(API_URL + "society-members", societyMemberData, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error creating society member:', error);
        throw error;
    }
};

export const updateSocietyMemberRequest = async (societyMemberData) => {
    return await axios
        .put(API_URL + "society-members/" + societyMemberData._id, societyMemberData, {
            headers: authHeader()
        })
        .then((response) => {
            return response.data;
        });
};

export const deleteSocietyMemberRequest = async (societyMemberId) => {
    return await axios
        .delete(API_URL + "society-members/" + societyMemberId, {
            headers: authHeader()
        })
        .then((response) => {
            return response.data;
        });
};

const societyDataService = {
    fetchSocietyMembersRequest,
    createSocietyMemberRequest,
    updateSocietyMemberRequest,
    deleteSocietyMemberRequest,
};

export default societyDataService;
