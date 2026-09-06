import { useState } from 'react'
import axios from 'axios'

function Dashboard() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (event) => {
    event.preventDefault()

    if (!phoneNumber.trim()) {
      setError('Please enter a phone number')
      return
    }

    try {
      setLoading(true)
      setError('')
      setData(null)

      const response = await axios.get(
        `http://localhost:5000/api/intelligence/phone/${phoneNumber}`
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

  const getRiskColor = () => {
    if (data?.riskLevel === 'HIGH') return 'red'
    if (data?.riskLevel === 'MEDIUM') return 'yellow'
    return 'emerald'
  }

  const riskColor = getRiskColor()

  return (
    <main className="mx-auto max-w-7xl animate-fade-up px-6 py-10">

      {/* HERO */}
      <section className="mb-10">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-cyan-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
          THREAT INTELLIGENCE
        </div>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Security Dashboard
        </h1>

        <p className="mt-3 max-w-2xl text-slate-400">
          Analyze suspicious phone numbers using ScamShield's
          risk intelligence engine and community reports.
        </p>
      </section>

      {/* SEARCH */}
      <section className="animate-scale-in mb-10 rounded-3xl border border-cyan-500/10 bg-slate-900/60 p-6 shadow-2xl backdrop-blur">

        <div className="mb-5">
          <h2 className="text-xl font-semibold">
            Check a phone number
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Search our scam intelligence database.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-3 md:flex-row"
        >
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">
              ☎
            </span>

            <input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              placeholder="Enter phone number e.g. 9876543210"
              className="input-focus w-full rounded-xl border border-slate-800 bg-slate-950/70 py-3 pl-11 pr-4 text-slate-100 outline-none placeholder:text-slate-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="button-glow rounded-xl bg-cyan-400 px-8 py-3 font-semibold text-slate-950 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                Analyzing...
              </span>
            ) : (
              'Analyze Number →'
            )}
          </button>
        </form>

        {error && (
          <div className="mt-4 animate-fade-in rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            ⚠ {error}
          </div>
        )}
      </section>

      {/* EMPTY STATE */}
      {!data && !loading && !error && (
        <section className="animate-fade-up rounded-3xl border border-dashed border-slate-800 bg-slate-900/30 px-6 py-16 text-center">

          <div className="animate-float mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/10 text-2xl">
            🔍
          </div>

          <h2 className="text-xl font-semibold">
            Ready to investigate
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Enter a suspicious phone number above to uncover
            reported scams, financial impact, and its calculated
            risk level.
          </p>

          <div className="mx-auto mt-6 flex max-w-md flex-wrap justify-center gap-2 text-xs text-slate-600">
            <span className="rounded-full border border-slate-800 px-3 py-1">
              Risk Score
            </span>

            <span className="rounded-full border border-slate-800 px-3 py-1">
              Scam Reports
            </span>

            <span className="rounded-full border border-slate-800 px-3 py-1">
              Financial Loss
            </span>
          </div>

        </section>
      )}

      {/* RESULTS */}
      {data && (
        <section className="animate-fade-up">

          {/* RESULT HEADER */}
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">

            <div>
              <p className="text-sm text-slate-500">
                Intelligence result
              </p>

              <div className="mt-1 flex items-center gap-3">
                <h2 className="text-2xl font-bold tracking-tight">
                  {data.phoneNumber}
                </h2>

                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-xs text-emerald-400">
                  ANALYZED
                </span>
              </div>
            </div>

            <div
              className={`animate-pulse-glow rounded-full border px-5 py-2 text-sm font-bold ${
                riskColor === 'red'
                  ? 'border-red-500/20 bg-red-500/10 text-red-400'
                  : riskColor === 'yellow'
                    ? 'border-yellow-500/20 bg-yellow-500/10 text-yellow-400'
                    : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
              }`}
            >
              {data.riskLevel} RISK
            </div>

          </div>

          {/* STAT CARDS */}
          <div className="grid gap-4 md:grid-cols-3">

            <div
              className="card-hover animate-scale-in rounded-2xl border border-cyan-500/10 bg-slate-900/60 p-6"
              style={{ animationDelay: '0.05s' }}
            >
              <div className="flex items-start justify-between">
                <p className="text-sm text-slate-500">
                  Risk Score
                </p>

                <span className="rounded-lg bg-cyan-400/10 px-2 py-1 text-xs text-cyan-400">
                  SCORE
                </span>
              </div>

              <p className="mt-3 text-4xl font-bold text-cyan-400">
                {data.riskScore}
                <span className="text-lg text-slate-600">
                  /100
                </span>
              </p>

              <p className="mt-2 text-xs text-slate-600">
                Calculated threat probability
              </p>
            </div>

            <div
              className="card-hover animate-scale-in rounded-2xl border border-purple-500/10 bg-slate-900/60 p-6"
              style={{ animationDelay: '0.15s' }}
            >
              <div className="flex items-start justify-between">
                <p className="text-sm text-slate-500">
                  Reports Found
                </p>

                <span className="rounded-lg bg-purple-500/10 px-2 py-1 text-xs text-purple-400">
                  REPORTS
                </span>
              </div>

              <p className="mt-3 text-4xl font-bold">
                {data.reportCount}
              </p>

              <p className="mt-2 text-xs text-slate-600">
                Community reports linked
              </p>
            </div>

            <div
              className="card-hover animate-scale-in rounded-2xl border border-red-500/10 bg-slate-900/60 p-6"
              style={{ animationDelay: '0.25s' }}
            >
              <div className="flex items-start justify-between">
                <p className="text-sm text-slate-500">
                  Reported Loss
                </p>

                <span className="rounded-lg bg-red-500/10 px-2 py-1 text-xs text-red-400">
                  IMPACT
                </span>
              </div>

              <p className="mt-3 text-4xl font-bold">
                ₹{data.totalLoss.toLocaleString('en-IN')}
              </p>

              <p className="mt-2 text-xs text-slate-600">
                Total reported financial loss
              </p>
            </div>

          </div>

          {/* LOWER CARDS */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">

            {/* SCAM TYPES */}
            <div className="card-hover rounded-2xl border border-slate-800 bg-slate-900/60 p-6">

              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">
                    Detected Scam Types
                  </p>

                  <p className="mt-1 text-xs text-slate-600">
                    Threat categories associated with this number
                  </p>
                </div>

                <span className="text-xl">
                  ⚠️
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {data.scamTypes.map((type, index) => (
                  <span
                    key={type}
                    className="animate-fade-up rounded-lg border border-purple-500/20 bg-purple-500/10 px-3 py-2 text-sm text-purple-300"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    {type}
                  </span>
                ))}
              </div>

            </div>

            {/* RISK ASSESSMENT */}
            <div className="card-hover rounded-2xl border border-slate-800 bg-slate-900/60 p-6">

              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">
                    Risk Assessment
                  </p>

                  <p className="mt-1 text-xs text-slate-600">
                    Threat level calculated from report signals
                  </p>
                </div>

                <span className="text-xl">
                  🛡️
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-800">

                <div
                  className={`animate-risk h-full rounded-full ${
                    riskColor === 'red'
                      ? 'bg-red-500'
                      : riskColor === 'yellow'
                        ? 'bg-yellow-400'
                        : 'bg-emerald-400'
                  }`}
                  style={{
                    width: `${data.riskScore}%`,
                  }}
                />

              </div>

              <div className="mt-4 flex items-center justify-between">

                <span className="text-sm text-slate-500">
                  Threat level
                </span>

                <span
                  className={`font-semibold ${
                    riskColor === 'red'
                      ? 'text-red-400'
                      : riskColor === 'yellow'
                        ? 'text-yellow-400'
                        : 'text-emerald-400'
                  }`}
                >
                  {data.riskLevel}
                </span>

              </div>

              <div className="mt-5 border-t border-slate-800 pt-4">
                <p className="text-xs leading-5 text-slate-600">
                  Risk score is based on report frequency,
                  financial impact, verification status,
                  scam diversity, and recent activity.
                </p>
              </div>

            </div>

          </div>

        </section>
      )}

    </main>
  )
}

export default Dashboard