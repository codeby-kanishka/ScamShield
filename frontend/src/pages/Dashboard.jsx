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

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">

      {/* Header */}
      <section className="mb-10">
        <p className="mb-2 text-sm font-medium text-cyan-400">
          THREAT INTELLIGENCE
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          Security Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Analyze suspicious phone numbers using ScamShield's risk engine.
        </p>
      </section>

      {/* Search Card */}
      <section className="mb-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl backdrop-blur">

        <div className="mb-5">
          <h2 className="text-xl font-semibold">
            Check a phone number
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Search our reported scam intelligence database.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-3 md:flex-row"
        >
          <input
            id="phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            placeholder="Enter phone number e.g. 9876543210"
            className="flex-1 rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-cyan-400 px-7 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Analyzing...' : 'Analyze Number'}
          </button>
        </form>

        {error && (
          <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}
      </section>

      {/* Empty State */}
      {!data && !loading && !error && (
        <section className="rounded-3xl border border-dashed border-slate-800 bg-slate-900/30 px-6 py-16 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10 text-2xl">
            🔍
          </div>

          <h2 className="text-xl font-semibold">
            No number analyzed yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            Enter a phone number above to see its scam reports,
            financial impact, and calculated risk level.
          </p>
        </section>
      )}

      {/* Results */}
      {data && (
        <section>

          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Intelligence result
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                {data.phoneNumber}
              </h2>
            </div>

            <div
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                data.riskLevel === 'HIGH'
                  ? 'bg-red-500/10 text-red-400'
                  : data.riskLevel === 'MEDIUM'
                    ? 'bg-yellow-500/10 text-yellow-400'
                    : 'bg-emerald-500/10 text-emerald-400'
              }`}
            >
              {data.riskLevel} RISK
            </div>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-3">

            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <p className="text-sm text-slate-500">
                Risk Score
              </p>

              <p className="mt-2 text-4xl font-bold text-cyan-400">
                {data.riskScore}
                <span className="text-lg text-slate-600">
                  /100
                </span>
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <p className="text-sm text-slate-500">
                Reports
              </p>

              <p className="mt-2 text-4xl font-bold">
                {data.reportCount}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <p className="text-sm text-slate-500">
                Reported Loss
              </p>

              <p className="mt-2 text-4xl font-bold">
                ₹{data.totalLoss.toLocaleString('en-IN')}
              </p>
            </div>

          </div>

          {/* Detailed Intelligence */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">

            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <p className="mb-4 text-sm font-medium text-slate-400">
                Detected Scam Types
              </p>

              <div className="flex flex-wrap gap-2">
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

            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <p className="mb-4 text-sm font-medium text-slate-400">
                Risk Assessment
              </p>

              <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                <div
                  className={`h-full rounded-full transition-all ${
                    data.riskLevel === 'HIGH'
                      ? 'bg-red-500'
                      : data.riskLevel === 'MEDIUM'
                        ? 'bg-yellow-400'
                        : 'bg-emerald-400'
                  }`}
                  style={{
                    width: `${data.riskScore}%`,
                  }}
                />
              </div>

              <div className="mt-3 flex justify-between text-sm">
                <span className="text-slate-500">
                  Risk level
                </span>

                <span className="font-semibold">
                  {data.riskLevel}
                </span>
              </div>
            </div>

          </div>

        </section>
      )}

    </main>
  )
}

export default Dashboard