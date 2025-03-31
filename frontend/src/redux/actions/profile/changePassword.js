import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";

export const changePassword = createAsyncThunk(
    "profile/changePassword",
    async(passwords, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch("/profile/change-password", passwords);
            if (!response.data) {
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