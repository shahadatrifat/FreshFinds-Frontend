import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import SplitText from "../ui/SplitText";
import Carousel from "./Carousel";
import { ShoppingBag, Leaf, Truck, Award } from "lucide-react";

const Hero = () => {
  const features = [
    { icon: Truck, text: "Free Delivery" },
    { icon: Leaf, text: "100% Organic" },
    { icon: Award, text: "Premium Quality" }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-offwhite via-beige/30 to-mint/20">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium"
            >
              <Leaf className="w-4 h-4" />
              <span>Certified Organic Marketplace</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-lora text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight text-emerald-700 font-bold tracking-tight"
            >
              <SplitText
                text="Fresh. Local. Organic."
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-emerald-700"
                delay={100}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
              />
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg sm:text-xl text-charcoal/80 max-w-xl leading-relaxed"
            >
              Discover farm-fresh produce and artisanal goods from trusted local vendors. 
              Quality you can taste, delivered to your doorstep.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mt-8"
            >
              <Link to="/products" className="group">
                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 text-beige px-6 py-4 rounded-xl font-semibold hover:bg-emerald-700 transform hover:scale-102 transition-all duration-300  hover:shadow-md">
                  <ShoppingBag className="w-5 h-5" />
                  <span>Shop Now</span>
                </button>
              </Link>

              <Link to="/about" className="group">
                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-beige text-emerald-600 border-2 border-emerald-600 px-6 py-4 rounded-xl font-semibold  transform hover:scale-102 transition-all duration-300 ">
                  <span>Learn More</span>
                </button>
              </Link>
            </motion.div>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-3 mt-8 pt-8 border-t border-gray-200"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200"
                >
                  <feature.icon className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-medium text-charcoal">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="inline-flex items-center gap-2 text-sm text-gray-600 mt-4"
            >
              <Award className="w-4 h-4 text-gold" />
              <span>Trusted by 10,000+ customers · Free delivery over $50</span>
            </motion.div>
          </motion.div>

          {/* Right Column - Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center w-full order-1 lg:order-2"
          >
            <div className="w-full max-w-2xl lg:max-w-none">
              <Carousel
                height="h-[320px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px]"
                showCTA={true}
              />
            </div>
          </motion.div>
        </div>

       
      </div>
    </section>
  );
};

export default Hero;