import { NavLink, Outlet, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from '@/lib/auth'
import { useTenant } from '@/lib/tenant'

const navItems = [
  { to: '/backoffice/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/backoffice/flota', icon: '⛵', label: 'Flota' },
  { to: '/backoffice/reservas', icon: '📋', label: 'Reservas' },
  { to: '/backoffice/calendario', icon: '📅', label: 'Calendario' },
]

export function BackofficeLayout() {
  const { logout, user } = useAuth()
  const { tenant } = useTenant()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    if (searchParams.get('from_admin') === '1') {
      sessionStorage.setItem('impersonating', '1')
    }
  }, [])

  const isImpersonating = sessionStorage.getItem('impersonating') === '1'

  async function handleExit() {
    sessionStorage.removeItem('impersonating')
    await logout()
    window.location.href = '/admin/tenants'
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Backoffice</div>
          <div className="text-base font-bold text-gray-900 mt-0.5 truncate">{tenant?.name}</div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 flex flex-col gap-1">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                ].join(' ')
              }
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="p-3 border-t border-gray-100">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-semibold">
              {user?.email?.[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-gray-700 truncate">{user?.email}</div>
            </div>
          </div>
          {isImpersonating ? (
            <button
              onClick={() => void handleExit()}
              className="w-full mt-1 flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-orange-600 hover:bg-orange-50 transition-colors font-medium"
            >
              <span>↩</span> Volver al admin
            </button>
          ) : (
            <button
              onClick={() => void logout()}
              className="w-full mt-1 flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            >
              <span>🚪</span> Cerrar sesión
            </button>
          )}
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
