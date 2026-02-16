import { useTenant } from '@/lib/tenant'

export default function ClientPortalApp() {
  const { tenant } = useTenant()

  return (
    <div>
      <h1>Mi cuenta — {tenant?.name}</h1>
    </div>
  )
}
