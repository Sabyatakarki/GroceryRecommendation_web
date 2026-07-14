import { Router } from "express";
import productController from "../controllers/product.controller";
import { uploads } from "../middleware/upload.middlware";

const router = Router();

// Get all products
router.get("/", productController.getAllProducts);

// Get product by ID
router.get("/:id", productController.getProductById);

// Create product
router.post(
  "/",
  uploads.product.single,
  productController.createProduct
);

// Update product
router.put(
  "/:id",
  uploads.product.single,
  productController.updateProduct
);

// Delete product
router.delete(
  "/:id",
  productController.deleteProduct
);

export default router;