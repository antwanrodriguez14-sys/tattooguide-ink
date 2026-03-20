import { useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import type { Placement } from '../data/placements'
import { styles } from '../data/styles'

interface Props {
  placements: Placement[]
}

// Pain level colors matching heat map style
const PAIN_COLORS = ['', '#2DD4BF', '#2DD4BF', '#FACC15', '#F97316', '#EF4444']
const PAIN_OPACITY = ['', '0.75', '0.75', '0.8', '0.85', '0.9']

export default function PlacementMap({ placements }: Props) {
  const { t } = useLanguage()
  const [selected, setSelected] = useState<Placement | null>(null)

  const painLabel = (level: number) =>
    t({ en: ['', 'Very Low', 'Low', 'Medium', 'High', 'Intense'][level] as string,
        es: ['', 'Muy bajo', 'Bajo', 'Medio', 'Alto', 'Intenso'][level] as string })

  const relatedStyles = selected ? styles.filter(s => selected.recommendedStyles.includes(s.slug)) : []

  // Each zone: SVG path + pain level
  const zones = [
    // SHOULDER LEFT
    { slug: 'shoulder', side: 'L',
      path: 'M 105 118 Q 88 112 78 122 Q 68 132 70 148 Q 72 162 82 168 L 95 160 Q 100 145 105 135 Z',
      cx: 82, cy: 140 },
    // SHOULDER RIGHT
    { slug: 'shoulder', side: 'R',
      path: 'M 175 118 Q 192 112 202 122 Q 212 132 210 148 Q 208 162 198 168 L 185 160 Q 180 145 175 135 Z',
      cx: 198, cy: 140 },
    // CHEST
    { slug: 'chest',
      path: 'M 108 118 L 105 135 Q 108 155 140 160 Q 172 155 175 135 L 172 118 Q 155 112 140 110 Q 125 112 108 118 Z',
      cx: 140, cy: 138 },
    // RIBCAGE / STOMACH
    { slug: 'ribcage',
      path: 'M 105 160 Q 108 180 110 200 Q 115 220 140 225 Q 165 220 170 200 Q 172 180 175 160 Q 155 168 140 170 Q 125 168 105 160 Z',
      cx: 140, cy: 193 },
    // LEFT UPPER ARM
    { slug: 'forearm', side: 'upper-L',
      path: 'M 82 168 L 68 175 Q 58 190 60 210 L 75 215 Q 82 200 88 185 Z',
      cx: 67, cy: 195 },
    // LEFT FOREARM
    { slug: 'forearm', side: 'L',
      path: 'M 60 210 L 48 240 Q 44 258 50 268 L 65 265 Q 68 248 72 230 L 75 215 Z',
      cx: 54, cy: 240 },
    // RIGHT UPPER ARM
    { slug: 'forearm', side: 'upper-R',
      path: 'M 198 168 L 212 175 Q 222 190 220 210 L 205 215 Q 198 200 192 185 Z',
      cx: 213, cy: 195 },
    // RIGHT FOREARM
    { slug: 'forearm', side: 'R',
      path: 'M 220 210 L 232 240 Q 236 258 230 268 L 215 265 Q 212 248 208 230 L 205 215 Z',
      cx: 226, cy: 240 },
    // INNER ARM LEFT
    { slug: 'inner-arm', side: 'L',
      path: 'M 88 168 L 82 168 L 68 175 Q 75 185 82 192 Q 90 185 95 175 Z',
      cx: 80, cy: 178 },
    // HIPS
    { slug: 'thigh', side: 'hip',
      path: 'M 110 225 Q 108 240 108 255 L 135 258 L 145 258 L 172 255 Q 172 240 170 225 Q 155 232 140 234 Q 125 232 110 225 Z',
      cx: 140, cy: 242 },
    // LEFT THIGH
    { slug: 'thigh', side: 'L',
      path: 'M 108 258 L 105 310 Q 104 335 108 348 L 128 348 Q 132 332 132 305 L 135 258 Z',
      cx: 113, cy: 305 },
    // RIGHT THIGH
    { slug: 'thigh', side: 'R',
      path: 'M 172 258 L 175 310 Q 176 335 172 348 L 152 348 Q 148 332 148 305 L 145 258 Z',
      cx: 167, cy: 305 },
    // LEFT KNEE / SHIN
    { slug: 'ankle', side: 'shin-L',
      path: 'M 108 348 Q 106 375 108 395 L 128 395 Q 130 372 128 348 Z',
      cx: 113, cy: 372 },
    // RIGHT KNEE / SHIN
    { slug: 'ankle', side: 'shin-R',
      path: 'M 172 348 Q 174 375 172 395 L 152 395 Q 150 372 152 348 Z',
      cx: 167, cy: 372 },
    // LEFT ANKLE
    { slug: 'ankle', side: 'L',
      path: 'M 108 395 L 104 428 Q 104 440 112 444 L 128 444 Q 134 440 132 428 L 128 395 Z',
      cx: 113, cy: 420 },
    // RIGHT ANKLE
    { slug: 'ankle', side: 'R',
      path: 'M 172 395 L 176 428 Q 176 440 168 444 L 152 444 Q 146 440 148 428 L 152 395 Z',
      cx: 167, cy: 420 },
  ]

  const getPlacement = (slug: string) => placements.find(p => p.slug === slug)

  return (
    <div className="grid md:grid-cols-2 gap-10 items-start">
      {/* Heat Map SVG */}
      <div className="flex flex-col items-center">
        <svg viewBox="0 0 280 480" className="w-full max-w-[200px] mx-auto">

          {/* BASE SILHOUETTE */}
          <g opacity="0.15" fill="#F5F0E8">
            {/* Head */}
            <ellipse cx="140" cy="52" rx="26" ry="32" />
            {/* Neck */}
            <rect x="130" y="80" width="20" height="16" rx="4" />
            {/* Torso */}
            <path d="M 92 96 Q 75 102 72 125 L 68 270 Q 80 278 140 280 Q 200 278 212 270 L 208 125 Q 205 102 188 96 Z" />
            {/* Left arm */}
            <path d="M 92 96 Q 72 100 62 120 L 44 265 Q 50 272 62 272 L 76 215 L 85 160 Z" />
            {/* Right arm */}
            <path d="M 188 96 Q 208 100 218 120 L 236 265 Q 230 272 218 272 L 204 215 L 195 160 Z" />
            {/* Pelvis / legs base */}
            <path d="M 106 270 L 104 360 L 108 448 Q 118 454 130 454 L 132 360 L 135 280 Z" />
            <path d="M 174 270 L 176 360 L 172 448 Q 162 454 150 454 L 148 360 L 145 280 Z" />
            {/* Feet */}
            <ellipse cx="119" cy="458" rx="16" ry="8" />
            <ellipse cx="161" cy="458" rx="16" ry="8" />
          </g>

          {/* HEAT ZONES */}
          {zones.map((zone, i) => {
            const placement = getPlacement(zone.slug)
            if (!placement) return null
            const isSelected = selected?.slug === zone.slug
            const color = PAIN_COLORS[placement.painLevel]
            const opacity = parseFloat(PAIN_OPACITY[placement.painLevel])
            return (
              <path
                key={`${zone.slug}-${zone.side ?? i}`}
                d={zone.path}
                fill={color}
                opacity={isSelected ? 1 : opacity}
                stroke={isSelected ? '#fff' : 'none'}
                strokeWidth={isSelected ? 1 : 0}
                style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}
                onClick={() => setSelected(placement === selected ? null : placement)}
              />
            )
          })}

          {/* SPINE zone (center vertical line) */}
          {(() => {
            const sp = getPlacement('spine')
            if (!sp) return null
            const isSelected = selected?.slug === 'spine'
            return (
              <rect
                x="134" y="96" width="12" height="174"
                fill={PAIN_COLORS[sp.painLevel]}
                opacity={isSelected ? 1 : 0.8}
                stroke={isSelected ? '#fff' : 'none'}
                strokeWidth={isSelected ? 1 : 0}
                style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}
                onClick={() => setSelected(sp === selected ? null : sp)}
              />
            )
          })()}

          {/* Zone labels (pain number) */}
          {placements.map(p => {
            const zone = zones.find(z => z.slug === p.slug && !z.side?.includes('upper') && !z.side?.includes('hip') && !z.side?.includes('shin') && z.side !== 'R')
            if (!zone) return null
            const isSelected = selected?.slug === p.slug
            return (
              <g key={p.slug} onClick={() => setSelected(p === selected ? null : p)} style={{ cursor: 'pointer' }}>
                <circle cx={zone.cx} cy={zone.cy} r="9"
                  fill={isSelected ? '#fff' : 'rgba(0,0,0,0.5)'}
                  stroke={isSelected ? PAIN_COLORS[p.painLevel] : '#fff'}
                  strokeWidth="1.5" />
                <text x={zone.cx} y={zone.cy + 4} textAnchor="middle"
                  fill={isSelected ? PAIN_COLORS[p.painLevel] : '#fff'}
                  fontSize="8" fontWeight="700" fontFamily="sans-serif">
                  {p.painLevel}
                </text>
              </g>
            )
          })}

          {/* Spine label */}
          {(() => {
            const sp = getPlacement('spine')
            if (!sp) return null
            const isSelected = selected?.slug === 'spine'
            return (
              <g onClick={() => setSelected(sp === selected ? null : sp)} style={{ cursor: 'pointer' }}>
                <circle cx="140" cy="155" r="9"
                  fill={isSelected ? '#fff' : 'rgba(0,0,0,0.5)'}
                  stroke={isSelected ? PAIN_COLORS[sp.painLevel] : '#fff'}
                  strokeWidth="1.5" />
                <text x="140" y="159" textAnchor="middle"
                  fill={isSelected ? PAIN_COLORS[sp.painLevel] : '#fff'}
                  fontSize="8" fontWeight="700" fontFamily="sans-serif">
                  {sp.painLevel}
                </text>
              </g>
            )
          })()}
        </svg>

        {/* Legend */}
        <div className="mt-4 flex items-center gap-1 rounded-full overflow-hidden border border-ink-border">
          {[
            { label: t({ en: 'Low', es: 'Bajo' }), color: '#2DD4BF' },
            { label: t({ en: 'Med', es: 'Med' }), color: '#FACC15' },
            { label: t({ en: 'High', es: 'Alto' }), color: '#F97316' },
            { label: t({ en: 'Intense', es: 'Intenso' }), color: '#EF4444' },
          ].map(({ label, color }) => (
            <div key={label} className="flex items-center gap-1.5 px-3 py-1.5">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
              <span className="text-xs text-ink-gray">{label}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-ink-gray mt-2 text-center">
          {t({ en: 'Tap any zone to explore', es: 'Toca una zona para explorar' })}
        </p>
      </div>

      {/* Info Panel */}
      <div>
        {selected ? (
          <div className="bg-ink-card border border-ink-border rounded-xl p-6 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-ink-gray uppercase tracking-widest mb-1">
                  {t({ en: 'Selected zone', es: 'Zona seleccionada' })}
                </p>
                <h3 className="font-heading text-3xl text-ink-white">{t(selected.name)}</h3>
              </div>
              <button onClick={() => setSelected(null)} className="text-ink-gray hover:text-ink-white text-2xl leading-none mt-1">×</button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-ink-black rounded-lg p-3 text-center">
                <p className="text-xs text-ink-gray mb-1">{t({ en: 'Pain', es: 'Dolor' })}</p>
                <p className="font-heading text-xl" style={{ color: PAIN_COLORS[selected.painLevel] }}>
                  {selected.painLevel}/5
                </p>
                <p className="text-xs text-ink-gray mt-0.5">{painLabel(selected.painLevel)}</p>
              </div>
              <div className="bg-ink-black rounded-lg p-3 text-center">
                <p className="text-xs text-ink-gray mb-1">{t({ en: 'Healing', es: 'Cicatr.' })}</p>
                <p className="font-heading text-lg text-ink-white capitalize">{selected.healingComplexity}</p>
              </div>
              <div className="bg-ink-black rounded-lg p-3 text-center">
                <p className="text-xs text-ink-gray mb-1">{t({ en: '1st timer', es: 'Primerizo' })}</p>
                <p className={`font-heading text-lg ${selected.firstTimerFriendly ? 'text-green-400' : 'text-red-400'}`}>
                  {selected.firstTimerFriendly ? '✓ Yes' : '✗ No'}
                </p>
              </div>
            </div>

            <p className="text-sm text-ink-gray leading-relaxed">{t(selected.notes)}</p>

            <div>
              <p className="text-xs text-ink-gray uppercase tracking-wider mb-2">
                {t({ en: 'Recommended styles', es: 'Estilos recomendados' })}
              </p>
              <div className="flex flex-wrap gap-2">
                {relatedStyles.map(s => (
                  <a key={s.slug} href={`/styles/${s.slug}`}
                    className="text-xs bg-ink-muted text-ink-white px-3 py-1.5 rounded-full hover:bg-ink-red transition-colors">
                    {t(s.name)}
                  </a>
                ))}
              </div>
            </div>

            <a href="https://instagram.com/ar.inks" target="_blank" rel="noopener noreferrer"
              className="block w-full text-center bg-ink-red text-white text-sm font-medium py-2.5 rounded-lg hover:bg-ink-red-dark transition-colors">
              {t({ en: 'Book this placement → DM @ar.inks', es: 'Reservar esta zona → DM @ar.inks' })}
            </a>
          </div>
        ) : (
          <div className="bg-ink-card border border-ink-border rounded-xl p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-ink-muted flex items-center justify-center mx-auto mb-4">
              <span className="text-ink-red text-xl">↑</span>
            </div>
            <p className="font-heading text-xl text-ink-white mb-2">
              {t({ en: 'Select a zone', es: 'Selecciona una zona' })}
            </p>
            <p className="text-sm text-ink-gray leading-relaxed mb-6">
              {t({ en: 'Tap any colored zone on the body to see pain level, healing time, and recommended styles.', es: 'Toca cualquier zona de color en el cuerpo para ver dolor, cicatrización y estilos recomendados.' })}
            </p>
            <div className="grid grid-cols-2 gap-2 text-left">
              {placements.map(p => (
                <button key={p.slug} onClick={() => setSelected(p)}
                  className="flex items-center gap-2 text-xs text-ink-gray hover:text-ink-white transition-colors py-1">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: PAIN_COLORS[p.painLevel] }} />
                  {t(p.name)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
