// userService.js
import useApiRequest from "../hooks/useApiRequest";

// A service for handling user-related API calls
const userService = () => {
  const { apiRequest, loading } = useApiRequest();

  // Fetch all users (for admin purposes, if needed)
  const getAllUsers = async () => {
    try {
      const response = await apiRequest("GET", "/users");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch users: " + error.message);
    }
  };

  // Fetch a single user by ID
  const getUserById = async (id) => {
    try {
      const response = await apiRequest("GET", `/users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch user with ID ${id}: ${error.message}`);
    }
  };

  // Create a new user (signup)
  const createUser = async (userData) => {
    try {
      const response = await apiRequest("POST", "/users", userData);
      return response.data;
    } catch (error) {
      throw new Error("Failed to create user: " + error.message);
    }
  };

  // Update user details
  const updateUser = async (id, userData) => {
    try {
      const response = await apiRequest("PUT", `/users/${id}`, userData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update user with ID ${id}: ${error.message}`);
    }
  };

  return { getAllUsers, getUserById, createUser, updateUser, loading };
};

export default userService;
