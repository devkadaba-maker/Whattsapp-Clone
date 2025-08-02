import { create } from 'zustand'
import toast from 'react-hot-toast'
import { axiosInstance } from '../lib/axios'
export const useChatStore = create((set) => ({
  messages :[],
    Users:[],
    selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () =>{
  set({isUsersLoading: true})
    try{
      const res = await axiosInstance.get("/messsages/users")
      set({users: res.data})
    }catch(error){
      console.log("error in getUsers store", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "error getting users")
    }finally{
      set({isUsersLoading: false})
    }
    
      
    },
  getMessages: async (userId) => {
    set({isMessagesLoading: true})
    try{
      const res = await axiosInstance.get(`/messages/${userId}`)
      set({messages: res.data})
    }catch(error){
      console.log("error in getMessages store", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "error getting messages")
    }finally{
      set({isMessagesLoading: false})
    }
  },
// todo:optimize this function
  setSelectedUser: async (selectedUser) => {
    set({selectedUser})
  }
}))