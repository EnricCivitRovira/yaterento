import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import { resolveTenantFromHostname } from './resolver'
import type { Tenant, TenantSettings } from '@/types/database'

interface TenantContextValue {
  tenant: Tenant | null
  settings: TenantSettings | null
  isSuperAdmin: boolean
  isLoading: boolean
  error: string | null
}

const TenantContext = createContext<TenantContextValue | null>(null)

export function TenantProvider({ children }: { children: ReactNode }) {
  const [tenant, setTenant] = useState<Tenant | null>(null)
  const [settings, setSettings] = useState<TenantSettings | null>(null)
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function resolve() {
      const resolution = resolveTenantFromHostname(window.location.hostname)

      if (resolution.type === 'superadmin') {
        setIsSuperAdmin(true)
        setIsLoading(false)
        return
      }

      try {
        let query = supabase.from('tenants').select('*')

        if (resolution.type === 'tenant_slug') {
          query = query.eq('slug', resolution.slug)
        } else if (resolution.type === 'tenant_custom_domain') {
          query = query.eq('custom_domain', resolution.domain)
        }

        const { data: rawTenant, error: tenantError } = await query.single()

        if (tenantError || !rawTenant) {
          setError('Tenant not found')
          setIsLoading(false)
          return
        }

        const resolvedTenant = rawTenant as unknown as Tenant
        setTenant(resolvedTenant)

        const { data: settingsData } = await supabase
          .from('tenant_settings')
          .select('*')
          .eq('tenant_id', resolvedTenant.id)
          .single()

        if (settingsData) setSettings(settingsData as unknown as TenantSettings)
      } catch {
        setError('Failed to load tenant')
      } finally {
        setIsLoading(false)
      }
    }

    void resolve()
  }, [])

  return (
    <TenantContext.Provider value={{ tenant, settings, isSuperAdmin, isLoading, error }}>
      {children}
    </TenantContext.Provider>
  )
}

export function useTenant() {
  const ctx = useContext(TenantContext)
  if (!ctx) throw new Error('useTenant must be used inside TenantProvider')
  return ctx
}
