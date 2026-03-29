import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import type { TattooStyle } from '../data/styles'

interface Props {
  style: TattooStyle
}

// Fallback gradient per style if image fails
const STYLE_GRADIENTS: Record<string, string> = {
  blackwork:       'from-gray-900 to-gray-800',
  'fine-line':     'from-zinc-800 to-zinc-700',
  'neo-traditional': 'from-amber-900 to-red-900',
  japanese:        'from-indigo-900 to-purple-900',
  realism:         'from-slate-900 to-slate-700',
  geometric:       'from-blue-900 to-slate-800',
  watercolor:      'from-pink-900 to-purple-800',
  dotwork:         'from-stone-800 to-stone-700',
  minimalist:      'from-neutral-800 to-neutral-700',
}

export default function StyleCard({ style }: Props) {
  const { t } = useLanguage()
  const gradient = STYLE_GRADIENTS[style.slug] ?? 'from-gray-800 to-gray-700'

  return (
    <Link
      to={`/styles/${style.slug}`}
      className="group block bg-ink-card border border-ink-border rounded-lg overflow-hidden hover:border-ink-muted transition-all duration-200 hover:-translate-y-0.5"
    >
      {/* Image with gradient fallback */}
      <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${gradient}`}>
        {style.image && (
          <img
            src={style.image}
            alt={t(style.name)}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-black/70 to-transparent" />
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
