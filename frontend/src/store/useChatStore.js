import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios.js';

export const useChatStore = create((set, get) => ({
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  messages: [],
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get('/messages/users');
      set({ users: res.data });
    } catch (error) {
      console.log('Error in getUsers:', error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || 'Failed to get users');
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      console.log('Error in getMessages:', error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || 'Failed to get messages');
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messagedData) => {
    const { selectedUser, messages } = get()
    try {
      const res = await axiosInstance.post(`/messages/${selectedUser._id}`, messagedData)
      set({ messages: [...messages, res.data] })
    } catch (error) {
      toast.error(error.response?.data?.message || "error sending message")
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}))