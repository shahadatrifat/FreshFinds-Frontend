import React from "react";
import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

  if (isLoading) return <CartLoaderFull />;
  if (isError) return <p className="text-red-500">Failed to fetch pending ads.</p>;

  return (
    <div className="p-6 bg-offwhite rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-emerald-700">Pending Ad Requests</h2>
      {data?.length === 0 ? (
        <p className="text-gray-500 text-center">No pending ads at the moment.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse table-auto rounded-lg">
            <thead className="bg-emerald-600 text-beige text-left">
              <tr>
                <th className="p-4 border-b border-gray-200">Image</th>
                <th className="p-4 border-b border-gray-200">Product</th>
                <th className="p-4 border-b border-gray-200">Vendor</th>
                <th className="p-4 border-b border-gray-200">Start</th>
                <th className="p-4 border-b border-gray-200">End</th>
                <th className="p-4 border-b border-gray-200 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((ad) => (
                <tr key={ad._id} className="hover:bg-gray-50 transition-all duration-300">
                  <td className="p-3">
                    <img
                      src={ad.Image}
                      alt="Ad"
                      className="h-16 w-24 object-cover rounded-md shadow-sm"
                      loading="lazy"
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
                  <td className="p-3 text-center">
                    <div className="flex gap-3 justify-center">
                      <Button
                        onClick={() => approveMutation.mutate(ad._id)}
                        disabled={approveMutation.isPending}
                        variant="destructive"
                        className="px-4 py-2 rounded-md text-sm font-medium bg-emerald-600 hover:bg-emerald-700"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => rejectMutation.mutate(ad._id)}
                        disabled={rejectMutation.isPending}
                        variant="outline"
                        className="px-4 py-2 rounded-md text-sm font-medium border border-gray-300 hover:bg-red-600 hover:text-white"
                      >
                        Reject
                      </Button>
                    </div>
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
