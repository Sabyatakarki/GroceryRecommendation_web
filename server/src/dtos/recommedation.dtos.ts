import { RecommendationSchema, RecommendationType } from "../types/recommendation.types";

class RecommendationDTO {
  validate(data: unknown): RecommendationType {
    return RecommendationSchema.parse(data);
  }
}

export default new RecommendationDTO();