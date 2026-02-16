# ⚓ YaTeRento.com — SaaS Platform para Alquiler de Embarcaciones
> Versión 0.2 · Febrero 2026

---

## ✅ Decisiones confirmadas

| Pregunta | Respuesta |
|----------|-----------|
| Nombre del SaaS | **YaTeRento.com** (yate + "ya te rento") |
| Duración de alquileres | Configurable por tenant (horas, medio día, día, varios días) |
| Pagos | Configurable por tenant: solo reserva / señal (%) / pago total |
| Dominio por tenant | Dominio propio personalizado |
| Extras/add-ons | Sí, configurables por tenant en backoffice |
| Documentación clientes | Fuera del MVP |
| Reviews | Integración Google Maps reviews en landing |
| Skippers/patrones | Fichas de skipper en backoffice, asignables a reservas (opcional) |

---

## 1. Pain Points del Sector

Las empresas de alquiler de barcos sufren problemas muy concretos y recurrentes:

### Operativos
- **Reservas manuales caóticas** — WhatsApp, teléfono, papel, hojas Excel. Dobles reservas, reservas perdidas.
- **No-shows y cancelaciones sin aviso** — Sin recordatorios automáticos los clientes simplemente no aparecen.
- **Gestión de flota artesanal** — No saben en tiempo real qué barco está libre, en mantenimiento o reservado.
- **Precios estacionales complicados** — Alta temporada, media, baja, fines de semana, puentes... gestionar tarifas es un caos.
- **Comunicación interna** — Los patrones/skipper se enteran de las reservas por teléfono o papel.

### Comerciales
- **Nula presencia online** — Webs de 2010, sin SEO, sin reserva online. Pierden clientes frente a competidores.
- **Barrera del idioma** — En zonas turísticas (Mallorca, Ibiza, Canarias, Costa del Sol) los clientes hablan 10 idiomas.
- **Sin base de datos de clientes** — No pueden hacer re-marketing ni fidelizar.
- **Upselling perdido** — Nunca ofrecen extras: patrón, combustible, snorkel, catering, traslado al puerto.
- **Sin reviews integradas** — Las valoraciones se quedan en Google o Booking, no en su web.

### Legales / Financieros
- **Contratos en papel** — Firma manual, almacenamiento físico, pérdida de documentos.
- **Depósitos de seguridad** — Gestión caótica del fianza: cuándo cobrar, cuándo devolver, cómo gestionar daños.
- **Sin historial de cliente** — No saben si un cliente ya ha alquilado antes, si tiene licencia en regla, si hubo incidencias.

---

## 2. Preguntas que necesito que me respondas

### Reservas y Disponibilidad
1. ¿Los alquileres son por **horas / medio día / día completo / varios días**? ¿O todo?
2. ¿Se puede reservar un barco con patrón incluido (skipper) o solo auto-gobernado?
3. ¿Los barcos se bloquean por **mantenimiento**? ¿Quién lo gestiona, el empresario o un técnico?
4. ¿Habrá **número máximo de personas** por barco que el sistema valide?

### Pagos y Depósitos
5. Cuando implementemos pagos: ¿**Stripe** o alguna pasarela local? ¿Se cobra el 100%, una señal (20-50%), o contra entrega?
6. ¿El depósito/fianza se gestiona por la plataforma o es aparte (efectivo en el puerto)?
7. ¿Habrá política de **cancelación configurable** por barco (% a devolver según días de antelación)?

### Documentación Legal
8. ¿El sistema debe generar **contratos de alquiler** en PDF automáticamente?
9. ¿Los clientes deben subir **documentación** (DNI, licencia náutica, seguro)? ¿O solo declarar que la tienen?
10. ¿Cómo se valida la licencia náutica del cliente? ¿Manual por el empresario, o automatizado?

### Extras y Servicios
11. ¿Quieres un sistema de **extras/add-ons** por reserva? (Patrón, combustible, equipo snorkel, catering, traslado)
12. ¿Cada empresa define sus propios extras o hay un catálogo global?

### Notificaciones
13. ¿Las notificaciones van solo por **email** o también **SMS/WhatsApp**?
14. ¿Cuántos días antes se envían los recordatorios? ¿Configurable por el empresario?

### Tenancy / Branding
15. ¿Cada cliente tiene su **subdominio propio** (`miempresa.boatos.com`) o **dominio personalizado** (`www.miempresa.com`)?
16. ¿El empresario puede personalizar **colores y logo** de su landing o es un tema fijo?
17. ¿Quieres que el **código de barras / QR** de la reserva sirva como "ticket de embarque"?

### Backoffice Super-Admin (tú)
18. ¿Quieres ver las métricas de todos los tenants desde un panel centralizado?
19. ¿Cómo gestionas el billing tuyo hacia los clientes (SaaS fee)? ¿Mensual, anual, por reserva?
20. ¿Quieres limitar funcionalidades por **plan** (Basic, Pro, Enterprise)?

---

## 3. Proceso de Alta de un Nuevo Cliente

### Paso 1 — Super-Admin crea el tenant (2 min)
```
Panel Super-Admin → "Nuevo Cliente"
- Nombre empresa
- Slug/subdominio (ej: "marinablava" → marinablava.boatos.com)
- Email del responsable
- Plan asignado (Free / Pro / Enterprise)
→ Click "Crear y enviar invitación"
```
El sistema:
- Crea el registro en `tenants`
- Genera contraseña temporal
- Envía email de bienvenida con link de activación

### Paso 2 — Onboarding guiado del empresario (15-20 min)
El empresario entra por primera vez y ve un wizard de 5 pasos:

```
1. Datos de empresa     → Nombre, logo, dirección del puerto, teléfono, CIF
2. Idiomas activos      → Seleccionar idiomas de la web (ES, EN, RU, RO, DE...)
3. Configuración web    → Colores, tipografía, secciones de la landing activas
4. Primera embarcación  → Nombre, fotos, características, capacidad, descripción
5. Primera tarifa       → Precio temporada alta, media, baja
```

Al completar el wizard → la landing está **publicada y funcional**.

### Paso 3 — El empresario completa su backoffice a su ritmo
- Añade el resto de la flota
- Sube videos para la landing
- Configura extras y add-ons
- Conecta su dominio personalizado
- Personaliza textos del CMS
- Activa notificaciones

### Paso 4 — Primera reserva
El empresario comparte su URL con clientes. La plataforma hace el resto.

---

## 4. Arquitectura Técnica

### Stack
- **Frontend**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS 4
- **Backend**: Supabase (Auth + PostgreSQL + Storage + Realtime + Edge Functions)
- **Email**: Resend (templates con React Email)
- **SMS/WhatsApp** (opcional): Twilio o MessageBird
- **PDF**: React PDF para contratos
- **Pagos** (fase 2): Stripe Connect (para cobrar a tenants y que ellos cobren a sus clientes)
- **i18n**: i18next + backend en Supabase (traducciones custom por tenant)
- **Deploy**: Vercel (frontend) + Supabase Cloud

### Multi-Tenancy Strategy
Cada tabla tiene `tenant_id` con Row Level Security (RLS) en Supabase.
El tenant se determina por subdominio o dominio personalizado.

```
boatos.com/admin           → Super-admin panel
marinablava.boatos.com     → Tenant "marinablava"
www.marinablava.com        → Custom domain → mismo tenant
```

---

## 5. Base de Datos (esquema inicial)

```sql
-- Core
tenants (id, slug, name, custom_domain, plan, status, settings, created_at)
tenant_settings (tenant_id, languages[], default_language, primary_color, secondary_color, logo_url, ...)

-- Fleet
boats (id, tenant_id, name, slug, description, capacity, length_m, engine_hp, license_required, images[], specs jsonb, is_active)
boat_extras (id, tenant_id, name, description, price, unit, is_active)  -- patrón, combustible, etc.

-- Pricing
pricing_tiers (id, tenant_id, boat_id, name, start_date, end_date, price_full_day, price_half_day, price_hour, min_days, currency)

-- Users (clientes del empresario)
boat_users (id, tenant_id, auth_user_id, name, email, phone, nationality, license_number, license_expiry, notes, created_at)

-- Bookings
bookings (id, tenant_id, boat_id, user_id, start_datetime, end_datetime, status, total_price, deposit_amount, deposit_paid, notes, contract_url, created_at)
booking_extras (id, booking_id, extra_id, quantity, unit_price)
booking_status_log (id, booking_id, from_status, to_status, changed_by, created_at)

-- CMS
cms_sections (id, tenant_id, section_key, is_active, order)
cms_content (id, tenant_id, section_key, language, content jsonb)  -- content flexible por sección

-- Notifications
notification_templates (id, tenant_id, type, language, subject, body_html)  -- override del default
notification_log (id, tenant_id, booking_id, type, channel, recipient, sent_at, status)
scheduled_notifications (id, tenant_id, booking_id, type, scheduled_at, sent_at)

-- Reviews
reviews (id, tenant_id, boat_id, user_id, booking_id, rating, comment, is_published, created_at)

-- SaaS Billing (fase 2)
subscriptions (id, tenant_id, plan, stripe_subscription_id, current_period_end, status)
```

---

## 6. Módulos del Sistema

### 6.1 Landing Page (pública, por tenant)
- **Hero** — Video de fondo, claim principal, CTA reserva
- **Flota** — Grid de barcos con filtros (capacidad, tipo, precio)
- **Ficha de barco** — Galería, specs, disponibilidad, precios por temporada, botón reservar
- **Testimonios** — Reviews de clientes
- **Sección "¿Por qué nosotros?"** — Configurable desde CMS
- **Video showcase** — Sección de vídeo libre
- **Mapa del puerto** — Google Maps / OpenStreetMap embed
- **Contacto** — Formulario + WhatsApp flotante
- **Footer** — Links, redes sociales, idiomas
> Cada sección se activa/desactiva desde el backoffice CMS.

### 6.2 Sistema de Reservas (público)
- Calendario de disponibilidad por barco
- Selector de fechas y duración
- Configurador de extras
- Formulario de datos del cliente (registro o guest)
- Resumen de precio final
- Confirmación (con pago en fase 2)
- Email automático de confirmación con resumen + QR

### 6.3 Área de Clientes (portal público)
- Registro / Login
- Historial de reservas
- Próximas reservas con recordatorio
- Datos personales + licencia náutica
- Descarga de contrato PDF

### 6.4 Backoffice del Empresario
#### Dashboard
- KPIs: reservas hoy, esta semana, ingresos del mes, ocupación de flota
- Próximas salidas (próximas 48h con nombre cliente, barco, hora)
- Alertas: reservas pendientes de confirmar, documentación incompleta

#### Gestión de Flota
- CRUD de barcos
- Subida de imágenes (Supabase Storage)
- Gestión de mantenimientos (bloqueo de fechas)
- Estado en tiempo real (disponible, reservado, mantenimiento, en ruta)

#### Gestión de Tarifas
- Calendarios de precio por barco
- Tarifas por temporada (con rangos de fecha)
- Precios por hora / medio día / día / semana
- Descuentos configurables

#### Calendario de Reservas
- Vista mensual/semanal con drag and drop
- Color por barco
- Click en reserva → detalle completo

#### Gestión de Reservas
- Lista filtrable y buscable
- Cambio de estado (pendiente → confirmada → en curso → completada → cancelada)
- Notas internas
- Generación de contrato PDF
- Asignación de patrón/skipper

#### Gestión de Clientes
- CRM ligero: historial completo por cliente
- Tags / notas internas
- Historial de reservas + incidencias
- Verificación de documentación

#### CMS
- Editor de secciones de la landing (WYSIWYG básico)
- Gestión de traducciones (key → valor por idioma)
- Subida de videos/imágenes hero
- Configuración de testimonios

#### Configuración
- Datos de empresa
- Branding (colores, logo, tipografía)
- Idiomas activos
- Plantillas de email (personalización del template base)
- Configuración de notificaciones (cuándo y a quién)
- Dominio personalizado
- Extras/add-ons

### 6.5 Panel Super-Admin (tú)
- Lista de todos los tenants con estado y métricas
- Crear/editar/suspender tenants
- Uso por tenant (reservas, storage, emails)
- Billing overview (fase 2)
- Plantillas globales de email (base para todos los tenants)
- Feature flags por tenant/plan

---

## 7. Sistema de Notificaciones

### Flujo de emails automáticos

| Evento | Destinatario | Momento |
|--------|-------------|---------|
| Nueva reserva creada | Empresario + Cliente | Inmediato |
| Reserva confirmada | Cliente | Al confirmar |
| Reserva cancelada | Empresario + Cliente | Inmediato |
| Recordatorio de reserva | Cliente | 48h antes |
| Recordatorio de reserva | Empresario | 24h antes |
| Día de la reserva | Cliente | Mañana del día (instrucciones, QR) |
| Post-reserva (review) | Cliente | 24h después de la devolución |
| Documentación incompleta | Cliente | 72h antes si falta algo |

### Contenido del recordatorio al cliente
```
¡Nos vemos mañana!
→ Barco: [Nombre barco]
→ Fecha: [Fecha y hora]
→ Puerto: [Dirección + mapa]
→ Qué traer: [Instrucciones personalizadas del CMS]
→ Tu código de embarque: [QR]
→ Contacto de emergencia: [Teléfono del empresario]
```

### Contenido del recordatorio al empresario
```
Salida mañana:
→ Cliente: [Nombre] · [Teléfono]
→ Barco: [Nombre barco]
→ Hora: [Hora salida]
→ Extras contratados: [Lista]
→ N° personas: [X]
→ Observaciones: [Notas de la reserva]
```

---

## 8. Sistema de Idiomas

- Traducciones base del sistema (hard-coded o en Supabase global)
- Traducciones custom por tenant (pueden sobreescribir cualquier texto)
- Idiomas disponibles inicialmente: ES, EN, FR, DE, IT, RU, RO, NL, PT, PL
- El cliente final ve el idioma de su navegador (o puede cambiarlo con selector)
- El empresario activa/desactiva idiomas desde el backoffice
- Cualquier texto del CMS se puede traducir directamente desde el backoffice

---

## 9. Planes SaaS (estructura propuesta, bypasseado inicialmente)

| Feature | Starter | Pro | Enterprise |
|---------|---------|-----|-----------|
| Barcos | 3 | 10 | Ilimitado |
| Reservas/mes | 50 | Ilimitado | Ilimitado |
| Idiomas | 2 | 5 | Ilimitado |
| Custom domain | No | Sí | Sí |
| Branding propio | Básico | Completo | Completo |
| Notificaciones SMS | No | Sí | Sí |
| Contratos PDF | No | Sí | Sí |
| API access | No | No | Sí |
| Soporte | Email | Prioritario | Dedicado |
| Precio/mes | 49€ | 149€ | 299€+ |

---

## 10. Roadmap de Fases

### Fase 1 — MVP (core funcional)
- [ ] Setup multi-tenant con Supabase RLS
- [ ] Auth (super-admin + tenant-admin + cliente)
- [ ] Gestión de flota (CRUD barcos + imágenes)
- [ ] Sistema de tarifas por temporada
- [ ] Calendario de disponibilidad
- [ ] Flujo de reserva completo (sin pago)
- [ ] Panel de reservas en backoffice
- [ ] Emails automáticos básicos (Resend)
- [ ] Landing page por tenant (secciones fijas)
- [ ] Onboarding wizard del empresario
- [ ] Internacionalización base (ES + EN)
- [ ] Panel super-admin básico

### Fase 2 — Producto completo
- [ ] CMS visual completo
- [ ] Más idiomas (RU, RO, DE, FR...)
- [ ] Gestión de clientes (CRM)
- [ ] Historial y portal del cliente
- [ ] Recordatorios automáticos configurables
- [ ] Generación de contratos PDF
- [ ] Extras/add-ons por reserva
- [ ] Reviews y valoraciones
- [ ] Analytics del backoffice
- [ ] Custom domain por tenant
- [ ] Branding avanzado

### Fase 3 — Monetización y escala
- [ ] Stripe Connect para cobros online
- [ ] Sistema de planes y billing
- [ ] SMS/WhatsApp via Twilio
- [ ] App móvil (React Native)
- [ ] API pública para integraciones
- [ ] Integración con Google Calendar/iCal

---

## 11. Estructura del Proyecto (React + Vite)

```
/src
  /apps
    /landing        → Landing pública por tenant (SSR friendly)
    /booking        → Flujo de reserva público
    /client-portal  → Área clientes
    /backoffice     → Panel empresario
    /superadmin     → Panel super-admin
  /lib
    /supabase       → Client + tipos generados
    /i18n           → Configuración i18next
    /email          → Templates React Email
  /components
    /ui             → Design system base
    /landing        → Componentes de landing
    /booking        → Componentes de reserva
    /backoffice     → Componentes del panel
  /hooks
  /stores           → Zustand
  /utils
```

---

*Documento generado: Febrero 2026 — pendiente de respuestas a las preguntas del apartado 2*
