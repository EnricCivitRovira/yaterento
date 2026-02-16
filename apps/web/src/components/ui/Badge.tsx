import type { ReactNode } from 'react'
import type { BookingStatus, TenantStatus } from '@/types/database'

type BadgeColor = 'gray' | 'yellow' | 'green' | 'blue' | 'red' | 'purple'

interface BadgeProps {
  children: ReactNode
  color?: BadgeColor
}

const colorClasses: Record<BadgeColor, string> = {
  gray: 'bg-gray-100 text-gray-700',
  yellow: 'bg-yellow-100 text-yellow-800',
  green: 'bg-green-100 text-green-800',
  blue: 'bg-blue-100 text-blue-800',
  red: 'bg-red-100 text-red-800',
  purple: 'bg-purple-100 text-purple-800',
}

export function Badge({ children, color = 'gray' }: BadgeProps) {
  return (
    <span className={['inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', colorClasses[color]].join(' ')}>
      {children}
    </span>
  )
}

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  const map: Record<BookingStatus, { label: string; color: BadgeColor }> = {
    pending: { label: 'Pendiente', color: 'yellow' },
    confirmed: { label: 'Confirmada', color: 'blue' },
    in_progress: { label: 'En curso', color: 'purple' },
    completed: { label: 'Completada', color: 'green' },
    cancelled: { label: 'Cancelada', color: 'red' },
  }
  const { label, color } = map[status]
  return <Badge color={color}>{label}</Badge>
}

export function TenantStatusBadge({ status }: { status: TenantStatus }) {
  const map: Record<TenantStatus, { label: string; color: BadgeColor }> = {
    active: { label: 'Activo', color: 'green' },
    onboarding: { label: 'Onboarding', color: 'yellow' },
    suspended: { label: 'Suspendido', color: 'red' },
  }
  const { label, color } = map[status]
  return <Badge color={color}>{label}</Badge>
}
