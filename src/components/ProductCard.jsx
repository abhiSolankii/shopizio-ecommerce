import React from "react";
import { Heart } from "lucide-react";
import { useProduct } from "../context/ProductContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart, addToFavorites, removeFromFavorites, isFavorite } =
    useProduct();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title} added to cart!`);
  };

  const handleToggleFavorite = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <div className="w-72 hover:w-74 bg-white rounded-lg shadow-md overflow-hidden mx-auto flex flex-col">
      <Link to={`/product/${product.id}`}>
        {/* Image Section */}
        <div className="relative h-56">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/product/${product.id}`}>
          <div className="flex justify-between items-center mb-2 h-8">
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
              {product.title}
            </h3>
            <p className="text-lg font-bold text-gray-800">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <p className="text-sm text-gray-600 mb-2 h-10 line-clamp-2 overflow-hidden">
            {product.description}
          </p>
          <div className="flex items-center mb-4 h-6">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-4 h-4 ${
                    index < Math.floor(product.rating || 0)
                      ? "fill-current"
                      : "fill-none"
                  }`}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    fill="currentColor"
                  />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">
              ({product.reviews || 0})
            </span>
          </div>
        </Link>

        <div className="mt-auto flex items-center gap-2">
          <button
            onClick={handleAddToCart}
            className="w-full py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all h-10"
          >
            Add to Cart
          </button>
          <button
            onClick={handleToggleFavorite}
            className={`${
              isFavorite(product.id) ? "text-red-500" : "text-gray-500"
            } hover:text-red-500 `}
          >
            <Heart size={24} fill={isFavorite(product.id) ? "red" : "none"} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
