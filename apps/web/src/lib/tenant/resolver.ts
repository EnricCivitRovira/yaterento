const APP_DOMAIN = import.meta.env.VITE_APP_DOMAIN as string ?? 'yaterento.com'

export type TenantResolution =
  | { type: 'superadmin' }
  | { type: 'tenant_slug'; slug: string }
  | { type: 'tenant_custom_domain'; domain: string }
  | { type: 'unknown' }

/**
 * Resuelve el tenant a partir del hostname actual.
 *
 * Ejemplos:
 *   yaterento.com          → superadmin
 *   marinablava.yaterento.com → tenant_slug "marinablava"
 *   www.marinablava.com    → tenant_custom_domain "www.marinablava.com"
 *   localhost              → dev fallback (usa VITE_DEV_TENANT_SLUG)
 */
export function resolveTenantFromHostname(hostname: string): TenantResolution {
  // Desarrollo local
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    const devSlug = import.meta.env.VITE_DEV_TENANT_SLUG as string | undefined
    if (devSlug) return { type: 'tenant_slug', slug: devSlug }
    return { type: 'superadmin' }
  }

  // Dominio raíz → super-admin
  if (hostname === APP_DOMAIN || hostname === `www.${APP_DOMAIN}`) {
    return { type: 'superadmin' }
  }

  // Subdominio de la plataforma → tenant por slug
  if (hostname.endsWith(`.${APP_DOMAIN}`)) {
    const slug = hostname.replace(`.${APP_DOMAIN}`, '')
    return { type: 'tenant_slug', slug }
  }

  // Dominio externo → tenant por custom_domain
  return { type: 'tenant_custom_domain', domain: hostname }
}
