import pandas as pd

# Load the dataset
df = pd.read_csv("dataset/FOOD-DATA-GROUP1.csv")

# Display basic information
print("\n========== DATASET INFORMATION ==========")
print(df.info())

print("\n========== FIRST 5 ROWS ==========")
print(df.head())

print("\n========== COLUMN NAMES ==========")
print(df.columns.tolist())

print("\n========== MISSING VALUES ==========")
print(df.isnull().sum())

print("\n========== TOTAL FOOD ITEMS ==========")
print(len(df))