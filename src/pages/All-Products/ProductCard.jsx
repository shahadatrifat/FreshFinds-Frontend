import { ShoppingCart } from "lucide-react";
import { Button } from "../../components/ui/button";
import React from "react";
import { Link } from "react-router";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../components/ui/tooltip";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-beige border rounded-lg hover:shadow-md transition-all overflow-hidden">
      {/* Product Image */}
      <img
        src={product.productImage || "/path/to/default-image.jpg"}
        alt={product.name}
        className="w-full h-40 object-cover"
        loading="lazy"
      />

      {/* Product Details */}
      <div className="p-3">
        <Link
          to={`/product/${product._id}`}
          aria-label={`View details of ${product.name}`}
        >
          <h3 className="font-semibold hover:underline text-charcoal truncate">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 capitalize">{product.category}</p>
        <p className="text-emerald font-lora">${product.price.toFixed(2)}</p>
      </div>

      <div className="flex justify-between items-center p-3 gap-3">
        {/* Add to Cart */}
        <Button
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-beige rounded-lg font-medium transition-all duration-300"
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </Button>

        {/* Buy Now */}
        <Button
          className="flex-1 bg-[#DAA520] text-beige rounded-lg hover:bg-[#B8860B] hover:text-[#FFF8DC] transition-all duration-300"
          aria-label={`Buy ${product.name} now`}
        >
          Buy
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
