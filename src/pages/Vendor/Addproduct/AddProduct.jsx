import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/ui/input"; // Customize as per your UI components
import { Label } from "../../../components/ui/label"; // Customize as per your UI components
import { useNavigate } from "react-router";
import { Camera } from "lucide-react"; // Icon for uploading image
import axiosInstance from "../../../Hooks/useAxiosInstance";
import PageWrapper from "../../shared/PageWrapper/PageWrapper";
import ComboBoxResponsive from "../../../components/ui/ComboBoxResponsive";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [productImage, setProductImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("category", data.category);

    if (productImage) {
      formData.append("productImage", productImage);
    }

    try {
      const response = await axiosInstance.post(
        "/api/v1/products/add",
        formData
      );
      console.log("Product added successfully", response.data);
      reset();
    //   navigate("/vendor/dashboard");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle file change (product image)
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setProductImage(selectedFile);
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreview(fileReader.result);
      fileReader.readAsDataURL(selectedFile);
    }
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
          <Label htmlFor="name" className="text-lg font-medium text-gray-700">
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
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Product Price */}
        <div className="form-group">
          <Label htmlFor="price" className="text-lg font-medium text-gray-700">
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
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Product Stock */}
        <div className="form-group">
          <Label htmlFor="stock" className="text-lg font-medium text-gray-700">
            Stock Quantity
          </Label>
          <Input
            id="stock"
            type="number"
            {...register("stock", { required: "Stock quantity is required" })}
            className="w-full mt-2 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            placeholder="Enter stock quantity"
          />
          {errors.stock && (
            <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>
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
          <select
            id="category"
            {...register("category", { required: "Category is required" })}
            className="w-full mt-2 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
          >
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="accessories">Accessories</option>
            <option value="beauty">Beauty</option>
            <option value="home">Home</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>
      </div>
      <ComboBoxResponsive></ComboBoxResponsive>

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
          disabled={loading}
          className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-emerald-400/50 hover:scale-105 transition-transform duration-300"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </div>
    </form>
  </div>
</PageWrapper>

  );
};

export default AddProduct;
