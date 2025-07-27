import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  })

  const { signup, isSigningUp } = useAuthStore()

  const validateForm = () => {
    if (!formData.fullName.trim()) return false
    if (!formData.email.trim()) return false
    if (!formData.password) return false
    if (formData.password.length < 6) return false

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const success = validateForm()

    if (success === true) signup(formData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <span className="text-2xl">💬</span>
            </div>
            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
            <p className="text-base-content/60">Get started with your free account</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSigningUp || !validateForm()}
          >
            {isSigningUp ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Loading...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="text-base-content/60">
            Already have an account?{' '}
            <Link to="/login" className="link link-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage