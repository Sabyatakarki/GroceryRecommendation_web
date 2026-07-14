import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import recommendationRoutes from "./routes/recommendation.routes";
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";
import path from "path";
import profileRoutes from "./routes/profile.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/profile", profileRoutes);

app.use(
  "/uploads/products",
  express.static(path.join(__dirname, "../public/products"))
);

app.use(
  "/uploads/profile_pictures",
  express.static(path.join(__dirname, "../public/profile_pictures"))
);

// Default Route
app.get("/", (req, res) => {
  res.send("Nutrition-Based Grocery Recommendation API is running...");
});

export default app;