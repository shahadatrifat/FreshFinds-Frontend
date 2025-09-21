import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import CartLoader from "../../shared/loaders/CartLoader";
import { fetchApprovedVendorProducts, fetchVendorProducts } from "../../../Services/productService";
import useAuth from "../../../Hooks/useAuth";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import MyProductsDialog from "./MyProductsDialog";

const MyProducts = () => {
  const { user } = useAuth();
  fetchApprovedVendorProducts(user?.uid);
  const { data: products, isLoading, isError, refetch } = useQuery({
    queryKey: ["myProducts", user?.uid],
    queryFn: () => fetchVendorProducts(user?.uid),
  });

  const [filterStatus, setFilterStatus] = useState("all");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [expandedCard, setExpandedCard] = useState(null);

  const displayedProducts = useMemo(() => {
    if (!products) return [];

    let filtered = products;
    if (filterStatus !== "all") {
      filtered = products.filter((p) => p.applicationStatus === filterStatus);
    }

    if (sortField) {
      filtered = filtered.slice().sort((a, b) => {
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
  }, [products, filterStatus, sortField, sortOrder]);

  if (isLoading) return <CartLoader />;

  if (isError) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 font-semibold">
          Error loading products. Please try again later.
        </p>
        <button
          onClick={() => refetch()}
          className="mt-3 px-4 py-2 bg-emerald text-beige rounded hover:opacity-90"
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
    if (sortField !== field) return <ArrowUpDown className="inline w-4 h-4 ml-1 text-gray-400" />;
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

      {/* Filter Buttons */}
      <div className="flex gap-2 justify-center mb-4 flex-wrap">
        {["all", "approved", "pending", "rejected"].map((status) => (
          <button
            key={status}
            className={`px-3 py-1 rounded font-medium flex items-center gap-1 transition-colors duration-200 ${
              filterStatus === status
                ? "bg-emerald text-beige border border-emerald"
                : "bg-beige text-emerald border border-emerald hover:bg-emerald hover:text-beige"
            }`}
            onClick={() => setFilterStatus(status)}
            title={`Filter by ${status.charAt(0).toUpperCase() + status.slice(1)}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
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
                  onClick={() => handleSort(field === "status" ? "applicationStatus" : field)}
                  title={`Click to sort by ${field}`}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                  {renderSortIcon(field === "status" ? "applicationStatus" : field)}
                </th>
              ))}
              <th className="px-4 py-2 text-center">Overview</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.map((product) => (
              <tr key={product._id} className="border-b">
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
                <td className="px-4 py-2 text-center">{product.stock}</td>
                <td className="px-4 py-2 text-center"> <MyProductsDialog product={product}></MyProductsDialog></td>
                <td className="px-4 py-2 text-center">
                  <Link
                    to={`/vendor/product/edit/${product._id}`}
                    className="text-emerald-600 hover:text-emerald-800"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
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
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="bg-beige p-4 rounded-lg shadow border cursor-pointer"
              onClick={() =>
                setExpandedCard(expandedCard === product._id ? null : product._id)
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
                animate={{ height: expandedCard === product._id ? "auto" : 0, opacity: expandedCard === product._id ? 1 : 0 }}
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
                        <span className="font-medium">Price:</span> ${product.price}
                      </p>
                      <p>
                        <span className="font-medium">Category:</span> {product.category}
                      </p>
                      <p>
                        <span className="font-medium">Stock:</span> {product.stock}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <Link
                      to={`/vendor/product/edit/${product._id}`}
                      className="px-3 py-1 bg-emerald text-beige rounded hover:opacity-90 text-sm"
                    >
                      Edit
                    </Link>
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
