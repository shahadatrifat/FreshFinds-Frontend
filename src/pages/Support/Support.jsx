// src/pages/Support.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import heroImg from "../../assets/support.jpg"; // replace with your image
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";

const faqData = [
  {
    question: "How can I place an order?",
    answer:
      "You can browse our products and add items to your cart. Once done, proceed to checkout and complete payment.",
  },
  {
    question: "Can I request a custom product?",
    answer:
      "Yes! Contact our support team with your requirements and we will guide you through the process.",
  },
  {
    question: "What is the return policy?",
    answer:
      "We offer returns within 7 days of delivery for eligible products. Please contact support for more details.",
  },
];

const Support = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect with API or email service
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-offwhite">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
        <img src={heroImg} alt="Support Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-beige font-bold drop-shadow-lg">
            Support
          </h1>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl text-beige drop-shadow-md max-w-2xl">
            We're here to help you with any inquiries or issues.
          </p>
        </motion.div>
      </section>

      {/* Contact Info + Form */}
      <section className="container mx-auto py-20 px-6 md:px-12 grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-600 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Have questions or feedback? Fill out the form or reach us through our contact info.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4 text-emerald-600">
              <HiOutlineMail className="w-6 h-6" />
              <span>support@freshfinds.com</span>
            </div>
            <div className="flex items-center gap-4 text-emerald-600">
              <HiOutlinePhone className="w-6 h-6" />
              <span>+880 1912474746</span>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onSubmit={handleSubmit}
          className="bg-beige p-8 rounded-xl shadow-lg space-y-4"
        >
          {submitted && (
            <p className="text-green-600 font-semibold">
              Your message has been sent!
            </p>
          )}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-emerald-600 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-emerald-600 focus:outline-none"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={5}
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-emerald-600 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-emerald-600 text-beige font-semibold px-6 py-3 rounded-md hover:bg-emerald-700 transition"
          >
            Send Message
          </button>
        </motion.form>
      </section>

      {/* FAQ Section */}
      <section className="bg-beige py-20 px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-emerald-600 mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {faqData.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-offwhite rounded-xl shadow-lg overflow-hidden"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full text-left px-6 py-4 flex justify-between items-center text-gray-700 font-semibold focus:outline-none"
              >
                <span>{faq.question}</span>
                <span>{activeFaq === idx ? "-" : "+"}</span>
              </button>
              {activeFaq === idx && (
                <div className="px-6 py-4 border-t border-gray-200 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Support;
