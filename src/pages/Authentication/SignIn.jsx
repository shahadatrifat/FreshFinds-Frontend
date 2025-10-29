import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowRight, Eye, EyeOff, User, Store, Copy, CheckCircle } from "lucide-react";
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
import axiosInstance from "../../Hooks/useAxiosInstance";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // Test credentials
  const testCredentials = [
    {
      role: "Admin",
      email: "admin123@gmail.com",
      password: "admin123",
      icon: User,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      role: "Vendor",
      email: "mp@mp.com",
      password: "111111",
      icon: Store,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200"
    }
  ];

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      console.log("Form submitted successfully", data);
      const firebaseUser = await signInUser(data.email, data.password);
      console.log("User signed in successfully", firebaseUser);
      const idToken = await firebaseUser.user.getIdToken();
      console.log("id token", idToken);
      const response = await axiosInstance.post(
        "/api/v1/user/auth",
        {
          userId: firebaseUser.user?.uid,
          idToken,
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      console.log("User signed in successfully", response.data);
      navigate(from, { replace: true });
      reset();
    } catch (err) {
      console.log(err);
      alert("There was an issue during sign-in. Please try again.");
    }
  };

  // Fill credentials
  const fillCredentials = (email, password) => {
    setValue("email", email);
    setValue("password", password);
    toast.success("Credentials filled! Click Sign In to continue.");
  };

  // Copy to clipboard
  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-offwhite via-beige/20 to-mint/10 py-12 px-4">
      <Toaster position="top-center" />
      
      <div className="max-w-5xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Test Credentials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 space-y-4"
          >
            <div className="bg-offwhite rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-charcoal">Test Accounts</h3>
                  <p className="text-xs text-gray-600">For demo purposes</p>
                </div>
              </div>

              <div className="space-y-3">
                {testCredentials.map((cred, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className={`${cred.bgColor} ${cred.borderColor} border-2 rounded-xl p-4 hover:shadow-md transition-shadow`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-8 h-8 bg-gradient-to-br ${cred.color} rounded-lg flex items-center justify-center`}>
                        <cred.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-bold text-charcoal">{cred.role}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-600 mb-1">Email</p>
                          <p className="text-sm font-mono text-charcoal truncate">
                            {cred.email}
                          </p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(cred.email, `${cred.role}-email`)}
                          className="p-2 hover:bg-white/80 rounded-lg transition-colors flex-shrink-0"
                          title="Copy email"
                        >
                          {copiedField === `${cred.role}-email` ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-600" />
                          )}
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-600 mb-1">Password</p>
                          <p className="text-sm font-mono text-charcoal">
                            {cred.password}
                          </p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(cred.password, `${cred.role}-pass`)}
                          className="p-2 hover:bg-white/80 rounded-lg transition-colors flex-shrink-0"
                          title="Copy password"
                        >
                          {copiedField === `${cred.role}-pass` ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-600" />
                          )}
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => fillCredentials(cred.email, cred.password)}
                      className="w-full mt-3 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-beige font- rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all flex items-center justify-center gap-1"
                    >
                      <span className="text-sm">Use {cred.role} Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Info Box */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-br from-emerald-50 to-mint/30 rounded-xl p-4 border border-emerald-200"
            >
              <p className="text-xs text-gray-700 leading-relaxed">
                <span className="font-semibold text-emerald-700">💡 Tip:</span> Click "Use Account" to auto-fill credentials, or copy them manually.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Side - Original Sign In Form */}
          <div className="lg:col-span-2">
            <TextureCardStyled>
              <TextureCardHeader className="flex flex-col gap-1 items-center justify-center p-6">
                <TextureCardTitle>Sign In</TextureCardTitle>
                <p className="text-center">
                  Welcome back! Please sign in to your account.
                </p>
              </TextureCardHeader>
              <TextureSeparator />
              <TextureCardContent>
                <GoogleLogin />
                <div className="text-center text-sm mb-2">or</div>
                
                <div onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
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
                            message: "Password must be at least 6 characters long",
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
                    onClick={handleSubmit(onSubmit)}
                    aria-label="Submit form"
                    className="w-full py-3 bg-emerald text-beige font-semibold rounded-lg shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Sign In
                    <ArrowRight className="h-5 w-5 text-beige mt-[1px] transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>

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
  );
};

export default SignIn;