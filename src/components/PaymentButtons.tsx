import { ArrowUpRight, MapPin, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Creator } from '../types'

export default function CreatorCard({ creator }: { creator: Creator }) {
  return (
    <article className="card overflow-hidden p-0">
      <div className="flex items-center gap-4 border-b border-slate-200 p-5">
        <img
          src={creator.avatar}
          alt={creator.fullName}
          className="h-16 w-16 rounded-full object-cover ring-2 ring-slate-200"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-xl font-semibold text-slate-900">{creator.fullName}</h3>
            {creator.isVerified && <ShieldCheck size={16} className="text-emerald-500" />}
          </div>
          <p className="text-sm text-slate-500">@{creator.username}</p>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <MapPin size={14} />
          {creator.location}
        </div>

        <p className="text-sm leading-6 text-slate-600">{creator.bio}</p>

        <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-sm">
          <span className="text-slate-500">Specialty</span>
          <span className="font-medium text-slate-800">{creator.specialty}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-slate-500">Followers</div>
            <div className="text-lg font-semibold text-slate-900">{creator.followers}</div>
          </div>

          <Link to={`/${creator.username}`} className="btn-primary gap-2 text-sm">
            View profile
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  )
}
