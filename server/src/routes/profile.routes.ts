import { Router } from "express";
import profileController from "../controllers/profile.controller";
import authMiddleware from "../middleware/auth.middlware";

const router = Router();

// Get logged-in user's profile
router.get(
  "/",
  authMiddleware,
  profileController.getProfile
);

// Create or Update logged-in user's profile
router.put(
  "/",
  authMiddleware,
  profileController.saveProfile
);

export default router;