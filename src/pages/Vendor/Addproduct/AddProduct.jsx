import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { useNavigate } from "react-router";
import { Camera, X } from "lucide-react";
import PageWrapper from "../../shared/PageWrapper/PageWrapper";
import ComboBoxResponsive from "../../../components/ui/ComboBoxResponsive";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import { addProduct } from "../../../Services/productService";
import Swal from "sweetalert2";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm();

  const [productImage, setProductImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const { user } = useAuth();

  const productName = watch("name", "");

  const onSubmit = async (data) => {
    setLoading(true);

    if (!selectedCategory) {
      toast.error("Please select a category");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("category", data.category || selectedCategory.value);
      // send firebase uid (or vendor id as you handle on backend)
      formData.append("vendorId", user?.uid || "");

      if (productImage) {
        formData.append("productImage", productImage);
      }

      // Debug log (remove in production)
      // console.log("FormData entries:", [...formData.entries()]);

      const response = await addProduct(formData);

      Swal.fire({
        icon: "success",
        title: "Product added",
        text: "Your product is now under review and will appear once approved.",
        showConfirmButton: false,
        timer: 1500,
      });

      // Reset form
      reset();
      setPreview(null);
      setProductImage(null);
      setSelectedCategory(null);

      // You can navigate to vendor dashboard or product list if desired
      // navigate("/vendor/dashboard");
    } catch (error) {
      const message = error.response?.data?.message || "Failed to add product";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate type
    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Please upload an image file (jpg, png, etc.)");
      return;
    }

    // Validate size
    if (selectedFile.size > MAX_IMAGE_SIZE) {
      toast.error("Image is too large. Max size is 5MB.");
      return;
    }

    setProductImage(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const removeImage = (e) => {
    e.stopPropagation();
    setProductImage(null);
    setPreview(null);
    // reset file input value if you keep a ref; here hidden input will be replaced on next selection
  };

  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto p-8 bg-beige backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100">
        <h1 className="text-4xl font-extrabold text-emerald-700 mb-8 text-center">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Name */}
            <div className="form-group">
              <Label
                htmlFor="name"
                className="text-lg font-medium text-gray-700"
              >
                Product Name
              </Label>
              <Input
                id="name"
                type="text"
                {...register("name", { required: "Product name is required" })}
                className="w-full mt-2 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                placeholder="Enter product name"
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="form-group">
              <Label
                htmlFor="price"
                className="text-lg font-medium text-gray-700"
              >
                Price
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 0, message: "Price must be non-negative" },
                })}
                className="w-full mt-2 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                placeholder="Enter price"
                aria-invalid={!!errors.price}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Stock */}
            <div className="form-group">
              <Label
                htmlFor="stock"
                className="text-lg font-medium text-gray-700"
              >
                Stock Quantity
              </Label>
              <Input
                id="stock"
                type="number"
                {...register("stock", {
                  required: "Stock quantity is required",
                  min: { value: 0, message: "Stock must be non-negative" },
                })}
                className="w-full mt-2 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                placeholder="Enter stock quantity"
                aria-invalid={!!errors.stock}
              />
              {errors.stock && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.stock.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div className="form-group">
              <Label
                htmlFor="category"
                className="text-lg font-medium text-gray-700"
              >
                Category
              </Label>
              <div className="mt-2">
                <ComboBoxResponsive
                  value={selectedCategory}
                  onChange={(category) => {
                    setSelectedCategory(category);
                    setValue("category", category?.value);
                  }}
                />
                {(!selectedCategory || !selectedCategory.value) && (
                  <p className="text-red-500 text-sm mt-1">
                    Please select a category
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <Label
              htmlFor="description"
              className="text-lg font-medium text-gray-700"
            >
              Description
            </Label>
            <textarea
              id="description"
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Description should be at least 10 characters",
                },
              })}
              className="w-full mt-2 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              placeholder="Describe the product in detail"
              rows="4"
              aria-invalid={!!errors.description}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Product Image Upload (tall preview) */}
          <div className="form-group">
            <Label
              htmlFor="productImage"
              className="text-lg font-medium text-gray-700"
            >
              Product Image
            </Label>

            <div className="mt-4 flex justify-center">
              <label
                htmlFor="productImage"
                className="relative w-full max-w-[400px] mx-auto flex items-center justify-center rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50 hover:bg-emerald-100 transition cursor-pointer overflow-hidden"
                aria-label="Upload product image"
                title="Click to upload product image"
              >
                {/* Tall responsive preview */}
                {preview ? (
                  <>
                    <img
                      src={preview}
                      alt={productName || "Product Preview"}
                      className="w-full h-[60vh] md:h-[48vh] lg:h-[56vh] object-cover object-center rounded-xl shadow-lg"
                      loading="lazy"
                    />
                    {/* Caption overlay */}
                    {productName && (
                      <div className="absolute left-4 bottom-4 bg-black/40 px-4 py-2 rounded backdrop-blur-sm">
                        <p className="text-beige font-semibold truncate max-w-[70vw]">
                          {productName}
                        </p>
                      </div>
                    )}
                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-4 right-4 z-50 bg-offwhite/70 p-2 rounded-full shadow hover:bg-offwhite transition"
                      aria-label="Remove image"
                    >
                      <X className="w-4 h-4 text-gray-800" />
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                    <Camera className="w-12 h-12 text-emerald-500 mb-4" />
                    <p className="text-lg">Click to upload product image</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Recommended: tall/portrait images; max 5MB
                    </p>
                  </div>
                )}

                <input
                  id="productImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-group text-center">
            <button
              type="submit"
              disabled={loading || !selectedCategory}
              className={`px-10 py-4 ${
                loading
                  ? "bg-emerald-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-500 to-emerald-700 hover:scale-105"
              } text-beige font-semibold rounded-xl shadow-lg transition-transform duration-300`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-beige"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Adding...
                </span>
              ) : (
                "Add Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </PageWrapper>
  );
};

export default AddProduct;
