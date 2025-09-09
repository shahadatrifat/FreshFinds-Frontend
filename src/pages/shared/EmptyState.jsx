import React from 'react';
import { FaRegSadTear } from 'react-icons/fa'; // Optional: Sad face icon for the empty state

const EmptyState = ({ message = "No items available", actionText = "Add Items", onActionClick }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-100">
      <FaRegSadTear size={50} className="text-gray-500 mb-4" />
      <h2 className="text-xl font-semibold text-gray-700 mb-2">{message}</h2>
      {onActionClick && (
        <button
          onClick={onActionClick}
          className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-all duration-200"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
