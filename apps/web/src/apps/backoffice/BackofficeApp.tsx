import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/lib/auth'
import { LoginPage } from '@/components/auth/LoginPage'
import { BackofficeLayout } from './BackofficeLayout'
import { lazy, Suspense, type ReactNode } from 'react'

const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const FleetPage = lazy(() => import('./pages/FleetPage'))
const FleetEditPage = lazy(() => import('./pages/FleetEditPage'))
const BookingsPage = lazy(() => import('./pages/BookingsPage'))
const CalendarPage = lazy(() => import('./pages/CalendarPage'))

const PageFallback = () => (
  <div className="flex min-h-screen items-center justify-center text-gray-400 text-sm">Cargando...</div>
)

function AuthGuard({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth()
  if (isLoading) return <PageFallback />
  if (!user) return <Navigate to="/backoffice/login" replace />
  return <>{children}</>
}

export default function BackofficeApp() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route
          path="login"
          element={
            <LoginPage
              redirectTo="/backoffice/dashboard"
              title="Backoffice"
              subtitle="Accede al panel de gestión"
            />
          }
        />
        <Route
          element={
            <AuthGuard>
              <BackofficeLayout />
            </AuthGuard>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="flota" element={<FleetPage />} />
          <Route path="flota/nueva" element={<FleetEditPage />} />
          <Route path="flota/:id" element={<FleetEditPage />} />
          <Route path="reservas" element={<BookingsPage />} />
          <Route path="calendario" element={<CalendarPage />} />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
