import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { getUserProfile, updateUserProfile } from "../../Services/productService"; 
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"; // shadcn
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Pencil } from "lucide-react";

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

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

      setProfile(updated.user); // update local state with backend response
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!profile) return <p>No profile data found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-offwhite rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <img
            src={profile.photoURL || "/default-avatar.png"}
            alt={profile.displayName}
            className="w-24 h-24 rounded-full object-cover border"
          />
          <div>
            <h1 className="text-2xl font-bold">{profile.displayName}</h1>
            <p className="text-charcoal">{profile.email}</p>
            <p className="text-charcoal font-semibold capitalize">
              Role: {profile.role}
            </p>
          </div>
        </div>

        {/* Edit Profile Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 
             text-beige px-5 py-2 rounded-lg shadow-md hover:shadow-lg 
             hover:scale-102 transition-all duration-300 font-semibold"
            >
              <Pencil className="w-4 h-4" />
              Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium">Display Name</label>
                <Input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Photo URL</label>
                <Input
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                />
              </div>

              <Button
                type="submit"
                disabled={saving}
                className="w-full bg-emerald hover:bg-emerald-600 text-beige"
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-green-50 rounded-lg text-center">
          <p className="text-gray-500">Total Orders</p>
          <p className="text-xl font-semibold">{profile.orders?.length || 0}</p>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg text-center">
          <p className="text-gray-500">Wishlist Items</p>
          <p className="text-xl font-semibold">
            {profile.wishlist?.length || 0}
          </p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Recent Orders</h2>
        {profile.orders?.length > 0 ? (
          profile.orders
            .slice(-3)
            .reverse()
            .map((order) => (
              <Link
                to={`/orders/${order.orderId}`}
                key={order.orderId}
                className="block p-4 mb-3 border rounded-lg hover:bg-gray-50 transition"
              >
                <p className="text-gray-600">
                  Order ID: <span className="font-medium">{order.orderId}</span>
                </p>
                <p className="text-gray-600">
                  Total Amount:{" "}
                  <span className="font-medium">${order.totalAmount}</span>
                </p>
                <p className="text-gray-600">
                  Status: <span className="font-medium">{order.status}</span>
                </p>
                <p className="text-gray-600">
                  Date:{" "}
                  <span className="font-medium">
                    {new Date(order.orderDate).toLocaleString()}
                  </span>
                </p>
              </Link>
            ))
        ) : (
          <p className="text-gray-500">No recent orders found.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
