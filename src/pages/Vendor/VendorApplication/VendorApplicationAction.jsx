import React, { useState } from "react";
import axiosInstance from "../../../Hooks/useAxiosInstance"; // Axios instance for API calls
import { CheckCircle, XCircle } from "lucide-react"; // Icons for Accept and Reject

const VendorApplicationActions = ({ vendorId, refreshData }) => {
  const [loading, setLoading] = useState(false); // State to handle loading during API calls

  const handleAccept = async () => {
    setLoading(true);
    try {
      // Send API request to accept the vendor application
      const response = await axiosInstance.put(`/api/v1/vendor/${vendorId}/accept`);
      console.log(response.data.message);
      refreshData(); // Refresh data to show updated status
    } catch (error) {
      console.error("Error accepting application:", error);
      alert("Error accepting vendor application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    setLoading(true);
    try {
      // Send API request to reject the vendor application
      const response = await axiosInstance.put(`/api/v1/vendor/${vendorId}/reject`);
      console.log(response.data.message);
      refreshData(); // Refresh data to show updated status
    } catch (error) {
      console.error("Error rejecting application:", error);
      alert("Error rejecting vendor application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4">
      {/* Accept Button */}
      <button
        onClick={handleAccept}
        disabled={loading}
        className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md flex items-center gap-2 transition-all duration-300 ease-in-out disabled:opacity-50"
      >
        <CheckCircle className="w-5 h-5" />
        Accept
      </button>

      {/* Reject Button */}
      <button
        onClick={handleReject}
        disabled={loading}
        className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md flex items-center gap-2 transition-all duration-300 ease-in-out disabled:opacity-50"
      >
        <XCircle className="w-5 h-5" />
        Reject
      </button>
    </div>
  );
};

export default VendorApplicationActions;
