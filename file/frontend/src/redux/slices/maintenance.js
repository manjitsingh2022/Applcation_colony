import { createSlice } from '@reduxjs/toolkit';
import {
    fetchMaintenances,
    createMaintenance,
    updateMaintenance,
    deleteMaintenance,
} from '../actions/maintenanceAction';

const initialState = {
    data: [],
    message: '',
    isLoading: false,
    isError: false,
    isSuccess: false,
};

const MaintenanceSlice = createSlice({
    name: 'Maintenances',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMaintenances.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchMaintenances.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                state.data = action.payload.data.data;
            })
            .addCase(fetchMaintenances.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message;
            })
            .addCase(createMaintenance.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(createMaintenance.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                state.data = [...state.data, action.payload.data.data];
            })
            .addCase(createMaintenance.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message;
            })
            .addCase(updateMaintenance.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(updateMaintenance.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                state.data = state.payload.data
            })
            .addCase(updateMaintenance.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message;
            })
            .addCase(deleteMaintenance.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(deleteMaintenance.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                state.data = state.payload.data
            })
            .addCase(deleteMaintenance.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message;
            });
    },
});

export const { reducer } = MaintenanceSlice;
export default reducer;
