import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../slices/message";
import noticeDataService from "../../services/notice.service";

// Create an async thunk for fetching notices
export const fetchNotices = createAsyncThunk('notices/fetchNotices', async (page, userIdCheck, thunkAPI) => {

    try {

        console.log(userIdCheck, 'idddididididididi')
        const response = await noticeDataService.fetchNoticeDataRequest(page, userIdCheck);
        console.log(response, "fetchNotices1ffffffffff")
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

// Create an async thunk for creating a notice
export const createNotice = createAsyncThunk('notices/createNotice',
    async (noticeData, thunkAPI) => {
        try {
            const response = await noticeDataService.createNoticeDataRequest(noticeData);
            console.log(response, "fetchNotices1cccccccc")
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


// Create an async thunk for updating a notice
export const updateNotice = createAsyncThunk('notices/updateNotice',
    async (noticeData, thunkAPI) => {
        try {

            console.log(noticeData, 'updateNotice')
            const response = await noticeDataService.updateNoticeDataRequest(noticeData);
            console.log(response, "fetchNotices1uuuuu")
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


// Create an async thunk for deleting a notice
export const deleteNotice = createAsyncThunk('notices/deleteNotice',
    async (noticeId, thunkAPI) => {
        try {
            const response = await noticeDataService.deleteNoticeDataRequest(noticeId);
            console.log(response, "fetchNotices1ddd")
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
