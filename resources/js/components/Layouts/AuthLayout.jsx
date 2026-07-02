import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
