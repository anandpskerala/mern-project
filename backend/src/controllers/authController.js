import bcrypt from 'bcryptjs';
import userModel from '../models/userModel.js';
import { generateToken } from '../utils/authToken.js';

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || email.trim() == "" || !password || password.trim() == "") {
            return res.status(400).json({message: "Email / Password doesn't match"});
        }

        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(400).json({message: "Email / Password doesn't match"});
        }
        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(400).json({message: "Email / Password doesn't match"});
        }
        generateToken(res, user._id);
        return res.status(200).json({user, message: "Login successful"});
    } catch (error) {
        console.error("Error in login : ", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const signupUser = async (req, res) => {
    try {
        const { firstName, lastName = "", email, password } = req.body;
        if (!firstName || firstName.trim() == "" || !email || email.trim() == "" || !password || password.trim() == "") {
            return res.status(400).json({message: "Fill all the required fields"});
        }
        let user = await userModel.findOne({email});
        if (user) {
            return res.status(403).json({message: "User already exists"});
        }
        const salt = await bcrypt.genSalt(12); 
        const hashedPassword = await bcrypt.hash(password, salt);
        user = await userModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })
        generateToken(res, user._id);
        return res.status(201).json({user, message: "Signup successful"});
    } catch (error) {
        console.error("Error in sign : ", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("token", "", {
            maxAge: 0
        })
        return res.status(200).json({ message: "Logout successful" })
    } catch (error) {
        console.error("Error in logout: ", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const verify = (req, res) => {
    try {
        return res.status(200).json({user: req.user});
    } catch (err) {
        console.log("Error in auth check : ", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}