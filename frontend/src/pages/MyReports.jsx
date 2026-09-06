import { useEffect, useState } from 'react'
import axios from 'axios'

function MyReports() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token')

        const response = await axios.get(
          'http://localhost:5000/api/reports/my',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        setReports(response.data.reports || response.data)
      } catch (error) {
        setError(
          error.response?.data?.message ||
          'Failed to load your reports.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [])

  const getStatusStyle = (status) => {
    if (status === 'Verified') {
      return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
    }

    if (status === 'Resolved') {
      return 'border-cyan-500/20 bg-cyan-500/10 text-cyan-400'
    }

    return 'border-yellow-500/20 bg-yellow-500/10 text-yellow-400'
  }

  return (
    <main className="mx-auto max-w-7xl animate-fade-up px-6 py-10">

      {/* HEADER */}
      <section className="mb-10">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-cyan-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
          YOUR ACTIVITY
        </div>

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              My Reports
            </h1>

            <p className="mt-3 max-w-2xl text-slate-400">
              Track the scam reports you've submitted to
              the ScamShield community.
            </p>
          </div>

          {!loading && !error && reports.length > 0 && (
            <div className="rounded-full border border-slate-800 bg-slate-900/60 px-4 py-2 text-sm text-slate-400">
              {reports.length} {reports.length === 1 ? 'Report' : 'Reports'}
            </div>
          )}
        </div>
      </section>

      {/* LOADING */}
      {loading && (
        <div className="animate-scale-in rounded-3xl border border-slate-800 bg-slate-900/50 p-12 text-center">

          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/10">
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
          </div>

          <h2 className="font-semibold">
            Loading your reports
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Fetching your submitted scam reports...
          </p>

        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="animate-fade-up rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-red-400">
          <div className="flex items-center gap-3">
            <span className="text-lg">⚠</span>

            <div>
              <p className="font-semibold">
                Unable to load reports
              </p>

              <p className="mt-1 text-sm text-red-400/70">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* EMPTY */}
      {!loading && !error && reports.length === 0 && (
        <section className="animate-fade-up rounded-3xl border border-dashed border-slate-800 bg-slate-900/30 px-6 py-16 text-center">

          <div className="animate-float mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/10 text-2xl">
            📋
          </div>

          <h2 className="text-xl font-semibold">
            No reports yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            You haven't submitted any scam reports.
            Reports you submit will appear here.
          </p>

        </section>
      )}

      {/* REPORTS */}
      {!loading && !error && reports.length > 0 && (
        <div className="grid gap-5">

          {reports.map((report, index) => (
            <article
              key={report._id}
              className="card-hover animate-scale-in rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur"
              style={{
                animationDelay: `${index * 0.08}s`,
              }}
            >

              {/* TOP */}
              <div className="flex flex-col justify-between gap-5 md:flex-row">

                <div className="min-w-0 flex-1">

                  <div className="flex flex-wrap items-center gap-3">

                    <div className="flex items-center gap-2">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10 text-sm">
                        ☎
                      </span>

                      <h2 className="text-lg font-semibold">
                        {report.phoneNumber}
                      </h2>
                    </div>

                    <span className="rounded-lg border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
                      {report.scamType}
                    </span>

                  </div>

                  {/* DESCRIPTION */}
                  <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/30 p-4">

                    <p className="text-xs font-medium uppercase tracking-wider text-slate-600">
                      Incident description
                    </p>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {report.description}
                    </p>

                  </div>

                </div>

                {/* AMOUNT */}
                <div className="shrink-0 md:min-w-[170px] md:text-right">

                  <p className="text-xs uppercase tracking-wider text-slate-600">
                    Amount Lost
                  </p>

                  <p className="mt-2 text-2xl font-bold text-slate-100">
                    ₹{(report.amountLost || 0).toLocaleString('en-IN')}
                  </p>

                  <p className="mt-1 text-xs text-slate-600">
                    Reported financial impact
                  </p>

                </div>

              </div>

              {/* BOTTOM */}
              <div className="mt-6 flex flex-col gap-4 border-t border-slate-800 pt-5 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-3">

                  <span
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                      report.status
                    )}`}
                  >
                    {report.status === 'Verified' && '✓ '}
                    {report.status === 'Pending' && '◷ '}
                    {report.status === 'Resolved' && '✓ '}
                    {report.status}
                  </span>

                  {report.status === 'Pending' && (
                    <span className="text-xs text-slate-600">
                      Awaiting review
                    </span>
                  )}

                  {report.status === 'Verified' && (
                    <span className="text-xs text-emerald-400/60">
                      Reviewed by ScamShield
                    </span>
                  )}

                </div>

                <div className="text-xs text-slate-600">
                  Submitted{' '}
                  <span className="text-slate-500">
                    {new Date(report.createdAt).toLocaleDateString(
                      'en-IN',
                      {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      }
                    )}
                  </span>
                </div>

              </div>

            </article>
          ))}

        </div>
      )}

    </main>
  )
}

export default MyReports