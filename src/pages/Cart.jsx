import React from "react";
import { useProduct } from "../context/ProductContext";
import { Link } from "react-router-dom";
import { Trash2, ShoppingCart } from "lucide-react";

// A majestic cart page to display and manage cart items
const Cart = () => {
  // Get cart data and functions from ProductContext
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
  } = useProduct();

  // Handle removing an item from the cart
  const handleRemoveFromCart = (productId) => {
    if (
      window.confirm(
        "Are you sure you want to remove this item from your cart?"
      )
    ) {
      removeFromCart(productId);
    }
  };

  // Handle updating the quantity of an item
  const handleQuantityChange = (productId, newQuantity) => {
    updateCartQuantity(productId, newQuantity);
  };

  // Handle clearing the entire cart
  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      clearCart();
    }
  };

  return (
    <div className="max-w-[90%] mx-auto py-8 min-h-screen">
      {/* Cart Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl md:text-3xl font-bold text-gray-800">
          Your Cart ({getCartItemCount()} items)
        </h1>
        {cart.length > 0 && (
          <button
            onClick={handleClearCart}
            className="flex items-center gap-2 px-2 md:px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
          >
            <Trash2 size={20} />
            Clear Cart
          </button>
        )}
      </div>

      {/* Cart Items or Empty State */}
      {cart.length === 0 ? (
        <div className="text-center py-10">
          <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-lg text-gray-600">Your cart is empty.</p>
          <Link
            to="/"
            className="mt-4 inline-block px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Cart Items */}
          <div className="grid grid-cols-1 gap-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all border border-gray-100"
              >
                {/* Product Image */}
                <div className="w-full md:w-32 md:h-32 h-40 mb-4 md:mb-0 md:mr-6 flex justify-center">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link to={`/product/${item.id}`}>
                      <h2 className="text-xl font-semibold text-gray-800 hover:text-green-600 transition-colors line-clamp-1">
                        {item.title}
                      </h2>
                    </Link>
                    <p className="text-lg font-bold text-gray-800 mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="text-lg font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-all w-full md:w-auto"
                    >
                      <Trash2 size={18} />
                      Remove
                    </button>
                  </div>
                </div>

                {/* Subtotal for this item */}
                <div className="text-right mt-4 md:mt-0">
                  <p className="text-lg font-semibold text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-white rounded-xl shadow-md p-6 mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Order Summary
            </h2>
            <div className="flex justify-between mb-4">
              <p className="text-lg text-gray-600">Subtotal</p>
              <p className="text-lg font-semibold text-gray-800">
                ${getCartTotal().toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between mb-4">
              <p className="text-lg text-gray-600">Shipping</p>
              <p className="text-lg font-semibold text-gray-800">Free</p>
            </div>
            <div className="flex justify-between mb-6">
              <p className="text-lg font-semibold text-gray-800">Total</p>
              <p className="text-lg font-bold text-gray-800">
                ${getCartTotal().toFixed(2)}
              </p>
            </div>
            <button className="w-full py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all text-lg font-semibold">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
