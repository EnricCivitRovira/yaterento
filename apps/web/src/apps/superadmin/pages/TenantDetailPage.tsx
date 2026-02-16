import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { TenantStatusBadge } from '@/components/ui/Badge'
import type { Tenant } from '@/types/database'

interface TenantStats {
  boats: number
  bookings: number
  revenue: number
}

export default function TenantDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tenant, setTenant] = useState<Tenant | null>(null)
  const [stats, setStats] = useState<TenantStats>({ boats: 0, bookings: 0, revenue: 0 })
  const [loading, setLoading] = useState(true)
  const [impersonating, setImpersonating] = useState(false)
  const [impersonateError, setImpersonateError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => { if (id) void loadTenant() }, [id])

  async function loadTenant() {
    const [tenantRes, boatsRes, bookingsRes, revenueRes] = await Promise.all([
      supabase.from('tenants').select('*').eq('id', id!).single(),
      supabase.from('boats').select('id', { count: 'exact', head: true }).eq('tenant_id', id!),
      supabase.from('bookings').select('id', { count: 'exact', head: true }).eq('tenant_id', id!),
      supabase.from('bookings').select('total_price').eq('tenant_id', id!).eq('status', 'completed'),
    ])
    const rawTenant = (tenantRes as unknown as { data: Tenant | null }).data
    if (rawTenant) setTenant(rawTenant)
    const revenue = (revenueRes.data as unknown as { total_price: number }[] ?? []).reduce((s, b) => s + (b.total_price ?? 0), 0)
    setStats({ boats: boatsRes.count ?? 0, bookings: bookingsRes.count ?? 0, revenue })
    setLoading(false)
  }

  async function handleImpersonate() {
    if (!tenant) return
    setImpersonating(true)
    setImpersonateError(null)
    try {
      // Llama a la Edge Function que genera un token de sesión del admin del tenant
      const { data, error } = await supabase.functions.invoke('impersonate-tenant', {
        body: { tenant_id: tenant.id, redirect_to: `${window.location.origin}/backoffice/dashboard?from_admin=1` },
      })
      if (error || !data?.url) throw new Error(error?.message ?? 'No se pudo impersonar')
      window.open(data.url, '_blank')
    } catch (err) {
      setImpersonateError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setImpersonating(false)
    }
  }

  async function handleDelete() {
    if (!tenant) return
    if (!window.confirm(`¿Eliminar "${tenant.name}" y todos sus datos? Esta acción no se puede deshacer.`)) return
    setDeleting(true)
    await supabase.from('tenants').delete().eq('id', tenant.id)
    navigate('/admin/tenants')
  }

  if (loading) return <div className="p-8 text-gray-400 text-sm">Cargando...</div>
  if (!tenant) return <div className="p-8 text-red-500">Tenant no encontrado</div>

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/admin/tenants" className="text-gray-400 hover:text-gray-600">← Tenants</Link>
        <h1 className="text-2xl font-bold text-gray-900">{tenant.name}</h1>
        <TenantStatusBadge status={tenant.status} />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <div className="text-3xl font-bold text-blue-600">{stats.boats}</div>
          <div className="text-sm text-gray-500 mt-1">Barcos</div>
        </Card>
        <Card>
          <div className="text-3xl font-bold text-indigo-600">{stats.bookings}</div>
          <div className="text-sm text-gray-500 mt-1">Reservas totales</div>
        </Card>
        <Card>
          <div className="text-3xl font-bold text-green-600">
            {stats.revenue.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })}
          </div>
          <div className="text-sm text-gray-500 mt-1">Ingresos (completadas)</div>
        </Card>
      </div>

      <Card className="mb-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            <div><span className="font-medium">Slug:</span> {tenant.slug}.yaterento.com</div>
            {tenant.custom_domain && <div><span className="font-medium">Dominio:</span> {tenant.custom_domain}</div>}
            <div><span className="font-medium">Plan:</span> <span className="capitalize">{tenant.plan}</span></div>
            <div><span className="font-medium">Alta:</span> {new Date(tenant.created_at).toLocaleDateString('es-ES')}</div>
          </div>
          <Link to={`/admin/tenants/${tenant.id}/editar`}>
            <Button variant="secondary" size="sm">Editar</Button>
          </Link>
        </div>
      </Card>

      <Card className="mb-4">
        <h2 className="font-semibold text-gray-800 mb-2">Impersonar tenant</h2>
        <p className="text-sm text-gray-500 mb-4">
          Abre el backoffice de este tenant como si fueras su administrador. Útil para soporte y debug.
        </p>
        {impersonateError && <p className="text-sm text-red-600 mb-3">{impersonateError}</p>}
        <Button onClick={() => void handleImpersonate()} loading={impersonating} variant="secondary">
          🔑 Entrar como {tenant.name}
        </Button>
      </Card>

      <Card>
        <h2 className="font-semibold text-red-700 mb-2">Zona peligrosa</h2>
        <p className="text-sm text-gray-500 mb-4">Elimina el tenant y todos sus datos (barcos, reservas, settings). Irreversible.</p>
        <Button onClick={() => void handleDelete()} loading={deleting} variant="danger" size="sm">
          Eliminar tenant
        </Button>
      </Card>
    </div>
  )
}
