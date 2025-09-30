import { Navigate, useLocation } from "react-router";
import { toast } from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import CartLoader from "../../pages/shared/loaders/CartLoader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <CartLoader></CartLoader>;

  if (!user) {
    toast.error("You must be logged in to access this page");
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
