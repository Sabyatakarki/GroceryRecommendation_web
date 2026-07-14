import z from "zod";

export const RecommendationSchema = z.object({
  age: z.number().min(1),

  gender: z.enum([
    "Male",
    "Female",
    "Other",
  ]),

  height: z.number().min(50),

  weight: z.number().min(10),

  goal: z.enum([
    "Weight Loss",
    "Weight Gain",
    "Maintain Weight",
    "Build Muscle",
    "Healthy Eating",
  ]),

  diet: z.enum([
    "Vegetarian",
    "Vegan",
    "High Protein",
    "Low Carb",
    "Balanced Diet",
  ]),

  allergies: z.array(z.string()).optional(),
});

export type RecommendationType = z.infer<
  typeof RecommendationSchema
>;