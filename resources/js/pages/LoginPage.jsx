import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

// NOTE: axios baseURL is set in bootstrap.js from VITE_API_BASE_URL
// Do NOT set it here to avoid duplication

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('currentToken');
    if (token) {
      // User is already logged in, redirect to dashboard
      const isInternal = localStorage.getItem('isInternal');
      const isNewUser = localStorage.getItem('isNewUser');

      // If new user, redirect to profile setup
      if (isNewUser === 'true') {
        navigate('/profile/setup');
      }
      // If internal user, redirect to forms dashboard
      else if (isInternal === 'true') {
        navigate('/admin/forms');
      }
      // If external user, redirect to home
      else {
        navigate('/');
      }
    }
  }, [navigate]);

  // Listen for Google login success event
  useEffect(() => {
    const handleGoogleLoginSuccess = (event) => {
      console.log('Google login event received:', event.detail);

      const { is_new_user, token, user_id, is_internal } = event.detail;

      if (token) {
        // Store auth info
        localStorage.setItem("currentToken", token);
        localStorage.setItem("userId", user_id);
        localStorage.setItem("isInternal", is_internal ? 'true' : 'false');
        localStorage.setItem("isNewUser", is_new_user ? 'true' : 'false');

        // Set authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        toast.success('Login successful');

        // Redirect based on user type
        setTimeout(() => {
          if (is_new_user === true || is_new_user === 'true') {
            console.log('New user detected, redirecting to profile setup');
            navigate('/profile/setup');
          } else {
            console.log('Existing user detected, redirecting to forms');
            navigate('/admin/forms');
          }
        }, 500);
      }
    };

    window.addEventListener('google-login-success', handleGoogleLoginSuccess);

    // Check localStorage on mount and periodically (fallback for missed events)
    const checkLocalStorage = () => {
      const token = localStorage.getItem('currentToken');
      const isNewUser = localStorage.getItem('isNewUser');
      const hasChecked = localStorage.getItem('googleLoginChecked');

      if (token && isNewUser && !hasChecked) {
        localStorage.setItem('googleLoginChecked', 'true');
        if (isNewUser === 'true') {
          console.log('New user detected via localStorage, redirecting to profile setup');
          navigate('/profile/setup');
        } else {
          console.log('Existing user detected via localStorage, redirecting to forms');
          navigate('/admin/forms');
        }
      }
    };

    // Check immediately
    checkLocalStorage();

    // Check again after 2 seconds (in case event was missed)
    const timeoutId = setTimeout(checkLocalStorage, 2000);

    return () => {
      window.removeEventListener('google-login-success', handleGoogleLoginSuccess);
      clearTimeout(timeoutId);
    };
  }, [navigate]);

  // Handle Google Login with redirect (not popup)
  const handleGoogleLogin = () => {
    // Redirect to Google OAuth with from=login
    // Add from_path to redirect back to login page after login (default behavior)
    window.location.href = '/auth/google?from=login&from_path=/dashboard';
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use relative path - baseURL is set in bootstrap.js
      const response = await axios.post('/login', { email, password });

      // Store token and user data
      const { currentToken, user } = response.data;
      localStorage.setItem("currentToken", currentToken);
      localStorage.setItem("user", JSON.stringify(user));

      // Store isInternal flag
      const isInternal = user.is_internal || (user.email && user.email.endsWith('@pcru.ac.th'));
      localStorage.setItem("isInternal", isInternal ? 'true' : 'false');

      // Set authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;

      toast.success('Login successful');

      // Redirect based on user type and role
      setTimeout(() => {
        if (isInternal) {
          // Internal user: check if has admin/manager role
          const userRoles = user.roles || [];
          const hasAdminRole = userRoles.some(r => ['admin', 'manager'].includes(r.name));

          if (hasAdminRole) {
            navigate('/admin/forms');
          } else {
            // Internal user without admin role → go to dashboard
            navigate('/dashboard');
          }
        } else {
          // External user → go to dashboard
          navigate('/dashboard');
        }
      }, 500);
    } catch (error) {
      console.error('Login failed:', error);
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-4 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">ยินดีต้อนรับ</h2>
          <p className="text-gray-600 mt-2">เข้าสู่ระบบเพื่อดำเนินการต่อ</p>
        </div>

        {/* Login Form Card */}
        <div className="p-8 bg-white rounded-2xl shadow-xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                }`}
            >
              {loading ? 'Logging in...' : 'เข้าสู่ระบบ'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500">หรือต่อเนื่องด้วย</span>
            </div>
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            เข้าสู่ระบบด้วย Google
          </button>

          {/* Help Text */}
          <p className="text-xs text-center text-gray-500 mt-6">
            • ผู้ใช้ภายใน (@pcru.ac.th) สามารถสร้างฟอร์มและให้สิทธิ์ผู้อื่นได้<br />
            • ผู้ใช้ภายนอกสามารถสร้างฟอร์มและขอสิทธิ์ดูข้อมูลได้
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
