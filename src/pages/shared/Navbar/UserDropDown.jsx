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

const UserDropdown = ({ user, handleSignout }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button
        className="flex items-center gap-2 focus:outline-none"
        aria-haspopup="true"
        aria-expanded={user ? "true" : "false"}
        aria-label="User Menu"
      >
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="User Avatar"
            className="w-10  h-10 rounded-full object-cover border-2 border-beige hover:border-beige transition-all duration-300 ease-in-out hover:border-beige "
          />
        ) : (
          <FaRegCircleUser size={24} className="text-charcoal rounded-full" />
        )}
      </button>
    </DropdownMenuTrigger>

    {/* Dropdown Menu Content */}
    <DropdownMenuContent
      align="end"
      className="w-60 bg-gradient-to-r from-emerald-500 to-emerald-700 shadow-xl rounded-lg border border- z-50"
    >
      {user ? (
        <>
          <DropdownMenuLabel className="p-4 border-b border- rounded-t-lg">
            <div className="flex items-center gap-3">
              <img
                src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-beige">
                  {user.displayName || "No Name"}
                </p>
                <p className="text-xs text-beige">{user.email}</p>
              </div>
            </div>
          </DropdownMenuLabel>

          {/* User Menu Items */}
          <DropdownMenuItem asChild>
            <Link
              to="/profile"
              className="px-4 py-2 flex mt-1 items-center gap-2 text-beige transition-all duration-200 ease-in-out 
               hover:!bg-emerald-600 hover:text-beige focus:!bg-emerald-600"
            >
              <FaRegCircleUser className="text-beige" size={20} /> My Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              to="/dashboard"
              className="px-4 py-2 flex items-center gap-2 text-beige transition-all duration-200 ease-in-out 
               hover:!bg-emerald-600 hover:text-beige focus:!bg-emerald-600"
            >
              <RiDashboardHorizontalLine className="text-beige" size={20} />{" "}
              Dashboard
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              to="/apply-vendor"
              className="px-4 py-2 flex items-center gap-2 text-beige transition-all duration-200 ease-in-out 
               hover:!bg-emerald-600 hover:text-beige focus:!bg-emerald-600"
            >
              <FaStore className="text-beige" size={25} /> Be a Vendor
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-emerald" />

          <DropdownMenuItem
            onClick={handleSignout}
            className="px-4 py-2 flex items-center gap-2 text-beige transition-all duration-200 ease-in-out 
               hover:!bg-emerald-600 hover:text-beige focus:!bg-emerald-600"
          >
            <IoLogOutOutline className="text-beige" size={24} /> Sign Out
          </DropdownMenuItem>
        </>
      ) : (
        <>
          {/* Sign In Option */}
          <DropdownMenuItem asChild>
            <Link
              to="/signup"
              className="px-4 py-2 flex items-center gap-2 text-beige transition-all duration-200 ease-in-out 
               hover:!bg-emerald-600 hover:text-beige focus:!bg-emerald-600"
            >
              <BadgeInfo className="h-5 w-5 text-beige mt-[1px] transition-transform duration-200 group-hover:translate-x-1" />
              Sign In to Get Started
            </Link>
          </DropdownMenuItem>
        </>
      )}
    </DropdownMenuContent>
  </DropdownMenu>
);

export default UserDropdown;
