import { useEffect, useState } from 'react'
import axios from 'axios'

function AdminDashboard() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [verifyingId, setVerifyingId] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem('token')

      const response = await axios.get(
        'http://localhost:5000/api/reports',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setReports(response.data.reports || [])
    } catch (error) {
      setError(
        error.response?.data?.message ||
        'Failed to load reports.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReports()
  }, [])

  const handleVerify = async (reportId) => {
    try {
      setVerifyingId(reportId)
      setError('')
      setSuccess('')

      const token = localStorage.getItem('token')

      await axios.put(
        `http://localhost:5000/api/reports/${reportId}/verify`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setSuccess('Report verified successfully.')

      await fetchReports()
    } catch (error) {
      setError(
        error.response?.data?.message ||
        'Failed to verify report.'
      )
    } finally {
      setVerifyingId(null)
    }
  }

  const pendingReports = reports.filter(
    (report) => report.status === 'Pending'
  )

  const verifiedReports = reports.filter(
    (report) => report.status === 'Verified'
  )

  const totalLoss = reports.reduce(
    (sum, report) => sum + (report.amountLost || 0),
    0
  )

  return (
    <main className="mx-auto max-w-7xl animate-fade-up px-6 py-10">

      {/* HEADER */}
      <section className="mb-10">

        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-purple-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-purple-400" />
          ADMIN CONTROL CENTER
        </div>

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Security Operations
            </h1>

            <p className="mt-3 max-w-2xl text-slate-400">
              Review community reports, verify incidents,
              and manage ScamShield threat intelligence.
            </p>
          </div>

          <div className="animate-purple-glow flex w-fit items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-300">
            <span>🛡️</span>
            Administrator
          </div>

        </div>

      </section>

      {/* ALERTS */}
      {error && (
        <div className="animate-fade-up mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-400">
          <div className="flex items-center gap-3">
            <span>⚠</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {success && (
        <div className="animate-fade-up mb-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-400">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400/10">
              ✓
            </span>

            <div>
              <p className="font-semibold">
                Report verified
              </p>

              <p className="text-xs text-emerald-400/70">
                The threat intelligence database has been updated.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* STATS */}
      <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div
          className="card-hover animate-scale-in rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
          style={{ animationDelay: '0.05s' }}
        >
          <div className="flex items-start justify-between">
            <p className="text-sm text-slate-500">
              Total Reports
            </p>

            <span className="rounded-lg bg-cyan-400/10 px-2 py-1 text-xs text-cyan-400">
              ALL
            </span>
          </div>

          <p className="mt-3 text-4xl font-bold">
            {reports.length}
          </p>

          <p className="mt-2 text-xs text-slate-600">
            Community incidents
          </p>
        </div>

        <div
          className="card-hover animate-scale-in rounded-2xl border border-yellow-500/10 bg-slate-900/60 p-6"
          style={{ animationDelay: '0.12s' }}
        >
          <div className="flex items-start justify-between">
            <p className="text-sm text-slate-500">
              Pending Review
            </p>

            <span className="rounded-lg bg-yellow-400/10 px-2 py-1 text-xs text-yellow-400">
              ACTION
            </span>
          </div>

          <p className="mt-3 text-4xl font-bold text-yellow-400">
            {pendingReports.length}
          </p>

          <p className="mt-2 text-xs text-slate-600">
            Require administrator review
          </p>
        </div>

        <div
          className="card-hover animate-scale-in rounded-2xl border border-emerald-500/10 bg-slate-900/60 p-6"
          style={{ animationDelay: '0.19s' }}
        >
          <div className="flex items-start justify-between">
            <p className="text-sm text-slate-500">
              Verified
            </p>

            <span className="rounded-lg bg-emerald-400/10 px-2 py-1 text-xs text-emerald-400">
              TRUSTED
            </span>
          </div>

          <p className="mt-3 text-4xl font-bold text-emerald-400">
            {verifiedReports.length}
          </p>

          <p className="mt-2 text-xs text-slate-600">
            Confirmed scam reports
          </p>
        </div>

        <div
          className="card-hover animate-scale-in rounded-2xl border border-red-500/10 bg-slate-900/60 p-6"
          style={{ animationDelay: '0.26s' }}
        >
          <div className="flex items-start justify-between">
            <p className="text-sm text-slate-500">
              Reported Loss
            </p>

            <span className="rounded-lg bg-red-400/10 px-2 py-1 text-xs text-red-400">
              IMPACT
            </span>
          </div>

          <p className="mt-3 text-3xl font-bold text-red-400">
            ₹{totalLoss.toLocaleString('en-IN')}
          </p>

          <p className="mt-2 text-xs text-slate-600">
            Total financial impact
          </p>
        </div>

      </section>

      {/* REVIEW QUEUE */}
      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl backdrop-blur md:p-8">

        <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold">
                Report Review Queue
              </h2>

              {pendingReports.length > 0 && (
                <span className="animate-pulse rounded-full bg-yellow-400/10 px-2.5 py-1 text-xs font-semibold text-yellow-400">
                  {pendingReports.length} pending
                </span>
              )}
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Review submitted incidents and verify legitimate reports.
            </p>
          </div>

          <div className="text-xs text-slate-600">
            {reports.length} total incidents
          </div>

        </div>

        {/* LOADING */}
        {loading && (
          <div className="animate-scale-in rounded-2xl border border-slate-800 bg-slate-950/40 p-12 text-center">

            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10">
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-purple-400 border-t-transparent" />
            </div>

            <h3 className="font-semibold">
              Loading security queue
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Fetching community reports...
            </p>

          </div>
        )}

        {/* EMPTY */}
        {!loading && reports.length === 0 && (
          <div className="animate-fade-up rounded-2xl border border-dashed border-slate-800 p-12 text-center">

            <div className="animate-float mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-xl">
              📋
            </div>

            <h3 className="font-semibold">
              Queue is clear
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              There are currently no scam reports to review.
            </p>

          </div>
        )}

        {/* REPORT LIST */}
        {!loading && reports.length > 0 && (
          <div className="space-y-4">

            {reports.map((report, index) => (
              <article
                key={report._id}
                className={`card-hover animate-scale-in rounded-2xl border p-5 ${
                  report.status === 'Pending'
                    ? 'border-yellow-500/10 bg-slate-950/50'
                    : 'border-slate-800 bg-slate-950/30'
                }`}
                style={{
                  animationDelay: `${index * 0.08}s`,
                }}
              >

                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                  {/* DETAILS */}
                  <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap items-center gap-3">

                      <div className="flex items-center gap-2">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10 text-sm">
                          ☎
                        </span>

                        <h3 className="text-lg font-semibold">
                          {report.phoneNumber}
                        </h3>
                      </div>

                      <span className="rounded-lg border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
                        {report.scamType}
                      </span>

                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                          report.status === 'Verified'
                            ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                            : report.status === 'Resolved'
                              ? 'border-cyan-500/20 bg-cyan-500/10 text-cyan-400'
                              : 'border-yellow-500/20 bg-yellow-500/10 text-yellow-400'
                        }`}
                      >
                        {report.status === 'Verified' && '✓ '}
                        {report.status === 'Pending' && '◷ '}
                        {report.status === 'Resolved' && '✓ '}
                        {report.status}
                      </span>

                    </div>

                    {/* DESCRIPTION */}
                    <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/40 p-4">

                      <p className="text-xs font-medium uppercase tracking-wider text-slate-600">
                        Incident
                      </p>

                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {report.description}
                      </p>

                    </div>

                    {/* META */}
                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500">

                      <span>
                        Loss:{' '}
                        <span className="font-medium text-slate-300">
                          ₹{(report.amountLost || 0).toLocaleString('en-IN')}
                        </span>
                      </span>

                      <span>
                        Reported:{' '}
                        <span className="font-medium text-slate-300">
                          {new Date(report.createdAt).toLocaleDateString(
                            'en-IN',
                            {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            }
                          )}
                        </span>
                      </span>

                    </div>

                  </div>

                  {/* ACTION */}
                  <div className="shrink-0 lg:pt-1">

                    {report.status === 'Pending' ? (

                      <button
                        onClick={() => handleVerify(report._id)}
                        disabled={verifyingId === report._id}
                        className="button-glow w-full rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60 lg:w-auto"
                      >
                        {verifyingId === report._id ? (
                          <span className="flex items-center justify-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                            Verifying...
                          </span>
                        ) : (
                          '✓ Verify Report'
                        )}
                      </button>

                    ) : (

                      <div className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 px-5 py-3 text-sm text-slate-500">
                        <span className="text-emerald-400">
                          ✓
                        </span>
                        Reviewed
                      </div>

                    )}

                  </div>

                </div>

              </article>
            ))}

          </div>
        )}

      </section>

      {/* FOOTER */}
      <div className="mt-5 text-center text-xs text-slate-600">
        ScamShield administrator tools • Community threat intelligence
      </div>

    </main>
  )
}

export default AdminDashboard