import AuthLayout from "~/layout/AuthLayout";
import Login from "~/pages/Auth/Login";
import Register from "~/pages/Auth/Register";

export const AuthRoutes = {
  path: "/",
  element: <AuthLayout />,
  children: [
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ],
};
