import React, { useState, useEffect } from 'react';
import { Navigate, Outlet, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AdminLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('currentToken');

      if (!token) {
        navigate('/login');
        return;
      }

      // Fetch user data to check role and is_internal status
      const response = await axios.get('/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const userData = response.data;
      setUser(userData);

      // Store userId for form owner matching
      if (userData.id) {
        localStorage.setItem('userId', String(userData.id));
      }

      // Check if user is internal from API response
      const isInternal = userData.is_internal === true || (userData.email && userData.email.endsWith('@pcru.ac.th'));

      // Store/update isInternal in localStorage for future use
      localStorage.setItem('isInternal', isInternal ? 'true' : 'false');

      if (!isInternal) {
        toast.error('เฉพาะผู้ใช้ภายในเท่านั้นที่สามารถเข้าถึงหน้า admin ได้');
        navigate('/');
        return;
      }

      // Check if user has admin or manager role (using Spatie permission)
      const hasAdminRole = userData.roles?.some(r => ['admin', 'manager'].includes(r.name));

      // Allow access if user has admin/manager role and is internal
      setIsAdmin(hasAdminRole || isInternal);
      setLoading(false);
    } catch (error) {
      console.error('Auth check failed:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('currentToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('isInternal');
        navigate('/login');
      } else {
        setLoading(false);
      }
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('currentToken');
      if (token) {
        await axios.post('/logout', null, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage
      localStorage.removeItem('currentToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('isInternal');
      localStorage.removeItem('isNewUser');
      localStorage.removeItem('googleLoginChecked');

      // Clear auth header
      delete axios.defaults.headers.common['Authorization'];

      toast.success('Logout successful');

      // Redirect to login
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
          <p className="text-lg text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Left side - Logo and Menu Toggle */}
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <Link to="/admin/forms" className="ml-4 text-xl font-bold text-blue-600">
                <i className="mr-2 fas fa-cog"></i>
                Admin Panel
              </Link>
            </div>

            {/* Right side - User Menu */}
            <div className="flex items-center space-x-4">
              {/* User Info */}
              <div className="items-center hidden md:flex">
                <span className="mr-3 text-sm text-gray-700">
                  {user?.name}
                </span>
                <div className="flex items-center justify-center w-8 h-8 font-bold text-white bg-blue-500 rounded-full">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-bold text-white transition-colors bg-red-500 rounded hover:bg-red-600"
              >
                <i className="mr-2 fas fa-sign-out-alt"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-16 transition-transform bg-white border-r border-gray-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {/* Dashboard */}
            <li>
              <Link
                to="/admin/forms"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <i className="w-5 h-5 mr-3 text-gray-500 fas fa-file-alt"></i>
                <span className="flex-1">แบบฟอร์ม</span>
              </Link>
            </li>

            {/* Form Submissions */}
            {false &&
              <li>
                <Link
                  to="/admin/submissions"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                >
                  <i className="w-5 h-5 mr-3 text-gray-500 fas fa-inbox"></i>
                  <span className="flex-1">คำตอบแบบฟอร์ม</span>
                </Link>
              </li>}

            {/* Form Access Management */}
            <li>
              <Link
                to="/admin/form-access"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <i className="w-5 h-5 mr-3 text-gray-500 fas fa-key"></i>
                <span className="flex-1">อนุญาตให้เข้าถึงข้อมูลการตอบ</span>
              </Link>
            </li>

            {/* only admin */}
            {isAdmin && (<>
              {/* Divider - User Management */}
              <li className="pt-4 mt-4 border-t border-gray-200">
                <p className="px-2 text-xs font-semibold text-gray-500 uppercase">
                  การจัดการผู้ใช้
                </p>
              </li>

              {/* Users Management */}
              <li>
                <Link
                  to="/admin/users"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                >
                  <i className="w-5 h-5 mr-3 text-gray-500 fas fa-users"></i>
                  <span className="flex-1">ผู้ใช้งาน</span>
                </Link>
              </li>

              {/* Roles Management */}
              <li>
                <Link
                  to="/admin/roles"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                >
                  <i className="w-5 h-5 mr-3 text-gray-500 fas fa-user-tag"></i>
                  <span className="flex-1">บทบาท (Roles)</span>
                </Link>
              </li>

              {/* Permissions Management */}
              <li>
                <Link
                  to="/admin/permissions"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                >
                  <i className="w-5 h-5 mr-3 text-gray-500 fas fa-shield-alt"></i>
                  <span className="flex-1">สิทธิ์ (Permissions)</span>
                </Link>
              </li>

              {/* Divider - System */}
              <li className="pt-4 mt-4 border-t border-gray-200">
                <p className="px-2 text-xs font-semibold text-gray-500 uppercase">
                  ระบบ
                </p>
              </li>

              {/* Settings */}
              <li>
                <Link
                  to="/admin/settings"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                >
                  <i className="w-5 h-5 mr-3 text-gray-500 fas fa-cog"></i>
                  <span className="flex-1">ตั้งค่า</span>
                </Link>
              </li>
            </>)}

            {/* Divider */}
            <li className="pt-4 mt-4 border-t border-gray-200">
              <Link
                to="/"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <i className="w-5 h-5 mr-3 text-gray-500 fas fa-home"></i>
                <span className="flex-1">กลับหน้าหลัก</span>
              </Link>
            </li>
          </ul>

          {/* User Info (Mobile) */}
          <div className="pt-4 mt-8 border-t border-gray-200 md:hidden">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 font-bold text-white bg-blue-500 rounded-full">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="pt-16 md:ml-64">
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
