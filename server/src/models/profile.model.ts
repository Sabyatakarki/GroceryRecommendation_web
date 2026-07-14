import mongoose, { Schema, Document } from "mongoose";

export interface IProfile extends Document {
  userId: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  goal: string;
  diet: string;
  allergies: string[];

  recommendationHistory: {
    goal: string;
    diet: string;
    age: number;
    gender: string;
    height: number;
    weight: number;
    allergies: string[];
    products: mongoose.Types.ObjectId[];
    createdAt: Date;
  }[];
}

const profileSchema = new Schema<IProfile>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },

    age: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },

    height: {
      type: Number,
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },

    goal: {
      type: String,
      required: true,
    },

    diet: {
      type: String,
      required: true,
    },

    allergies: {
      type: [String],
      default: [],
    },

    recommendationHistory: [
      {
        goal: String,
        diet: String,
        age: Number,
        gender: String,
        height: Number,
        weight: Number,

        allergies: {
          type: [String],
          default: [],
        },

        products: [
          {
            type: Schema.Types.ObjectId,
            ref: "Product",
          },
        ],

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model<IProfile>("Profile", profileSchema);

export default Profile;