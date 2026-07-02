
import React, { useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from '../axios';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { setUser, csrfToken } = useAuth();
  const [error, setError] = React.useState(null);

  // Listen for Google login success event
  useEffect(() => {
    const handleGoogleLoginSuccess = (event) => {
      const { is_new_user } = event.detail;

      // Store auth info
      const token = localStorage.getItem('currentToken');
      const userId = localStorage.getItem('userId');
      const isInternal = localStorage.getItem('isInternal');

      if (token) {
        // Fetch user data
        axios.get('/user', {
          headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
          setUser(response.data);

          // Redirect based on user type
          if (is_new_user === true || is_new_user === 'true') {
            navigate('/profile/setup');
          } else {
            navigate('/');
          }
        }).catch(err => {
          console.error('Error fetching user data:', err);
        });
      }
    };

    window.addEventListener('google-login-success', handleGoogleLoginSuccess);

    return () => {
      window.removeEventListener('google-login-success', handleGoogleLoginSuccess);
    };
  }, [navigate, setUser]);

  // Handle Google Login with popup
  const handleGoogleLogin = () => {
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popupUrl = `/auth/google?popup=1`;
    const features = `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,status=yes`;

    const popup = window.open(popupUrl, 'GoogleLogin', features);

    // Check if popup was blocked
    if (!popup || popup.closed) {
      alert('เบราว์เซอร์บล็อก popup กรุณาอนุญาต popup สำหรับเว็บไซต์นี้');
      return;
    }
  };

  // login user
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    const body = {
      email: email.value,
      password: password.value,
    };
    await csrfToken();
    try {
      const resp = await axios.post('/login', body);
      if (resp.status === 200) {
        setUser(resp.data.user);
        return <Navigate to="/profile" />;
      }
    } catch (error) {
      if (error.response.status === 401) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            className="w-8 h-8 mr-2"
            src="https://dcodemania.com/img/logo.svg"
            alt="logo"
          />
          DCodeMania
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            {error && (
              <div
                className="flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                role="alert">
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 inline w-5 h-5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"></path>
                </svg>
                <span className="sr-only">Info</span>
                <div>{error}</div>
              </div>
            )}

            <form
              className="space-y-4 md:space-y-6"
              action="#"
              method="post"
              onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Sign in
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white dark:bg-gray-900 px-2 text-gray-500">หรือต่อเนื่องด้วย</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Sign in with Google
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account yet?{' '}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
