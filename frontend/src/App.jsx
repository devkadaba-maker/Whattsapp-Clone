import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/signUpPage'
import LoginPage from './pages/loginPage'
import SettingsPage from './pages/settingsPage'
import ProfilePage from './pages/profilePage'
import { useAuthStore } from './store/useAuthStore'
import { Navigate } from 'react-router-dom'
import { Loader } from "lucide-react"
import { Toaster } from 'react-hot-toast'
import './index.css'
import { useThemeStore } from './store/useThemeStore'

const App = () => {
  const {authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore()
 const { theme } = useThemeStore()
 console.log({onlineUsers})

  useEffect(() => {
    checkAuth()
  },[checkAuth])

  console.log({authUser})

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-base-100" data-theme={theme}>
      <Navbar />
      

      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to='/login'/>} />
        <Route path="/signup" element={ !authUser ? <SignUpPage /> : <Navigate to="/"/>} />
        <Route path="/login" element={ !authUser ? <LoginPage /> : <Navigate to="/"/>} />
        <Route path="/settings" element={<SettingsPage /> } />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to='/login'/>} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
