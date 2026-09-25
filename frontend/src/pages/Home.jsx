function Home() {
  return (
    <main className="mx-auto max-w-7xl px-6">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden py-24 text-center md:py-32">

        <div className="absolute left-1/2 top-10 -z-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-sm text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            Digital Threat Intelligence
          </div>

          <h1 className="mx-auto max-w-5xl text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Know the threat
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              before it reaches you.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-400 md:text-xl">
            ScamShield transforms community reports into actionable
            threat intelligence, helping you understand suspicious
            digital activity and emerging scam patterns.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

            <a
              href="/register"
              className="rounded-xl bg-cyan-400 px-7 py-3.5 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Get Started →
            </a>

            <a
              href="#how-it-works"
              className="rounded-xl border border-slate-700 bg-slate-900/50 px-7 py-3.5 font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:bg-slate-900"
            >
              Explore ScamShield
            </a>

          </div>

        </div>
      </section>


      {/* ================= PROBLEM ================= */}
      <section className="border-t border-slate-800/70 py-20">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            The problem
          </p>

          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Digital scams leave signals.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            A suspicious phone number. A fraudulent payment request.
            A phishing attempt. A fake job offer.
          </p>

          <p className="mt-4 text-slate-500">
            ScamShield turns individual reports into structured
            threat intelligence that can help users recognize
            suspicious activity.
          </p>

        </div>


        <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-4">

          {[
            {
              icon: '📱',
              title: 'Suspicious Activity',
              text: 'A potentially harmful digital interaction.'
            },
            {
              icon: '📝',
              title: 'Community Report',
              text: 'Users contribute information about the incident.'
            },
            {
              icon: '🧠',
              title: 'Risk Analysis',
              text: 'Reported activity is evaluated using risk indicators.'
            },
            {
              icon: '🛡️',
              title: 'Threat Intelligence',
              text: 'Structured information helps users understand threats.'
            }
          ].map((item) => (

            <div
              key={item.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition hover:-translate-y-1 hover:border-cyan-400/20"
            >

              <div className="mb-4 text-3xl">
                {item.icon}
              </div>

              <h3 className="font-semibold">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {item.text}
              </p>

            </div>

          ))}

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section
        id="how-it-works"
        className="scroll-mt-20 py-20"
      >

        <div className="text-center">

          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            How ScamShield works
          </p>

          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            From report to intelligence.
          </h2>

        </div>


        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">

          {/* Report */}

          <div className="group rounded-3xl border border-slate-800 bg-slate-900/50 p-8 transition hover:border-cyan-400/30">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-2xl">
              📝
            </div>

            <h3 className="mt-6 text-xl font-semibold">
              Report
            </h3>

            <p className="mt-3 leading-7 text-slate-500">
              Submit information about suspicious phone numbers,
              scam incidents and other digital threats.
            </p>

          </div>


          {/* Analyze */}

          <div className="group rounded-3xl border border-slate-800 bg-slate-900/50 p-8 transition hover:border-purple-400/30">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-400/10 text-2xl">
              🔍
            </div>

            <h3 className="mt-6 text-xl font-semibold">
              Analyze
            </h3>

            <p className="mt-3 leading-7 text-slate-500">
              Analyze reported activity using community data,
              verification status and risk indicators.
            </p>

          </div>


          {/* Discover */}

          <div className="group rounded-3xl border border-slate-800 bg-slate-900/50 p-8 transition hover:border-blue-400/30">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-400/10 text-2xl">
              🗺️
            </div>

            <h3 className="mt-6 text-xl font-semibold">
              Discover
            </h3>

            <p className="mt-3 leading-7 text-slate-500">
              Explore geographic and category-based patterns
              through ScamShield's threat intelligence map.
            </p>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}
      <section className="border-t border-slate-800/70 py-20">

        <div className="grid items-center gap-12 lg:grid-cols-2">

          <div>

            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Built for threat intelligence
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              More than a list of scam reports.
            </h2>

            <p className="mt-5 leading-8 text-slate-400">
              ScamShield organizes reported activity into useful
              signals that help users explore risks, patterns and
              trends.
            </p>

            <div className="mt-8 space-y-5">

              {[
                [
                  'Risk Intelligence',
                  'Evaluate reported entities using a structured risk score.'
                ],
                [
                  'Community Reporting',
                  'Turn individual experiences into shared threat intelligence.'
                ],
                [
                  'Admin Verification',
                  'Reports can be reviewed and verified through an administrative workflow.'
                ],
                [
                  'Geographic Analysis',
                  'Explore where reported scam activity is concentrated.'
                ]
              ].map(([title, text]) => (

                <div
                  key={title}
                  className="flex gap-4"
                >

                  <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-400" />

                  <div>
                    <h3 className="font-semibold">
                      {title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {text}
                    </p>
                  </div>

                </div>

              ))}

            </div>

          </div>


          {/* Visual mockup */}

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl shadow-cyan-950/10">

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs text-slate-500">
                    THREAT INTELLIGENCE
                  </p>

                  <p className="mt-1 font-semibold">
                    Risk Analysis
                  </p>
                </div>

                <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs text-red-400">
                  HIGH RISK
                </span>

              </div>


              <div className="mt-8">

                <p className="text-sm text-slate-500">
                  Risk Score
                </p>

                <div className="mt-2 flex items-end gap-2">

                  <span className="text-5xl font-bold">
                    82
                  </span>

                  <span className="mb-2 text-slate-600">
                    /100
                  </span>

                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">

                  <div
                    className="h-full w-[82%] rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
                  />

                </div>

              </div>


              <div className="mt-8 grid grid-cols-2 gap-3">

                <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">

                  <p className="text-xs text-slate-500">
                    Reports
                  </p>

                  <p className="mt-1 text-xl font-semibold">
                    17
                  </p>

                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">

                  <p className="text-xs text-slate-500">
                    Verified
                  </p>

                  <p className="mt-1 text-xl font-semibold text-emerald-400">
                    12
                  </p>

                </div>

              </div>


              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-4">

                <p className="text-xs text-slate-500">
                  Threat categories
                </p>

                <div className="mt-3 flex flex-wrap gap-2">

                  {[
                    'Phishing',
                    'UPI Fraud',
                    'Investment'
                  ].map((tag) => (

                    <span
                      key={tag}
                      className="rounded-lg bg-purple-500/10 px-3 py-1.5 text-xs text-purple-300"
                    >
                      {tag}
                    </span>

                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= THREAT MAP ================= */}
      <section className="py-20">

        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50">

          <div className="grid items-center lg:grid-cols-2">

            <div className="p-8 md:p-12">

              <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
                Geographic intelligence
              </p>

              <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                See where threats are being reported.
              </h2>

              <p className="mt-5 leading-8 text-slate-400">
                ScamShield connects reports with geographic information
                to help visualize patterns in reported scam activity.
              </p>

              <a
                href="/threat-map"
                className="mt-8 inline-flex rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-6 py-3 font-semibold text-cyan-300 transition hover:bg-cyan-400/20"
              >
                Explore Threat Map →
              </a>

            </div>


            {/* Map-style visual */}

            <div className="relative min-h-[360px] overflow-hidden border-t border-slate-800 bg-slate-950 lg:border-l lg:border-t-0">

              <div className="absolute inset-0 opacity-40">

                <div className="absolute left-[20%] top-[30%] h-3 w-3 rounded-full bg-red-400 shadow-lg shadow-red-400/50" />

                <div className="absolute left-[38%] top-[50%] h-3 w-3 rounded-full bg-orange-400 shadow-lg shadow-orange-400/50" />

                <div className="absolute left-[55%] top-[35%] h-3 w-3 rounded-full bg-red-400 shadow-lg shadow-red-400/50" />

                <div className="absolute left-[68%] top-[60%] h-3 w-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />

                <div className="absolute left-[80%] top-[40%] h-3 w-3 rounded-full bg-orange-400 shadow-lg shadow-orange-400/50" />

              </div>


              <div className="absolute inset-8 rounded-3xl border border-slate-800 bg-slate-900/40">

                <div className="flex h-full items-center justify-center">

                  <div className="text-center">

                    <div className="text-5xl">
                      🗺️
                    </div>

                    <p className="mt-4 font-semibold">
                      Threat Map
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      Geographic scam intelligence
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}
      <section className="py-24 text-center">

        <div className="mx-auto max-w-3xl">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-2xl">
            🛡️
          </div>

          <h2 className="mt-7 text-3xl font-bold md:text-5xl">
            Turn reports into awareness.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-500">
            Explore ScamShield and contribute to a community-driven
            digital threat intelligence platform.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

            <a
              href="/register"
              className="rounded-xl bg-cyan-400 px-7 py-3.5 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Create Account
            </a>

            <a
              href="/login"
              className="rounded-xl border border-slate-700 px-7 py-3.5 font-semibold text-slate-200 transition hover:border-cyan-400/40"
            >
              Sign In
            </a>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-800 py-8">

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-600 md:flex-row">

          <div>
            <span className="font-semibold text-slate-400">
              ScamShield
            </span>
            {' '}— Digital Threat Intelligence
          </div>

          <div>
            Built with React · Node.js · Express · MongoDB
          </div>

        </div>

      </footer>

    </main>
  )
}

export default Home