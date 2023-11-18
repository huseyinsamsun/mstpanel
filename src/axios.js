import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://localhost:7043',
  headers: {
    'Content-Type': 'application/json'

  }
})
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // Handle errors, like checking for a 401 unauthorized status
    if (error.response.status === 401) {
      // Handle token expiration, redirect to login, etc.
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
 