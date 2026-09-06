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

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">

      {/* Header */}
      <section className="mb-8">
        <p className="mb-2 text-sm font-medium text-cyan-400">
          YOUR ACTIVITY
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          My Reports
        </h1>

        <p className="mt-2 text-slate-400">
          View the scam reports you have submitted to ScamShield.
        </p>
      </section>

      {/* Loading */}
      {loading && (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-10 text-center">
          <p className="text-slate-400">
            Loading your reports...
          </p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-red-400">
          {error}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && reports.length === 0 && (
        <div className="rounded-3xl border border-dashed border-slate-800 bg-slate-900/30 p-12 text-center">

          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10 text-2xl">
            📋
          </div>

          <h2 className="text-xl font-semibold">
            No reports yet
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            You haven't submitted any scam reports.
          </p>

        </div>
      )}

      {/* Reports */}
      {!loading && !error && reports.length > 0 && (
        <div className="grid gap-5">

          {reports.map((report) => (
            <div
              key={report._id}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition hover:border-slate-700"
            >

              <div className="flex flex-col justify-between gap-4 md:flex-row">

                <div>

                  <div className="flex flex-wrap items-center gap-3">

                    <h2 className="text-lg font-semibold">
                      {report.phoneNumber}
                    </h2>

                    <span className="rounded-lg bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
                      {report.scamType}
                    </span>

                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {report.description}
                  </p>

                </div>

                <div className="shrink-0 md:text-right">

                  <p className="text-sm text-slate-500">
                    Amount Lost
                  </p>

                  <p className="mt-1 text-xl font-bold">
                    ₹{(report.amountLost || 0).toLocaleString('en-IN')}
                  </p>

                </div>

              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    report.status === 'Verified'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-yellow-500/10 text-yellow-400'
                  }`}
                >
                  {report.status}
                </span>

                <span className="text-xs text-slate-600">
                  {new Date(report.createdAt).toLocaleDateString('en-IN')}
                </span>

              </div>

            </div>
          ))}

        </div>
      )}

    </main>
  )
}

export default MyReports