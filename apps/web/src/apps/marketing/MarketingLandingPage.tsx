export default function MarketingLandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚓</span>
            <span className="text-xl font-bold text-slate-900">YaTeRento</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#funciona" className="hover:text-slate-900 transition-colors">Cómo funciona</a>
            <a href="#features" className="hover:text-slate-900 transition-colors">Funcionalidades</a>
            <a href="#precios" className="hover:text-slate-900 transition-colors">Precios</a>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="/admin"
              className="text-sm text-gray-500 hover:text-slate-900 transition-colors"
            >
              Acceder
            </a>
            <a
              href="#contacto"
              className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Solicitar demo
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-cyan-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              Plataforma SaaS para empresas de alquiler náutico
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Tu empresa de alquiler de barcos,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                digitalizada en minutos
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Deja de gestionar reservas por WhatsApp. YaTeRento te da una web profesional,
              reservas online 24/7, calendario de flota y backoffice completo — todo configurado en un día.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contacto"
                className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
              >
                Empieza gratis 14 días →
              </a>
              <a
                href="#funciona"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-xl transition-colors text-lg"
              >
                Ver cómo funciona
              </a>
            </div>
            <p className="mt-4 text-sm text-blue-300">Sin tarjeta de crédito · Sin permanencia</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Pain points */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              ¿Te suena familiar?
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Estos son los problemas que resuelven nuestros clientes en su primera semana con YaTeRento
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                emoji: '📱',
                pain: 'Gestión por WhatsApp y email',
                desc: 'Reservas perdidas, confusiones de fechas y horas interminables respondiendo mensajes que podrías automatizar.',
              },
              {
                emoji: '📅',
                pain: 'Calendario en papel o Excel',
                desc: 'Sin visibilidad de disponibilidad en tiempo real. Dobles reservas, cancelaciones de último minuto sin gestión.',
              },
              {
                emoji: '🌐',
                pain: 'Web desactualizada o sin reservas online',
                desc: 'Clientes que llegan a tu web pero no pueden reservar directamente. Pierdes ventas mientras duermes.',
              },
              {
                emoji: '💸',
                pain: 'Sin control de ingresos',
                desc: 'No sabes qué barco genera más, cuándo es temporada alta ni cuánto has facturado este mes.',
              },
              {
                emoji: '🔁',
                pain: 'Procesos manuales que escalan mal',
                desc: 'Añadir un barco nuevo implica actualizar la web, el calendario, los presupuestos... todo a mano.',
              },
              {
                emoji: '🏆',
                pain: 'Competidores con mejor presencia digital',
                desc: 'Mientras tú gestionas llamadas, tus competidores reciben reservas automáticas a cualquier hora.',
              },
            ].map((item) => (
              <div
                key={item.pain}
                className="bg-red-50 border border-red-100 rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-semibold text-slate-900 mb-2">{item.pain}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution intro */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            YaTeRento resuelve todo esto con una sola plataforma
          </h2>
          <p className="text-blue-100 text-lg">
            Una web profesional con tu marca, reservas online automáticas, gestión de flota y métricas de negocio.
            Todo en tu propio subdominio desde el primer día.
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Todo lo que necesitas, nada que no necesitas
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Funcionalidades diseñadas específicamente para empresas de alquiler náutico
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🌐',
                title: 'Web profesional con tu marca',
                desc: 'Tu subdominio en yaterento.com o tu propio dominio. Personalizada con tus colores, logo y flota.',
              },
              {
                icon: '📆',
                title: 'Reservas online 24/7',
                desc: 'Los clientes reservan directamente desde tu web. Confirmación automática, sin intermediarios.',
              },
              {
                icon: '⛵',
                title: 'Gestión de flota completa',
                desc: 'Añade barcos con fotos, especificaciones, precios y disponibilidad. Activa o desactiva en un clic.',
              },
              {
                icon: '📊',
                title: 'Dashboard con KPIs',
                desc: 'Reservas del día, ingresos del mes, ocupación de flota. Todo en un vistazo desde el backoffice.',
              },
              {
                icon: '📋',
                title: 'Gestión de reservas',
                desc: 'Confirma, cancela, completa. Filtra por barco, estado y fechas. Historial completo de cada cliente.',
              },
              {
                icon: '🔑',
                title: 'Portal del cliente',
                desc: 'Tus clientes pueden ver sus reservas, descargar documentos y gestionar su cuenta.',
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="funciona" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Operativo en un día
            </h2>
            <p className="text-gray-500 text-lg">Sin técnicos, sin instalaciones, sin complicaciones</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                step: '01',
                title: 'Crea tu cuenta',
                desc: 'Regístrate, pon el nombre de tu empresa y tu subdominio queda activo al instante. marina-blava.yaterento.com listo en segundos.',
              },
              {
                step: '02',
                title: 'Añade tu flota',
                desc: 'Sube fotos, descripción, capacidad y precio de cada barco. Define tu calendario de disponibilidad y ya estás.',
              },
              {
                step: '03',
                title: 'Empieza a recibir reservas',
                desc: 'Comparte el enlace a tu web. Los clientes reservan, tú recibes la notificación y gestionas todo desde el backoffice.',
              },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white text-2xl font-bold rounded-2xl flex items-center justify-center mx-auto mb-5">
                  {s.step}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{s.title}</h3>
                <p className="text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="precios" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Precios claros, sin sorpresas</h2>
            <p className="text-gray-500 text-lg">14 días de prueba gratis en todos los planes</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Starter',
                price: '49',
                desc: 'Para empresas que empiezan',
                features: ['Hasta 5 barcos', 'Web profesional', 'Reservas online', 'Dashboard básico', 'Soporte por email'],
                highlight: false,
              },
              {
                name: 'Pro',
                price: '99',
                desc: 'La opción más popular',
                features: ['Hasta 20 barcos', 'Todo lo de Starter', 'Dominio personalizado', 'Portal del cliente', 'Exportación de datos', 'Soporte prioritario'],
                highlight: true,
              },
              {
                name: 'Enterprise',
                price: '199',
                desc: 'Para flotas grandes',
                features: ['Barcos ilimitados', 'Todo lo de Pro', 'Multi-ubicación', 'API access', 'Onboarding dedicado', 'SLA garantizado'],
                highlight: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 ${
                  plan.highlight
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 scale-105'
                    : 'bg-white border border-gray-100 shadow-sm'
                }`}
              >
                {plan.highlight && (
                  <div className="text-xs font-semibold text-blue-200 uppercase tracking-widest mb-3">
                    Más popular
                  </div>
                )}
                <h3 className={`text-xl font-bold mb-1 ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${plan.highlight ? 'text-blue-200' : 'text-gray-400'}`}>{plan.desc}</p>
                <div className={`text-4xl font-bold mb-6 ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>
                  {plan.price}€
                  <span className={`text-base font-normal ${plan.highlight ? 'text-blue-200' : 'text-gray-400'}`}>/mes</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2 text-sm ${plan.highlight ? 'text-blue-100' : 'text-gray-600'}`}>
                      <span className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-xs ${plan.highlight ? 'bg-blue-500 text-white' : 'bg-green-100 text-green-600'}`}>
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contacto"
                  className={`block text-center py-3 rounded-xl font-semibold transition-colors ${
                    plan.highlight
                      ? 'bg-white text-blue-600 hover:bg-blue-50'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Empezar gratis
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section id="contacto" className="py-24 bg-slate-900 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-5xl mb-6">⚓</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para modernizar tu empresa náutica?
          </h2>
          <p className="text-slate-300 text-lg mb-10">
            Únete a las empresas que ya gestionan su flota con YaTeRento.
            Empieza gratis, sin compromiso.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors whitespace-nowrap"
            >
              Solicitar demo
            </button>
          </form>
          <p className="mt-4 text-sm text-slate-400">14 días gratis · Sin tarjeta de crédito</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚓</span>
              <span className="text-white font-semibold">YaTeRento</span>
              <span className="text-slate-600 text-sm ml-2">© 2025</span>
            </div>
            <nav className="flex gap-6 text-sm">
              <a href="#features" className="hover:text-white transition-colors">Funcionalidades</a>
              <a href="#precios" className="hover:text-white transition-colors">Precios</a>
              <a href="/admin" className="hover:text-white transition-colors">Acceder</a>
              <a href="mailto:hola@yaterento.com" className="hover:text-white transition-colors">Contacto</a>
            </nav>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-xs text-center text-slate-600">
            YaTeRento es una plataforma SaaS para empresas de alquiler náutico en España y Europa.
          </div>
        </div>
      </footer>
    </div>
  )
}
