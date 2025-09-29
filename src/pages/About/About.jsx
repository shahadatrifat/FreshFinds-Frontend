import React from "react";
import { motion } from "framer-motion";
import heroImg from "../../assets/hero2.jpg"; // Hero image
import teamImg from "../../assets/huge_avatar.png"; // Team image
import missionImg from "../../assets/team.jpg"; // Mission image

const About = () => {
  return (
    <div className="bg-offwhite">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[90vh] overflow-hidden">
        <img
          src={heroImg}
          alt="About Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-beige font-bold drop-shadow-lg">
            Our Story
          </h1>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl text-beige drop-shadow-md max-w-2xl">
            Crafting excellence in every product, with elegance and quality
            that defines us.
          </p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto py-20 px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-600 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            We aim to deliver the finest products with a blend of modern
            luxury and timeless craftsmanship. Every piece is carefully
            curated to bring satisfaction and elegance to our customers.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={missionImg}
            alt="Our Mission"
            className="w-full h-80 md:h-[400px] object-cover rounded-xl shadow-lg"
          />
        </motion.div>
      </section>

      {/* Core Values Section */}
      <section className="bg-beige py-20 px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-emerald-600 mb-12">
          Our Core Values
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Quality",
              description:
                "Every product is crafted with the highest quality standards.",
            },
            {
              title: "Elegance",
              description:
                "We focus on aesthetics that make our brand feel luxurious.",
            },
            {
              title: "Customer First",
              description:
                "Your satisfaction is our top priority, always.",
            },
          ].map((value) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl p-6 shadow-lg text-center"
            >
              <h3 className="text-xl font-semibold text-emerald-600 mb-2">
                {value.title}
              </h3>
              <p className="text-gray-700">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto py-20 px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-emerald-600 mb-12 text-center">
          Meet the Team
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-beige rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform"
            >
              <img
                src={teamImg}
                alt={`Team member ${i}`}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="font-semibold text-xl text-emerald-600 mb-1">
                  John Doe
                </h3>
                <p className="text-gray-700">Head of Operations</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
