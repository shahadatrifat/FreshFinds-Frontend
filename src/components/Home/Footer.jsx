import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Mail, Phone, MapPin, Send, Heart } from 'lucide-react';
import Logo from '../../pages/shared/Logo/Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'All Products', path: '/products' },
      { name: 'Categories', path: '/products' },
      { name: 'Special Offers', path: '/products' },
      { name: 'New Arrivals', path: '/products' },
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Support', path: '/support' },
      { name: 'Become a Vendor', path: '/apply-vendor' },
      { name: 'Contact', path: '/support' },
    ],
    legal: [
      { name: 'Terms & Conditions', path: '/terms' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Cookie Policy', path: '/privacy' },
      { name: 'Refund Policy', path: '/support' },
    ],
  };

  const socialLinks = [
    { icon: FaFacebook, href: '#', label: 'Facebook' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gradient-to-b from-emerald-700 to-emerald-800 text-beige">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Logo />
            <p className="mt-4 text-beige/90 text-sm leading-relaxed max-w-sm">
              Your trusted source for fresh, local, and organic groceries. 
              Connecting you with quality vendors and artisanal products since 2024.
            </p>

            {/* Social Media */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-white/10 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-beige" />
                </motion.a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-sm font-medium mb-3">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-beige placeholder-beige/60 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button className="p-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors">
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Shop Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h5 className="font-bold text-lg text-white mb-4">Shop</h5>
            <ul className="space-y-2">
              {footerLinks.shop.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-beige/80 hover:text-white text-sm transition-colors inline-block hover:translate-x-1 duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h5 className="font-bold text-lg text-white mb-4">Company</h5>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-beige/80 hover:text-white text-sm transition-colors inline-block hover:translate-x-1 duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h5 className="font-bold text-lg text-white mb-4">Legal</h5>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-beige/80 hover:text-white text-sm transition-colors inline-block hover:translate-x-1 duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <h5 className="font-bold text-sm text-white mb-3">Contact</h5>
              <div className="flex items-center gap-2 text-beige/80 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@freshfinds.com</span>
              </div>
              <div className="flex items-center gap-2 text-beige/80 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+1 234 567 890</span>
              </div>
              <div className="flex items-center gap-2 text-beige/80 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>123 Market St, City</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-beige/80 text-sm text-center md:text-left">
              © {currentYear} FreshFinds. All rights reserved.
            </p>

            {/* Made with love */}
            <p className="text-beige/80 text-sm flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-red-400 fill-current" /> for local communities
            </p>

            {/* Payment methods or badges */}
            <div className="flex items-center gap-4">
              <span className="text-beige/60 text-xs">Secure Payment</span>
              <div className="flex gap-2">
                <div className="w-8 h-6 bg-white/20 rounded flex items-center justify-center text-[10px] font-bold">
                  VISA
                </div>
                <div className="w-8 h-6 bg-white/20 rounded flex items-center justify-center text-[10px] font-bold">
                  MC
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;