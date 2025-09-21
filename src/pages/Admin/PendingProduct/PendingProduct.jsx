import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../Hooks/useAxiosInstance";
import { CheckCircle, XCircle } from "lucide-react";
import CartLoader from "../../../pages/shared/loaders/CartLoader";
import PageWrapper from "../../../pages/shared/PageWrapper/PageWrapper";
import toast from "react-hot-toast";
import VendorApplicationActions from "../../../components/VendorApplicationActions/VendorApplicationActions";
import PendingProductsDialog from "./PendingProductsDialog";

const fetchPendingProducts = async () => {
  const { data } = await axiosInstance.get("/api/v1/product/pending");
  return data.data;
};

const PendingProduct = () => {
  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["pendingProducts"],
    queryFn: fetchPendingProducts,
    refetchInterval: 5000,
  });

  const { mutate: handleProductAction } = useMutation({
    mutationFn: ({ productId, action }) => {
      return axiosInstance
        .put(`/api/v1/product/${action}/${productId}`)
        .then((res) => {
          return res;
        });
    },

    onSuccess: (response) => {
      if (response.status !== 200) {
        const errorMessage =
          response?.data?.message ||
          "Error updating product. Please try again.";
        toast.error(errorMessage);
        return;
      }
      const apiResponse = response?.data;
      const message = apiResponse?.message || "Product updated successfully!";
      toast.success(message);
      refetch?.();
    },
    onError: (error) => {
      console.error("Error updating product:", error);
      toast.error(
        error.response?.data?.message ||
          "Error updating product. Please try again."
      );
    },
  });

  // Shared handler
  const onAction = (productId, action) => {
    console.log("Triggering mutation with:", { productId, action });
    handleProductAction({ productId, action });
  };

  if (isLoading) {
    return <CartLoader />;
  }

  if (isError) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 font-semibold">
          Oops, there was an issue loading pending products. Please try again.
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
        <p className="text-charcoal font-semibold">
          No pending products found.
        </p>
      </div>
    );
  }

  return (
    <PageWrapper>
      <div className="bg-beige shadow-lg rounded-lg p-4 sm:p-6">
        <h2 className="text-2xl font-lora text-center mb-6">
          Pending Vendor Products ({products.length || 0})
        </h2>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-beige font-[playfair_display] text-emerald">
                <th className="px-4 py-2 text-center">Product Name</th>
                <th className="px-4 py-2 text-center">Vendor Name</th>
                <th className="px-4 py-2 text-center">Price</th>
                <th className="px-4 py-2 text-center">Category</th>
                <th className="px-4 py-2 text-center">Status</th>
                <th className="px-4 py-2 text-center">Overview</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b">
                  <td className="px-4 py-2 text-center">{product.name}</td>
                  <td className="px-4 py-2 text-center">
                    {product.vendorName}
                  </td>
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
                  <td className="px-4 py-2 text-center">
                    <PendingProductsDialog
                      product={product}
                      onAction={onAction}
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={() => onAction(product._id, "approve")}
                        className="text-green-500 hover:text-green-600"
                      >
                        <CheckCircle className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => onAction(product._id, "reject")}
                        className="text-red-500 hover:text-red-600"
                      >
                        <XCircle className="w-6 h-6" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 md:hidden">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-beige p-4 rounded-lg shadow border"
            >
              {/* Top Section with Status */}
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <span
                  className={`flex items-center px-4 py-1 rounded-full text-beige text-sm capitalize ${
                    product.applicationStatus === "approved"
                      ? "bg-emerald"
                      : product.applicationStatus === "rejected"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {product.applicationStatus === "approved" ? (
                    <CheckCircle className="mr-1 w-4 h-4" />
                  ) : product.applicationStatus === "rejected" ? (
                    <XCircle className="mr-1 w-4 h-4" />
                  ) : null}
                  {product.applicationStatus}
                </span>
              </div>

              {/* Product Info */}
              <div className="text-sm text-charcoal space-y-1">
                <p>
                  <span className="font-medium">Vendor:</span>{" "}
                  {product.vendorName}
                </p>
                <p>
                  <span className="font-medium">Price:</span> ${product.price}
                </p>
                <p>
                  <span className="font-medium">Category:</span>{" "}
                  {product.category}
                </p>
              </div>

              {/* Actions Section */}
              <div className="mt-4 flex items-center justify-between">
                {/* Left Side: Vendor Actions */}
                <VendorApplicationActions
                  vendorId={product._id}
                  approveApplication={() => onAction(product._id, "approve")}
                  rejectApplication={() => onAction(product._id, "reject")}
                />

                <PendingProductsDialog product={product} onAction={onAction} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default PendingProduct;
