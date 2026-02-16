import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '@/lib/auth'

const navItems = [
  { to: '/admin/tenants', icon: '🏢', label: 'Tenants' },
]

export function SuperAdminLayout() {
  const { logout, user } = useAuth()

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-60 bg-gray-900 text-white flex flex-col">
        <div className="px-5 py-4 border-b border-gray-700">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Super Admin</div>
          <div className="text-base font-bold mt-0.5">⚓ YaTeRento</div>
        </div>
        <nav className="flex-1 p-3 flex flex-col gap-1">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                ['flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'].join(' ')
              }
            >
              <span>{item.icon}</span>{item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-700">
          <div className="text-xs text-gray-400 px-3 py-1 truncate">{user?.email}</div>
          <button
            onClick={() => void logout()}
            className="w-full mt-1 flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            🚪 Cerrar sesión
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
