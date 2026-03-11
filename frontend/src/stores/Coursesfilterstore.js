import { create } from "zustand";

export const useCoursesFilterStore = create((set) => ({
  filiere: "",
  level: "",
  activeTab: "all",

  setFiliere: (filiere) => set({ filiere }),
  setLevel: (level) => set({ level }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  reset: () => set({ filiere: "", level: "", activeTab: "all" }),
}));
