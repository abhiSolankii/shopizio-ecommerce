import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

// A component to protect routes from unauthenticated users
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  // If no user is logged in, redirect to login page
  if (!currentUser) {
    toast.error("Please login access this page.");
    return <Navigate to="/auth/login" replace />;
  }

  // If user is authenticated, render the children (protected route)
  return children;
};

export default ProtectedRoute;
