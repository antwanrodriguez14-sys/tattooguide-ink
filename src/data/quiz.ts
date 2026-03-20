export interface QuizQuestion {
  id: string
  question: { en: string; es: string }
  options: {
    value: string
    label: { en: string; es: string }
    scores: Record<string, number>
  }[]
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'vibe',
    question: { en: 'What vibe do you want your tattoo to have?', es: '¿Qué vibra quieres que tenga tu tatuaje?' },
    options: [
      { value: 'dark', label: { en: 'Dark & mysterious', es: 'Oscuro y misterioso' }, scores: { blackwork: 3, geometric: 2, dotwork: 2 } },
      { value: 'delicate', label: { en: 'Delicate & feminine', es: 'Delicado y femenino' }, scores: { 'fine-line': 3, minimalist: 3, watercolor: 2 } },
      { value: 'bold', label: { en: 'Bold & colorful', es: 'Audaz y colorido' }, scores: { 'neo-traditional': 3, japanese: 3, realism: 2 } },
      { value: 'minimal', label: { en: 'Clean & minimal', es: 'Limpio y minimalista' }, scores: { minimalist: 3, geometric: 3, 'fine-line': 2 } },
    ],
  },
  {
    id: 'pain',
    question: { en: 'How do you feel about pain?', es: '¿Cómo te sientes con el dolor?' },
    options: [
      { value: 'low', label: { en: "I'm a softie — keep it gentle", es: 'Soy suave — mantenlo suave' }, scores: { minimalist: 3, 'fine-line': 2, watercolor: 2 } },
      { value: 'medium', label: { en: "I can handle it", es: 'Puedo manejarlo' }, scores: { blackwork: 2, geometric: 2, dotwork: 2, 'neo-traditional': 2 } },
      { value: 'high', label: { en: "Pain is just weakness leaving", es: 'El dolor es solo debilidad saliendo' }, scores: { japanese: 3, realism: 3, blackwork: 2 } },
    ],
  },
  {
    id: 'size',
    question: { en: 'How big do you want it?', es: '¿Qué tan grande lo quieres?' },
    options: [
      { value: 'tiny', label: { en: 'Small & discreet', es: 'Pequeño y discreto' }, scores: { minimalist: 3, 'fine-line': 2 } },
      { value: 'medium', label: { en: 'Medium — palm sized', es: 'Mediano — del tamaño de una palma' }, scores: { geometric: 2, blackwork: 2, watercolor: 2, dotwork: 2 } },
      { value: 'large', label: { en: 'Go big or go home', es: 'A lo grande o nada' }, scores: { japanese: 3, realism: 3, 'neo-traditional': 2, blackwork: 2 } },
    ],
  },
  {
    id: 'subject',
    question: { en: 'What subject matter speaks to you?', es: '¿Qué tema te habla?' },
    options: [
      { value: 'nature', label: { en: 'Nature, flowers, animals', es: 'Naturaleza, flores, animales' }, scores: { japanese: 3, watercolor: 3, realism: 2, 'neo-traditional': 2 } },
      { value: 'abstract', label: { en: 'Abstract shapes & patterns', es: 'Formas y patrones abstractos' }, scores: { geometric: 3, dotwork: 3, blackwork: 2 } },
      { value: 'portrait', label: { en: 'Portraits & faces', es: 'Retratos y rostros' }, scores: { realism: 3, 'fine-line': 2 } },
      { value: 'symbols', label: { en: 'Symbols & meaning', es: 'Símbolos y significado' }, scores: { minimalist: 3, blackwork: 2, dotwork: 2 } },
    ],
  },
  {
    id: 'visibility',
    question: { en: 'How visible do you want it?', es: '¿Qué tan visible lo quieres?' },
    options: [
      { value: 'hidden', label: { en: 'Hidden — just for me', es: 'Oculto — solo para mí' }, scores: { minimalist: 2, 'fine-line': 2, watercolor: 2 } },
      { value: 'sometimes', label: { en: 'Visible sometimes', es: 'Visible a veces' }, scores: { geometric: 2, dotwork: 2, blackwork: 2 } },
      { value: 'always', label: { en: 'Always on display', es: 'Siempre a la vista' }, scores: { blackwork: 3, 'neo-traditional': 3, japanese: 2, realism: 2 } },
    ],
  },
]
