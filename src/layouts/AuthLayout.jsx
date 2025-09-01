import { Link, Outlet, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react"; // Importing left arrow icon from Lucide React
import bg1 from "../assets/bg-3.jpg"; // Background image
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components/ui/tooltip";
import Logo from "../pages/shared/Logo/Logo"; // Assuming Logo is your custom component

const AuthLayout = () => {
  const navigate = useNavigate(); // useNavigate for React Router v6

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bg1})` }} // Setting the background image
    >
      {/* Dark overlay to enhance text visibility */}
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative z-10 flex flex-col justify-start min-h-screen px-4">
        {/* Flex container for logo and back button */}
        <div className="flex items-center justify-between w-full py-2">
          {/* Logo on the left side */}
          <div className="ml-4">
            <Link to="/">
              <Logo className="w-24 h-24"/> {/* Logo with size */}
            </Link>
          </div>
          {/* Back Button with Tooltip on the right */}
          <div className="mr-4">
            <Tooltip>
              <TooltipTrigger>
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
        <div className="flex justify-end items-start w-full px-6  ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl"
          >
            {" "}
            {/* Limit content width */}
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
