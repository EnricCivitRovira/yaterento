-- Bucket público para imágenes de barcos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'boats',
  'boats',
  true,
  5242880, -- 5 MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Lectura pública (cualquiera puede ver las imágenes en la web)
CREATE POLICY "Public read boat images"
ON storage.objects FOR SELECT
USING (bucket_id = 'boats');

-- Solo tenant admins pueden subir imágenes (a su propia carpeta: {tenant_id}/*)
CREATE POLICY "Tenant admin can upload boat images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'boats'
  AND auth.jwt() ->> 'role' = 'tenant_admin'
  AND (storage.foldername(name))[1] = (auth.jwt() ->> 'tenant_id')
);

-- Solo tenant admins pueden eliminar sus propias imágenes
CREATE POLICY "Tenant admin can delete own boat images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'boats'
  AND auth.jwt() ->> 'role' = 'tenant_admin'
  AND (storage.foldername(name))[1] = (auth.jwt() ->> 'tenant_id')
);
