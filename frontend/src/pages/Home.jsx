function Home() {
  return (
    <main className="mx-auto max-w-7xl px-6">

      {/* Hero */}
      <section className="relative py-24 text-center">
        <div className="absolute left-1/2 top-16 -z-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-sm text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            Scam Intelligence Platform
          </div>

          <h2 className="mx-auto max-w-4xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
            Know the threat
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              before it reaches you.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Check suspicious phone numbers, report scams, and understand
            digital threats with intelligent risk analysis.
          </p>

          {/* Search */}
          <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-3 shadow-2xl shadow-cyan-950/20 backdrop-blur md:flex-row">

            <input
              type="text"
              placeholder="Enter a phone number to check..."
              className="flex-1 bg-transparent px-4 py-3 text-slate-100 outline-none placeholder:text-slate-600"
            />

            <button className="rounded-xl bg-cyan-400 px-7 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">
              Check Number
            </button>

          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid gap-4 pb-20 md:grid-cols-3">

        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
          <p className="text-sm text-slate-500">Reports Analyzed</p>
          <p className="mt-2 text-3xl font-bold">1,284</p>
          <p className="mt-2 text-sm text-cyan-400">
            ↑ 12.5% this month
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
          <p className="text-sm text-slate-500">High Risk Numbers</p>
          <p className="mt-2 text-3xl font-bold">247</p>
          <p className="mt-2 text-sm text-red-400">
            Requires attention
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
          <p className="text-sm text-slate-500">Reported Loss</p>
          <p className="mt-2 text-3xl font-bold">₹4.2L</p>
          <p className="mt-2 text-sm text-purple-400">
            Across reported scams
          </p>
        </div>

      </section>

    </main>
  )
}

export default Home