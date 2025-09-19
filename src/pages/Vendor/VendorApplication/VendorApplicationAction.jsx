import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../Hooks/useAxiosInstance";
import VendorApplicationActions from "../../../components/VendorApplicationActions/VendorApplicationActions";
import CartLoader from "../../../pages/shared/loaders/CartLoader";
import ApplicationDialog from "../../../components/VendorApplicationActions/ApplicationDialog";
import PageWrapper from "../../../pages/shared/PageWrapper/PageWrapper";
import toast from "react-hot-toast";

// Fetch function
const fetchVendorApplications = async () => {
  const { data } = await axiosInstance.get("/api/v1/vendor/applications");
  return data.data;
};

const VendorApplicationsTable = () => {
  const {
    data: applications,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["vendorApplications"],
    queryFn: fetchVendorApplications,
  });

  const { mutate: acceptMutate } = useMutation({
    mutationFn: (vendorId) =>
      axiosInstance.put("/api/v1/vendor/application", {
        applicationId: vendorId,
        action: "approve",
      }),
    onSuccess: () => refetch(),
    onError: (error) => {
      console.error("Error approving application:", error);
      toast.error("Error approving application. Please try again.");
    },
  });

  const { mutate: rejectMutate } = useMutation({
    mutationFn: (vendorId) =>
      axiosInstance.put("/api/v1/vendor/application", {
        applicationId: vendorId,
        action: "reject",
      }),
    onSuccess: () => refetch(),
    onError: (error) => {
      console.error("Error rejecting application:", error);
      toast.error("Error rejecting application. Please try again.");
    },
  });

  if (isLoading) return <CartLoader />;

  if (isError) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 font-semibold">
          Error loading applications. Please try again later.
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
  if (applications?.length === 0) {
    return (
      <div className="text-center mt-10">
        <p className="text-charcoal font-semibold">No applications found.</p>
      </div>
    );
  }
  return (
    <PageWrapper>
      <div className="bg-beige shadow-lg rounded-lg p-4 sm:p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Vendor Applications ({applications?.length || 0})
        </h2>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-beige text-emerald">
                <th className="px-4 py-2 text-center">Business Name</th>
                <th className="px-4 py-2 text-center">Vendor Name</th>
                <th className="px-4 py-2 text-center">Email</th>
                <th className="px-4 py-2 text-center">Phone</th>
                <th className="px-4 py-2 text-center">Location</th>
                <th className="px-4 py-2 text-center">Status</th>
                <th className="px-4 py-2 text-center">Overview</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications?.map((app) => (
                <tr key={app._id} className="border-b">
                  <td className="px-4 py-2 text-center">{app.businessName}</td>
                  <td className="px-4 py-2 text-center">{app.vendorName}</td>
                  <td className="px-4 py-2 text-center">{app.vendorEmail}</td>
                  <td className="px-4 py-2 text-center">{app.vendorPhone}</td>
                  <td className="px-4 py-2 text-center">
                    {app.marketLocation}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <span
                      className={`px-4 py-1 rounded-full text-beige text-sm capitalize ${
                        app.applicationStatus === "approved"
                          ? "bg-emerald"
                          : app.applicationStatus === "rejected"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {app.applicationStatus}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <ApplicationDialog application={app} />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <VendorApplicationActions
                      vendorId={app._id}
                      acceptApplication={() => acceptMutate(app._id)}
                      rejectApplication={() => rejectMutate(app._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 md:hidden">
          {applications?.map((app) => (
            <div
              key={app._id}
              className="bg-beige p-4 rounded-lg shadow border"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg">{app.businessName}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-beige text-xs capitalize ${
                    app.applicationStatus === "approved"
                      ? "bg-emerald"
                      : app.applicationStatus === "rejected"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {app.applicationStatus}
                </span>
              </div>

              <div className="text-sm text-charcoal space-y-1">
                <p>
                  <span className="font-medium">Vendor:</span> {app.vendorName}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {app.vendorEmail}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {app.vendorPhone}
                </p>
                <p>
                  <span className="font-medium">Location:</span>{" "}
                  {app.marketLocation}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <ApplicationDialog application={app} />
                <VendorApplicationActions
                  vendorId={app._id}
                  acceptApplication={() => acceptMutate(app._id)}
                  rejectApplication={() => rejectMutate(app._1d)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default VendorApplicationsTable;
