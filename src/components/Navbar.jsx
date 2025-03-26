import { ChevronDown, Search, ShoppingCart, User } from "lucide-react";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full bg-white">
      <div className="max-w-[90%] mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className=" h-12 w-12 overflow-hidden">
              <img src="/logo.webp" alt="logo" />
            </div>
            <span className="text-xl font-bold text-gray-800">Shopizio</span>
          </div>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <div className="relative">
            <button className="text-gray-700 font-medium flex items-center gap-1">
              Categories
              <ChevronDown size={20} />
            </button>
          </div>
          <button disabled className="text-gray-700 font-medium">
            Deals
          </button>
          <button disabled className="text-gray-700 font-medium">
            What's New
          </button>
          <button disabled className="text-gray-700 font-medium">
            Delivery
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Product"
              className="w-full py-2 px-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Search className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        {/* User and Cart */}
        <div className="flex items-center gap-10 font-semibold">
          <div className="flex items-center gap-1">
            <User />
            <span className="text-gray-700 font-medium">Account</span>
          </div>
          <div className="flex items-center gap-1">
            <ShoppingCart />
            <span className="text-gray-700 font-medium">Cart</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
