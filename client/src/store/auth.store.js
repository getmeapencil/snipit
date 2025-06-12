import { create } from "zustand";
import { logoutUserService, updateUsernameService } from "@/api/auth.api";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  setUser: (user) =>
    set({ user, isAuthenticated: !!user, error: null, isLoading: false }),
  setToken: (token) => set({ token }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => {
    set({
      error,
      isLoading: false,
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
  logout: async () => {
    await logoutUserService();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
      isLoading: false,
    });
  },
  updateUsername: async (newUsername) => {
    set({ isLoading: true, error: null });
    try {
      const response = await updateUsernameService(newUsername);
      if (response.success) {
        set((state) => ({
          user: { ...state.user, username: response.user.username },
          isLoading: false,
          error: null,
        }));
        return { success: true, message: response.message };
      } else {
        set({ isLoading: false, error: response.message });
        return { success: false, message: response.message };
      }
    } catch (error) {
      const errorMessage = error.message || "Failed to update username";
      set({ isLoading: false, error: errorMessage });
      return { success: false, message: errorMessage };
    }
  },
}));
