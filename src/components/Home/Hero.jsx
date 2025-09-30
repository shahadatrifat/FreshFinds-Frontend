import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import SplitText from "../ui/SplitText";
import Carousel from "./Carousel"; 

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-emerald-600/30 via-[#f5f5dc]/10 to-transparent pointer-events-none"
        aria-hidden
      />
      <div className="bg-offwhite">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-12 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Left Column - Content */}
            <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
              {/* Main Heading with Smooth Animation */}
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="font-lora text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl leading-tight text-emerald-700 font-extrabold tracking-tight text-center lg:text-left"
              >
                {/* SplitText for Fresh. Local. Organic. */}
                <SplitText
                  text="Fresh. Local. Organic."
                  className="text-3xl sm:text-4xl md:text-5xl py-1 lg:text-5xl xl:text-6xl font-extrabold text-emerald-700 custom-split-text"
                  delay={100}
                  duration={0.6}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="center"
                />
              </motion.h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-charcoal max-w-xl text-center lg:text-left mx-auto lg:mx-0">
                Curated groceries from trusted vendors — farm to table freshness delivered with care. Shop seasonal produce and artisanal goods.
              </p>

              {/* CTA Buttons with Hover Effects */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-4 sm:mt-6 justify-center lg:justify-start">
                <Link to="/products" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-emerald-600 text-beige px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg hover:scale-105 transform transition ease-in-out duration-300 text-sm sm:text-base">
                    Shop All
                  </button>
                </Link>

                <Link to="/markets" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-emerald-600 text-emerald-600 px-6 py-3 rounded-xl hover:bg-emerald-50 transition ease-in-out duration-300 text-sm sm:text-base">
                    Explore Markets
                  </button>
                </Link>
              </div>

              {/* Small Info Section */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-6 sm:mt-8 justify-center lg:justify-start">
                <div className="bg-beige text-charcoal rounded-lg p-2 px-3 sm:px-4 flex items-center">
                  <span className="text-xs sm:text-sm font-medium">Free delivery over $50</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-600 text-center lg:text-left">
                  Sustainably sourced · Quality assured
                </div>
              </div>
            </div>

            {/* Right Column - Carousel */}
            <div className="flex justify-center w-full order-1 lg:order-2">
              <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-none">
                <Carousel 
                  height="h-[280px] xs:h-[320px] sm:h-[360px] md:h-[400px] lg:h-[420px] xl:h-[500px]" 
                  showCTA={true} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
