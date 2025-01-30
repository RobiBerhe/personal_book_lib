import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
