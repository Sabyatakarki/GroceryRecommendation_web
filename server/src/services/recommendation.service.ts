import Product from "../models/product.model";
import { RecommendationType } from "../types/recommendation.types";

class RecommendationService {
  async getRecommendations(data: RecommendationType) {
    const {
      goal,
      diet,
    } = data;

    let query: any = {};

    // Recommendation based on user's goal
    switch (goal) {
      case "Weight Loss":
        query = {
          calories: { $lte: 200 },
          fat: { $lte: 8 },
        };
        break;

      case "Weight Gain":
        query = {
          calories: { $gte: 250 },
        };
        break;

      case "Build Muscle":
        query = {
          protein: { $gte: 20 },
        };
        break;

      case "Maintain Weight":
  query = {
    calories: {
      $gte: 50,
      $lte: 300,
    },
  };
  break;

      case "Healthy Eating":
        query = {};
        break;
    }

    let products = await Product.find(query);

    // Filter by dietary preference
    if (diet === "High Protein") {
      products = products.filter((product) => product.protein >= 15);
    }

    if (diet === "Low Carb") {
      products = products.filter((product) => product.carbohydrates <= 20);
    }

    if (diet === "Balanced Diet") {
  products = products.filter(
    (product) =>
      product.calories <= 300 &&
      product.fat <= 15
  );
}

    // Vegetarian and Vegan filtering can be added later
    // once your Product model includes a dietaryType field.

    return products;
  }
}

export default new RecommendationService();