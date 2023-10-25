import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../slices/message";
import authService from "../../services/auth.service";



export const registerOnly = createAsyncThunk(
    "users/register",
    async ({ name, email, password }, thunkAPI) => {

        try {


            console.log(name, email, password, 'name, email, password')

            const response = await authService.registerOnly(name, email, password);
            // thunkAPI.dispatch(setMessage(response.data.message));
            console.log(response.data, 'dataaaaa')
            return response.data;
        } catch (error) {
            console.log(error, 'errrororo')
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);


export const register = createAsyncThunk(
    "users/register",
    async ({ name, email, password, role }, thunkAPI) => {

        try {


            console.log(name, email, password, role, 'name, email, password, role')

            const response = await authService.register(name, email, password, role);
            // thunkAPI.dispatch(setMessage(response.data.message));
            console.log(response, 'registercreatethunk')
            return response;
        } catch (error) {
            console.log(error, 'errrororo')
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);



export const login = createAsyncThunk(
    "users/login",
    async ({ email, password }, thunkAPI) => {
        try {
            const data = await authService.login(email, password);
            console.log(data, 'dataaaaaaaaaaaaaaaaa')
            return { user: data };
        } catch (error) {
            console.log(error, 'error')

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message, 'message')
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);

export const logout = createAsyncThunk("users/logout", async () => {
    await authService.logout();
});



export const getUser = createAsyncThunk('users/user', async (_, thunkAPI) => {
    try {
        const response = await authService.getUser();
        return { user: response };
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue(message);
    }
});



export const updateUser = createAsyncThunk(
    'users/updateUser',
    async ({ name, address, phone, photo }, thunkAPI) => {
        try {
            const response = await authService.updateUser({
                name,
                address,
                phone,
                photo,
            });
            return response.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updatePhoto = createAsyncThunk(
    'users/updatePhoto',
    async ({ photo }, thunkAPI) => {
        try {
            const response = await authService.updatePhoto({
                photo,
            });
            return response.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue(message);
        }
    }
);


export const getUsers = createAsyncThunk('users/all-Users', async (page, thunkAPI) => {
    try {
        const response = await authService.getUsers(page);
        console.log(response, 'getUsers23232323232')
        return response;
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        thunkAPI.dispatch(setMessage(message));
        console.log(message, 'message')
        return thunkAPI.rejectWithValue(message);
    }
});



export const updateUserById = createAsyncThunk(
    'user/updateUserById',
    async ({ userId, name, address, phone, status, password, photo, role }, thunkAPI) => {
        console.log(userId, name, address, phone, status, password, role, 'first')
        try {
            const response = await authService.updateUserById(userId, name, address, phone, status, password, photo, role);
            return response;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteUserById = createAsyncThunk(
    'user/deleteUserById',
    async ({ userId }, thunkAPI) => {
        console.log(userId, 'fghghfghhhhfgdlete')
        try {
            const response = await authService.deleteUserById(userId);
            return response.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const changePassword = createAsyncThunk(
    'users/changePassword',
    async ({ password, newPassword }, thunkAPI) => {
        console.log(password, newPassword, 'changePassword1 step')
        try {
            const response = await authService.changePassword(password, newPassword);
            return response;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue(message);
        }
    }
);





























