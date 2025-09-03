import { Link, NavLink } from "react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "../Logo/Logo";
import { Menu, X } from "lucide-react";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import useAuth from "../../../Hooks/useAuth";
import clsx from "clsx";
import useDropdown from "../../../Hooks/useDropdown";

const Navbar = () => {
  const { user, SignOutUser } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const firstNavLink = useRef(null);

  // User Dropdown using useDropdown
  const {
    isOpen: isUserMenuOpen,
    toggle: toggleUserMenu,
    menuRef: userMenuRef,
    buttonRef: userButtonRef,
    close: closeUserMenu,
  } = useDropdown();

  // Navigation Links
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "All Products" },
    { to: "/markets", label: "Markets" },
    { to: "/offers", label: "Offers" },
    { to: "/cart", label: "Cart" },
    !user && { to: "/signup", label: "Login / Signup" },
  ].filter(Boolean);

  // Event Handlers
  const handleSignout = () => {
    SignOutUser();
    closeUserMenu();
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  useEffect(() => {
    if (isMobileMenuOpen && firstNavLink.current) firstNavLink.current.focus();
  }, [isMobileMenuOpen]);

  // Render User Menu
  const renderUserMenu = () => (
    <AnimatePresence>
      {isUserMenuOpen && (
        <motion.div
          ref={userMenuRef}
          role="menu"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 mt-2 w-60 bg-beige shadow-lg rounded-lg border border-offwhite z-50"
          onClick={(e) => e.stopPropagation()}
        >
          {/* User Info */}
          <div className="p-4 border-b rounded-t-lg">
            <div className="flex items-center gap-3">
              <img
                src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold">
                  {user?.displayName || "No Name"}
                </p>
                <p className="text-xs text-charcoal">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <ul className="p-2 text-sm">
            <li>
              <Link
                to="/profile"
                onClick={closeUserMenu}
                className="block px-4 py-2 flex items-center gap-2 hover:bg-gray-100 rounded"
              >
                <FaRegCircleUser className="text-emerald" size={20} />
                My Profile
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                onClick={closeUserMenu}
                className="block px-4 py-2 flex items-center gap-2 hover:bg-gray-100 rounded"
              >
                <RiDashboardHorizontalLine className="text-emerald" size={20} />
                Dashboard
              </Link>
            </li>
            <li>
              <button
                onClick={handleSignout}
                className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-100 rounded"
              >
                <IoLogOutOutline className="text-emerald" size={20} />
                Logout
              </button>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-beige w-full sticky top-0 z-50"
    >
      <div className="mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="text-emerald text-3xl">
          <NavLink to="/">
            <Logo />
          </NavLink>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex mt-3 items-center text-charcoal text-xl font-montserrat space-x-8">
          {navLinks.map((link, index) => (
            <NavLink
              key={link.to}
              to={link.to}
              ref={index === 0 ? firstNavLink : null}
              className={({ isActive }) =>
                clsx("font-lora transition-all duration-300 ease-in-out", {
                  "text-emerald border-b-2 border-emerald-600": isActive,
                  "text-charcoal hover:text-emerald border-b-2 border-transparent":
                    !isActive,
                })
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* User Avatar / Default Icon */}
          <div className="relative mb-1">
            <button
              ref={userButtonRef}
              onClick={toggleUserMenu}
              className="flex items-center gap-2 focus:outline-none"
              aria-haspopup="true"
              aria-expanded={isUserMenuOpen}
            >
              {user && user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover border border-emerald"
                />
              ) : (
                <FaRegCircleUser
                  size={30}
                  className=" rounded-full object-cover text-emerald"
                />
              )}
            </button>
            {renderUserMenu()}
          </div>
        </div>

        {/* Mobile Section */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Avatar */}
          {user && (
            <div className="relative mb-1">
              <button
                ref={userButtonRef}
                onClick={toggleUserMenu}
                className="flex items-center gap-2 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isUserMenuOpen}
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover border border-emerald"
                  />
                ) : (
                  <FaRegCircleUser className="w-10 h-10 rounded-full object-cover border border-emerald" />
                )}
              </button>
              {renderUserMenu()}
            </div>
          )}

          {/* Hamburger */}
          <button
            id="mobile-menu-button"
            className="text-charcoal hover:text-emerald"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMobileMenuOpen}
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
        id="mobile-menu"
        initial={{ opacity: 0, translateY: -20 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          translateY: isMobileMenuOpen ? 0 : -20,
        }}
        transition={{ duration: 0.5 }}
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 mt-4 py-4 space-y-4">
          {navLinks.map((link, index) => (
            <NavLink
              key={link.to + link.label}
              ref={index === 0 ? firstNavLink : null}
              to={link.to}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block text-charcoal hover:text-emerald ${
                  isActive ? "text-emerald" : "text-charcoal"
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
