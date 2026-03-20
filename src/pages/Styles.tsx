import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../hooks/useLanguage'
import { styles, allTags } from '../data/styles'
import StyleCard from '../components/StyleCard'

export default function Styles() {
  const { t } = useLanguage()
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = activeTag ? styles.filter(s => s.tags.includes(activeTag)) : styles

  return (
    <>
      <Helmet>
        <title>Tattoo Styles — TattooGuide.ink</title>
        <meta name="description" content="Explore 8 tattoo styles from blackwork to fine line. Find your perfect aesthetic." />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="font-heading text-4xl text-ink-white mb-2">
          {t({ en: 'Tattoo Styles', es: 'Estilos de Tatuaje' })}
        </h1>
        <p className="text-ink-gray mb-8">
          {t({ en: 'Browse all styles and find the aesthetic that speaks to you.', es: 'Explora todos los estilos y encuentra la estética que te habla.' })}
        </p>

        {/* Tag filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTag(null)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${!activeTag ? 'border-ink-red text-ink-red' : 'border-ink-border text-ink-gray hover:border-ink-muted'}`}
          >
            {t({ en: 'All', es: 'Todos' })}
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${activeTag === tag ? 'border-ink-red text-ink-red' : 'border-ink-border text-ink-gray hover:border-ink-muted'}`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(s => <StyleCard key={s.slug} style={s} />)}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-ink-gray py-12">
            {t({ en: 'No styles found for this filter.', es: 'No se encontraron estilos para este filtro.' })}
          </p>
        )}
      </div>
    </>
  )
}
