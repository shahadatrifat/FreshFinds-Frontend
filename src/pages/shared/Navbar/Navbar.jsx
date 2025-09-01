import { NavLink } from "react-router"; // Correct import for NavLink
import { useState } from "react";
import { motion } from "framer-motion";
import Logo from "../Logo/Logo";
import "../../../index.css";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../components/ui/tooltip";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Define your navigation links here
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "All Products" },
    { to: "/markets", label: "Markets" },
    { to: "/offers", label: "Offers" },
    { to: "/signup", label: "Login/Signup" },
    { to: "/cart", label: "Cart" },
  ];

  // Conditionally add more links (example: show Admin link if admin)
  //   const isAdmin = true;
  //   if (isAdmin) {
  //     navLinks.push({ to: '/admin', label: 'Admin Dashboard' });
  //   }

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-offwhite w-full sticky top-0 z-99"
    >
      <div className="mx-auto px-6 flex items-center justify-between">
        {/* Logo Section */}
        <div className="text-emerald text-3xl">
          <NavLink to="/">
            <Logo />
          </NavLink>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex mt-3 items-center text-charcoal text-xl font-montserrat space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-semibold ${
                  isActive ? "text-emerald" : "text-charcoal hover:text-emerald"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            className="text-charcoal hover:text-emerald"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMobileMenuOpen ? "true" : "false"}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <Tooltip>
                <TooltipTrigger>
                  <X aria-hidden="true" />
                </TooltipTrigger>
                <TooltipContent>Close Menu</TooltipContent>
              </Tooltip>
            ) : (
              <Tooltip>
                <TooltipTrigger>
                  <Menu aria-hidden="true" />
                </TooltipTrigger>
                <TooltipContent>Open Menu</TooltipContent>
              </Tooltip>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, translateX: -20 }} // Start off from the left side
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          translateX: isMobileMenuOpen ? 0 : -20, // Slide in/out horizontally
        }}
        transition={{ duration: 0.3 }}
        className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
      >
        <div className="px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to + link.label}
              to={link.to}
              className={({ isActive }) =>
                `block text-charcoal hover:text-emerald ${
                  isActive ? "text-emerald" : ""
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
