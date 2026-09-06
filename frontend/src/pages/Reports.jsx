import { useState } from 'react'
import axios from 'axios'

function Reports() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [scamType, setScamType] = useState('')
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
    <main className="mx-auto max-w-5xl px-6 py-10">

      {/* Header */}
      <section className="mb-8">
        <p className="mb-2 text-sm font-medium text-cyan-400">
          COMMUNITY REPORTING
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          Report a Scam
        </h1>

        <p className="mt-2 text-slate-400">
          Help protect others by reporting suspicious activity.
        </p>
      </section>

      {/* Form */}
      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl backdrop-blur">

        <form onSubmit={handleSubmit}>

          {/* Phone + Scam Type */}
          <div className="grid gap-5 md:grid-cols-2">

            <div>
              <label
                htmlFor="phoneNumber"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Phone Number
              </label>

              <input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                placeholder="9876543210"
                required
                className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400"
              />
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
                className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400"
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

          {/* Amount */}
          <div className="mt-5">

            <label
              htmlFor="amountLost"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Amount Lost
            </label>

            <input
              id="amountLost"
              type="number"
              min="0"
              value={amountLost}
              onChange={(event) => setAmountLost(event.target.value)}
              placeholder="Enter amount in ₹"
              className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400"
            />

          </div>

          {/* Description */}
          <div className="mt-5">

            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              What happened?
            </label>

            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe how the scam happened..."
              rows="6"
              required
              className="w-full resize-none rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400"
            />

          </div>

          {/* Success */}
          {success && (
            <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
              {success}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-cyan-400 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Submitting Report...' : 'Submit Scam Report'}
          </button>

        </form>

      </section>

      {/* Note */}
      <p className="mt-4 text-center text-xs text-slate-600">
        Reports may be reviewed before being marked as verified.
      </p>

    </main>
  )
}

export default Reports