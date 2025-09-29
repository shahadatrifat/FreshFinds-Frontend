// src/components/Product/ProductCard.jsx
import React from "react";
import { Link } from "react-router"; // keep your project's import style
import ProductActions from "../../components/Product/ProductActions";

const ProductCard = ({ product = {} }) => {
  const price =
    typeof product.price === "number"
      ? product.price.toFixed(2)
      : Number(product.price || 0).toFixed(2);

  return (
    <article
      className="bg-beige border rounded-lg hover:shadow-md transition-all overflow-hidden"
      role="article"
      aria-labelledby={`product-title-${product._id}`}
    >
      {/* Product Image */}
      <div className="w-full h-40 bg-offwhite overflow-hidden">
        <img
          src={product.productImage || "/images/default-image.jpg"}
          alt={product.name || "Product image"}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>

      {/* Product Details */}
      <div className="p-3">
        <Link
          to={`/product/${product._id}`}
          aria-label={`View details of ${product.name}`}
        >
          <h3
            id={`product-title-${product._id}`}
            className="font-semibold hover:underline text-charcoal truncate"
            title={product.name}
          >
            {product.name || "Untitled product"}
          </h3>
        </Link>

        <p className="text-sm text-gray-500 capitalize mt-1">
          {product.category || "Uncategorized"}
        </p>

        <p className="text-emerald font-lora mt-2">${price}</p>
      </div>

      {/* Actions (Add to cart / Buy) */}
      <div className="flex justify-between items-center p-3 gap-3">
        <ProductActions product={product} variant="card" />
      </div>
    </article>
  );
};

export default ProductCard;
