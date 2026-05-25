import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUP: false,
  isLoggingIn: false,
  isUpdatingPic:false,
  onlineUsers:[],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error checking auth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUP: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });

      toast.success("Signup successful! Welcome to Chatify.");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUP: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });

      toast.success("Login successful!");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logout Successfully");
    } catch (error) {
      toast.error("Error in logout");
    }
  },

  updateProfile: async (data) => {
    set({isUpdatingPic:true})
    try {
      const res = await axiosInstance.put("/auth/updateprofile", data);
      console.log("res After profile update", res)
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in update profile:", error);
      toast.error(error.response.data.message);
    }finally{
      set({isUpdatingPic:false})
    }
  },
}));
