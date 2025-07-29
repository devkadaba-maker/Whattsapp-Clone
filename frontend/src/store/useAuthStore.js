import { create } from 'zustand';
import axiosInstance from '../lib/axios.js';

export const useAuthStore = create((set) => ({
  authUser:null,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check")
      set({authUser:response.data, isCheckingAuth : false})
    } catch(error) {
      // 401 is expected when user is not logged in - not an error
      if (error.response?.status === 401) {
        console.log("User not authenticated (expected when not logged in)");
      } else {
        console.log("Unexpected error in checkAuth", error);
      }
      set({authUser:null, isCheckingAuth : false})
    }
  }

    }))