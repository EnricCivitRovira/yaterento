import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useTenant } from '@/lib/tenant'
import { BookingStatusBadge } from '@/components/ui/Badge'
import { Table, Thead, Tbody, Th, Td, Tr } from '@/components/ui/Table'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import type { Booking, Boat, BookingStatus } from '@/types/database'

interface BoatUser { name: string; email: string; phone: string | null }
interface BookingWithDetails extends Booking {
  boat: Pick<Boat, 'name'> | null
  user: BoatUser | null
}

const STATUS_OPTIONS: { value: BookingStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'pending', label: 'Pendientes' },
  { value: 'confirmed', label: 'Confirmadas' },
  { value: 'in_progress', label: 'En curso' },
  { value: 'completed', label: 'Completadas' },
  { value: 'cancelled', label: 'Canceladas' },
]

const NEXT_STATUS: Partial<Record<BookingStatus, BookingStatus>> = {
  pending: 'confirmed',
  confirmed: 'in_progress',
  in_progress: 'completed',
}

export default function BookingsPage() {
  const { tenant } = useTenant()
  const [bookings, setBookings] = useState<BookingWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<BookingStatus | 'all'>('all')
  const [selected, setSelected] = useState<BookingWithDetails | null>(null)

  useEffect(() => {
    if (!tenant) return
    void loadBookings()
  }, [tenant, filter])

  async function loadBookings() {
    if (!tenant) return
    let query = supabase
      .from('bookings')
      .select('*, boat:boats(name), user:boat_users(name, email, phone)')
      .eq('tenant_id', tenant.id)
      .order('start_datetime', { ascending: false })
    if (filter !== 'all') query = query.eq('status', filter)
    const { data } = await query
    setBookings((data ?? []) as unknown as BookingWithDetails[])
    setLoading(false)
  }

  async function changeStatus(booking: BookingWithDetails, newStatus: BookingStatus) {
    await supabase.from('bookings').update({ status: newStatus } as never).eq('id', booking.id)
    await supabase.from('booking_status_log').insert({
      booking_id: booking.id,
      from_status: booking.status,
      to_status: newStatus,
    } as never)
    setBookings(prev => prev.map(b => b.id === booking.id ? { ...b, status: newStatus } : b))
    setSelected(prev => prev?.id === booking.id ? { ...prev, status: newStatus } : prev)
  }

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reservas</h1>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {STATUS_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => { setFilter(opt.value); setLoading(true) }}
              className={['px-3 py-1.5 rounded-md text-sm font-medium transition-colors', filter === opt.value ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'].join(' ')}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-gray-400 text-sm">Cargando reservas...</div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">📋</div>
          <p>No hay reservas {filter !== 'all' ? `con estado "${filter}"` : 'todavía'}</p>
        </div>
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>Barco</Th>
              <Th>Cliente</Th>
              <Th>Fecha inicio</Th>
              <Th>Fecha fin</Th>
              <Th>Total</Th>
              <Th>Estado</Th>
            </Tr>
          </Thead>
          <Tbody>
            {bookings.map(booking => (
              <Tr key={booking.id} onClick={() => setSelected(booking)}>
                <Td className="font-medium">{booking.boat?.name ?? '—'}</Td>
                <Td>
                  <div>{booking.user?.name ?? '—'}</div>
                  <div className="text-xs text-gray-400">{booking.user?.email}</div>
                </Td>
                <Td>{new Date(booking.start_datetime).toLocaleString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</Td>
                <Td>{new Date(booking.end_datetime).toLocaleString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</Td>
                <Td className="font-medium">{booking.total_price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</Td>
                <Td><BookingStatusBadge status={booking.status} /></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      {/* Modal detalle */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setSelected(null)}>
          <Card className="w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-bold text-gray-900 text-lg">{selected.boat?.name}</h2>
                <BookingStatusBadge status={selected.status} />
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
            </div>
            <div className="flex flex-col gap-2 text-sm text-gray-700 mb-5">
              <div><span className="font-medium">Cliente:</span> {selected.user?.name}</div>
              <div><span className="font-medium">Email:</span> {selected.user?.email}</div>
              {selected.user?.phone && <div><span className="font-medium">Teléfono:</span> {selected.user.phone}</div>}
              <div><span className="font-medium">Inicio:</span> {new Date(selected.start_datetime).toLocaleString('es-ES')}</div>
              <div><span className="font-medium">Fin:</span> {new Date(selected.end_datetime).toLocaleString('es-ES')}</div>
              <div><span className="font-medium">Precio total:</span> {selected.total_price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</div>
              <div><span className="font-medium">Fianza:</span> {selected.deposit_paid ? '✅ Pagada' : '⏳ Pendiente'} ({selected.deposit_amount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })})</div>
              {selected.notes && <div><span className="font-medium">Notas:</span> {selected.notes}</div>}
            </div>
            <div className="flex gap-2 flex-wrap">
              {NEXT_STATUS[selected.status] && (
                <Button size="sm" onClick={() => void changeStatus(selected, NEXT_STATUS[selected.status]!)}>
                  → {NEXT_STATUS[selected.status] === 'confirmed' ? 'Confirmar' : NEXT_STATUS[selected.status] === 'in_progress' ? 'Iniciar' : 'Completar'}
                </Button>
              )}
              {selected.status !== 'cancelled' && selected.status !== 'completed' && (
                <Button size="sm" variant="danger" onClick={() => void changeStatus(selected, 'cancelled')}>Cancelar</Button>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
