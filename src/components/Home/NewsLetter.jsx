import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle, Gift, Bell, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return toast.error("Please enter a valid email address");
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      toast.success("🎉 Welcome! You're now subscribed!", {
        duration: 4000,
        icon: '✅',
      });
      setEmail("");
    } catch (err) {
      toast.error("Oops! Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    { icon: Gift, text: "Exclusive deals & discounts" },
    { icon: Bell, text: "New product alerts" },
    { icon: Sparkles, text: "Seasonal recipes & tips" }
  ];

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-beige/20 via-white to-beige/10 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-700 rounded-3xl ">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-900/30 rounded-full blur-3xl" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center p-8 md:p-12 lg:p-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-beige"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6"
              >
                <Mail className="w-8 h-8 text-white" />
              </motion.div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-lora mb-4">
                Join Our Newsletter
              </h2>

              <p className="text-white/90 text-lg mb-6 leading-relaxed">
                Get exclusive deals, fresh product updates, and seasonal recipes 
                delivered straight to your inbox. No spam, just goodness!
              </p>

              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white/90">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="mt-8 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
              >
                <CheckCircle className="w-4 h-4 text-emerald-300" />
                <span className="text-sm text-white/90">
                  Join 10,000+ subscribers
                </span>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 md:p-12 lg:p-16 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-charcoal mb-2">
                Subscribe Now
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Be the first to know about new products and special offers
              </p>

              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && subscribe(e)}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none"
                    disabled={loading}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  onClick={subscribe}
                  disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-xl  transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe </span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600"
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>No spam, ever</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Unsubscribe anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Weekly updates only</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;