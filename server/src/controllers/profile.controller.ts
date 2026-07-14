import { Response } from "express";
import profileService from "../services/profile.service";
import { AuthRequest } from "../middleware/auth.middlware";

class ProfileController {
  // Get Profile
  async getProfile(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.userId;

      const profile = await profileService.getProfile(userId);

      return res.status(200).json({
        success: true,
        data: profile,
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Create or Update Profile
  async saveProfile(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.userId;

      const profile = await profileService.saveProfile(
        userId,
        req.body
      );

      return res.status(200).json({
        success: true,
        message: "Profile saved successfully.",
        data: profile,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new ProfileController();