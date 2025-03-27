import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { Star, Truck, Package, Heart } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import productService from "../services/productService";
import { errorHandler } from "../utils/handlers";
import Loader from "../components/common/Loader";

// A detailed product page with a clean, modern design
const ProductPage = () => {
  const { id } = useParams();
  const { addToCart, isFavorite, removeFromFavorites, addToFavorites } =
    useProduct();
  const { currentUser } = useAuth();
  const { getProductById, loading } = productService();

  // Find the product by ID
  // const product = generalProducts.find((p) => p.id === parseInt(id));
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("Pink"); // Hardcoded default color

  // fetch product from API
  const fetchProduct = async () => {
    try {
      const data = await getProductById(id);
      setProduct(data);
    } catch (error) {
      errorHandler(error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div>
        <Loader fullScreen={true} />
      </div>
    );
  }
  // If product not found, show a message
  if (!product) {
    return (
      <div className="max-w-[90%] mx-auto py-10 text-center">
        <p className="text-lg text-gray-600">Product not found.</p>
        <Link
          to="/"
          className="mt-4 inline-block px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  // Handle adding to cart
  const handleAddToCart = () => {
    if (!currentUser) {
      toast.error("You must be logged in to add to cart");
      return;
    }
    addToCart(product, quantity);
    toast.success(`${product.title} added to cart!`);
  };

  // Handle quantity change
  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };
  const handleToggleFavorite = () => {
    if (!currentUser) {
      toast.error("You must be logged in to like product");
      return;
    }
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <div className="max-w-[90%] mx-auto py-8 min-h-screen">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-green-500">
          Home
        </Link>{" "}
        /{" "}
        <Link
          to={`/category/${product.category.slug}`}
          className="hover:text-green-500"
        >
          {product.category.name}
        </Link>{" "}
        / {product.title}
      </div>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="flex flex-col gap-4">
          <div className="w-full h-[400px] bg-gray-100 rounded-lg">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex gap-4">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="w-20 h-20 bg-gray-100 rounded-lg cursor-pointer"
              >
                <img
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between pr-10">
            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-800">
              {product.title.slice(0, 30)}...
            </h1>
            <button
              onClick={handleToggleFavorite}
              className={`${
                isFavorite(product.id) ? "text-red-500" : "text-gray-500"
              } hover:text-red-500 `}
            >
              <Heart size={30} fill={isFavorite(product.id) ? "red" : "none"} />
            </button>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex text-green-500">
              {[...Array(5)].map((_, index) => (
                <Star key={index} size={20} fill="currentColor" />
              ))}
            </div>
            <span className="text-sm text-gray-600">(1731 reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-gray-800">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">or $9.99/month</p>
          </div>
          <p className="text-sm text-gray-500">
            Suggested payments with 6 months special financing
          </p>

          {/* Color Selection (Hardcoded) */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Choose a Color
            </h3>
            <div className="flex gap-3">
              {["Pink", "Black", "Green", "Gray", "Blue"].map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color
                      ? "border-green-500"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                />
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                -
              </button>
              <span className="text-lg font-medium">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                +
              </button>
            </div>
            <p className="text-sm text-orange-500">
              Only 12 Items Left! <br /> Don't miss it
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="flex-1 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all text-lg font-semibold">
              Buy Now
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 bg-white text-green-600 border border-green-600 rounded-full hover:bg-green-50 transition-all text-lg font-semibold"
            >
              Add to Cart
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-2">
              <Truck size={20} className="text-orange-500" />
              <p className="text-sm text-gray-600">
                Free Delivery <br />
                <span className="underline">
                  Enter your postal code for Delivery Availability
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Package size={20} className="text-orange-500" />
              <p className="text-sm text-gray-600">
                Return Delivery <br />
                Free 30 Days Delivery Returns. Details
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Reviews section  */}
      {/* Reviews Section */}
      <div className="mt-12">
        {/* Section Heading */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Customer Reviews (1731)
        </h2>

        {/* Reviews List */}
        <div className="space-y-6">
          {/* Review 1 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex text-green-500">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-sm font-semibold text-gray-800">
                Alex Johnson
              </p>
              <p className="text-sm text-gray-500">March 15, 2025</p>
            </div>
            <p className="text-gray-600">
              Absolutely love this t-shirt! The mountain graphic is stunning,
              and the fabric is super soft and comfortable. I’ve worn it on
              multiple hikes, and it holds up great. Definitely recommend!
            </p>
          </div>

          {/* Review 2 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex text-green-500">
                {[...Array(4)].map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    fill={index < 4 ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <p className="text-sm font-semibold text-gray-800">
                Samantha Lee
              </p>
              <p className="text-sm text-gray-500">March 10, 2025</p>
            </div>
            <p className="text-gray-600">
              The design is amazing, and the fit is perfect. My only issue is
              that the color faded a bit after a few washes. Still a great shirt
              for the price!
            </p>
          </div>

          {/* Review 3 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex text-green-500">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-sm font-semibold text-gray-800">
                Michael Brown
              </p>
              <p className="text-sm text-gray-500">March 5, 2025</p>
            </div>
            <p className="text-gray-600">
              This t-shirt is my new favorite! The quality is top-notch, and the
              graphic really stands out. I’ve gotten so many compliments on it.
              Will definitely buy more from Shopizio!
            </p>
          </div>
        </div>

        {/* Load More Button (Disabled) */}
        <div className="mt-6 text-center">
          <button
            disabled
            className="px-6 py-2 bg-gray-200 text-gray-600 rounded-full cursor-not-allowed"
          >
            Load More Reviews
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
