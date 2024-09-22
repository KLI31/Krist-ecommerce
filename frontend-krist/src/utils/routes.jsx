import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import OtpPage from "@/pages/OtpPage";
import RegisterPage from "@/pages/RegisterPage";
import ErrorPage from "@/pages/404Page";
import ForgotPassword from "@/pages/ForgotPassword";
import LoginPage from "@/pages/LoginPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashBoardAdmin from "@/pages/DashBoardAdmin";
import Layout from "@/pages/Layout";
import ResetPassword from "@/pages/ResetPassword";

export const routes = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/otp",
        element: (
          <ProtectedRoute requireOtp={true}>
            <OtpPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/reset-password",
        element: (
          <ProtectedRoute requireOtp={true}>
            <ResetPassword />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard-admin",
        element: (
          <ProtectedRoute adminOnly={true} authRequired>
            <DashBoardAdmin />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
