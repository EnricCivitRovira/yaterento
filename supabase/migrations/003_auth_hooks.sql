-- ============================================================
-- YaTeRento.com — Custom JWT Claims Hook
-- Migration: 003_auth_hooks
-- ============================================================
-- Añade claims personalizados al JWT en cada login:
--   role: 'superadmin' | 'tenant_admin'
--   tenant_id: uuid del tenant (solo para tenant_admin)
--
-- Tras aplicar esta migration, registrar el hook en:
-- Supabase Dashboard → Authentication → Hooks
-- → "Customize Access Token (JWT) Claim"
-- → Function: public.custom_jwt_claims
-- ============================================================

CREATE OR REPLACE FUNCTION public.custom_jwt_claims(event jsonb)
RETURNS jsonb AS $$
DECLARE
  claims jsonb;
  user_role text;
  user_tenant_id text;
BEGIN
  claims := event -> 'claims';

  -- Leer metadata del usuario
  user_role := event -> 'user_metadata' ->> 'role';
  user_tenant_id := event -> 'user_metadata' ->> 'tenant_id';

  IF user_role = 'superadmin' THEN
    claims := jsonb_set(claims, '{role}', '"superadmin"');
  ELSIF user_tenant_id IS NOT NULL THEN
    claims := jsonb_set(claims, '{role}', '"tenant_admin"');
    claims := jsonb_set(claims, '{tenant_id}', to_jsonb(user_tenant_id));
  END IF;

  RETURN jsonb_set(event, '{claims}', claims);
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;
