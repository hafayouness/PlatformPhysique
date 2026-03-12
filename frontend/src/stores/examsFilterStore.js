import { create } from "zustand";

export const useExamsFilterStore = create((set) => ({
  filiere: "",
  session: "",
  year: "",

  setFiliere: (filiere) => set({ filiere }),
  setSession: (session) => set({ session }),
  setYear: (year) => set({ year }),
  reset: () => set({ filiere: "", session: "", year: "" }),
}));
