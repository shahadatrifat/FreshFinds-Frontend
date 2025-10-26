import { useEffect, useState } from "react";
import { fetchActiveAds } from "../../Services/productService";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Tag } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import CartLoader from "../../pages/shared/loaders/CartLoader";
import toast from "react-hot-toast";

const HomepageBanner = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAds = async () => {
      try {
        const data = await fetchActiveAds();
        console.log("Ads fetched successfully:", data);
        setAds(data || []);
      } catch (err) {
        toast.error("Failed to fetch ads");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadAds();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-16">
        <CartLoader />
      </div>
    );
  }

  if (!ads.length) {
    return (
      <section className="py-16 bg-gradient-to-b from-beige/20 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center">
            <Tag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">No active promotions right now</p>
            <p className="text-gray-400 text-sm mt-2">Check back soon for exciting deals!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 lg:py-20 bg-gradient-to-b from-white via-beige/10 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 lg:mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Exclusive Offers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-700 font-lora mb-3">
            Featured Promotions
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Discover exclusive deals and special offers from our trusted vendors
          </p>
        </motion.div>

        {/* Swiper Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden shadow-md"
        >
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            slidesPerView={1}
            loop={true}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{ 
              delay: 5000, 
              disableOnInteraction: false,
              pauseOnMouseEnter: true 
            }}
            pagination={{ 
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-white/70',
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-white'
            }}
            className="h-full"
          >
            {ads.map((ad, index) => (
              <SwiperSlide key={ad._id}>
                <Link
                  to={`/product/${ad.product}`}
                  className="group block w-full h-full"
                >
                  <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
                    {/* Banner Image */}
                    <motion.img
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8 }}
                      src={ad.Image}
                      alt={ad.title || "Advertisement"}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading={index === 0 ? "eager" : "lazy"}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Content Container */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-12 lg:p-16">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="max-w-3xl"
                      >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-emerald-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-4">
                          <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>Special Offer</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg">
                          {ad.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm sm:text-base md:text-lg text-white/90 mb-6 drop-shadow-md line-clamp-2 max-w-2xl">
                          {ad.description}
                        </p>

                        {/* CTA Button */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-all group-hover:gap-3"
                        >
                          <span>Shop Now</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-bl-full" />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-600">
            Limited time offers · Updated daily · Verified vendors only
          </p>
        </motion.div>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx>{`
        .swiper-pagination {
          bottom: 20px !important;
        }
        .swiper-pagination-bullet {
          width: 12px !important;
          height: 12px !important;
          margin: 0 6px !important;
          transition: all 0.3s ease !important;
        }
        .swiper-pagination-bullet-active {
          width: 32px !important;
          border-radius: 6px !important;
        }
      `}</style>
    </section>
  );
};

export default HomepageBanner;