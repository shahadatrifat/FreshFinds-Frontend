import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "../../components/ui/button"; // Example of your custom button component
import toast from "react-hot-toast";

const PaymentForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    console.log("Form submitted");
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    // Create a payment method with the card details
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.log("[Error]", error);
      setProcessing(false);
      return;
    }

    // Send paymentMethod.id to your server to complete the payment
    const response = await fetch("/api/payment_intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentMethodId: paymentMethod.id, amount: totalAmount }),
    });

    const paymentIntentResponse = await response.json();

    const { error: confirmError } = await stripe.confirmCardPayment(
      paymentIntentResponse.clientSecret,
      {
        payment_method: paymentMethod.id,
      }
    );

    if (confirmError) {
      console.log("[Error]", confirmError);
      setProcessing(false);
      return;
    }

    // Payment succeeded
    toast.success("Payment Successful!");
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement />
      <Button
        type="submit"
        disabled={!stripe || processing}
        className="bg-emerald hover:bg-emerald-700 text-beige py-2 rounded-xl shadow-md"
      >
        {processing ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
};

export default PaymentForm;
