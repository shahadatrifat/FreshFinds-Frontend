import React from "react";

const SkeletonCardLoader = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="bg-beige border rounded-lg shadow animate-pulse h-72 w-full"
        >
          <div className="w-full h-40 bg-gray-300"></div>
          <div className="p-3">
            <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
            <div className="w-1/2 h-4 bg-gray-300 rounded mb-2"></div>
            <div className="w-1/3 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonCardLoader;
