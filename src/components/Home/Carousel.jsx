import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { ChevronLeft, ChevronRight, ShoppingBag, Store, TrendingUp, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import shot1 from "../../assets/banner1.jpg";
import shot2 from "../../assets/banner2.jpg";
import shot3 from "../../assets/banner4.jpg";
import shot4 from "../../assets/banner5.jpg";

const slides = [
  {
    id: 1,
    image: shot1,
    badge: "Special Offer",
    icon: ShoppingBag,
    title: "Exclusive Shopping Offers",
    description: "Discover premium organic produce and artisanal goods from trusted local vendors",
    cta: "Shop Now",
    ctaLink: "/products"
  },
  {
    id: 2,
    image: shot2,
    badge: "Join Us",
    icon: Store,
    title: "Become a Vendor",
    description: "Showcase your products and reach thousands of quality-conscious buyers",
    cta: "Apply Now",
    ctaLink: "/apply-vendor"
  },
  {
    id: 3,
    image: shot3,
    badge: "Smart Shopping",
    icon: TrendingUp,
    title: "Price Tracking",
    description: "Monitor real-time price trends and make informed purchasing decisions",
    cta: "Learn More",
    ctaLink: "/products"
  },
  {
    id: 4,
    image: shot4,
    badge: "Community",
    icon: Sparkles,
    title: "Join Our Community",
    description: "Connect with local vendors and discover fresh, sustainable products daily",
    cta: "Get Started",
    ctaLink: "/products"
  },
];

const Carousel = () => {
  return (
    <div className="relative w-full">
      <div className="relative overflow-hidden rounded-2xl shadow-md">
        <Swiper
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={{
            prevEl: ".swiper-button-prev-custom",
            nextEl: ".swiper-button-next-custom",
          }}
          className="hero-carousel"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-[320px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px] overflow-hidden group">
                {/* Background Image */}
                <motion.img
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2 }}
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading={index === 0 ? "eager" : "lazy"}
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-10 lg:p-12">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="max-w-2xl"
                  >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-emerald-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 shadow-md">
                      <slide.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{slide.badge}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg leading-tight">
                      {slide.title}
                    </h2>

                    {/* Description */}
                    <p className="text-sm sm:text-base md:text-lg text-white/90 mb-6 drop-shadow-md max-w-xl leading-relaxed">
                      {slide.description}
                    </p>

                    {/* CTA Button */}
                    <Link to={slide.ctaLink}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 bg-beige text-emerald-600 px-4 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:bg-emerald-50"
                      >
                        <span>{slide.cta}</span>
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>

                {/* Decorative Element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-transparent rounded-bl-full" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <button 
          className="swiper-button-prev-custom absolute top-1/2 left-2 z-10 -translate-y-1/2 p-2  hover:bg-white/30  bg-white/10 text-white rounded-full transition-all duration-300 shadow hover:scale-110 group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <button 
          className="swiper-button-next-custom absolute top-1/2 right-2 z-10 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/30  text-white rounded-full transition-all duration-300 shadow hover:scale-110 group"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Custom Swiper Pagination Styles */}
      <style jsx>{`
        .hero-carousel .swiper-pagination {
          bottom: 24px !important;
        }
        .hero-carousel .swiper-pagination-bullet {
          width: 10px !important;
          height: 10px !important;
          margin: 0 6px !important;
          background: rgba(255, 255, 255, 0.7) !important;
          transition: all 0.3s ease !important;
        }
        .hero-carousel .swiper-pagination-bullet-active {
          width: 28px !important;
          background: rgba(255, 255, 255, 1) !important;
          border-radius: 5px !important;
        }
      `}</style>
    </div>
  );
};

export default Carousel;