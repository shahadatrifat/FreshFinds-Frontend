import React from "react";
import { CheckCircle, XCircle } from "lucide-react";


const VendorApplicationActions = ({
  vendorId,
  acceptApplication,
  rejectApplication,
}) => {
  return (
    <div className="flex gap-4">
      {/* Accept Button */}
      <button
        onClick={() => acceptApplication(vendorId)}
        className="px-6 py-3 bg-green-500 hover:bg-green-600 text-beige font-semibold rounded-lg shadow-md flex items-center gap-2 transition-all duration-300 ease-in-out"
      >
        <CheckCircle className="w-5 h-5" />
        Accept
      </button>
      {/* Reject Button */}
      <button
        onClick={() => rejectApplication(vendorId)}
        className="px-6 py-3 bg-red-500 hover:bg-red-600 text-beige font-semibold rounded-lg shadow-md flex items-center gap-2 transition-all duration-300 ease-in-out"
      >
        <XCircle className="w-5 h-5" />
        Reject
      </button>
    </div>
  );
};

export default VendorApplicationActions;
