import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;

  profileImage?: string;

  age?: number;
  gender?: "Male" | "Female" | "Other";

  height?: number;
  weight?: number;

  activityLevel?:
    | "Sedentary"
    | "Lightly Active"
    | "Moderately Active"
    | "Very Active";

  fitnessGoal?:
    | "Lose Weight"
    | "Maintain Weight"
    | "Gain Weight";

  dietaryPreference?:
    | "Vegetarian"
    | "Vegan"
    | "Non-Vegetarian";

  allergies?: string[];

  healthConditions?: string[];

  bmi?: number;

  recommendedCalories?: number;

  recommendedProtein?: number;
}

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String,
      default: "",
    },

    age: Number,

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    height: Number,

    weight: Number,

    activityLevel: {
      type: String,
      enum: [
        "Sedentary",
        "Lightly Active",
        "Moderately Active",
        "Very Active",
      ],
    },

    fitnessGoal: {
      type: String,
      enum: [
        "Lose Weight",
        "Maintain Weight",
        "Gain Weight",
      ],
    },

    dietaryPreference: {
      type: String,
      enum: [
        "Vegetarian",
        "Vegan",
        "Non-Vegetarian",
      ],
    },

    allergies: {
      type: [String],
      default: [],
    },

    healthConditions: {
      type: [String],
      default: [],
    },

    bmi: Number,

    recommendedCalories: Number,

    recommendedProtein: Number,
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", userSchema);

export default User;