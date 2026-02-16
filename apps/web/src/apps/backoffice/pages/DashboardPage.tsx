import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useTenant } from '@/lib/tenant'
import { Card } from '@/components/ui/Card'
import { BookingStatusBadge } from '@/components/ui/Badge'
import type { Booking, Boat } from '@/types/database'

interface BoatUser { name: string; email: string }
interface BookingWithDetails extends Booking {
  boat: Pick<Boat, 'name'> | null
  user: BoatUser | null
}

interface KPIs {
  todayCount: number
  weekCount: number
  monthRevenue: number
  fleetOccupancy: number
}

export default function DashboardPage() {
  const { tenant } = useTenant()
  const [kpis, setKpis] = useState<KPIs>({ todayCount: 0, weekCount: 0, monthRevenue: 0, fleetOccupancy: 0 })
  const [upcoming, setUpcoming] = useState<BookingWithDetails[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!tenant) return
    void loadData()
  }, [tenant])

  async function loadData() {
    if (!tenant) return
    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).toISOString()
    const weekEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7).toISOString()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
    const in48h = new Date(now.getTime() + 48 * 60 * 60 * 1000).toISOString()

    const [todayRes, weekRes, revenueRes, upcomingRes, boatsRes, activeRes] = await Promise.all([
      supabase.from('bookings').select('id', { count: 'exact', head: true })
        .eq('tenant_id', tenant.id)
        .gte('start_datetime', todayStart).lt('start_datetime', todayEnd),
      supabase.from('bookings').select('id', { count: 'exact', head: true })
        .eq('tenant_id', tenant.id)
        .gte('start_datetime', todayStart).lt('start_datetime', weekEnd),
      supabase.from('bookings').select('total_price')
        .eq('tenant_id', tenant.id).eq('status', 'completed')
        .gte('created_at', monthStart),
      supabase.from('bookings').select('*, boat:boats(name), user:boat_users(name, email)')
        .eq('tenant_id', tenant.id)
        .gte('start_datetime', now.toISOString())
        .lte('start_datetime', in48h)
        .order('start_datetime', { ascending: true }),
      supabase.from('boats').select('id', { count: 'exact', head: true })
        .eq('tenant_id', tenant.id).eq('is_active', true),
      supabase.from('bookings').select('boat_id')
        .eq('tenant_id', tenant.id).eq('status', 'in_progress'),
    ])

    const monthRevenue = (revenueRes.data as unknown as { total_price: number }[] ?? []).reduce((sum, b) => sum + (b.total_price ?? 0), 0)
    const totalBoats = boatsRes.count ?? 0
    const activeBoats = new Set((activeRes.data as unknown as { boat_id: string }[] ?? []).map(b => b.boat_id)).size

    setKpis({
      todayCount: todayRes.count ?? 0,
      weekCount: weekRes.count ?? 0,
      monthRevenue,
      fleetOccupancy: totalBoats > 0 ? Math.round((activeBoats / totalBoats) * 100) : 0,
    })
    setUpcoming((upcomingRes.data ?? []) as unknown as BookingWithDetails[])
    setLoading(false)
  }

  if (loading) {
    return <div className="p-8 text-gray-400 text-sm">Cargando dashboard...</div>
  }

  return (
    <div className="p-8 max-w-6xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <div className="text-3xl font-bold text-blue-600">{kpis.todayCount}</div>
          <div className="text-sm text-gray-500 mt-1">Reservas hoy</div>
        </Card>
        <Card>
          <div className="text-3xl font-bold text-indigo-600">{kpis.weekCount}</div>
          <div className="text-sm text-gray-500 mt-1">Esta semana</div>
        </Card>
        <Card>
          <div className="text-3xl font-bold text-green-600">
            {kpis.monthRevenue.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })}
          </div>
          <div className="text-sm text-gray-500 mt-1">Ingresos del mes</div>
        </Card>
        <Card>
          <div className="text-3xl font-bold text-orange-500">{kpis.fleetOccupancy}%</div>
          <div className="text-sm text-gray-500 mt-1">Ocupación flota</div>
        </Card>
      </div>

      {/* Próximas salidas */}
      <Card padding="none">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Próximas salidas (48h)</h2>
        </div>
        {upcoming.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-400 text-sm">
            No hay salidas previstas en las próximas 48 horas
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {upcoming.map(booking => (
              <div key={booking.id} className="px-6 py-4 flex items-center gap-4">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{booking.boat?.name ?? '—'}</div>
                  <div className="text-sm text-gray-500">{booking.user?.name} · {booking.user?.email}</div>
                </div>
                <div className="text-sm text-gray-600">
                  {new Date(booking.start_datetime).toLocaleString('es-ES', {
                    weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
                  })}
                </div>
                <BookingStatusBadge status={booking.status} />
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
