import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { useCart } from "../../../Contexts/CartContext/cartContext";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import CartLoader from "../loaders/CartLoader";
import { useNavigate } from "react-router";

const CartDialog = ({ open, onOpenChange }) => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  // Loading states
  const [isUpdating, setIsUpdating] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const navigate = useNavigate();
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Handle quantity update
  const handleUpdateQuantity = async (id, newQty) => {
    try {
      setIsUpdating(true);
      await updateQuantity(id, newQty);
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle clear cart
  const handleClearCart = async () => {
    try {
      setIsClearing(true);
      await clearCart();
    } finally {
      setIsClearing(false);
    }
  };

  // Handle checkout
  const handleProceedToCheckout = () => {
    console.log("Checkout triggered");
    navigate("/checkout", {
      state: {
        cart,
        totalAmount,
        isBuyNow: false,
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg relative">
        {/* Loader Overlay */}
        {(isUpdating || isClearing) && (
          <div className="absolute inset-0 bg-white/70 z-20 flex items-center justify-center rounded-lg">
            <CartLoader />
          </div>
        )}

        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-emerald-700">
            Your Cart
          </DialogTitle>
          <DialogDescription>
            Review the items you’ve added to your cart.
          </DialogDescription>
        </DialogHeader>

        {/* Cart Items */}
        <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center text-gray-500">
              <img
                src="/images/empty-cart.svg"
                alt="Empty Cart"
                className="mx-auto w-28 h-28 mb-4"
              />
              <p className="mb-4">Your cart is currently empty</p>
              <Button
                onClick={() => onOpenChange(false)}
                className="bg-emerald-600 text-beige hover:bg-emerald-700"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between p-3 border rounded-lg bg-offwhite shadow-sm"
              >
                <div className="flex items-center gap-4 flex-1">
                  {/* Product Image */}
                  <img
                    src={item.productImage || "/images/default-image.jpg"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                    loading="lazy"
                  />

                  {/* Product Details */}
                  <div className="flex flex-col">
                    <p className="font-semibold text-emerald-700">
                      {item.name}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex gap-2 mt-1">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          handleUpdateQuantity(
                            item._id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        disabled={
                          item.quantity <= 1 || isUpdating || isClearing
                        }
                        aria-label="Decrease quantity"
                      >
                        -
                      </Button>
                      <span className="px-2 text-emerald-800 font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          handleUpdateQuantity(item._id, item.quantity + 1)
                        }
                        disabled={isUpdating || isClearing}
                        aria-label="Increase quantity"
                      >
                        +
                      </Button>
                    </div>

                    {/* Price Info */}
                    <p className="text-sm text-gray-500 mt-1">
                      ${item.price.toLocaleString()} x {item.quantity} ={" "}
                      <span className="font-medium text-emerald-700">
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Remove Item */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-600 hover:text-red-800"
                  onClick={() => removeFromCart(item._id)}
                  disabled={isUpdating || isClearing}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            ))
          )}
        </div>

        {/* Total & Actions */}
        {cart.length > 0 && (
          <div className="mt-4 space-y-3">
            <p className="text-lg font-semibold text-right text-emerald-700">
              Total: {cart.length} ${totalAmount.toLocaleString()}
            </p>
            <DialogFooter className="flex flex-col sm:flex-row justify-center gap-2">
              {/* Clear Cart */}
              <button
                onClick={handleClearCart}
                disabled={isClearing || isUpdating}
                aria-label="Clear all items in the cart"
                className={`border border-red-600 text-red-600 rounded-lg px-4 py-2 hover:bg-red-50 transition ${
                  isClearing ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isClearing ? "Clearing..." : "Clear Cart"}
              </button>

              {/* Proceed to Checkout */}
              <button
                onClick={handleProceedToCheckout}
                disabled={isUpdating || isClearing}
                aria-label="Proceed to checkout"
                className={`bg-emerald-600 text-beige rounded-lg px-4 py-2 hover:bg-emerald-700 transition ${
                  isUpdating || isClearing
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Proceed to Checkout
              </button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CartDialog;
