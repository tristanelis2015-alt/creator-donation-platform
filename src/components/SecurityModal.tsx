import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import type { Transaction } from '../types'
import { formatCurrency } from '../lib/ledger'

export default function RecentTransactions({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className="card h-full">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.12em] text-slate-500">Recent activity</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">Transaction history</h3>
        </div>
      </div>

      <div className="hide-scrollbar max-h-80 space-y-3 overflow-y-auto pr-2">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  transaction.type === 'credit' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {transaction.type === 'credit' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
              </div>
              <div>
                <p className="font-medium text-slate-800">{transaction.description}</p>
                <p className="text-xs text-slate-500">{transaction.date} • {transaction.category}</p>
              </div>
            </div>

            <div className={`font-semibold ${transaction.type === 'credit' ? 'text-emerald-600' : 'text-slate-800'}`}>
              {transaction.type === 'credit' ? '+' : '-'}
              {formatCurrency(transaction.amount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
