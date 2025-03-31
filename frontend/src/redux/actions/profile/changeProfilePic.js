import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";

export const changeProfilePic = createAsyncThunk(
    "profile/changeProfilePic",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch("/profile/change-profile-pic", userData);
            if (!response.data || !response.data.user) {
                throw new Error("Invalid response from server");
            }

            return response.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
)