import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';
const BASE_URL = "http://localhost:3000"
export const useAuthStore = create((set, get) => ({
  authUser:null,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check")
      set({authUser:response.data})
      get().connectSocket()
    } catch(error) {
      console.log("Error in checkAuth:", error);
      set({authUser:null})
    } finally {
      set({isCheckingAuth: false})
    }
  },
  signup: async (data) => {
    set({isSigningUp: true})
    try{
      const res = await axiosInstance.post("/auth/signup", data);
      set({authUser: res.data})
      toast.success("account created successfully")
      get().connectSocket()
      
    }catch(error){
      console.log("error in signup store", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "error creating account")
    }finally{
      set({isSigningUp: false})
      
    }
  },
  logout: async () => {
    set({isLoggingOut: true})
    try{
      const res = await axiosInstance.post("/auth/logout");
      set({authUser: null})
      get().disconnectSocket()
      toast.success("logged out successfully")
      
    }catch(error){
      console.log("error in logout store", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "error logging out")
    }finally{
      set({isLoggingOut: false})
    }
  },
  login: async (data) =>{
    set({isLoggingIn: true})
    try{
      const res = await axiosInstance.post("/auth/login", data);
      set({authUser: res.data})
      toast.success("logged in successfully")

      get().connectSocket()
      
    }catch(error){
      console.log("error in login store", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "error logging in")
    }finally{
      set({isLoggingIn: false})
    }
  },
  updateProfile: async (data) =>{
    set({isUpdatingProfile: true})
    try{
      const res = await axiosInstance.put("/auth/update-profile", data)
      set({authUser: res.data})
      toast.success("profile updated successfully")
    }catch(error){
      console.log("error in updateProfile store", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "error updating profile")
    }finally{
      set({isUpdatingProfile: false})
    }
    
  },
  connectSocket: () => {
    const {authUser} = get()
    if(!authUser || get().socket?.connected) return
    
    const socket = io(BASE_URL, { 
      withCredentials: true,
      transports: ['websocket'],
      upgrade: false,
      query: {
        userId: authUser._id
      }
    })
    
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id)
    })
    
    socket.on("disconnect", () => {
      console.log("Socket disconnected")
    })
    
    socket.on("getOnlineUsers", (users) => {
      console.log("Online users:", users)
      set({onlineUsers: users})
    })
    
    set({ socket })
  },
  disconnectSocket: () => {
    const socket = get().socket
    if (socket?.connected) {
      socket.disconnect()
    }
    set({ socket: null })
  }
}));

