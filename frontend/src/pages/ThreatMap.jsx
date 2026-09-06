import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

function ThreatMap() {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchThreatMap = async () => {
      try {
        const token = localStorage.getItem('token')

        const response = await axios.get(
          'http://localhost:5000/api/intelligence/map',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        setLocations(response.data.locations || [])
      } catch (error) {
        setError(
          error.response?.data?.message ||
          'Failed to load threat map.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchThreatMap()
  }, [])

  const getRiskColor = (riskLevel) => {
    if (riskLevel === 'HIGH') return '#ef4444'
    if (riskLevel === 'MEDIUM') return '#facc15'
    return '#34d399'
  }

  const getMarkerRadius = (reportCount) => {
    return Math.min(10 + reportCount * 2, 22)
  }

  return (
    <main className="mx-auto max-w-7xl animate-fade-up px-6 py-10">

      {/* HEADER */}
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-cyan-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
          SPATIAL THREAT INTELLIGENCE
        </div>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Threat Map
        </h1>

        <p className="mt-3 max-w-2xl text-slate-400">
          Explore reported scam activity across locations
          and identify geographic threat hotspots.
        </p>
      </section>

      {/* LEGEND */}
      <section className="mb-5 flex flex-wrap items-center gap-3">

        <div className="rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-400">
          🔴 HIGH RISK
        </div>

        <div className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-xs font-semibold text-yellow-400">
          🟡 MEDIUM RISK
        </div>

        <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-400">
          🟢 LOW RISK
        </div>

      </section>

      {/* MAP */}
      <section className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 shadow-2xl backdrop-blur">

        {loading && (
          <div className="flex h-[600px] flex-col items-center justify-center bg-slate-950/40">

            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10">
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
            </div>

            <h2 className="font-semibold">
              Loading threat intelligence
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Mapping reported scam activity...
            </p>

          </div>
        )}

        {!loading && error && (
          <div className="flex h-[600px] items-center justify-center bg-slate-950/40 p-6 text-center">

            <div>
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-xl">
                ⚠
              </div>

              <h2 className="font-semibold">
                Unable to load threat map
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {error}
              </p>
            </div>

          </div>
        )}

        {!loading && !error && (
          <MapContainer
            center={[22.9734, 78.6569]}
            zoom={5}
            scrollWheelZoom={true}
            className="h-[600px] w-full"
          >

            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {locations.map((location) => (
              <CircleMarker
                key={`${location.city}-${location.state}`}
                center={[
                  location.latitude,
                  location.longitude,
                ]}
                radius={getMarkerRadius(location.reportCount)}
                pathOptions={{
                  color: getRiskColor(location.riskLevel),
                  fillColor: getRiskColor(location.riskLevel),
                  fillOpacity: 0.65,
                  weight: 2,
                }}
              >

                <Popup>

                  <div className="min-w-[210px] text-slate-900">

                    <h3 className="text-lg font-bold">
                      {location.city}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {location.state}
                    </p>

                    <div className="my-3 border-t border-slate-200" />

                    <div className="space-y-2 text-sm">

                      <p>
                        <strong>Risk:</strong>{' '}
                        <span
                          style={{
                            color: getRiskColor(
                              location.riskLevel
                            ),
                          }}
                        >
                          {location.riskLevel}
                        </span>
                      </p>

                      <p>
                        <strong>Reports:</strong>{' '}
                        {location.reportCount}
                      </p>

                      <p>
                        <strong>Financial Loss:</strong>{' '}
                        ₹{location.totalLoss.toLocaleString('en-IN')}
                      </p>

                      <p>
                        <strong>Verified:</strong>{' '}
                        {location.verifiedCount}
                      </p>

                    </div>

                    <div className="my-3 border-t border-slate-200" />

                    <p className="text-xs font-semibold text-slate-500">
                      Scam Types
                    </p>

                    <div className="mt-2 flex flex-wrap gap-1">

                      {location.scamTypes.map((type) => (
                        <span
                          key={type}
                          className="rounded bg-slate-100 px-2 py-1 text-xs"
                        >
                          {type}
                        </span>
                      ))}

                    </div>

                  </div>

                </Popup>

              </CircleMarker>
            ))}

          </MapContainer>
        )}

      </section>

      {/* SUMMARY */}
      {!loading && !error && (
        <section className="mt-5 grid gap-4 sm:grid-cols-3">

          <div className="card-hover rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <p className="text-sm text-slate-500">
              Locations Tracked
            </p>

            <p className="mt-2 text-3xl font-bold text-cyan-400">
              {locations.length}
            </p>
          </div>

          <div className="card-hover rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <p className="text-sm text-slate-500">
              Reports Mapped
            </p>

            <p className="mt-2 text-3xl font-bold">
              {locations.reduce(
                (sum, location) =>
                  sum + location.reportCount,
                0
              )}
            </p>
          </div>

          <div className="card-hover rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <p className="text-sm text-slate-500">
              Financial Impact
            </p>

            <p className="mt-2 text-3xl font-bold text-red-400">
              ₹
              {locations
                .reduce(
                  (sum, location) =>
                    sum + location.totalLoss,
                  0
                )
                .toLocaleString('en-IN')}
            </p>
          </div>

        </section>
      )}

    </main>
  )
}

export default ThreatMap