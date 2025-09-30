import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import axiosInstance from "../../Hooks/useAxiosInstance";
import { useCart } from "../../Contexts/CartContext/cartContext";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import lottie from "lottie-web";
import orderConfirmed from "../../assets/lotties/Order Confirmed.json";

const CheckoutForm = ({ totalAmount, cart }) => { 
  const stripe = useStripe();
  const elements = useElements();
  const { clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    if (totalAmount === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1️⃣ Create PaymentIntent
      const { data } = await axiosInstance.post(
        "/api/v1/user/create-payment-intent",
        { amount: Math.round(totalAmount * 100) }
      );
      const clientSecret = data.clientSecret;

      // 2️⃣ Get card details
      const cardElement = elements.getElement(CardElement);

      // 3️⃣ Confirm payment with Stripe
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: { card: cardElement },
        });

      if (stripeError) {
        setError(stripeError.message);
        toast.error(stripeError.message);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        // 4️⃣ Save order - Use cart prop instead of global cart
        await axiosInstance.post("/api/v1/user/order", {
          userId: user.uid,
          items: cart.map((item) => ({
            productId: item.productId || item._id, // ✅ Handle both Buy Now and Cart flow
            quantity: item.quantity,
          })),
          totalAmount,
          paymentIntentId: paymentIntent.id,
        });

        // 5️⃣ Clear cart (only if not Buy Now)
        clearCart();

        // 6️⃣ Show success modal with Lottie
        Swal.fire({
          title: "Payment Successful!",
          html: `
            <div id="lottieContainer" style="width: 200px; height: 200px; margin: 0 auto;"></div>
            <p>Your order is being processed. Thank you for your purchase.</p>
          `,
          confirmButtonText: "Go to Orders",
          confirmButtonColor: "#10B981",
          showCloseButton: true,
          didOpen: () => {
            const container = document.getElementById("lottieContainer");
            const lottieInstance = lottie.loadAnimation({
              container,
              renderer: "svg",
              loop: true,
              autoplay: true,
              animationData: orderConfirmed,
            });

            Swal.getPopup().addEventListener("swal:close", () => {
              lottieInstance.destroy();
            });
          },
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/dashboard/orders";
          }
        });
      }
    } catch (err) {
      console.error(err);
      setError("Payment failed. Please try again.");
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-offwhite p-6 rounded-lg shadow-sm"
    >
      <CardElement
        className="p-3 py-8 border rounded-md"
        options={{
          style: {
            base: { fontSize: "16px", color: "#32325d" },
            invalid: { color: "#e5424d" },
          },
        }}
      />

      {error && <p className="text-red-600 text-sm font-semibold">{error}</p>}

      <button
        type="submit"
        disabled={!stripe || loading || totalAmount === 0}
        className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-beige font-lora text-lg font-semibold py-3 rounded-lg hover:scale-102 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {totalAmount === 0
          ? "No items to pay"
          : loading
          ? "Processing..."
          : `Pay $${totalAmount.toFixed(2)}`}
      </button>
    </form>
  );
};

export default CheckoutForm;