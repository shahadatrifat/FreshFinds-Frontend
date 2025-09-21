import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
} from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import Container from "../../../pages/shared/Container";
import { Button } from "../../../components/ui/button";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
// import { markProductOutOfStock, deleteProduct } from "../../../Services/productService"; // Import services for the new methods

const MyProductsDialog = ({ product, onAction }) => {
  if (!product) return null;

  // Mutation to handle marking product as out of stock
  // const { mutate: markOutOfStock } = useMutation({
  //   mutationFn: () => markProductOutOfStock(product._id),
  //   onSuccess: () => {
  //     toast.success("Product marked as out of stock");
  //     onAction();  // Refresh or close after marking as out of stock
  //   },
  //   onError: () => {
  //     toast.error("Failed to mark product as out of stock");
  //   },
  // });

  // Mutation to handle product deletion
  // const { mutate: deleteProductMutate } = useMutation({
  //   mutationFn: () => deleteProduct(product._id),
  //   onSuccess: () => {
  //     toast.success("Product deleted successfully");
  //     onAction();  // Close or refresh after deletion
  //   },
  //   onError: () => {
  //     toast.error("Failed to delete product");
  //   },
  // });

  // Handle price change if needed
  const [newPrice, setNewPrice] = useState(product.price);
  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setNewPrice(value);
    }
  };
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

        <DialogContent className="max-w-7xl p-0 overflow-hidden rounded-2xl shadow-2xl bg-white">
          {/* Product Image with overlay */}
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
                  <DialogTitle className="text-3xl font-[playfair_display] text-white drop-shadow-lg">
                    {product.name}
                  </DialogTitle>
                </motion.div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="p-8 space-y-6">
            {/* Description */}
            <DialogDescription className="text-gray-700 text-lg leading-relaxed">
              {product.description || "No description provided."}
            </DialogDescription>

            <Separator />

            {/* Product Info & Vendor Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-lora text-gray-900">
                  Product Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-800">
                    <Tag className="w-5 h-5 text-emerald-600" />
                    <span className="font-medium">
                      Category: {product.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-800">
                    <Package className="w-5 h-5 text-emerald-600" />
                    <span className="font-medium">Stock: {product.stock}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-800">
                    <DollarSign className="w-5 h-5 text-emerald-600" />
                    <span className="font-medium">Price: ${product.price}</span>
                  </div>
                  {/* Price Update */}
                  <div className="flex items-center gap-2 text-gray-800">
                    <input
                      type="number"
                      value={newPrice}
                      onChange={handlePriceChange}
                      className="w-24 p-2 border border-emerald-500 rounded-lg"
                      placeholder="New Price"
                    />
                    {/* You can add a button to update the price here */}
                  </div>
                  <div className="flex items-center gap-2 text-gray-800">
                    <Badge
                      className={`px-3 py-1 rounded-full capitalize ${
                        product.applicationStatus === "pending"
                          ? "bg-beige text-yellow-700"
                          : product.applicationStatus === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      Status: {product.applicationStatus}
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
                <h3 className="text-xl font-lora text-gray-900">
                  Vendor Information
                </h3>
                <div className="flex items-center gap-4 bg-emerald-50 rounded-lg p-4 shadow-sm">
                  <Avatar className="w-8 h-8 ring-2 ring-emerald-100">
                    <AvatarImage
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        product.vendorName || "Vendor"
                      )}&background=E6F4F1&color=046C4E`}
                    />
                    <AvatarFallback>
                      {product.vendorName?.charAt(0) || "V"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-lora text-lg text-gray-900">
                      {product.vendorName}
                    </p>
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

            {/* Created / Updated Dates */}
            <div className="flex justify-between items-center text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>
                  Created: {new Date(product.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>
                  Updated: {new Date(product.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <Separator />

            {/* Out of Stock Button */}
            <div className="flex justify-end gap-4">
              <Button
                variant="destructive"
                onClick={() => markOutOfStock()} // Function to mark as out of stock
                className="px-6"
              >
                Mark as Out of Stock
              </Button>
              <Button
                variant="destructive"
                onClick={() => deleteProductMutate()} // Function to delete the product
                className="px-6"
              >
                <Trash className="w-5 h-5" />
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default MyProductsDialog;
