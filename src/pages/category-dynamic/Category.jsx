import React from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { fetchPublicProducts } from "../../Services/productService";
import ProductCard from "../../pages/All-Products/ProductCard";
import SkeletonCardLoader from "../../pages/shared/loaders/SkeletonCardLoader";
import { 
  ChevronLeft, 
  Package, 
  AlertCircle,
  Layers,
  ShoppingBag,
  Apple,
  Milk,
  Beef,
  Coffee,
  Wine
} from "lucide-react";
import { FaCarrot, FaBreadSlice } from "react-icons/fa";

const getCategoryIcon = (category) => {
  const icons = {
    vegetables: FaCarrot,
    fruits: Apple,
    dairy: Milk,
    meat: Beef,
    bakery: FaBreadSlice,
    beverages: Wine,
  };
  return icons[category?.toLowerCase()] || Package;
};

const Category = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const prettyName = categoryName ? categoryName.replace(/_/g, " ") : "";
  const CategoryIcon = getCategoryIcon(categoryName);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", categoryName],
    queryFn: () => fetchPublicProducts({ category: categoryName }),
    staleTime: 1000 * 60 * 5,
    onError: () => toast.error("Failed to load products"),
  });

  const products = data?.data || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-offwhite via-beige/10 to-mint/5 py-8">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-emerald-700 hover:text-emerald-600 focus:outline-none px-4 py-2 rounded-lg hover:bg-emerald-50 transition-all"
          >
            <ChevronLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
            <span className="text-lg font-medium">Back</span>
          </button>
        </motion.div>

        {/* Category Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow">
              <CategoryIcon className="w-8 h-8 text-beige" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-700 capitalize font-lora mb-3">
            {prettyName}
          </h1>
          
          <div className="flex items-center justify-center gap-2 text-charcoal">
            <Layers className="w-5 h-5" />
            <p className="text-lg">
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                  Loading products...
                </span>
              ) : (
                <span>
                  <span className="font-semibold text-emerald-700">{products.length}</span> product{products.length !== 1 ? "s" : ""} available
                </span>
              )}
            </p>
          </div>

          {/* Category Description */}
          <p className="text-charcoal mt-4 max-w-2xl mx-auto">
            Discover fresh, organic {prettyName.toLowerCase()} from trusted local vendors
          </p>
        </motion.header>

        {/* Products Grid */}
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className=" gap-6"
          >
            {[...Array(8)].map((_, i) => (
              <SkeletonCardLoader key={i} />
            ))}
          </motion.div>
        ) : isError ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white rounded-2xl shadow border border-red-200"
          >
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-10 h-10 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-red-600 mb-2">
              Failed to load products
            </h3>
            <p className="text-gray-600 mb-6">
              We couldn't load {prettyName.toLowerCase()} products. Please try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold"
            >
              Retry
            </button>
          </motion.div>
        ) : products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white rounded-2xl shadow border-2 border-dashed border-emerald-200"
          >
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-charcoal mb-2">
              No products available
            </h3>
            <p className="text-gray-600 mb-6">
              We don't have any {prettyName.toLowerCase()} products at the moment.
            </p>
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-semibold"
            >
              Browse All Products
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Category;