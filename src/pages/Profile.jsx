import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, User, Edit, Lock } from "lucide-react";
import { useProduct } from "../context/ProductContext";

// A simple profile page showing user details
const Profile = () => {
  const { currentUser, logout } = useAuth();
  const { clearCart, clearFavorites } = useProduct();
  const navigate = useNavigate();

  // If no user is logged in, redirect to login
  if (!currentUser) {
    navigate("/auth/login");
    return null;
  }

  // Extract username from email (e.g., abc from abc@gmail.com)
  const username = currentUser.email.split("@")[0];

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth/login");
      clearCart();
      clearFavorites();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="max-w-[90%] mx-auto py-8 min-h-screen">
      {/* Profile Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-md p-6 max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <img src="/pfp.webp" alt="pfp" className="rounded-full" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{username}</h2>
            <p className="text-sm text-gray-600">{currentUser.email}</p>
          </div>
        </div>

        {/* Profile Actions */}
        <div className="space-y-4">
          {/* Edit Profile (Demo - Disabled) */}
          <button
            disabled
            className="w-full flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all cursor-not-allowed"
          >
            <Edit size={18} />
            Edit Profile
          </button>

          {/* Change Password (Demo - Disabled) */}
          <button
            disabled
            className="w-full flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all cursor-not-allowed"
          >
            <Lock size={18} />
            Change Password
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Back to Home Link */}
      <div className="mt-8 text-center">
        <Link to="/" className="text-green-500 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Profile;
