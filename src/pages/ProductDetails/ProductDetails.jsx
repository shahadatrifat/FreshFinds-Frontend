import React, { useEffect, useState } from "react";
import ProductHeader from "./ProductHeader";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../../Services/productService";
import toast from "react-hot-toast";
import CartLoaderFull from "../shared/loaders/CartLoaderFull";
import ProductDescription from "./ProductDescription";
import ProductReviews from "./ProductReviews";
import RelatedProducts from "./RelatedProducts";
import { Button } from "../../components/ui/button";
import { ShoppingCart, ChevronLeft } from "lucide-react";
import ProductActions from "../../components/Product/ProductActions";

const ProductDetails = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });
  const product = data?.data;
  console.log(product);

  // Cart state
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  if (isLoading) {
    return <CartLoaderFull />;
  }
  if (isError) {
    toast.error(`Error: ${isError.message}`);
    return null;
  }

  return (
    <div className="bg-offwhite min-h-screen py-8">
      <div className="container max-w-7xl mx-auto px-4 md:px-8 lg:px-16 space-y-12">
        {/* Go Back Button */}
        <div className="flex items-center mb-2">
          <button
            onClick={() => window.history.back()}
            className="group flex items-center gap-2 text-emerald-700 hover:text-emerald-600 focus:outline-none relative"
          >
            <ChevronLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span className="text-lg font-medium relative">
              Go Back
              {/* Underline */}
              <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </button>
        </div>

        {/* Product Info */}
        <div className="flex flex-col lg:flex-row gap-8 bg-gradient-to-b from-beige/90 to-beige/100 p-4 rounded-3xl transition-all duration-300 hover:shadow-3xl">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <img
              src={product.productImage || "/path/to/default-image.jpg"}
              alt={product.name}
              className="w-full lg:w-[400px] h-96 object-cover rounded-2xl transition-transform duration-500"
              loading="lazy"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 flex flex-col justify-between gap-6">
            {/* Header */}
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-700 tracking-wide">
                {product.name}
              </h1>
              <p className="text-gray-500 capitalize mt-2 text-lg">
                {product.category}
              </p>

              <p className="text-3xl md:text-4xl font-lora font-bold mt-3 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-400">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Stock: {product.stock} | Vendor: {product.vendorName}
              </p>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-semibold text-emerald-700 mb-2">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {product.description || "No description available."}
              </p>
            </div>

            {/* Actions */}
            <ProductActions
              product={product}
              cart={cart}
              variant="details"
              setCart={setCart}
            />
          </div>
        </div>

        <hr className="my-8 border-t border-gray-200/50" />

        {/* Reviews */}
        <ProductReviews product={product} />
        <hr className="my-8 border-t border-gray-200/50" />

        {/* Related Products */}
        <RelatedProducts product={product} />
      </div>
    </div>
  );
};

export default ProductDetails;
