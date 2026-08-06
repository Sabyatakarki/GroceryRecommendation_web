import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  category: string;
  image?: string;

  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
  sugar: number;

  nutritionDensityScore: number;

  sodium: number;
  cholesterol: number;

  calcium: number;
  iron: number;
  potassium: number;
  magnesium: number;
  zinc: number;

  vitaminA: number;
  vitaminC: number;
  vitaminD: number;
  vitaminE: number;
  vitaminK: number;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      default: "",
    },

    category: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    calories: {
      type: Number,
      required: true,
    },

    protein: {
      type: Number,
      required: true,
    },

    carbohydrates: {
      type: Number,
      required: true,
    },

    fat: {
      type: Number,
      required: true,
    },

    fiber: {
      type: Number,
      required: true,
    },

    sugar: {
      type: Number,
      required: true,
    },

    nutritionDensityScore: {
      type: Number,
      required: true,
    },

    sodium: {
      type: Number,
      required: true,
    },

    cholesterol: {
      type: Number,
      required: true,
    },

    calcium: {
      type: Number,
      required: true,
    },

    iron: {
      type: Number,
      required: true,
    },

    potassium: {
      type: Number,
      required: true,
    },

    magnesium: {
      type: Number,
      required: true,
    },

    zinc: {
      type: Number,
      required: true,
    },

    vitaminA: {
      type: Number,
      required: true,
    },

    vitaminC: {
      type: Number,
      required: true,
    },

    vitaminD: {
      type: Number,
      required: true,
    },

    vitaminE: {
      type: Number,
      required: true,
    },

    vitaminK: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;