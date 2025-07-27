import React from 'react';
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-lg font-semibold">💬</span>
              </div>
              <h1 className="text-lg font-bold">Chatty</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {authUser && (
              <>
                <span className="text-sm">Welcome, {authUser.fullName}</span>
                <button
                  className="btn btn-sm btn-outline"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;