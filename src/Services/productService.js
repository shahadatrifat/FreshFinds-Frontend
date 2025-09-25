import axiosInstance from "../Hooks/useAxiosInstance";
const authHeader = (firebaseUid) => ({
  headers: { Authorization: `Bearer ${firebaseUid}` },
});
export const addProduct = (formData) => {
  return axiosInstance.post("/api/v1/product/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const fetchVendorProducts = async (firebaseUserId) => {
  try {
    const response = await axiosInstance.get("/api/v1/product/my-products", {
      headers: {
        Authorization: `Bearer ${firebaseUserId}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching products:",
      error.response?.data || error.message
    );
    throw error;
  }
};
// Fetch only approved products of a specific vendor
export const fetchApprovedVendorProducts = async (firebaseUserId) => {
  try {
    const response = await axiosInstance.get("/api/v1/product/approved", {
      headers: {
        Authorization: `Bearer ${firebaseUserId}`, // Send UID as Bearer token
      },
    });

    console.log("Approved products fetched successfully:", response.data.data);
    return response.data.data; // Return only approved products
  } catch (error) {
    console.log(
      "Error fetching approved products:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Mark a product as out of stock
export const markProductOutOfStock = async (productId) => {
  try {
    const response = await axiosInstance.put(
      `/api/v1/product/out-of-stock/${productId}` // ✅ correct route
    );
    console.log("Out of stock response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error marking product as out of stock:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Mark a product as active
export const markProductActive = async (productId) => {
  const res = await axiosInstance.put(`/api/v1/product/activate/${productId}`);
  return res.data;
};
// services/productService.js
export const deleteProduct = async (productId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/v1/product/delete/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting product:",
      error.response?.data || error.message
    );
    throw error;
  }
};
// updateProductPrice
export const updateProductPrice = async (productId, price, firebaseUid) => {
  const response = await axiosInstance.put(
    `/api/v1/product/price/${productId}`,
    { price },
    authHeader(firebaseUid)
  );
  return response.data;
};
// Fetch public products with pagination and optional category filter
export const fetchPublicProducts = async ({
  category,
  
}) => {
  const response = await axiosInstance.get("/api/v1/product/public", {
    params: { category },
  });
  return response.data;
};

// fetch product by id 
export const fetchProductById = async (productId) => {
  const response = await axiosInstance.get(`/api/v1/product/${productId}`);
  return response.data;
};
