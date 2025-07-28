import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';

export const useAuthStore = create((set) => ({
  authUser:null,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try{
      const response = axiosInstance.get("/auth/check")
      set({authUser:response.data, isCheckingAuth : false})
    }catch(error){
      console.log("error in checkAuth", error);
      set({authUser:null, isCheckingAuth : false})
    }finally{
      set({isCheckingAuth : false})
    }
    
    
  }
  
    }))