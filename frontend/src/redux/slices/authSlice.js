import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { loginUser } from '../actions/auth/loginUser';
import { signupUser } from '../actions/auth/signupUser';
import { logout } from '../actions/auth/logout';
import { verifyUser } from '../actions/auth/verifyUser';
import { editUserProfile } from '../actions/profile/editUserProfile';
import { changePassword } from '../actions/profile/changePassword';
import { changeProfilePic } from '../actions/profile/changeProfilePic';

const initialState = {
    user: undefined,
    loading: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.user = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                if (state.user.status == "blocked") {
                    toast.error("You have been blocked");
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                toast.error(action.payload);
            })
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.user = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                toast.error(action.payload);
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(logout.rejected, (state, action) => {
                toast.error(action.payload);
            })
            .addCase(verifyUser.pending, (state) => {
                state.loading = true;
                state.user = null;
            })
            .addCase(verifyUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(verifyUser.rejected, (state) => {
                state.loading = false;
                state.user = null;
            })
            .addCase(editUserProfile.pending, (state) => {
                state.loading = true;
                state.user = null;
            })
            .addCase(editUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                toast.success(action.payload.message);
            })
            .addCase(editUserProfile.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.payload);
            })
            .addCase(changePassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.loading = false;
                toast.success(action.payload.message);
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.payload);
            })
            .addCase(changeProfilePic.pending, (state) => {
                state.loading = true;
            })
            .addCase(changeProfilePic.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                toast.success(action.payload.message);
            })
            .addCase(changeProfilePic.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.payload);
            })
    }
})

export default authSlice.reducer;