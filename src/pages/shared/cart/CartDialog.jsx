import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { useCart } from "../../../Contexts/CartContext/cartContext";
import { Trash2 } from "lucide-react";

const CartDialog = ({ open, onOpenChange }) => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-emerald-700">
            Your Cart
          </DialogTitle>
          <DialogDescription>
            Review the items you’ve added to your cart.
          </DialogDescription>
        </DialogHeader>

        {/* Cart Items */}
        <div className="space-y-4 max-h-64 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500">
              <p>Your cart is empty.</p>
              {/* Empty Cart Illustration or Icon */}
              <img src="/path/to/empty-cart-icon.svg" alt="Empty Cart" className="mx-auto mt-4 w-24 h-24" />
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between p-3 border rounded-lg bg-offwhite"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.productImage || "/default-image.jpg"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-semibold text-emerald-700">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {/* Quantity Controls */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          -
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </Button>
                      </div>
                    </p>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
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
            ))
          )}
        </div>

        {/* Total & Actions */}
        {cart.length > 0 && (
          <div className="mt-4 space-y-3">
            <p className="text-lg font-semibold text-right text-emerald-700">
              Total: ${totalAmount.toFixed(2)}
            </p>
            <DialogFooter className="flex justify-between">
              <Button
                variant="outline"
                className="text-red-600 border-red-600 hover:bg-red-50"
                onClick={clearCart}
                aria-label="Clear all items in the cart"
              >
                Clear Cart
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-beige">
                Proceed to Checkout
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CartDialog;
