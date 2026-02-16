import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import type { Tenant, TenantPlan, TenantStatus } from '@/types/database'

interface TenantForm {
  name: string
  slug: string
  plan: TenantPlan
  status: TenantStatus
  custom_domain: string
  adminEmail: string
  adminPassword: string
}

const EMPTY: TenantForm = {
  name: '', slug: '', plan: 'starter', status: 'onboarding',
  custom_domain: '', adminEmail: '', adminPassword: '',
}

function toSlug(name: string) {
  return name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function TenantEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = !id

  const [form, setForm] = useState<TenantForm>(EMPTY)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isNew) void loadTenant()
  }, [id])

  async function loadTenant() {
    const { data } = await supabase.from('tenants').select('*').eq('id', id!).single()
    if (data) {
      const t = data as unknown as Tenant
      setForm(f => ({ ...f, name: t.name, slug: t.slug, plan: t.plan, status: t.status, custom_domain: t.custom_domain ?? '' }))
    }
    setLoading(false)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    if (isNew) {
      // 1. Crear tenant
      const { data: tenant, error: tErr } = await supabase
        .from('tenants')
        .insert({ name: form.name, slug: form.slug, plan: form.plan, status: form.status, custom_domain: form.custom_domain || null } as never)
        .select()
        .single()

      if (tErr || !tenant) { setError(tErr?.message ?? 'Error creando tenant'); setSaving(false); return }

      const t = tenant as unknown as Tenant

      // 2. Crear tenant_settings por defecto
      await supabase.from('tenant_settings').insert({
        tenant_id: t.id, languages: ['es'], default_language: 'es',
        primary_color: '#0f4c81', secondary_color: '#f59e0b',
      } as never)

      // 3. Crear usuario admin (via Supabase Auth Admin si tienes service key,
      //    de momento lo hacemos con signUp normal — el hook añadirá los claims)
      if (form.adminEmail) {
        const { error: authErr } = await supabase.auth.signUp({
          email: form.adminEmail,
          password: form.adminPassword || Math.random().toString(36).slice(-10),
          options: { data: { role: 'tenant_admin', tenant_id: t.id } },
        })
        if (authErr) { setError('Tenant creado pero error creando usuario: ' + authErr.message); setSaving(false); return }
      }
    } else {
      const { error: tErr } = await supabase
        .from('tenants')
        .update({ name: form.name, slug: form.slug, plan: form.plan, status: form.status, custom_domain: form.custom_domain || null } as never)
        .eq('id', id!)
      if (tErr) { setError(tErr.message); setSaving(false); return }
    }

    navigate('/admin/tenants')
  }

  if (loading) return <div className="p-8 text-gray-400 text-sm">Cargando...</div>

  return (
    <div className="p-8 max-w-xl">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/admin/tenants')} className="text-gray-400 hover:text-gray-600">← Volver</button>
        <h1 className="text-2xl font-bold text-gray-900">{isNew ? 'Nuevo tenant' : 'Editar tenant'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Card>
          <h2 className="font-semibold text-gray-700 mb-4">Datos de la empresa</h2>
          <div className="flex flex-col gap-4">
            <Input label="Nombre de la empresa" value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value, slug: isNew ? toSlug(e.target.value) : f.slug }))} required />
            <Input label="Slug (subdominio)" value={form.slug}
              onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
              helper={`${form.slug}.yaterento.com`} required />
            <Input label="Dominio personalizado" value={form.custom_domain}
              onChange={e => setForm(f => ({ ...f, custom_domain: e.target.value }))}
              placeholder="www.suempresa.com" />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Plan</label>
                <select value={form.plan} onChange={e => setForm(f => ({ ...f, plan: e.target.value as TenantPlan }))}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="starter">Starter — 49€/mes</option>
                  <option value="pro">Pro — 149€/mes</option>
                  <option value="enterprise">Enterprise — 299€+/mes</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Estado</label>
                <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as TenantStatus }))}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="onboarding">Onboarding</option>
                  <option value="active">Activo</option>
                  <option value="suspended">Suspendido</option>
                </select>
              </div>
            </div>
          </div>
        </Card>

        {isNew && (
          <Card>
            <h2 className="font-semibold text-gray-700 mb-1">Usuario administrador</h2>
            <p className="text-xs text-gray-500 mb-4">Se creará una cuenta para el empresario con estos datos</p>
            <div className="flex flex-col gap-4">
              <Input label="Email del responsable" type="email" value={form.adminEmail}
                onChange={e => setForm(f => ({ ...f, adminEmail: e.target.value }))} />
              <Input label="Contraseña temporal" type="password" value={form.adminPassword}
                onChange={e => setForm(f => ({ ...f, adminPassword: e.target.value }))}
                helper="Si la dejas vacía se generará una aleatoria" />
            </div>
          </Card>
        )}

        {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">{error}</p>}

        <div className="flex gap-3 justify-end">
          <Button type="button" variant="secondary" onClick={() => navigate('/admin/tenants')}>Cancelar</Button>
          <Button type="submit" loading={saving}>{isNew ? 'Crear tenant' : 'Guardar'}</Button>
        </div>
      </form>
    </div>
  )
}
