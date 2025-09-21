import axiosInstance from "../Hooks/useAxiosInstance";

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
    console.error("Error fetching products:", error.response?.data || error.message);
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
    console.log("Error fetching approved products:", error.response?.data || error.message);
    throw error;
  }
};



