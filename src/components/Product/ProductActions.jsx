import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "../../Contexts/CartContext/cartContext";

const ProductActions = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false); // Track if product added
  const { cart, addToCart } = useCart();

  // Check if this product is already in the cart when component mounts or cart changes
  useEffect(() => {
    const found = cart.find((item) => item._id === product._id);
    setIsAdded(!!found);
  }, [cart, product._id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} × ${product.name} added to cart!`);
    setIsAdded(true); // Set button state to "Added"
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    toast.success(`Proceeding to buy ${quantity} × ${product.name}`);
    // TODO: Navigate to checkout later
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center mt-6">
      {/* Quantity Selector */}
      <div className="flex items-center border rounded-xl overflow-hidden bg-beige shadow-sm">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="px-3 py-2 hover:bg-offwhite transition-colors"
        >
          -
        </button>
        <span className="px-4 py-2 font-medium text-emerald-800">
          {quantity}
        </span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="px-3 py-2 hover:bg-offwhite transition-colors"
        >
          +
        </button>
      </div>

      {/* Add to Cart */}
      <Button
        onClick={handleAddToCart}
        disabled={isAdded} // Disable after added
        className={`flex items-center gap-2 rounded-xl font-medium py-3 px-6 shadow-md hover:shadow-lg transition-all duration-300 ${
          isAdded
            ? "bg-gray-400 cursor-not-allowed text-off"
            : "bg-emerald-600 hover:bg-emerald-700 text-beige"
        }`}
      >
        <ShoppingCart className="w-5 h-5" />
        {isAdded ? "Added to Cart" : "Add to Cart"}
      </Button>

      {/* Buy Now */}
      <Button
        onClick={handleBuyNow}
        className="flex-1 bg-[#DAA520] text-beige rounded-xl hover:bg-[#B8860B] hover:text-[#FFF8DC] py-3 px-6 shadow-md hover:shadow-lg transition-all duration-300"
      >
        Buy Now
      </Button>
    </div>
  );
};

export default ProductActions;
