export interface RegisterUserDto {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface UpdateProfileDto {
  fullName?: string;
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
}