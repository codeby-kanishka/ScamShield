
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className="border-b border-slate-800 bg-[#070B14]/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-xl">
            🛡️
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-100">
              ScamShield
            </h1>

            <p className="text-xs text-slate-500">
              Digital Threat Intelligence
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          <Link
            to="/"
            className="text-sm text-slate-300 transition hover:text-cyan-400"
          >
            Dashboard
          </Link>

          <Link
            to="/reports"
            className="text-sm text-slate-400 transition hover:text-cyan-400"
          >
            Reports
          </Link>

          <Link
            to="/my-reports"
            className="text-sm text-slate-400 transition hover:text-cyan-400"
          >
            My Reports
          </Link>

          <Link
  to="/threat-map"
  className="text-sm text-slate-400 transition hover:text-cyan-400"
>
  Threat Map
</Link>

          <Link
            to="/intelligence"
            className="text-sm text-slate-400 transition hover:text-cyan-400"
          >
            Intelligence
          </Link>

        </div>

        {/* Auth */}
        {token ? (
          <button
            onClick={handleLogout}
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-red-400/50 hover:text-red-400"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-cyan-400/50 hover:text-cyan-400"
          >
            Sign In
          </Link>
        )}

      </div>
    </nav>
  )
}

export default Navbar