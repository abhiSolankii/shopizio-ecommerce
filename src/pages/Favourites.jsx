import React from "react";
import { useProduct } from "../context/ProductContext";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2, Share2, Eye } from "lucide-react";
import toast from "react-hot-toast";

const Favourites = () => {
  const {
    favorites,
    removeFromFavorites,
    addToCart,
    clearFavorites, // Assuming you add this to ProductContext
  } = useProduct();
  const navigate = useNavigate();

  // Handle sharing a product (copy link to clipboard)
  const handleShare = (product) => {
    const productLink = `${window.location.origin}/product/${product.id}`;
    navigator.clipboard.writeText(productLink).then(() => {
      toast.success("Product link copied to clipboard!");
    });
  };

  // Handle adding to cart
  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.title} added to cart!`);
  };

  // Handle removing from favorites
  const handleRemoveFromFavorites = (productId) => {
    removeFromFavorites(productId);
  };

  // Handle viewing product
  const handleViewProduct = (id) => {
    navigate(`/product/${id}`);
  };

  // Handle clearing all favorites
  const handleClearFavorites = () => {
    if (window.confirm("Are you sure you want to clear all favorites?")) {
      clearFavorites();
    }
  };

  return (
    <div className="max-w-[90%] mx-auto py-8 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Your Favorites ({favorites.length})
        </h1>
        {favorites.length > 0 && (
          <button
            onClick={handleClearFavorites}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
          >
            <Trash2 size={20} />
            Clear All
          </button>
        )}
      </div>

      {/* Favorites List */}
      {favorites.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">No favorite products yet.</p>
          <Link
            to="/"
            className="mt-4 inline-block px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {favorites.map((product) => (
            <div
              key={product.id}
              className="flex bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Product Image */}
              <div className="w-40 h-40 mr-6">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover rounded-lg shadow-sm"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 flex flex-col justify-between">
                {/* Title and Price */}
                <div>
                  <Link to={`/product/${product.id}`}>
                    <h2 className="text-xl font-semibold text-gray-800 hover:text-green-600 transition-colors line-clamp-1">
                      {product.title}
                    </h2>
                  </Link>
                  <p className="text-lg font-bold text-gray-800 mt-1">
                    ${product.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all"
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleViewProduct(product.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all"
                  >
                    <Eye size={18} />
                    View
                  </button>
                  <button
                    onClick={() => handleShare(product)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all"
                  >
                    <Share2 size={18} />
                    Share
                  </button>
                  <button
                    onClick={() => handleRemoveFromFavorites(product.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-all"
                  >
                    <Trash2 size={18} />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
