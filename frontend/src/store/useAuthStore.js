
<old_str>
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { checkAuth } from '../../../backend/src/controllers/auth.controller';
import axiosInstance from '../lib/axios'
import { set } from 'mongoose';
export const useAuthStore = create(() => ({
authUser:null,
isCheckingAuth:true,
isSignUp:false,
isLoggingIn:false,
isUpdatingProfile:false,


  checkAuth: async () => {
    try{
      const res = await axiosInstance.get("/auth/check");
      
      
    }catch(error){
      console.log("error in checkAuth", error);
      set({authUser:res.data})
      console.log("error in checkAuth", error)
      set({authUser:null})
      

    }finally{
      set({isCheckingAuth:false})
    }
  }
  
  
  
}))
</old_str>
<new_str>
import { create } from 'zustand';
import axiosInstance from '../lib/axios';

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data, isCheckingAuth: false });
    } catch (error) {
      console.log("error in checkAuth", error);
      set({ authUser: null, isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data, isSigningUp: false });
    } catch (error) {
      console.log("error in signup", error);
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data, isLoggingIn: false });
    } catch (error) {
      console.log("error in login", error);
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
    } catch (error) {
      console.log("error in logout", error);
    }
  }
}))
</new_str>
