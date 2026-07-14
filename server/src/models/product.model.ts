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
    
  },
  {
    timestamps: true,
  }
);



const Product = mongoose.model<IProduct>("Product", productSchema);



export default Product;