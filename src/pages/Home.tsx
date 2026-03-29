import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../hooks/useLanguage'
import { styles } from '../data/styles'
import StyleCard from '../components/StyleCard'

export default function Home() {
  const { t } = useLanguage()
  const featured = styles.slice(0, 3)

  return (
    <>
      <Helmet>
        <title>TattooGuide.ink — Find Your Tattoo Style</title>
        <meta name="description" content="Discover the perfect tattoo style for you. Explore styles, placement guides, and get a free consultation with @ar.inks." />
        <link rel="canonical" href="https://tattooguide.ink/" />
        <meta property="og:title" content="TattooGuide.ink — Find Your Tattoo Style" />
        <meta property="og:description" content="Discover the perfect tattoo style for you. Explore styles, placement guides, and get a free consultation with @ar.inks." />
        <meta property="og:image" content="https://tattooguide.ink/opengraph.jpg" />
        <meta property="og:url" content="https://tattooguide.ink/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-red/5 to-transparent pointer-events-none" />
        <p className="text-ink-red text-xs font-medium uppercase tracking-widest mb-4">
          {t({ en: 'West Palm Beach · @ar.inks', es: 'West Palm Beach · @ar.inks' })}
        </p>
        <h1 className="font-heading text-5xl md:text-7xl text-ink-white mb-4 max-w-3xl leading-tight text-balance">
          {t({ en: 'Find your tattoo style.', es: 'Encuentra tu estilo de tatuaje.' })}
        </h1>
        <p className="text-ink-gray text-lg md:text-xl max-w-xl mb-10 text-balance">
          {t({ en: 'Explore styles, find your perfect placement, and book a free consultation.', es: 'Explora estilos, encuentra tu colocación perfecta y reserva una consulta gratuita.' })}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/styles" className="bg-ink-red text-white px-6 py-3 rounded font-medium hover:bg-ink-red-dark transition-colors">
            {t({ en: 'Browse Styles →', es: 'Ver Estilos →' })}
          </Link>
          <Link to="/placement" className="border border-ink-border text-ink-white px-6 py-3 rounded font-medium hover:border-ink-muted transition-colors">
            {t({ en: 'Placement Guide', es: 'Guía de Colocación' })}
          </Link>
          <Link to="/quiz" className="border border-ink-border text-ink-white px-6 py-3 rounded font-medium hover:border-ink-muted transition-colors">
            {t({ en: 'Take the Quiz', es: 'Hacer el Quiz' })}
          </Link>
        </div>
      </section>

      {/* Featured styles */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading text-2xl text-ink-white">
            {t({ en: 'Popular Styles', es: 'Estilos Populares' })}
          </h2>
          <Link to="/styles" className="text-sm text-ink-gray hover:text-ink-white transition-colors">
            {t({ en: 'View all →', es: 'Ver todos →' })}
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map(s => <StyleCard key={s.slug} style={s} />)}
        </div>
      </section>

      {/* CTA section */}
      <section className="border-t border-ink-border">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h2 className="font-heading text-3xl text-ink-white mb-3">
            {t({ en: "Not sure what you want?", es: "¿No estás seguro de qué quieres?" })}
          </h2>
          <p className="text-ink-gray mb-6 max-w-lg mx-auto">
            {t({ en: 'Take our 5-question quiz to find the style that matches your personality.', es: 'Haz nuestro quiz de 5 preguntas para encontrar el estilo que combina con tu personalidad.' })}
          </p>
          <Link to="/quiz" className="inline-block bg-ink-red text-white px-6 py-3 rounded font-medium hover:bg-ink-red-dark transition-colors">
            {t({ en: 'What\'s my style? →', es: '¿Cuál es mi estilo? →' })}
          </Link>
        </div>
      </section>
    </>
  )
}
