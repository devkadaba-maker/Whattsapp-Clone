import { create } from 'zustand';
import axiosInstance from '../lib/axios.js';
import toast from 'react-hot-toast';

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
  },


  signup: async (data) => {
    set({isSigningUp: true})
    try{
      const res = await axiosInstance.post("/auth/signup", data);
      set({authUser: res.data})
      toast.success("account created successfully")
      
      
    }catch(error){
      console.log("error in signup store", error.response.data.message);
      toast.error("error creating account")
    }finally{
      set({isSigningUp: false})
      
    }
  },
  logout: async () => {
  try{
    const res = await axiosInstance.post("/auth/logout");
    set({authUser: null})
    toast.success("logged out successfully")
    
  }catch(error){
    console.log("error in logout store", error.response.data.message);
    toast.error("error logging out")
  }
},
  login: async () =>{
    try{
      const res = await axiosInstance.post("/auth/login");
      set({authUser: res.data})
      toast.success("logged in successfully")
      
    }catch(error){
      console.log("error in login store", error.response.data.message);
      toast.error("error logging in")
    }finally{
      set({isLoggingIn: false})
    }
  }
  
    }))