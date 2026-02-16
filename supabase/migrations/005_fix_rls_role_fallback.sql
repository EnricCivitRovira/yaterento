-- Actualiza jwt_user_role() para leer también de user_metadata si el hook no está activo
-- Si el hook está activo → el claim 'role' ya tiene el valor correcto
-- Si el hook NO está activo → 'role' es 'authenticated', fallback a user_metadata->>'role'
CREATE OR REPLACE FUNCTION public.jwt_user_role()
RETURNS text AS $$
DECLARE
  jwt_role text;
  meta_role text;
BEGIN
  jwt_role := COALESCE(
    current_setting('request.jwt.claims', true)::jsonb ->> 'role',
    'anon'
  );

  -- Si el hook está activo el role ya será 'superadmin' o 'tenant_admin'
  IF jwt_role NOT IN ('authenticated', 'anon', '') THEN
    RETURN jwt_role;
  END IF;

  -- Fallback: leer de user_metadata (cuando el hook no está registrado)
  meta_role := COALESCE(
    current_setting('request.jwt.claims', true)::jsonb -> 'user_metadata' ->> 'role',
    'anon'
  );

  RETURN COALESCE(NULLIF(meta_role, ''), 'anon');
END;
$$ LANGUAGE plpgsql STABLE;

-- jwt_tenant_id() también con fallback a user_metadata
CREATE OR REPLACE FUNCTION public.jwt_tenant_id()
RETURNS uuid AS $$
DECLARE
  tid text;
BEGIN
  -- Intentar del claim directo (hook activo)
  tid := current_setting('request.jwt.claims', true)::jsonb ->> 'tenant_id';
  IF tid IS NOT NULL AND tid != '' THEN
    RETURN tid::uuid;
  END IF;

  -- Fallback: user_metadata
  tid := current_setting('request.jwt.claims', true)::jsonb -> 'user_metadata' ->> 'tenant_id';
  IF tid IS NOT NULL AND tid != '' THEN
    RETURN tid::uuid;
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql STABLE;
