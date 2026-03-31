import { useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import type { Placement } from '../data/placements'
import { styles } from '../data/styles'

interface Props { placements: Placement[] }

const PC: Record<number, string> = { 1:'#2DD4BF',2:'#2DD4BF',3:'#FACC15',4:'#F97316',5:'#EF4444' }
const PG: Record<number, string> = { 1:'rgba(45,212,191,.5)',2:'rgba(45,212,191,.5)',3:'rgba(250,204,21,.55)',4:'rgba(249,115,22,.6)',5:'rgba(239,68,68,.65)' }
const SPEED: Record<number, string> = { 1:'3.8s',2:'3.8s',3:'2.8s',4:'2.1s',5:'1.5s' }

/* ── FRONT ZONES ─────────────────────────────────────── */
const FRONT_ZONES = [
  { slug:'shoulder',   id:'sh-L',  path:'M 108 122 Q 92 114 80 124 Q 67 135 69 153 Q 71 168 82 174 L 97 164 Q 103 148 108 136 Z' },
  { slug:'shoulder',   id:'sh-R',  path:'M 172 122 Q 188 114 200 124 Q 213 135 211 153 Q 209 168 198 174 L 183 164 Q 177 148 172 136 Z' },
  { slug:'chest',      id:'ch',    path:'M 110 122 L 108 142 Q 111 162 140 167 Q 169 162 172 142 L 170 122 Q 154 115 140 113 Q 126 115 110 122 Z' },
  { slug:'ribcage',    id:'rb',    path:'M 108 167 Q 110 188 112 210 Q 117 230 140 234 Q 163 230 168 210 Q 170 188 172 167 Q 156 175 140 177 Q 124 175 108 167 Z' },
  { slug:'forearm',    id:'ua-L',  path:'M 82 174 L 66 180 Q 55 198 58 220 L 74 224 Q 81 207 87 190 Z' },
  { slug:'forearm',    id:'fa-L',  path:'M 58 220 L 45 252 Q 41 271 47 281 L 63 277 Q 66 258 70 238 L 74 224 Z' },
  { slug:'forearm',    id:'ua-R',  path:'M 198 174 L 214 180 Q 225 198 222 220 L 206 224 Q 199 207 193 190 Z' },
  { slug:'forearm',    id:'fa-R',  path:'M 222 220 L 235 252 Q 239 271 233 281 L 217 277 Q 214 258 210 238 L 206 224 Z' },
  { slug:'inner-arm',  id:'ia-L',  path:'M 87 174 L 82 174 L 66 180 Q 74 192 81 200 Q 90 192 96 180 Z' },
  { slug:'thigh',      id:'hp',    path:'M 112 234 Q 110 250 110 265 L 137 268 L 143 268 L 170 265 Q 170 250 168 234 Q 154 241 140 243 Q 126 241 112 234 Z' },
  { slug:'thigh',      id:'th-L',  path:'M 110 267 L 107 320 Q 106 345 110 359 L 131 359 Q 134 342 134 315 L 137 268 Z' },
  { slug:'thigh',      id:'th-R',  path:'M 170 267 L 173 320 Q 174 345 170 359 L 149 359 Q 146 342 146 315 L 143 268 Z' },
  { slug:'ankle',      id:'sh-L2', path:'M 110 359 Q 108 387 110 407 L 131 407 Q 132 385 131 359 Z' },
  { slug:'ankle',      id:'sh-R2', path:'M 170 359 Q 172 387 170 407 L 149 407 Q 148 385 149 359 Z' },
  { slug:'ankle',      id:'an-L',  path:'M 110 407 L 106 441 Q 106 454 115 458 L 131 458 Q 137 454 135 441 L 131 407 Z' },
  { slug:'ankle',      id:'an-R',  path:'M 170 407 L 174 441 Q 174 454 165 458 L 149 458 Q 143 454 145 441 L 149 407 Z' },
  { slug:'spine',      id:'sp',    path:'M 135 102 L 145 102 L 147 275 L 133 275 Z' },
]

/* ── BACK ZONES ──────────────────────────────────────── */
const BACK_ZONES = [
  { slug:'shoulder',   id:'bsh-L', path:'M 108 122 Q 92 114 80 124 Q 67 135 69 153 Q 71 168 82 174 L 97 164 Q 103 148 108 136 Z' },
  { slug:'shoulder',   id:'bsh-R', path:'M 172 122 Q 188 114 200 124 Q 213 135 211 153 Q 209 168 198 174 L 183 164 Q 177 148 172 136 Z' },
  { slug:'upper-back', id:'ub',    path:'M 110 122 L 108 200 Q 116 210 140 212 Q 164 210 172 200 L 170 122 Q 154 115 140 113 Q 126 115 110 122 Z' },
  { slug:'lower-back', id:'lb',    path:'M 108 212 L 108 258 Q 115 273 140 276 Q 165 273 172 258 L 172 212 Z' },
  { slug:'spine',      id:'bsp',   path:'M 135 102 L 145 102 L 147 275 L 133 275 Z' },
  { slug:'forearm',    id:'bua-L', path:'M 82 174 L 66 180 Q 55 198 58 220 L 74 224 Q 81 207 87 190 Z' },
  { slug:'forearm',    id:'bfa-L', path:'M 58 220 L 45 252 Q 41 271 47 281 L 63 277 Q 66 258 70 238 L 74 224 Z' },
  { slug:'forearm',    id:'bua-R', path:'M 198 174 L 214 180 Q 225 198 222 220 L 206 224 Q 199 207 193 190 Z' },
  { slug:'forearm',    id:'bfa-R', path:'M 222 220 L 235 252 Q 239 271 233 281 L 217 277 Q 214 258 210 238 L 206 224 Z' },
  { slug:'thigh',      id:'gl-L',  path:'M 110 267 L 107 318 Q 108 338 130 342 L 137 338 L 137 268 Z' },
  { slug:'thigh',      id:'gl-R',  path:'M 170 267 L 173 318 Q 172 338 150 342 L 143 338 L 143 268 Z' },
  { slug:'thigh',      id:'bth-L', path:'M 107 318 L 107 360 L 131 360 L 128 342 Z' },
  { slug:'thigh',      id:'bth-R', path:'M 173 318 L 173 360 L 149 360 L 152 342 Z' },
  { slug:'calf',       id:'ca-L',  path:'M 107 360 L 108 410 L 131 410 L 131 360 Z' },
  { slug:'calf',       id:'ca-R',  path:'M 173 360 L 172 410 L 149 410 L 149 360 Z' },
  { slug:'ankle',      id:'ban-L', path:'M 108 410 L 106 441 Q 106 454 115 458 L 131 458 Q 137 454 135 441 L 131 410 Z' },
  { slug:'ankle',      id:'ban-R', path:'M 172 410 L 174 441 Q 174 454 165 458 L 149 458 Q 143 454 145 441 L 149 410 Z' },
]

/* ── DOT LABEL POSITIONS ─────────────────────────────── */
const FRONT_LABELS: Record<string, { cx:number; cy:number }> = {
  'sh-L': { cx:78,  cy:148 }, 'ch':   { cx:140, cy:147 },
  'rb':   { cx:140, cy:200 }, 'fa-L': { cx:51,  cy:252 },
  'ia-L': { cx:76,  cy:184 }, 'hp':   { cx:140, cy:251 },
  'th-L': { cx:114, cy:312 }, 'an-L': { cx:114, cy:432 },
  'sp':   { cx:140, cy:188 },
}
const BACK_LABELS: Record<string, { cx:number; cy:number }> = {
  'bsh-L':{ cx:78,  cy:148 }, 'ub':   { cx:140, cy:162 },
  'lb':   { cx:140, cy:236 }, 'bfa-L':{ cx:51,  cy:252 },
  'bsp':  { cx:157, cy:188 }, 'gl-L': { cx:114, cy:304 },
  'bth-L':{ cx:114, cy:340 }, 'ca-L': { cx:114, cy:385 },
  'ban-L':{ cx:114, cy:432 },
}

export default function PlacementMap({ placements }: Props) {
  const { t } = useLanguage()
  const [selected, setSelected]   = useState<Placement | null>(null)
  const [hovered,  setHovered]    = useState<string | null>(null)
  const [view,     setView]       = useState<'front'|'back'>('front')
  const [flipping, setFlipping]   = useState(false)

  const getP = (slug: string) => placements.find(p => p.slug === slug)
  const painLabel = (n: number) =>
    t({ en:['','Very Low','Low','Medium','High','Intense'][n] as string,
        es:['','Muy bajo','Bajo','Medio','Alto','Intenso'][n] as string })

  const relatedStyles = selected ? styles.filter(s => selected.recommendedStyles.includes(s.slug)) : []

  const handleFlip = () => {
    if (flipping) return
    setFlipping(true)
    setSelected(null)
    setTimeout(() => {
      setView(v => v === 'front' ? 'back' : 'front')
      setFlipping(false)
    }, 320)
  }

  const zones      = view === 'front' ? FRONT_ZONES : BACK_ZONES
  const labelMap   = view === 'front' ? FRONT_LABELS : BACK_LABELS
  const dotZones   = zones.filter(z => labelMap[z.id])
  const glowFilter = (lvl: number) =>
    lvl <= 2 ? 'url(#g-teal)' : lvl === 3 ? 'url(#g-yellow)' : lvl === 4 ? 'url(#g-orange)' : 'url(#g-red)'

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <style>{`
        @keyframes zpulse { 0%,100%{opacity:.68} 50%{opacity:1} }
        @keyframes zpulse-fast { 0%,100%{opacity:.6} 50%{opacity:1} }
        @keyframes dashmove { to{stroke-dashoffset:-40} }
        @keyframes breathe { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(1.007)} }
        @keyframes floatin { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
        @keyframes flipout { 0%{transform:perspective(500px) rotateY(0deg);opacity:1}
                            100%{transform:perspective(500px) rotateY(90deg);opacity:0} }
        @keyframes flipin  { 0%{transform:perspective(500px) rotateY(-90deg);opacity:0}
                            100%{transform:perspective(500px) rotateY(0deg);opacity:1} }
        .zone-path { cursor:pointer; transition:filter .15s,opacity .15s; }
        .zone-path:hover { filter:brightness(1.5) saturate(1.3); }
        .body-breathe { animation:breathe 5s ease-in-out infinite; transform-origin:center; }
        .tip-label { animation:floatin .15s ease forwards; pointer-events:none; }
        .flip-out  { animation:flipout .32s ease forwards; }
        .flip-in   { animation:flipin  .32s ease forwards; }
      `}</style>

      {/* ── Body SVG ── */}
      <div className="flex flex-col items-center">

        {/* Flip button */}
        <button
          onClick={handleFlip}
          className="mb-4 flex items-center gap-2 text-xs text-ink-gray border border-ink-border rounded-full px-4 py-2 hover:border-ink-muted hover:text-ink-white transition-all"
          style={{ letterSpacing: '0.05em' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 4v6h6M23 20v-6h-6"/>
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15"/>
          </svg>
          {view === 'front'
            ? t({ en: 'View Back', es: 'Ver espalda' })
            : t({ en: 'View Front', es: 'Ver frente' })}
        </button>

        <div className={flipping ? 'flip-out' : 'flip-in'} style={{ width: '100%' }}>
          <svg viewBox="0 0 280 490" className="w-full max-w-xs mx-auto overflow-visible">
            <defs>
              <radialGradient id="bg" cx="38%" cy="28%" r="65%">
                <stop offset="0%" stopColor="#3d3d3d"/>
                <stop offset="55%" stopColor="#1e1e1e"/>
                <stop offset="100%" stopColor="#0c0c0c"/>
              </radialGradient>
              <radialGradient id="ag" cx="35%" cy="25%" r="70%">
                <stop offset="0%" stopColor="#333"/>
                <stop offset="100%" stopColor="#111"/>
              </radialGradient>
              <linearGradient id="sh" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff" stopOpacity=".08"/>
                <stop offset="50%" stopColor="#fff" stopOpacity="0"/>
              </linearGradient>
              <filter id="bshadow" x="-15%" y="-5%" width="130%" height="115%">
                <feDropShadow dx="4" dy="7" stdDeviation="9" floodColor="#000" floodOpacity=".65"/>
              </filter>
              <filter id="g-teal"   x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              <filter id="g-yellow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              <filter id="g-orange" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              <filter id="g-red"    x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>

            {/* ── Silhouette ── */}
            <g className="body-breathe" filter="url(#bshadow)">
              <ellipse cx="140" cy="52" rx="28" ry="34" fill="url(#bg)"/>
              <ellipse cx="133" cy="44" rx="10" ry="14" fill="url(#sh)"/>
              <path d="M 130 82 Q 128 93 128 100 L 152 100 Q 152 93 150 82 Z" fill="url(#bg)"/>
              <path d="M 96 100 Q 76 107 72 132 L 68 278 Q 82 286 140 288 Q 198 286 212 278 L 208 132 Q 204 107 184 100 Z" fill="url(#bg)"/>
              <path d="M 104 102 Q 90 110 88 132 L 100 284 Q 120 286 140 285 L 140 105 Q 122 100 104 102 Z" fill="url(#sh)"/>
              <path d="M 96 100 Q 74 106 62 128 L 42 272 Q 48 280 62 280 L 76 224 L 86 170 Z" fill="url(#ag)"/>
              <path d="M 184 100 Q 206 106 218 128 L 238 272 Q 232 280 218 280 L 204 224 L 194 170 Z" fill="url(#ag)"/>
              <path d="M 108 278 L 104 362 L 106 460 Q 118 467 132 467 L 134 362 L 138 288 Z" fill="url(#bg)"/>
              <path d="M 172 278 L 176 362 L 174 460 Q 162 467 148 467 L 146 362 L 142 288 Z" fill="url(#bg)"/>
              <ellipse cx="119" cy="467" rx="18" ry="9" fill="#181818"/>
              <ellipse cx="161" cy="467" rx="18" ry="9" fill="#181818"/>
              {view === 'front' && <>
                <path d="M 128 122 Q 130 142 128 162" stroke="#fff" strokeWidth=".5" strokeOpacity=".07" fill="none"/>
                <path d="M 152 122 Q 150 142 152 162" stroke="#fff" strokeWidth=".5" strokeOpacity=".07" fill="none"/>
              </>}
              {view === 'back' && <>
                {/* Shoulder blade hints */}
                <path d="M 116 130 Q 112 155 116 178 Q 124 183 132 178 Q 134 155 130 130 Z" fill="#fff" fillOpacity=".04"/>
                <path d="M 164 130 Q 168 155 164 178 Q 156 183 148 178 Q 146 155 150 130 Z" fill="#fff" fillOpacity=".04"/>
              </>}
            </g>

            {/* ── Pain zones ── */}
            {zones.map(zone => {
              const p = getP(zone.slug)
              if (!p) return null
              const isSel = selected?.slug === zone.slug
              const isHov = hovered === zone.slug
              return (
                <path
                  key={zone.id}
                  d={zone.path}
                  fill={PC[p.painLevel]}
                  opacity={isSel || isHov ? .95 : .66}
                  filter={(isSel || isHov) ? glowFilter(p.painLevel) : undefined}
                  className="zone-path"
                  style={{
                    animation:`${p.painLevel >= 4 ? 'zpulse-fast' : 'zpulse'} ${SPEED[p.painLevel]} ease-in-out infinite`,
                  }}
                  onClick={() => setSelected(p === selected ? null : p)}
                  onMouseEnter={() => setHovered(zone.slug)}
                  onMouseLeave={() => setHovered(null)}
                />
              )
            })}

            {/* ── Dashed selected border ── */}
            {selected && zones.filter(z => z.slug === selected.slug).map(zone => (
              <path key={`sel-${zone.id}`} d={zone.path} fill="none"
                stroke="#fff" strokeWidth="1.5" strokeDasharray="6 4" strokeOpacity=".9"
                style={{ animation:'dashmove 1.1s linear infinite', pointerEvents:'none' }}
              />
            ))}

            {/* ── Dots + hit targets ── */}
            {dotZones.map(zone => {
              const p = getP(zone.slug)
              if (!p) return null
              const lbl = labelMap[zone.id]
              const isSel = selected?.slug === zone.slug
              const isHov = hovered === zone.slug
              return (
                <g key={`dot-${zone.id}`}
                  onClick={() => setSelected(p === selected ? null : p)}
                  onMouseEnter={() => setHovered(zone.slug)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor:'pointer' }}
                >
                  {/* Large invisible hit target for mobile */}
                  <circle cx={lbl.cx} cy={lbl.cy} r="20" fill="transparent"/>
                  {/* Visual dot */}
                  <circle cx={lbl.cx} cy={lbl.cy} r="11"
                    fill={isSel ? '#fff' : 'rgba(0,0,0,.7)'}
                    stroke={isSel || isHov ? PC[p.painLevel] : 'rgba(255,255,255,.45)'}
                    strokeWidth={isSel || isHov ? 2 : 1.5}
                  />
                  <text x={lbl.cx} y={lbl.cy + 4} textAnchor="middle"
                    fill={isSel ? PC[p.painLevel] : '#fff'}
                    fontSize="9" fontWeight="700" fontFamily="sans-serif"
                    style={{ pointerEvents:'none' }}>
                    {p.painLevel}
                  </text>
                  {/* Hover tooltip */}
                  {isHov && !isSel && (
                    <g className="tip-label">
                      <rect x={lbl.cx - 30} y={lbl.cy - 30} width="60" height="17" rx="4"
                        fill="rgba(0,0,0,.9)" stroke={PC[p.painLevel]} strokeWidth=".8"/>
                      <text x={lbl.cx} y={lbl.cy - 18} textAnchor="middle"
                        fill="#fff" fontSize="7.5" fontFamily="sans-serif"
                        style={{ pointerEvents:'none' }}>
                        {t(p.name)}
                      </text>
                    </g>
                  )}
                </g>
              )
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center rounded-full border border-ink-border bg-ink-card px-1 py-1">
          {([
            { l: t({ en:'Low',     es:'Bajo'     }), c:'#2DD4BF' },
            { l: t({ en:'Med',     es:'Medio'    }), c:'#FACC15' },
            { l: t({ en:'High',    es:'Alto'     }), c:'#F97316' },
            { l: t({ en:'Intense', es:'Intenso'  }), c:'#EF4444' },
          ] as {l:string;c:string}[]).map(({ l, c }) => (
            <div key={l} className="flex items-center gap-1.5 px-2.5 py-1">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor:c, boxShadow:`0 0 5px ${c}` }}/>
              <span className="text-xs text-ink-gray">{l}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-ink-gray mt-2 text-center opacity-60">
          {t({ en:'Tap any zone to explore', es:'Toca una zona para explorar' })}
        </p>
      </div>

      {/* ── Info Panel ── */}
      <div>
        {selected ? (
          <div className="bg-ink-card border border-ink-border rounded-xl p-6 space-y-5"
            style={{ borderColor: PC[selected.painLevel] + '44' }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-ink-gray uppercase tracking-widest mb-1">
                  {t({ en:'Selected zone', es:'Zona seleccionada' })}
                </p>
                <h3 className="font-heading text-3xl text-ink-white">{t(selected.name)}</h3>
              </div>
              <button onClick={() => setSelected(null)}
                className="text-ink-gray hover:text-ink-white text-2xl leading-none mt-1 transition-colors">×</button>
            </div>

            {/* Pain bar */}
            <div>
              <div className="flex justify-between text-xs text-ink-gray mb-2">
                <span>{t({ en:'Pain level', es:'Nivel de dolor' })}</span>
                <span style={{ color: PC[selected.painLevel] }}>
                  {painLabel(selected.painLevel)} · {selected.painLevel}/5
                </span>
              </div>
              <div className="h-1.5 bg-ink-muted rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width:`${(selected.painLevel/5)*100}%`, backgroundColor: PC[selected.painLevel], boxShadow:`0 0 8px ${PG[selected.painLevel]}` }}/>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-ink-black rounded-lg p-3">
                <p className="text-xs text-ink-gray mb-1">{t({ en:'Healing', es:'Cicatrización' })}</p>
                <p className="font-heading text-base text-ink-white capitalize">{selected.healingComplexity}</p>
              </div>
              <div className="bg-ink-black rounded-lg p-3">
                <p className="text-xs text-ink-gray mb-1">{t({ en:'1st timer?', es:'¿Primerizo?' })}</p>
                <p className={`font-heading text-base ${selected.firstTimerFriendly ? 'text-green-400' : 'text-red-400'}`}>
                  {selected.firstTimerFriendly ? t({ en:'✓ Yes', es:'✓ Sí' }) : t({ en:'✗ No', es:'✗ No' })}
                </p>
              </div>
            </div>

            <p className="text-sm text-ink-gray leading-relaxed">{t(selected.notes)}</p>

            <div>
              <p className="text-xs text-ink-gray uppercase tracking-wider mb-2">
                {t({ en:'Works great with', es:'Funciona bien con' })}
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
              {t({ en:'Book this spot → DM @ar.inks', es:'Reservar esta zona → DM @ar.inks' })}
            </a>
          </div>
        ) : (
          <div className="bg-ink-card border border-ink-border rounded-xl p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-ink-muted flex items-center justify-center mx-auto mb-4"
              style={{ boxShadow:'0 0 20px rgba(193,59,42,.3)' }}>
              <span className="text-ink-red text-2xl">↑</span>
            </div>
            <p className="font-heading text-xl text-ink-white mb-2">
              {t({ en:'Select a zone', es:'Selecciona una zona' })}
            </p>
            <p className="text-sm text-ink-gray leading-relaxed mb-6">
              {t({ en:'Tap any glowing zone to see pain level, healing time, and recommended styles. Flip the body to explore the back too.',
                   es:'Toca cualquier zona iluminada para ver dolor, cicatrización y estilos. Rota el cuerpo para explorar la espalda también.' })}
            </p>
            <div className="grid grid-cols-2 gap-1.5 text-left">
              {placements.map(p => (
                <button key={p.slug} onClick={() => setSelected(p)}
                  className="flex items-center gap-2 text-xs text-ink-gray hover:text-ink-white transition-colors py-1.5 px-2 rounded hover:bg-ink-muted">
                  <span className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: PC[p.painLevel], boxShadow:`0 0 4px ${PG[p.painLevel]}` }}/>
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
