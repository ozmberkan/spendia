// AuthLayout Component
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Outlet />
      <Toaster />
    </div>
  );
};

export default AuthLayout;
