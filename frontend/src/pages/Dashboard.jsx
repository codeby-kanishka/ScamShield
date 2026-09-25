import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '../api'

function Dashboard() {
  const [searchParams] = useSearchParams()

  const [phoneNumber, setPhoneNumber] = useState('')
  const [data, setData] = useState(null)

  const [stats, setStats] = useState(null)
  const [recentReports, setRecentReports] = useState([])
  const [categories, setCategories] = useState([])

  const [loading, setLoading] = useState(false)
  const [statsLoading, setStatsLoading] = useState(true)
  const [error, setError] = useState('')

  // -----------------------------
  // DASHBOARD STATISTICS
  // -----------------------------

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token')

        const response = await api.get(
          '/api/intelligence/stats',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        setStats(response.data.stats)
        setRecentReports(response.data.recentReports || [])
        setCategories(response.data.categories || [])

      } catch (error) {
        console.error('Dashboard stats error:', error)
      } finally {
        setStatsLoading(false)
      }
    }

    fetchStats()
  }, [])

  // -----------------------------
  // PHONE ANALYSIS
  // -----------------------------

  const analyzeNumber = async (number) => {
    const cleanedNumber = number.trim()

    if (!cleanedNumber) {
      setError('Please enter a phone number')
      return
    }

    try {
      setLoading(true)
      setError('')
      setData(null)

      const token = localStorage.getItem('token')

      const response = await api.get(
        `/api/intelligence/phone/${cleanedNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setData(response.data)

    } catch (error) {
      setError(
        error.response?.data?.message ||
        'Unable to analyze this phone number'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (event) => {
    event.preventDefault()
    analyzeNumber(phoneNumber)
  }

  // -----------------------------
  // HOME SEARCH REDIRECT
  // -----------------------------

  useEffect(() => {
    const phone = searchParams.get('phone')

    if (phone) {
      setPhoneNumber(phone)
      analyzeNumber(phone)
    }
  }, [searchParams])

  // -----------------------------
  // HELPERS
  // -----------------------------

  const getRiskClasses = (level) => {
    if (level === 'HIGH') {
      return {
        badge:
          'border-red-500/20 bg-red-500/10 text-red-400',
        text: 'text-red-400',
        bar: 'bg-red-500'
      }
    }

    if (level === 'MEDIUM') {
      return {
        badge:
          'border-yellow-500/20 bg-yellow-500/10 text-yellow-400',
        text: 'text-yellow-400',
        bar: 'bg-yellow-400'
      }
    }

    return {
      badge:
        'border-emerald-500/20 bg-emerald-500/10 text-emerald-400',
      text: 'text-emerald-400',
      bar: 'bg-emerald-400'
    }
  }

  const risk = data
    ? getRiskClasses(data.riskLevel)
    : null

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">

      {/* HEADER */}

      <section className="mb-8">

        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-cyan-400">
          <span className="h-2 w-2 rounded-full bg-cyan-400" />

          THREAT INTELLIGENCE
        </div>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Security Dashboard
        </h1>

        <p className="mt-3 max-w-2xl text-slate-400">
          Monitor reported threats, analyze suspicious numbers,
          and understand scam activity through ScamShield.
        </p>

      </section>

      {/* STATS */}

      <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <p className="text-sm text-slate-500">
            Total Reports
          </p>

          <p className="mt-2 text-3xl font-bold">
            {statsLoading ? '—' : stats?.totalReports || 0}
          </p>

          <p className="mt-2 text-xs text-slate-600">
            Community reports
          </p>
        </div>


        <div className="rounded-2xl border border-emerald-500/10 bg-slate-900/60 p-5">
          <p className="text-sm text-slate-500">
            Verified Reports
          </p>

          <p className="mt-2 text-3xl font-bold text-emerald-400">
            {statsLoading ? '—' : stats?.verifiedReports || 0}
          </p>

          <p className="mt-2 text-xs text-slate-600">
            Reviewed by administrators
          </p>
        </div>


        <div className="rounded-2xl border border-yellow-500/10 bg-slate-900/60 p-5">
          <p className="text-sm text-slate-500">
            Pending Reports
          </p>

          <p className="mt-2 text-3xl font-bold text-yellow-400">
            {statsLoading ? '—' : stats?.pendingReports || 0}
          </p>

          <p className="mt-2 text-xs text-slate-600">
            Awaiting review
          </p>
        </div>


        <div className="rounded-2xl border border-red-500/10 bg-slate-900/60 p-5">
          <p className="text-sm text-slate-500">
            Reported Loss
          </p>

          <p className="mt-2 text-3xl font-bold">
            ₹{(stats?.totalLoss || 0).toLocaleString('en-IN')}
          </p>

          <p className="mt-2 text-xs text-slate-600">
            Across submitted reports
          </p>
        </div>

      </section>

      {/* PHONE SEARCH */}

      <section className="mb-8 rounded-3xl border border-cyan-500/10 bg-slate-900/60 p-6">

        <div className="mb-5">

          <h2 className="text-xl font-semibold">
            Check a phone number
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Search ScamShield's community threat intelligence.
          </p>

        </div>

        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-3 md:flex-row"
        >

          <input
            type="tel"
            value={phoneNumber}
            onChange={(event) =>
              setPhoneNumber(event.target.value)
            }
            placeholder="Enter phone number e.g. 9876543210"
            className="flex-1 rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-600 focus:border-cyan-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-cyan-400 px-8 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-60"
          >
            {loading ? 'Analyzing...' : 'Analyze Number →'}
          </button>

        </form>

        {error && (
          <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            ⚠ {error}
          </div>
        )}

      </section>

      {/* SEARCH RESULT */}

      {data && risk && (
        <section className="mb-8">

          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Intelligence result
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                {data.phoneNumber}
              </h2>
            </div>

            <span
              className={`w-fit rounded-full border px-4 py-2 text-sm font-bold ${risk.badge}`}
            >
              {data.riskLevel} RISK
            </span>

          </div>

          <div className="grid gap-4 md:grid-cols-3">

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <p className="text-sm text-slate-500">
                Risk Score
              </p>

              <p className={`mt-2 text-4xl font-bold ${risk.text}`}>
                {data.riskScore}
                <span className="text-lg text-slate-600">
                  /100
                </span>
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <p className="text-sm text-slate-500">
                Reports Found
              </p>

              <p className="mt-2 text-4xl font-bold">
                {data.reportCount}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <p className="text-sm text-slate-500">
                Reported Loss
              </p>

              <p className="mt-2 text-4xl font-bold">
                ₹{data.totalLoss.toLocaleString('en-IN')}
              </p>
            </div>

          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">

              <p className="text-sm text-slate-400">
                Scam Types
              </p>

              <div className="mt-4 flex flex-wrap gap-2">

                {data.scamTypes.map((type) => (
                  <span
                    key={type}
                    className="rounded-lg border border-purple-500/20 bg-purple-500/10 px-3 py-2 text-sm text-purple-300"
                  >
                    {type}
                  </span>
                ))}

              </div>

            </div>


            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">

              <p className="text-sm text-slate-400">
                Risk Assessment
              </p>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-800">

                <div
                  className={`h-full rounded-full ${risk.bar}`}
                  style={{
                    width: `${data.riskScore}%`
                  }}
                />

              </div>

              <div className="mt-3 flex justify-between text-sm">

                <span className="text-slate-500">
                  Calculated risk
                </span>

                <span className={`font-semibold ${risk.text}`}>
                  {data.riskLevel}
                </span>

              </div>

              <p className="mt-4 text-xs leading-5 text-slate-600">
                This score is a risk indicator based on reported
                activity and should not be treated as proof of fraud.
              </p>

            </div>

          </div>

        </section>
      )}

      {/* LOWER DASHBOARD */}

      <section className="grid gap-6 lg:grid-cols-2">

        {/* RECENT ACTIVITY */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">

          <div className="mb-5">

            <h2 className="font-semibold">
              Recent Threat Activity
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Latest reports submitted to ScamShield
            </p>

          </div>

          {recentReports.length === 0 ? (

            <p className="py-8 text-center text-sm text-slate-600">
              No reports yet.
            </p>

          ) : (

            <div className="space-y-3">

              {recentReports.map((report) => (

                <div
                  key={report._id}
                  className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 p-4"
                >

                  <div>

                    <p className="font-medium">
                      {report.scamType}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {report.city || 'Unknown location'}
                      {report.state ? `, ${report.state}` : ''}
                    </p>

                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      report.status === 'Verified'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-yellow-500/10 text-yellow-400'
                    }`}
                  >
                    {report.status}
                  </span>

                </div>

              ))}

            </div>

          )}

        </div>


        {/* SCAM CATEGORIES */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">

          <div className="mb-5">

            <h2 className="font-semibold">
              Scam Categories
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Distribution of reported scam types
            </p>

          </div>

          {categories.length === 0 ? (

            <p className="py-8 text-center text-sm text-slate-600">
              No category data available.
            </p>

          ) : (

            <div className="space-y-5">

              {categories.map((category) => {

                const maxCount =
                  categories[0]?.count || 1

                const width =
                  Math.max(
                    (category.count / maxCount) * 100,
                    5
                  )

                return (
                  <div key={category.name}>

                    <div className="mb-2 flex justify-between text-sm">

                      <span className="text-slate-400">
                        {category.name}
                      </span>

                      <span className="text-slate-500">
                        {category.count}
                      </span>

                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-800">

                      <div
                        className="h-full rounded-full bg-cyan-400"
                        style={{ width: `${width}%` }}
                      />

                    </div>

                  </div>
                )
              })}

            </div>

          )}

        </div>

      </section>

    </main>
  )
}

export default Dashboard