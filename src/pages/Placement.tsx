import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../hooks/useLanguage'
import { placements } from '../data/placements'
import PlacementMap from '../components/PlacementMap'

export default function Placement() {
  const { t } = useLanguage()

  return (
    <>
      <Helmet>
        <title>{t({ en: 'Tattoo Placement Guide', es: 'Guía de Colocación de Tatuajes' })} — TattooGuide.ink</title>
        <meta name="description" content={t({ en: 'Find the best spot for your tattoo. Pain levels, healing info, and style recommendations for every body zone.', es: 'Encuentra el mejor lugar para tu tatuaje. Niveles de dolor, información de cicatrización y recomendaciones de estilo para cada zona.' })} />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="font-heading text-4xl text-ink-white mb-2">
            {t({ en: 'Placement Guide', es: 'Guía de Colocación' })}
          </h1>
          <p className="text-ink-gray max-w-xl">
            {t({ en: 'Where you place your tattoo affects pain, visibility, and how well certain styles work. Tap any zone to explore.', es: 'Donde colocas tu tatuaje afecta el dolor, la visibilidad y qué estilos funcionan mejor. Toca cualquier zona para explorar.' })}
          </p>
        </div>

        <PlacementMap placements={placements} />

        {/* Zone grid below map */}
        <div className="mt-16">
          <h2 className="font-heading text-2xl text-ink-white mb-6">
            {t({ en: 'All placement zones', es: 'Todas las zonas de colocación' })}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {placements.map(p => (
              <div key={p.slug} className="bg-ink-card border border-ink-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-medium text-ink-white text-sm">{t(p.name)}</p>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${p.firstTimerFriendly ? 'bg-green-900/40 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                    {p.firstTimerFriendly ? '✓' : '✗'}
                  </span>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className={`block w-2 h-2 rounded-sm ${i < p.painLevel ? 'bg-ink-red' : 'bg-ink-muted'}`} />
                  ))}
                </div>
                <p className="text-xs text-ink-gray capitalize">{t({ en: `Healing: ${p.healingComplexity}`, es: `Cicatrización: ${p.healingComplexity}` })}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
