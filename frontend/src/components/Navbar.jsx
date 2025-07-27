
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

import React from 'react';
import { useAuthStore } from '../store/useAuthStore';

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
  const { logout, authUser } = useAuthStore()

  return (
    <div className="navbar bg-base-100 border-b border-base-300">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">💬 ChatApp</Link>
      </div>
      <div className="flex-none">
        {authUser && (
          <>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Profile"
                    src={authUser.profilepic || "/avatar-placeholder.png"}
                  />
                </div>
              </div>
              <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/settings">Settings</Link></li>
                <li><button onClick={logout}>Logout</button></li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
