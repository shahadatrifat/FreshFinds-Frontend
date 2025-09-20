import axiosInstance from "../Hooks/useAxiosInstance";

export const addProduct = (formData) => {
  return axiosInstance.post("/api/v1/product/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
