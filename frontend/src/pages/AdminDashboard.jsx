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
    <main className="mx-auto max-w-7xl px-6 py-10">

      {/* Header */}
      <section className="mb-8">
        <p className="mb-2 text-sm font-medium text-purple-400">
          ADMIN CONTROL CENTER
        </p>

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-slate-400">
              Review community reports and manage threat intelligence.
            </p>
          </div>

          <div className="rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-300">
            🛡️ Administrator
          </div>
        </div>
      </section>

      {/* Messages */}
      {error && (
        <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-400">
          {success}
        </div>
      )}

      {/* Stats */}
      <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <p className="text-sm text-slate-500">
            Total Reports
          </p>

          <p className="mt-2 text-4xl font-bold">
            {reports.length}
          </p>
        </div>

        <div className="rounded-2xl border border-yellow-500/10 bg-slate-900/60 p-6">
          <p className="text-sm text-slate-500">
            Pending Review
          </p>

          <p className="mt-2 text-4xl font-bold text-yellow-400">
            {pendingReports.length}
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-500/10 bg-slate-900/60 p-6">
          <p className="text-sm text-slate-500">
            Verified Reports
          </p>

          <p className="mt-2 text-4xl font-bold text-emerald-400">
            {verifiedReports.length}
          </p>
        </div>

        <div className="rounded-2xl border border-cyan-500/10 bg-slate-900/60 p-6">
          <p className="text-sm text-slate-500">
            Reported Loss
          </p>

          <p className="mt-2 text-3xl font-bold text-cyan-400">
            ₹{totalLoss.toLocaleString('en-IN')}
          </p>
        </div>

      </section>

      {/* Reports */}
      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl backdrop-blur">

        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            Report Review Queue
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Review submitted reports and verify legitimate scam reports.
          </p>
        </div>

        {loading && (
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-10 text-center">
            <p className="text-slate-400">
              Loading reports...
            </p>
          </div>
        )}

        {!loading && reports.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-800 p-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-xl">
              📋
            </div>

            <h3 className="font-semibold">
              No reports found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              There are currently no scam reports to review.
            </p>
          </div>
        )}

        {!loading && reports.length > 0 && (
          <div className="space-y-4">

            {reports.map((report) => (
              <div
                key={report._id}
                className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5 transition hover:border-slate-700"
              >

                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                  {/* Report information */}
                  <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap items-center gap-3">

                      <h3 className="text-lg font-semibold">
                        {report.phoneNumber}
                      </h3>

                      <span className="rounded-lg bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
                        {report.scamType}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          report.status === 'Verified'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : report.status === 'Resolved'
                              ? 'bg-cyan-500/10 text-cyan-400'
                              : 'bg-yellow-500/10 text-yellow-400'
                        }`}
                      >
                        {report.status}
                      </span>

                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {report.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-5 text-xs text-slate-500">

                      <span>
                        Loss:{' '}
                        <span className="font-medium text-slate-300">
                          ₹{(report.amountLost || 0).toLocaleString('en-IN')}
                        </span>
                      </span>

                      <span>
                        Reported:{' '}
                        <span className="font-medium text-slate-300">
                          {new Date(report.createdAt).toLocaleDateString('en-IN')}
                        </span>
                      </span>

                    </div>

                  </div>

                  {/* Action */}
                  <div className="shrink-0">

                    {report.status === 'Pending' ? (
                      <button
                        onClick={() => handleVerify(report._id)}
                        disabled={verifyingId === report._id}
                        className="w-full rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60 lg:w-auto"
                      >
                        {verifyingId === report._id
                          ? 'Verifying...'
                          : '✓ Verify Report'}
                      </button>
                    ) : (
                      <div className="rounded-xl border border-slate-800 px-5 py-3 text-sm text-slate-500">
                        ✓ Reviewed
                      </div>
                    )}

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </section>

    </main>
  )
}

export default AdminDashboard