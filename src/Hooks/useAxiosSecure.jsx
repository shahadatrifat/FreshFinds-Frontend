import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ Your backend base URL
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Request interceptor to add Firebase token
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
          console.log("🔑 Sending token:", user.accessToken);
        } else {
          console.warn("⚠️ No access token found in request");
        }

        if (user?.uid) {
          config.headers["X-User-ID"] = user.uid; // Optional custom header
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // ✅ Response interceptor for errors
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      (error) => {
        const status = error.response?.status;
        if (status === 403) {
          navigate("/forbidden");
        } else if (status === 401) {
          logOut()
            .then(() => {
              navigate("/login");
            })
            .catch(() => {});
        }
        return Promise.reject(error);
      }
    );

    // ✅ Cleanup interceptors when component unmounts or user changes
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut, navigate]); // re-run when user changes

  return axiosSecure;
};

export default useAxiosSecure;
