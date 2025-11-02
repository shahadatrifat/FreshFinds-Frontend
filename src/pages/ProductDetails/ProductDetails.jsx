import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fetchProductById } from "../../Services/productService";
import toast from "react-hot-toast";
import CartLoaderFull from "../shared/loaders/CartLoaderFull";
import ProductReviews from "./ProductReviews";
import RelatedProducts from "./RelatedProducts";
import { ChevronLeft, Package, CheckCircle, XCircle, Store, Tag } from "lucide-react";
import ProductActions from "../../components/Product/ProductActions";
import PriceHistory from "./PriceHistory";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });

  const product = data?.data;
  console.log(product);
  const [cart, setCart] = useState([]);

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

  const isProductOutOfStock = product?.availabilityStatus === "out of stock";

  return (
    <div className="bg-offwhite min-h-screen py-8">
      <div className="container max-w-7xl mx-auto px-4 md:px-8 lg:px-16 space-y-12">
        {/* Go Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <button
            onClick={() => window.history.back()}
            className="group flex items-center gap-2 text-emerald-700 hover:text-emerald-600 focus:outline-none relative px-4 py-2 rounded-lg hover:bg-emerald-50 transition-all"
          >
            <ChevronLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
            <span className="text-lg font-medium">Go Back</span>
          </button>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl  overflow-hidden  duration-300"
        >
          <div className="flex flex-col lg:flex-row gap-8 p-6 md:p-8">
            {/* Product Image */}
            <div className="flex-shrink-0 lg:w-[450px]">
              <div className="relative bg-gradient-to-br from-beige/30 to-mint/20 rounded-2xl p-6 group">
                <img
                  src={product.productImage || "/path/to/default-image.jpg"}
                  alt={product.name}
                  className="w-full h-[400px] object-contain rounded-xl transition-transform duration-500 group-hover:scale-102"
                  loading="lazy"
                />
                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold  flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  {product.category}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="flex-1 flex flex-col justify-between gap-6">
              {/* Header */}
              <div className="space-y-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-700 tracking-tight font-lora mb-3">
                    {product.name}
                  </h1>
                  
                  {/* Vendor Info */}
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <Store className="w-5 h-5" />
                    <span className="text-lg">by <span className="font-semibold text-emerald-700">{product.vendorName}</span></span>
                  </div>
                </div>

                {/* Price */}
                <div className="  rounded-xl p-4  inline-block">
                  <p className="text-4xl md:text-5xl font-bold font-lora bg-clip-text text-transparent ">
                    ${product.price.toFixed(2)}
                  </p>
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-2">
                  {isProductOutOfStock ? (
                    <>
                      <XCircle className="w-5 h-5 text-red-500" />
                      <span className="text-lg font-semibold text-red-600">Out of Stock</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-lg font-semibold text-green-600">In Stock</span>
                    </>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="bg-gradient-to-br from-beige/30 to-transparent rounded-xl p-6 border border-emerald-100">
                <div className="flex items-center gap-2 mb-3">
                  <Package className="w-5 h-5 text-emerald-600" />
                  <h2 className="text-2xl font-bold text-emerald-700 font-lora">
                    About This Product
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {product.description || "No description available."}
                </p>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-gray-200">
                <ProductActions
                  product={product}
                  cart={cart}
                  variant="details"
                  setCart={setCart}
                  isDisabled={isProductOutOfStock} 
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gradient-to-br from-offwhite via-beige/10 to-mint/5 px-6 text-sm text-gray-500">Product Information</span>
          </div>
        </div>

        {/* Price history */}
        <PriceHistory product={product} />
        
        {/* Reviews */}
        <ProductReviews product={product} />
        
        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gradient-to-br from-offwhite via-beige/10 to-mint/5 px-6 text-sm text-gray-500">You May Also Like</span>
          </div>
        </div>

        {/* Related Products */}
          <RelatedProducts product={product} />
        
      </div>
    </div>
  );
};

export default ProductDetails;