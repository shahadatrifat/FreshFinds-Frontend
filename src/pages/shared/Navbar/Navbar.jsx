import { NavLink } from "react-router";
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Logo from "../Logo/Logo";
import "../../../index.css";
import { Menu, X, LogOut } from "lucide-react"; 
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import useAuth from "../../../Hooks/useAuth";
import clsx from "clsx";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOutUser } = useAuth();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "All Products" },
    { to: "/markets", label: "Markets" },
    { to: "/offers", label: "Offers" },
    { to: "/cart", label: "Cart" },
  ];

  if (!user) {
    navLinks.push({ to: "/signup", label: "Login/Signup" }); 
  } else {
    navLinks.push({ to: "/logout", label: "Logout", onClick: signOutUser }); 
  }

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
              onClick={link.onClick} // Ensure the logout works
              className={({ isActive }) =>
                clsx("font-lora transition-all duration-300 ease-in-out", {
                  "text-emerald border-b-2 border-emerald-600": isActive,
                  "text-charcoal hover:text-emerald border-b-2 border-transparent":
                    !isActive,
                })
              }
              aria-current="page"
            >
              {link.label}
              {link.label === "Logout" && <LogOut className="ml-2 inline" />} {/* Add LogOut Icon */}
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
        initial={{ opacity: 0, translateX: -20 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          translateX: isMobileMenuOpen ? 0 : -20,
        }}
        transition={{ duration: 0.3 }}
        className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
      >
        <div className="px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to + link.label}
              to={link.to}
              onClick={link.onClick} // Ensure logout works in mobile menu
              className={({ isActive }) =>
                `block text-charcoal hover:text-emerald ${
                  isActive ? "text-emerald" : ""
                }`
              }
            >
              {link.label}
              {link.label === "Logout" && <LogOut className="ml-2 inline" />} {/* Add LogOut Icon */}
            </NavLink>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
