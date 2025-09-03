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
    <DropdownMenuTrigger>
      <button className="flex items-center gap-2 focus:outline-none">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500 transition-all duration-300 ease-in-out hover:border-emerald-700"
          />
        ) : (
          <FaRegCircleUser size={24} className="text-emerald rounded-full" />
        )}
      </button>
    </DropdownMenuTrigger>

    {/* Dropdown Menu Content */}
    <DropdownMenuContent
      align="end"
      className="w-60 bg-gradient-to-r from-emerald-500 to-emerald-700 shadow-xl rounded-lg border border-offwhite z-50"
    >
      {user ? (
        <>
          <DropdownMenuLabel className="p-4 border-b rounded-t-lg">
            <div className="flex items-center gap-3">
              <img
                src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-white">
                  {user.displayName || "No Name"}
                </p>
                <p className="text-xs text-charcoal">{user.email}</p>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuItem
            as={Link}
            to="/profile"
            className="px-4 py-2 hover:bg-emerald-600 rounded flex items-center gap-2 transition-all duration-200 ease-in-out"
          >
            <FaRegCircleUser className="text-white" size={20} /> My Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            as={Link}
            to="/dashboard"
            className="px-4 py-2 hover:bg-emerald-600 rounded flex items-center gap-2 transition-all duration-200 ease-in-out"
          >
            <RiDashboardHorizontalLine className="text-white" size={20} />{" "}
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem
            as={Link}
            to="/Be-Vendor"
            className="px-4 py-2 hover:bg-emerald-600 rounded flex items-center gap-2 transition-all duration-200 ease-in-out"
          >
            <FaStore className="text-white" size={20} /> Be a Vendor
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleSignout}
            className="px-4 py-2 hover:bg-emerald-600 rounded flex items-center gap-2 transition-all duration-200 ease-in-out"
          >
            <IoLogOutOutline className="text-white" size={20} /> Sign Out
          </DropdownMenuItem>
        </>
      ) : (
        <>
          <DropdownMenuItem className="p-0">
            <Link
              to="/signup"
              className="w-full px-4 py-2 hover:bg-emerald-600 rounded flex items-center gap-2 text-white font-semibold transition-all duration-200 ease-in-out"
            >
                  <BadgeInfo className="h-5 w-5 text-white mt-[1px] transition-transform duration-200 group-hover:translate-x-1" />
                  Sign In to Get Started
              
            </Link>
          </DropdownMenuItem>
        </>
      )}
    </DropdownMenuContent>
  </DropdownMenu>
);

export default UserDropdown;
