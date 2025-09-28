import React from "react";
import { Link } from "react-router";
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
import { BadgeInfo } from "lucide-react";
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
    enabled: !!user?.uid, // only fetch if user exists
    staleTime: 5 * 60 * 1000, // optional caching
  });

  if (error) {
    toast.error("Error fetching user profile.");
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 focus:outline-none"
          aria-haspopup="true"
          aria-expanded={user ? "true" : "false"}
          aria-label="User Menu"
        >
          {profile?.photoURL ? (
            <img
              src={profile?.photoURL || "/path/to/placeholder-avatar.svg"}
              alt="User Avatar"
              className="w-10 h-10 border-2 border-beige rounded-full object-cover"
            />
          ) : (
            <FaRegCircleUser size={24} className="text-charcoal rounded-full" />
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-60 bg-gradient-to-r from-emerald-500 to-emerald-700 shadow-xl rounded-lg border- z-50"
      >
        {user ? (
          <>
            <DropdownMenuLabel className="p-4  rounded-t-lg">
              <div className="flex items-center gap-3">
                <img
                  src={
                    profile?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border-2 border-beige object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-beige">
                    {profile?.displayName || "No Name"}
                  </p>
                  <p className="text-xs text-beige">{profile?.email}</p>
                  <p className="text-xs text-beige capitalize">
                    {profile?.role}
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-emerald" />
            <DropdownMenuItem asChild>
              <Link
                to="/profile"
                className="px-4 py-2 flex mt-1 items-center gap-2 text-beige hover:!bg-emerald-600 focus:!bg-emerald-600 transition-all duration-200"
              >
                <FaRegCircleUser className="text-beige" size={20} /> My Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                to="/dashboard"
                className="px-4 py-2 flex items-center gap-2 text-beige hover:!bg-emerald-600 focus:!bg-emerald-600 transition-all duration-200"
              >
                <RiDashboardHorizontalLine className="text-beige" size={20} />{" "}
                Dashboard
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                to="/apply-vendor"
                className="px-4 py-2 flex items-center gap-2 text-beige hover:!bg-emerald-600 focus:!bg-emerald-600 transition-all duration-200"
              >
                <FaStore className="text-beige" size={25} /> Be a Vendor
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-emerald" />

            <DropdownMenuItem
              onClick={handleSignout}
              className="px-4 py-2 flex items-center gap-2 text-beige hover:!bg-emerald-600 focus:!bg-emerald-600 transition-all duration-200"
            >
              <IoLogOutOutline className="text-beige" size={24} /> Sign Out
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem asChild>
            <Link
              to="/signup"
              className="px-4 py-2 flex items-center gap-2 text-beige hover:!bg-emerald-600 focus:!bg-emerald-600 transition-all duration-200"
            >
              <BadgeInfo className="h-5 w-5 text-beige mt-[1px]" />
              Sign In to Get Started
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
