import React from "react";
import { FaRegSadTear } from "react-icons/fa";
import { motion } from "framer-motion";

const EmptyState = ({ message = "No items available", actionText = "Add Items", onActionClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-2xl bg-gradient-to-tr from-offwhite/80 to-offwhite/50 "
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <FaRegSadTear size={60} className="text-emerald mb-6" />
      </motion.div>

      <h2 className="text-2xl font-lora font-semibold text-emerald mb-4 text-center">
        {message}
      </h2>

      {onActionClick && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onActionClick}
          className="bg-emerald-600 hover:bg-emerald-500 text-beige px-6 py-3 rounded-xl shadow-lg font-semibold transition-all duration-200"
        >
          {actionText}
        </motion.button>
      )}
    </motion.div>
  );
};

export default EmptyState;
