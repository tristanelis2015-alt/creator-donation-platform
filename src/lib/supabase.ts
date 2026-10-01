import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})

export const sandboxConfig = {
  mode: 'sandbox',
  cardProvisioning: true,
  plaidToken: 'sandbox_plaid_token_123456',
  stripeMock: 'test_pk_1234567890',
}

export const getSupabaseHealth = () => ({
  status: 'sandbox-ready',
  url: supabaseUrl,
  mode: 'test',
})
