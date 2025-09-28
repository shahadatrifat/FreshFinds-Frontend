// src/components/ProductRow.jsx
import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, animate } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

const ProductRow = ({ title, products = [], seeMoreHref }) => {
  const scrollerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateCanScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    clearTimeout(el._scrollTimeout);
    el._scrollTimeout = setTimeout(() => {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth + 1 < el.scrollWidth);
    }, 50);
  }, []);

  useEffect(() => {
    updateCanScroll();
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => updateCanScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateCanScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateCanScroll);
    };
  }, [updateCanScroll]);

  const handleScroll = (direction = "right") => {
    const el = scrollerRef.current;
    if (!el) return;

    const shift =
      Math.round(el.clientWidth * 0.85) * (direction === "right" ? 1 : -1);
    animate(el.scrollLeft, el.scrollLeft + shift, {
      duration: 0.2,
      ease: "easeInOut",
      onUpdate: (latest) => {
        el.scrollLeft = latest;
      },
    });
  };

  // Keyboard navigation
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onKey = (e) => {
      if (document.activeElement !== el) return;
      if (e.key === "ArrowLeft") handleScroll("left");
      if (e.key === "ArrowRight") handleScroll("right");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.04 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-center text-2xl font-semibold text-emerald">
          {title}
        </h3>
        {seeMoreHref && (
          <a
            href={seeMoreHref}
            className="text-sm text-emerald hover:underline"
          >
            See more
          </a>
        )}
      </div>

      <div className="relative">
        {/* Auto-Hide Buttons - Only show if more than 4 products */}
        {products.length > 4 && (
          <>
            {/* Left Arrow */}
            <motion.button
              aria-label={`Scroll ${title} left`}
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full shadow-md
  bg-beige hover:bg-beige/80 hover:scale-105 focus:ring-2 focus:ring-emerald-600 focus:outline-none
  transition-opacity duration-300 ${
    canScrollLeft ? "opacity-100" : "opacity-40 pointer-events-none"
  }`}
            >
              <ChevronLeft className="w-5 h-5 text-emerald" />
            </motion.button>

            {/* Right Arrow */}
            <motion.button
              aria-label={`Scroll ${title} right`}
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full shadow-md
  bg-beige hover:bg-beige/80 hover:scale-105 focus:ring-2 focus:ring-emerald-600 focus:outline-none
  transition-opacity duration-300 ${
    canScrollRight ? "opacity-100" : "opacity-40 pointer-events-none"
  }`}
            >
              <ChevronRight className="w-5 h-5 text-emerald" />
            </motion.button>
          </>
        )}

        {/* Gradient Overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#F9F9F9]/50 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#F9F9F9]/50 to-transparent z-10" />

        {/* Scrollable Area */}
        <div
          ref={scrollerRef}
          tabIndex={0}
          role="list"
          aria-label={`${title} product list`}
          className="no-scrollbar flex gap-4 overflow-x-auto px-6 py-3 scroll-smooth"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <motion.div
            className="flex gap-4"
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            {products.map((p) => (
              <motion.div
                key={p._id}
                variants={itemVariants}
                className="flex-shrink-0 w-[220px] sm:w-[240px] md:w-[260px] lg:w-[280px]"
                role="listitem"
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductRow;
