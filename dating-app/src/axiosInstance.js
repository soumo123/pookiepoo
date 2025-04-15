import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

let accessToken = null;
let refreshToken = null;

export const setTokens = (access, refresh,user_id) => {
  accessToken = access;
  refreshToken = refresh;
  localStorage.setItem('accessToken', access);
  localStorage.setItem('refreshToken', refresh);
  localStorage.setItem("user_id",user_id)
};

export const loadTokens = () => {
  accessToken = localStorage.getItem('accessToken');
  refreshToken = localStorage.getItem('refreshToken');
};

export const clearTokens = () => {
  accessToken = null;
  refreshToken = null;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (Auto Refresh Logic)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("errorerrorerrorerror",error)
    const originalRequest = error.config;
    // Handle expired token
    if (
      error.response?.status === 500 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(`${apiBaseUrl}/refresh_token`, {
          token: refreshToken,
        });

        const newAccessToken = response.data.accessToken;
        setTokens(newAccessToken, refreshToken);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed', refreshError);
        clearTokens(); // Clear invalid tokens
        window.location.href = '/login'; // Redirect to login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;