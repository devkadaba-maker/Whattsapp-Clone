import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios.js';

export const useChatStore = create((set, get) => ({
  users: [],
  selectedUser: null,
  isUsersLoading: false,

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

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));