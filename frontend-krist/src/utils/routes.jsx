import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import OtpPage from "@/pages/OtpPage";
import RegisterPage from "@/pages/RegisterPage";
import ErrorPage from "@/pages/404Page";
import ForgotPassword from "@/pages/ForgotPassword";
import LoginPage from "@/pages/LoginPage";

export const routes = createBrowserRouter([
  {
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
        element: <OtpPage />,
      },
    ],
  },
]);
