import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authUser: { name: "jhondoe", _id: "123", age: 30 },
  isLoggedIn: false,
  isLoading: false,

  login: () => {
    console.log("login");
    set({ isLoggedIn: true, isLoading: true });
  },
}));
