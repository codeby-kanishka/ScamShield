import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      setLoading(true)

      await axios.post(
        'http://localhost:5000/api/auth/register',
        {
          name,
          email,
          password,
        }
      )

      navigate('/login')
    } catch (error) {
      setError(
        error.response?.data?.message ||
        'Registration failed. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-81px)] items-center justify-center px-6 py-10">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="mb-8 text-center">

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-2xl">
            🛡️
          </div>

          <h2 className="text-3xl font-bold text-slate-100">
            Create your account
          </h2>

          <p className="mt-2 text-slate-400">
            Join ScamShield and help fight digital scams
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl backdrop-blur"
        >

          {/* Name */}
          <div className="mb-5">

            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Full Name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              required
              className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400"
            />

          </div>

          {/* Email */}
          <div className="mb-5">

            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
               autoComplete="off"
              className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400"
            />

          </div>

          {/* Password */}
          <div className="mb-5">

            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a password"
              required
              className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400"
            />

          </div>

          {/* Confirm Password */}
          <div className="mb-5">

            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirm your password"
              required
               autoComplete="new-password"
              className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400"
            />

          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-cyan-400 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-cyan-400 transition hover:text-cyan-300"
            >
              Sign In
            </Link>
          </p>

        </form>

      </div>
    </div>
  )
}

export default Register