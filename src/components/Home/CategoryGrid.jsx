import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { FaCarrot, FaLeaf, FaAppleAlt, FaGlassMartiniAlt, FaBreadSlice, FaDrumstickBite, FaArrowRight } from 'react-icons/fa';

const categories = [
  { value: 'meat', label: 'Meat', icon: FaDrumstickBite, color: 'from-red-500 to-red-600' },
  { value: 'vegetables', label: 'Vegetables', icon: FaCarrot, color: 'from-green-500 to-emerald-600' },
  { value: 'fruits', label: 'Fruits', icon: FaAppleAlt, color: 'from-orange-500 to-red-500' },
  { value: 'dairy', label: 'Dairy', icon: FaLeaf, color: 'from-blue-400 to-blue-500' },
  { value: 'bakery', label: 'Bakery', icon: FaBreadSlice, color: 'from-amber-500 to-yellow-600' },
  { value: 'beverages', label: 'Beverages', icon: FaGlassMartiniAlt, color: 'from-purple-500 to-pink-500' },
];

const CategoryGrid = () => {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-white to-beige/30">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4"
        >
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-700 font-lora mb-2">
              Shop by Category
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Explore fresh products from local vendors
            </p>
          </div>
          
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
          >
            <span>View All Products</span>
            <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.value}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={`/category/${category.value}`}
                className="group relative block overflow-hidden rounded-2xl bg-white border border-gray-100 hover:border-emerald-300 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {/* Image Container */}
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <img
                    src={`/categories/${category.value}.jpg`}
                    alt={`${category.label} category`}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                  
                  {/* Icon Badge */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`absolute top-3 right-3 bg-gradient-to-br ${category.color} p-3 rounded-full shadow-md`}
                  >
                    <category.icon className="text-white" size={20} />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300 mb-1">
                    {category.label}
                  </h3>
                  <p className="text-xs text-white/80 group-hover:text-white transition-colors">
                    Shop now →
                  </p>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-emerald-400 rounded-2xl transition-all duration-300 pointer-events-none" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-600">
            Fresh products delivered daily from over{' '}
            <span className="font-semibold text-emerald-600">100+ local vendors</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryGrid;