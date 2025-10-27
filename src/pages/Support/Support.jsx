import React, { useState } from "react";
import { motion } from "framer-motion";
import heroImg from "../../assets/support.jpg"; 
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  Clock,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  Sparkles
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const faqData = [
  {
    question: "How can I place an order?",
    answer:
      "Browse our products, add items to your cart, and proceed to checkout. We accept all major payment methods and offer secure payment processing.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Visa, Mastercard, American Express, PayPal, and other major payment methods. All transactions are encrypted and secure.",
  },
  {
    question: "Can I request a custom product?",
    answer:
      "Yes! Contact our support team with your requirements and we'll connect you with vendors who can fulfill custom orders.",
  },
  {
    question: "What is the return policy?",
    answer:
      "We offer returns within 7 days of delivery for eligible products. Items must be unused and in original packaging. Contact support to initiate a return.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Standard delivery takes 2-3 business days. Express delivery (1 day) is available for select items. Free delivery on orders over $50.",
  },
  {
    question: "How do I become a vendor?",
    answer:
      "Visit our 'Become a Vendor' page and submit an application. Our team will review it within 3-5 business days and contact you with next steps.",
  },
];

const contactMethods = [
  {
    icon: Mail,
    title: "Email Support",
    value: "support@freshfinds.com",
    description: "Get response within 24 hours",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: Phone,
    title: "Phone Support",
    value: "+880 1912474746",
    description: "Mon-Fri, 9AM-6PM",
    color: "from-emerald-500 to-emerald-600"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: "123 Market Street, City",
    description: "Come say hello!",
    color: "from-purple-500 to-purple-600"
  }
];

const Support = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      return toast.error("Please fill in all required fields");
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      toast.success("Message sent successfully! We'll get back to you soon.", {
        duration: 4000,
        icon: '✅',
      });
      
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error("Oops! Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-offwhite min-h-screen">
      <Toaster position="top-center" />
      
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        {/* Background Image */}
        <img 
          src={heroImg}
          alt="Support Hero" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-900/30 rounded-full blur-3xl" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6"
          >
            <HelpCircle className="w-10 h-10 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-lora text-beige font-bold"
          >
            How Can We Help?
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-lg sm:text-xl text-offwhite max-w-2xl"
          >
            Our support team is here for you 24/7. Get quick answers or reach out directly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-full"
          >
            <Clock className="w-5 h-5 text-white" />
            <span className="text-white text-sm">Average response time: Under 2 hours</span>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="container mx-auto px-4 sm:px-6 md:px-8 -mt-16 relative z-20 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow  transition-shadow"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center mb-4`}>
                <method.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-2">{method.title}</h3>
              <p className="text-emerald-600 font-semibold mb-1">{method.value}</p>
              <p className="text-sm text-gray-600">{method.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="container mx-auto px-4 sm:px-6 md:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
              <MessageCircle className="w-4 h-4" />
              <span>Quick Response Guaranteed</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-700 font-lora">
              Send Us a Message
            </h2>
            
            <p className="text-gray-700 text-lg leading-relaxed">
              Have questions or feedback? Our dedicated support team is ready to assist you. 
              Fill out the form and we'll get back to you as soon as possible.
            </p>

            {/* Features */}
            <div className="space-y-4 pt-6">
              {[
                "Response within 24 hours",
                "Dedicated support specialists",
                "Multiple language support",
                "Order tracking assistance"
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* Trust Badge */}
            <div className="mt-8 p-6 bg-gradient-to-br from-emerald-50 to-mint/30 rounded-xl border border-emerald-200">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-charcoal mb-1">Premium Support</h4>
                  <p className="text-sm text-gray-600">
                    Join 10,000+ satisfied customers who trust our support team.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
            className="bg-white p-8 md:p-10 rounded-2xl shadow space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                placeholder="How can we help?"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Your Message *
              </label>
              <textarea
                name="message"
                placeholder="Tell us more about your inquiry..."
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none resize-none"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-4 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-5 h-5" />
                </>
              )}
            </motion.button>

            <p className="text-xs text-gray-500 text-center mt-4">
              We typically respond within 24 hours. For urgent matters, please call us.
            </p>
          </motion.form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gradient-to-b from-beige/30 via-white to-beige/20 py-20 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <HelpCircle className="w-4 h-4" />
              <span>Common Questions</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-700 font-lora mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-lg">
              Quick answers to questions you may have
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqData.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-white rounded-xl shadow transition-shadow overflow-hidden border border-gray-100"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center text-charcoal font-semibold focus:outline-none group"
                >
                  <span className="text-lg pr-4">{faq.question}</span>
                  <ChevronDown 
                    className={`w-6 h-6 text-emerald-600 transition-transform flex-shrink-0 ${
                      activeFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: activeFaq === idx ? "auto" : 0,
                    opacity: activeFaq === idx ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 pt-2 border-t border-gray-100 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center p-6 bg-gradient-to-br from-emerald-50 to-mint/30 rounded-xl border border-emerald-200"
          >
            <p className="text-gray-700 mb-4">
              Still have questions? We're here to help!
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Contact Support</span>
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Support;