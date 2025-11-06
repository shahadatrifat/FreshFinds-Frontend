// src/components/Hero/Hero.jsx
import React, { useMemo } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import SplitText from "../ui/SplitText";
import Carousel from "./Carousel";
import {
  ShoppingBag,
  Leaf,
  Truck,
  Award,
  Star,
  Users,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0, x: -24 },
  enter: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0, transition: { delay, duration: 0.6 } },
});

const pillVariant = {
  hidden: { opacity: 0, scale: 0.92 },
  enter: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 0.18 + i * 0.06, duration: 0.38, ease: "easeOut" },
  }),
};

const statVariant = (i) => ({
  hidden: { opacity: 0, scale: 0.94 },
  enter: { opacity: 1, scale: 1, transition: { delay: 0.3 + i * 0.06 } },
});

const Hero = () => {
  const features = useMemo(
    () => [
      { Icon: Truck, title: "Free Delivery", subtitle: "Orders over $50" },
      { Icon: Leaf, title: "100% Organic", subtitle: "Certified products" },
      { Icon: Award, title: "Premium Quality", subtitle: "Trusted vendors" },
    ],
    []
  );

  const stats = useMemo(
    () => [
      { Icon: Users, value: "10K+", label: "Happy Customers" },
      { Icon: Star, value: "4.9", label: "Average Rating" },
      { Icon: TrendingUp, value: "100+", label: "Local Vendors" },
    ],
    []
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-offwhite via-beige/30 to-mint/20">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/6 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/8 rounded-full blur-3xl -z-10" />

      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.02] -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#2e8b57_1px,transparent_1px),linear-gradient(-45deg,#2e8b57_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            className="space-y-6 order-2 lg:order-1"
            initial="hidden"
            animate="enter"
            variants={containerVariants}
          >
            {/* Badge */}
            <motion.div
              variants={fadeUp(0.08)}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-100 to-mint/50 text-emerald-700 px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm border border-emerald-200"
              aria-hidden
            >
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                <Leaf className="w-4 h-4" />
              </motion.div>
              <span>Certified Organic Marketplace</span>
            </motion.div>

            {/* Heading */}
            <motion.h1 variants={fadeUp(0.18)} className="font-lora text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight text-emerald-700 font-bold tracking-tight">
              <SplitText
                text="Fresh. Local. Organic."
                className="font-bold text-emerald-700"
                delay={80}
                duration={0.5}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 36 }}
                to={{ opacity: 1, y: 0 }}
              />
            </motion.h1>

            {/* Subheading */}
            <motion.p variants={fadeUp(0.28)} className="text-lg sm:text-xl text-charcoal/80 max-w-xl leading-relaxed">
              Discover farm-fresh produce and artisanal goods from trusted local vendors.{" "}
              <span className="font-semibold text-emerald-700">Quality you can taste</span>, delivered to your doorstep.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp(0.36)} className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link to="/products" aria-label="Shop now">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-7 py-3 rounded-xl font-semibold shadow-md hover:from-emerald-700 hover:to-emerald-800 transition">
                  <ShoppingBag className="w-5 h-5" />
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </motion.button>
              </Link>

              <Link to="/about" aria-label="Learn more about Freshfinds">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-emerald-600 border-2 border-emerald-600 px-7 py-3 rounded-xl font-semibold shadow-sm hover:bg-emerald-50 transition">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </motion.button>
              </Link>
            </motion.div>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-gray-200">
              {features.map((f, i) => (
                <motion.div key={f.title} custom={i} variants={pillVariant} initial="hidden" animate="enter" className="flex items-start gap-3 bg-white px-4 py-3 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition transform">
                  <div className="flex-shrink-0 mt-0.5">
                    <f.Icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-charcoal">{f.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{f.subtitle}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
              {stats.map((s, i) => (
                <motion.div key={s.label} variants={statVariant(i)} initial="hidden" animate="enter" className="text-start">
                  <div className="flex items-center justify-start gap-2">
                    <s.Icon className="w-4 h-4 text-emerald-600" />
                    <div className="text-2xl font-bold text-emerald-700">{s.value}</div>
                  </div>
                  <div className="text-xs text-gray-600">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Trust badge */}
            <motion.div variants={fadeUp(0.5)} className="inline-flex items-center gap-2 text-sm text-gray-600 mt-4 bg-gradient-to-r from-yellow-50 to-orange-50 px-4 py-2 rounded-full border border-yellow-200">
              <Award className="w-4 h-4 text-yellow-600" />
              <span className="font-medium">Trusted by 10,000+ customers · Free delivery over $50</span>
            </motion.div>
          </motion.div>

          {/* Right - Carousel */}
          <motion.div initial="hidden" animate="enter" variants={{ hidden: { opacity: 0, x: 24 }, enter: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } } }} className="flex justify-center w-full order-1 lg:order-2">
            <div className="w-full max-w-2xl lg:max-w-none">
              <Carousel height="h-[320px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px]" showCTA />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);
