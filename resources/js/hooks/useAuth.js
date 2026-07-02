import { useState, useEffect } from "react";
import axios from "axios";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("currentToken");

    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      // Set token in axios header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Try to get user data from API
      const response = await axios.get('/user');

      if (response.data) {
        setIsAuthenticated(true);
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      } else {
        throw new Error('No user data');
      }
    } catch (error) {
      // Token invalid or expired
      console.error('Auth check failed:', error);
      localStorage.removeItem("currentToken");
      localStorage.removeItem("user");
      delete axios.defaults.headers.common['Authorization'];
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post('/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem("currentToken");
      localStorage.removeItem("user");
      delete axios.defaults.headers.common['Authorization'];
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  return { isAuthenticated, user, loading, logout, checkAuth };
};
