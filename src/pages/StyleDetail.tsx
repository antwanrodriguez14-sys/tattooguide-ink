import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../hooks/useLanguage'
import { styles } from '../data/styles'
import { placements } from '../data/placements'
import CardGenerator from '../components/CardGenerator'

const PAIN_DOTS = (level: number) =>
  Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={`inline-block w-2.5 h-2.5 rounded-full mr-1 ${i < level ? 'bg-ink-red' : 'bg-ink-muted'}`} />
  ))

export default function StyleDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { t, lang } = useLanguage()
  const [showCard, setShowCard] = useState(false)

  const style = styles.find(s => s.slug === slug)
  if (!style) return (
    <div className="max-w-6xl mx-auto px-4 py-24 text-center">
      <p className="font-heading text-3xl text-ink-white mb-4">Style not found</p>
      <Link to="/styles" className="text-ink-red hover:underline">← Back to styles</Link>
    </div>
  )

  const relatedPlacements = placements.filter(p => style.bestPlacements.includes(p.slug))
  const relatedStyles = styles.filter(s => s.slug !== slug).slice(0, 3)
  const bestForList = style.bestFor[lang]

  return (
    <>
      <Helmet>
        <title>{t(style.name)} Tattoos — TattooGuide.ink</title>
        <meta name="description" content={t(style.description).slice(0, 155)} />
        <link rel="canonical" href={`https://tattooguide.ink/styles/${style.slug}`} />
        <meta property="og:title" content={`${t(style.name)} Tattoo Style — TattooGuide.ink`} />
        <meta property="og:description" content={`${t(style.cardTagline)} — ${t(style.description).slice(0, 100)}`} />
        <meta property="og:image" content={style.image || 'https://tattooguide.ink/opengraph.jpg'} />
        <meta property="og:url" content={`https://tattooguide.ink/styles/${style.slug}`} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center gap-2 text-xs text-ink-gray mb-8">
          <Link to="/styles" className="hover:text-ink-white transition-colors">
            {t({ en: 'Styles', es: 'Estilos' })}
          </Link>
          <span>/</span>
          <span className="text-ink-white">{t(style.name)}</span>
        </div>

        {/* Hero image — shown when a real photo is available */}
        {style.image && (
          <div className="relative overflow-hidden rounded-xl mb-10 h-64 md:h-96">
            <img
              src={style.image}
              alt={`${t(style.name)} tattoo by @ar.inks`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-bg/80 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-4 text-xs text-white/70">📸 @ar.inks</p>
          </div>
        )}

        <div className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {style.tags.map(tag => (
              <span key={tag} className="text-xs border border-ink-border text-ink-gray px-2.5 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-heading text-5xl md:text-6xl text-ink-white mb-3">{t(style.name)}</h1>
          <p className="text-xl text-ink-gray italic font-heading">{t(style.cardTagline)}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div className="md:col-span-2 space-y-6">
            <section>
              <h2 className="text-xs text-ink-gray uppercase tracking-widest mb-3">
                {t({ en: 'About this style', es: 'Sobre este estilo' })}
              </h2>
              <p className="text-ink-white leading-relaxed">{t(style.description)}</p>
            </section>

            <section>
              <h2 className="text-xs text-ink-gray uppercase tracking-widest mb-3">
                {t({ en: 'Best for', es: 'Ideal para' })}
              </h2>
              <ul className="space-y-1.5">
                {bestForList.map((item: string) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink-white">
                    <span className="text-ink-red mt-0.5">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xs text-ink-gray uppercase tracking-widest mb-3">
                {t({ en: 'Healing tips', es: 'Consejos de cicatrización' })}
              </h2>
              <p className="text-sm text-ink-gray leading-relaxed">{t(style.healing)}</p>
            </section>
          </div>

          <div className="space-y-4">
            <div className="bg-ink-card border border-ink-border rounded-lg p-5">
              <p className="text-xs text-ink-gray uppercase tracking-widest mb-3">
                {t({ en: 'Pain level', es: 'Nivel de dolor' })}
              </p>
              <div className="flex items-center gap-1 mb-1">{PAIN_DOTS(style.painLevel)}</div>
              <p className="text-xs text-ink-gray">{style.painLevel}/5</p>
            </div>

            <div className="bg-ink-card border border-ink-border rounded-lg p-5">
              <p className="text-xs text-ink-gray uppercase tracking-widest mb-3">
                {t({ en: 'Best placements', es: 'Mejores zonas' })}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {relatedPlacements.map(p => (
                  <Link key={p.slug} to="/placement"
                    className="text-xs bg-ink-muted text-ink-white px-2 py-1 rounded hover:bg-ink-red transition-colors">
                    {t(p.name)}
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-ink-red rounded-lg p-5 text-center">
              <p className="text-white font-medium mb-1 text-sm">
                {t({ en: 'Love this style?', es: '¿Te encanta este estilo?' })}
              </p>
              <p className="text-red-200 text-xs mb-4">
                {t({ en: 'Book a free consultation', es: 'Reserva una consulta gratis' })}
              </p>
              <a href="https://instagram.com/ar.inks" target="_blank" rel="noopener noreferrer"
                className="block bg-white text-ink-red text-sm font-semibold py-2 rounded hover:bg-ink-white transition-colors">
                DM @ar.inks →
              </a>
            </div>
          </div>
        </div>

        <div className="border border-ink-border rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          <div>
            <p className="font-heading text-lg text-ink-white mb-1">
              {t({ en: 'Generate a Pinterest card', es: 'Genera una card de Pinterest' })}
            </p>
            <p className="text-sm text-ink-gray">
              {t({ en: 'Download a 1000×1500px pin-ready image for this style.', es: 'Descarga una imagen lista para Pinterest de 1000×1500px.' })}
            </p>
          </div>
          <button onClick={() => setShowCard(true)}
            className="shrink-0 bg-ink-red text-white px-5 py-2.5 rounded font-medium hover:bg-ink-red-dark transition-colors">
            {t({ en: 'Generate card →', es: 'Generar card →' })}
          </button>
        </div>

        <div>
          <h2 className="font-heading text-2xl text-ink-white mb-6">
            {t({ en: 'Explore more styles', es: 'Explora más estilos' })}
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {relatedStyles.map(s => (
              <Link key={s.slug} to={`/styles/${s.slug}`}
                className="bg-ink-card border border-ink-border rounded-lg p-4 hover:border-ink-muted transition-colors group">
                <p className="font-heading text-ink-white group-hover:text-ink-red transition-colors">{t(s.name)}</p>
                <p className="text-xs text-ink-gray mt-1">{t(s.shortDesc)}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {showCard && <CardGenerator style={style} onClose={() => setShowCard(false)} />}
    </>
  )
}
