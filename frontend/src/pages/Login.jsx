import { useState } from 'react'
import api from '../api'
import { Link,useNavigate } from 'react-router-dom'

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
  event.preventDefault()

  setError('')

  try {
    const response = await api.post(
      '/api/auth/login',
      {
        email,
        password,
      }
    )

    console.log('Login successful:', response.data)

    localStorage.setItem('token', response.data.token)

    setEmail('')
    setPassword('')

    navigate('/dashboard')

  } catch (error) {

    setError(
      error.response?.data?.message ||
      'Invalid email or password. Please try again.'
    )

  }
}

  return (
    <div className="flex min-h-[calc(100vh-81px)] items-center justify-center px-6">
      <div className="w-full max-w-md">

        <div className="mb-8 text-center">

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-2xl">
            🛡️
          </div>

          <h2 className="text-3xl font-bold">
            Welcome back
          </h2>

          <p className="mt-2 text-slate-400">
            Sign in to your ScamShield account
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl backdrop-blur"
        >

          <div className="mb-5">

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
               autoComplete="off"
              className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400"
            />

          </div>

          <div className="mb-6">

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
               autoComplete="new-password"
              className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400"
            />

          </div>

        {error && (
  <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
    {error}
  </div>
)}
          <button
            type="submit"
            className="w-full rounded-xl bg-cyan-400 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Sign In
          </button>

          <p className="mt-6 text-center text-sm text-slate-400">
  Don't have an account?{' '}
  <Link
    to="/register"
    className="font-medium text-cyan-400 transition hover:text-cyan-300"
  >
    Create Account
  </Link>
</p>

        </form>

      </div>
    </div>
  )
}

export default Login