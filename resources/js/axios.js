import Axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create a separate instance for CSRF token requests (without interceptor)
const csrfAxios = Axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

const axiosInstance = Axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

const onRequest = (config) => {
  // If http method is `post | put | delete` and XSRF-TOKEN cookie is
  // not present, call '/sanctum/csrf-cookie' to set CSRF token, then
  // proceed with the initial response
  if ((
    config.method == 'post' ||
    config.method == 'put' ||
    config.method == 'delete'
  ) &&
    !Cookies.get('XSRF-TOKEN')) {
    return setCSRFToken()
      .then(() => config);
  }
  return config;
}

const setCSRFToken = () => {
  // Use the separate axios instance without interceptors to avoid infinite recursion
  return csrfAxios.get('/sanctum/csrf-cookie');
}

export const getCSRFToken = async () => {
  await csrfAxios.get("/sanctum/csrf-cookie");
};

axiosInstance.interceptors.request.use(onRequest, null);

export default axiosInstance;
/*import axios from 'axios';

axios.defaults.baseURL = 'http://localhost/api';
axios.defaults.withCredentials = true;

export default axios;
*/
