import React from "react";
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
  User,
  DollarSign,
  Calendar,
} from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import Container from "../../../pages/shared/Container";
import { Button } from "../../../components/ui/button";
import { motion } from "framer-motion";

const PendingProductsDialog = ({ product, onAction }) => {
  if (!product) return null;

  return (
    <Container>
      <Dialog>
        {/* Trigger Button */}
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="hover:bg-emerald-50 bg-beige shadow-sm rounded-full transition"
          >
            <Eye className="text-gray-600 hover:text-emerald-700" />
          </Button>
        </DialogTrigger>

        {/* Dialog Content */}
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

            {/* Approve / Reject Buttons */}
            <div className="flex justify-end gap-4">
              <Button
                variant="destructive"
                onClick={() => onAction(product._id, "reject")}
                className="px-6"
              >
                Reject
              </Button>
              <Button
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6"
                onClick={() => onAction(product._id, "approve")}
              >
                Approve
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default PendingProductsDialog;
