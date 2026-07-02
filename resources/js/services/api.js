import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API endpoints
export const projectAPI = {
  getAll: (params) => api.get('/strategic-projects', { params }),
  getById: (id) => api.get(`/strategic-projects/${id}`),
  create: (data) => api.post('/strategic-projects', data),
  update: (id, data) => api.put(`/strategic-projects/${id}`, data),
  delete: (id) => api.delete(`/strategic-projects/${id}`),
}

export const reportAPI = {
  getAll: (params) => api.get('/project-reports', { params }),
  getById: (id) => api.get(`/project-reports/${id}`),
  create: (data) => api.post('/project-reports', data),
  update: (id, data) => api.put(`/project-reports/${id}`, data),
  delete: (id) => api.delete(`/project-reports/${id}`),
}

export const dashboardAPI = {
  getSummary: () => api.get('/strategic-dashboard'),
}

export default api