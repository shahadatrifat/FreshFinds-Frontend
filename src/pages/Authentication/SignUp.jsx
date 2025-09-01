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
import useAuth from "../../Hooks/useAuth";
import GoogleLogin from "./SocialAuth/googleLogin";

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
  const { createUser } = useAuth();

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form submitted successfully", data, file);
    createUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);
      })
      .catch((err) => {
        console.log(err);
      });
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
                  <GoogleLogin></GoogleLogin>
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
                          {...register("password", {
                            required: "Password is required",
                            minLength: {
                              value: 6,
                              message:
                                "Password must be at least 6 characters long",
                            },
                          })}
                          className="w-full px-4 py-2 rounded-md border border-emerald-600 dark:border-neutral-700 bg-beige dark:bg-neutral-800/80 placeholder-neutral-400 dark:placeholder-neutral-500"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {/* Eye Icon to toggle password visibility */}
                        <div
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5 text-emerald" />
                          ) : (
                            <Eye className="w-5 h-5 text-emerald" />
                          )}
                        </div>
                      </div>
                      {errors.password && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    {/* Confirm Password */}
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        {...register("confirmPassword", {
                          required: "Confirm password is required",
                          validate: (value) =>
                            value === password || "Passwords do not match",
                        })}
                        className="w-full px-4 py-2 rounded-md border border-emerald-600 dark:border-neutral-700 bg-beige dark:bg-neutral-800/80 placeholder-neutral-400 dark:placeholder-neutral-500"
                      />
                      {errors.confirmPassword && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.confirmPassword.message}
                        </p>
                      )}
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
