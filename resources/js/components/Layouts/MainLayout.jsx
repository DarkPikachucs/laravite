import React from "react";
//import Navbar from '../Navbars/IndexNavbar';
//import Footer from "../Footers/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      {/*<Navbar />*/}

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      {/*<Footer />*/}
    </div>
  );
};

export default MainLayout;
