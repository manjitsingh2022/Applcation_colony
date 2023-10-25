import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../slices/message";
import maintenanceDataService from "../../services/maintenance.service";

// Create an async thunk for fetching maintenances
export const fetchMaintenances = createAsyncThunk('maintenance/fetchMaintenances', async (page, thunkAPI) => {
    try {

        const response = await maintenanceDataService.fetchMaintenanceDataRequest(page);
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

// Create an async thunk for creating a maintenance
export const createMaintenance = createAsyncThunk('maintenances/createMaintenance',
    async (maintenanceData, thunkAPI) => {
        console.log(maintenanceData, 'thuk maindata')
        try {
            const response = await maintenanceDataService.createMaintenanceDataRequest(maintenanceData);
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


// Create an async thunk for updating a maintenance
export const updateMaintenance = createAsyncThunk('maintenances/updateMaintenance',
    async (maintenanceData, thunkAPI) => {
        try {
            console.log(maintenanceData, 'updateMaintenancemainnnnnnn')
            const response = await maintenanceDataService.updateMaintenanceDataRequest(maintenanceData);
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


// Create an async thunk for deleting a maintenance
export const deleteMaintenance = createAsyncThunk('maintenances/deleteMaintenance',
    async (maintenanceId, thunkAPI) => {
        try {
            console.log(maintenanceId, 'idddddmaintance')
            const response = await maintenanceDataService.deleteMaintenanceDataRequest(maintenanceId);
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
