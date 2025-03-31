import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/auth/logout");
            if (!response.data) {
                throw new Error("Invalid response from server");
            }
        } catch (error) {
            console.log(error)
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            ); 
        }
    }
)