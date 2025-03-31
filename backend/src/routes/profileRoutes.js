import { Router } from "express";
import { protectedRoute } from "../middlewares/authMiddleware.js";
import { changePassword, changeProfilePic, editUserInfo } from "../controllers/profileController.js";

const route = Router();

route.patch("/edit", protectedRoute, editUserInfo);
route.patch("/change-password", protectedRoute, changePassword);
route.patch("/change-profile-pic", protectedRoute, changeProfilePic);

export default route;