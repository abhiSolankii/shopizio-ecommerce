import React from "react";
import { Link } from "react-router-dom";
import { Package, CheckCircle } from "lucide-react";

const OrderConfirmation = () => {
  return (
    <div className="max-w-[90%] mx-auto py-16 min-h-screen flex flex-col items-center justify-center text-center">
      {/* Confirmation Icon */}
      <div className="mb-6">
        <CheckCircle size={80} className="text-green-500 mx-auto" />
      </div>

      {/* Confirmation Message */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Congratulations! Your Order is Placed
      </h1>
      <p className="text-lg text-gray-600 mb-6 max-w-md">
        Thank you for shopping with Shopizio! Your order has been successfully
        placed. You’ll receive a confirmation email shortly.
      </p>

      {/* Order Details (Mock) */}
      <div className="bg-gray-100 rounded-lg p-4 mb-8 max-w-sm w-full">
        <div className="flex items-center gap-2 mb-2">
          <Package size={20} className="text-yellow-400" />
          <p className="text-sm text-gray-600">
            Order #12345 - Estimated Delivery: April 8, 2025
          </p>
        </div>
        <p className="text-sm text-gray-500">
          We’ll notify you once your order ships. Track your order in your
          account.
        </p>
        <p className="mt-4 text-red-500 text-xl font-semibold">
          Please note that this is a mock order.
        </p>
      </div>

      {/* Continue Shopping Button */}
      <Link
        to="/"
        className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all text-lg font-semibold"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderConfirmation;
