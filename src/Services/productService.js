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
export const fetchPublicProducts = async ({ category }) => {
  const response = await axiosInstance.get("/api/v1/product/public", {
    params: { category },
  });
  console.log("Public products fetched successfully:", response.data);
  return response.data;
};

// fetch product by id
export const fetchProductById = async (productId) => {
  const response = await axiosInstance.get(`/api/v1/product/${productId}`);
  return response.data;
};
export const getUserOrders = async (userId) => {
  try {
    const { data } = await axiosInstance.get(`/api/v1/user/orders/${userId}`);
    return data;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
};
export const getUserProfile = async (uid) => {
  try {
    const { data } = await axiosInstance.get(`/api/v1/user/profile/${uid}`);
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch profile");
  }
};
// Update user profile
export const updateUserProfile = async (userId, updates) => {
  const { data } = await axiosInstance.put(
    `/api/v1/user/update/${userId}`,
    updates
  );
  return data;
};


// AD SECTION
export const requestAd = async (adData) => {
  const response = await axiosInstance.post("/api/v1/ad/request", adData);
  return response.data;
};
export const fetchPendingAds = async () => {
  const res = await axiosInstance.get("/api/v1/ad/pending");
  return res.data.data;
};
export const approveAdRequest = async (adId) => {
  const res = await axiosInstance.patch(`/api/v1/ad/${adId}/approve`);
  return res.data;
};

export const rejectAdRequest = async (adId) => {
  const res = await axiosInstance.patch(`/api/v1/ad/${adId}/reject`);
  return res.data;
};
export const fetchActiveAds = async () => {
  const res = await axiosInstance.get("/api/v1/ad/active");
  console.log("Active ads fetched successfully:", res.data);
  return res.data;
};