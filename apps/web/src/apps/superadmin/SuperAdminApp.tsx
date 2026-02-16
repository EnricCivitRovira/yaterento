import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/lib/auth'
import { LoginPage } from '@/components/auth/LoginPage'
import { SuperAdminLayout } from './SuperAdminLayout'
import { lazy, Suspense, type ReactNode } from 'react'

const TenantsPage = lazy(() => import('./pages/TenantsPage'))
const TenantEditPage = lazy(() => import('./pages/TenantEditPage'))
const TenantDetailPage = lazy(() => import('./pages/TenantDetailPage'))

const PageFallback = () => (
  <div className="flex min-h-screen items-center justify-center text-gray-400 text-sm">Cargando...</div>
)

function SuperAdminGuard({ children }: { children: ReactNode }) {
  const { user, role, isLoading } = useAuth()
  if (isLoading) return <PageFallback />
  if (!user) return <Navigate to="/admin/login" replace />
  if (role !== 'superadmin') return (
    <div className="flex min-h-screen items-center justify-center text-red-500 text-sm">
      Acceso denegado
    </div>
  )
  return <>{children}</>
}

export default function SuperAdminApp() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route
          path="login"
          element={
            <LoginPage
              redirectTo="/admin/tenants"
              title="Super Admin"
              subtitle="Panel de administración de YaTeRento"
            />
          }
        />
        <Route
          element={
            <SuperAdminGuard>
              <SuperAdminLayout />
            </SuperAdminGuard>
          }
        >
          <Route index element={<Navigate to="tenants" replace />} />
          <Route path="tenants" element={<TenantsPage />} />
          <Route path="tenants/nuevo" element={<TenantEditPage />} />
          <Route path="tenants/:id" element={<TenantDetailPage />} />
          <Route path="tenants/:id/editar" element={<TenantEditPage />} />
          <Route path="*" element={<Navigate to="tenants" replace />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
