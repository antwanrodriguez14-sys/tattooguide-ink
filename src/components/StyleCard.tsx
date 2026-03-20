import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import type { TattooStyle } from '../data/styles'

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
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-ink-muted">
        <img
          src={style.image}
          alt={t(style.name)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-black/60 to-transparent" />
        <span className="absolute bottom-2 left-3 text-xs text-white/80 border border-white/20 rounded px-1.5 py-0.5 backdrop-blur-sm">
          Pain {style.painLevel}/5
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-heading text-lg text-ink-white group-hover:text-ink-red transition-colors mb-1">
          {t(style.name)}
        </h3>
        <p className="text-sm text-ink-gray leading-relaxed mb-3 line-clamp-2">
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
