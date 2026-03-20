import { useLocation, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../hooks/useLanguage'
import { styles } from '../data/styles'
import { useState } from 'react'
import CardGenerator from '../components/CardGenerator'

interface LocationState {
  topStyle: string
  scores: Record<string, number>
}

export default function QuizResult() {
  const { t } = useLanguage()
  const location = useLocation()
  const state = location.state as LocationState | null
  const [showCard, setShowCard] = useState(false)

  if (!state) return <Navigate to="/quiz" replace />

  const style = styles.find(s => s.slug === state.topStyle) || styles[0]
  const topThree = Object.entries(state.scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([slug]) => styles.find(s => s.slug === slug))
    .filter(Boolean) as typeof styles

  return (
    <>
      <Helmet>
        <title>{t({ en: 'Your Tattoo Style Result', es: 'Tu Resultado de Estilo' })} — TattooGuide.ink</title>
      </Helmet>

      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-ink-red text-xs uppercase tracking-widest mb-4">
          {t({ en: 'Your style is', es: 'Tu estilo es' })}
        </p>
        <h1 className="font-heading text-6xl md:text-8xl text-ink-white mb-4">
          {t(style.name)}
        </h1>
        <p className="font-heading text-xl text-ink-gray italic mb-8">
          {t(style.cardTagline)}
        </p>
        <p className="text-ink-gray leading-relaxed mb-10 max-w-md mx-auto">
          {t(style.description)}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {style.tags.map(tag => (
            <span key={tag} className="text-xs border border-ink-red text-ink-red px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14">
          <Link
            to={`/styles/${style.slug}`}
            className="bg-ink-red text-white px-6 py-3 rounded font-medium hover:bg-ink-red-dark transition-colors"
          >
            {t({ en: 'Explore this style →', es: 'Explorar este estilo →' })}
          </Link>
          <button
            onClick={() => setShowCard(true)}
            className="border border-ink-border text-ink-white px-6 py-3 rounded font-medium hover:border-ink-muted transition-colors"
          >
            {t({ en: 'Download my card', es: 'Descargar mi card' })}
          </button>
          <a
            href="https://instagram.com/ar.inks"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-ink-red text-ink-red px-6 py-3 rounded font-medium hover:bg-ink-red hover:text-white transition-colors"
          >
            DM @ar.inks →
          </a>
        </div>

        {/* Runner-up styles */}
        {topThree.length > 1 && (
          <div>
            <p className="text-xs text-ink-gray uppercase tracking-widest mb-4">
              {t({ en: 'You also matched with', es: 'También tienes afinidad con' })}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {topThree.slice(1).map(s => (
                <Link
                  key={s.slug}
                  to={`/styles/${s.slug}`}
                  className="bg-ink-card border border-ink-border rounded-lg p-4 text-left hover:border-ink-muted transition-colors"
                >
                  <p className="font-heading text-ink-white mb-1">{t(s.name)}</p>
                  <p className="text-xs text-ink-gray">{t(s.shortDesc)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10">
          <Link to="/quiz" className="text-sm text-ink-gray hover:text-ink-white transition-colors">
            ↺ {t({ en: 'Retake quiz', es: 'Repetir quiz' })}
          </Link>
        </div>
      </div>

      {showCard && <CardGenerator style={style} onClose={() => setShowCard(false)} />}
    </>
  )
}
