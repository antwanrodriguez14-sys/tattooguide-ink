import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../hooks/useLanguage'
import { quizQuestions } from '../data/quiz'

export default function Quiz() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>({})
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const question = quizQuestions[step]
  const total = quizQuestions.length
  const progress = Math.round((step / total) * 100)

  const choose = (optionValue: string, optionScores: Record<string, number>) => {
    const newScores = { ...scores }
    Object.entries(optionScores).forEach(([style, score]) => {
      newScores[style] = (newScores[style] || 0) + score
    })
    const newAnswers = { ...answers, [question.id]: optionValue }
    setScores(newScores)
    setAnswers(newAnswers)

    if (step + 1 < total) {
      setStep(step + 1)
    } else {
      const top = Object.entries(newScores).sort((a, b) => b[1] - a[1])[0]?.[0] || 'blackwork'
      navigate('/quiz/result', { state: { topStyle: top, scores: newScores } })
    }
  }

  return (
    <>
      <Helmet>
        <title>{t({ en: 'What\'s My Tattoo Style?', es: '¿Cuál es mi Estilo de Tatuaje?' })} — TattooGuide.ink</title>
        <meta name="description" content="Answer 5 quick questions and discover which tattoo style matches your personality." />
        <link rel="canonical" href="https://tattooguide.ink/quiz" />
        <meta property="og:title" content="What's My Tattoo Style? — TattooGuide.ink" />
        <meta property="og:description" content="Answer 5 quick questions and discover which tattoo style matches your personality." />
        <meta property="og:image" content="https://tattooguide.ink/opengraph.jpg" />
        <meta property="og:url" content="https://tattooguide.ink/quiz" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="max-w-2xl mx-auto px-4 py-16">
        {/* Progress */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-1 bg-ink-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-ink-red rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-ink-gray shrink-0">{step + 1} / {total}</span>
        </div>

        {/* Question */}
        <div className="mb-10">
          <p className="text-xs text-ink-gray uppercase tracking-widest mb-4">
            {t({ en: `Question ${step + 1}`, es: `Pregunta ${step + 1}` })}
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-ink-white leading-tight">
            {t(question.question)}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map(option => (
            <button
              key={option.value}
              onClick={() => choose(option.value, option.scores)}
              className="w-full text-left bg-ink-card border border-ink-border rounded-lg px-5 py-4 text-ink-white hover:border-ink-red hover:text-ink-red transition-all duration-150 group"
            >
              <span className="text-ink-muted group-hover:text-ink-red-dark mr-3 transition-colors">→</span>
              {t(option.label)}
            </button>
          ))}
        </div>

        {/* Back button */}
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="mt-6 text-sm text-ink-gray hover:text-ink-white transition-colors"
          >
            ← {t({ en: 'Back', es: 'Atrás' })}
          </button>
        )}
      </div>
    </>
  )
}
