import { execFile } from "child_process";
import { promisify } from "util";
import Product from "../models/product.model";
import { RecommendationType } from "../types/recommendation.types";
import { PYTHON_PATH, ML_RECOMMEND_SCRIPT } from "../config";

const execFileAsync = promisify(execFile);

const RESULT_LIMIT = 12;
const CANDIDATE_POOL_SIZE = 50;

interface MLRecommendation {
  _id: string;
  similarityScore: number;
}

class RecommendationService {
  async getRecommendations(data: RecommendationType) {
    const { goal, diet } = data;

    const ranked = await this.runMLRecommendation(goal);
    const scoreById = new Map(
      ranked.map((item) => [item._id, item.similarityScore])
    );

    const orderedIds = ranked.map((item) => item._id);

    const products = await Product.find({ _id: { $in: orderedIds } });
    const productById = new Map(
      products.map((product) => [product._id.toString(), product])
    );

    let ordered = orderedIds
      .map((id) => productById.get(id))
      .filter(
        (product): product is (typeof products)[number] => Boolean(product)
      );

    // Dietary preference is a hard constraint applied on top of the
    // nutrition-similarity ranking produced by the ML script.
    if (diet === "High Protein") {
      ordered = ordered.filter((product) => product.protein >= 15);
    }

    if (diet === "Low Carb") {
      ordered = ordered.filter((product) => product.carbohydrates <= 20);
    }

    if (diet === "Balanced Diet") {
      ordered = ordered.filter(
        (product) => product.calories <= 300 && product.fat <= 15
      );
    }

    return ordered.slice(0, RESULT_LIMIT).map((product) => ({
      ...product.toObject(),
      matchScore: Math.round(
        (scoreById.get(product._id.toString()) ?? 0) * 100
      ),
    }));
  }

  private async runMLRecommendation(
    goal: string
  ): Promise<MLRecommendation[]> {
    const payload = JSON.stringify({ goal, limit: CANDIDATE_POOL_SIZE });

    const { stdout } = await execFileAsync(PYTHON_PATH, [
      ML_RECOMMEND_SCRIPT,
      payload,
    ]);

    const result = JSON.parse(stdout);

    if (!result.success) {
      throw new Error(result.error || "Failed to generate recommendations.");
    }

    return result.data as MLRecommendation[];
  }
}

export default new RecommendationService();