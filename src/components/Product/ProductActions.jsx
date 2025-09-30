import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "../../Contexts/CartContext/cartContext";
import { useNavigate } from "react-router";

const ProductActions = ({ product, variant = "details", isDisabled }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { cart, addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const found = cart.find((item) => item.productId === product._id);
    setIsAdded(!!found);
  }, [cart, product._id]);

  const handleAddToCart = () => {
    // ✅ Include ALL necessary fields including image
    addToCart(
      {
        _id: product._id,
        productId: product._id,
        name: product.name,
        price: product.price,
        productImage: product.productImage, // ✅ This field exists in your product
      },
      quantity
    );
    toast.success(`${quantity} × ${product.name} added to cart`);
    setIsAdded(true);
  };

  const handleBuyNow = () => {
    navigate("/checkout", {
      state: {
        cart: [
          {
            _id: product._id,
            productId: product._id,
            name: product.name,
            price: product.price,
            productImage: product.productImage, // ✅ Add image here too
            quantity,
          },
        ],
        totalAmount: product.price * quantity,
        isBuyNow: true,
      },
    });
  };

  const isCard = variant === "card";

  return (
    <div className={`flex flex-col ${isCard ? "gap-2" : "gap-6"} w-full`}>
      {/* Quantity + Add to Cart */}
      <div className={`flex gap-3 items-center ${isCard ? "flex-wrap" : "max-w-[400px]"}`}>
        <div className="flex items-center justify-center border rounded-xl bg-beige shadow-sm w-[110px]">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1 || isDisabled}
            className="px-3 py-2 hover:bg-gray-100 rounded-l-xl disabled:opacity-50"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-3 font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            disabled={isDisabled}
            className="px-3 py-2 hover:bg-gray-100 rounded-r-xl disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={isAdded || isDisabled}
          className={`flex-1 ${
            isAdded
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700 text-beige"
          }`}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {isAdded ? "Added" : "Add to Cart"}
        </Button>
      </div>

      <Button
        onClick={handleBuyNow}
        disabled={isDisabled}
        className="bg-[#DAA520] hover:bg-[#B8860B] text-beige rounded-xl w-full max-w-[400px] py-3"
      >
        Buy Now
      </Button>
    </div>
  );
};

export default ProductActions;