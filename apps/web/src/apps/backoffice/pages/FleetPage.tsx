import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useTenant } from '@/lib/tenant'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Table, Thead, Tbody, Th, Td, Tr } from '@/components/ui/Table'
import type { Boat } from '@/types/database'

export default function FleetPage() {
  const { tenant } = useTenant()
  const [boats, setBoats] = useState<Boat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!tenant) return
    void loadBoats()
  }, [tenant])

  async function loadBoats() {
    if (!tenant) return
    const { data } = await supabase
      .from('boats')
      .select('*')
      .eq('tenant_id', tenant.id)
      .order('created_at', { ascending: false })
    setBoats((data ?? []) as unknown as Boat[])
    setLoading(false)
  }

  async function toggleActive(boat: Boat) {
    await supabase.from('boats').update({ is_active: !boat.is_active } as never).eq('id', boat.id)
    setBoats(prev => prev.map(b => b.id === boat.id ? { ...b, is_active: !b.is_active } : b))
  }

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Flota</h1>
        <Link to="/backoffice/flota/nueva"><Button>+ Nuevo barco</Button></Link>
      </div>

      {loading ? (
        <div className="text-gray-400 text-sm">Cargando flota...</div>
      ) : boats.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">⛵</div>
          <p className="font-medium">No hay barcos todavía</p>
          <p className="text-sm mt-1">Añade tu primera embarcación</p>
          <Link to="/backoffice/flota/nueva">
            <Button className="mt-4">+ Nuevo barco</Button>
          </Link>
        </div>
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>Barco</Th>
              <Th>Capacidad</Th>
              <Th>Eslora</Th>
              <Th>Licencia</Th>
              <Th>Estado</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {boats.map(boat => (
              <Tr key={boat.id}>
                <Td>
                  <div className="flex items-center gap-3">
                    {boat.images[0] ? (
                      <img src={boat.images[0]} alt={boat.name} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-lg">⛵</div>
                    )}
                    <div>
                      <div className="font-medium text-gray-900">{boat.name}</div>
                      <div className="text-xs text-gray-400">{boat.slug}</div>
                    </div>
                  </div>
                </Td>
                <Td>{boat.capacity} pax</Td>
                <Td>{boat.length_m ? `${boat.length_m}m` : '—'}</Td>
                <Td>
                  <Badge color={boat.license_required ? 'yellow' : 'gray'}>
                    {boat.license_required ? 'Requerida' : 'No requerida'}
                  </Badge>
                </Td>
                <Td>
                  <button
                    onClick={() => void toggleActive(boat)}
                    className="flex items-center gap-1.5 text-sm"
                  >
                    <span className={['w-9 h-5 rounded-full transition-colors flex items-center px-0.5', boat.is_active ? 'bg-green-500' : 'bg-gray-300'].join(' ')}>
                      <span className={['w-4 h-4 rounded-full bg-white shadow transition-transform', boat.is_active ? 'translate-x-4' : 'translate-x-0'].join(' ')} />
                    </span>
                    <span className={boat.is_active ? 'text-green-700' : 'text-gray-400'}>
                      {boat.is_active ? 'Activo' : 'Inactivo'}
                    </span>
                  </button>
                </Td>
                <Td>
                  <Link
                    to={`/backoffice/flota/${boat.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Editar
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </div>
  )
}
