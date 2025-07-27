
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const Navbar = () => {
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
