// productService.js

import useApiRequest from "../hooks/useApiRequest";

// A service for handling product-related API calls
const productService = () => {
  const { apiRequest, loading } = useApiRequest();

  // Fetch all products
  const getAllProducts = async () => {
    try {
      const response = await apiRequest("GET", "/products");
      return response.data; // Return the data from the response
    } catch (error) {
      throw new Error("Failed to fetch products: " + error.message);
    }
  };

  // Fetch a single product by ID
  const getProductById = async (id) => {
    try {
      const response = await apiRequest("GET", `/products/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to fetch product with ID ${id}: ${error.message}`
      );
    }
  };

  // Fetch products by category (optional, if needed)
  const getProductsByCategory = async (categoryId) => {
    try {
      const response = await apiRequest(
        "GET",
        `/categories/${categoryId}/products`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to fetch products for category ${categoryId}: ${error.message}`
      );
    }
  };

  //filter products by min and max price
  const filterProductsByPrice = async (minPrice, maxPrice) => {
    try {
      const response = await apiRequest(
        "GET",
        `/products?price_min=${minPrice}&price_max=${maxPrice}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch products by price: ${error.message}`);
    }
  };
  const searchProducts = async (query) => {
    try {
      const response = await apiRequest("GET", "/products");
      const products = response.data;
      return products
        .filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5); // Return top 5 results
    } catch (error) {
      throw new Error(`Failed to search products: ${error.message}`);
    }
  };

  return {
    getAllProducts,
    getProductById,
    getProductsByCategory,
    filterProductsByPrice,
    loading,
  };
};

export default productService;
