import Product, { IProduct } from "../models/product.model";

class ProductService {
  // Create Product
  async createProduct(data: Partial<IProduct>) {
    const product = await Product.create(data);
    return product;
  }

  // Get All Products
  async getAllProducts() {
    const products = await Product.find().sort({ createdAt: -1 });
    return products;
  }

  // Get Product By ID
  async getProductById(productId: string) {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found.");
    }

    return product;
  }

  // Update Product
  async updateProduct(productId: string, data: Partial<IProduct>) {
    const product = await Product.findByIdAndUpdate(
      productId,
      data,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      throw new Error("Product not found.");
    }

    return product;
  }

  // Delete Product
  async deleteProduct(productId: string) {
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      throw new Error("Product not found.");
    }

    return product;
  }
}

export default new ProductService();