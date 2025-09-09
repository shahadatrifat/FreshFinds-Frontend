import { Link, Outlet, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import bg1 from "../assets/bg-3.jpg";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components/ui/tooltip";
import Logo from "../pages/shared/Logo/Logo";

const AuthLayout = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bg1})` }}
    >
      {/* Dark overlay to enhance text visibility */}
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative z-99 flex flex-col justify-start m px-4">
        {/* Flex container for logo and back button */}
        <div className="flex items-center justify-between w-full ">
          {/* Logo on the left side */}
          <div className="ml-4 mb-2">
            <Link to="/">
              <Logo className="w-24 h-24" /> {/* Logo with size */}
            </Link>
          </div>
          {/* Back Button with Tooltip on the right */}
          <div className="mr-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={goBack}
                  className="p-3 bg-emerald text-beige rounded-full shadow-lg hover:bg-emerald-700 transition duration-300"
                >
                  <ArrowLeft className="h-6 w-6" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" sideOffset={10}>
                <p>Go Back</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Right-Aligned Content (Outlet) */}
        <div className="flex justify-end items-center w-full  px-8  ">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-3xl"
          >
            {" "}
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
