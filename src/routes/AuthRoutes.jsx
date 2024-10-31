import AuthLayout from "~/layout/AuthLayout";
import Forgot from "~/pages/Auth/Forgot";
import Login from "~/pages/Auth/Login";
import Register from "~/pages/Auth/Register";

export const AuthRoutes = {
  path: "/",
  element: <AuthLayout />,
  children: [
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/forgot-password", element: <Forgot /> },
  ],
};
