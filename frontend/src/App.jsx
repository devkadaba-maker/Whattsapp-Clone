import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/signUpPage'
import LoginPage from './pages/loginPage'
import SettingsPage from './pages/settingsPage'
import ProfilePage from './pages/profilePage'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from "lucide-react"
const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()

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
    <div className="min-h-screen bg-base-100">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  )
}

export default App
