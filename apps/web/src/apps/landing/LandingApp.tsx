import { useTenant } from '@/lib/tenant'

export default function LandingApp() {
  const { tenant, settings } = useTenant()

  return (
    <div>
      <h1>Landing de {tenant?.name}</h1>
      <p>Idioma por defecto: {settings?.default_language}</p>
    </div>
  )
}
