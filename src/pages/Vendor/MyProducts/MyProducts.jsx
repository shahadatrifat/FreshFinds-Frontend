import React, { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import CartLoader from "../../shared/loaders/CartLoader";
import {
  fetchVendorProducts,
  fetchApprovedVendorProducts,
} from "../../../Services/productService";
import useAuth from "../../../Hooks/useAuth";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import MyProductsDialog from "./MyProductsDialog";

const MyProducts = () => {
  const { user } = useAuth();

  const {
    data: productsData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["myProducts", user?.uid],
    queryFn: () => fetchVendorProducts(user?.uid),
  });

  // Local state to allow instant UI updates without refetch
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (productsData) {
      setProducts(productsData);
    }
  }, [productsData]);

  const [filterStatus, setFilterStatus] = useState("all");
  const [stockFilter, setStockFilter] = useState("all"); // NEW: stock filter state
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [expandedCard, setExpandedCard] = useState(null);

  // Handle updates from MyProductsDialog (delete or stock change)
  const handleAction = (actionType, updatedProduct) => {
    setProducts((prev) => {
      if (actionType === "delete") {
        return prev.filter((p) => p._id !== updatedProduct._id); // remove deleted product
      } else if (actionType === "update") {
        return prev.map((p) =>
          p._id === updatedProduct._id ? { ...p, ...updatedProduct } : p
        ); // update the modified product
      }
      return prev;
    });
  };

  // Filter + sort logic
  const displayedProducts = useMemo(() => {
    if (!products) return [];

    let filtered = [...products];

    // Filter by application status
    if (filterStatus !== "all") {
      filtered = filtered.filter((p) => p.applicationStatus === filterStatus);
    }

    // Filter by stock availability
    if (stockFilter !== "all") {
      filtered = filtered.filter((p) => p.availabilityStatus === stockFilter);
    }

    // Sorting logic
    if (sortField) {
      filtered.sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];

        if (!isNaN(valA) && !isNaN(valB)) {
          valA = Number(valA);
          valB = Number(valB);
        } else {
          valA = String(valA).toLowerCase();
          valB = String(valB).toLowerCase();
        }

        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [products, filterStatus, stockFilter, sortField, sortOrder]);

  if (isLoading) return <CartLoader />;

  if (isError) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 font-semibold">
          Error loading products. Please try again later.
        </p>
        <button
          onClick={() => refetch()}
          className="mt-3 px-4 py-2 bg-emerald text-beige rounded hover:opacity-90 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center mt-10">
        <p className="text-charcoal font-semibold">You have no products yet.</p>
      </div>
    );
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const renderSortIcon = (field) => {
    if (sortField !== field)
      return <ArrowUpDown className="inline w-4 h-4 ml-1 text-gray-400" />;
    return sortOrder === "asc" ? (
      <ArrowUp className="inline w-4 h-4 ml-1 text-emerald" />
    ) : (
      <ArrowDown className="inline w-4 h-4 ml-1 text-emerald" />
    );
  };

  return (
    <div className="bg-beige shadow-lg rounded-lg p-4 sm:p-6">
      <h2 className="text-2xl font-semibold text-center mb-4">
        My Products ({displayedProducts.length})
      </h2>

      {/* Filter Section */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {/* Status Filter */}
        <div className="flex gap-2">
          {["all", "approved", "pending", "rejected"].map((status) => (
            <button
              key={status}
              className={`px-3 py-1 rounded font-medium text-sm transition-colors duration-200 ${
                filterStatus === status
                  ? "bg-emerald text-beige border border-emerald"
                  : "bg-beige text-emerald border border-emerald hover:bg-emerald hover:text-beige"
              }`}
              onClick={() => setFilterStatus(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Divider */}
        <span className="hidden sm:inline-block border-l border-gray-300 mx-2"></span>

        {/* Stock Filter */}
        <div className="flex gap-2">
          {["all", "active", "out of stock"].map((status) => (
            <button
              key={status}
              className={`px-3 py-1 rounded font-medium text-sm transition-colors duration-200 ${
                stockFilter === status
                  ? "bg-green-600 text-white border border-green-600"
                  : "bg-beige text-green-600 border border-green-600 hover:bg-green-600 hover:text-white"
              }`}
              onClick={() => setStockFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-beige text-emerald">
              <th className="px-4 py-2 text-center">Image</th>
              {["name", "price", "category", "status", "stock"].map((field) => (
                <th
                  key={field}
                  className="px-4 py-2 text-center cursor-pointer select-none"
                  onClick={() =>
                    handleSort(field === "status" ? "applicationStatus" : field)
                  }
                  title={`Click to sort by ${field}`}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                  {renderSortIcon(
                    field === "status" ? "applicationStatus" : field
                  )}
                </th>
              ))}
              <th className="px-4 py-2 text-center">Overview</th>
            </tr>
          </thead>
          <AnimatePresence component="tbody">
            {displayedProducts.map((product) => (
              <motion.tr
                key={product._id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="border-b"
              >
                <td className="px-4 py-2 text-center">
                  {product.productImage ? (
                    <img
                      src={product.productImage}
                      alt={product.name}
                      className="w-12 h-12 object-cover mx-auto rounded"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="px-4 py-2 text-center">{product.name}</td>
                <td className="px-4 py-2 text-center">${product.price}</td>
                <td className="px-4 py-2 text-center">{product.category}</td>

                {/* Status Badge */}
                <td className="px-4 py-2 text-center">
                  <span
                    className={`px-4 py-1 rounded-full text-beige text-sm capitalize ${
                      product.applicationStatus === "approved"
                        ? "bg-emerald"
                        : product.applicationStatus === "rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {product.applicationStatus}
                  </span>
                </td>

                {/* Stock Badge */}
                <td className="px-4 py-2 text-center">
                  <span
                    className={`whitespace-nowrap px-3 py-1 rounded-full text-sm font-medium border transition-all duration-300
                      ${
                        product.availabilityStatus === "active"
                          ? "border-green-500 text-green-600 bg-green-50"
                          : "border-red-500 text-red-600 bg-red-50"
                      }`}
                  >
                    {product.availabilityStatus}
                  </span>
                </td>

                <td className="px-4 py-2 text-center">
                  <MyProductsDialog
                    product={product}
                    onAction={handleAction}
                  />
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        <AnimatePresence>
          {displayedProducts.map((product) => (
            <motion.div
              key={product._id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-beige p-4 rounded-lg shadow border cursor-pointer"
              onClick={() =>
                setExpandedCard(
                  expandedCard === product._id ? null : product._id
                )
              }
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-beige text-xs capitalize flex items-center gap-1 ${
                    product.applicationStatus === "approved"
                      ? "bg-emerald"
                      : product.applicationStatus === "rejected"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {product.applicationStatus}
                </span>
              </div>

              <motion.div
                layout
                initial={false}
                animate={{
                  height: expandedCard === product._id ? "auto" : 0,
                  opacity: expandedCard === product._id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-3"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                  <div className="flex gap-2 items-center">
                    {product.productImage ? (
                      <img
                        src={product.productImage}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}
                    <div className="flex flex-col text-sm text-charcoal">
                      <p>
                        <span className="font-medium">Price:</span> $
                        {product.price}
                      </p>
                      <p>
                        <span className="font-medium">Category:</span>{" "}
                        {product.category}
                      </p>
                      <p>
                        <span className="font-medium">Stock:</span>{" "}
                        {product.stock}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <MyProductsDialog
                      product={product}
                      onAction={handleAction}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MyProducts;
