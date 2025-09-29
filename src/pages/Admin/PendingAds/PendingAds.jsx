import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  fetchPendingAds,
  approveAdRequest,
  rejectAdRequest,
} from "../../../Services/productService";
import { Button } from "../../../components/ui/button";
import CartLoaderFull from "../../shared/loaders/CartLoaderFull";

const PendingAds = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pendingAds"],
    queryFn: fetchPendingAds,
    staleTime: 1000 * 60 * 5,
  });

  const approveMutation = useMutation({
    mutationFn: approveAdRequest,
    onSuccess: () => {
      toast.success("Ad approved successfully!");
      queryClient.invalidateQueries(["pendingAds"]);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: rejectAdRequest,
    onSuccess: () => {
      toast.success("Ad rejected successfully!");
      queryClient.invalidateQueries(["pendingAds"]);
    },
  });

  if (isLoading) return <CartLoaderFull></CartLoaderFull>;
  if (isError) return <p className="text-red-500">Failed to fetch pending ads.</p>;

  return (
    <div className="p-6 bg-offwhite rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-charcoal">Pending Ad Requests</h2>
      {data?.length === 0 ? (
        <p className="text-gray-500">No pending ads at the moment.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-emerald-600 text-beige">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-left">Vendor</th>
                <th className="p-3 text-left">Start</th>
                <th className="p-3 text-left">End</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((ad) => (
                <tr key={ad._id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3">
                    <img
                      src={ad.Image}
                      alt="Ad"
                      className="h-16 w-24 object-cover rounded-md border"
                    />
                  </td>
                  <td className="p-3">
                    <p className="font-semibold">{ad.product.name}</p>
                    <span className="text-sm text-gray-500">
                      ${ad.product.price.toFixed(2)}
                    </span>
                  </td>
                  <td className="p-3">
                    <p>{ad.vendor.name}</p>
                    <span className="text-sm text-gray-500">{ad.vendor.email}</span>
                  </td>
                  <td className="p-3">{new Date(ad.startDate).toLocaleDateString()}</td>
                  <td className="p-3">{new Date(ad.endDate).toLocaleDateString()}</td>
                  <td className="p-3 flex gap-2">
                    <Button
                      className="bg-emerald-600 hover:bg-emerald-700 text-beige px-3 py-1 rounded-md"
                      onClick={() => approveMutation.mutate(ad._id)}
                      disabled={approveMutation.isPending}
                    >
                      Approve
                    </Button>
                    <Button
                      className="bg-red-600 hover:bg-red-700 text-beige px-3 py-1 rounded-md"
                      onClick={() => rejectMutation.mutate(ad._id)}
                      disabled={rejectMutation.isPending}
                    >
                      Reject
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingAds;
