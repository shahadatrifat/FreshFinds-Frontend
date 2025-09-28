import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "../../Contexts/CartContext/cartContext";
import { useNavigate } from "react-router";

const ProductActions = ({ product, variant = "details" }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { cart, addToCart } = useCart();
  const navigate = useNavigate();

  /** Detect if product is already in cart */
  useEffect(() => {
    const found = cart.find((item) => item._id === product._id);
    setIsAdded(!!found);
  }, [cart, product._id]);

  /** Handle Add to Cart */
  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} × ${product.name} added to cart`);
    setIsAdded(true);
  };

  /** Handle Buy Now (Only this product, not whole cart) */
  const handleBuyNow = () => {
    toast.success(`Proceeding to checkout for ${quantity} × ${product.name}`);
    navigate("/checkout", {
      state: {
        cart: [
          {
            ...product,
            quantity,
            totalPrice: product.price * quantity, // single product total
          },
        ],
        totalAmount: product.price * quantity,
        isBuyNow: true, // flag to identify it's a direct purchase
      },
    });
  };

  const isCard = variant === "card";

  return (
    <div
      className={`flex flex-col ${
        isCard ? "gap-2" : "gap-6"
      } justify-center items-start w-full`}
    >
      {/* Quantity + Add to Cart Row */}
      <div
        className={`flex gap-3 items-center w-full ${
          isCard ? "flex-wrap" : "max-w-[400px]"
        }`}
      >
        {/* Quantity Selector */}
        <div
          className={`flex items-center justify-center border rounded-xl overflow-hidden bg-beige shadow-sm 
            ${isCard ? "w-[90px]" : "w-[110px]"}
          `}
        >
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="p-2 hover:bg-offwhite transition-colors disabled:opacity-50 flex items-center justify-center"
            disabled={quantity <= 1}
          >
            <Minus size={14} />
          </button>
          <span className="px-3 text-center font-medium text-emerald-800 min-w-[30px]">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="p-2 hover:bg-offwhite transition-colors flex items-center justify-center"
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={isAdded}
          className={`flex items-center justify-center gap-2 rounded-xl font-medium shadow-md transition-all duration-300 
            ${
              isAdded
                ? "bg-gray-400 cursor-not-allowed text-off"
                : "bg-emerald-600 hover:bg-emerald-700 text-beige"
            }
            ${isCard ? "px-3 py-2 text-sm" : "px-6 py-3 text-base"}
            flex-1
          `}
        >
          <ShoppingCart size={isCard ? 16 : 20} />
          {isAdded ? "Added" : "Add to Cart"}
        </Button>
      </div>

      {/* Buy Now Button */}
      <Button
        onClick={handleBuyNow}
        className={`bg-[#DAA520] text-beige rounded-xl hover:bg-[#B8860B] hover:text-[#FFF8DC] shadow-md transition-all duration-300
          ${
            isCard
              ? "px-3 py-2 text-sm w-full"
              : "w-full max-w-[400px] py-3 text-base"
          }
        `}
      >
        Buy Now
      </Button>
    </div>
  );
};

export default ProductActions;
