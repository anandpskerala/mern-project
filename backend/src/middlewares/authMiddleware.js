import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({message: "Unauthorized - No auth token provided"});
        }

        const decoded = jwt.decode(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({message: "Unauthorized - Invalid token"});
        }

        const user = await userModel.findOne({_id: decoded.userId});
        if (!user) {
            return res.status(401).json({message: "User not found"});
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protected route : ", error);
        return res.status(500).json({message: "Internal server error"});
    }
}