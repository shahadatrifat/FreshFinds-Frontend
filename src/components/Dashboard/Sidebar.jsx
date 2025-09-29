import { Link } from "react-router";
import { useEffect, useState } from "react";
import {
  Home,
  Users,
  Activity,
  PlusCircle,
  BarChart2,
  LogOut,
  Settings,
  X,
  Menu,
  ChevronRight,
  Bell,
  ShoppingCart,
  FileText,
  Package,
  Grid,
  BarChart,
} from "lucide-react";
import useAuth from "../../Hooks/useAuth";
import Logo from "../../pages/shared/Logo/Logo";
import { getUserProfile } from "../../Services/productService";
import toast from "react-hot-toast";

const LeftSidebar = () => {
  const { user, SignOutUser, } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const isActive = (path) => window.location.pathname === path;

  // profile

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(user?.uid);
        setProfile(data);
       
      } catch (err) {
        toast.error(err.message);
      } 
    };
    if (user?.uid) fetchProfile();
  }, [user?.uid]);

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden bg-gradient-to-r from-beige to-emerald-50/50 backdrop-blur-sm border-b border-emerald-200/60 px-4 flex justify-between items-center">
        <button
          onClick={toggleSidebar}
          className="p-2.5 rounded-xl hover:bg-emerald-100/70 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <Menu size={24} className="text-emerald" />
        </button>

        <div className="flex items-center gap-2">
          <Logo />
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl hover:bg-emerald-100/70 transition-all duration-200">
            <Bell size={18} className="text-charcoal" />
          </button>
          <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-sm font-medium text-beige shadow-sm ring-2 ring-[#f5f5dc]">
            {user?.displayName || "U"}
          </div>
        </div>
      </header>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative z-50 bg-offwhite backdrop-blur-xl w-72 h-full border-r border-emerald-200/60 transition-all duration-500 ease-out shadow-xl lg:shadow-none
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5f5dc] via-transparent to-[#f8f8f8] pointer-events-none" />

        <div className="relative z-10 p-6 h-full flex flex-col">
          {/* Close button */}
          <button
            onClick={closeSidebar}
            className="lg:hidden absolute top-6 right-6 p-2.5 hover:bg-emerald-100/70 rounded-xl transition-all duration-200 hover:rotate-90"
          >
            <X size={20} className="text-emerald" />
          </button>

          {/* Logo */}
          <div className="mb-8">
            <Link to="/" onClick={closeSidebar} className="block group">
              <div className="flex flex-col items-start gap-2 mb-2">
                <div className="flex flex-col items-center">
                  <Logo />
                  <p className="text-xs text-gray-500 font-medium">
                     Dashboard
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation */}
           <nav className="space-y-3 flex-1">
            <SidebarLink
              to="/dashboard"
              icon={<Home size={18} />}
              active={isActive("/dashboard")}
              onClick={closeSidebar}
              onHover={setHoveredItem}
              id="overview" // Unique ID for the Overview link
              hoveredItem={hoveredItem}
              gradient="from-emerald-500 to-emerald-600"
            >
              Overview
            </SidebarLink>

            <SidebarLink
              to="/dashboard/admin/user-management"
              icon={<Users size={18} />}
              active={isActive("/dashboard/admin/user-management")}
              onClick={closeSidebar}
              onHover={setHoveredItem}
              id="users" // Unique ID for the Users link
              hoveredItem={hoveredItem}
              gradient="from-emerald-500 to-emerald-600"
            >
              User Management
            </SidebarLink>

            <SidebarLink
              to="/dashboard/orders"
              icon={<ShoppingCart size={18} />}
              active={isActive("/dashboard/orders")}
              onClick={closeSidebar}
              onHover={setHoveredItem}
              id="orders" // Unique ID for the Orders link
              hoveredItem={hoveredItem}
              gradient="from-emerald-500 to-emerald-600"
            >
              My Orders
            </SidebarLink>

            <SidebarLink
              to="/dashboard/admin/applications"
              icon={<FileText size={18} />} // Updated icon for applications
              active={isActive("/dashboard/admin/applications")}
              onClick={closeSidebar}
              onHover={setHoveredItem}
              id="applications" // Unique ID for the Applications link
              hoveredItem={hoveredItem}
              gradient="from-emerald-500 to-purple-600"
            >
              Pending Applications
            </SidebarLink>

            <SidebarLink
              to="/dashboard/admin/pending-products"
              icon={<Package size={18} />} // Updated icon for pending products
              active={isActive("/dashboard/admin/pending-products")}
              onClick={closeSidebar}
              onHover={setHoveredItem}
              id="pending-products" // Unique ID for the Pending Products link
              hoveredItem={hoveredItem}
              gradient="from-emerald-500 to-purple-600"
            >
              Pending products
            </SidebarLink>

            <SidebarLink
              to="/dashboard/vendor/add-product"
              icon={<PlusCircle size={18} />}
              active={isActive("/dashboard/vendor/add-product")}
              onClick={closeSidebar}
              onHover={setHoveredItem}
              id="add-product" // Unique ID for the Add Product link
              hoveredItem={hoveredItem}
              gradient="from-emerald-500 to-yellow-600"
            >
              Add Product
            </SidebarLink>

            <SidebarLink
              to="/dashboard/vendor/my-products"
              icon={<Grid size={18} />} // Updated icon for managing products
              active={isActive("/dashboard/vendor/my-products")}
              onClick={closeSidebar}
              onHover={setHoveredItem}
              id="my-products" // Unique ID for the My Products link
              hoveredItem={hoveredItem}
              gradient="from-emerald-500 to-yellow-600"
            >
              My Products
            </SidebarLink>

            <SidebarLink
              to="/dashboard/request-for-ad"
              icon={<Activity size={18} />}
              active={isActive("/dashboard/request-for-ad")}
              onClick={closeSidebar}
              onHover={setHoveredItem}
              id="request-for-ad" // Unique ID for the Activity link
              hoveredItem={hoveredItem}
              gradient="from-indigo-500 to-indigo-600"
            >
              Request for Ad
            </SidebarLink>

            <SidebarLink
              to="/dashboard/admin/add-management"
              icon={<BarChart size={18} />} // Updated icon for performance
              active={isActive("/dashboard/admin/add-management")}
              onClick={closeSidebar}
              onHover={setHoveredItem}
              id="performance" // Unique ID for the Performance link
              hoveredItem={hoveredItem}
              gradient="from-cyan-500 to-cyan-600"
            >
              Add Management
            </SidebarLink>
          </nav>

          {/* Bottom Section */}
          <div className="pt-6 mt-auto border-t border-gray-200/60">
            <div className="space-y-2 mb-6">
              <SidebarLink
                to="/dashboard/profile"
                icon={<Settings size={18} />}
                active={isActive("/dashboard/profile")}
                onClick={closeSidebar}
                onHover={setHoveredItem}
                id="profile" // Unique ID for the Profile link
                hoveredItem={hoveredItem}
                gradient="from-emerald-500 to-emerald-600"
              >
                Profile
              </SidebarLink>
              <SidebarLink
                to="/logout"
                icon={<LogOut size={18} />}
                onClick={closeSidebar}
                onHover={setHoveredItem}
                id="logout" // Unique ID for the Logout link
                hoveredItem={hoveredItem}
                gradient="from-red-500 to-red-600"
              >
                Logout
              </SidebarLink>
            </div>

            {/* Footer User Placeholder */}
            <div className="bg-gradient-to-r from-[#f5f5dc] to-emerald-50/40 rounded-xl p-4 border border-gray-200/40">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 bg-gradient-to-br from-[#f5f5dc] to-emerald-600 rounded-xl flex justify-center items-center shadow-sm ring-2 ring-[#f5f5dc] overflow-hidden">
                  <img
                    src={profile?.photoURL || "/default-avatar.png"}
                    alt={profile?.displayName || "User"}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                {/* User info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-charcoal truncate">
                    {profile?.displayName || "Unnamed User"}
                  </p>
                  <p className="text-xs text-gray-500 capitalize font-medium">
                    {profile?.role || "customer"}
                  </p>
                </div>

                {/* Chevron */}
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

const SidebarLink = ({
  to,
  icon,
  children,
  onClick,
  active,
  onHover,
  id,
  hoveredItem,
  gradient,
}) => {
  const isHovered = hoveredItem === id;

  return (
    <Link
      to={to}
      onClick={onClick}
      onMouseEnter={() => onHover?.(id)}
      onMouseLeave={() => onHover?.(null)}
      className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 w-full group overflow-hidden ${
        active
          ? `bg-gradient-to-r ${gradient} text-beige shadow-lg shadow-emerald-500/25`
          : "text-charcoal hover:text-gray-900"
      }`}
    >
      {!active && (
        <div
          className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`}
        />
      )}

      <span
        className={`flex-shrink-0 transition-all duration-300 ${
          active
            ? "text-beige"
            : isHovered
            ? "text-emerald-500 scale-110"
            : "text-gray-500 group-hover:text-emerald-500"
        }`}
      >
        {icon}
      </span>

      <span className="truncate font-medium">{children}</span>

      {active && (
        <div className="ml-auto">
          <div className="w-2 h-2 bg-beige rounded-full animate-pulse  " />
        </div>
      )}

      {!active && isHovered && (
        <ChevronRight
          size={14}
          className="ml-auto text-emerald-500 group-hover:text-emerald-500 transform transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </Link>
  );
};

export default LeftSidebar;
