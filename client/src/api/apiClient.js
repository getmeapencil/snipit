import axios from "axios";
import { useAuthStore } from "@/store/auth.store";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  async (error) => {
    if (
      error.response?.status === 401 &&
      error.response?.data?.code === "TOKEN_EXPIRED"
    ) {
      try {
        const response = await apiClient.post("/auth/refresh-token");
        if (response.data.success) {
          useAuthStore.getState().setToken(response.data.accessToken);
          error.config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        }
        return await apiClient.request(error.config);
      } catch (error) {
        useAuthStore.getState().logout();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
