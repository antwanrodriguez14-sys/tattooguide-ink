import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import type { TattooStyle } from '../data/styles'

const PAIN_LABELS: Record<number, { en: string; es: string }> = {
  1: { en: 'Very Low', es: 'Muy bajo' },
  2: { en: 'Low', es: 'Bajo' },
  3: { en: 'Medium', es: 'Medio' },
  4: { en: 'High', es: 'Alto' },
  5: { en: 'Intense', es: 'Intenso' },
}

interface Props {
  style: TattooStyle
}

export default function StyleCard({ style }: Props) {
  const { t } = useLanguage()

  return (
    <Link
      to={`/styles/${style.slug}`}
      className="group block bg-ink-card border border-ink-border rounded-lg overflow-hidden hover:border-ink-muted transition-all duration-200 hover:-translate-y-0.5"
    >
      {/* Color bar */}
      <div className="h-1.5 w-full" style={{ backgroundColor: style.color === '#0A0A0A' ? '#C13B2A' : style.color || '#C13B2A' }} />

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-heading text-lg text-ink-white group-hover:text-ink-red transition-colors">
            {t(style.name)}
          </h3>
          <span className="text-xs text-ink-gray border border-ink-border rounded px-1.5 py-0.5 shrink-0 ml-2">
            Pain {style.painLevel}/5
          </span>
        </div>

        <p className="text-sm text-ink-gray leading-relaxed mb-4 line-clamp-2">
          {t(style.shortDesc)}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {style.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs text-ink-gray border border-ink-border rounded-full px-2 py-0.5">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
