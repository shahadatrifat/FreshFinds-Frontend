import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";  // Importing Plus and Minus icons for quantity control
import { useCart } from "../../../Contexts/CartContext/cartContext";
import React, { useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "../../../components/ui/dialog";
import toast from "react-hot-toast";
import { Button } from "../../../components/ui/button";

const CartIcon = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  // Memoize total number of items in the cart (sum of quantities)
  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  // Memoize total cart price
  const totalPrice = useMemo(() => cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2), [cart]);

  return (
    <Dialog>
      {/* Trigger - Cart Icon */}
      <DialogTrigger asChild>
        <div className="relative cursor-pointer" aria-label="Open cart">
          <ShoppingCart className="w-7 h-7 text-charcoal hover:text-[#f5f5dc] transition-colors duration-200" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-beige text-emerald text-xs font-bold px-1 py-0.5 rounded-full hover:scale-110 transition-transform duration-200 shadow-md">
              {totalItems}
            </span>
          )}
        </div>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="sm:max-w-lg w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-emerald">
            Your Cart ({totalItems})
          </DialogTitle>
          <DialogDescription>
            Review the items you’ve added to your cart.
          </DialogDescription>
        </DialogHeader>

        {/* Cart Body */}
        <div className="space-y-4">
          {cart.length === 0 ? (
            // Empty Cart State
            <div className="text-center text-gray-500 italic">
              <p>Your cart is empty.</p>
              <img
                src="/path/to/empty-cart-icon.svg"
                alt="Empty Cart"
                className="mx-auto mt-4 w-24 h-24"
              />
            </div>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {cart.map((item) => (
                <div
                  key={item._id}
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
                  <div className="flex-1 space-y-1 ">
                    <h4 className="font-medium text-charcoal">{item.name}</h4>
                    <p className="text-sm text-gray-500">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"  
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                          className="px-2 py-1 text-lg"  
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"  
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="px-2 py-1 text-lg"   
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </p>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>

                  {/* Remove Item */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-600 hover:text-red-800"
                    onClick={() => removeFromCart(item._id)}
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
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
