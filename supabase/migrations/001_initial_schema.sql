-- ============================================================
-- YaTeRento.com — Schema inicial
-- Migration: 001_initial_schema
-- ============================================================

-- gen_random_uuid() está disponible en PostgreSQL 13+ sin extensiones

-- ============================================================
-- TENANTS
-- ============================================================

CREATE TYPE tenant_plan AS ENUM ('starter', 'pro', 'enterprise');
CREATE TYPE tenant_status AS ENUM ('onboarding', 'active', 'suspended');

CREATE TABLE tenants (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          TEXT NOT NULL UNIQUE,
  name          TEXT NOT NULL,
  custom_domain TEXT UNIQUE,
  plan          tenant_plan NOT NULL DEFAULT 'starter',
  status        tenant_status NOT NULL DEFAULT 'onboarding',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE tenant_settings (
  tenant_id             UUID PRIMARY KEY REFERENCES tenants(id) ON DELETE CASCADE,
  languages             TEXT[] NOT NULL DEFAULT ARRAY['es'],
  default_language      TEXT NOT NULL DEFAULT 'es',
  primary_color         TEXT NOT NULL DEFAULT '#0f4c81',
  secondary_color       TEXT NOT NULL DEFAULT '#f59e0b',
  logo_url              TEXT,
  port_address          TEXT,
  phone                 TEXT,
  whatsapp              TEXT,
  google_maps_place_id  TEXT
);

-- ============================================================
-- FLEET
-- ============================================================

CREATE TABLE boats (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id        UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name             TEXT NOT NULL,
  slug             TEXT NOT NULL,
  description      TEXT,
  capacity         INTEGER NOT NULL DEFAULT 1,
  length_m         NUMERIC(5,2),
  engine_hp        INTEGER,
  license_required BOOLEAN NOT NULL DEFAULT FALSE,
  images           TEXT[] NOT NULL DEFAULT '{}',
  specs            JSONB NOT NULL DEFAULT '{}',
  is_active        BOOLEAN NOT NULL DEFAULT TRUE,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(tenant_id, slug)
);

CREATE TABLE boat_extras (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  description TEXT,
  price       NUMERIC(10,2) NOT NULL,
  unit        TEXT NOT NULL DEFAULT 'per_booking', -- per_booking, per_person, per_day
  is_active   BOOLEAN NOT NULL DEFAULT TRUE
);

-- ============================================================
-- PRICING
-- ============================================================

CREATE TABLE pricing_tiers (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id      UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  boat_id        UUID NOT NULL REFERENCES boats(id) ON DELETE CASCADE,
  name           TEXT NOT NULL,
  start_date     DATE NOT NULL,
  end_date       DATE NOT NULL,
  price_full_day NUMERIC(10,2),
  price_half_day NUMERIC(10,2),
  price_hour     NUMERIC(10,2),
  min_days       INTEGER NOT NULL DEFAULT 1,
  currency       TEXT NOT NULL DEFAULT 'EUR'
);

-- ============================================================
-- USERS (clientes del empresario, distintos a auth.users)
-- ============================================================

CREATE TABLE boat_users (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id      UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  auth_user_id   UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name           TEXT NOT NULL,
  email          TEXT NOT NULL,
  phone          TEXT,
  nationality    TEXT,
  license_number TEXT,
  license_expiry DATE,
  notes          TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(tenant_id, email)
);

-- ============================================================
-- BOOKINGS
-- ============================================================

CREATE TYPE booking_status AS ENUM (
  'pending', 'confirmed', 'in_progress', 'completed', 'cancelled'
);

CREATE TABLE bookings (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id      UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  boat_id        UUID NOT NULL REFERENCES boats(id),
  user_id        UUID NOT NULL REFERENCES boat_users(id),
  start_datetime TIMESTAMPTZ NOT NULL,
  end_datetime   TIMESTAMPTZ NOT NULL,
  status         booking_status NOT NULL DEFAULT 'pending',
  total_price    NUMERIC(10,2) NOT NULL,
  deposit_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
  deposit_paid   BOOLEAN NOT NULL DEFAULT FALSE,
  notes          TEXT,
  contract_url   TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE booking_extras (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id  UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  extra_id    UUID NOT NULL REFERENCES boat_extras(id),
  quantity    INTEGER NOT NULL DEFAULT 1,
  unit_price  NUMERIC(10,2) NOT NULL
);

CREATE TABLE booking_status_log (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id  UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  from_status booking_status,
  to_status   booking_status NOT NULL,
  changed_by  UUID REFERENCES auth.users(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- CMS
-- ============================================================

CREATE TABLE cms_sections (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  section_key TEXT NOT NULL,
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  UNIQUE(tenant_id, section_key)
);

CREATE TABLE cms_content (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  section_key TEXT NOT NULL,
  language    TEXT NOT NULL,
  content     JSONB NOT NULL DEFAULT '{}',
  UNIQUE(tenant_id, section_key, language)
);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================

CREATE TABLE notification_log (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  booking_id  UUID REFERENCES bookings(id) ON DELETE SET NULL,
  type        TEXT NOT NULL,
  channel     TEXT NOT NULL DEFAULT 'email',
  recipient   TEXT NOT NULL,
  sent_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status      TEXT NOT NULL DEFAULT 'sent'
);

CREATE TABLE scheduled_notifications (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id    UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  booking_id   UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  type         TEXT NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  sent_at      TIMESTAMPTZ
);

-- ============================================================
-- REVIEWS
-- ============================================================

CREATE TABLE reviews (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id    UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  boat_id      UUID REFERENCES boats(id) ON DELETE SET NULL,
  user_id      UUID REFERENCES boat_users(id) ON DELETE SET NULL,
  booking_id   UUID REFERENCES bookings(id) ON DELETE SET NULL,
  rating       SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment      TEXT,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_boats_tenant ON boats(tenant_id);
CREATE INDEX idx_bookings_tenant ON bookings(tenant_id);
CREATE INDEX idx_bookings_boat ON bookings(boat_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_dates ON bookings(start_datetime, end_datetime);
CREATE INDEX idx_boat_users_tenant ON boat_users(tenant_id);
CREATE INDEX idx_scheduled_notifications_scheduled ON scheduled_notifications(scheduled_at) WHERE sent_at IS NULL;
