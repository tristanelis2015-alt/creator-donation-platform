import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CreditCard, ShieldCheck, Sparkles } from 'lucide-react'
import PaymentButtons from '../components/PaymentButtons'
import { creators } from '../data/creators'
import { calculateTipLedger, formatCurrency } from '../lib/ledger'
import type { PaymentMethod } from '../types'

const quickAmounts = [5, 15, 25, 50]

export default function CreatorProfile() {
  const { username } = useParams()
  const creator = useMemo(() => creators.find((item) => item.username === username), [username])
  const [selectedAmount, setSelectedAmount] = useState(25)
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('credit-card')
  const [status, setStatus] = useState('')

  if (!creator) {
    return (
      <div className="container-max py-20 text-center">
        <div className="card mx-auto max-w-lg">
          <h1 className="text-3xl font-bold text-slate-900">Creator not found</h1>
          <p className="mt-3 text-slate-600">This creator profile doesn’t exist yet or may have been archived.</p>
        </div>
      </div>
    )
  }

  const ledger = calculateTipLedger(selectedAmount)

  const handleDonate = () => {
    const platformFee = ledger.platformFee
    const creatorPayout = ledger.creatorPayout
    setStatus(
      `Donation ready: ${formatCurrency(selectedAmount)} total • ${formatCurrency(platformFee)} platform fee • ${formatCurrency(creatorPayout)} to ${creator.fullName}. Payment method: ${selectedMethod}.`,
    )
  }

  return (
    <div className="container-max py-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_440px]">
        <section className="card p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <img src={creator.avatar} alt={creator.fullName} className="h-24 w-24 rounded-full object-cover ring-4 ring-slate-100" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-slate-900">{creator.fullName}</h1>
                {creator.isVerified && <ShieldCheck size={18} className="text-emerald-500" />}
              </div>
              <p className="mt-1 text-lg text-slate-500">@{creator.username}</p>
              <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
                <span className="rounded-full bg-slate-100 px-3 py-1">{creator.specialty}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1">{creator.location}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1">{creator.followers} followers</span>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-medium uppercase tracking-[0.12em] text-slate-500">About</p>
            <p className="mt-3 text-base leading-7 text-slate-700">{creator.bio}</p>
          </div>

          <div className="mt-8">
            <div className="mb-4 flex items-center gap-2 text-slate-900">
              <Sparkles size={18} className="text-primary-600" />
              <h2 className="text-xl font-semibold">Support this creator</h2>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setSelectedAmount(amount)}
                  className={`rounded-2xl border px-3 py-3 text-center font-semibold transition ${
                    selectedAmount === amount
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-3">
              <label className="flex-1 text-sm font-medium text-slate-600">Custom amount</label>
              <input
                type="number"
                min={1}
                step={1}
                value={selectedAmount}
                onChange={(event) => setSelectedAmount(Number(event.target.value || 0))}
                className="input-field max-w-[160px]"
              />
            </div>
          </div>
        </section>

        <aside className="card h-fit p-6">
          <div className="mb-5 flex items-center gap-2">
            <CreditCard size={18} className="text-primary-600" />
            <h2 className="text-xl font-semibold text-slate-900">Payment</h2>
          </div>

          <PaymentButtons selected={selectedMethod} onSelect={setSelectedMethod} />

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
              <span>Tip amount</span>
              <span>{formatCurrency(ledger.gross)}</span>
            </div>
            <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
              <span>Platform fee (2%)</span>
              <span>{formatCurrency(ledger.platformFee)}</span>
            </div>
            <div className="flex items-center justify-between border-t border-slate-200 pt-2 text-base font-semibold text-slate-900">
              <span>Creator receives</span>
              <span>{formatCurrency(ledger.creatorPayout)}</span>
            </div>
          </div>

          <button type="button" onClick={handleDonate} className="btn-primary mt-6 w-full">
            Complete donation
          </button>

          {status && <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{status}</div>}
        </aside>
      </div>
    </div>
  )
}
