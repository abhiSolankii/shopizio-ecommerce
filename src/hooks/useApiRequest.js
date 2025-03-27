import axios from "../config/axiosConfig.js";
import { useState } from "react";

const useApiRequest = () => {
  const [loading, setLoading] = useState(false);

  const apiRequest = async (method, path, data = null) => {
    try {
      setLoading(true); // Start loading when the request starts
      const response = await axios({
        method: method,
        url: path,
        data: method === "POST" || method === "PUT" ? data : null, // Pass data for POST/PUT
      });

      setLoading(false); // Stop loading after the request finishes
      return response;
    } catch (error) {
      setLoading(false); // Stop loading in case of an error
      console.error(`Error during ${method} request to ${path}:`, error);
      throw error;
    }
  };

  return { apiRequest, loading };
};

export default useApiRequest;
