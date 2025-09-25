import React from "react";

const SkeletonCardLoader = () => {
  return (
    <div>
      <div className="bg-beige border rounded-lg shadow animate-pulse h-72 w-[220px] sm:w-[240px] md:w-[260px] lg:w-[280px]">
        <div className="w-full h-40 bg-gray-300"></div>
        <div className="p-3">
          <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
          <div className="w-1/2 h-4 bg-gray-300 rounded mb-2"></div>
          <div className="w-1/3 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCardLoader;
