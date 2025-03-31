import axios from "axios";
import { toast } from "react-toastify";

export const uploadToCloudinary = async (file) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", import.meta.env.VITE_CLOUD_PRESET);

        const cloudName = import.meta.env.VITE_CLOUD_NAME;

        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );

        return res.data.secure_url;
    } catch (error) {
        console.error("Upload Error:", error.response?.data || error.message);
        toast.error("Something went wrong");
        return null;
    }
};
