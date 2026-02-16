export type TenantPlan = 'starter' | 'pro' | 'enterprise'
export type TenantStatus = 'active' | 'suspended' | 'onboarding'
export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
export type NotificationChannel = 'email' | 'sms' | 'whatsapp'

export interface Tenant {
  id: string
  slug: string
  name: string
  custom_domain: string | null
  plan: TenantPlan
  status: TenantStatus
  created_at: string
}

export interface TenantSettings {
  tenant_id: string
  languages: string[]
  default_language: string
  primary_color: string
  secondary_color: string
  logo_url: string | null
  port_address: string | null
  phone: string | null
  whatsapp: string | null
  google_maps_place_id: string | null
}

export interface Boat {
  id: string
  tenant_id: string
  name: string
  slug: string
  description: string | null
  capacity: number
  length_m: number | null
  engine_hp: number | null
  license_required: boolean
  images: string[]
  specs: Record<string, unknown>
  is_active: boolean
  created_at: string
}

export interface BoatExtra {
  id: string
  tenant_id: string
  name: string
  description: string | null
  price: number
  unit: string
  is_active: boolean
}

export interface PricingTier {
  id: string
  tenant_id: string
  boat_id: string
  name: string
  start_date: string
  end_date: string
  price_full_day: number | null
  price_half_day: number | null
  price_hour: number | null
  min_days: number
  currency: string
}

export interface BoatUser {
  id: string
  tenant_id: string
  auth_user_id: string | null
  name: string
  email: string
  phone: string | null
  nationality: string | null
  license_number: string | null
  license_expiry: string | null
  notes: string | null
  created_at: string
}

export interface Booking {
  id: string
  tenant_id: string
  boat_id: string
  user_id: string
  start_datetime: string
  end_datetime: string
  status: BookingStatus
  total_price: number
  deposit_amount: number
  deposit_paid: boolean
  notes: string | null
  contract_url: string | null
  created_at: string
}

export interface BookingExtra {
  id: string
  booking_id: string
  extra_id: string
  quantity: number
  unit_price: number
}

export interface Review {
  id: string
  tenant_id: string
  boat_id: string | null
  user_id: string | null
  booking_id: string | null
  rating: number
  comment: string | null
  is_published: boolean
  created_at: string
}
