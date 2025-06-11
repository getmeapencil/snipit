import apiClient from "@/api/apiClient";
import { handleError } from "@/lib/errorHandler";

export const refreshTokenService = async () => {
  try {
    const response = await apiClient.post("/auth/refresh-token");
    return response.data;
  } catch (error) {
    return handleError(error, {
      contextPrefix: "API Error (refreshTokenService)",
    });
  }
};

export const fetchCurrentUserService = async () => {
  try {
    const response = await apiClient.get("/auth/me");
    return response.data;
  } catch (error) {
    return handleError(error, {
      contextPrefix: "API Error (fetchCurrentUserService)",
    });
  }
};

export const logoutUserService = async () => {
  try {
    const response = await apiClient.post("/auth/logout");
    return response.data;
  } catch (error) {
    return handleError(error, {
      contextPrefix: "API Error (logoutUserService)",
    });
  }
};
