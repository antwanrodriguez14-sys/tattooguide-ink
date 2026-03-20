import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'

export default function Navbar() {
  const { lang, setLang, t } = useLanguage()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { to: '/styles', label: { en: 'Styles', es: 'Estilos' } },
    { to: '/placement', label: { en: 'Placement', es: 'Colocación' } },
    { to: '/quiz', label: { en: 'Quiz', es: 'Quiz' } },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-ink-black/95 backdrop-blur border-b border-ink-border">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-heading text-xl text-ink-white tracking-tight hover:text-ink-red transition-colors">
          TattooGuide<span className="text-ink-red">.ink</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm transition-colors ${location.pathname.startsWith(l.to) ? 'text-ink-white font-medium' : 'text-ink-gray hover:text-ink-white'}`}
            >
              {t(l.label)}
            </Link>
          ))}
          <button
            onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
            className="text-xs border border-ink-border px-2.5 py-1 rounded text-ink-gray hover:text-ink-white hover:border-ink-muted transition-colors"
          >
            {lang === 'en' ? 'ES' : 'EN'}
          </button>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-ink-gray p-1" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="w-5 h-0.5 bg-current mb-1" />
          <div className="w-5 h-0.5 bg-current mb-1" />
          <div className="w-5 h-0.5 bg-current" />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-ink-border bg-ink-black px-4 py-3 flex flex-col gap-3">
          {links.map(l => (
            <Link key={l.to} to={l.to} className="text-sm text-ink-gray hover:text-ink-white" onClick={() => setMenuOpen(false)}>
              {t(l.label)}
            </Link>
          ))}
          <button onClick={() => { setLang(lang === 'en' ? 'es' : 'en'); setMenuOpen(false) }}
            className="text-xs text-ink-gray text-left">
            Switch to {lang === 'en' ? 'Español' : 'English'}
          </button>
        </div>
      )}
    </nav>
  )
}
