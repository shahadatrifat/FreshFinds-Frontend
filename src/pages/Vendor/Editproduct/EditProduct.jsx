import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import { useMutation } from "@tanstack/react-query";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { toast } from "react-hot-toast";
// import { updateProduct } from "../../../Services/productService"; // Your service to call the backend

const EditProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [productImage, setProductImage] = useState(null);
  const [preview, setPreview] = useState(null);

//   const { mutate } = useMutation({
//     mutationFn: updateProduct,
//     onSuccess: (data) => {
//       toast.success("Product updated successfully!");
//       reset();
//     },
//     onError: (error) => {
//       toast.error("Error updating product!", error?.message);
//     },
//   });

//   const onSubmit = async (data) => {
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("name", data.name);
//     formData.append("description", data.description);
//     formData.append("price", data.price);
//     formData.append("stock", data.stock);
//     formData.append("category", data.category);
//     formData.append("productImage", productImage);

//     mutate({ productId, formData });
//   };

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
    <div>
      <h1>Edit Product</h1>
      <form >
        <div>
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            type="text"
            {...register("name", { required: "Product name is required" })}
            placeholder="Product Name"
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            {...register("price", { required: "Price is required" })}
            placeholder="Price"
          />
          {errors.price && <span>{errors.price.message}</span>}
        </div>

        <div>
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            type="number"
            {...register("stock", { required: "Stock is required" })}
            placeholder="Stock"
          />
          {errors.stock && <span>{errors.stock.message}</span>}
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            type="text"
            {...register("category", { required: "Category is required" })}
            placeholder="Category"
          />
          {errors.category && <span>{errors.category.message}</span>}
        </div>

        <div>
          <Label htmlFor="productImage">Product Image</Label>
          <input
            id="productImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {preview && <img src={preview} alt="Image preview" />}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
