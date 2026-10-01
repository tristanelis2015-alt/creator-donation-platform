import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { creators } from '../data/creators'
import CreatorCard from './CreatorCard'

export default function HomePage() {
  const [query, setQuery] = useState('')

  const filteredCreators = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return creators

    return creators.filter((creator) => {
      const haystack = [
        creator.fullName,
        creator.username,
        creator.specialty,
        creator.location,
        creator.bio,
      ]
        .join(' ')
        .toLowerCase()

      return haystack.includes(term)
    })
  }, [query])

  return (
    <div className="container-max py-10 sm:py-14">
      <section className="mb-16 rounded-[32px] border border-slate-200 bg-white p-6 shadow-card sm:p-10 lg:p-14">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-4 inline-flex rounded-full border border-primary-100 bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700">
              Simple support for creators
            </div>
            <h1 className="max-w-xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              A simple donation platform for creators. Just a flat 2% platform fee. Keep 98% of your earnings.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-600">
              Give fans an easy way to support the work they love without friction, hidden fees, or aggressive upsells.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a href="#directory" className="btn-primary">
                Explore creators
              </a>
              <a href="/dashboard" className="btn-secondary">
                Open dashboard
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-600">
              <div>
                <div className="text-2xl font-bold text-slate-900">98%</div>
                <div>Creator payout</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">2%</div>
                <div>Platform fee</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">24/7</div>
                <div>Donation access</div>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-slate-900 p-6 text-white shadow-card-lg">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-300">Creator earnings</div>
                <div className="mt-1 text-3xl font-bold">$84,420</div>
              </div>
              <div className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-medium text-emerald-300">
                +18.4%
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Milo Perez', value: '$8,240', tone: 'bg-emerald-500' },
                { label: 'Nia Brooks', value: '$6,890', tone: 'bg-sky-500' },
                { label: 'Kai Morgan', value: '$4,960', tone: 'bg-violet-500' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-700 bg-slate-800 p-4">
                  <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-700">
                    <div className={`h-full rounded-full ${item.tone}`} style={{ width: '72%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="directory" className="mb-10">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.12em] text-slate-500">Active creators</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Discover profiles instantly</h2>
          </div>

          <label className="relative block w-full max-w-md">
            <span className="sr-only">Search creators</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, specialty, or keyword"
              className="input-field pl-11"
            />
          </label>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredCreators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>

        {filteredCreators.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">
            No creators match your search. Try a full name, specialty, or location.
          </div>
        )}
      </section>
    </div>
  )
}
