import { useRef, useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import type { TattooStyle } from '../data/styles'

interface Props {
  style: TattooStyle
  onClose: () => void
}

const PINTEREST_KEYWORDS: Record<string, { en: string[]; es: string[] }> = {
  blackwork: {
    en: ['blackwork tattoo ideas 2026', 'bold tattoo aesthetic', 'dark tattoo inspo', 'blackwork tattoo women', 'body art trending'],
    es: ['tatuajes blackwork 2026', 'tatuaje oscuro aesthetic', 'tatuaje mujer tendencia 2026'],
  },
  'fine-line': {
    en: ['fine line tattoo 2026', 'delicate tattoo ideas', 'minimalist tattoo women', 'dainty tattoo aesthetic', 'first tattoo inspo'],
    es: ['tatuaje línea fina 2026', 'tatuaje delicado mujer', 'ideas tatuajes pequeños aesthetic'],
  },
  'neo-traditional': {
    en: ['neo traditional tattoo 2026', 'colorful tattoo ideas', 'bold tattoo aesthetic women', 'tattoo art trending', 'body art goals'],
    es: ['tatuaje neo tradicional 2026', 'tatuaje colorido mujer', 'arte corporal tendencia'],
  },
  japanese: {
    en: ['japanese tattoo 2026', 'irezumi inspiration', 'sleeve tattoo ideas women', 'spiritual tattoo aesthetic', 'meaningful body art'],
    es: ['tatuaje japonés mujer 2026', 'tatuaje espiritual aesthetic', 'ideas sleeve tattoo mujer'],
  },
  realism: {
    en: ['realism tattoo 2026', 'portrait tattoo ideas', 'photorealistic tattoo women', 'statement tattoo aesthetic', 'body art inspo'],
    es: ['tatuaje realismo 2026', 'retrato tatuaje ideas', 'tatuaje fotorealista mujer'],
  },
  geometric: {
    en: ['geometric tattoo 2026', 'sacred geometry tattoo', 'minimal tattoo aesthetic', 'symmetry body art', 'geometric tattoo women'],
    es: ['tatuaje geométrico 2026', 'geometría sagrada tatuaje', 'tatuaje minimalista aesthetic'],
  },
  watercolor: {
    en: ['watercolor tattoo 2026', 'colorful tattoo aesthetic', 'artistic tattoo women', 'watercolor body art', 'unique tattoo ideas'],
    es: ['tatuaje acuarela 2026', 'tatuaje artístico colorido', 'ideas tatuaje único mujer'],
  },
  dotwork: {
    en: ['dotwork tattoo 2026', 'mandala tattoo aesthetic', 'spiritual tattoo women', 'dotwork body art', 'mandala tattoo ideas'],
    es: ['tatuaje puntillismo 2026', 'mandala tatuaje mujer', 'tatuaje espiritual aesthetic'],
  },
  minimalist: {
    en: ['minimalist tattoo 2026', 'tiny tattoo aesthetic', 'subtle tattoo women', 'small tattoo ideas', 'first tattoo women'],
    es: ['tatuaje minimalista 2026', 'tatuaje pequeño aesthetic', 'primer tatuaje ideas mujer'],
  },
}

const PAIN_LABEL: Record<number, string> = { 1: '★☆☆☆☆', 2: '★★☆☆☆', 3: '★★★☆☆', 4: '★★★★☆', 5: '★★★★★' }

export default function CardGenerator({ style, onClose }: Props) {
  const { t, lang } = useLanguage()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [theme, setTheme] = useState<'dark' | 'light' | 'gradient'>('dark')
  const [downloading, setDownloading] = useState(false)

  const keywords = PINTEREST_KEYWORDS[style.slug] ?? PINTEREST_KEYWORDS['minimalist']
  const kws = lang === 'es' ? keywords.es : keywords.en
  const bestForList = style.bestFor[lang]

  const drawCard = async () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 1000
    canvas.height = 1500

    if (theme === 'dark') {
      ctx.fillStyle = '#0A0A0A'
      ctx.fillRect(0, 0, 1000, 1500)
      ctx.fillStyle = 'rgba(255,255,255,0.015)'
      for (let i = 0; i < 2000; i++) {
        ctx.fillRect(Math.random() * 1000, Math.random() * 1500, 1, 1)
      }
    } else if (theme === 'light') {
      ctx.fillStyle = '#F5F0E8'
      ctx.fillRect(0, 0, 1000, 1500)
    } else {
      const grad = ctx.createLinearGradient(0, 0, 0, 1500)
      grad.addColorStop(0, '#0D0D0D')
      grad.addColorStop(0.5, '#1A0505')
      grad.addColorStop(1, '#0A0A0A')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 1000, 1500)
    }

    const isDark = theme !== 'light'
    const textPrimary = isDark ? '#F5F0E8' : '#0A0A0A'
    const textMuted = isDark ? '#8A8A8A' : '#555555'
    const accent = '#C13B2A'

    ctx.fillStyle = accent
    ctx.fillRect(0, 0, 1000, 10)
    ctx.fillStyle = textMuted
    ctx.font = '28px sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText('tattooguide.ink', 60, 70)
    ctx.fillStyle = accent
    ctx.font = 'bold 28px sans-serif'
    ctx.textAlign = 'right'
    ctx.fillText('@ar.inks', 940, 70)
    ctx.strokeStyle = isDark ? '#1E1E1E' : '#DDDDDD'
    ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(60, 90); ctx.lineTo(940, 90); ctx.stroke()
    ctx.fillStyle = accent
    ctx.font = 'bold 22px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(lang === 'en' ? 'TATTOO STYLE GUIDE' : 'GUÍA DE ESTILOS', 500, 160)
    ctx.fillStyle = textPrimary
    ctx.font = 'bold 108px serif'
    ctx.textAlign = 'center'
    ctx.fillText(t(style.name).toUpperCase(), 500, 310)
    ctx.font = 'italic 46px serif'
    ctx.fillStyle = isDark ? '#D4C8B8' : '#444444'
    ctx.fillText(`"${t(style.cardTagline)}"`, 500, 400)
    ctx.strokeStyle = accent
    ctx.lineWidth = 2
    ctx.beginPath(); ctx.moveTo(200, 440); ctx.lineTo(800, 440); ctx.stroke()

    const boxY = 470
    const boxes = [
      { label: lang === 'en' ? 'PAIN LEVEL' : 'DOLOR', value: `${style.painLevel}/5`, sub: PAIN_LABEL[style.painLevel] },
      { label: lang === 'en' ? 'STYLE' : 'ESTILO', value: t(style.name), sub: style.tags[0] },
      { label: lang === 'en' ? 'HEALING' : 'CICATRIZ.', value: style.painLevel <= 2 ? (lang === 'en' ? 'Easy' : 'Fácil') : style.painLevel <= 3 ? 'Moderate' : (lang === 'en' ? 'Hard' : 'Difícil'), sub: '●●●○○'.slice(0, style.painLevel * 2 - 1) },
    ]
    boxes.forEach((box, i) => {
      const bx = 60 + i * 296
      ctx.fillStyle = isDark ? '#111111' : '#EEEBE4'
      roundRect(ctx, bx, boxY, 268, 130, 12); ctx.fill()
      ctx.strokeStyle = isDark ? '#1E1E1E' : '#CCCCCC'; ctx.lineWidth = 1; ctx.stroke()
      ctx.fillStyle = textMuted; ctx.font = 'bold 18px sans-serif'; ctx.textAlign = 'center'
      ctx.fillText(box.label, bx + 134, boxY + 32)
      ctx.fillStyle = accent; ctx.font = 'bold 36px sans-serif'
      ctx.fillText(box.value, bx + 134, boxY + 80)
      ctx.fillStyle = textMuted; ctx.font = '20px sans-serif'
      ctx.fillText(box.sub, bx + 134, boxY + 112)
    })

    ctx.fillStyle = textPrimary; ctx.font = '34px sans-serif'; ctx.textAlign = 'center'
    wrapText(ctx, t(style.description), 500, 700, 820, 48)

    const tags = style.tags.slice(0, 4)
    const tagY = 900
    let tagX = 500 - (tags.length * 130) / 2
    tags.forEach(tag => {
      ctx.fillStyle = isDark ? '#1A1A1A' : '#E8E4DC'
      roundRect(ctx, tagX, tagY, 120, 44, 22); ctx.fill()
      ctx.strokeStyle = accent; ctx.lineWidth = 1.5; ctx.stroke()
      ctx.fillStyle = accent; ctx.font = 'bold 20px sans-serif'; ctx.textAlign = 'center'
      ctx.fillText(`#${tag}`, tagX + 60, tagY + 28)
      tagX += 136
    })

    ctx.fillStyle = textMuted; ctx.font = 'bold 22px sans-serif'; ctx.textAlign = 'left'
    ctx.fillText(lang === 'en' ? 'BEST FOR:' : 'IDEAL PARA:', 60, 990)
    bestForList.slice(0, 3).forEach((item: string, i: number) => {
      ctx.fillStyle = textPrimary; ctx.font = '28px sans-serif'
      ctx.fillText(`→  ${item}`, 80, 1030 + i * 44)
    })

    ctx.strokeStyle = isDark ? '#1E1E1E' : '#DDDDDD'; ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(60, 1170); ctx.lineTo(940, 1170); ctx.stroke()
    ctx.fillStyle = textMuted; ctx.font = 'bold 20px sans-serif'; ctx.textAlign = 'left'
    ctx.fillText(lang === 'en' ? 'SEARCH TERMS:' : 'BUSCA:', 60, 1210)
    ctx.fillStyle = isDark ? '#555' : '#888'; ctx.font = '22px sans-serif'
    ctx.fillText(kws.slice(0, 3).join('  ·  '), 60, 1248)
    if (kws[3]) ctx.fillText(kws.slice(3).join('  ·  '), 60, 1278)

    ctx.fillStyle = accent; roundRect(ctx, 60, 1320, 880, 120, 16); ctx.fill()
    ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 36px sans-serif'; ctx.textAlign = 'center'
    ctx.fillText(lang === 'en' ? 'FREE CONSULTATION → DM @ar.inks' : 'CONSULTA GRATIS → DM @ar.inks', 500, 1368)
    ctx.font = '26px sans-serif'; ctx.fillStyle = 'rgba(255,255,255,0.8)'
    ctx.fillText('West Palm Beach · tattooguide.ink', 500, 1412)
    ctx.fillStyle = accent; ctx.fillRect(0, 1490, 1000, 10)
  }

  const download = async () => {
    setDownloading(true)
    await drawCard()
    const canvas = canvasRef.current
    if (!canvas) return
    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url; a.download = `${style.slug}-tattoo-pin.png`; a.click()
    setDownloading(false)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-ink-card border border-ink-border rounded-xl p-6 max-w-lg w-full my-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-xl text-ink-white">
            {t({ en: 'Generate Pinterest Card', es: 'Generar Card de Pinterest' })}
          </h3>
          <button onClick={onClose} className="text-ink-gray hover:text-ink-white text-2xl leading-none">×</button>
        </div>

        <div className="flex gap-2 mb-5">
          {(['dark', 'light', 'gradient'] as const).map(th => (
            <button key={th} onClick={() => setTheme(th)}
              className={`flex-1 py-2 rounded border text-xs transition-colors capitalize ${theme === th ? 'border-ink-red text-ink-red' : 'border-ink-border text-ink-gray hover:border-ink-muted'}`}>
              {th === 'dark' ? t({ en: 'Dark', es: 'Oscuro' }) : th === 'light' ? t({ en: 'Light', es: 'Claro' }) : t({ en: 'Gradient', es: 'Gradiente' })}
            </button>
          ))}
        </div>

        <div className={`rounded-lg p-5 mb-5 ${theme === 'light' ? 'bg-[#F5F0E8]' : theme === 'gradient' ? 'bg-gradient-to-b from-[#0D0D0D] to-[#1A0505]' : 'bg-ink-black'} border border-ink-border`}>
          <div className="h-1 bg-ink-red rounded mb-3" />
          <div className="flex justify-between items-center mb-1">
            <span className={`text-xs ${theme === 'light' ? 'text-gray-400' : 'text-ink-gray'}`}>tattooguide.ink</span>
            <span className="text-xs text-ink-red font-bold">@ar.inks</span>
          </div>
          <p className="text-center text-ink-red text-xs font-bold tracking-widest mb-1">
            {lang === 'en' ? 'TATTOO STYLE GUIDE' : 'GUÍA DE ESTILOS'}
          </p>
          <p className={`font-heading text-3xl text-center mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-ink-white'}`}>
            {t(style.name).toUpperCase()}
          </p>
          <p className={`text-center italic text-sm mb-3 ${theme === 'light' ? 'text-gray-500' : 'text-ink-gray'}`}>
            "{t(style.cardTagline)}"
          </p>
          <div className="flex flex-wrap justify-center gap-1.5 mb-3">
            {style.tags.slice(0, 4).map(tag => (
              <span key={tag} className="text-xs text-ink-red border border-ink-red rounded-full px-2 py-0.5">#{tag}</span>
            ))}
          </div>
          <div className={`text-xs mb-3 ${theme === 'light' ? 'text-gray-600' : 'text-ink-gray'}`}>
            <span className="font-bold">{lang === 'en' ? 'BEST FOR: ' : 'IDEAL PARA: '}</span>
            {bestForList.slice(0, 2).join(' · ')}
          </div>
          <div className={`text-xs border-t pt-2 mt-2 ${theme === 'light' ? 'border-gray-200 text-gray-400' : 'border-ink-border text-ink-gray'}`}>
            <span className="font-bold">{lang === 'en' ? 'SEARCH: ' : 'BUSCA: '}</span>
            {kws.slice(0, 2).join(' · ')}
          </div>
          <div className="mt-3 bg-ink-red rounded text-center py-2">
            <p className="text-white text-xs font-bold">
              {lang === 'en' ? 'FREE CONSULTATION → DM @ar.inks' : 'CONSULTA GRATIS → DM @ar.inks'}
            </p>
          </div>
          <div className="h-1 bg-ink-red rounded mt-3" />
        </div>

        <div className="bg-ink-black rounded-lg p-3 mb-5 border border-ink-border">
          <p className="text-xs text-ink-gray font-bold uppercase tracking-wider mb-2">
            {t({ en: 'Pinterest SEO keywords — 2026', es: 'Keywords SEO Pinterest — 2026' })}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {kws.map(kw => (
              <span key={kw} className="text-xs bg-ink-muted text-ink-white px-2 py-0.5 rounded">{kw}</span>
            ))}
          </div>
        </div>

        <canvas ref={canvasRef} className="hidden" />

        <button onClick={download} disabled={downloading}
          className="w-full bg-ink-red text-white py-3 rounded font-medium hover:bg-ink-red-dark transition-colors disabled:opacity-50 text-sm">
          {downloading
            ? t({ en: 'Generating...', es: 'Generando...' })
            : t({ en: '↓ Download PNG (1000×1500) — Pinterest Ready', es: '↓ Descargar PNG (1000×1500) — Listo para Pinterest' })}
        </button>
        <p className="text-xs text-ink-gray text-center mt-3">
          {t({ en: 'Portrait ratio · SEO keywords · CTA — optimized for Pinterest 2026', es: 'Proporción retrato · Keywords SEO · CTA — optimizado para Pinterest 2026' })}
        </p>
      </div>
    </div>
  )
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(' ')
  let line = ''
  let cy = y
  for (const word of words) {
    const test = line + word + ' '
    if (ctx.measureText(test).width > maxWidth && line !== '') {
      ctx.fillText(line.trim(), x, cy); line = word + ' '; cy += lineHeight
    } else { line = test }
  }
  ctx.fillText(line.trim(), x, cy)
}
