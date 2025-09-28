import React, { useState, useMemo, useEffect } from "react";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../../../Contexts/CartContext/CartContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Link, useLocation, useNavigate } from "react-router";
import CartLoader from "../loaders/CartLoader";
import Lottie from "lottie-react";
import emptyAnimation from "../../../assets/lotties/empty.json";
import CheckoutButton from "../../../components/Checkout/CheckoutButton";

const CartIcon = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const [isUpdating, setIsUpdating] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const location = useLocation();

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );
  const totalAmount = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  useEffect(() => {
    setIsDialogOpen(false);
  }, [location.pathname]);

  const handleUpdateQuantity = async (id, newQty) => {
    try {
      setIsUpdating(true);
      await updateQuantity(id, newQty);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleClearCart = async () => {
    try {
      setIsClearing(true);
      await clearCart();
    } finally {
      setIsClearing(false);
    }
  };

  const handleProceedToCheckout = () => {
    navigate("/checkout", {
      state: { cart, totalAmount, isBuyNow: false },
    });
    setIsDialogOpen(false);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      {/* Trigger */}
      <DialogTrigger asChild>
        <div className="relative cursor-pointer" onClick={handleOpenDialog}>
          <ShoppingCart className="w-7 h-7 text-charcoal hover:text-[#f5f5dc] transition-colors duration-200" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-emerald-600 text-beige text-xs font-bold px-1.5 py-0.5 rounded-full shadow-md">
              {totalItems}
            </span>
          )}
        </div>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="sm:max-w-lg bg-offwhite w-full ">
        {/* Loader */}
        {(isUpdating || isClearing) && (
          <div className="absolute inset-0 bg-white/70 z-20 flex items-center justify-center rounded-lg">
            <CartLoader />
          </div>
        )}

        <DialogHeader>
          <DialogTitle className="text-xl font-bold font-lora text-emerald-700">
            Your Cart ({totalItems})
          </DialogTitle>
          <DialogDescription>
            Review the items you’ve added to your cart.
          </DialogDescription>
        </DialogHeader>

        {/* Cart Items */}
        <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500">
              <p className="mb-2">Your cart is empty.</p>
              <div className="mx-auto w-40 h-40">
                <Lottie animationData={emptyAnimation} loop={true} />
              </div>
              <Link to="/products">
                <button className="mt-4 px-6 py-2 bg-emerald text-beige font-semibold rounded-xl  hover:bg-emerald-700 hover:scale-102 transition-transform duration-300">
                  Shop Now
                </button>
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b pb-3 gap-4"
              >
                <img
                  src={item.productImage || "/images/default-image.jpg"}
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded-lg border"
                />
                <div className="flex-1 flex flex-col justify-center gap-1">
                  <h4 className="font-medium text-charcoal">{item.name}</h4>

                  {/* Quantity */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          item._id,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                      disabled={item.quantity <= 1 || isUpdating || isClearing}
                      className="flex items-center justify-center w-7 h-7 border rounded-md hover:bg-gray-100 disabled:opacity-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item._id, item.quantity + 1)
                      }
                      disabled={isUpdating || isClearing}
                      className="flex items-center justify-center w-7 h-7 border rounded-md hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-sm text-gray-500">
                    ${item.price.toFixed(2)} x {item.quantity} ={" "}
                    <span className="font-medium text-emerald-700">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </p>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  disabled={isUpdating || isClearing}
                  className="text-red-600 hover:text-red-800 flex items-center justify-center w-7 h-7 rounded-md"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Total & Actions */}
        {cart.length > 0 && (
          <div className="mt-4 space-y-3">
            <p className="text-lg font-semibold text-right text-emerald-700">
              Total: ${totalAmount.toLocaleString()}
            </p>
            <DialogFooter className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-4">
              {/* Clear Cart Button */}
              <button
                onClick={handleClearCart}
                disabled={isClearing || isUpdating}
                className="flex items-center justify-center gap-2 border border-red-600 text-red-600 rounded-lg px-6 py-3 hover:bg-red-50 disabled:opacity-50 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                {isClearing ? (
                  <svg
                    className="animate-spin h-5 w-5 text-red-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                ) : (
                  <span>Clear Cart</span>
                )}
              </button>

              {/* Stripe Checkout Button */}
              <CheckoutButton
                disabled={isUpdating || isClearing}
                items={cart}
                totalAmount={totalAmount}
                onClick={handleProceedToCheckout}
              />
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CartIcon;
