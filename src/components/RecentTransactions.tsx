import { CreditCard, PayPal, WalletCards } from 'lucide-react'
import type { PaymentMethod } from '../types'

const paymentOptions: Array<{ id: PaymentMethod; label: string; subtitle: string; icon: React.ReactNode }> = [
  {
    id: 'credit-card',
    label: 'Credit Card',
    subtitle: 'Stripe UI style',
    icon: <CreditCard size={18} />,
  },
  {
    id: 'paypal',
    label: 'PayPal',
    subtitle: 'Secure wallet transfer',
    icon: <PayPal size={18} />,
  },
  {
    id: 'venmo',
    label: 'Venmo',
    subtitle: 'Fast mobile checkout',
    icon: <WalletCards size={18} />,
  },
]

export default function PaymentButtons({
  selected,
  onSelect,
}: {
  selected: PaymentMethod
  onSelect: (method: PaymentMethod) => void
}) {
  return (
    <div className="grid gap-3">
      {paymentOptions.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onSelect(option.id)}
          className={`flex items-center justify-between rounded-2xl border p-4 text-left transition ${
            selected === option.id
              ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-100'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              {option.icon}
            </div>
            <div>
              <div className="font-semibold text-slate-900">{option.label}</div>
              <div className="text-sm text-slate-500">{option.subtitle}</div>
            </div>
          </div>
          <div className={`h-4 w-4 rounded-full border-2 ${selected === option.id ? 'border-primary-600 bg-primary-600' : 'border-slate-300'}`} />
        </button>
      ))}
    </div>
  )
}
