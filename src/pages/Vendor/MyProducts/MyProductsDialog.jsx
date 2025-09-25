import React, { use, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../../../components/ui/dialog";
import { Separator } from "../../../components/ui/separator";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../../components/ui/avatar";
import {
  Mail,
  Phone,
  Eye,
  Package,
  Tag,
  DollarSign,
  Calendar,
  Trash,
  Pencil,
  X,
} from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import Container from "../../../pages/shared/Container";
import { Button } from "../../../components/ui/button";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  markProductOutOfStock,
  markProductActive,
  deleteProduct,
  updateProductPrice,
} from "../../../Services/productService";
import useAuth from "../../../Hooks/useAuth";

const MyProductsDialog = ({ product, onAction }) => {
  if (!product) return null;
  const {user}=useAuth()
  const [newPrice, setNewPrice] = useState(product.price);

  // =========================
  // PRICE UPDATE MUTATION
  // =========================
  const { mutate: updatePriceMutate, isLoading: updatingPrice } = useMutation({
  mutationFn: () => updateProductPrice(product._id, Number(newPrice), user?.uid), 
  onSuccess: (res) => {
    toast.success(res.message || "Price updated successfully");
    onAction?.("update", { ...product, price: Number(newPrice) }); 
  },
  onError: (err) => {
    toast.error(err.response?.data?.message || "Failed to update price");
  },
});

  const handleUpdatePrice = () => {
    if (newPrice <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }
    updatePriceMutate();
  };

  // =========================
  // OUT OF STOCK MUTATION
  // =========================
  const { mutate: markOutOfStockMutate, isLoading: markingOut } = useMutation({
    mutationFn: () => markProductOutOfStock(product._id),
    onSuccess: (res) => {
      toast.success(res.message || "Product marked as out of stock");
      onAction?.("update", { ...product, availabilityStatus: "out of stock" });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to mark as out of stock");
    },
  });

  // =========================
  // MARK ACTIVE MUTATION
  // =========================
  const { mutate: markActiveMutate, isLoading: markingActive } = useMutation({
    mutationFn: () => markProductActive(product._id),
    onSuccess: (res) => {
      toast.success(res.message || "Product marked as active");
      onAction?.("update", { ...product, availabilityStatus: "active" });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to mark as active");
    },
  });

  // =========================
  // DELETE PRODUCT MUTATION
  // =========================
  const { mutate: deleteProductMutate, isLoading: deleting } = useMutation({
    mutationFn: () => deleteProduct(product._id),
    onSuccess: (res) => {
      toast.success(res.message || "Product deleted successfully");
      onAction?.("delete", product);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to delete product");
    },
  });

  return (
    <Container>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="hover:bg-emerald-50 bg-beige shadow-sm rounded-full transition"
          >
            <Eye className="text-gray-600 hover:text-emerald-700" />
          </Button>
        </DialogTrigger>

        <DialogContent className="w-[95%] sm:w-[90%] md:w-[80%] max-h-screen overflow-y-auto p-0 rounded-2xl shadow-2xl bg-offwhite">
          {/* Close Button */}
          <DialogClose asChild>
            <button
              className="absolute top-4 right-4 z-50 p-2 bg-offwhite rounded-full shadow-md hover:bg-gray-100 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </DialogClose>

          {/* Product Image */}
          {product.productImage && (
            <div className="relative w-full h-72">
              <img
                src={product.productImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <DialogTitle className="text-3xl font-[playfair_display] text-beige drop-shadow-lg">
                    {product.name}
                  </DialogTitle>
                </motion.div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="p-8 space-y-6">
            {/* Description */}
            <DialogDescription className="text-charcoal text-lg leading-relaxed">
              {product.description || "No description provided."}
            </DialogDescription>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-lora text-gray-900">Product Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-800">
                    <Tag className="w-5 h-5 text-emerald" />
                    <span className="font-medium">Category: {product.category}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-800">
                    <Package className="w-5 h-5 text-emerald" />
                    <span className="font-medium">Stock: {product.stock}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-800">
                    <DollarSign className="w-5 h-5 text-emerald-600" />
                    <span className="font-medium">Price: ${product.price}</span>
                  </div>

                  {/* Editable Price (Approved Only) */}
                  {product.applicationStatus === "approved" && (
                    <div className="flex items-center gap-2 text-gray-800">
                      <input
                        type="number"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        className="w-24 p-2 border border-emerald-500 rounded-lg focus:outline-none focus:ring focus:ring-emerald-200 transition"
                        placeholder="New Price"
                      />
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700"
                        onClick={handleUpdatePrice}
                        disabled={updatingPrice}
                      >
                        <Pencil className="w-4 h-4" />
                        {updatingPrice ? "Updating..." : "Update"}
                      </Button>
                    </div>
                  )}

                  {/* Status Badges */}
                  <div className="flex items-center gap-2 text-gray-800">
                    <Badge
                      className={`px-3 py-1 rounded-full capitalize ${
                        product.applicationStatus === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : product.applicationStatus === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      Status: {product.applicationStatus}
                    </Badge>
                    <Badge
                      className={`px-3 py-1 rounded-full capitalize ${
                        product.availabilityStatus === "out of stock"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {product.availabilityStatus}
                    </Badge>
                  </div>
                </div>
              </motion.div>

              {/* Vendor Info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-lora text-gray-900">Vendor Information</h3>
                <div className="flex items-center gap-4 bg-emerald-50 rounded-lg p-4 shadow-sm">
                  <Avatar className="w-8 h-8 ring-2 ring-emerald-100">
                    <AvatarImage
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        product.vendorName || "Vendor"
                      )}&background=E6F4F1&color=046C4E`}
                    />
                    <AvatarFallback>{product.vendorName?.charAt(0) || "V"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-lora text-lg text-gray-900">{product.vendorName}</p>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Mail className="w-4 h-4 text-emerald-600" />
                      <span>{product.vendorEmail}</span>
                    </div>
                    {product.vendorPhone && (
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Phone className="w-4 h-4 text-emerald-600" />
                        <span>{product.vendorPhone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            <Separator />

            {/* Dates */}
            <div className="flex justify-between items-center text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>Created: {new Date(product.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>Updated: {new Date(product.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Actions */}
            {(product.applicationStatus === "approved" ||
              product.applicationStatus === "rejected") && (
              <>
                <Separator />
                <div className="flex flex-col gap-4">
                  {product.applicationStatus === "rejected" && (
                    <p className="text-red-500 text-sm font-medium">
                      This product was rejected. You can only delete it.
                    </p>
                  )}

                  <div className="flex justify-end gap-4">
                    {/* Availability Toggle */}
                    {product.applicationStatus === "approved" &&
                      (product.availabilityStatus === "out of stock" ? (
                        <Button
                          className="bg-emerald-600 text-white hover:bg-emerald-700 px-6"
                          onClick={() => markActiveMutate()}
                          disabled={markingActive || markingOut || deleting}
                        >
                          {markingActive ? "Activating..." : "Make Active"}
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          className="bg-yellow-50 text-yellow-800 hover:bg-yellow-100 px-6"
                          onClick={() => markOutOfStockMutate()}
                          disabled={markingActive || markingOut || deleting}
                        >
                          {markingOut ? "Processing..." : "Mark as Out of Stock"}
                        </Button>
                      ))}

                    {/* Delete Button */}
                    <Button
                      variant="destructive"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this product?")) {
                          deleteProductMutate();
                        }
                      }}
                      disabled={markingActive || markingOut || deleting}
                      className="flex items-center gap-2 px-6"
                    >
                      <Trash className="w-5 h-5" />
                      {deleting ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default MyProductsDialog;
