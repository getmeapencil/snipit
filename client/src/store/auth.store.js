import { create } from "zustand";
import { logoutUserService } from "@/api/auth.api";

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
}));
