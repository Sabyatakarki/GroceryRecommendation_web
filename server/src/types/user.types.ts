import { z } from "zod";

export const UserSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),

  email: z.string().email("Invalid email address"),

  password: z.string().min(6, "Password must be at least 6 characters"),

  profileImage: z.string().optional(),

  age: z.number().optional(),

  gender: z.enum(["Male", "Female", "Other"]).optional(),

  height: z.number().optional(),

  weight: z.number().optional(),

  activityLevel: z
    .enum([
      "Sedentary",
      "Lightly Active",
      "Moderately Active",
      "Very Active",
    ])
    .optional(),

  fitnessGoal: z
    .enum([
      "Lose Weight",
      "Maintain Weight",
      "Gain Weight",
    ])
    .optional(),

  dietaryPreference: z
    .enum([
      "Vegetarian",
      "Vegan",
      "Non-Vegetarian",
    ])
    .optional(),

  allergies: z.array(z.string()).optional(),

  healthConditions: z.array(z.string()).optional(),

  bmi: z.number().optional(),

  recommendedCalories: z.number().optional(),

  recommendedProtein: z.number().optional(),
});

export type UserType = z.infer<typeof UserSchema>;