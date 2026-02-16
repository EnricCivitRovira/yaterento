import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

type UserRole = 'superadmin' | 'tenant_admin' | null

interface AuthContextValue {
  user: User | null
  session: Session | null
  role: UserRole
  tenantId: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ error: string | null }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setUser(data.session?.user ?? null)
      setIsLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      setUser(newSession?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Lee el role: primero del JWT claim custom (si el hook esta activo), si no de user_metadata
  const jwtPayload: Record<string, unknown> = session?.access_token
    ? JSON.parse(atob(session.access_token.split('.')[1]))
    : {}
  const jwtRole = jwtPayload['role'] as string | undefined
  const metaRole = (user?.user_metadata as Record<string, unknown> | undefined)?.['role'] as string | undefined
  const role: UserRole = (jwtRole && jwtRole !== 'authenticated' ? jwtRole : metaRole ?? null) as UserRole

  const tenantId: string | null =
    (jwtPayload['tenant_id'] as string | undefined) ??
    ((user?.user_metadata as Record<string, unknown> | undefined)?.['tenant_id'] as string | undefined) ??
    null

  async function login(email: string, password: string): Promise<{ error: string | null }> {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { error: error.message }
    return { error: null }
  }

  async function logout() {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, session, role, tenantId, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
