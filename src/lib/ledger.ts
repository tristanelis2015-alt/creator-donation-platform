export type Ledger = {
  gross: number
  platformFee: number
  creatorPayout: number
}

export function calculateTipLedger(tipAmount: number): Ledger {
  const gross = Number(tipAmount.toFixed(2))
  const platformFee = Number((tipAmount * 0.02).toFixed(2))
  const creatorPayout = Number((tipAmount - platformFee).toFixed(2))

  return {
    gross,
    platformFee,
    creatorPayout,
  }
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value)
}
