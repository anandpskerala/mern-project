import bcrypt from 'bcryptjs';
import userModel from '../models/userModel.js';
import cloud from '../utils/cloudinary.js';

export const editUserInfo = async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;
        if (!firstName || firstName.trim() == "" || !lastName || lastName.trim() == "" || !email || email.trim() == "") {
            return res.status(400).json({ message: "Fill all the required fields" });
        }

        let user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await userModel.updateOne({ email }, { firstName, lastName });
        user = await userModel.findOne({ email })
        return res.status(200).json({ user, message: "Changes saved" });
    } catch (error) {
        console.error("Error in editing user info: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const changePassword = async (req, res) => {
    try {
        const { id, currentPassword, newPassword } = req.body;

        if (!id || !currentPassword || !newPassword) {
            return res.status(400).json({ message: "Fill all the required fields" });
        }

        const user = await userModel.findOne({ _id: id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const checkPassword = await bcrypt.compare(currentPassword, user.password);
        if (!checkPassword) {
            return res.status(401).json({message: "Current password is incorrect"});
        }
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        await userModel.updateOne({ _id: id }, { password: hashedPassword});
        return res.status(200).json({message: "Password changed"});
    } catch (error) {
        console.error("Error in editing changing password: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const changeProfilePic = async (req, res) => {
    try {
        const { id, profileImg } = req.body;
        if (!id || !profileImg) {
            return res.status(400).json({ message: "Fill all the required fields" });
        }

        let user = await userModel.findOne({ _id: id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.profileImg) {
            const publicId = user.profileImg.split("/").pop().split(".")[0];
            cloud.uploader.destroy(publicId);
        }
        await userModel.updateOne({_id: id}, {profileImg});
        user = await userModel.findOne({_id: id});
        return res.status(200).json({ user, message: "Profile pic updated" });
    } catch (error) {
        console.error("Error in editing changing profile pic: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};