import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { checkAuth } from '../../../backend/src/controllers/auth.controller';
import axiosInstance from '../lib/axiosInstance'
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