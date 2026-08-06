const UPLOADS_BASE_URL = "http://localhost:5001/uploads/products/";

export const DEFAULT_PRODUCT_IMAGE = "/default-product.svg";

export function getProductImageUrl(image?: string | null): string {
  if (!image || image === "NaN" || image === "nan") {
    return DEFAULT_PRODUCT_IMAGE;
  }

  return `${UPLOADS_BASE_URL}${image}`;
}
