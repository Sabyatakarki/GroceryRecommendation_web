import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userRepository from "../respositories/user.repository";
import {
  LoginUserDto,
  RegisterUserDto,
  UpdateProfileDto,
} from "../dtos/user.dtos";

class UserService {
  // Register User
  async register(data: RegisterUserDto) {
    const existingUser = await userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("Email already exists.");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await userRepository.create({
      fullName: data.fullName,
      email: data.email,
      password: hashedPassword,
    });

    return {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    };
  }

  // Login User
  async login(data: LoginUserDto) {
    const user = await userRepository.findByEmail(data.email);

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    const isPasswordMatched = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!isPasswordMatched) {
      throw new Error("Invalid email or password.");
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    return {
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImage: user.profileImage,
      },
    };
  }

  // Get User Profile
  async getProfile(userId: string) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  }

  // Update User Profile
  async updateProfile(userId: string, data: UpdateProfileDto) {
    let bmi: number | undefined;
    let recommendedCalories: number | undefined;
    let recommendedProtein: number | undefined;

    if (data.height && data.weight) {
      const heightInMeters = data.height / 100;

      bmi = Number(
        (data.weight / (heightInMeters * heightInMeters)).toFixed(2)
      );
    }

    if (data.weight && data.activityLevel) {
      let activityMultiplier = 1.2;

      switch (data.activityLevel) {
        case "Lightly Active":
          activityMultiplier = 1.375;
          break;

        case "Moderately Active":
          activityMultiplier = 1.55;
          break;

        case "Very Active":
          activityMultiplier = 1.725;
          break;
      }

      recommendedCalories = Math.round(
        data.weight * 24 * activityMultiplier
      );
    }

    if (data.weight) {
      recommendedProtein = Math.round(data.weight * 1.2);
    }

    const updatedUser = await userRepository.updateById(userId, {
      ...data,
      bmi,
      recommendedCalories,
      recommendedProtein,
    });

    if (!updatedUser) {
      throw new Error("User not found.");
    }

    return updatedUser;
  }
}

export default new UserService();