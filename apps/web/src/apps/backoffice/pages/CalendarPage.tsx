import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useTenant } from '@/lib/tenant'
import { BookingStatusBadge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import type { Booking, Boat } from '@/types/database'

interface BookingWithBoat extends Booking {
  boat: Pick<Boat, 'name'> | null
}

const BOAT_COLORS = ['bg-blue-400', 'bg-violet-400', 'bg-emerald-400', 'bg-orange-400', 'bg-pink-400', 'bg-cyan-400']

const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

export default function CalendarPage() {
  const { tenant } = useTenant()
  const [bookings, setBookings] = useState<BookingWithBoat[]>([])
  const [boatColorMap, setBoatColorMap] = useState<Record<string, string>>({})
  const [current, setCurrent] = useState(() => new Date())
  const [selected, setSelected] = useState<BookingWithBoat | null>(null)

  const year = current.getFullYear()
  const month = current.getMonth()

  useEffect(() => {
    if (!tenant) return
    void loadMonth()
  }, [tenant, year, month])

  async function loadMonth() {
    if (!tenant) return
    const start = new Date(year, month, 1).toISOString()
    const end = new Date(year, month + 1, 0, 23, 59, 59).toISOString()
    const { data } = await supabase
      .from('bookings')
      .select('*, boat:boats(name)')
      .eq('tenant_id', tenant.id)
      .lte('start_datetime', end)
      .gte('end_datetime', start)
      .neq('status', 'cancelled')
    const list = (data ?? []) as unknown as BookingWithBoat[]
    setBookings(list)
    const colorMap: Record<string, string> = {}
    const boatIds = [...new Set(list.map(b => b.boat_id))]
    boatIds.forEach((id, i) => { colorMap[id] = BOAT_COLORS[i % BOAT_COLORS.length] })
    setBoatColorMap(colorMap)
  }

  // Construir grid del mes
  const firstDay = new Date(year, month, 1)
  const startOffset = (firstDay.getDay() + 6) % 7 // lunes=0
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  function bookingsForDay(day: number) {
    return bookings.filter(b => {
      const start = new Date(b.start_datetime)
      const end = new Date(b.end_datetime)
      const cellDate = new Date(year, month, day)
      return cellDate >= new Date(start.getFullYear(), start.getMonth(), start.getDate())
        && cellDate <= new Date(end.getFullYear(), end.getMonth(), end.getDate())
    })
  }

  const today = new Date()

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Calendario</h1>
        <div className="flex items-center gap-3">
          <button onClick={() => setCurrent(new Date(year, month - 1))} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">‹</button>
          <span className="font-semibold text-gray-800 w-36 text-center">{MONTHS[month]} {year}</span>
          <button onClick={() => setCurrent(new Date(year, month + 1))} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">›</button>
          <button onClick={() => setCurrent(new Date())} className="ml-2 px-3 py-1.5 text-sm rounded-lg border border-gray-300 hover:bg-gray-50">Hoy</button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Header días */}
        <div className="grid grid-cols-7 border-b border-gray-100">
          {DAYS.map(d => (
            <div key={d} className="py-2 text-center text-xs font-semibold text-gray-500 uppercase">{d}</div>
          ))}
        </div>
        {/* Celdas */}
        <div className="grid grid-cols-7">
          {cells.map((day, i) => {
            if (!day) return <div key={i} className="min-h-[100px] border-b border-r border-gray-50 bg-gray-50/50" />
            const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day
            const dayBookings = bookingsForDay(day)
            return (
              <div key={i} className={['min-h-[100px] p-1.5 border-b border-r border-gray-100 hover:bg-gray-50/50 transition-colors', isToday ? 'bg-blue-50/40' : ''].join(' ')}>
                <div className={['text-xs font-medium mb-1 w-6 h-6 flex items-center justify-center rounded-full', isToday ? 'bg-blue-600 text-white' : 'text-gray-600'].join(' ')}>
                  {day}
                </div>
                <div className="flex flex-col gap-0.5">
                  {dayBookings.slice(0, 3).map(b => (
                    <button
                      key={b.id}
                      onClick={() => setSelected(b)}
                      className={['w-full text-left text-xs px-1.5 py-0.5 rounded text-white truncate', boatColorMap[b.boat_id] ?? 'bg-blue-400'].join(' ')}
                    >
                      {b.boat?.name ?? '—'}
                    </button>
                  ))}
                  {dayBookings.length > 3 && (
                    <span className="text-xs text-gray-400 pl-1">+{dayBookings.length - 3} más</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setSelected(null)}>
          <Card className="w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-3">
              <h2 className="font-bold text-gray-900">{selected.boat?.name}</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
            </div>
            <div className="flex flex-col gap-2 text-sm text-gray-700">
              <BookingStatusBadge status={selected.status} />
              <div><span className="font-medium">Inicio:</span> {new Date(selected.start_datetime).toLocaleString('es-ES')}</div>
              <div><span className="font-medium">Fin:</span> {new Date(selected.end_datetime).toLocaleString('es-ES')}</div>
              <div><span className="font-medium">Total:</span> {selected.total_price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
