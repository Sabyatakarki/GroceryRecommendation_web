import { Router } from "express";
import userController from "../controllers/user.controller";

const router = Router();

// Authentication
router.post("/register", userController.register);
router.post("/login", userController.login);

// User Profile
router.get("/profile/:userId", userController.getProfile);
router.put("/profile/:userId", userController.updateProfile);

export default router;