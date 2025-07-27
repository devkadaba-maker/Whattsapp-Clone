
const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">ChatApp</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><a href="/">Home</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/signup">Sign Up</a></li>
          <li><a href="/settings">Settings</a></li>
          <li><a href="/profile">Profile</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
