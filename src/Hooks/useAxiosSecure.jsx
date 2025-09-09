import React from "react";
import axios from "axios";

// Create an Axios instance for protected routes (with Authorization)
const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json", // Set the default content type
  },
});

// Add a request interceptor to include the JWT token in headers
axiosSecure.interceptors.request.use(
  (config) => {
    // Get the token from localStorage (or cookies)
    const token = localStorage.getItem("accessToken"); // Or use a secure cookie library

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Attach token to request header
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const useAxiosSecure = () => {
  return axiosSecure;
};
