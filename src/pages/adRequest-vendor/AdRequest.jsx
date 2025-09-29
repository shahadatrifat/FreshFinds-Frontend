import React from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { requestAd } from "../../Services/productService";
import useAuth from "../../Hooks/useAuth";
import { Input } from "../../components/ui/input"; 
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";

const AdRequestForm = ({ defaultProductId = "" }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productId: defaultProductId,
      bannerImage: "",
      startDate: "",
      endDate: "",
      notes: "",
      title: "",
    },
  });

  const [loading, setLoading] = React.useState(false);
  const { user } = useAuth();

  const onSubmit = async (data) => {
    const { productId, bannerImage, startDate, endDate, notes, title } = data;
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      toast.error("Start date cannot be after end date.");
      return;
    }
    if (end < new Date()) {
      toast.error("End date must be in the future.");
      return;
    }

    setLoading(true);
    try {
      
      const payload = {
        productId,
        bannerImage,
        startDate,
        endDate,
        notes: notes || undefined,
        title,
        userId: user?.uid,
      };

      // Send the data to the backend
      const res = await requestAd(payload);
      toast.success("Ad request submitted — awaiting admin approval.");
      reset(); 
    } catch (err) {
      console.error("Ad request error:", err);
      toast.error(err?.response?.data?.message || err.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg bg-offwhite p-6 rounded-xl shadow-lg space-y-6"
      >
        {/* Header Section */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-emerald-700">Ad Request Form</h1>
          <p className="text-gray-600 text-sm mt-2">
            Submit a request for your advertisement with the details below.
          </p>
        </div>

        {/* Product ID */}
        <div>
          <Label htmlFor="productId">Product ID</Label>
          <Input
            id="productId"
            {...register("productId", { required: "Product ID is required." })}
            placeholder="Product ID that this ad links to"
            error={errors.productId?.message}
          />
        </div>

        {/* Ad Title */}
        <div>
          <Label htmlFor="title">Ad Title</Label>
          <Input
            id="title"
            {...register("title", { required: "Ad title is required." })}
            placeholder="Enter the ad title"
            error={errors.title?.message}
          />
        </div>

        {/* Ad Image URL */}
        <div>
          <Label htmlFor="bannerImage">Ad Image URL</Label>
          <Input
            id="bannerImage"
            {...register("bannerImage", { required: "Ad image URL is required." })}
            placeholder="https://..."
            error={errors.bannerImage?.message}
          />
        </div>

        {/* Start and End Date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              {...register("startDate", { required: "Start date is required." })}
              error={errors.startDate?.message}
            />
          </div>
          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              {...register("endDate", { required: "End date is required." })}
              error={errors.endDate?.message}
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <Label htmlFor="notes">Notes (optional)</Label>
          <Textarea
            id="notes"
            {...register("notes")}
            placeholder="Anything the admin should know (target audience, promo text, etc.)"
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between gap-3">
          <Button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 text-beige py-3 rounded-lg font-semibold hover:scale-102 transition-transform disabled:opacity-60"
          >
            {loading ? "Submitting…" : "Submit Ad Request"}
          </Button>

          <Button
            type="button"
            onClick={() => reset()}
            className="px-4 py-2 border bg-beige hover:bg-emerald-100 rounded-lg text-emerald-700"
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdRequestForm;
