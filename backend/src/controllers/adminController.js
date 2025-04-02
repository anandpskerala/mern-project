import bcrypt from 'bcryptjs';
import userModel from '../models/userModel.js';

export const getUsers = async (req, res) => {
    const { page = 0, query = "" } = req.body;
    const limit = 20;
    try {
        if (req.user.role === "admin") {
            const users = await userModel.find({
                $or: [
                    { firstName: { $regex: `.*${query}.*`, $options: "i" } },
                    { lastName: { $regex: `.*${query}.*`, $options: "i" } },
                    { email: { $regex: `.*${query}.*`, $options: "i" } },
                ],
            }).skip(page * limit).limit(limit);
            return res.status(200).json({users});
        }
        return res.status(401).json({message: "You don't have the access for this."});
    } catch (error) {
        console.error("Error in fetching users : ", error);
        return res.status(500).json({message: "Internal server error"});
    }
};


export const createUser = async (req, res) => {
    try {
        const { firstName, lastName = "", email, password, role, status } = req.body;
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
            password: hashedPassword,
            role,
            status
        })
        return res.status(201).json({user, message: "User created"});
    } catch (error) {
        console.error("Error in create user : ", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const editUser = async (req, res) => {
    try {
        const { id, firstName, lastName = "", email, role, status } = req.body;
        if (!firstName || firstName.trim() == "" || !email || email.trim() == "" || !id || id.trim() == "") {
            return res.status(400).json({message: "Fill all the required fields"});
        }
        let user = await userModel.findOne({_id: id});
        if (!user) {
            return res.status(404).json({message: "User doesn't exists"});
        }
        await userModel.updateOne({_id: id}, {$set: {firstName, lastName, email, role, status}});
        return res.status(200).json({user, message: "User edited"});
    } catch (error) {
        console.error("Error in edit user : ", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || id.trim() == "") {
            return res.status(400).json({message: "Fill all the required fields"});
        }
        let user = await userModel.findOne({_id: id});
        if (!user) {
            return res.status(404).json({message: "User doesn't exists"});
        }
        await userModel.deleteOne({_id: id});
        return res.status(200).json({user, message: "User deleted"});
    } catch (error) {
        console.error("Error in edit user : ", error);
        return res.status(500).json({message: "Internal server error"});
    }
}