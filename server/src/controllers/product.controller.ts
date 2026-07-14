import { Request, Response } from "express";
import productService from "../services/product.service";

class ProductController {
  // Create Product
  async createProduct(req: Request, res: Response) {
    try {
      const data = {
        ...req.body,
        image: req.file ? req.file.filename : "",
      };

      const product = await productService.createProduct(data);

      return res.status(201).json({
        success: true,
        message: "Product created successfully.",
        data: product,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Get All Products
  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await productService.getAllProducts();

      return res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Get Product By ID
  async getProductById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const product = await productService.getProductById(id as string);

      return res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Update Product
  async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const data = {
        ...req.body,
        ...(req.file && { image: req.file.filename }),
      };

      const product = await productService.updateProduct(id as string, data);

      return res.status(200).json({
        success: true,
        message: "Product updated successfully.",
        data: product,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Delete Product
  async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await productService.deleteProduct(id as string);

      return res.status(200).json({
        success: true,
        message: "Product deleted successfully.",
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new ProductController();