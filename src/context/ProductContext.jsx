import React, { createContext, useContext, useEffect, useState } from "react";

// Create the ProductContext
const ProductContext = createContext();

// Custom hook to use the ProductContext
const useProduct = () => useContext(ProductContext);

// ProductProvider component to wrap the app
const ProductProvider = ({ children }) => {
  // State for favorite products
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // State for cart products
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save favorites to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add a product to favorites
  const addToFavorites = (product) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((item) => item.id === product.id)) {
        return prevFavorites; // Product already in favorites
      }
      return [...prevFavorites, product];
    });
  };

  // Remove a product from favorites
  const removeFromFavorites = (productId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== productId)
    );
  };

  // Check if a product is in favorites
  const isFavorite = (productId) => {
    return favorites.some((item) => item.id === productId);
  };

  // Add a product to cart (with quantity)
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // If product exists, update quantity
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      // If product doesn't exist, add it with quantity
      return [...prevCart, { ...product, quantity }];
    });
  };

  // Remove a product from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Update quantity of a product in cart
  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
  };

  //clear favorites
  const clearFavorites = () => {
    setFavorites([]);
  };

  // Calculate total cart price
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  // Calculate total number of items in cart
  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // Context value
  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    cart,
    addToCart,
    clearFavorites,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

// Export the context, provider, and custom hook
export { ProductContext, ProductProvider, useProduct };
