import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

// A 404 Not Found page with an option to continue shopping
const NotFound = () => {
  return (
    <div className="max-w-[90%] mx-auto py-16 min-h-screen flex flex-col items-center justify-center text-center">
      {/* 404 Illustration/Icon */}
      <div className="mb-8">
        <ShoppingCart size={80} className="text-gray-300 mx-auto" />
      </div>

      {/* Error Message */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Oops! Page Not Found
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        The page you're looking for doesn't exist or has been moved. Let's get
        you back to shopping!
      </p>

      {/* Continue Shopping Button */}
      <Link
        to="/"
        className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all text-lg font-semibold flex items-center gap-2"
      >
        <ShoppingCart size={20} />
        Continue Shopping
      </Link>
    </div>
  );
};

export default NotFound;
