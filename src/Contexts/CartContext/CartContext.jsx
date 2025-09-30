import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

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

    const debounceSave = setTimeout(saveCart, 300);
    return () => clearTimeout(debounceSave);
  }, [cart]);

  const getTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // ✅ FIXED: Add product with custom quantity
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      // ✅ Check using productId OR _id (handles both cases)
      const productId = product.productId || product._id;
      const exists = prevCart.find(
        (item) => (item.productId || item._id) === productId
      );

      if (exists) {
        toast.success("Increased quantity!");
        return prevCart.map((item) =>
          (item.productId || item._id) === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast.success(`${product.name} added to cart`);
        // ✅ Ensure consistent structure with both _id and productId
        return [
          ...prevCart,
          {
            ...product,
            _id: productId,
            productId: productId,
            quantity,
          },
        ];
      }
    });
  };

  // ✅ FIXED: Remove product from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter(
        (item) => (item.productId || item._id) !== id
      );
      return newCart;
    });
    toast.error("Item removed from cart");
  };

  // ✅ FIXED: Update quantity
  const updateQuantity = (id, qty) => {
    if (qty <= 0) return removeFromCart(id);
    setCart((prevCart) =>
      prevCart.map((item) =>
        (item.productId || item._id) === id ? { ...item, quantity: qty } : item
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