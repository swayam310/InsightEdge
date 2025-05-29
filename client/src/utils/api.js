import axios from 'axios';

// Create an axios instance with defaults
const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 unauthorized errors
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      // Handle unauthenticated state here if needed
    }
    
    return Promise.reject(error);
  }
);

export default api;