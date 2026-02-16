-- ============================================================
-- YaTeRento.com — Row Level Security
-- Migration: 002_rls_policies
-- ============================================================
-- Roles:
--   superadmin   → acceso total (claim: role = 'superadmin')
--   tenant_admin → acceso a su tenant (claim: tenant_id)
--   customer     → acceso a sus propios datos dentro del tenant
-- ============================================================

-- Funciones helper en schema public (auth schema es de solo lectura)
CREATE OR REPLACE FUNCTION public.jwt_tenant_id() RETURNS UUID AS $$
  SELECT NULLIF((auth.jwt() ->> 'tenant_id'), '')::UUID;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.jwt_user_role() RETURNS TEXT AS $$
  SELECT auth.jwt() ->> 'role';
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- ============================================================
-- TENANTS
-- ============================================================

ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;

-- Lectura pública del tenant (necesario para resolver la landing)
CREATE POLICY "tenants_public_read" ON tenants
  FOR SELECT USING (status = 'active');

-- Solo superadmin puede crear/editar tenants
CREATE POLICY "tenants_superadmin_all" ON tenants
  FOR ALL USING (public.jwt_user_role() = 'superadmin');

-- ============================================================
-- TENANT SETTINGS
-- ============================================================

ALTER TABLE tenant_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tenant_settings_public_read" ON tenant_settings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM tenants t
      WHERE t.id = tenant_id AND t.status = 'active'
    )
  );

CREATE POLICY "tenant_settings_admin_write" ON tenant_settings
  FOR ALL USING (
    public.jwt_user_role() = 'superadmin'
    OR tenant_id = public.jwt_tenant_id()
  );

-- ============================================================
-- BOATS
-- ============================================================

ALTER TABLE boats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "boats_public_read" ON boats
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "boats_tenant_admin" ON boats
  FOR ALL USING (
    public.jwt_user_role() = 'superadmin'
    OR tenant_id = public.jwt_tenant_id()
  );

-- ============================================================
-- BOAT EXTRAS
-- ============================================================

ALTER TABLE boat_extras ENABLE ROW LEVEL SECURITY;

CREATE POLICY "boat_extras_public_read" ON boat_extras
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "boat_extras_tenant_admin" ON boat_extras
  FOR ALL USING (
    public.jwt_user_role() = 'superadmin'
    OR tenant_id = public.jwt_tenant_id()
  );

-- ============================================================
-- PRICING TIERS
-- ============================================================

ALTER TABLE pricing_tiers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "pricing_public_read" ON pricing_tiers
  FOR SELECT USING (TRUE);

CREATE POLICY "pricing_tenant_admin" ON pricing_tiers
  FOR ALL USING (
    public.jwt_user_role() = 'superadmin'
    OR tenant_id = public.jwt_tenant_id()
  );

-- ============================================================
-- BOAT USERS (clientes)
-- ============================================================

ALTER TABLE boat_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "boat_users_own" ON boat_users
  FOR ALL USING (
    auth.uid() = auth_user_id
    OR public.jwt_user_role() = 'superadmin'
    OR tenant_id = public.jwt_tenant_id()
  );

-- ============================================================
-- BOOKINGS
-- ============================================================

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Cliente ve sus propias reservas
CREATE POLICY "bookings_customer_read" ON bookings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM boat_users bu
      WHERE bu.id = user_id AND bu.auth_user_id = auth.uid()
    )
  );

-- Tenant admin gestiona todas las reservas de su tenant
CREATE POLICY "bookings_tenant_admin" ON bookings
  FOR ALL USING (
    public.jwt_user_role() = 'superadmin'
    OR tenant_id = public.jwt_tenant_id()
  );

-- Inserción pública (flujo de reserva sin estar logado)
CREATE POLICY "bookings_public_insert" ON bookings
  FOR INSERT WITH CHECK (TRUE);

-- ============================================================
-- BOOKING EXTRAS / STATUS LOG
-- ============================================================

ALTER TABLE booking_extras ENABLE ROW LEVEL SECURITY;

CREATE POLICY "booking_extras_tenant" ON booking_extras
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM bookings b
      WHERE b.id = booking_id
        AND (b.tenant_id = public.jwt_tenant_id() OR public.jwt_user_role() = 'superadmin')
    )
  );

ALTER TABLE booking_status_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "booking_status_log_tenant" ON booking_status_log
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM bookings b
      WHERE b.id = booking_id
        AND (b.tenant_id = public.jwt_tenant_id() OR public.jwt_user_role() = 'superadmin')
    )
  );

-- ============================================================
-- CMS (lectura pública, escritura solo tenant admin)
-- ============================================================

ALTER TABLE cms_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cms_sections_public_read" ON cms_sections
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "cms_sections_admin" ON cms_sections
  FOR ALL USING (
    public.jwt_user_role() = 'superadmin'
    OR tenant_id = public.jwt_tenant_id()
  );

CREATE POLICY "cms_content_public_read" ON cms_content
  FOR SELECT USING (TRUE);

CREATE POLICY "cms_content_admin" ON cms_content
  FOR ALL USING (
    public.jwt_user_role() = 'superadmin'
    OR tenant_id = public.jwt_tenant_id()
  );

-- ============================================================
-- REVIEWS
-- ============================================================

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "reviews_public_read" ON reviews
  FOR SELECT USING (is_published = TRUE);

CREATE POLICY "reviews_tenant_admin" ON reviews
  FOR ALL USING (
    public.jwt_user_role() = 'superadmin'
    OR tenant_id = public.jwt_tenant_id()
  );

-- ============================================================
-- NOTIFICATIONS (solo tenant admin y superadmin)
-- ============================================================

ALTER TABLE notification_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "notification_log_tenant" ON notification_log
  FOR ALL USING (
    public.jwt_user_role() = 'superadmin'
    OR tenant_id = public.jwt_tenant_id()
  );

CREATE POLICY "scheduled_notifications_tenant" ON scheduled_notifications
  FOR ALL USING (
    public.jwt_user_role() = 'superadmin'
    OR tenant_id = public.jwt_tenant_id()
  );
