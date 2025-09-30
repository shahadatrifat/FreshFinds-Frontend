import { Navigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import CartLoader from "../../pages/shared/loaders/CartLoader";

const RoleRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <CartLoader></CartLoader>

  if (!user) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />; 
  }

  return children;
};

export default RoleRoute;
