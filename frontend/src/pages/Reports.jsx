import { useState } from 'react'
import axios from 'axios'

function Reports() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [scamType, setScamType] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [description, setDescription] = useState('')
  const [amountLost, setAmountLost] = useState('')

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    setSuccess('')
    setError('')

    try {
      setLoading(true)

      const token = localStorage.getItem('token')

      await axios.post(
        'http://localhost:5000/api/reports',
        {
          phoneNumber,
          scamType,
          city,
          state,
          description,
          amountLost: Number(amountLost) || 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setSuccess('Scam report submitted successfully.')

      setPhoneNumber('')
      setScamType('')
      setCity('')
      setState('')
      setDescription('')
      setAmountLost('')
    } catch (error) {
      setError(
        error.response?.data?.message ||
        'Failed to submit report. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-5xl animate-fade-up px-6 py-10">

      {/* HEADER */}
      <section className="mb-10">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-cyan-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
          COMMUNITY REPORTING
        </div>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Report a Scam
        </h1>

        <p className="mt-3 max-w-2xl text-slate-400">
          Help protect others by reporting suspicious activity.
          Every report strengthens ScamShield's threat intelligence.
        </p>
      </section>

      {/* FORM */}
      <section className="animate-scale-in rounded-3xl border border-cyan-500/10 bg-slate-900/60 p-6 shadow-2xl backdrop-blur md:p-8">

        <div className="mb-8 flex items-start gap-4 border-b border-slate-800 pb-6">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/10 text-xl">
            🛡️
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Submit incident details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Provide as much information as possible to help
              identify and prevent similar scams.
            </p>
          </div>

        </div>

        <form onSubmit={handleSubmit}>

          {/* PHONE + SCAM TYPE */}
          <div className="grid gap-5 md:grid-cols-2">

            <div>
              <label
                htmlFor="phoneNumber"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Phone Number
              </label>

              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">
                  ☎
                </span>

                <input
                  id="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  placeholder="9876543210"
                  required
                  className="input-focus w-full rounded-xl border border-slate-800 bg-slate-950/70 py-3 pl-11 pr-4 text-slate-100 outline-none placeholder:text-slate-600"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="scamType"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Scam Type
              </label>

              <select
                id="scamType"
                value={scamType}
                onChange={(event) => setScamType(event.target.value)}
                required
                className="input-focus w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none"
              >
                <option value="">Select scam type</option>
                <option value="UPI Fraud">UPI Fraud</option>
                <option value="Fake Customer Care">
                  Fake Customer Care
                </option>
                <option value="Phishing">Phishing</option>
                <option value="Investment Scam">
                  Investment Scam
                </option>
                <option value="Job Scam">Job Scam</option>
                <option value="Lottery Scam">Lottery Scam</option>
                <option value="Impersonation">Impersonation</option>
                <option value="Other">Other</option>
              </select>
            </div>

          </div>

          {/* LOCATION */}
          <div className="mt-6">

            <div className="mb-3">
              <p className="text-sm font-medium text-slate-300">
                Incident Location
              </p>

              <p className="mt-1 text-xs text-slate-600">
                Where did this scam activity occur?
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label
                  htmlFor="city"
                  className="mb-2 block text-sm font-medium text-slate-400"
                >
                  City
                </label>

                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  placeholder="e.g. Delhi"
                  required
                  className="input-focus w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-600"
                />
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="mb-2 block text-sm font-medium text-slate-400"
                >
                  State
                </label>

                <input
                  id="state"
                  type="text"
                  value={state}
                  onChange={(event) => setState(event.target.value)}
                  placeholder="e.g. Delhi"
                  required
                  className="input-focus w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-600"
                />
              </div>

            </div>

          </div>

          {/* AMOUNT */}
          <div className="mt-6">

            <label
              htmlFor="amountLost"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Amount Lost
              <span className="ml-2 text-xs font-normal text-slate-600">
                (Optional)
              </span>
            </label>

            <div className="relative">

              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                ₹
              </span>

              <input
                id="amountLost"
                type="number"
                min="0"
                value={amountLost}
                onChange={(event) => setAmountLost(event.target.value)}
                placeholder="Enter amount in ₹"
                className="input-focus w-full rounded-xl border border-slate-800 bg-slate-950/70 py-3 pl-10 pr-4 text-slate-100 outline-none placeholder:text-slate-600"
              />

            </div>

          </div>

          {/* DESCRIPTION */}
          <div className="mt-6">

            <div className="mb-2 flex items-center justify-between">

              <label
                htmlFor="description"
                className="block text-sm font-medium text-slate-300"
              >
                What happened?
              </label>

              <span className="text-xs text-slate-600">
                Incident description
              </span>

            </div>

            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe how the scam happened..."
              rows="6"
              required
              className="input-focus w-full resize-none rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-600"
            />

          </div>

          {/* INFO */}
          <div className="mt-6 rounded-2xl border border-purple-500/10 bg-purple-500/5 p-4">

            <div className="flex gap-3">

              <span className="text-lg">
                💡
              </span>

              <div>
                <p className="text-sm font-medium text-purple-300">
                  Why your report matters
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Your report can help identify patterns,
                  calculate threat levels, and warn other users
                  about suspicious numbers.
                </p>
              </div>

            </div>

          </div>

          {/* SUCCESS */}
          {success && (
            <div className="animate-fade-up mt-6 flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-400">

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400/10">
                ✓
              </span>

              <div>
                <p className="font-semibold">
                  Report submitted
                </p>

                <p className="mt-0.5 text-xs text-emerald-400/70">
                  Thank you for helping protect the community.
                </p>
              </div>

            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="animate-fade-up mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-400">
              ⚠ {error}
            </div>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="button-glow mt-6 w-full rounded-xl bg-cyan-400 py-3.5 font-semibold text-slate-950 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                Submitting Report...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Submit Scam Report
                <span>→</span>
              </span>
            )}
          </button>

        </form>
      </section>

      {/* FOOTER */}
      <div className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-slate-600">
        <span>🔒</span>
        Reports may be reviewed before being marked as verified.
      </div>

    </main>
  )
}

export default Reports