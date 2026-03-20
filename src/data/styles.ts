export interface TattooStyle {
  slug: string
  name: { en: string; es: string }
  description: { en: string; es: string }
  shortDesc: { en: string; es: string }
  tags: string[]
  painLevel: 1 | 2 | 3 | 4 | 5
  bestFor: { en: string[]; es: string[] }
  bestPlacements: string[]
  healing: { en: string; es: string }
  cardTagline: { en: string; es: string }
  color: string
  image: string
}

// Using picsum with seed IDs for reliable fallback + specific Unsplash photo IDs
// All images are women with tattoos matching each style
export const styles: TattooStyle[] = [
  {
    slug: 'blackwork',
    name: { en: 'Blackwork', es: 'Blackwork' },
    description: {
      en: 'Bold, graphic designs using only black ink. Rooted in tribal and graphic art traditions, blackwork creates strong visual impact through contrast and negative space.',
      es: 'Diseños gráficos y audaces usando solo tinta negra. Con raíces en el arte tribal y gráfico, el blackwork crea un fuerte impacto visual a través del contraste y el espacio negativo.',
    },
    shortDesc: { en: 'All black, maximum impact', es: 'Todo negro, máximo impacto' },
    tags: ['bold', 'dark', 'graphic', 'statement'],
    painLevel: 3,
    bestFor: {
      en: ['Those who love contrast', 'Sleeve enthusiasts', 'Geometric lovers'],
      es: ['Amantes del contraste', 'Entusiastas de los sleeves', 'Amantes de lo geométrico'],
    },
    bestPlacements: ['forearm', 'chest', 'shoulder', 'thigh'],
    healing: {
      en: 'Moderate — heavy ink saturation may require touch-ups. Keep moisturized.',
      es: 'Moderada — la alta saturación de tinta puede requerir retoques. Mantén hidratado.',
    },
    cardTagline: { en: 'Bold. Dark. Timeless.', es: 'Audaz. Oscuro. Atemporal.' },
    color: '#1a1a1a',
    // Woman with bold blackwork sleeve — Joshua Rawson-Harris on Unsplash
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80&fit=crop',
  },
  {
    slug: 'fine-line',
    name: { en: 'Fine Line', es: 'Línea Fina' },
    description: {
      en: 'Delicate, precise tattoos created with ultra-thin needles. Fine line work captures intricate detail and a soft, almost sketch-like aesthetic perfect for subtle body art.',
      es: 'Tatuajes delicados y precisos creados con agujas ultra finas. El trabajo de línea fina captura detalles intrincados con una estética suave, casi de boceto.',
    },
    shortDesc: { en: 'Delicate lines, endless detail', es: 'Líneas delicadas, detalle infinito' },
    tags: ['feminine', 'minimal', 'elegant', 'subtle'],
    painLevel: 2,
    bestFor: {
      en: ['First-time tattoo lovers', 'Minimalists', 'Detail-oriented people'],
      es: ['Amantes de su primer tatuaje', 'Minimalistas', 'Personas detallistas'],
    },
    bestPlacements: ['inner-arm', 'ankle', 'ribcage', 'spine'],
    healing: {
      en: 'Easy — thin lines heal quickly. Avoid sun exposure during healing.',
      es: 'Fácil — las líneas finas sanan rápido. Evita la exposición solar durante la cicatrización.',
    },
    cardTagline: { en: 'Less ink, more soul.', es: 'Menos tinta, más alma.' },
    color: '#2a2a2a',
    // Woman with fine line tattoo on arm
    image: 'https://images.unsplash.com/photo-1542931287-023b922fa89b?w=800&q=80&fit=crop',
  },
  {
    slug: 'neo-traditional',
    name: { en: 'Neo-Traditional', es: 'Neo-Tradicional' },
    description: {
      en: 'A modern evolution of classic American traditional. Neo-trad keeps bold outlines and rich colors but adds more detail, depth, and contemporary subject matter.',
      es: 'Una evolución moderna del tradicional americano clásico. El neo-tradicional mantiene contornos audaces y colores ricos, pero agrega más detalle y profundidad.',
    },
    shortDesc: { en: 'Classic meets contemporary', es: 'Lo clásico se encuentra con lo contemporáneo' },
    tags: ['bold', 'colorful', 'classic', 'detailed'],
    painLevel: 3,
    bestFor: {
      en: ['Color enthusiasts', 'Traditional tattoo fans', 'Those wanting rich detail'],
      es: ['Entusiastas del color', 'Fans del tatuaje tradicional', 'Los que quieren detalle rico'],
    },
    bestPlacements: ['forearm', 'shoulder', 'thigh', 'chest'],
    healing: { en: 'Moderate — color work needs sun protection long-term to stay vibrant.', es: 'Moderada — el trabajo en color necesita protección solar a largo plazo.' },
    cardTagline: { en: 'Old soul, new vision.', es: 'Alma antigua, visión nueva.' },
    color: '#3d1f0a',
    // Tattooed woman showing colorful arm
    image: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=800&q=80&fit=crop',
  },
  {
    slug: 'japanese',
    name: { en: 'Japanese', es: 'Japonés' },
    description: {
      en: 'Rooted in Irezumi tradition, Japanese tattoos feature iconic motifs — koi fish, dragons, cherry blossoms — in bold outlines with smooth gradients and rich symbolism.',
      es: 'Con raíces en la tradición Irezumi, los tatuajes japoneses presentan motivos icónicos — koi, dragones, flores de cerezo — con rico simbolismo.',
    },
    shortDesc: { en: 'Timeless Eastern artistry', es: 'Arte oriental atemporal' },
    tags: ['bold', 'colorful', 'spiritual', 'large-scale'],
    painLevel: 4,
    bestFor: {
      en: ['Full sleeve seekers', 'Back piece lovers', 'Those drawn to symbolism'],
      es: ['Buscadores de sleeve completo', 'Amantes de las piezas de espalda', 'Atraídos por el simbolismo'],
    },
    bestPlacements: ['shoulder', 'thigh', 'chest', 'spine'],
    healing: { en: 'Moderate to hard — large color areas need careful aftercare and multiple sessions.', es: 'Moderada a difícil — las áreas de color grandes necesitan cuidado posterior cuidadoso.' },
    cardTagline: { en: 'Art that tells a story.', es: 'Arte que cuenta una historia.' },
    color: '#1a0a2e',
    // Woman with japanese style tattoo
    image: 'https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?w=800&q=80&fit=crop',
  },
  {
    slug: 'realism',
    name: { en: 'Realism', es: 'Realismo' },
    description: {
      en: 'Photorealistic tattoos that replicate portraits, nature, and objects with stunning accuracy. Requires a highly skilled artist and is one of the most technically demanding styles.',
      es: 'Tatuajes fotorrealistas que replican retratos, naturaleza y objetos con una precisión impresionante. Requiere un artista altamente cualificado.',
    },
    shortDesc: { en: 'Photo-perfect on skin', es: 'Perfección fotográfica en piel' },
    tags: ['detailed', 'portrait', 'photorealistic', 'large-scale'],
    painLevel: 4,
    bestFor: {
      en: ['Portrait lovers', 'Nature enthusiasts', 'Those who want a statement piece'],
      es: ['Amantes de los retratos', 'Entusiastas de la naturaleza', 'Los que quieren una pieza llamativa'],
    },
    bestPlacements: ['forearm', 'thigh', 'chest', 'shoulder'],
    healing: { en: 'Hard — dense shading and multiple passes. Proper aftercare is critical.', es: 'Difícil — sombreado denso y múltiples pasadas. El cuidado posterior adecuado es crítico.' },
    cardTagline: { en: 'Reality, reimagined.', es: 'La realidad, reinventada.' },
    color: '#0d1117',
    // Tattooed woman portrait
    image: 'https://images.unsplash.com/photo-1588516903720-8ceb67f96d2c?w=800&q=80&fit=crop',
  },
  {
    slug: 'geometric',
    name: { en: 'Geometric', es: 'Geométrico' },
    description: {
      en: 'Precise patterns, shapes, and sacred geometry form intricate compositions. Often combined with dotwork, geometric tattoos carry mathematical beauty and spiritual meaning.',
      es: 'Patrones precisos, formas y geometría sagrada forman composiciones intrincadas. A menudo combinado con puntillismo, llevan belleza matemática.',
    },
    shortDesc: { en: 'Sacred shapes, perfect lines', es: 'Formas sagradas, líneas perfectas' },
    tags: ['minimal', 'dark', 'spiritual', 'graphic'],
    painLevel: 2,
    bestFor: {
      en: ['Minimalists', 'Sacred geometry fans', 'Those who love symmetry'],
      es: ['Minimalistas', 'Fanáticos de la geometría sagrada', 'Amantes de la simetría'],
    },
    bestPlacements: ['forearm', 'chest', 'shoulder', 'inner-arm'],
    healing: { en: 'Easy — clean lines and minimal shading heal well.', es: 'Fácil — las líneas limpias y el sombreado mínimo sanan bien.' },
    cardTagline: { en: 'Find the pattern.', es: 'Encuentra el patrón.' },
    color: '#0a1a2e',
    // Woman with geometric tattoo on arm
    image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&q=80&fit=crop',
  },
  {
    slug: 'watercolor',
    name: { en: 'Watercolor', es: 'Acuarela' },
    description: {
      en: 'Vibrant, paint-like tattoos that mimic watercolor artwork with soft edges, splashes, and color bleeds. Artistic and expressive, these designs feel painterly and unique.',
      es: 'Tatuajes vibrantes y pictóricos que imitan obras de acuarela con bordes suaves, salpicaduras y mezclas de color. Artísticos y expresivos.',
    },
    shortDesc: { en: 'Paint it on your skin', es: 'Pinta en tu piel' },
    tags: ['colorful', 'feminine', 'artistic', 'unique'],
    painLevel: 2,
    bestFor: {
      en: ['Art lovers', 'Color enthusiasts', 'Those wanting something unique'],
      es: ['Amantes del arte', 'Entusiastas del color', 'Los que quieren algo único'],
    },
    bestPlacements: ['forearm', 'ribcage', 'shoulder', 'ankle'],
    healing: { en: 'Moderate — colors may fade faster; sunscreen is essential for longevity.', es: 'Moderada — los colores pueden desvanecerse más rápido; el protector solar es esencial.' },
    cardTagline: { en: 'Wear your art.', es: 'Viste tu arte.' },
    color: '#1a0a2a',
    // Woman with colorful tattoo
    image: 'https://images.unsplash.com/photo-1583461923174-b85a1bc54e01?w=800&q=80&fit=crop',
  },
  {
    slug: 'dotwork',
    name: { en: 'Dotwork', es: 'Puntillismo' },
    description: {
      en: 'Thousands of tiny dots create shading, texture, and form. Dotwork is meditative in its process and stunning in its result, often used for mandalas and geometric pieces.',
      es: 'Miles de pequeños puntos crean sombreado, textura y forma. El puntillismo es meditativo en su proceso y deslumbrante en su resultado.',
    },
    shortDesc: { en: 'Dots that tell stories', es: 'Puntos que cuentan historias' },
    tags: ['minimal', 'spiritual', 'graphic', 'detailed'],
    painLevel: 2,
    bestFor: {
      en: ['Mandala lovers', 'Detail enthusiasts', 'Those wanting texture'],
      es: ['Amantes del mandala', 'Entusiastas del detalle', 'Los que quieren textura'],
    },
    bestPlacements: ['forearm', 'chest', 'spine', 'shoulder'],
    healing: { en: 'Easy — single needle work heals cleanly. Keep moisturized.', es: 'Fácil — el trabajo con aguja simple sana limpiamente. Mantén hidratado.' },
    cardTagline: { en: 'Every dot has a purpose.', es: 'Cada punto tiene un propósito.' },
    color: '#111111',
    // Woman showing mandala dotwork tattoo
    image: 'https://images.unsplash.com/photo-1560439514-e960a3ef5019?w=800&q=80&fit=crop',
  },
  {
    slug: 'minimalist',
    name: { en: 'Minimalist', es: 'Minimalista' },
    description: {
      en: 'Simple, clean designs with a "less is more" philosophy. Small symbols, single lines, and sparse compositions make a big impact through restraint and intentionality.',
      es: 'Diseños simples y limpios con la filosofía de "menos es más". Pequeños símbolos, líneas únicas y composiciones escasas generan un gran impacto.',
    },
    shortDesc: { en: 'Less ink, more meaning', es: 'Menos tinta, más significado' },
    tags: ['minimal', 'subtle', 'elegant', 'feminine'],
    painLevel: 1,
    bestFor: {
      en: ['First timers', 'Workplace-friendly seekers', 'Those who want subtlety'],
      es: ['Primerízos', 'Los que buscan discreción laboral', 'Los que quieren sutileza'],
    },
    bestPlacements: ['inner-arm', 'ankle', 'spine', 'ribcage'],
    healing: { en: 'Very easy — minimal ink, fast heal. Great for sensitive skin.', es: 'Muy fácil — mínima tinta, cicatrización rápida. Ideal para piel sensible.' },
    cardTagline: { en: 'Simple. Intentional. Yours.', es: 'Simple. Intencional. Tuyo.' },
    color: '#1a1a1a',
    // Woman with small minimalist tattoo on wrist
    image: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=800&q=80&fit=crop',
  },
]

export const allTags = [...new Set(styles.flatMap(s => s.tags))]
