import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { TenantProvider, useTenant } from '@/lib/tenant'
import { AuthProvider } from '@/lib/auth'
import { lazy, Suspense } from 'react'

const LandingApp = lazy(() => import('@/apps/landing/LandingApp'))
const BookingApp = lazy(() => import('@/apps/booking/BookingApp'))
const ClientPortalApp = lazy(() => import('@/apps/client-portal/ClientPortalApp'))
const BackofficeApp = lazy(() => import('@/apps/backoffice/BackofficeApp'))
const SuperAdminApp = lazy(() => import('@/apps/superadmin/SuperAdminApp'))
const MarketingLandingPage = lazy(() => import('@/apps/marketing/MarketingLandingPage'))

function AppRoutes() {
  const { isSuperAdmin, isLoading, error, tenant } = useTenant()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-500">Cargando...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-red-500">No se encontró el sitio: {error}</div>
      </div>
    )
  }

  // Dominio raíz: landing marketing + panel admin
  if (isSuperAdmin) {
    return (
      <Routes>
        <Route path="/" element={<MarketingLandingPage />} />
        <Route path="/admin/*" element={<SuperAdminApp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    )
  }

  // Tenant no resuelto
  if (!tenant) {
    return <div>Tenant no encontrado</div>
  }

  // Rutas del tenant
  return (
    <Routes>
      <Route path="/" element={<LandingApp />} />
      <Route path="/reservar/*" element={<BookingApp />} />
      <Route path="/mi-cuenta/*" element={<ClientPortalApp />} />
      <Route path="/backoffice/*" element={<BackofficeApp />} />
      <Route path="/admin/*" element={<SuperAdminApp />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <TenantProvider>
        <AuthProvider>
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center">
              <div className="text-gray-400">Cargando...</div>
            </div>
          }
        >
          <AppRoutes />
        </Suspense>
        </AuthProvider>
      </TenantProvider>
    </BrowserRouter>
  )
}
