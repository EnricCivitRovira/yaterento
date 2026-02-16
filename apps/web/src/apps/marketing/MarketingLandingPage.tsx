export default function MarketingLandingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,700;1,9..144,300;1,9..144,400;1,9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .yr-root { font-family: 'Plus Jakarta Sans', sans-serif; }
        .yr-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }

        @keyframes yr-float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-28px) scale(1.04); }
        }
        @keyframes yr-float2 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-18px) rotate(4deg); }
          66% { transform: translateY(10px) rotate(-3deg); }
        }
        @keyframes yr-float3 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(22px) scale(0.97); }
        }
        @keyframes yr-fade-up {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes yr-border-spin {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes yr-pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.85); }
        }

        .yr-orb-1 { animation: yr-float  9s ease-in-out infinite; }
        .yr-orb-2 { animation: yr-float2 13s ease-in-out infinite; }
        .yr-orb-3 { animation: yr-float3 11s ease-in-out infinite; }

        .yr-fu-1 { animation: yr-fade-up .65s ease-out .05s both; }
        .yr-fu-2 { animation: yr-fade-up .65s ease-out .18s both; }
        .yr-fu-3 { animation: yr-fade-up .65s ease-out .30s both; }
        .yr-fu-4 { animation: yr-fade-up .65s ease-out .42s both; }
        .yr-fu-5 { animation: yr-fade-up .65s ease-out .54s both; }

        .yr-pulse-dot { animation: yr-pulse-dot 2s ease-in-out infinite; }

        .yr-gradient-text {
          background: linear-gradient(120deg, #60a5fa 0%, #06b6d4 45%, #a78bfa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .yr-grid-bg {
          background-image:
            linear-gradient(rgba(37,99,235,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.035) 1px, transparent 1px);
          background-size: 52px 52px;
        }

        .yr-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 0 32px rgba(37,99,235,0.12);
          border-color: rgba(37,99,235,0.25) !important;
        }
        .yr-card { transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; }

        .yr-pain-card:hover {
          transform: translateY(-2px);
          border-color: rgba(239,68,68,0.2) !important;
        }
        .yr-pain-card { transition: transform .25s ease, border-color .25s ease; }

        .yr-cta-btn {
          background: linear-gradient(90deg, #2563eb 0%, #0891b2 50%, #2563eb 100%);
          background-size: 200% 100%;
          transition: background-position .45s ease, box-shadow .25s ease;
        }
        .yr-cta-btn:hover {
          background-position: 100% 0;
          box-shadow: 0 10px 35px rgba(37,99,235,0.45) !important;
        }

        .yr-pro-wrap {
          background: linear-gradient(#1e293b, #1e293b) padding-box,
                      linear-gradient(135deg, #2563eb, #06b6d4, #a78bfa, #2563eb) border-box;
          border: 2px solid transparent;
          background-size: 300% 300%;
          animation: yr-border-spin 5s ease infinite;
        }

        .yr-nav-link { transition: color .2s ease; }
        .yr-nav-link:hover { color: #e2e8f0 !important; }

        .yr-footer-link { transition: color .2s ease; }
        .yr-footer-link:hover { color: #94a3b8 !important; }

        .yr-shimmer-avatar {
          background: linear-gradient(135deg, var(--c1), var(--c2));
        }
      `}</style>

      <div className="yr-root" style={{ minHeight: '100vh', background: '#020c1b', color: '#e2e8f0' }}>

        {/* ─── NAV ─── */}
        <header style={{
          position: 'sticky', top: 0, zIndex: 100,
          background: 'rgba(2,12,27,0.75)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderBottom: '1px solid rgba(255,255,255,0.055)',
        }}>
          <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 28px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Logo */}
            <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'linear-gradient(135deg, #1d4ed8, #06b6d4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 17, boxShadow: '0 4px 14px rgba(37,99,235,0.4)',
              }}>⚓</div>
              <span className="yr-display" style={{ fontSize: 18, fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.01em' }}>
                YaTeRento
              </span>
            </a>

            {/* Links */}
            <nav style={{ display: 'flex', gap: 32 }}>
              {[['#funciona', 'Cómo funciona'], ['#features', 'Funcionalidades'], ['#precios', 'Precios']].map(([h, l]) => (
                <a key={h} href={h} className="yr-nav-link" style={{ color: '#64748b', fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>{l}</a>
              ))}
            </nav>

            {/* Right CTAs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <a href="/admin" className="yr-nav-link" style={{ color: '#64748b', fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>
                Acceder →
              </a>
              <a href="#contacto" className="yr-cta-btn" style={{
                color: 'white', padding: '9px 20px', borderRadius: 9,
                fontSize: 14, fontWeight: 600, textDecoration: 'none',
                boxShadow: '0 4px 18px rgba(37,99,235,0.32)',
                display: 'inline-block',
              }}>Demo gratuita</a>
            </div>
          </div>
        </header>

        {/* ─── HERO ─── */}
        <section style={{ position: 'relative', overflow: 'hidden', padding: '130px 28px 150px' }}>
          {/* Grid overlay */}
          <div className="yr-grid-bg" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
          {/* Gradient orbs */}
          <div className="yr-orb-1" style={{ position: 'absolute', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.13) 0%, transparent 65%)', top: -180, left: -120, pointerEvents: 'none' }} />
          <div className="yr-orb-2" style={{ position: 'absolute', width: 550, height: 550, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.09) 0%, transparent 65%)', top: 80, right: -60, pointerEvents: 'none' }} />
          <div className="yr-orb-3" style={{ position: 'absolute', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 65%)', bottom: -80, left: '38%', pointerEvents: 'none' }} />
          {/* Vignette bottom */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(transparent, #020c1b)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center', position: 'relative' }}>

            {/* Badge */}
            <div className="yr-fu-1" style={{ display: 'inline-flex', marginBottom: 28 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                background: 'rgba(37,99,235,0.08)',
                border: '1px solid rgba(37,99,235,0.22)',
                borderRadius: 100, padding: '7px 18px',
              }}>
                <span className="yr-pulse-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: '#06b6d4', display: 'inline-block', flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: '#93c5fd', fontWeight: 500, letterSpacing: '0.01em' }}>
                  SaaS náutico · Reservas, flota y backoffice en un solo lugar
                </span>
              </div>
            </div>

            {/* H1 */}
            <h1 className="yr-display yr-fu-2" style={{ fontSize: 'clamp(40px, 6.5vw, 76px)', fontWeight: 700, lineHeight: 1.1, color: '#f8fafc', marginBottom: 22, letterSpacing: '-0.01em' }}>
              Tu empresa náutica,<br />
              <em className="yr-gradient-text" style={{ fontStyle: 'italic', fontWeight: 300 }}>digitalizada en minutos</em>
            </h1>

            {/* Subtext */}
            <p className="yr-fu-3" style={{ fontSize: 18, color: '#64748b', maxWidth: 520, margin: '0 auto 42px', lineHeight: 1.72, fontWeight: 400 }}>
              Deja de gestionar reservas por WhatsApp y calendarios en papel.
              Una plataforma profesional lista para vender desde el primer día.
            </p>

            {/* CTAs */}
            <div className="yr-fu-4" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 52 }}>
              <a href="#contacto" className="yr-cta-btn" style={{
                color: 'white', padding: '15px 34px', borderRadius: 12,
                fontSize: 16, fontWeight: 700, textDecoration: 'none',
                boxShadow: '0 8px 28px rgba(37,99,235,0.35)',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                letterSpacing: '-0.01em',
              }}>
                Empieza gratis 14 días <span>→</span>
              </a>
              <a href="#funciona" style={{
                color: '#94a3b8', padding: '15px 34px', borderRadius: 12,
                fontSize: 16, fontWeight: 500, textDecoration: 'none',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                transition: 'background .2s ease, border-color .2s ease',
              }}>
                Ver demo
              </a>
            </div>

            {/* Social proof */}
            <div className="yr-fu-5" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
              <div style={{ display: 'flex' }}>
                {[
                  ['M','#1d4ed8','#0891b2'],
                  ['A','#0d9488','#06b6d4'],
                  ['C','#4f46e5','#7c3aed'],
                  ['Y','#b45309','#d97706'],
                  ['I','#1d4ed8','#2563eb'],
                ].map(([l,c1,c2], i) => (
                  <div key={i} style={{
                    width: 34, height: 34, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${c1}, ${c2})`,
                    border: '2.5px solid #020c1b',
                    marginLeft: i === 0 ? 0 : -10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, color: 'white', fontWeight: 700,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                  }}>{l}</div>
                ))}
              </div>
              <p style={{ fontSize: 13, color: '#475569', margin: 0 }}>
                <span style={{ color: '#cbd5e1', fontWeight: 600 }}>+120 empresas náuticas</span> ya confían en YaTeRento
              </p>
            </div>

          </div>
        </section>

        {/* ─── PAIN POINTS ─── */}
        <section style={{ padding: '88px 28px', background: '#07111e' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 58 }}>
              <p style={{ color: '#f87171', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 14 }}>El problema</p>
              <h2 className="yr-display" style={{ fontSize: 'clamp(26px, 3.8vw, 40px)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.02em', marginBottom: 12 }}>
                ¿Te suena familiar?
              </h2>
              <p style={{ color: '#475569', fontSize: 16, maxWidth: 440, margin: '0 auto' }}>
                Estos son los frenos que impiden crecer a las empresas náuticas hoy
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 18 }}>
              {[
                { icon: '📱', title: 'Reservas por WhatsApp', body: 'Mensajes perdidos, fechas confundidas, horas respondiendo lo que un sistema automatizaría en segundos.' },
                { icon: '📅', title: 'Calendario en papel', body: 'Sin disponibilidad en tiempo real. Dobles reservas, cancelaciones de última hora sin gestión.' },
                { icon: '🌐', title: 'Web sin reservas online', body: 'Clientes que llegan a tu web pero no pueden reservar. Pierdes ventas mientras duermes.' },
                { icon: '💸', title: 'Cero visibilidad financiera', body: 'No sabes qué barco rinde más, cuándo sube la demanda ni cuánto has facturado este mes.' },
                { icon: '🔁', title: 'Procesos que no escalan', body: 'Añadir un barco nuevo implica actualizar la web, el calendario, los presupuestos... todo a mano.' },
                { icon: '🏆', title: 'Competencia más digital', body: 'Mientras gestionas llamadas, tus competidores reciben reservas automáticas a cualquier hora.' },
              ].map((p, i) => (
                <div key={i} className="yr-pain-card" style={{
                  background: 'rgba(239,68,68,0.03)',
                  border: '1px solid rgba(239,68,68,0.08)',
                  borderRadius: 18, padding: '26px 24px', cursor: 'default',
                }}>
                  <div style={{ fontSize: 26, marginBottom: 14 }}>{p.icon}</div>
                  <h3 style={{ color: '#fca5a5', fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ color: '#475569', fontSize: 13.5, lineHeight: 1.65, margin: 0 }}>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── BRIDGE ─── */}
        <section style={{ padding: '52px 28px', background: 'linear-gradient(135deg, #1d4ed8 0%, #0891b2 100%)', textAlign: 'center' }}>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <h2 className="yr-display" style={{ fontSize: 'clamp(22px, 3.5vw, 36px)', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', marginBottom: 14 }}>
              YaTeRento lo resuelve todo en una sola plataforma
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 16, lineHeight: 1.65, margin: 0 }}>
              Web profesional con tu marca, reservas automáticas 24/7, gestión de flota y métricas de negocio — operativo desde el primer día.
            </p>
          </div>
        </section>

        {/* ─── FEATURES ─── */}
        <section id="features" style={{ padding: '100px 28px', background: '#020c1b' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 68 }}>
              <p style={{ color: '#06b6d4', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 14 }}>Funcionalidades</p>
              <h2 className="yr-display" style={{ fontSize: 'clamp(26px, 3.8vw, 40px)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.02em', marginBottom: 14 }}>
                Todo lo que necesita tu empresa náutica
              </h2>
              <p style={{ color: '#475569', fontSize: 16, maxWidth: 460, margin: '0 auto' }}>
                Diseñado específicamente para flotas de alquiler, no adaptado de otra industria.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: 22 }}>
              {[
                { icon: '🌐', title: 'Web con tu marca', body: 'Subdominio propio o dominio personalizado. Colores, logo y contenido configurados en minutos, sin tocar código.', hot: false },
                { icon: '📆', title: 'Reservas online 24/7', body: 'Los clientes reservan directamente desde tu web. Confirmación automática, sin intermediarios ni llamadas.', hot: true },
                { icon: '⛵', title: 'Gestión de flota', body: 'Añade barcos con fotos, specs técnicas, precios y calendario. Activa o pausa embarcaciones en un clic.', hot: false },
                { icon: '📊', title: 'Dashboard con KPIs', body: 'Reservas del día, ingresos del mes, ocupación de flota. Toda la información crítica al abrir el backoffice.', hot: false },
                { icon: '📋', title: 'CRM de reservas', body: 'Confirma, cancela, completa reservas. Historial por cliente. Filtros por barco, estado y fechas.', hot: false },
                { icon: '🔑', title: 'Portal del cliente', body: 'Tus clientes gestionan sus reservas, descargan documentos y actualizan su perfil con tu marca.', hot: false },
              ].map((f, i) => (
                <div key={i} className="yr-card" style={{
                  background: f.hot ? 'rgba(37,99,235,0.07)' : 'rgba(255,255,255,0.02)',
                  border: f.hot ? '1px solid rgba(37,99,235,0.22)' : '1px solid rgba(255,255,255,0.055)',
                  borderRadius: 20, padding: '30px 28px', cursor: 'default', position: 'relative', overflow: 'hidden',
                }}>
                  {f.hot && (
                    <div style={{
                      position: 'absolute', top: 18, right: 18,
                      background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
                      color: 'white', fontSize: 10, fontWeight: 700,
                      padding: '3px 10px', borderRadius: 100, letterSpacing: '0.06em'
                    }}>POPULAR</div>
                  )}
                  <div style={{
                    width: 50, height: 50, borderRadius: 14,
                    background: f.hot ? 'rgba(37,99,235,0.14)' : 'rgba(255,255,255,0.05)',
                    border: f.hot ? '1px solid rgba(37,99,235,0.2)' : '1px solid rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22, marginBottom: 20,
                  }}>{f.icon}</div>
                  <h3 className="yr-display" style={{ color: '#e2e8f0', fontSize: 16, fontWeight: 700, marginBottom: 10, letterSpacing: '-0.01em' }}>{f.title}</h3>
                  <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.65, margin: 0 }}>{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section id="funciona" style={{ padding: '100px 28px', background: '#07111e' }}>
          <div style={{ maxWidth: 960, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 68 }}>
              <p style={{ color: '#06b6d4', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 14 }}>Proceso</p>
              <h2 className="yr-display" style={{ fontSize: 'clamp(26px, 3.8vw, 40px)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.02em' }}>
                Operativo en menos de un día
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, position: 'relative' }}>
              {/* Connector */}
              <div style={{ position: 'absolute', top: 27, left: '17%', right: '17%', height: 1, background: 'linear-gradient(90deg, rgba(37,99,235,0.35), rgba(6,182,212,0.35))' }} />

              {[
                { n: '01', title: 'Crea tu cuenta', body: 'Regístrate en 2 minutos. Tu subdominio queda activo al instante. Sin instalaciones ni técnicos.' },
                { n: '02', title: 'Añade tu flota', body: 'Sube fotos, especificaciones y precios. Define disponibilidad y tu catálogo está listo para vender.' },
                { n: '03', title: 'Recibe reservas', body: 'Comparte el enlace. Los clientes reservan solos. Tú gestionas todo desde el backoffice en tiempo real.' },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '0 36px' }}>
                  <div className="yr-display" style={{
                    width: 54, height: 54, borderRadius: 16,
                    background: 'linear-gradient(135deg, #1d4ed8, #0891b2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 17, fontWeight: 800, color: 'white',
                    margin: '0 auto 26px',
                    boxShadow: '0 8px 28px rgba(37,99,235,0.32)',
                    letterSpacing: '0.02em',
                  }}>{s.n}</div>
                  <h3 className="yr-display" style={{ color: '#e2e8f0', fontSize: 18, fontWeight: 700, marginBottom: 12, letterSpacing: '-0.01em' }}>{s.title}</h3>
                  <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.65, margin: 0 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PRICING ─── */}
        <section id="precios" style={{ padding: '100px 28px', background: '#020c1b' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <p style={{ color: '#06b6d4', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 14 }}>Precios</p>
              <h2 className="yr-display" style={{ fontSize: 'clamp(26px, 3.8vw, 40px)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.02em', marginBottom: 12 }}>
                Sin sorpresas. Sin permanencia.
              </h2>
              <p style={{ color: '#475569', fontSize: 15 }}>14 días de prueba gratuita en todos los planes · Cancela cuando quieras</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22, alignItems: 'center' }}>
              {[
                {
                  name: 'Starter', price: 49, sub: 'Para empezar',
                  features: ['Hasta 5 barcos','Web profesional','Reservas online','Dashboard básico','Soporte por email'],
                  hot: false,
                },
                {
                  name: 'Pro', price: 99, sub: 'La más elegida',
                  features: ['Hasta 20 barcos','Todo lo de Starter','Dominio personalizado','Portal del cliente','Exportación de datos','Soporte prioritario'],
                  hot: true,
                },
                {
                  name: 'Enterprise', price: 199, sub: 'Para flotas grandes',
                  features: ['Barcos ilimitados','Todo lo de Pro','Multi-ubicación','API access','Onboarding dedicado','SLA garantizado'],
                  hot: false,
                },
              ].map((plan, i) => (
                <div key={i} className={plan.hot ? 'yr-pro-wrap' : ''} style={{
                  background: plan.hot ? '#1e293b' : 'rgba(255,255,255,0.02)',
                  border: plan.hot ? undefined : '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 22, padding: plan.hot ? '38px 34px' : '32px 28px',
                  transform: plan.hot ? 'scale(1.04)' : 'scale(1)',
                  position: 'relative',
                }}>
                  {plan.hot && (
                    <div style={{
                      position: 'absolute', top: -15, left: '50%', transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
                      color: 'white', fontSize: 10, fontWeight: 700,
                      padding: '4px 18px', borderRadius: 100, whiteSpace: 'nowrap', letterSpacing: '0.07em',
                    }}>⭐ MÁS POPULAR</div>
                  )}
                  <p style={{ color: plan.hot ? '#93c5fd' : '#475569', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>{plan.sub}</p>
                  <h3 className="yr-display" style={{ color: '#f1f5f9', fontSize: 22, fontWeight: 800, marginBottom: 18, letterSpacing: '-0.01em' }}>{plan.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 26 }}>
                    <span className="yr-display" style={{ fontSize: 50, fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.03em', lineHeight: 1 }}>{plan.price}€</span>
                    <span style={{ color: '#475569', fontSize: 14 }}>/mes</span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 11 }}>
                    {plan.features.map((f, fi) => (
                      <li key={fi} style={{ display: 'flex', alignItems: 'center', gap: 11, fontSize: 14, color: '#94a3b8' }}>
                        <span style={{
                          width: 19, height: 19, borderRadius: '50%', flexShrink: 0,
                          background: plan.hot ? 'rgba(37,99,235,0.18)' : 'rgba(255,255,255,0.04)',
                          border: plan.hot ? '1px solid rgba(37,99,235,0.35)' : '1px solid rgba(255,255,255,0.08)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 10, color: plan.hot ? '#60a5fa' : '#64748b',
                        }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#contacto" style={{
                    display: 'block', textAlign: 'center',
                    background: plan.hot ? 'linear-gradient(135deg, #2563eb, #0891b2)' : 'rgba(255,255,255,0.04)',
                    color: plan.hot ? 'white' : '#64748b',
                    border: plan.hot ? 'none' : '1px solid rgba(255,255,255,0.07)',
                    padding: '13px', borderRadius: 11,
                    fontSize: 14, fontWeight: 600, textDecoration: 'none',
                    boxShadow: plan.hot ? '0 8px 28px rgba(37,99,235,0.3)' : 'none',
                    transition: 'opacity .2s ease',
                  }}>Empezar gratis</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA FINAL ─── */}
        <section id="contacto" style={{ padding: '110px 28px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
          {/* Multi-layer background */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0a1628 0%, #0c1f4a 50%, #0a1628 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 60%, rgba(37,99,235,0.22) 0%, transparent 65%)' }} />
          <div className="yr-grid-bg" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.5 }} />

          <div style={{ maxWidth: 560, margin: '0 auto', position: 'relative' }}>
            <div style={{ fontSize: 44, marginBottom: 22, filter: 'drop-shadow(0 4px 16px rgba(37,99,235,0.4))' }}>⚓</div>
            <h2 className="yr-display" style={{ fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em', marginBottom: 16, lineHeight: 1.1 }}>
              ¿Listo para digitalizar tu flota?
            </h2>
            <p style={{ color: '#64748b', fontSize: 17, lineHeight: 1.65, marginBottom: 42 }}>
              Únete a las empresas náuticas que ya automatizan sus reservas. Empieza gratis, sin compromiso.
            </p>
            <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', gap: 10, maxWidth: 440, margin: '0 auto 16px' }}>
              <input
                type="email"
                placeholder="tu@empresa.com"
                style={{
                  flex: 1, padding: '14px 18px', borderRadius: 11,
                  background: 'rgba(255,255,255,0.06)', color: 'white', fontSize: 15,
                  border: '1px solid rgba(255,255,255,0.1)', outline: 'none',
                  backdropFilter: 'blur(10px)',
                }}
              />
              <button type="submit" className="yr-cta-btn" style={{
                color: 'white', padding: '14px 22px', borderRadius: 11,
                border: 'none', fontWeight: 700, fontSize: 15, cursor: 'pointer',
                whiteSpace: 'nowrap', boxShadow: '0 8px 24px rgba(37,99,235,0.35)',
                fontFamily: 'inherit',
              }}>Solicitar demo</button>
            </form>
            <p style={{ color: '#334155', fontSize: 13 }}>Sin tarjeta de crédito · 14 días gratis · Cancela cuando quieras</p>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer style={{ background: '#020c1b', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '36px 28px' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 30, height: 30, borderRadius: 8,
                background: 'linear-gradient(135deg, #1d4ed8, #06b6d4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
              }}>⚓</div>
              <span className="yr-display" style={{ color: '#e2e8f0', fontWeight: 800, fontSize: 15 }}>YaTeRento</span>
              <span style={{ color: '#1e293b', fontSize: 13 }}>© 2025</span>
            </div>
            <nav style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
              {[['#features','Funcionalidades'],['#precios','Precios'],['/admin','Acceder'],['mailto:hola@yaterento.com','Contacto']].map(([h,l]) => (
                <a key={h} href={h} className="yr-footer-link" style={{ color: '#334155', fontSize: 13, textDecoration: 'none', fontWeight: 500 }}>{l}</a>
              ))}
            </nav>
          </div>
          <div style={{ maxWidth: 1180, margin: '20px auto 0', paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            <p style={{ color: '#1e293b', fontSize: 12, textAlign: 'center', margin: 0 }}>
              YaTeRento · Plataforma SaaS para empresas de alquiler náutico en España y Europa
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
