import React from 'react';
import { Link } from 'react-router';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa'; // Social Media Icons
import Logo from '../../pages/shared/Logo/Logo';
import { Fade } from 'react-awesome-reveal';

const Footer = () => (
  <Fade>
    <footer className="bg-emerald-700 text-beige">
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
              <li>
                <Link to="/products" className="relative group">
                  <span className="text-beige group-hover:text-emerald-400 text-lg font-medium">
                    All Products
                  </span>
                  {/* Underline */}
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link to="/offers" className="relative group">
                  <span className="text-beige group-hover:text-emerald-400 text-lg font-medium">
                    Offers
                  </span>
                  {/* Underline */}
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link to="/categories" className="relative group">
                  <span className="text-beige group-hover:text-emerald-400 text-lg font-medium">
                    Categories
                  </span>
                  {/* Underline */}
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h5 className="font-semibold text-lg text-beige">Company</h5>
            <ul className="mt-2 text-sm space-y-2">
              <li>
                <Link to="/about" className="relative group">
                  <span className="text-beige group-hover:text-emerald-400 text-lg font-medium">
                    About
                  </span>
                  {/* Underline */}
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-[#f5f5dc] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link to="/support" className="relative group">
                  <span className="text-beige group-hover:text-emerald-400 text-lg font-medium">
                    Support
                  </span>
                  {/* Underline */}
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-[#f5f5dc] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="relative group">
                  <span className="text-beige group-hover:text-emerald-400 text-lg font-medium">
                    Terms & Conditions
                  </span>
                  {/* Underline */}
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-[#f5f5dc] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="relative group">
                  <span className="text-beige group-hover:text-emerald-400 text-lg font-medium">
                    Privacy Policy
                  </span>
                  {/* Underline */}
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-[#f5f5dc] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
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
