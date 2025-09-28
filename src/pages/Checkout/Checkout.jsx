import { useCart } from "../../Contexts/CartContext/cartContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const Checkout = () => {
  const { cart: globalCart } = useCart();
  const location = useLocation();

  // Check if Buy Now flow
  const { cart: buyNowCart, totalAmount: buyNowTotal, isBuyNow } =
    location.state || {};

  // If Buy Now → use location.state.cart
  const cart = isBuyNow ? buyNowCart : globalCart;

  // Calculate total
  const totalAmount = isBuyNow
    ? buyNowTotal
    : globalCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-emerald">Checkout</h1>

      {/* Items List */}
      <div className="divide-y divide-gray-200">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between py-4"
          >
            <img
              src={item.productImage || "/images/default-image.jpg"}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg border"
            />

            <div className="flex-1 px-4">
              <p className="text-lg font-medium text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-500 mt-1">
                Quantity: {item.quantity}
              </p>
            </div>

            <p className="font-semibold text-gray-900">
              ${(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex justify-between mt-8 text-xl font-semibold text-emerald-700 border-t pt-4">
        <span>Total:</span>
        <span>${totalAmount.toLocaleString()}</span>
      </div>

      {/* Stripe Payment Form */}
      <div className="mt-8">
        <Elements stripe={stripePromise}>
          <CheckoutForm totalAmount={totalAmount} cart={cart} />
        </Elements>
      </div>
    </div>
  );
};

export default Checkout;
