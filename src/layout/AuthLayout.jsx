import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="bg-red-500 flex-grow flex justify-center items-center min-h-screen">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
