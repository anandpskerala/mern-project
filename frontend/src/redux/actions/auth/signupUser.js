import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";

export const signupUser = createAsyncThunk(
    "auth/signupUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/auth/signup", userData);
            if (!response.data || !response.data.user) {
                throw new Error("Invalid response from server");
            }
            return response.data.user;
        } catch (error) {
            console.log(error)
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
)