import { ChevronDown, Search, ShoppingCart, User, Heart } from "lucide-react";
import React from "react";
import { useProduct } from "../context/ProductContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { favorites, cart } = useProduct();

  // Number of favorite products
  const favoriteCount = favorites.length;

  // Number of unique products in cart.
  const uniqueCartCount = cart.length;

  return (
    <div className="w-full bg-white">
      <div className="max-w-[90%] mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-12 w-12 overflow-hidden">
              <img src="/logo.webp" alt="logo" />
            </div>
            <span className="text-xl font-bold text-gray-800">Shopizio</span>
          </Link>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
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

        {/* User, Favorites, and Cart */}
        <div className="flex items-center gap-6 font-semibold">
          {/* User */}
          <div className="flex items-center gap-1">
            <User size={20} />
            <span className="text-gray-700 font-medium">Account</span>
          </div>

          {/* Favorites */}
          <Link to="/favourites" className="relative flex items-center gap-1">
            <Heart size={20} />

            <span className="text-gray-700 font-medium">Favorites</span>
            {favoriteCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {favoriteCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative flex items-center gap-1">
            <ShoppingCart size={20} />

            <span className="text-gray-700 font-medium">Cart</span>
            {uniqueCartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {uniqueCartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
