import React from "react";
import { useNavigate } from "react-router";
import Lottie from "lottie-react";
import errorAnimation from "../../assets/lotties/404cat.json"; 
import { motion } from "framer-motion";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-emerald-50 px-4 md:px-8">
      {/* Lottie Animation */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-72 md:w-[400px] lg:w-[500px] mb-6"
      >
        <Lottie animationData={errorAnimation} loop={true} />
      </motion.div>

      {/* Header */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-2xl md:text-3xl font-semibold text-center text-emerald-700"
      >
        Oops! Page not found
      </motion.p>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-lg md:text-xl text-gray-600 text-center mt-2"
      >
        We couldn't find the page you're looking for. Please check the URL or return to the home page.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-6 flex flex-col sm:flex-row gap-4 justify-center"
      >
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 rounded-lg border border-emerald-600 text-emerald-600 font-semibold hover:bg-emerald-100 transition-all w-full sm:w-auto"
        >
          Go Back
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-lg bg-emerald-600 text-beige font-semibold hover:bg-emerald-700 transition-all w-full sm:w-auto"
        >
          Go Home
        </button>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
