// categoryService.js
import useApiRequest from "../hooks/useApiRequest";

// A service for handling category-related API calls
const categoryService = () => {
  const { apiRequest, loading } = useApiRequest();

  // Fetch all categories
  const getAllCategories = async () => {
    try {
      const response = await apiRequest("GET", "/categories");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch categories: " + error.message);
    }
  };

  return { getAllCategories, loading };
};

export default categoryService;
