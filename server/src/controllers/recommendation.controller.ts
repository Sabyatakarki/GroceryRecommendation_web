import { Response } from "express";
import recommendationDTO from "../dtos/recommedation.dtos";
import recommendationService from "../services/recommendation.service";
import Profile from "../models/profile.model";
import { AuthRequest } from "../middleware/auth.middlware";

class RecommendationController {
  async getRecommendations(req: AuthRequest, res: Response) {
    try {
      const data = recommendationDTO.validate(req.body);

      const recommendations =
        await recommendationService.getRecommendations(data);

      const userId = req.user!.userId;

      await Profile.findOneAndUpdate(
  { userId },
  {
    $push: {
      recommendationHistory: {
        goal: data.goal,
        diet: data.diet,
        age: data.age,
        gender: data.gender,
        height: data.height,
        weight: data.weight,
        allergies: data.allergies,
        products: recommendations.map((p) => p._id),
      },
    },
  },
  {
    new: true,
  }
);

      return res.status(200).json({
        success: true,
        message: "Recommendations fetched successfully.",
        data: recommendations,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new RecommendationController();