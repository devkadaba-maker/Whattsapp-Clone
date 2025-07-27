
import { create } from 'zustand';
import toast from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:5000/api';

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await fetch(`${API_BASE_URL}/messages/users`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        set({ users: data, isUsersLoading: false });
      } else {
        toast.error(data.message);
        set({ isUsersLoading: false });
      }
    } catch (error) {
      toast.error('Failed to fetch users');
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await fetch(`${API_BASE_URL}/messages/${userId}`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        set({ messages: data, isMessagesLoading: false });
      } else {
        toast.error(data.message);
        set({ isMessagesLoading: false });
      }
    } catch (error) {
      toast.error('Failed to fetch messages');
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser } = get();
    try {
      const res = await fetch(`${API_BASE_URL}/messages/send/${selectedUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        set({ messages: [...get().messages, data] });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to send message');
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
