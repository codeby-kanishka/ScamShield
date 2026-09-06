
import { Link } from 'react-router-dom'

function Navbar() {
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
            to="/intelligence"
            className="text-sm text-slate-400 transition hover:text-cyan-400"
          >
            Intelligence
          </Link>

        </div>

        {/* Sign In */}
        <Link
          to="/login"
          className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-cyan-400/50 hover:text-cyan-400"
        >
          Sign In
        </Link>

      </div>
    </nav>
  )
}

export default Navbar