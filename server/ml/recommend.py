import os
import sys
import json

import pandas as pd
from pymongo import MongoClient
from dotenv import load_dotenv
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity

load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

MONGO_URI = os.getenv("MONGO_URI")

FEATURES = ["calories", "protein", "carbohydrates", "fat", "fiber", "sugar"]

# Ideal nutrition profile (per product) for each supported goal.
# Values are chosen relative to the dataset's own nutrition ranges,
# not arbitrary hardcoded filters - they define the target point that
# every product is ranked against using cosine similarity.
GOAL_PROFILES = {
    "weight loss": {"calories": 120, "protein": 20, "carbohydrates": 10, "fat": 3, "fiber": 6, "sugar": 1},
    "weight gain": {"calories": 450, "protein": 25, "carbohydrates": 40, "fat": 18, "fiber": 3, "sugar": 5},
    "build muscle": {"calories": 250, "protein": 35, "carbohydrates": 15, "fat": 6, "fiber": 4, "sugar": 1},
    "maintain weight": {"calories": 200, "protein": 15, "carbohydrates": 15, "fat": 8, "fiber": 3, "sugar": 2},
    "healthy eating": {"calories": 150, "protein": 15, "carbohydrates": 12, "fat": 5, "fiber": 8, "sugar": 1},
}


def get_recommendations(goal: str, limit: int = 50):
    profile = GOAL_PROFILES.get(goal.strip().lower(), GOAL_PROFILES["healthy eating"])

    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    try:
        collection = client["grocery_recommendation"]["products"]
        products = list(collection.find({}, {**{f: 1 for f in FEATURES}, "_id": 1}))
    finally:
        client.close()

    if not products:
        return []

    df = pd.DataFrame(products)
    for feature in FEATURES:
        if feature not in df.columns:
            df[feature] = 0
    df[FEATURES] = df[FEATURES].fillna(0)

    scaler = MinMaxScaler()
    scaled_products = scaler.fit_transform(df[FEATURES])

    target_vector = pd.DataFrame([[profile[feature] for feature in FEATURES]], columns=FEATURES)
    scaled_target = scaler.transform(target_vector)

    df["similarityScore"] = cosine_similarity(scaled_products, scaled_target).flatten()
    df = df.sort_values("similarityScore", ascending=False).head(limit)

    return [
        {
            "_id": str(row["_id"]),
            "similarityScore": round(float(row["similarityScore"]), 4),
        }
        for _, row in df.iterrows()
    ]


def main():
    try:
        raw_input = sys.argv[1] if len(sys.argv) > 1 else "{}"
        payload = json.loads(raw_input)

        goal = payload.get("goal", "Healthy Eating")
        limit = int(payload.get("limit", 50))

        recommendations = get_recommendations(goal, limit)

        print(json.dumps({"success": True, "data": recommendations}))
    except Exception as error:
        print(json.dumps({"success": False, "error": str(error)}))
        sys.exit(1)


if __name__ == "__main__":
    main()
