import { Link, useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "../Logo/Logo";
import { Menu, X } from "lucide-react";
import useAuth from "../../../Hooks/useAuth";
import CartLoaderFull from "../loaders/CartLoaderFull";
import UserDropdown from "./UserDropDown";
import NavLinksList from "./NavLinkList";
import axiosInstance from "../../../Hooks/useAxiosInstance";
import CartIcon from "../cart/CartIcon";

const Navbar = () => {
  const { user, SignOutUser, loading, setUser } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const firstNavLink = useRef(null);
  const navigate = useNavigate();

  // Navigation Links
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "All Products" },
    { to: "/support", label: "Support" },
    { to: "/about", label: "About" },
    !user && { to: "/signup", label: "Sign In/Sign Up" },
  ].filter(Boolean);

  // Sign out logic
  const handleSignout = async () => {
    try {
      await SignOutUser();
      const response = await axiosInstance.post("/api/v1/user/signout");
      console.log("Cookie cleared successfully:", response.data);

      setUser(null);
      setIsMobileMenuOpen(false);
      navigate("/signin");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("There was an issue logging out. Please try again.");
    }
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  useEffect(() => {
    if (isMobileMenuOpen && firstNavLink.current) firstNavLink.current.focus();
  }, [isMobileMenuOpen]);

  if (loading) return <CartLoaderFull />;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-emerald w-full sticky top-0 z-50"
    >
      <div className="mx-auto px-6 flex items-center justify-between lg:justify-between w-full">
        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            id="mobile-menu-button"
            className="text-charcoal hover:text-[#f5f5dc] transition duration-300 focus:outline-none focus:text-[#f5f5dc]"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Logo - Flexed to the start, will align left */}
        <Link to="/" className="flex ml-2 items-center space-x-3">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-7 flex-1 justify-center">
          <NavLinksList
            navLinks={navLinks}
            firstNavLink={firstNavLink}
            onClick={() => {}}
          />
        </div>

        <div className="hidden lg:flex items-center space-x-6">
          {/* Cart Icon */}
          <CartIcon />

          {/* User Dropdown */}
          <UserDropdown user={user} handleSignout={handleSignout} />
        </div>

        {/* Mobile Section */}
        <div className="lg:hidden flex items-center space-x-4 ml-auto">
          {/* Cart Icon */}
          <CartIcon />
          {/* User Dropdown */}
          <UserDropdown user={user} handleSignout={handleSignout} />
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="px-6 flex flex-col py-4 space-y-4">
              <NavLinksList
                navLinks={navLinks}
                firstNavLink={firstNavLink}
                onClick={() => setIsMobileMenuOpen(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
