import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { Link } from 'react-router';
import { FaCarrot, FaLeaf, FaAppleAlt, FaGlassMartiniAlt, FaBreadSlice, FaDrumstickBite } from 'react-icons/fa';

const categories = [
  { value: 'meat', label: 'Meat', icon: <FaDrumstickBite className='text-emerald' size={25} /> },
  { value: 'vegetables', label: 'Vegetables', icon: <FaCarrot className='text-emerald' size={25} /> },
  { value: 'fruits', label: 'Fruits', icon: <FaAppleAlt className='text-emerald' size={25} /> },
  { value: 'dairy', label: 'Dairy', icon: <FaLeaf className='text-emerald' size={25} /> },
  { value: 'bakery', label: 'Bakery', icon: <FaBreadSlice className='text-emerald' size={25} /> },
  { value: 'beverages', label: 'Beverages', icon: <FaGlassMartiniAlt className='text-emerald' size={25} /> },
];

const CategoryGrid = () => {
  return (
    <Fade>
      <section className="py-12 px-4">
        {/* Header and See More Link */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-emerald font-lora">
            Shop by Category
          </h2>
          <Link
            to="/products" 
            className="text-sm md:text-base font-medium text-emerald-600 hover:text-emerald-800 transition hover:underline duration-300"
          >
            See More
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((c) => (
            <Link
              key={c.value}
              to={`/category/${c.value}`}
              className="group relative overflow-hidden rounded-2xl hover:shadow-md transition-all duration-300 transform hover:scale-102"
              aria-label={`Go to ${c.label} category`}
            >
              {/* Background Image */}
              <img
                src={`/categories/${c.value}.jpg`}
                alt={`${c.label} category`}
                className="w-full h-44 sm:h-52 md:h-60 lg:h-64 object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-500" />

              {/* Category Icon */}
              <div className="absolute top-4 left-4 text-emerald">{c.icon}</div>

              {/* Text */}
              <div className="absolute inset-0 flex items-end justify-center p-6 sm:p-10">
                <span className="text-lg sm:text-xl font-semibold text-beige tracking-wide capitalize group-hover:text-emerald-300 transition-colors duration-300">
                  {c.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Fade>
  );
};

export default CategoryGrid;
