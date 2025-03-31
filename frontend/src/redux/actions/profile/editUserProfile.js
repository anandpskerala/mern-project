import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";

export const editUserProfile = createAsyncThunk(
    "profile/editUserProfile", 
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch("/profile/edit", userData);
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