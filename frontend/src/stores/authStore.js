import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "../services/authServices";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      login: async (email, mot_de_passe) => {
        const response = await authService.login({ email, mot_de_passe });
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        set({ user, token });
        return user;
      },

      logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null });
      },

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),

      isAdmin: () => get().user?.role === "admin",
      isAuthenticated: () => !!get().token,
    }),
    {
      name: "pb-auth",
      partialize: (s) => ({ user: s.user, token: s.token }),
    },
  ),
);
