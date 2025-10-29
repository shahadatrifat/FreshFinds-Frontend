import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { FaRegCircleUser, FaStore } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { BadgeInfo, User, ChevronDown, Sparkles, Crown, Store, UserCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import { getUserProfile } from "../../../Services/productService";
import toast from "react-hot-toast";

const UserDropdown = ({ handleSignout }) => {
  const { user } = useAuth();

  // Fetch profile from backend using React Query
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userProfile", user?.uid],
    queryFn: () => getUserProfile(user.uid),
    enabled: !!user?.uid,
    staleTime: 5 * 60 * 1000,
  });

  if (error) {
    toast.error("Error fetching user profile.");
  }

  // Role badge colors
  const getRoleBadge = (role) => {
    const badges = {
      admin: { bg: "bg-purple-500", text: "Admin", Icon: Crown },
      vendor: { bg: "bg-emerald-600", text: "Vendor", Icon: Store },
      user: { bg: "bg-blue-500", text: "User", Icon: UserCircle }
    };
    return badges[role?.toLowerCase()] || badges.user;
  };

  const roleBadge = getRoleBadge(profile?.role);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 p-1 rounded-full hover:bg-white/10 transition-colors focus:outline-none group"
          aria-haspopup="true"
          aria-expanded={user ? "true" : "false"}
          aria-label="User Menu"
        >
          <div className="relative">
            {profile?.photoURL ? (
              <img
                src={profile?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                alt="User Avatar"
                className="w-10 h-10 border-2 border-beige rounded-full object-cover ring-2 ring-transparent group-hover:ring-white/30 transition-all"
              />
            ) : (
              <div className="w-10 h-10 bg-beige rounded-full flex items-center justify-center border-2 border-white/20">
                <FaRegCircleUser size={24} className="text-emerald-700" />
              </div>
            )}
            {/* Online indicator */}
            {user && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-emerald-700 animate-pulse" />
            )}
          </div>
          <ChevronDown className="w-4 h-4 text-beige group-hover:text-white transition-colors hidden sm:block" />
        </motion.button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-72 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 shadow-2xl rounded-xl border border-emerald-500/50 z-50 p-0 overflow-hidden"
      >
        {user ? (
          <>
            {/* User Info Header */}
            <DropdownMenuLabel className="p-0">
              <div className="relative p-4 bg-gradient-to-r from-emerald-600 via-emerald-700/50 to-transparent">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
                
                <div className="relative flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    <img
                      src={profile?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                      alt="User Avatar"
                      className="w-12 h-12 rounded-full border-3 border-white/30 object-cover shadow-lg"
                    />
                    {/* Role badge on avatar */}
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 ${roleBadge.bg} rounded-full flex items-center justify-center border-2 border-emerald-700 shadow-md`}>
                      <roleBadge.Icon className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-white truncate">
                        {profile?.displayName || "User"}
                      </p>
                      {profile?.role === "admin" && (
                        <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                      )}
                    </div>
                    <p className="text-xs text-beige/80 truncate">
                      {profile?.email}
                    </p>
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/10 backdrop-blur-sm rounded-full">
                      <User size={12} className="text-beige/80" />
                      <span className="text-xs font-medium text-beige capitalize">
                        {roleBadge.text}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="bg-white/10 my-0" />

            {/* Menu Items */}
            <div className="p-2 space-y-1">
              <DropdownMenuItem asChild>
                <Link
                  to="/profile"
                  className="px-4 py-2.5 flex items-center gap-3 text-beige hover:!bg-white/10 focus:!bg-white/10 rounded-lg transition-all duration-200 cursor-pointer group"
                >
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <FaRegCircleUser className="text-beige" size={18} />
                  </div>
                  <span className="font-medium">My Profile</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  to="/dashboard"
                  className="px-4 py-2.5 flex items-center gap-3 text-beige hover:!bg-white/10 focus:!bg-white/10 rounded-lg transition-all duration-200 cursor-pointer group"
                >
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <RiDashboardHorizontalLine className="text-beige" size={18} />
                  </div>
                  <span className="font-medium">Dashboard</span>
                </Link>
              </DropdownMenuItem>

              {profile?.role !== "vendor" && (
                <DropdownMenuItem asChild>
                  <Link
                    to="/apply-vendor"
                    className="px-4 py-2.5 flex items-center gap-3 text-beige hover:!bg-white/10 focus:!bg-white/10 rounded-lg transition-all duration-200 cursor-pointer group"
                  >
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <FaStore className="text-beige" size={18} />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium">Become a Vendor</span>
                      <p className="text-xs text-beige/70">Start selling today</p>
                    </div>
                  </Link>
                </DropdownMenuItem>
              )}
            </div>

            <DropdownMenuSeparator className="bg-white/10 my-2" />

            {/* Sign Out */}
            <div className="p-2">
              <DropdownMenuItem
                onClick={handleSignout}
                className="px-4 py-2.5 flex items-center gap-3 text-red-300 hover:!bg-red-500/20 focus:!bg-red-500/20 rounded-lg transition-all duration-200 cursor-pointer group"
              >
                <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
                  <IoLogOutOutline className="text-red-300" size={20} />
                </div>
                <span className="font-medium">Sign Out</span>
              </DropdownMenuItem>
            </div>
          </>
        ) : (
          <div className="p-2">
            <DropdownMenuItem asChild>
              <Link
                to="/signup"
                className="px-4 py-3 flex items-center gap-3 text-beige hover:!bg-white/10 focus:!bg-white/10 rounded-lg transition-all duration-200 cursor-pointer group"
              >
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <BadgeInfo className="h-5 w-5 text-beige" />
                </div>
                <div>
                  <p className="font-semibold">Sign In to Get Started</p>
                  <p className="text-xs text-beige/70">Access your account</p>
                </div>
              </Link>
            </DropdownMenuItem>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;