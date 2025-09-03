import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
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
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import GoogleLogin from "./SocialAuth/googleLogin";


const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form submitted successfully", data);
    signInUser(data.email, data.password)
      .then((res) => {
        navigate(from, { replace: true });
        reset();
        console.log(res.user);
      })
      .catch((err) => {
        console.log(err);
      });

  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="h-full rounded-md max-w-3xl w-full">
        <div className="items-start justify-center gap-5 rounded-lg md:p-8 grid grid-cols-1">
          <div className="col-span-1 grid items-start gap-5 lg:col-span-1">
            <div>
              <TextureCardStyled>
                <TextureCardHeader className="flex flex-col gap-1 items-center justify-center p-6">
                  <TextureCardTitle>Sign In</TextureCardTitle>
                  <p className="text-center">
                    Welcome back! Please sign in to your account.
                  </p>
                </TextureCardHeader>
                <TextureSeparator />
                <TextureCardContent>
                  <GoogleLogin></GoogleLogin>
                  <div className="text-center text-sm mb-2">or</div>
                  {/* Sign In Form */}
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-6"
                  >
                    {/* Email Field */}
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
                          className="w-full px-4 py-2 rounded-md border border-emerald-600 dark:border-neutral-700 bg-beige dark:bg-neutral-800/80 placeholder-emerald-600 dark:placeholder-neutral-500"
                        />
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

                    <button
                      type="submit"
                      aria-label="Submit form"
                      className="w-full py-3 bg-emerald text-beige font-semibold rounded-lg shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      Sign In
                      <ArrowRight className="h-5 w-5 text-beige mt-[1px] transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </form>

                  {/* Link to Forgot Password */}
                  <div className="text-center text-sm mt-4">
                    <Link
                      to="/forgot-password"
                      className="text-emerald hover:underline hover:text-emerald font-semibold"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Link to SignUp Page */}
                  <div className="text-center text-sm mt-4">
                    <p>
                      Don't have an account?{" "}
                      <Link
                        to="/signup"
                        className="text-emerald hover:underline hover:text-emerald font-semibold"
                      >
                        Sign up here
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

export default SignIn;
