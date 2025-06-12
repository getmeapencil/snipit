import { create } from "zustand";
import {
  createSnippetService,
  getUserSnippetsService,
  getPublicSnippetsService,
  updateSnippetService,
} from "@/api/snippet.api";

export const useSnippetStore = create((set, get) => ({
  // State
  userSnippets: [],
  publicSnippets: [],
  currentSnippet: null,
  isLoading: false,
  error: null,

  // Form state
  flavor: "Plain",
  name: `Snippet-${Date.now()}`,
  exposure: "public",
  password: "",
  content: "",
  language: "javascript",

  // Form actions
  setFlavor: (flavor) => set({ flavor }),
  setName: (name) => set({ name }),
  setExposure: (exposure) => set({ exposure }),
  setPassword: (password) => set({ password }),
  setContent: (content) => set({ content }),
  setLanguage: (language) => set({ language }),

  resetForm: () =>
    set({
      flavor: "Plain",
      name: `Snippet-${Date.now()}`,
      exposure: "public",
      password: "",
      content: "",
      language: "javascript",
    }),

  // Actions
  createSnippet: async (snippetData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await createSnippetService(snippetData);
      if (response.success) {
        // Refresh user snippets after creating a new one
        await get().fetchUserSnippets();
        // Refresh public snippets if it's public
        if (snippetData.exposure === "public") {
          await get().fetchPublicSnippets();
        }
        set({ currentSnippet: response.snippet, isLoading: false });
        return { success: true, snippet: response.snippet };
      } else {
        set({ error: response.message, isLoading: false });
        return { success: false, error: response.message };
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
      return { success: false, error: error.message };
    }
  },

  updateSnippet: async (snippetId, snippetData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await updateSnippetService(snippetId, snippetData);
      if (response.success) {
        // Refresh user snippets after updating
        await get().fetchUserSnippets();
        // Refresh public snippets if exposure changed to/from public
        await get().fetchPublicSnippets();
        set({ currentSnippet: response.snippet, isLoading: false });
        return { success: true, snippet: response.snippet };
      } else {
        set({ error: response.message, isLoading: false });
        return { success: false, error: response.message };
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
      return { success: false, error: error.message };
    }
  },

  fetchUserSnippets: async (page = 1, limit = 10) => {
    set({ isLoading: true, error: null });
    try {
      const response = await getUserSnippetsService(page, limit);
      if (response.success) {
        set({ userSnippets: response.snippets, isLoading: false });
        return { success: true, snippets: response.snippets };
      } else {
        set({ error: response.message, isLoading: false });
        return { success: false, error: response.message };
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
      return { success: false, error: error.message };
    }
  },

  fetchPublicSnippets: async (limit = 5) => {
    try {
      const response = await getPublicSnippetsService(limit);
      if (response.success) {
        set({ publicSnippets: response.snippets });
        return { success: true, snippets: response.snippets };
      } else {
        set({ error: response.message });
        return { success: false, error: response.message };
      }
    } catch (error) {
      set({ error: error.message });
      return { success: false, error: error.message };
    }
  },

  clearError: () => set({ error: null }),

  setCurrentSnippet: (snippet) => {
    if (snippet) {
      set({
        currentSnippet: snippet,
        name: snippet.name,
        content: snippet.content,
        flavor: snippet.flavor,
        exposure: snippet.exposure,
        password: "", // Don't show existing password for security
        language: snippet.language || "javascript",
      });
    } else {
      set({ currentSnippet: snippet });
    }
  },
}));
