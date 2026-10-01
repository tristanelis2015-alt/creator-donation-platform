export type Creator = {
  id: string
  username: string
  fullName: string
  avatar: string
  bio: string
  location: string
  specialty: string
  followers: string
  accountType?: 'standard' | 'test account' | 'owner account'
  isVerified?: boolean
  balance: number
}

export type WalletKey = 'available_tips' | 'bank_funded_balance'

export type Wallet = {
  id: WalletKey
  label: string
  amount: number
  currency: string
}

export type Transaction = {
  id: string
  description: string
  amount: number
  type: 'credit' | 'debit'
  date: string
  category: string
}

export type PaymentMethod = 'credit-card' | 'paypal' | 'venmo'

export type Ledger = {
  gross: number
  platformFee: number
  creatorPayout: number
}
