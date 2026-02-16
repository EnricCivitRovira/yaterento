import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useTenant } from '@/lib/tenant'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import type { Boat } from '@/types/database'

type BoatForm = Pick<Boat, 'name' | 'slug' | 'description' | 'capacity' | 'length_m' | 'engine_hp' | 'license_required' | 'is_active'>

const EMPTY_FORM: BoatForm = {
  name: '',
  slug: '',
  description: '',
  capacity: 1,
  length_m: null,
  engine_hp: null,
  license_required: false,
  is_active: true,
}

function toSlug(name: string) {
  return name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function FleetEditPage() {
  const { tenant } = useTenant()
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = !id

  const [form, setForm] = useState<BoatForm>(EMPTY_FORM)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [images, setImages] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!isNew && tenant) void loadBoat()
  }, [id, tenant])

  async function loadBoat() {
    const { data } = await supabase.from('boats').select('*').eq('id', id!).single()
    if (data) {
      const boat = data as unknown as Boat
      setForm({
        name: boat.name,
        slug: boat.slug,
        description: boat.description ?? '',
        capacity: boat.capacity,
        length_m: boat.length_m,
        engine_hp: boat.engine_hp,
        license_required: boat.license_required,
        is_active: boat.is_active,
      })
      setImages(boat.images)
    }
    setLoading(false)
  }

  function handleNameChange(name: string) {
    setForm(f => ({ ...f, name, slug: isNew ? toSlug(name) : f.slug }))
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !tenant) return
    setUploading(true)
    const path = `${tenant.id}/${id ?? 'new'}/${Date.now()}-${file.name}`
    const { data, error } = await supabase.storage.from('boats').upload(path, file)
    if (data) {
      const { data: urlData } = supabase.storage.from('boats').getPublicUrl(data.path)
      setImages(prev => [...prev, urlData.publicUrl])
    }
    if (error) setError('Error al subir imagen')
    setUploading(false)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!tenant) return
    setSaving(true)
    setError(null)

    const payload = { ...form, tenant_id: tenant.id, images }

    if (isNew) {
      const { error } = await supabase.from('boats').insert(payload as never)
      if (error) { setError(error.message); setSaving(false); return }
    } else {
      const { error } = await supabase.from('boats').update(payload as never).eq('id', id!)
      if (error) { setError(error.message); setSaving(false); return }
    }

    navigate('/backoffice/flota')
  }

  async function handleDelete() {
    if (!id || !confirm('¿Eliminar este barco? Esta acción no se puede deshacer.')) return
    await supabase.from('boats').delete().eq('id', id)
    navigate('/backoffice/flota')
  }

  if (loading) return <div className="p-8 text-gray-400 text-sm">Cargando...</div>

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/backoffice/flota')} className="text-gray-400 hover:text-gray-600">← Volver</button>
        <h1 className="text-2xl font-bold text-gray-900">{isNew ? 'Nuevo barco' : 'Editar barco'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Card>
          <h2 className="font-semibold text-gray-700 mb-4">Datos básicos</h2>
          <div className="flex flex-col gap-4">
            <Input label="Nombre" value={form.name} onChange={e => handleNameChange(e.target.value)} required />
            <Input label="Slug (URL)" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} helper="Se usa en la URL: /barcos/mi-barco" required />
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Descripción</label>
              <textarea
                value={form.description ?? ''}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                rows={3}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="font-semibold text-gray-700 mb-4">Especificaciones</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Capacidad (personas)" type="number" min={1} value={form.capacity} onChange={e => setForm(f => ({ ...f, capacity: +e.target.value }))} required />
            <Input label="Eslora (metros)" type="number" step="0.1" value={form.length_m ?? ''} onChange={e => setForm(f => ({ ...f, length_m: e.target.value ? +e.target.value : null }))} />
            <Input label="Motor (CV)" type="number" value={form.engine_hp ?? ''} onChange={e => setForm(f => ({ ...f, engine_hp: e.target.value ? +e.target.value : null }))} />
            <div className="flex flex-col gap-1 justify-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.license_required} onChange={e => setForm(f => ({ ...f, license_required: e.target.checked }))} className="w-4 h-4 rounded" />
                <span className="text-sm font-medium text-gray-700">Requiere licencia náutica</span>
              </label>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="font-semibold text-gray-700 mb-4">Fotos</h2>
          <div className="flex flex-wrap gap-3 mb-3">
            {images.map((url, i) => (
              <div key={i} className="relative group">
                <img src={url} alt="" className="w-24 h-24 rounded-lg object-cover" />
                <button type="button" onClick={() => setImages(prev => prev.filter((_, j) => j !== i))}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs hidden group-hover:flex items-center justify-center">✕</button>
              </div>
            ))}
            <label className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors text-gray-400 text-xs gap-1">
              {uploading ? '...' : <><span className="text-2xl">+</span><span>Foto</span></>}
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
        </Card>

        {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">{error}</p>}

        <div className="flex items-center justify-between">
          {!isNew && (
            <Button type="button" variant="danger" onClick={handleDelete}>Eliminar barco</Button>
          )}
          <div className="flex gap-3 ml-auto">
            <Button type="button" variant="secondary" onClick={() => navigate('/backoffice/flota')}>Cancelar</Button>
            <Button type="submit" loading={saving}>{isNew ? 'Crear barco' : 'Guardar cambios'}</Button>
          </div>
        </div>
      </form>
    </div>
  )
}
