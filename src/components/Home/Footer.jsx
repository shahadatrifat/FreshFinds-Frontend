import React from 'react';
import { Link } from 'react-router';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa'; // Social Media Icons
import Logo from '../../pages/shared/Logo/Logo';
import { Fade } from 'react-awesome-reveal';

const Footer = () => (
  <Fade>
    <footer className="bg-emerald-700 text-beige ">
    <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-start gap-8">
      {/* Brand Section */}
      <div className="flex flex-col items-start">
        <Logo></Logo>
        <p className="mt-2 text-sm max-w-xs text-beige">Local produce & artisanal groceries — fresh every day.</p>
        <div className="flex gap-6 mt-4">
          {/* Social Media Icons */}
          <a href="#" className="text-beige hover:text-emerald-400">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="text-beige hover:text-emerald-400">
            <FaInstagram size={24} />
          </a>
          <a href="#" className="text-beige hover:text-emerald-400">
            <FaTwitter size={24} />
          </a>
          <a href="#" className="text-beige hover:text-emerald-400">
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>

      {/* Shop and Company Links */}
      <div className="flex flex-wrap gap-16 md:gap-8">
        {/* Shop Section */}
        <div>
          <h5 className="font-semibold text-lg text-beige">Shop</h5>
          <ul className="mt-2 text-sm space-y-2">
            <li><Link to="/products" className="hover:text-emerald-400">All Products</Link></li>
            <li><Link to="/offers" className="hover:text-emerald-400">Offers</Link></li>
            <li><Link to="/categories" className="hover:text-emerald-400">Categories</Link></li>
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h5 className="font-semibold text-lg text-beige">Company</h5>
          <ul className="mt-2 text-sm space-y-2">
            <li><Link to="/about" className="hover:text-emerald-400">About</Link></li>
            <li><Link to="/support" className="hover:text-emerald-400">Support</Link></li>
            <li><Link to="/terms" className="hover:text-emerald-400">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-emerald-400">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h5 className="font-semibold text-lg text-beige">Contact</h5>
          <ul className="mt-2 text-sm space-y-2">
            <li><span className="text-beige">info@freshfinds.com</span></li>
            <li><span className="text-beige">+1 234 567 890</span></li>
            <li><span className="text-beige">123 Market Street, City</span></li>
          </ul>
        </div>
      </div>
    </div>

    {/* Footer Bottom Section */}
    <div className="bg-emerald-800 py-4 text-center text-sm text-beige">
      <p>&copy; {new Date().getFullYear()} FreshFinds. All rights reserved.</p>
    </div>
  </footer>
  </Fade>
);

export default Footer;
