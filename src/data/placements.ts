export interface Placement {
  slug: string
  name: { en: string; es: string }
  painLevel: 1 | 2 | 3 | 4 | 5
  recommendedStyles: string[]
  healingComplexity: 'easy' | 'moderate' | 'hard'
  firstTimerFriendly: boolean
  notes: { en: string; es: string }
  svgX: number
  svgY: number
}

export const placements: Placement[] = [
  {
    slug: 'forearm',
    name: { en: 'Forearm', es: 'Antebrazo' },
    painLevel: 2,
    recommendedStyles: ['blackwork', 'fine-line', 'geometric', 'realism'],
    healingComplexity: 'easy',
    firstTimerFriendly: true,
    notes: {
      en: 'One of the most popular spots. Visible, heals well, and works for many styles.',
      es: 'Uno de los lugares más populares. Visible, sana bien y funciona para muchos estilos.',
    },
    svgX: 120, svgY: 210,
  },
  {
    slug: 'inner-arm',
    name: { en: 'Inner Arm', es: 'Brazo interno' },
    painLevel: 3,
    recommendedStyles: ['fine-line', 'minimalist', 'dotwork', 'geometric'],
    healingComplexity: 'moderate',
    firstTimerFriendly: false,
    notes: {
      en: 'Sensitive area but great for fine line and minimalist work. Stays hidden easily.',
      es: 'Zona sensible pero excelente para línea fina y minimalismo. Fácil de ocultar.',
    },
    svgX: 148, svgY: 235,
  },
  {
    slug: 'chest',
    name: { en: 'Chest', es: 'Pecho' },
    painLevel: 3,
    recommendedStyles: ['blackwork', 'japanese', 'neo-traditional', 'realism'],
    healingComplexity: 'moderate',
    firstTimerFriendly: false,
    notes: {
      en: 'Great canvas for large pieces. Avoid sternum center if pain-sensitive.',
      es: 'Gran lienzo para piezas grandes. Evita el esternón central si eres sensible al dolor.',
    },
    svgX: 200, svgY: 175,
  },
  {
    slug: 'ribcage',
    name: { en: 'Ribcage', es: 'Costillas' },
    painLevel: 5,
    recommendedStyles: ['fine-line', 'watercolor', 'minimalist', 'dotwork'],
    healingComplexity: 'hard',
    firstTimerFriendly: false,
    notes: {
      en: 'Most painful placement. Ideal for delicate, meaningful pieces worth the pain.',
      es: 'Colocación más dolorosa. Ideal para piezas delicadas y significativas que valen el dolor.',
    },
    svgX: 230, svgY: 210,
  },
  {
    slug: 'shoulder',
    name: { en: 'Shoulder', es: 'Hombro' },
    painLevel: 2,
    recommendedStyles: ['japanese', 'neo-traditional', 'blackwork', 'geometric'],
    healingComplexity: 'easy',
    firstTimerFriendly: true,
    notes: {
      en: 'Classic placement for a reason. Heals well and works as sleeve starter.',
      es: 'Colocación clásica por algo. Sana bien y funciona como inicio de sleeve.',
    },
    svgX: 162, svgY: 155,
  },
  {
    slug: 'spine',
    name: { en: 'Spine', es: 'Espina dorsal' },
    painLevel: 4,
    recommendedStyles: ['fine-line', 'minimalist', 'dotwork', 'japanese'],
    healingComplexity: 'moderate',
    firstTimerFriendly: false,
    notes: {
      en: 'Elongated designs flow naturally here. Painful but results are stunning.',
      es: 'Los diseños alargados fluyen naturalmente aquí. Doloroso pero los resultados son impresionantes.',
    },
    svgX: 200, svgY: 200,
  },
  {
    slug: 'thigh',
    name: { en: 'Thigh', es: 'Muslo' },
    painLevel: 2,
    recommendedStyles: ['realism', 'blackwork', 'japanese', 'neo-traditional'],
    healingComplexity: 'easy',
    firstTimerFriendly: true,
    notes: {
      en: 'Large canvas, low pain. Perfect for bold statements or detailed scenes.',
      es: 'Gran lienzo, poco dolor. Perfecto para declaraciones audaces o escenas detalladas.',
    },
    svgX: 195, svgY: 310,
  },
  {
    slug: 'ankle',
    name: { en: 'Ankle', es: 'Tobillo' },
    painLevel: 3,
    recommendedStyles: ['fine-line', 'minimalist', 'watercolor', 'dotwork'],
    healingComplexity: 'moderate',
    firstTimerFriendly: false,
    notes: {
      en: 'Cute and discreet. Bony area so expect some discomfort. Heals slowly.',
      es: 'Lindo y discreto. Zona huesuda así que espera algo de molestia. Sana lentamente.',
    },
    svgX: 195, svgY: 420,
  },
  {
    slug: 'upper-back',
    name: { en: 'Upper Back', es: 'Espalda alta' },
    painLevel: 3,
    recommendedStyles: ['blackwork', 'japanese', 'neo-traditional', 'realism'],
    healingComplexity: 'moderate',
    firstTimerFriendly: false,
    notes: {
      en: 'The shoulder blade area is one of the best canvases for large, symmetrical pieces. Moderate pain and heals well.',
      es: 'La zona de los omóplatos es uno de los mejores lienzos para piezas grandes y simétricas. Dolor moderado y sana bien.',
    },
    svgX: 140, svgY: 155,
  },
  {
    slug: 'lower-back',
    name: { en: 'Lower Back', es: 'Espalda baja' },
    painLevel: 4,
    recommendedStyles: ['fine-line', 'minimalist', 'dotwork', 'watercolor'],
    healingComplexity: 'moderate',
    firstTimerFriendly: false,
    notes: {
      en: 'Close to the spine and hip bones so pain is higher. Lower back pieces are iconic — worth it.',
      es: 'Cerca de la columna y los huesos de cadera, el dolor es mayor. Las piezas de espalda baja son icónicas — vale la pena.',
    },
    svgX: 140, svgY: 230,
  },
  {
    slug: 'calf',
    name: { en: 'Calf', es: 'Pantorrilla' },
    painLevel: 3,
    recommendedStyles: ['blackwork', 'geometric', 'japanese', 'realism'],
    healingComplexity: 'easy',
    firstTimerFriendly: false,
    notes: {
      en: 'Muscular area with great ink retention. Popular for bold pieces that show well when walking.',
      es: 'Zona muscular con excelente retención de tinta. Popular para piezas llamativas que se ven bien al caminar.',
    },
    svgX: 140, svgY: 380,
  },
]
