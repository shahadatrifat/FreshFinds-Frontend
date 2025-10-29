import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import useAuth from "../../Hooks/useAuth";
import { getUserProfile, updateUserProfile } from "../../Services/productService"; 
import toast, { Toaster } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { 
  Pencil, 
  ShoppingBag, 
  Heart, 
  Package,
  Calendar,
  DollarSign,
  Crown,
  Store,
  UserCircle,
  Mail,
  MapPin,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";
import CartLoaderFull from "../shared/loaders/CartLoaderFull";

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  // form state
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(user?.uid);
        setProfile(data);
        setDisplayName(data.displayName || "");
        setPhotoURL(data.photoURL || "");
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (user?.uid) fetchProfile();
  }, [user?.uid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.uid) return;

    try {
      setSaving(true);
      const updated = await updateUserProfile(user.uid, {
        displayName,
        photoURL,
      });

      setProfile(updated.user); 
      toast.success("Profile updated successfully!");
      setDialogOpen(false);
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  // Role badge
  const getRoleBadge = (role) => {
    const badges = {
      admin: { bg: "bg-purple-500", text: "Admin", Icon: Crown, color: "text-purple-700", bgLight: "bg-purple-50" },
      vendor: { bg: "bg-emerald-600", text: "Vendor", Icon: Store, color: "text-emerald-700", bgLight: "bg-emerald-50" },
      user: { bg: "bg-blue-500", text: "User", Icon: UserCircle, color: "text-blue-700", bgLight: "bg-blue-50" }
    };
    return badges[role?.toLowerCase()] || badges.user;
  };

  const roleBadge = getRoleBadge(profile?.role);

  // Order status icon
  const getStatusIcon = (status) => {
    const icons = {
      completed: { Icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
      pending: { Icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50" },
      cancelled: { Icon: XCircle, color: "text-red-600", bg: "bg-red-50" }
    };
    return icons[status?.toLowerCase()] || icons.pending;
  };

  if (loading) return <CartLoaderFull />;
  if (!profile) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600">No profile data found.</p>
    </div>
  );

  const stats = [
    { 
      icon: ShoppingBag, 
      label: "Total Orders", 
      value: profile.orders?.length || 0,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700"
    },
    { 
      icon: Heart, 
      label: "Wishlist Items", 
      value: profile.wishlist?.length || 0,
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      textColor: "text-pink-700"
    },
    { 
      icon: Package, 
      label: "Active Orders", 
      value: profile.orders?.filter(o => o.status === "pending").length || 0,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-offwhite via-beige/20 to-mint/10 py-12 px-4">
      <Toaster position="top-center" />
      
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow overflow-hidden"
        >
          {/* Cover Background */}
          <div className="h-32 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
          </div>

          <div className="px-6 md:px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              {/* Avatar & Info */}
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16">
                <div className="relative">
                  <img
                    src={profile.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                    alt={profile.displayName}
                    className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow"
                  />
                  {/* Role badge */}
                  <div className={`absolute -bottom-2 -right-2 ${roleBadge.bg} rounded-xl px-3 py-1 shadow- flex items-center gap-1 border-2 border-white`}>
                    <roleBadge.Icon className="w-4 h-4 text-white" />
                    <span className="text-xs font-bold text-white">{roleBadge.text}</span>
                  </div>
                </div>

                <div className="text-center sm:text-left">
                  <h1 className="text-3xl font-bold text-charcoal font-lora mb-2">
                    {profile.displayName || "User"}
                  </h1>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-600 justify-center sm:justify-start">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{profile.email}</span>
                    </div>
                    {profile.address && (
                      <div className="flex items-center gap-2 text-gray-600 justify-center sm:justify-start">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{profile.address}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-3 rounded-xl shadow-md hover:shadow hover:scale-102 transition-all duration-300 font-semibold">
                    <Pencil className="w-4 h-4" />
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-emerald-700">Edit Profile</DialogTitle>
                  </DialogHeader>

                  <form className="space-y-5 mt-4" onSubmit={handleSubmit}>
                    <div>
                      <label className="block text-sm font-semibold text-charcoal mb-2">Display Name</label>
                      <Input
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Enter your name"
                        className="border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-charcoal mb-2">Photo URL</label>
                      <Input
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        placeholder="https://example.com/photo.jpg"
                        className="border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
                      />
                      {photoURL && (
                        <div className="mt-3">
                          <img src={photoURL} alt="Preview" className="w-20 h-20 rounded-lg object-cover border-2 border-gray-200" />
                        </div>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={saving}
                      className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-3 rounded-xl font-semibold shadow disabled:opacity-50"
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className={`${stat.bgColor} rounded-2xl p-6 shadow hover:shadow-md transition-all hover:-translate-y-1`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
                </div>
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-md`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white rounded-2xl shadow-md p-6 md:p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-charcoal font-lora flex items-center gap-2">
              <Package className="w-6 h-6 text-emerald-600" />
              Recent Orders
            </h2>
            <Link to="/dashboard/my-orders" className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm">
              View All →
            </Link>
          </div>

          {profile.orders?.length > 0 ? (
            <div className="space-y-4">
              {profile.orders
                .slice(-3)
                .reverse()
                .map((order, index) => {
                  const statusInfo = getStatusIcon(order.status);
                  return (
                    <motion.div
                      key={order.orderId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Link
                        to={`/orders/${order.orderId}`}
                        className="block p-5 border-2 border-gray-100 rounded-xl hover:border-emerald-300 hover:shadow-md transition-all group"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3">
                              <span className="font-mono text-sm font-semibold text-charcoal">
                                #{order.orderId}
                              </span>
                              <div className={`${statusInfo.bg} px-3 py-1 rounded-full flex items-center gap-1`}>
                                <statusInfo.Icon className={`w-3 h-3 ${statusInfo.color}`} />
                                <span className={`text-xs font-semibold ${statusInfo.color} capitalize`}>
                                  {order.status}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(order.orderDate).toLocaleDateString()}
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />
                                <span className="font-semibold text-emerald-700">${order.totalAmount}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-gray-400 group-hover:text-emerald-600 transition-colors">
                            →
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-500 mb-4">No orders yet</p>
              <Link to="/products" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold">
                Start Shopping →
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;