import { Router } from "express";
import userController from "../controllers/user.controller";
import { uploads } from "../middleware/upload.middlware";

const router = Router();

// Authentication
router.post("/register", userController.register);
router.post("/login", userController.login);

// User Profile
router.get("/profile/:userId", userController.getProfile);
router.put(
  "/profile/:userId",
  uploads.profile.single,
  userController.updateProfile
);

export default router;