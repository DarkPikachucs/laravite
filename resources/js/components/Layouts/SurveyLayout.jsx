import React from "react";
import { NavLink } from 'react-router-dom';

const SurveyLayout = ({ children }) => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full p-0 rounded-lg shadow-lg bg-cream-lighter md:p-3 sm:p-6">
          {children}
        </div>
      </div>
    </>
  );
};

export default SurveyLayout;
