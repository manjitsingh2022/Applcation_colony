import { createSlice } from "@reduxjs/toolkit";
import { getUser, getUsers, login, changePassword, logout, register, updatePhoto, updateUser, updateUserById, deleteUserById } from "../actions/authAction";

const user = JSON.parse(localStorage.getItem("user"));

console.log(user, 'userrrrr')
const initialState = {
    role: user ? user.user.role : null,
    user: user || null,
    data: [],
    isLoggedIn: !!user,
    isLoading: false,
    isError: false,
    isSuccess: false,
    isLoadIn: false,
    message: '',
};

function isRejectedAction(action) {
    return action.type.endsWith('rejected');
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLoggedIn = true;
                state.message = action.payload;
                if (action.payload && action.payload.data) {
                    state.user = action.payload.data;
                    state.role = action.payload.data.user.role;
                    state.message = action.payload;
                }
                state.isError = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message;
                state.message = action.payload;

            })

            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLoggedIn = true;
                state.user = action.payload.user;
                state.role = action.payload.user.role;
                state.message = action.payload.message;

            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false; // Change isloading to isLoading
                state.isLoggedIn = false;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
            })
            .addCase(getUser.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isLoggedIn = false;
                state.isError = true;
                state.user = null;
                state.message = action.payload;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoadIn = true;
                state.user = action.payload;
                state.message = action.payload;
            })
            .addCase(getUsers.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoadIn = true;
                state.data = action.payload.data.data;
                state.message = action.payload.message;
            })
            .addCase(updateUser.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isLoggedIn = false;
                state.isError = true;
                state.user = null;
                state.message = action.payload.message;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoadIn = true;
                state.user = action.payload.data;
                state.message = action.payload;
            })
            .addCase(updatePhoto.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(updatePhoto.rejected, (state, action) => {
                state.isLoading = false;
                state.isLoggedIn = false;
                state.isError = true;
                state.user = null;
                state.message = action.payload;
            })
            .addCase(updatePhoto.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoadIn = true;
                state.user = action.payload.data;
                state.message = action.payload;
            })

            .addCase(updateUserById.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(updateUserById.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = null;
            })
            .addCase(updateUserById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload; // Error message
            })
            .addCase(deleteUserById.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(deleteUserById.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = null;
            })
            .addCase(deleteUserById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload; // Error message
            })

            .addCase(changePassword.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isLoggedIn = false;
                state.isError = true;
                state.data = null;
                state.message = action.payload;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoadIn = true;
                state.data = action.payload.data;
                state.message = action.payload;
            })
            .addMatcher(
                isRejectedAction,
                (state, action) => {
                    // Handle rejected actions here
                }
            );
    },
});

const { reducer } = authSlice;
export default reducer;
