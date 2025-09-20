import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { useNavigate } from "react-router";
import { Camera } from "lucide-react";
import PageWrapper from "../../shared/PageWrapper/PageWrapper";
import ComboBoxResponsive from "../../../components/ui/ComboBoxResponsive";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import { addProduct } from "../../../Services/productService";
import Swal from "sweetalert2";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const [productImage, setProductImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const { user } = useAuth();
  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("category", data.category);
    formData.append("vendorId", user?.uid);

    if (productImage) {
      formData.append("productImage", productImage);
    }
    console.log("FormData before sending:", [...formData.entries()]);
    try {
      const response = await addProduct(formData);
      Swal.fire({
        icon: "success",
        title: "Product added successfully",
        text: "Your product is now under review and will be visible once approved.",
        showConfirmButton: false,
        timer: 1500,
      });

      console.log(`Product successfully:`, response.data);
      reset();
      setPreview(null);
      setProductImage(null);
      setSelectedCategory(null);

      // navigate("/vendor/dashboard");
    } catch (error) {
      const message = error.response?.data?.message || "Failed to add product";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Handle file change (product image)
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Please upload a valid image file!");
      return;
    }

    if (selectedFile.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB!");
      return;
    }

    setProductImage(selectedFile);
    const fileReader = new FileReader();
    fileReader.onloadend = () => setPreview(fileReader.result);
    fileReader.readAsDataURL(selectedFile);
  };

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto p-8 bg-beige backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100">
        {/* Heading */}
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
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Product Price */}
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
                {...register("price", { required: "Price is required" })}
                className="w-full mt-2 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                placeholder="Enter price"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Product Stock */}
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
                })}
                className="w-full mt-2 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                placeholder="Enter stock quantity"
              />
              {errors.stock && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.stock.message}
                </p>
              )}
            </div>

            {/* ComboBox Category */}
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
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>
              {selectedCategory === null && (
                <p className="text-red-500 text-sm mt-1">
                  Please select a category
                </p>
              )}
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
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
              })}
              className="w-full mt-2 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              placeholder="Describe the product in detail"
              rows="4"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Product Image Upload */}
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
                className="relative w-full max-w-lg flex items-center justify-center rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50 hover:bg-emerald-100 transition cursor-pointer"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Product Preview"
                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                    <Camera className="w-12 h-12 text-emerald-500 mb-4" />
                    <p className="text-lg">Click to upload product image</p>
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
              className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-emerald-700 text-beige font-semibold rounded-xl shadow-lg hover:shadow-emerald-400/50 hover:scale-105 transition-transform duration-300"
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
