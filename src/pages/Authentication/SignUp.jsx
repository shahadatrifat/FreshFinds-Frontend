import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowRight, Camera, Eye, EyeOff, Merge } from "lucide-react";
import { Input } from "../../components/ui/input"; 
import { Label } from "../../components/ui/label"; 
import {
  TextureCardContent,
  TextureCardFooter,
  TextureCardHeader,
  TextureCardStyled,
  TextureCardTitle,
  TextureSeparator,
} from "../../components/ui/texture-card";
import { Link } from "react-router";  
import "../../index.css";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [password, setPassword] = useState("");
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form submitted successfully", data, file, preview);
    // You can handle the file upload here
  };

  // Handle file change
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

  return (
    <div className="flex items-center  justify-center ">
      <div className="dark:bg-stone-950 h-full rounded-md max-w-3xl w-full">
        <div className="items-start justify-center gap-5 rounded-lg  md:p-8 grid grid-cols-1">
          <div className="col-span-1 grid items-start gap-5 lg:col-span-1">
            <div>
              <TextureCardStyled>
                <TextureCardHeader className="flex flex-col gap-1 items-center justify-center p-6">
                  <TextureCardTitle>Create your account</TextureCardTitle>
                  <p className="text-center">
                    Welcome! Please fill in the details to get started.
                  </p>
                </TextureCardHeader>
                <TextureSeparator />
                <TextureCardContent>
                  <div className="flex justify-center gap-2 mb-2">
                    <button
                      variant="icon"
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald text-white rounded-lg shadow-lg hover:bg-gold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                      {/* Google Icon */}
                      <svg
                        width="256"
                        height="262"
                        viewBox="0 0 256 262"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="xMidYMid"
                        className="h-5 w-5"
                      >
                        <path
                          d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                          fill="#4285F4"
                        />
                        <path
                          d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                          fill="#34A853"
                        />
                        <path
                          d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                          fill="#FBBC05"
                        />
                        <path
                          d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                          fill="#EB4335"
                        />
                      </svg>
                      <span className="pl-2 text-beige font-semibold ">Google</span>
                    </button>
                  </div>
                  <div className="text-center text-sm mb-2">or</div>

                  {/* Signup Form */}
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                  >
                    {/* Profile Picture Upload */}
                    <div className="flex justify-center gap-4 ">
                      {/* Image Preview or Default Avatar */}
                      <label
                        htmlFor="profilePic"
                        className="cursor-pointer relative"
                      >
                        {preview ? (
                          <img
                            src={preview}
                            alt="Profile Preview"
                            className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-emerald mb-4 transition-transform transform hover:scale-105"
                          />
                        ) : (
                          <div className="w-32 h-32 rounded-full bg-beige flex items-center justify-center shadow-lg border-2 border-emerald-600 mb-4">
                            {/* Default Avatar */}
                            <span className="text-3xl text-emerald">+</span>
                          </div>
                        )}
                        {/* Camera Icon placed on top of Avatar */}
                        <div className="absolute bottom-1 right-1 bg-beige p-2 rounded-full shadow-lg">
                          <Camera className="w-6 h-6 text-emerald" />
                        </div>

                        {/* Hidden file input */}
                        <input
                          id="profilePic"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                    {/* First Name */}
                    <div className="flex justify-start gap-2">
                      <div>
                        <Label htmlFor="first">First name</Label>
                        <Input
                          id="first"
                          type="text"
                          {...register("firstName", {
                            required: "First name is required",
                          })}
                          className="w-full px-4 py-2 rounded-md border border-emerald-600 dark:border-neutral-700 bg-beige dark:bg-neutral-800/80 placeholder-emerald dark:placeholder-neutral-500"
                        />
                        {errors.firstName && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                      {/* Last Name */}
                      <div>
                        <Label htmlFor="last">Last Name</Label>
                        <Input
                          id="last"
                          type="text"
                          {...register("lastName", {
                            required: "Last name is required",
                          })}
                          className="w-full px-4 py-2 rounded-md border border-emerald-600 dark:border-neutral-700 bg-beige dark:bg-neutral-800/80 placeholder-neutral-400 dark:placeholder-neutral-500"
                        />
                        {errors.lastName && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* Email */}
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Enter a valid email",
                          },
                        })}
                        className="w-full px-4 py-2 rounded-md border border-emerald-600 dark:border-neutral-700 bg-beige dark:bg-neutral-800/80 placeholder-neutral-400 dark:placeholder-neutral-500"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                   {/* Password */}
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"} 
                          {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } })}
                          className="w-full px-4 py-2 rounded-md border border-emerald-600 dark:border-neutral-700 bg-beige dark:bg-neutral-800/80 placeholder-neutral-400 dark:placeholder-neutral-500"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {/* Eye Icon to toggle password visibility */}
                        <div
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-5 h-5 text-emerald" /> : <Eye className="w-5 h-5 text-emerald" />}
                        </div>
                      </div>
                      {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
                    </div>
                    {/* Confirm Password */}
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        {...register("confirmPassword", { required: "Confirm password is required", validate: (value) => value === password || "Passwords do not match" })}
                        className="w-full px-4 py-2 rounded-md border border-emerald-600 dark:border-neutral-700 bg-beige dark:bg-neutral-800/80 placeholder-neutral-400 dark:placeholder-neutral-500"
                      />
                      {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>}
                    </div>

                    <button
                      type="submit"
                      aria-label="Submit form"
                      className="w-full py-3 bg-emerald text-beige font-semibold rounded-lg shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      Continue
                      <ArrowRight className="h-5 w-5 text-beige mt-[1px] transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </form>

                  {/* Link to Login Page */}
                  <div className="text-center text-sm mt-4">
                    <p>
                      Already have an account?{" "}
                      <Link
                        to="/signin"
                        className="text-emerald-600 hover:underline hover:text-emerald-700 font-semibold"
                      >
                        SignIn here
                      </Link>
                    </p>
                  </div>
                </TextureCardContent>
                <TextureSeparator />
              </TextureCardStyled>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
