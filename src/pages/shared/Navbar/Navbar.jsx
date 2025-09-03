import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "../Logo/Logo";
import { Menu, X } from "lucide-react";
import useAuth from "../../../Hooks/useAuth";
import CartLoaderFull from "../loaders/CartLoaderFull";
import UserDropdown from "./UserDropDown";
import NavLinksList from "./NavLinkList";

const Navbar = () => {
  const { user, SignOutUser, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const firstNavLink = useRef(null);

  // Navigation Links
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "All Products" },
    { to: "/markets", label: "Markets" },
    { to: "/offers", label: "Offers" },
    { to: "/cart", label: "Cart" },
    { to: "/support", label: "Support" },
    { to: "/about", label: "About" },
    !user && { to: "/signup", label: "Sign In/Sign Up" },
  ].filter(Boolean);

  // Handlers
  const handleSignout = () => {
    SignOutUser();
    setIsMobileMenuOpen(false);
  };
  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  useEffect(() => {
    if (isMobileMenuOpen && firstNavLink.current) firstNavLink.current.focus();
  }, [isMobileMenuOpen]);

  if (loading) return <CartLoaderFull />;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-beige w-full sticky top-0 z-50"
    >
      <div className="mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center text-charcoal text-xl font-montserrat space-x-7">
          <NavLinksList navLinks={navLinks} firstNavLink={firstNavLink} onClick={() => {}} />
          <UserDropdown user={user} handleSignout={handleSignout} />
        </div>

        {/* Mobile Section */}
        <div className="md:hidden flex items-center space-x-4">
          <UserDropdown user={user} handleSignout={handleSignout} />
          <button
            id="mobile-menu-button"
            className="text-charcoal hover:text-emerald"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
            className="md:hidden overflow-hidden"
          >
            <div className="px-6 flex flex-col py-4 space-y-4">
              <NavLinksList navLinks={navLinks} firstNavLink={firstNavLink} onClick={() => setIsMobileMenuOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
