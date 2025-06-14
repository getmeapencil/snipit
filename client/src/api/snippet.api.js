import apiClient from "@/api/apiClient";
import { handleError } from "@/lib/errorHandler";
import { useAuthStore } from "@/store/auth.store";

export const createSnippetService = async (snippetData) => {
  try {
    const response = await apiClient.post("/snippets", snippetData);
    return response.data;
  } catch (error) {
    return handleError(error, {
      contextPrefix: "API Error (createSnippetService)",
    });
  }
};

export const getSnippetService = async (snippetId, password = null) => {
  try {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    const response = await apiClient.post(
      `/snippets/${snippetId}/${isAuthenticated ? "view" : "public-view"}`,
      {
        password,
      },
    );
    return response.data;
  } catch (error) {
    return handleError(error, {
      contextPrefix: "API Error (getSnippetService)",
    });
  }
};

export const updateSnippetService = async (snippetId, snippetData) => {
  try {
    const response = await apiClient.put(`/snippets/${snippetId}`, snippetData);
    return response.data;
  } catch (error) {
    return handleError(error, {
      contextPrefix: "API Error (updateSnippetService)",
    });
  }
};

export const getUserSnippetsService = async (page = 1, limit = 10) => {
  try {
    const response = await apiClient.get(
      `/snippets/user?page=${page}&limit=${limit}`,
    );
    return response.data;
  } catch (error) {
    return handleError(error, {
      contextPrefix: "API Error (getUserSnippetsService)",
    });
  }
};

export const getPublicSnippetsService = async (limit = 5) => {
  try {
    const response = await apiClient.get(`/snippets/public?limit=${limit}`);
    return response.data;
  } catch (error) {
    return handleError(error, {
      contextPrefix: "API Error (getPublicSnippetsService)",
    });
  }
};

export const deleteSnippetService = async (snippetId) => {
  try {
    const response = await apiClient.delete(`/snippets/${snippetId}`);
    return response.data;
  } catch (error) {
    return handleError(error, {
      contextPrefix: "API Error (deleteSnippetService)",
    });
  }
};
