import pandas as pd
from pymongo import MongoClient

# -----------------------------
# MongoDB Connection
# -----------------------------
client = MongoClient("mongodb://localhost:27017/")

db = client["grocery_recommendation"]

collection = db["products"]

# -----------------------------
# Read CSV
# -----------------------------
df = pd.read_csv("dataset/cleaned_food_dataset.csv")

print(f"Loaded {len(df)} products.")

# -----------------------------
# Convert DataFrame to Dictionary
# -----------------------------
products = df.to_dict(orient="records")

# -----------------------------
# Remove Existing Products
# -----------------------------
collection.delete_many({})

print("Old products deleted.")

# -----------------------------
# Insert New Products
# -----------------------------
collection.insert_many(products)

print(f"Successfully imported {len(products)} products!")

print("Done.")