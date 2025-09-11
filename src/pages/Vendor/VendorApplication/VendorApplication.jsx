import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router"; // For navigation after form submission
import axiosInstance from "../../../Hooks/useAxiosInstance"; // Axios instance for API calls
import { motion } from "framer-motion";

import VendorApplicationForm from "./VendorApplicationForm";
import strawberries from "../../../assets/strawberries.jpg";
import avocado from "../../../assets/avocado.jpg";
import Container from "../../shared/Container";
import useAuth from "../../../Hooks/useAuth";
import axios from "axios";

const VendorApplication = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const { setLoading, loading, user } = useAuth();
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreview(fileReader.result);
      };
      fileReader.readAsDataURL(selectedFile);
    }
  };
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Prepare FormData
      const formData = new FormData();
      formData.append("businessName", data.businessName);
      formData.append("marketLocation", data.marketLocation);
      formData.append("marketDescription", data.marketDescription);
      formData.append("vendorPhone", data.vendorPhone);

      if (file) {
        formData.append("coverPhoto", file); // This is your image file
      }
      // Send POST request
      const idToken = await user.getIdToken();
      console.log("id token", idToken);
      const response = await axios.post(
        "/api/v1/vendor/apply",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
             Authorization: `Bearer ${idToken}`, 

          },
        }
      );

      console.log("Vendor Application Submitted:", response);

      reset();
      navigate("/dashboard");
      alert("Your vendor application has been submitted successfully!");
    } catch (error) {
      console.error("Error submitting application:", error);
      alert(
        "There was an error submitting your application. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* Bottom-left Image */}
      <motion.div
        className="absolute top-5 left-5 z-0 transform rotate-20"
        animate={{
          y: [0, 5, 0], // Bouncing effect
          rotate: [0, 5, 0], // Small rotation to make it dynamic
        }}
        transition={{
          duration: 5, // Duration of the animation cycle
          repeat: Infinity, // Loop the animation
          repeatType: "loop", // Loop it infinitely
          ease: "easeInOut", // Smooth easing
        }}
      >
        <img
          src={strawberries}
          alt="Top Image"
          className="w-50 h-50 object-contain"
        />
      </motion.div>

      {/* Top-right Image */}
      <motion.div
        className="absolute bottom-7 right-5 z-0 transform rotate-20"
        animate={{
          y: [0, 5, 0], // Bouncing effect
          rotate: [0, 5, 0], // Small rotation to add more dynamic motion
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        <img
          src={avocado}
          alt="Bottom Image"
          className="w-50 h-50 object-contain"
        />
      </motion.div>

      <Container>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10">
          <VendorApplicationForm
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            loading={loading}
            onSubmit={onSubmit}
            preview={preview}
            file={file}
            handleFileChange={handleFileChange}
          />
        </div>
      </Container>
    </div>
  );
};

export default VendorApplication;
