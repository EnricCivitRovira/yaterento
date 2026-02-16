import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import { TenantStatusBadge } from '@/components/ui/Badge'
import { Table, Thead, Tbody, Th, Td, Tr } from '@/components/ui/Table'
import type { Tenant } from '@/types/database'

interface TenantWithStats extends Tenant {
  boat_count: number
  booking_count: number
}

export default function TenantsPage() {
  const [tenants, setTenants] = useState<TenantWithStats[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { void loadTenants() }, [])

  async function loadTenants() {
    const { data: tenantsData } = await supabase
      .from('tenants')
      .select('*')
      .order('created_at', { ascending: false })

    if (!tenantsData) { setLoading(false); return }

    const withStats = await Promise.all(
      (tenantsData as unknown as Tenant[]).map(async t => {
        const [boats, bookings] = await Promise.all([
          supabase.from('boats').select('id', { count: 'exact', head: true }).eq('tenant_id', t.id),
          supabase.from('bookings').select('id', { count: 'exact', head: true }).eq('tenant_id', t.id),
        ])
        return { ...t, boat_count: boats.count ?? 0, booking_count: bookings.count ?? 0 }
      })
    )

    setTenants(withStats)
    setLoading(false)
  }

  const PLAN_COLORS: Record<string, string> = {
    starter: 'text-gray-600 bg-gray-100',
    pro: 'text-blue-700 bg-blue-100',
    enterprise: 'text-purple-700 bg-purple-100',
  }

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tenants</h1>
          <p className="text-sm text-gray-500 mt-0.5">{tenants.length} empresas registradas</p>
        </div>
        <Link to="/admin/tenants/nuevo">
          <Button>+ Nuevo tenant</Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-gray-400 text-sm">Cargando...</div>
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>Empresa</Th>
              <Th>Plan</Th>
              <Th>Estado</Th>
              <Th>Barcos</Th>
              <Th>Reservas</Th>
              <Th>Alta</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tenants.map(t => (
              <Tr key={t.id}>
                <Td>
                  <div className="font-medium text-gray-900">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.slug}.yaterento.com</div>
                  {t.custom_domain && <div className="text-xs text-blue-500">{t.custom_domain}</div>}
                </Td>
                <Td>
                  <span className={['text-xs font-semibold px-2 py-0.5 rounded-full', PLAN_COLORS[t.plan]].join(' ')}>
                    {t.plan}
                  </span>
                </Td>
                <Td><TenantStatusBadge status={t.status} /></Td>
                <Td className="text-center">{t.boat_count}</Td>
                <Td className="text-center">{t.booking_count}</Td>
                <Td className="text-gray-500">{new Date(t.created_at).toLocaleDateString('es-ES')}</Td>
                <Td>
                  <div className="flex gap-3">
                    <Link to={`/admin/tenants/${t.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Ver</Link>
                    <Link to={`/admin/tenants/${t.id}/editar`} className="text-gray-500 hover:text-gray-700 text-sm">Editar</Link>
                  </div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </div>
  )
}
