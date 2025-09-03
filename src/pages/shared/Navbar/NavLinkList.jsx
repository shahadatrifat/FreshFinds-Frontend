import clsx from "clsx";
import { NavLink } from "react-router";
import { motion } from "framer-motion";

const NavLinksList = ({ navLinks = [], firstNavLink, onClick }) => (
  <>
    {navLinks.map((link, index) => (
      <motion.div
        key={link.to + link.label}
        className="relative"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <NavLink
          to={link.to}
          onClick={onClick}
          ref={index === 0 ? firstNavLink : null}
          className={({ isActive }) =>
            clsx("font-lora py-2 relative", {
              "text-emerald": isActive,
              "text-charcoal hover:text-emerald": !isActive,
            })
          }
          aria-current={({ isActive }) => (isActive ? "page" : undefined)}
        >
          {({ isActive }) => (
            <motion.span
              layout
              className="inline-block border-b-2"
              animate={{ borderColor: isActive ? "#2e8b57" : "transparent" }}
              transition={{ duration: 0.3 }}
            >
              {link.label}
            </motion.span>
          )}
        </NavLink>
      </motion.div>
    ))}
  </>
);

export default NavLinksList;
