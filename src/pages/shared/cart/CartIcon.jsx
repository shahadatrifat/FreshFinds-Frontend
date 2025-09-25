import { ShoppingCart } from "lucide-react";
import { useCart } from "../../../Contexts/CartContext/cartContext";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import toast from "react-hot-toast";

const CartIcon = () => {
  const { cart } = useCart();

  // Total number of items in cart (sum of quantities)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate total cart price
  const totalPrice = cart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <Dialog>
      {/* Trigger - Cart Icon */}
      <DialogTrigger asChild>
        <div className="relative cursor-pointer" aria-label="Open cart">
          <ShoppingCart className="w-7 h-7 text-emerald-700 hover:text-emerald-600 transition-colors duration-200" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-beige text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
              {totalItems}
            </span>
          )}
        </div>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="sm:max-w-lg w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-emerald-700">
            Your Cart
          </DialogTitle>
        </DialogHeader>

        {/* Cart Body */}
        <div className="space-y-4">
          {cart.length === 0 ? (
            // Empty Cart State
            <p className="text-center text-gray-500 italic">Your cart is empty.</p>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b pb-3 gap-4"
                >
                  {/* Product Image */}
                  <img
                    src={item.productImage || "/placeholder.png"}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-lg border"
                    loading="lazy"
                  />

                  {/* Product Info */}
                  <div className="flex-1">
                    <h4 className="font-medium text-charcoal">{item.name}</h4>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  {/* Price */}
                  <p className="font-semibold font-lora text-emerald">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Total & Checkout */}
          {cart.length > 0 && (
            <div className="pt-3 border-t">
              <div className="flex justify-between font-bold font-lora text-lg">
                <span>Total:</span>
                <span>${totalPrice}</span>
              </div>

              {/* Checkout Button */}
              <button
                className="w-full mt-4 bg-emerald hover:bg-emerald-700 text-beige py-2 rounded-xl shadow-md hover:scale-102 transition-all duration-300"
                aria-label="Proceed to checkout"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CartIcon;
