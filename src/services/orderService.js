// orderService.js
import useApiRequest from "../hooks/useApiRequest";

// A service for handling order-related API calls
const orderService = () => {
  const { apiRequest, loading } = useApiRequest();

  // Create a new order
  const createOrder = async (orderData) => {
    try {
      const response = await apiRequest("POST", "/orders", orderData);
      return response.data;
    } catch (error) {
      throw new Error("Failed to create order: " + error.message);
    }
  };

  // Fetch all orders (for user or admin)
  const getAllOrders = async () => {
    try {
      const response = await apiRequest("GET", "/orders");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch orders: " + error.message);
    }
  };

  // Fetch a single order by ID
  const getOrderById = async (id) => {
    try {
      const response = await apiRequest("GET", `/orders/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch order with ID ${id}: ${error.message}`);
    }
  };

  return { createOrder, getAllOrders, getOrderById, loading };
};

export default orderService;
