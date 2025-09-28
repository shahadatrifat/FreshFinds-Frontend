import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error reading cart from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    const saveCart = () => {
      localStorage.setItem("cart", JSON.stringify(cart));
    };

    const debounceSave = setTimeout(saveCart, 300); // 300ms debounce delay

    // Cleanup on unmount or cart change
    return () => clearTimeout(debounceSave);
  }, [cart]);

  const getTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };
  // Add product with custom quantity
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item._id === product._id);

      if (exists) {
        toast.success("Increased quantity!");
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity } // ✅ FIX: quantity added properly
            : item
        );
      } else {
        toast.success(`${product.name} added to cart`);
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  // Remove product from cart
  const removeFromCart = (id) => {
  setCart((prevCart) => {
    const newCart = prevCart.filter((item) => item._id !== id);
   
    return newCart;
  });
  toast.error("Item removed from cart");
};

  // Update quantity
  const updateQuantity = (id, qty) => {
    if (qty <= 0) return removeFromCart(id);
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
  setCart([]);
  localStorage.removeItem("cart");
};

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
