// AuthLayout Component
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
