import axios from "axios";
import { authHeader } from "./auth-header";
import { API_URL } from "../config/config";

export const fetchMaintenanceDataRequest = async (page) => {

    return await axios
        .get(`${API_URL}maintenance-requests?${page}`, {
            headers: authHeader()
        })
        .then((response) => {
            console.log(response, 'responsoeeee')
            return response.data;
        });
};

export const createMaintenanceDataRequest = async (maintenanceData) => {
    console.log(maintenanceData, 'tryrequest')
    try {
        console.log(maintenanceData, 'tryrequest')
        const response = await axios.post(`${API_URL}maintenance-requests`, maintenanceData, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error creating maintenance data:', error);
        throw error;
    }
};

export const updateMaintenanceDataRequest = async (maintenanceData) => {
    console.log("requesmain", maintenanceData)
    return await axios
        .put(API_URL + "maintenance-requests/" + maintenanceData.userId, maintenanceData, {
            headers: authHeader()
        })
        .then((response) => {
            return response.data;
        });
};

export const deleteMaintenanceDataRequest = async (maintenanceId) => {
    console.log(maintenanceId, 'maintenanceId')
    return await axios
        .delete(API_URL + "maintenance-requests/" + maintenanceId, {
            headers: authHeader()
        })
        .then((response) => {
            console.log(response, 'respndeleeeeeeeeeeee')
            return response;
        });
};

const maintenanceDataService = {
    fetchMaintenanceDataRequest,
    createMaintenanceDataRequest,
    updateMaintenanceDataRequest,
    deleteMaintenanceDataRequest,
};

export default maintenanceDataService;
