import { X } from 'lucide-react'

export default function SecurityModal({
  isOpen,
  onClose,
  code,
  setCode,
  error,
  onConfirm,
}: {
  isOpen: boolean
  onClose: () => void
  code: string
  setCode: (value: string) => void
  error: string | null
  onConfirm: () => void
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-card-lg">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.12em] text-slate-500">Verification</p>
            <h3 className="mt-2 text-xl font-bold text-slate-900">Security Check</h3>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-slate-500 hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>

        <p className="mb-4 text-sm leading-6 text-slate-600">
          Security Check: We sent a 6-digit confirmation code to your registered email address.
        </p>

        <div className="mb-5 flex justify-center">
          <input
            aria-label="Six digit confirmation code"
            value={code}
            onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="123456"
            inputMode="numeric"
            maxLength={6}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-center text-2xl font-bold tracking-[0.4em] text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          />
        </div>

        {error && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>}

        <button type="button" onClick={onConfirm} className="btn-primary w-full">
          Verify payment
        </button>
      </div>
    </div>
  )
}
