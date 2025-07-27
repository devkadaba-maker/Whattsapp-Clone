
import { create } from 'zustand';
import toast from 'react-hot-toast';

const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api' 
  : `https://${window.location.hostname}:5000/api`;

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/check`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        set({ authUser: data, isCheckingAuth: false });
      } else {
        set({ authUser: null, isCheckingAuth: false });
      }
    } catch (error) {
      console.log('Error in checkAuth:', error);
      set({ authUser: null, isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      const result = await res.json();
      if (res.ok) {
        set({ authUser: result, isSigningUp: false });
        toast.success('Account created successfully');
      } else {
        toast.error(result.message);
        set({ isSigningUp: false });
      }
    } catch (error) {
      toast.error('Something went wrong');
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      const result = await res.json();
      if (res.ok) {
        set({ authUser: result, isLoggingIn: false });
        toast.success('Logged in successfully');
      } else {
        toast.error(result.message);
        set({ isLoggingIn: false });
      }
    } catch (error) {
      toast.error('Something went wrong');
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      set({ authUser: null });
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Something went wrong');
    }
  },
}));
