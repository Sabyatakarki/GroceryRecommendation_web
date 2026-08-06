import os
import pandas as pd
from pymongo import MongoClient
from pymongo.errors import PyMongoError
from dotenv import load_dotenv


load_dotenv("../.env")

MONGO_URI = os.getenv("MONGO_URI")


try:
    print("========================================")
    print("Connecting to MongoDB...")
    print("========================================")

    # Connect to MongoDB (5-second timeout)
    client = MongoClient(
    MONGO_URI,
    serverSelectionTimeoutMS=5000
)

    # Test connection
    client.server_info()

    print("✅ Connected to MongoDB")

    # Database
    db = client["grocery_recommendation"]

    # Collection
    collection = db["products"]

    print("Database:", db.name)
    print("Collection:", collection.name)

    print("\n========================================")
    print("Reading CSV...")
    print("========================================")

    # Read CSV
    df = pd.read_csv("dataset/cleaned_food_dataset.csv")

    print(f"✅ Loaded {len(df)} products.")

    # Convert dataframe to list of dictionaries
    products = df.to_dict(orient="records")

    print("\n========================================")
    print("Deleting old products...")
    print("========================================")

    result = collection.delete_many({})

    print(f"✅ Deleted {result.deleted_count} old products.")

    print("\n========================================")
    print("Importing products...")
    print("========================================")

    result = collection.insert_many(products)

    print(f"✅ Successfully imported {len(result.inserted_ids)} products!")

    print("\n========================================")
    print("IMPORT COMPLETED SUCCESSFULLY")
    print("========================================")

except PyMongoError as e:
    print("\n❌ MongoDB Error:")
    print(e)

except Exception as e:
    print("\n❌ General Error:")
    print(e)