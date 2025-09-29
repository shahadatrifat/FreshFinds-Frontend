// src/components/productDetails/ProductHeader.jsx
import React from "react";

const ProductHeader = ({ product }) => {
  return (
    <div className="bg-beige p-6 rounded-xl shadow-md flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
      {/* Product Info */}
      <div className="flex-1 space-y-3">
        <h1 className="text-3xl lg:text-4xl font-bold text-emerald-700">
          {product.name}
        </h1>
        <p className="text-xl text-[#B8860B] font-lora">
          ${product.price.toFixed(2)}
        </p>
        <p className="text-sm text-gray-500 capitalize">
          Category: {product.category}
        </p>
        <p className="text-sm text-gray-500">
          Stock:{" "}
          <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
            {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
          </span>
        </p>
        <p className="text-sm text-gray-500">
          Vendor: <span className="font-medium">{product.vendorName}</span>
        </p>
      </div>

      {/* Optional Product Image */}
      {/* <div className="w-full lg:w-64 flex-shrink-0">
        <img
          src={product.productImage || "/default-product.png"}
          alt={product.name}
          className="w-full h-64 lg:h-56 object-contain rounded-lg shadow-sm"
        />
      </div> */}
    </div>
  );
};

export default ProductHeader;
