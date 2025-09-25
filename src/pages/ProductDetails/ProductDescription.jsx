import React from "react";

const ProductDescription = ({ product }) => {
  return (
    <div className="bg-beige p-6  shadow-md ">
      <h2 className="text-2xl font-semibold text-emerald-700 mb-4">
        Product Description
      </h2>
      <p className="text-gray-700 leading-relaxed">
        {product.description || "No description available for this product."}
      </p>
    </div>
  );
};

export default ProductDescription;
