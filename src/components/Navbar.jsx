import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext"; // Import AuthContext
import { generalProducts } from "../utils/data";
import {
  ChevronDown,
  Search,
  ShoppingCart,
  User,
  Heart,
  LogOut,
  Menu,
  X,
} from "lucide-react";

// Navbar component that sticks to the top of the page
const Navbar = () => {
  // Access favorites and cart from ProductContext
  const { favorites, cart, clearCart, clearFavorites } = useProduct();
  const { currentUser, logout } = useAuth(); // Access auth state and logout function
  const navigate = useNavigate();

  // Calculate counts for favorites and cart
  const favoriteCount = favorites.length; // Number of favorite products
  const uniqueCartCount = cart.length; // Number of unique products in cart

  // State for search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // State for account dropdown
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredProducts([]);
      setIsSearchOpen(false);
      return;
    }

    const results = generalProducts
      .filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5); // Show only top 5 results

    setFilteredProducts(results);
    setIsSearchOpen(true);
  };

  // Handle clicking a search result to navigate to the product page
  const handleSearchResultClick = (id) => {
    setSearchQuery("");
    setFilteredProducts([]);
    setIsSearchOpen(false);
    navigate(`/product/${id}`);
  };

  // Close the search dropdown when clicking outside
  const handleBlur = () => {
    setTimeout(() => {
      setIsSearchOpen(false);
    }, 200);
  };

  // Toggle the account dropdown
  const toggleAccountDropdown = () => {
    setIsAccountDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAccountDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <div className="w-full bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-[90%] mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-12 w-12 overflow-hidden">
              <img src="/logo.webp" alt="Shopizio Logo" />
            </div>
            <span className="text-xl font-bold text-gray-800">Shopizio</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle for Small Screens */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation Links (hidden on small screens) */}
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

        {/* Search Bar with Dropdown */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
          <div className="relative w-full">
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

        {/* User, Favorites, and Cart Icons */}
        <div className="hidden md:flex items-center gap-6 font-semibold">
          {/* Account Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleAccountDropdown}
              className="flex items-center gap-1 text-gray-700 font-medium"
            >
              <User size={20} />
              <span>{currentUser ? "Account" : "Login"}</span>
              <ChevronDown
                size={16}
                className={isAccountDropdownOpen ? "rotate-180" : ""}
              />
            </button>

            {/* Dropdown Menu */}
            {isAccountDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {currentUser ? (
                  <>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsAccountDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/auth/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsAccountDropdownOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Favorites Icon with Count */}
          <Link to="/favourites" className="relative flex items-center gap-1">
            <Heart size={20} />
            <span className="text-gray-700 font-medium">Favorites</span>
            {favoriteCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {favoriteCount}
              </span>
            )}
          </Link>

          {/* Cart Icon with Count */}
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
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-40 md:hidden">
            <div className="flex flex-col h-full p-6">
              {/* Mobile Close Button */}
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="mb-6">
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
                {/* Mobile Search Results (same as desktop) */}
                {isSearchOpen && filteredProducts.length > 0 && (
                  <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-80 overflow-y-auto">
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

              {/* Mobile Navigation Links */}
              <div className="flex flex-col gap-4 mb-6">
                <button
                  disabled
                  className="text-gray-700 font-medium text-left"
                >
                  Deals
                </button>
                <button
                  disabled
                  className="text-gray-700 font-medium text-left"
                >
                  What's New
                </button>
                <button
                  disabled
                  className="text-gray-700 font-medium text-left"
                >
                  Delivery
                </button>
              </div>

              {/* Mobile Icons */}
              <div className="flex flex-col gap-4">
                {currentUser ? (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 text-gray-700"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User size={20} />
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <LogOut size={20} />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/auth/login"
                    className="flex items-center gap-2 text-gray-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User size={20} />
                    Login
                  </Link>
                )}

                <Link
                  to="/favourites"
                  className="flex items-center gap-2 text-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Heart size={20} />
                  Favorites {favoriteCount > 0 && `(${favoriteCount})`}
                </Link>

                <Link
                  to="/cart"
                  className="flex items-center gap-2 text-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ShoppingCart size={20} />
                  Cart {uniqueCartCount > 0 && `(${uniqueCartCount})`}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
