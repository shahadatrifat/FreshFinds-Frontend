import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import shot1 from "../../assets/banner1.jpg";
import shot2 from "../../assets/banner2.jpg";
import shot3 from "../../assets/banner4.jpg";
import shot4 from "../../assets/banner5.jpg";
import { Link } from "react-router";

const slides = [
  {
    id: 1,
    image: shot1,
    title: "Exclusive Offers for a Curated Shopping Experience",
    description:
      "Indulge in luxury shopping with exclusive deals tailored just for you. Shop artisanal goods, organic produce, and premium items, all from trusted vendors, with offers you won't find anywhere else.",
  },
  {
    id: 2,
    image: shot2,
    title: "Empower Your Business as a Vendor",
    description:
      "Unlock new opportunities by becoming a vendor on our platform. Showcase your premium products and connect with a community of buyers who appreciate quality and craftsmanship.",
  },
  {
    id: 3,
    image: shot3,
    title: "Discover Product Price History for Smarter Shopping",
    description:
      "Stay informed with real-time price trends for your favorite products. Whether you're a savvy shopper or a vendor, gain insights into market fluctuations and make decisions that save you money.",
  },
  {
    id: 4,
    image: shot4,
    title: "Unleash Your Creativity with Our User-Friendly Platform",
    description:
      "Explore a world of creativity with our user-friendly platform. Share your ideas, connect with fellow artists, and embark on a journey of inspiration and collaboration.",
  },
];

const Carousel = () => {
  return (
    <div className=" mx-auto ">
      <div className="relative overflow-hidden rounded-2xl shadow-xl">
        {/* Swiper component */}
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={{
            prevEl: ".swiper-button-prev-custom",
            nextEl: ".swiper-button-next-custom",
          }}
          className="mySwiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-[250px] sm:h-[350px] md:h-[500px] lg:h-[600px] overflow-hidden">
                {/* Banner Image */}
                <img
                  src={slide.image}
                  alt={slide.title || "Advertisement"}
                  className="absolute inset-0 w-full h-full object-cover object-center rounded-lg"
                  loading="lazy"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70"></div>

                {/* Ad Info */}
                <div className="absolute bottom-6 left-6 sm:left-10 text-beige space-y-2 max-w-full md:max-w-[60%] lg:max-w-[50%]">
                  <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold drop-shadow-md">
                    {slide.title}
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base drop-shadow-md">
                    {slide.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <button className="swiper-button-prev-custom absolute top-1/2 left-4 z-10 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 text-beige rounded-full transition-all duration-200">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button className="swiper-button-next-custom absolute top-1/2 right-4 z-10 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 text-beige rounded-full transition-all duration-200">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
