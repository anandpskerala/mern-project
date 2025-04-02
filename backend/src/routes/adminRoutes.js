import { Router } from "express";
import { createUser, deleteUser, editUser, getUsers } from "../controllers/adminController.js";
import { protectedRoute } from "../middlewares/authMiddleware.js";

const route = Router();

route.post("/get-users", protectedRoute, getUsers);
route.post("/create-user", protectedRoute, createUser);
route.patch("/edit-user", protectedRoute, editUser);
route.delete("/delete-user/:id", protectedRoute, deleteUser);

export default route;