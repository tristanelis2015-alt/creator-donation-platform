import { createContext, useContext, useMemo, type ReactNode } from 'react'

type AuthContextValue = {
  user: {
    id: string
    name: string
    email: string
  }
}

const AuthContext = createContext<AuthContextValue | null>(null)

const defaultUser = {
  id: 'user-123',
  name: 'Ava Morgan',
  email: 'ava@truefanfunds.test',
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const value = useMemo(() => ({ user: defaultUser }), [])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
