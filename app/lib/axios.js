import axios from "axios";
/* "https://kontosor-backend-com.vercel.app/", */
// Create axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
  withCredentials: true,
});

// Store interceptor id to eject old interceptor
let interceptorId = null;

/**
 * Set token in axios headers
 * @param {string | null} token - JWT token from NextAuth session
 */
export const setUserInterceptor = (token) => {
  console.log("Setting axios token:", token);

  // Remove old interceptor if exists
  if (interceptorId !== null) {
    api.interceptors.request.eject(interceptorId);
  }

  // Add new interceptor
  interceptorId = api.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      } else {
        if (config.headers?.Authorization) {
          delete config.headers.Authorization;
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

export default api;