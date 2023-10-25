import { createSlice } from '@reduxjs/toolkit';
import { createNotice, deleteNotice, fetchNotices, updateNotice } from '../actions/noticeAction';

const initialState = {
    message: '',
    isLoading: false,
    data: [],
    isError: false,
    isSuccess: false,
};

const noticeSlice = createSlice({
    name: 'notices',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotices.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchNotices.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = action.payload.success;
                state.message = action.payload.message;
                state.data = action.payload.data.data;
            })
            .addCase(fetchNotices.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message;
            })
            .addCase(createNotice.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(createNotice.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                state.data = [...state.data, action.payload.data];
            })
            .addCase(createNotice.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message;
            })
            .addCase(updateNotice.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(updateNotice.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                state.data = state.payload
            })
            .addCase(updateNotice.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message;
            })
            .addCase(deleteNotice.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(deleteNotice.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                state.data = state.payload
            })
            .addCase(deleteNotice.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message;
            });
    },
});

export const { reducer } = noticeSlice;
export default reducer;
