import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Lang = 'en' | 'es'
export type BiText = { en: string; es: string }

interface LanguageContextType {
  lang: Lang
  setLang: (l: Lang) => void
  t: (text: BiText) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem('lang')
    return (stored === 'es' ? 'es' : 'en') as Lang
  })

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('lang', l)
  }

  const t = (text: BiText) => text[lang]

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
