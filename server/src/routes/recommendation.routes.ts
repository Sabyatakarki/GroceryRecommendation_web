import { Router } from "express";
import recommendationController from "../controllers/recommendation.controller";
import authMiddleware from "../middleware/auth.middlware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  recommendationController.getRecommendations
);

export default router;