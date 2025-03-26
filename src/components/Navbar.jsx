import { ChevronDown, Search, ShoppingCart, User, Heart } from "lucide-react";
import React, { useState } from "react";
import { useProduct } from "../context/ProductContext";
import { Link, useNavigate } from "react-router-dom";
import { generalProducts } from "../utils/data"; // Import product data

const Navbar = () => {
  const { favorites, cart } = useProduct();
  const navigate = useNavigate(); // For navigation

  // Number of favorite products
  const favoriteCount = favorites.length;

  // Number of unique products in cart
  const uniqueCartCount = cart.length;

  // State for search input and filtered products
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredProducts([]);
      setIsSearchOpen(false);
      return;
    }

    // Filter products based on the search query
    const results = generalProducts
      .filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5); // Limit to 5 results

    setFilteredProducts(results);
    setIsSearchOpen(true);
  };

  // Handle clicking a search result
  const handleSearchResultClick = (id) => {
    setSearchQuery("");
    setFilteredProducts([]);
    setIsSearchOpen(false);
    navigate(`/product/${id}`); // Navigate to the product page
  };

  // Handle clicking outside the search dropdown to close it
  const handleBlur = () => {
    setTimeout(() => {
      setIsSearchOpen(false);
    }, 200); // Delay to allow click on result
  };

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
        <div className="flex-1 max-w-md mx-4 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Product"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchOpen(true)}
              onBlur={handleBlur}
              className="w-full py-2 px-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Search className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2" />
          </div>

          {/* Search Results Dropdown */}
          {isSearchOpen && filteredProducts.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-80 overflow-y-auto">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSearchResultClick(product.id)}
                  className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 line-clamp-1">
                      {product.title}
                    </p>
                    <p className="text-xs text-gray-600">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
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
