import React, { useState } from "react";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return toast.error("Enter a valid email");
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); 

      // Display success message
      toast.success("Thanks! You are subscribed");
      setEmail("");
    } catch (err) {
      // Handle errors
      toast.error("Subscription failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 bg-offwhite">
        <section className="py-12  bg-beige rounded-xl  shadow-sm">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-2xl font-semibold text-emerald">
          Join our newsletter
        </h3>
        <p className="text-charcoal mt-2">
          Exclusive offers, seasonal picks, and chef’s recommendations.
        </p>

        <form onSubmit={subscribe} className="mt-4 flex gap-3 justify-center">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="px-4 py-3 rounded-xl ring-1 ring-gray-300 w-72"
          />
          <button
            className="px-5 py-3 rounded-xl bg-emerald-600 text-beige"
            disabled={loading}
          >
            {loading ? "Subscribing…" : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
    </div>
  );
};

export default Newsletter;
