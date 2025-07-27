import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import Sidebar from '../components/Sidebar';
import ChatContainer from '../components/ChatContainer';

const HomePage = () => {
  const { authUser } = useAuthStore();

  if (!authUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to continue</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="flex h-screen bg-base-100">
        <Sidebar />
        <ChatContainer />
      </div>
    </div>
  );
};

export default HomePage;