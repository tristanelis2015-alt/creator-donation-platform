import { ArrowLeft, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="container-max flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3 font-semibold text-slate-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-sm font-bold text-white">
              TF
            </div>
            <div>
              <div className="text-lg">TrueFan Funds</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <Link to="/" className="transition hover:text-slate-900">Discover</Link>
            <Link to="/dashboard" className="transition hover:text-slate-900">Dashboard</Link>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-emerald-700">
              <ShieldCheck size={14} />
              2% flat fee
            </span>
          </nav>

          <Link to="/dashboard" className="btn-primary text-sm">
            Creator Dashboard
          </Link>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="container-max flex flex-col gap-3 py-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <ArrowLeft size={14} />
            Support creators without platform bloat.
          </div>
          <div>© 2026 TrueFan Funds • Sandbox-ready infrastructure</div>
        </div>
      </footer>
    </div>
  )
}
