import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPublicProducts } from '../../Services/productService';
import ProductCard from '../../pages/All-Products/ProductCard';
import SkeletonCardLoader from '../../pages/shared/loaders/SkeletonCardLoader';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { Sparkles, TrendingUp, ArrowRight, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const FeaturedGrid = ({ limit = 8 }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: () => fetchPublicProducts({}),
    staleTime: 1000 * 60 * 5,
    onError: () => toast.error('Failed to fetch featured products'),
  });

  const products = data?.data || [];
  const featured = [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);

  if (isLoading) {
    return (
      <section className="py-16 lg:py-20 rounded-2xl bg-gradient-to-b from-white to-beige/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded-lg w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
          </div>
          <SkeletonCardLoader limit={limit} />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <div className="text-red-500 text-lg font-semibold mb-2">
              Failed to load featured products
            </div>
            <p className="text-red-600 text-sm">
              Please try refreshing the page
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!featured.length) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center">
            <Star className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">No featured products available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-beige/20 via-white to-beige/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            <span>Trending Now</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-700 font-lora mb-3">
            Featured Products
          </h2>

          {/* Subtitle */}
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-6">
            Handpicked fresh products from our trusted local vendors
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-emerald-600 text-beige px-6 py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-colors  hover:shadow-sm"
            >
              <span>Browse All Products</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
          
          <p className="text-sm text-gray-600 mt-4">
            Discover over <span className="font-semibold text-emerald-600">500+ products</span> from local vendors
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedGrid;