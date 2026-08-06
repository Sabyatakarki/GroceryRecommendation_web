import pandas as pd

df = pd.read_csv("dataset/FOOD-DATA-GROUP1.csv")

print("Original Shape:", df.shape)

if "Unnamed: 0" in df.columns:
    df.drop(columns=["Unnamed: 0"], inplace=True)

print("Unnamed column removed!")

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

# ==========================================
# Generate Categories
# ==========================================
def get_category(food):
    food = str(food).lower()

    fruits = [
        "apple","banana","orange","grape","mango","pear","peach",
        "pineapple","watermelon","berry","kiwi","papaya","lemon","lime",
        "avocado","melon","coconut"
    ]

    vegetables = [
        "broccoli","spinach","carrot","cabbage","lettuce","tomato",
        "onion","potato","pepper","mushroom","cauliflower","cucumber",
        "celery","beet","pumpkin","zucchini"
    ]

    dairy = [
        "milk","cheese","cream","butter","yogurt","ricotta","mozzarella"
    ]

    meat = [
        "chicken","beef","pork","turkey","lamb","ham","bacon"
    ]

    seafood = [
        "fish","salmon","tuna","shrimp","crab","lobster","cod","sardine"
    ]

    grains = [
        "rice","bread","oats","pasta","wheat","cereal","corn","flour"
    ]

    legumes = [
        "bean","beans","lentil","pea","peas","chickpea"
    ]

    nuts = [
        "almond","cashew","walnut","peanut","pistachio","hazelnut"
    ]

    eggs = [
        "egg","eggs"
    ]

    beverages = [
        "juice","tea","coffee","drink"
    ]

    if any(word in food for word in fruits):
        return "Fruits"

    elif any(word in food for word in vegetables):
        return "Vegetables"

    elif any(word in food for word in dairy):
        return "Dairy"

    elif any(word in food for word in meat):
        return "Meat"

    elif any(word in food for word in seafood):
        return "Seafood"

    elif any(word in food for word in grains):
        return "Grains"

    elif any(word in food for word in legumes):
        return "Legumes"

    elif any(word in food for word in nuts):
        return "Nuts"

    elif any(word in food for word in eggs):
        return "Eggs"

    elif any(word in food for word in beverages):
        return "Beverages"

    else:
        return "Others"


df["category"] = df["name"].apply(get_category)

print("Categories generated!")

# ==========================================
# Generate Description
# ==========================================
df["description"] = df["name"].apply(
    lambda x: f"{str(x).title()} is a nutritious food rich in essential nutrients."
)

print("Descriptions generated!")

# ==========================================
# Placeholder Image
# ==========================================
df["image"] = ""

# ==========================================
# Reorder Columns
# ==========================================
columns = [
    "name",
    "description",
    "category",
    "image",

    "calories",
    "protein",
    "carbohydrates",
    "fat",
    "fiber",
    "sugar",

    "nutritionDensityScore",

    "sodium",
    "cholesterol",

    "calcium",
    "iron",
    "potassium",
    "magnesium",
    "zinc",

    "vitaminA",
    "vitaminC",
    "vitaminD",
    "vitaminE",
    "vitaminK"
]

available_columns = [col for col in columns if col in df.columns]
df = df[available_columns]

# ==========================================
# Save Clean Dataset
# ==========================================
df.to_csv("dataset/cleaned_food_dataset.csv", index=False)

print("\n======================================")
print("Dataset cleaned successfully!")
print("======================================")
print("Final Shape:", df.shape)
print("\nColumns:")
print(df.columns.tolist())

print("\nFirst 5 Rows:")
print(df.head())