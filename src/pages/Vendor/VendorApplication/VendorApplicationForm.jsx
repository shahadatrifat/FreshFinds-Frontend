import React, { useRef } from "react";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { Camera } from "lucide-react";

const VendorApplicationForm = ({
  register,
  handleSubmit,
  errors,
  loading,
  onSubmit,
  preview,
  handleFileChange,
}) => {
  // Use ref to programmatically open the file picker
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click(); // Opens the file picker
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-beige shadow-lg rounded-lg">
      {/* Main content */}
      <h2 className="text-center text-3xl font-bold text-charcoal mb-8">
        Apply to Become a Vendor
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Business Cover Photo */}
        <div className="form-group">
          <Label
            htmlFor="coverPhoto"
            className="block text-sm font-medium text-charcoal mb-2"
          >
            Business Cover Photo
          </Label>

          <div
            onClick={handleClick} // Manually trigger the file input
            className="relative w-full h-48 border-2 border-dashed border-emerald-500 rounded-lg overflow-hidden bg-beige cursor-pointer group"
          >
            {preview ? (
              <>
                {/* Show the image if preview exists */}
                <img
                  src={preview}
                  alt="Cover Preview"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Hover overlay only when preview exists */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <p className="text-emerald text-sm font-medium">
                    Click to Change Photo
                  </p>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-emerald-600">
                <Camera className="w-8 h-8 mb-2" />
                <p className="text-emerald text-sm font-medium mt-1">
                  Click to Upload Photo
                </p>
              </div>
            )}

            {/* Hidden file input */}
            <input
              id="coverPhoto"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />
          </div>
        </div>

        {/* Business Name */}
        <div className="form-group">
          <Label
            htmlFor="businessName"
            className="text-sm font-medium text-charcoal"
          >
            Business Name
          </Label>
          <Input
            id="businessName"
            type="text"
            placeholder="Enter your business name"
            autoComplete="organization"
            {...register("businessName", {
              required: "Business name is required",
            })}
            className={`w-full px-6 py-3 border rounded-lg text-charcoal focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              errors.businessName ? "border-red-500" : "border-emerald-500"
            }`}
          />
          {errors.businessName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.businessName.message}
            </p>
          )}
        </div>

        {/* Market Location */}
        <div className="form-group">
          <Label
            htmlFor="marketLocation"
            className="text-sm font-medium text-charcoal"
          >
            Market Location
          </Label>
          <Input
            id="marketLocation"
            type="text"
            placeholder="Where is your market located?"
            {...register("marketLocation", {
              required: "Market location is required",
            })}
            className={`w-full px-6 py-3 border rounded-lg text-charcoal focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              errors.marketLocation ? "border-red-500" : "border-emerald-500"
            }`}
          />
          {errors.marketLocation && (
            <p className="text-red-500 text-sm mt-1">
              {errors.marketLocation.message}
            </p>
          )}
        </div>

        {/* Market Description */}
        <div className="form-group">
          <Label
            htmlFor="marketDescription"
            className="text-sm font-medium text-charcoal"
          >
            Market Description
          </Label>
          <Textarea
            id="marketDescription"
            placeholder="Tell us about your market..."
            {...register("marketDescription", {
              required: "Market description is required",
              minLength: {
                value: 20,
                message: "Description should be at least 20 characters long",
              },
            })}
            className={`w-full p-6 border rounded-lg text-charcoal focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none ${
              errors.marketDescription ? "border-red-500" : "border-emerald-500"
            }`}
            rows={4}
          />
          {errors.marketDescription && (
            <p className="text-red-500 text-sm mt-1">
              {errors.marketDescription.message}
            </p>
          )}
        </div>

        {/* Vendor Phone */}
        <div className="form-group">
          <Label
            htmlFor="vendorPhone"
            className="text-sm font-medium text-charcoal"
          >
            Vendor Phone Number
          </Label>
          <Input
            id="vendorPhone"
            type="tel"
            placeholder="e.g., +8801234567890"
            autoComplete="tel"
            {...register("vendorPhone", {
              required: "Phone number is required",
              pattern: {
                value: /^\+?[0-9]{10,15}$/,
                message: "Enter a valid phone number",
              },
            })}
            className={`w-full px-6 py-3 border rounded-lg text-charcoal focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              errors.vendorPhone ? "border-red-500" : "border-emerald-500"
            }`}
          />
          {errors.vendorPhone && (
            <p className="text-red-500 text-sm mt-1">
              {errors.vendorPhone.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="form-group text-center">
          <button
            type="submit"
            className={`w-full py-3 font-semibold rounded-lg shadow-lg transition-all duration-300 ${
              loading
                ? "bg-beige cursor-not-allowed"
                : "bg-emerald text-beige hover:bg-emerald-700"
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VendorApplicationForm;
