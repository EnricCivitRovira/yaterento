import { useTenant } from '@/lib/tenant'

export default function BookingApp() {
  const { tenant } = useTenant()

  return (
    <div>
      <h1>Reservar — {tenant?.name}</h1>
    </div>
  )
}
