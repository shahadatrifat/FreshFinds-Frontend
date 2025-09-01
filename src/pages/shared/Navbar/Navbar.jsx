import { Link, NavLink } from "react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "../Logo/Logo";
import "../../../index.css";
import { Menu, User } from "lucide-react";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import useAuth from "../../../Hooks/useAuth";
import clsx from "clsx";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); 
  const userMenuRef = useRef(null); 

  const { user, signOutUser } = useAuth(); 

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "All Products" },
    { to: "/markets", label: "Markets" },
    { to: "/offers", label: "Offers" },
    { to: "/signup", label: "Login/Signup" },
    { to: "/cart", label: "Cart" },
  ];

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  // Toggle user menu visibility when clicking avatar
  const toggleUserMenu = () => {
    setIsUserMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    // Close user menu if clicked outside
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-beige w-full sticky top-0 z-50 "
    >
      <div className="mx-auto px-6  flex items-center justify-between">
        
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
                clsx("font-lora transition-all duration-300 ease-in-out", {
                  "text-emerald border-b-2 border-emerald": isActive,
                  "text-charcoal hover:text-emerald border-b-2 border-transparent":
                    !isActive,
                })
              }
              aria-current="page"
            >
              {link.label}
            </NavLink>
          ))}
          {/* User Avatar */}
          {user && (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={toggleUserMenu} // Toggle user menu on avatar click
                className="flex items-center gap-2 focus:outline-none"
              >
                {user.photoURL ? (
                  <img
                    src={user?.photoURL}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full object-cover border border-gray-300"
                  />
                ) : (
                  <User className="w-6 h-6 text-charcoal" />
                )}
              </button>
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-60 bg-white dark:bg-gray-900 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 z-50"
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            user.photoURL ||
                            "https://i.ibb.co/4pDNDk1/avatar.png"
                          }
                          alt="avatar"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-semibold dark:text-white">
                            {user.displayName || "No Name"}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    <ul className="p-2 text-sm dark:text-white">
                      <li>
                        <Link
                          to="/profile"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded"
                        >
                          <FaRegCircleUser size={20} />
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded"
                        >
                          <RiDashboardHorizontalLine size={20} /> Dashboard
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => signOutUser()} // Call sign out on button click
                          className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded"
                        >
                          <IoLogOutOutline size={20} /> Logout
                        </button>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex  items-center space-x-4">
          {user && (
            <div className="relative mb-1" ref={userMenuRef}>
              <button
                onClick={toggleUserMenu} 
                className="flex items-center gap-2 focus:outline-none"
              >
                {user.photoURL ? (
                  <img
                    src={user?.photoURL}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover border border-emerald"
                  />
                ) : (
                  <User className="w-10 h-10 text-charcoal" />
                )}
              </button>
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-60 bg-beige dark:bg-gray-900 shadow-lg rounded-lg border border-offwhite z-50"
                  >
                    <div className="p-4 border-b  rounded-t-lg ">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            user.photoURL ||
                            "https://i.ibb.co/4pDNDk1/avatar.png"
                          }
                          alt="avatar"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-semibold ">
                            {user.displayName || "No Name"}
                          </p>
                          <p className="text-xs text-charcoal ">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    <ul className="p-2 text-sm ">
                      <li>
                        <Link
                          to="/profile"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded"
                        >
                          <FaRegCircleUser className="text-emerald" size={20} />
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded"
                        >
                          <RiDashboardHorizontalLine className="text-emerald" size={20} /> Dashboard
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => signOutUser()} // Call sign out on button click
                          className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded"
                        >
                          <IoLogOutOutline className="text-emerald" size={20} /> Logout
                        </button>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
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
