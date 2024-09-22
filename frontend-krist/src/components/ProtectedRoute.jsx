import { Navigate } from "react-router-dom";
import { userAuthStore } from "../store/store";

const ProtectedRoute = ({
  children,
  adminOnly = false,
  requireOtp = false,
  authRequired = false,
}) => {
  const { isAuth, roleUser } = userAuthStore();
  const resetEmail = localStorage.getItem("resetEmail");

  if (!isAuth && authRequired) {
    return <Navigate to="/login" replace />;
  }

  if (requireOtp && !resetEmail) {
    return <Navigate to="/forgot-password" replace />;
  }

  if (adminOnly && roleUser !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
