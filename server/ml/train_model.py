import pandas as pd

# -------------------------
# Load Dataset
# -------------------------
df = pd.read_csv("dataset/FOOD-DATA-GROUP1.csv")

print("Original Shape:", df.shape)

# -------------------------
# Remove unnecessary column
# -------------------------
if "Unnamed: 0" in df.columns:
    df.drop(columns=["Unnamed: 0"], inplace=True)

print("Unnamed column removed!")

# -------------------------
# Rename columns
# -------------------------
df.rename(columns={
    "food": "name",
    "Caloric Value": "calories",
    "Fat": "fat",
    "Carbohydrates": "carbohydrates",
    "Protein": "protein",
    "Dietary Fiber": "fiber",
    "Sugars": "sugar",
    "Nutrition Density": "nutritionDensityScore",
    "Sodium": "sodium",
    "Cholesterol": "cholesterol",
    "Calcium": "calcium",
    "Iron": "iron",
    "Magnesium": "magnesium",
    "Potassium": "potassium",
    "Zinc": "zinc",
    "Vitamin A": "vitaminA",
    "Vitamin C": "vitaminC",
    "Vitamin D": "vitaminD",
    "Vitamin E": "vitaminE",
    "Vitamin K": "vitaminK"
}, inplace=True)

print("Columns renamed!")

print("\nCurrent Columns:\n")
print(df.columns.tolist())

# -------------------------
# Save cleaned dataset
# -------------------------
df.to_csv("dataset/cleaned_food_dataset.csv", index=False)

print("\nCleaned dataset saved successfully!")
print("Shape:", df.shape)