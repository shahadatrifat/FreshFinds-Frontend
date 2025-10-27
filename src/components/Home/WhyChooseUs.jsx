import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Leaf, Shield, Headphones, DollarSign, Award, Clock, Heart } from 'lucide-react';

const WhyChooseUs = () => {
  const benefits = [
    {
      icon: Truck,
      title: 'Fast & Free Delivery',
      description: 'Free shipping on orders over $50. Same-day delivery available in select areas.',
      color: 'from-emerald-500 to-green-600',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    },
    {
      icon: Leaf,
      title: '100% Organic',
      description: 'All products are certified organic from trusted local farms and vendors.',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      icon: DollarSign,
      title: 'Best Prices',
      description: 'Competitive pricing with regular deals and discounts on fresh produce.',
      color: 'from-amber-500 to-yellow-600',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600'
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'Every product is hand-picked and quality-checked before delivery.',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Our customer support team is always here to help you with any queries.',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      icon: Award,
      title: 'Trusted Vendors',
      description: 'Partner with 100+ verified local vendors committed to quality.',
      color: 'from-indigo-500 to-purple-600',
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600'
    },
    {
      icon: Clock,
      title: 'Always Fresh',
      description: 'Farm-to-table freshness guaranteed. Products picked and delivered daily.',
      color: 'from-teal-500 to-emerald-600',
      bgColor: 'bg-teal-50',
      iconColor: 'text-teal-600'
    },
    {
      icon: Heart,
      title: 'Customer Love',
      description: 'Rated 4.9/5 by over 10,000 happy customers who trust our service.',
      color: 'from-rose-500 to-pink-600',
      bgColor: 'bg-rose-50',
      iconColor: 'text-rose-600'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-beige/20 via-white to-beige/10">
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
            <Award className="w-4 h-4" />
            <span>Our Promise</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-700 font-lora mb-3">
            Why Choose Us?
          </h2>

          {/* Subtitle */}
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
            We're committed to delivering the freshest organic products with exceptional 
            service and unbeatable value
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-emerald-200 transition-all duration-300  hover:shadow-sm"
            >
              {/* Icon Container */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`w-14 h-14 ${benefit.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <benefit.icon className={`w-7 h-7 ${benefit.iconColor}`} />
              </motion.div>

              {/* Title */}
              <h3 className="text-lg font-bold text-charcoal mb-2 group-hover:text-emerald-700 transition-colors">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {benefit.description}
              </p>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-400/5 to-transparent rounded-tr-2xl rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats/Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-gray-200"
        >
          {[
            { number: '10k+', label: 'Happy Customers' },
            { number: '100+', label: 'Local Vendors' },
            { number: '500+', label: 'Fresh Products' },
            { number: '4.9★', label: 'Average Rating' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 + index * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl font-bold text-emerald-700 mb-1">
                {stat.number}
              </p>
              <p className="text-sm text-gray-600">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Optional CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-600">
            Join thousands of satisfied customers ·{' '}
            <span className="font-semibold text-emerald-600">
              Start shopping today
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;