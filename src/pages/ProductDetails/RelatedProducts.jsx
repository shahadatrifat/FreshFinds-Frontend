import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import ProductRow from "../All-Products/ProductRow";
import { fetchPublicProducts } from "../../Services/productService";
import toast from "react-hot-toast";

const RelatedProducts = ({ product }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        setLoading(true);
        const res = await fetchPublicProducts({
          category: product.category,
          limit: 10, 
        });
        console.log("Related products fetched successfully:", res.data);
        const filtered = res.data.filter((p) => p._id !== product._id);
        setRelatedProducts(filtered);
      } catch (error) {
        console.log("Error fetching related products:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (product?.category) fetchRelated();
  }, [product]);

  if (loading)
    return (
      <div className="text-center py-12">
        <div className="inline-block w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 text-lg font-medium">
          Loading related products...
        </p>
      </div>
    );

  if (!relatedProducts.length)
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16 bg-gradient-to-br from-beige/30 to-mint/10 rounded-2xl border-2 border-dashed border-emerald-200"
      >
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-10 h-10 text-emerald-600" />
        </div>
        <p className="text-gray-600 text-lg font-medium">
          No related products available
        </p>
        <p className="text-gray-500 text-sm mt-1">
          Check back soon for similar items!
        </p>
      </motion.div>
    );

  return (
    <section className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-emerald-700 font-lora flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8" />
          Related Products
        </h2>
        <p className="text-gray-600 mt-2">
          Discover similar items you might love
        </p>
      </motion.div>

      {/* Products Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative overflow-x-auto  rounded-2xl p-6 md:p-8 "
      >
        {/* Gradient overlays for horizontal scroll effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Product row */}
        <ProductRow
          title=""
          products={relatedProducts}
          seeMoreHref={`/category/${product.category}`}
        />
      </motion.div>
    </section>
  );
};

export default RelatedProducts;