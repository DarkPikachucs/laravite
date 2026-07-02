import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // ตรวจสอบสถานะการล็อกอินเมื่อโหลด Navbar
    axios.get("/api/user")
      .then(response => {
        setIsAuthenticated(true);
        setUser(response.data);
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  const handleLogout = () => {
    axios.post("/api/logout")
      .then(() => {
        setIsAuthenticated(false);
        setUser(null);

        // Clear local storage
        localStorage.removeItem('currentToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('isInternal');
        localStorage.removeItem('isNewUser');

        // Clear auth header
        delete axios.defaults.headers.common['Authorization'];

        toast.success('Logout successful');

        // Redirect to login
        navigate('/login');
      })
      .catch(error => {
        console.error("Logout error:", error);
      });
  };

  return (
    <nav className="p-4 bg-blue-500">
      <div className="container flex items-center justify-between mx-auto">
        {/* Logo */}
        <div className="text-xl font-bold text-white">
          <Link to="/">ระบบติดตามแผน</Link>
        </div>

        {/* Navigation Links */}
        <div>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-white hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-white hover:text-gray-300">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white hover:text-gray-300">
                Contact
              </Link>
            </li>
            {/* ปุ่ม Login หรือ Logout */}
            {isAuthenticated ? (
              <>
                <li>
                  <span className="text-white">Welcome, {user?.name}</span>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-bold text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="text-white hover:text-gray-300">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-white hover:text-gray-300">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
