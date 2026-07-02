import axios from 'axios';

window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Set base URL from environment variable
// IMPORTANT: VITE_API_BASE_URL must NOT include /api suffix
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
//console.log('[bootstrap.js] VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
//console.log('[bootstrap.js] Setting axios baseURL to:', API_BASE_URL);
window.axios.defaults.baseURL = API_BASE_URL;

// Add request interceptor to include auth token
window.axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('currentToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('[axios interceptor] Token added to request:', config.url);
    }
    console.log('[axios interceptor] Request to:', config.baseURL + config.url);
    console.log('[axios interceptor] Headers:', config.headers);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
window.axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('currentToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
