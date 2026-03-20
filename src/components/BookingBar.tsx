import { useLanguage } from '../hooks/useLanguage'

export default function BookingBar() {
  const { t } = useLanguage()
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-ink-red border-t border-ink-red-dark">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <p className="text-sm text-white font-medium">
          {t({ en: 'Ready for your tattoo?', es: '¿Listo para tu tatuaje?' })}
        </p>
        <a
          href="https://instagram.com/ar.inks"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-ink-red text-sm font-semibold px-4 py-1.5 rounded hover:bg-ink-white transition-colors"
        >
          {t({ en: 'Book via DM →', es: 'Reserva por DM →' })}
        </a>
      </div>
    </div>
  )
}
