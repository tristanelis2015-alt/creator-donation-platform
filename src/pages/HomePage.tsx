import { Copy, CreditCard } from 'lucide-react'
import { useState } from 'react'

export default function VirtualCard() {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = async (value: string, field: string) => {
    await navigator.clipboard.writeText(value)
    setCopiedField(field)
    window.setTimeout(() => setCopiedField(null), 1200)
  }

  return (
    <div className="card overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 p-5 text-white">
      <div className="mb-6 flex items-center justify-between text-sm text-slate-200">
        <span>Virtual Card</span>
        <span className="rounded-full border border-white/20 bg-white/5 px-2 py-1 text-xs uppercase tracking-[0.2em]">
          Sandbox
        </span>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
            <CreditCard size={18} />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-slate-300">Card holder</div>
            <div className="mt-1 font-semibold">Ava Morgan</div>
          </div>
        </div>
      </div>

      <div className="mb-8 flex items-center justify-between gap-3 text-xl tracking-[0.2em]">
        <span>4242</span>
        <span>4242</span>
        <span>4242</span>
        <span>4242</span>
      </div>

      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-slate-300">Exp.</div>
          <div className="mt-1 flex items-center gap-2">
            <span>08/29</span>
            <button type="button" onClick={() => copyToClipboard('08/29', 'expiration')} className="text-slate-300 hover:text-white">
              <Copy size={14} />
            </button>
            {copiedField === 'expiration' && <span className="text-xs text-emerald-300">Copied</span>}
          </div>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-slate-300">CVV</div>
          <div className="mt-1 flex items-center gap-2">
            <span>481</span>
            <button type="button" onClick={() => copyToClipboard('481', 'cvv')} className="text-slate-300 hover:text-white">
              <Copy size={14} />
            </button>
            {copiedField === 'cvv' && <span className="text-xs text-emerald-300">Copied</span>}
          </div>
        </div>
      </div>

      <div className="mt-7 flex justify-between text-xs text-slate-300">
        <button type="button" onClick={() => copyToClipboard('4242424242424242', 'number')} className="inline-flex items-center gap-2 hover:text-white">
          <Copy size={13} />
          {copiedField === 'number' ? 'Copied' : 'Click to Copy'}
        </button>
        <span>Platinum</span>
      </div>
    </div>
  )
}
