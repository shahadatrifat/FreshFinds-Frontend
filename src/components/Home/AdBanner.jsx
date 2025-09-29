import { useEffect, useState } from "react";
import { fetchActiveAds } from "../../Services/productService";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router";
import "swiper/css";
import "swiper/css/pagination";
import CartLoader from "../../pages/shared/loaders/CartLoader";
import toast from "react-hot-toast";

const HomepageBanner = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAds = async () => {
      try {
        const data = await fetchActiveAds();
        setAds(data);
      } catch (err) {
        toast.error("Failed to fetch ads:", err?.message);
      } finally {
        setLoading(false);
      }
    };
    loadAds();
  }, []);

  if (loading) {
    return (
      <CartLoader></CartLoader>
    );
  }

  if (!ads.length) {
    return (
      <div className="w-full h-[400px]  flex items-center justify-center text-gray-500">
        No active ads right now
      </div>
    );
  }

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center mb-6 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-lora font-bold text-emerald-600">
          Featured Promotions
        </h2>
        <p className="text-charcoal mt-2 text-sm sm:text-base">
          Exclusive deals and highlights curated just for you
        </p>
      </div>

      {/* Swiper Banner */}
      <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="h-full"
        >
          {ads.map((ad) => (
            <SwiperSlide key={ad._id}>
              <Link
                to={`/product/${ad.product}`}
                className="block w-full h-full"
              >
                <div className="relative w-full h-[250px] sm:h-[350px] md:h-[500px] lg:h-[600px] overflow-hidden">
                  {/* Banner Image */}
                  <img
                    src={ad.Image}
                    alt={ad.title || "Advertisement"}
                    className="absolute inset-0 w-full h-full object-cover object-center rounded-lg"
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70"></div>

                  {/* Ad Info */}
                  <div className="absolute bottom-6 left-6 sm:left-10 text-beige space-y-2 max-w-[90%] md:max-w-[60%] lg:max-w-[50%]">
                    <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold drop-shadow-md">
                      {ad.title}
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base drop-shadow-md">
                      {ad.description}
                    </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HomepageBanner;
