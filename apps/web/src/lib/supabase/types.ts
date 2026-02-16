// Regenerar con: npx supabase gen types typescript --project-id cunfdbstrstsplkqpbot > src/lib/supabase/types.ts

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

type TRow<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']

export interface Database {
  public: {
    Tables: {
      tenants: {
        Row: { id: string; slug: string; name: string; custom_domain: string | null; plan: 'starter' | 'pro' | 'enterprise'; status: 'active' | 'suspended' | 'onboarding'; created_at: string }
        Insert: Omit<TRow<'tenants'>, 'id' | 'created_at'>
        Update: Partial<Omit<TRow<'tenants'>, 'id' | 'created_at'>>
      }
      tenant_settings: {
        Row: { tenant_id: string; languages: string[]; default_language: string; primary_color: string; secondary_color: string; logo_url: string | null; port_address: string | null; phone: string | null; whatsapp: string | null; google_maps_place_id: string | null }
        Insert: TRow<'tenant_settings'>
        Update: Partial<TRow<'tenant_settings'>>
      }
      boats: {
        Row: { id: string; tenant_id: string; name: string; slug: string; description: string | null; capacity: number; length_m: number | null; engine_hp: number | null; license_required: boolean; images: string[]; specs: Json; is_active: boolean; created_at: string }
        Insert: Omit<TRow<'boats'>, 'id' | 'created_at'>
        Update: Partial<Omit<TRow<'boats'>, 'id' | 'created_at'>>
      }
      boat_extras: {
        Row: { id: string; tenant_id: string; name: string; description: string | null; price: number; unit: string; is_active: boolean }
        Insert: Omit<TRow<'boat_extras'>, 'id'>
        Update: Partial<Omit<TRow<'boat_extras'>, 'id'>>
      }
      pricing_tiers: {
        Row: { id: string; tenant_id: string; boat_id: string; name: string; start_date: string; end_date: string; price_full_day: number | null; price_half_day: number | null; price_hour: number | null; min_days: number; currency: string }
        Insert: Omit<TRow<'pricing_tiers'>, 'id'>
        Update: Partial<Omit<TRow<'pricing_tiers'>, 'id'>>
      }
      boat_users: {
        Row: { id: string; tenant_id: string; auth_user_id: string | null; name: string; email: string; phone: string | null; nationality: string | null; license_number: string | null; license_expiry: string | null; notes: string | null; created_at: string }
        Insert: Omit<TRow<'boat_users'>, 'id' | 'created_at'>
        Update: Partial<Omit<TRow<'boat_users'>, 'id' | 'created_at'>>
      }
      bookings: {
        Row: { id: string; tenant_id: string; boat_id: string; user_id: string; start_datetime: string; end_datetime: string; status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'; total_price: number; deposit_amount: number; deposit_paid: boolean; notes: string | null; contract_url: string | null; created_at: string }
        Insert: Omit<TRow<'bookings'>, 'id' | 'created_at'>
        Update: Partial<Omit<TRow<'bookings'>, 'id' | 'created_at'>>
      }
      booking_extras: {
        Row: { id: string; booking_id: string; extra_id: string; quantity: number; unit_price: number }
        Insert: Omit<TRow<'booking_extras'>, 'id'>
        Update: Partial<Omit<TRow<'booking_extras'>, 'id'>>
      }
      booking_status_log: {
        Row: { id: string; booking_id: string; from_status: TRow<'bookings'>['status'] | null; to_status: TRow<'bookings'>['status']; changed_by: string | null; created_at: string }
        Insert: Omit<TRow<'booking_status_log'>, 'id' | 'created_at'>
        Update: Partial<Omit<TRow<'booking_status_log'>, 'id' | 'created_at'>>
      }
      cms_sections: {
        Row: { id: string; tenant_id: string; section_key: string; is_active: boolean; sort_order: number }
        Insert: Omit<TRow<'cms_sections'>, 'id'>
        Update: Partial<Omit<TRow<'cms_sections'>, 'id'>>
      }
      cms_content: {
        Row: { id: string; tenant_id: string; section_key: string; language: string; content: Json }
        Insert: Omit<TRow<'cms_content'>, 'id'>
        Update: Partial<Omit<TRow<'cms_content'>, 'id'>>
      }
      notification_log: {
        Row: { id: string; tenant_id: string; booking_id: string | null; type: string; channel: string; recipient: string; sent_at: string; status: string }
        Insert: Omit<TRow<'notification_log'>, 'id' | 'sent_at'>
        Update: Partial<Omit<TRow<'notification_log'>, 'id'>>
      }
      scheduled_notifications: {
        Row: { id: string; tenant_id: string; booking_id: string; type: string; scheduled_at: string; sent_at: string | null }
        Insert: Omit<TRow<'scheduled_notifications'>, 'id'>
        Update: Partial<Omit<TRow<'scheduled_notifications'>, 'id'>>
      }
      reviews: {
        Row: { id: string; tenant_id: string; boat_id: string | null; user_id: string | null; booking_id: string | null; rating: number; comment: string | null; is_published: boolean; created_at: string }
        Insert: Omit<TRow<'reviews'>, 'id' | 'created_at'>
        Update: Partial<Omit<TRow<'reviews'>, 'id' | 'created_at'>>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
