import React from "react";
import leaf from "../../../assets/—Pngtree—green vegetable cabbage_5638735.png";
import "../../../index.css";
const Logo = () => {
  return (
    <div className="relative flex flex-col items-center justify-end w-42  h-24 overflow-hidden">
      {/* Image on top */}
      <img
        src={leaf}
        alt="leaf"
        className="absolute -top-3  w-full object-contain"
      />
      {/* Text at bottom with fade-out background */}
      <h1
        className="relative z-10 text-center text-3xl font-bold px-4 mb-6 rounded"
        style={{
          backgroundImage:
            "linear-gradient(to left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%)",
        }}
      >
        <span className=" font-lora text-gold">Fresh</span>
        <span className="font-[playfair_display] text-charcoal">Finds</span>
      </h1>
    </div>
  );
};

export default Logo;
