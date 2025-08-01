import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { MessageSquare, Settings, User, LogOut, Home } from 'lucide-react';

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  if (authUser) {
    return (
      <div className="navbar bg-base-100 border-b border-base-300">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">ChatApp</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><a href="/"><Home className="w-4 h-4 mr-2" />Home</a></li>
            <li><a href="/settings"><Settings className="w-4 h-4 mr-2" />Settings</a></li>
            <li><a href="/profile"><User className="w-4 h-4 mr-2" />Profile</a></li>
            <li><button onClick={logout} className="btn btn-ghost"><LogOut className="w-4 h-4 mr-2" />Logout</button></li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="navbar bg-base-100 border-b border-base-300">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">ChatApp</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><a href="/">Home</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/signup">Signup</a></li>
          <li><a href="/settings">Settings</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;