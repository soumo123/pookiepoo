import axios from 'axios'
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: apiBaseUrl, // Set your API base URL
    timeout: 10000, // Set request timeout (optional)
    headers: {
      "Content-Type": "application/json",
    //   Authorization: "Bearer your-token", // Example header
    },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error.response.data);
    }
  );
  
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error.response.data);
    }
  );
  
  export default axiosInstance;