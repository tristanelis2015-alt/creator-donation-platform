import { useMemo, useState } from 'react'
import { ArrowDownRight, Building2, CreditCard, Landmark, ShieldCheck, Wallet } from 'lucide-react'
import RecentTransactions from '../components/RecentTransactions'
import SecurityModal from '../components/SecurityModal'
import VirtualCard from '../components/VirtualCard'
import { creators } from '../data/creators'
import { formatCurrency } from '../lib/ledger'
import type { Transaction, Wallet } from '../types'

const initialWallets: Wallet[] = [
  { id: 'available_tips', label: 'available_tips', amount: 13840.2, currency: 'USD' },
  { id: 'bank_funded_balance', label: 'bank_funded_balance', amount: 39250.0, currency: 'USD' },
]

const initialTransactions: Transaction[] = [
  { id: 't1', description: 'Tip from Milo Perez', amount: 25, type: 'credit', date: 'Today, 9:14 AM', category: 'Donation' },
  { id: 't2', description: 'Bank settlement', amount: 1200, type: 'credit', date: 'Yesterday', category: 'ACH transfer' },
  { id: 't3', description: 'Card spend', amount: 340, type: 'debit', date: 'Jun 12', category: 'Virtual card' },
  { id: 't4', description: 'Tip from Nia Brooks', amount: 48, type: 'credit', date: 'Jun 11', category: 'Donation' },
  { id: 't5', description: 'Plaid cash flow refresh', amount: 2100, type: 'credit', date: 'Jun 9', category: 'Bank funding' },
]

export default function Dashboard() {
  const [wallets] = useState<Wallet[]>(initialWallets)
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [pendingAmount, setPendingAmount] = useState(0)
  const [securityOpen, setSecurityOpen] = useState(false)
  const [securityCode, setSecurityCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [spendTotal, setSpendTotal] = useState(760)

  const accountProfile = useMemo(() => {
    return creators.find((creator) => creator.accountType === 'owner account' || creator.accountType === 'test account') ?? creators[0]
  }, [])

  const bypassLimit = accountProfile.accountType === 'test account' || accountProfile.accountType === 'owner account'

  const handleCardSpend = (amount: number) => {
    const nextTotal = spendTotal + amount

    if (!bypassLimit && nextTotal > 800) {
      setPendingAmount(amount)
      setError(null)
      setSecurityOpen(true)
      return
    }

    const newTransaction: Transaction = {
      id: `t-${Date.now()}`,
      description: 'Virtual card purchase approved',
      amount,
      type: 'debit',
      date: 'Now',
      category: 'Sandbox spend',
    }

    setTransactions((current) => [newTransaction, ...current])
    setSpendTotal(nextTotal)
  }

  const verifySecurityCode = () => {
    if (securityCode === '123456') {
      const newTransaction: Transaction = {
        id: `t-${Date.now()}`,
        description: 'Email-verified virtual card purchase',
        amount: pendingAmount,
        type: 'debit',
        date: 'Approved',
        category: 'Security check',
      }

      setTransactions((current) => [newTransaction, ...current])
      setSpendTotal((current) => current + pendingAmount)
      setSecurityOpen(false)
      setSecurityCode('')
      setError(null)
      return
    }

    setError('Invalid code')
  }

  return (
    <div className="container-max py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.15em] text-slate-500">Account overview</p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900">Creator wallet</h1>
        </div>
        <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
          {bypassLimit ? 'Bypass active: account flagged for sandbox testing' : 'Standard account: email verification active'}
        </div>
      </div>

      <section className="mb-8 grid gap-5 md:grid-cols-2">
        {wallets.map((wallet) => (
          <div key={wallet.id} className="card flex items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.12em] text-slate-500">{wallet.label}</p>
              <div className="mt-3 flex items-end gap-2">
                <span className="text-3xl font-bold text-slate-900">{formatCurrency(wallet.amount)}</span>
              </div>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
              {wallet.id === 'available_tips' ? <Wallet size={22} /> : <Landmark size={22} />}
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-8 xl:grid-cols-[420px_1fr]">
        <div className="space-y-6">
          <div className="card p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.12em] text-slate-500">Card controls</p>
                <h2 className="mt-2 text-xl font-bold text-slate-900">Virtual debit account</h2>
              </div>
              <div className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">Sandbox</div>
            </div>

            <VirtualCard />

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex items-center justify-between text-sm text-slate-600">
                <span>Current spend total</span>
                <span className="font-bold text-slate-900">{formatCurrency(spendTotal)}</span>
              </div>
              <div className="mb-3 flex items-center justify-between text-sm text-slate-600">
                <span>Security threshold</span>
                <span className="font-medium text-slate-800">$800</span>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => handleCardSpend(120)} className="btn-primary flex-1">
                  Spend $120
                </button>
                <button type="button" onClick={() => handleCardSpend(250)} className="btn-secondary flex-1">
                  Spend $250
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-5">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.12em] text-slate-500">Funding</p>
                <h2 className="mt-2 text-xl font-bold text-slate-900">Bank connection</h2>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700">
                <Building2 size={14} />
                Plaid sandbox
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <ArrowDownRight size={16} className="text-emerald-600" />
                  Incoming
                </div>
                <div className="mt-3 text-2xl font-bold text-slate-900">{formatCurrency(12400)}</div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <CreditCard size={16} className="text-violet-600" />
                  Card activity
                </div>
                <div className="mt-3 text-2xl font-bold text-slate-900">{formatCurrency(1180)}</div>
              </div>
            </div>
          </div>

          <RecentTransactions transactions={transactions} />
        </div>
      </section>

      <SecurityModal
        isOpen={securityOpen}
        onClose={() => {
          setSecurityOpen(false)
          setError(null)
          setSecurityCode('')
        }}
        code={securityCode}
        setCode={setSecurityCode}
        error={error}
        onConfirm={verifySecurityCode}
      />

      <div className="mt-6 text-right text-sm text-slate-500">
        <span className="inline-flex items-center gap-2">
          <ShieldCheck size={15} className="text-emerald-600" />
          Security email verification is required for standard accounts above $800.
        </span>
      </div>
    </div>
  )
}
