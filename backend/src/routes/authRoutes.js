import { Router } from "express";
import { loginUser, logout, signupUser, verify } from "../controllers/authController.js";
import { protectedRoute } from "../middlewares/authMiddleware.js";

const route = Router();

route.post("/login", loginUser);
route.post("/signup", signupUser);
route.post("/logout", logout);
route.post("/verify", protectedRoute, verify);

export default route;