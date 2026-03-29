import { useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import type { Placement } from '../data/placements'
import { styles } from '../data/styles'

interface Props {
  placements: Placement[]
}

const PAIN_COLORS: Record<number, string> = {
  1: '#2DD4BF', 2: '#2DD4BF', 3: '#FACC15', 4: '#F97316', 5: '#EF4444',
}
const PAIN_GLOW: Record<number, string> = {
  1: 'rgba(45,212,191,0.55)', 2: 'rgba(45,212,191,0.55)',
  3: 'rgba(250,204,21,0.6)', 4: 'rgba(249,115,22,0.65)', 5: 'rgba(239,68,68,0.7)',
}
const PAIN_PULSE_SPEED: Record<number, string> = {
  1: '3.5s', 2: '3.5s', 3: '2.8s', 4: '2.2s', 5: '1.6s',
}

// Zone definitions with SVG paths and which placement slug they map to
const ZONES = [
  { slug: 'shoulder', id: 'shoulder-L', path: 'M 108 122 Q 92 114 80 124 Q 67 135 69 153 Q 71 168 82 174 L 97 164 Q 103 148 108 136 Z' },
  { slug: 'shoulder', id: 'shoulder-R', path: 'M 172 122 Q 188 114 200 124 Q 213 135 211 153 Q 209 168 198 174 L 183 164 Q 177 148 172 136 Z' },
  { slug: 'chest',    id: 'chest',      path: 'M 110 122 L 108 138 Q 111 158 140 163 Q 169 158 172 138 L 170 122 Q 154 115 140 113 Q 126 115 110 122 Z' },
  { slug: 'ribcage',  id: 'ribcage',    path: 'M 108 163 Q 110 183 112 204 Q 117 224 140 229 Q 163 224 168 204 Q 170 183 172 163 Q 156 171 140 173 Q 124 171 108 163 Z' },
  { slug: 'forearm',  id: 'upperarm-L', path: 'M 82 174 L 66 180 Q 55 196 58 218 L 74 222 Q 81 206 87 190 Z' },
  { slug: 'forearm',  id: 'forearm-L',  path: 'M 58 218 L 45 250 Q 41 268 47 278 L 63 274 Q 66 255 70 236 L 74 222 Z' },
  { slug: 'forearm',  id: 'upperarm-R', path: 'M 198 174 L 214 180 Q 225 196 222 218 L 206 222 Q 199 206 193 190 Z' },
  { slug: 'forearm',  id: 'forearm-R',  path: 'M 222 218 L 235 250 Q 239 268 233 278 L 217 274 Q 214 255 210 236 L 206 222 Z' },
  { slug: 'inner-arm',id: 'innerarm-L', path: 'M 87 174 L 82 174 L 66 180 Q 74 191 81 198 Q 90 191 96 180 Z' },
  { slug: 'thigh',    id: 'hips',       path: 'M 112 229 Q 110 245 110 260 L 137 263 L 143 263 L 170 260 Q 170 245 168 229 Q 154 236 140 238 Q 126 236 112 229 Z' },
  { slug: 'thigh',    id: 'thigh-L',    path: 'M 110 262 L 107 316 Q 106 340 110 354 L 131 354 Q 134 337 134 310 L 137 263 Z' },
  { slug: 'thigh',    id: 'thigh-R',    path: 'M 170 262 L 173 316 Q 174 340 170 354 L 149 354 Q 146 337 146 310 L 143 263 Z' },
  { slug: 'ankle',    id: 'shin-L',     path: 'M 110 354 Q 108 382 110 402 L 131 402 Q 132 380 131 354 Z' },
  { slug: 'ankle',    id: 'shin-R',     path: 'M 170 354 Q 172 382 170 402 L 149 402 Q 148 380 149 354 Z' },
  { slug: 'ankle',    id: 'ankle-L',    path: 'M 110 402 L 106 436 Q 106 448 115 452 L 131 452 Q 137 448 135 436 L 131 402 Z' },
  { slug: 'ankle',    id: 'ankle-R',    path: 'M 170 402 L 174 436 Q 174 448 165 452 L 149 452 Q 143 448 145 436 L 149 402 Z' },
  { slug: 'spine',    id: 'spine',      path: 'M 135 100 L 145 100 L 147 274 L 133 274 Z' },
]

// Label anchor per zone (shown on hover / idle dot)
const ZONE_LABELS: Record<string, { cx: number; cy: number }> = {
  'shoulder-L': { cx: 78,  cy: 148 },
  'chest':      { cx: 140, cy: 143 },
  'ribcage':    { cx: 140, cy: 196 },
  'forearm-L':  { cx: 52,  cy: 248 },
  'innerarm-L': { cx: 76,  cy: 183 },
  'hips':       { cx: 140, cy: 247 },
  'thigh-L':    { cx: 115, cy: 308 },
  'ankle-L':    { cx: 116, cy: 426 },
  'spine':      { cx: 140, cy: 185 },
}

export default function PlacementMap({ placements }: Props) {
  const { t } = useLanguage()
  const [selected, setSelected] = useState<Placement | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)

  const getPlacement = (slug: string) => placements.find(p => p.slug === slug)

  const painLabel = (level: number) =>
    t({ en: ['', 'Very Low', 'Low', 'Medium', 'High', 'Intense'][level] as string,
        es: ['', 'Muy bajo', 'Bajo', 'Medio', 'Alto', 'Intenso'][level] as string })

  const relatedStyles = selected ? styles.filter(s => selected.recommendedStyles.includes(s.slug)) : []

  // Unique placements for dot labels (one per slug, pick first zone that has a label entry)
  const dotZones = ZONES.filter(z => ZONE_LABELS[z.id])

  return (
    <div className="grid md:grid-cols-2 gap-10 items-start">
      <style>{`
        @keyframes zone-pulse {
          0%, 100% { opacity: 0.72; }
          50%       { opacity: 1; }
        }
        @keyframes zone-pulse-fast {
          0%, 100% { opacity: 0.65; }
          50%       { opacity: 1; }
        }
        @keyframes spin-dash {
          to { stroke-dashoffset: -40; }
        }
        @keyframes body-breathe {
          0%, 100% { transform: scaleY(1);   }
          50%       { transform: scaleY(1.008); }
        }
        @keyframes float-in {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        .zone-path {
          transition: filter 0.18s ease, opacity 0.18s ease;
          cursor: pointer;
        }
        .zone-path:hover {
          filter: brightness(1.45) saturate(1.3);
        }
        .body-group {
          animation: body-breathe 5s ease-in-out infinite;
          transform-origin: center;
        }
        .tooltip-label {
          animation: float-in 0.15s ease forwards;
          pointer-events: none;
        }
      `}</style>

      {/* ─── SVG Body Map ─────────────────────────── */}
      <div className="flex flex-col items-center select-none">
        <svg viewBox="0 0 280 490" className="w-full max-w-[210px] mx-auto overflow-visible">
          <defs>
            {/* Body volume gradient — lit from top-left */}
            <radialGradient id="body-grad" cx="40%" cy="30%" r="65%">
              <stop offset="0%"   stopColor="#3a3a3a" />
              <stop offset="60%"  stopColor="#1e1e1e" />
              <stop offset="100%" stopColor="#0d0d0d" />
            </radialGradient>
            {/* Arm gradient */}
            <radialGradient id="arm-grad" cx="35%" cy="25%" r="70%">
              <stop offset="0%"   stopColor="#333" />
              <stop offset="100%" stopColor="#111" />
            </radialGradient>
            {/* Highlight shine */}
            <linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"  stopColor="#ffffff" stopOpacity="0.07" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            {/* Drop shadow filter for depth */}
            <filter id="body-shadow" x="-15%" y="-5%" width="130%" height="115%">
              <feDropShadow dx="4" dy="6" stdDeviation="8" floodColor="#000" floodOpacity="0.6" />
            </filter>
            {/* Glow filter for selected/hovered zones */}
            <filter id="glow-teal"   x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <filter id="glow-yellow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <filter id="glow-orange" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <filter id="glow-red"    x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="7" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>

          <g className="body-group" filter="url(#body-shadow)">
            {/* ── BASE BODY SILHOUETTE ── */}
            {/* Head */}
            <ellipse cx="140" cy="52" rx="28" ry="34" fill="url(#body-grad)" />
            <ellipse cx="133" cy="44" rx="10" ry="14" fill="url(#shine)" />

            {/* Neck */}
            <path d="M 130 82 Q 128 92 128 98 L 152 98 Q 152 92 150 82 Z" fill="url(#body-grad)" />

            {/* Torso */}
            <path d="M 96 98 Q 76 105 72 130 L 68 275 Q 82 283 140 285 Q 198 283 212 275 L 208 130 Q 204 105 184 98 Z" fill="url(#body-grad)" />
            {/* Torso shine highlight */}
            <path d="M 104 100 Q 90 108 88 130 L 100 280 Q 120 282 140 282 L 140 103 Q 122 98 104 100 Z" fill="url(#shine)" />

            {/* Left arm */}
            <path d="M 96 100 Q 74 104 62 126 L 42 270 Q 48 278 62 278 L 76 222 L 86 168 Z" fill="url(#arm-grad)" />
            <path d="M 96 100 L 86 168 L 80 188 Q 70 175 66 155 L 62 126 Q 74 104 96 100 Z" fill="url(#shine)" />

            {/* Right arm */}
            <path d="M 184 100 Q 206 104 218 126 L 238 270 Q 232 278 218 278 L 204 222 L 194 168 Z" fill="url(#arm-grad)" />

            {/* Legs */}
            <path d="M 108 275 L 104 360 L 106 456 Q 118 463 130 463 L 134 360 L 138 285 Z" fill="url(#body-grad)" />
            <path d="M 172 275 L 176 360 L 174 456 Q 162 463 150 463 L 146 360 L 142 285 Z" fill="url(#body-grad)" />

            {/* Feet */}
            <ellipse cx="118" cy="464" rx="18" ry="9" fill="#181818" />
            <ellipse cx="162" cy="464" rx="18" ry="9" fill="#181818" />

            {/* Muscle definition lines */}
            <path d="M 128 120 Q 130 140 128 160" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.08" fill="none"/>
            <path d="M 152 120 Q 150 140 152 160" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.08" fill="none"/>
            <path d="M 116 165 Q 118 185 120 205" stroke="#ffffff" strokeWidth="0.4" strokeOpacity="0.06" fill="none"/>
          </g>

          {/* ── PAIN HEAT ZONES ── */}
          {ZONES.map(zone => {
            const placement = getPlacement(zone.slug)
            if (!placement) return null
            const isSelected = selected?.slug === zone.slug
            const isHovered  = hovered === zone.slug
            const color = PAIN_COLORS[placement.painLevel]
            const glow  = PAIN_GLOW[placement.painLevel]
            const speed = PAIN_PULSE_SPEED[placement.painLevel]
            const glowFilter = placement.painLevel <= 2 ? 'url(#glow-teal)' :
                               placement.painLevel === 3 ? 'url(#glow-yellow)' :
                               placement.painLevel === 4 ? 'url(#glow-orange)' : 'url(#glow-red)'

            return (
              <path
                key={zone.id}
                d={zone.path}
                fill={color}
                opacity={isSelected || isHovered ? 0.95 : 0.68}
                filter={(isSelected || isHovered) ? glowFilter : undefined}
                className="zone-path"
                style={{
                  animation: `${placement.painLevel >= 4 ? 'zone-pulse-fast' : 'zone-pulse'} ${speed} ease-in-out infinite`,
                  animationDelay: `${Math.random() * 1.5}s`,
                  boxShadow: (isSelected || isHovered) ? `0 0 18px ${glow}` : 'none',
                }}
                onClick={() => setSelected(placement === selected ? null : placement)}
                onMouseEnter={() => setHovered(zone.slug)}
                onMouseLeave={() => setHovered(null)}
              />
            )
          })}

          {/* ── SELECTED ZONE: animated dashed border ── */}
          {selected && ZONES.filter(z => z.slug === selected.slug).map(zone => (
            <path
              key={`sel-${zone.id}`}
              d={zone.path}
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              strokeOpacity="0.9"
              style={{ animation: 'spin-dash 1.2s linear infinite', pointerEvents: 'none' }}
            />
          ))}

          {/* ── ZONE DOT LABELS ── */}
          {dotZones.map(zone => {
            const placement = getPlacement(zone.slug)
            if (!placement) return null
            const label = ZONE_LABELS[zone.id]
            const isSelected = selected?.slug === zone.slug
            const isHovered  = hovered === zone.slug
            const color = PAIN_COLORS[placement.painLevel]

            return (
              <g
                key={`dot-${zone.id}`}
                onClick={() => setSelected(placement === selected ? null : placement)}
                onMouseEnter={() => setHovered(zone.slug)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={label.cx} cy={label.cy} r="10"
                  fill={isSelected ? '#fff' : 'rgba(0,0,0,0.65)'}
                  stroke={isSelected || isHovered ? color : 'rgba(255,255,255,0.4)'}
                  strokeWidth={isSelected || isHovered ? 2 : 1.5}
                />
                <text
                  x={label.cx} y={label.cy + 4}
                  textAnchor="middle"
                  fill={isSelected ? color : '#fff'}
                  fontSize="8.5" fontWeight="700" fontFamily="sans-serif"
                  style={{ pointerEvents: 'none' }}
                >
                  {placement.painLevel}
                </text>

                {/* Hover tooltip */}
                {isHovered && !isSelected && (
                  <g className="tooltip-label">
                    <rect
                      x={label.cx - 26} y={label.cy - 28}
                      width="52" height="16" rx="4"
                      fill="rgba(0,0,0,0.88)" stroke={color} strokeWidth="0.8"
                    />
                    <text
                      x={label.cx} y={label.cy - 17}
                      textAnchor="middle"
                      fill="#fff" fontSize="7" fontFamily="sans-serif"
                      style={{ pointerEvents: 'none' }}
                    >
                      {t(placement.name)}
                    </text>
                  </g>
                )}
              </g>
            )
          })}
        </svg>

        {/* ── LEGEND ── */}
        <div className="mt-5 flex items-center gap-0.5 rounded-full border border-ink-border bg-ink-card px-1 py-1">
          {([
            { label: t({ en: 'Low', es: 'Bajo' }),     color: '#2DD4BF' },
            { label: t({ en: 'Med', es: 'Medio' }),    color: '#FACC15' },
            { label: t({ en: 'High', es: 'Alto' }),    color: '#F97316' },
            { label: t({ en: 'Intense', es: 'Intenso' }), color: '#EF4444' },
          ] as { label: string; color: string }[]).map(({ label, color }) => (
            <div key={label} className="flex items-center gap-1.5 px-2.5 py-1">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color, boxShadow: `0 0 5px ${color}` }} />
              <span className="text-xs text-ink-gray">{label}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-ink-gray mt-2 text-center opacity-60">
          {t({ en: 'Tap any zone to explore', es: 'Toca una zona para explorar' })}
        </p>
      </div>

      {/* ─── Info Panel ─────────────────────────── */}
      <div>
        {selected ? (
          <div className="bg-ink-card border border-ink-border rounded-xl p-6 space-y-5" style={{ borderColor: PAIN_COLORS[selected.painLevel] + '55' }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-ink-gray uppercase tracking-widest mb-1">
                  {t({ en: 'Selected zone', es: 'Zona seleccionada' })}
                </p>
                <h3 className="font-heading text-3xl text-ink-white">{t(selected.name)}</h3>
              </div>
              <button onClick={() => setSelected(null)} className="text-ink-gray hover:text-ink-white text-2xl leading-none mt-1 transition-colors">×</button>
            </div>

            {/* Pain bar */}
            <div>
              <div className="flex justify-between text-xs text-ink-gray mb-1.5">
                <span>{t({ en: 'Pain level', es: 'Nivel de dolor' })}</span>
                <span style={{ color: PAIN_COLORS[selected.painLevel] }}>{painLabel(selected.painLevel)} — {selected.painLevel}/5</span>
              </div>
              <div className="h-1.5 bg-ink-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${(selected.painLevel / 5) * 100}%`,
                    backgroundColor: PAIN_COLORS[selected.painLevel],
                    boxShadow: `0 0 8px ${PAIN_GLOW[selected.painLevel]}`,
                  }}
                />
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-ink-black rounded-lg p-3">
                <p className="text-xs text-ink-gray mb-1">{t({ en: 'Healing', es: 'Cicatrización' })}</p>
                <p className="font-heading text-base text-ink-white capitalize">{selected.healingComplexity}</p>
              </div>
              <div className="bg-ink-black rounded-lg p-3">
                <p className="text-xs text-ink-gray mb-1">{t({ en: '1st timer?', es: '¿Primerizo?' })}</p>
                <p className={`font-heading text-base ${selected.firstTimerFriendly ? 'text-green-400' : 'text-red-400'}`}>
                  {selected.firstTimerFriendly
                    ? t({ en: '✓ Yes', es: '✓ Sí' })
                    : t({ en: '✗ No', es: '✗ No' })}
                </p>
              </div>
            </div>

            <p className="text-sm text-ink-gray leading-relaxed">{t(selected.notes)}</p>

            <div>
              <p className="text-xs text-ink-gray uppercase tracking-wider mb-2">
                {t({ en: 'Works great with', es: 'Funciona bien con' })}
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
              className="block w-full text-center bg-ink-red text-white text-sm font-medium py-2.5 rounded-lg hover:opacity-90 transition-opacity">
              {t({ en: 'Book this spot → DM @ar.inks', es: 'Reservar esta zona → DM @ar.inks' })}
            </a>
          </div>
        ) : (
          <div className="bg-ink-card border border-ink-border rounded-xl p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-ink-muted flex items-center justify-center mx-auto mb-4" style={{ boxShadow: '0 0 20px rgba(193,59,42,0.3)' }}>
              <span className="text-ink-red text-2xl">↑</span>
            </div>
            <p className="font-heading text-xl text-ink-white mb-2">
              {t({ en: 'Select a zone', es: 'Selecciona una zona' })}
            </p>
            <p className="text-sm text-ink-gray leading-relaxed mb-6">
              {t({ en: 'Tap any glowing zone on the body map to see pain level, healing time, and recommended styles.', es: 'Toca cualquier zona iluminada para ver nivel de dolor, cicatrización y estilos recomendados.' })}
            </p>
            <div className="grid grid-cols-2 gap-1.5 text-left">
              {placements.map(p => (
                <button key={p.slug} onClick={() => setSelected(p)}
                  className="flex items-center gap-2 text-xs text-ink-gray hover:text-ink-white transition-colors py-1.5 px-2 rounded hover:bg-ink-muted">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: PAIN_COLORS[p.painLevel], boxShadow: `0 0 4px ${PAIN_GLOW[p.painLevel]}` }} />
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
