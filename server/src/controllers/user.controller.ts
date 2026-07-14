import { Request, Response } from "express";
import userService from "../services/user.service";

class UserController {
  // Register User
  async register(req: Request, res: Response) {
    try {
      const result = await userService.register(req.body);

      return res.status(201).json({
        success: true,
        message: "User registered successfully.",
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Login User
  async login(req: Request, res: Response) {
    try {
      const result = await userService.login(req.body);

      return res.status(200).json({
        success: true,
        message: "Login successful.",
        data: result,
      });
    } catch (error: any) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Get User Profile
  async getProfile(req: Request, res: Response) {
    try {
      const userId = Array.isArray(req.params.userId)
        ? req.params.userId[0]
        : req.params.userId;

      if (!userId) {
        throw new Error("User ID is required.");
      }

      const user = await userService.getProfile(userId);

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Update User Profile
  async updateProfile(req: Request, res: Response) {
  try {
    const userId = Array.isArray(req.params.userId)
      ? req.params.userId[0]
      : req.params.userId;

    if (!userId) {
      throw new Error("User ID is required.");
    }

    const body = { ...req.body };

if (req.file) {
  body.profileImage = req.file.filename;
}

    // Convert values coming from FormData
    if (body.age) body.age = Number(body.age);
    if (body.height) body.height = Number(body.height);
    if (body.weight) body.weight = Number(body.weight);

    // Convert comma separated values to arrays
    if (body.allergies) {
      body.allergies = body.allergies
        .split(",")
        .map((item: string) => item.trim())
        .filter(Boolean);
    }

    if (body.healthConditions) {
      body.healthConditions = body.healthConditions
        .split(",")
        .map((item: string) => item.trim())
        .filter(Boolean);
    }

    const user = await userService.updateProfile(userId, body);

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
}

export default new UserController();