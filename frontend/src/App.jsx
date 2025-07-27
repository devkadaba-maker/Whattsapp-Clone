
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/signUpPage'
import LoginPage from './pages/loginPage'
import SettingsPage from './pages/settingsPage'
import ProfilePage from './pages/profilePage'

function App() {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      
      <div className="p-4">
        <h1 className="text-red-500 text-3xl font-bold mb-4">Hello World!</h1>
        <button className="btn btn-primary mr-2">DaisyUI Button</button>
        <button className="btn btn-secondary">Another Button</button>
      </div>

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
