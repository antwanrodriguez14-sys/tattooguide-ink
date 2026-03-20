# TattooGuide.ink

Bilingual (EN/ES) tattoo style & placement guide website. Drives organic Pinterest traffic and converts visitors into consultation clients via Instagram DM.

**Live:** [tattooguide.ink](https://tattooguide.ink) · **Instagram:** [@ar.inks](https://instagram.com/ar.inks)

## Stack

- React + TypeScript + Vite
- Tailwind CSS v3
- react-router-dom v6
- react-helmet-async
- html2canvas (card generator)

## Features

- 8 tattoo styles with full detail pages (SEO optimized)
- Interactive body placement map with pain levels
- 5-question style quiz with result card
- Pinterest card generator (1000×1500px PNG download)
- Bilingual EN/ES with localStorage persistence
- Sticky booking bar → Instagram DM CTA

## Dev Setup

```bash
npm install
npm run dev
```

## Deploy (Vercel)

Push to GitHub → connect repo in Vercel → auto-deploy. No env vars needed.

```bash
npm run build   # outputs to /dist
```

## Project Structure

```
src/
  components/   Navbar, BookingBar, StyleCard, PlacementMap, CardGenerator
  pages/        Home, Styles, StyleDetail, Placement, Quiz, QuizResult
  data/         styles.ts, placements.ts, quiz.ts
  context/      LanguageContext.tsx
  hooks/        useLanguage.ts
```

## Adding Content

To add a new style, append to `src/data/styles.ts` following the `TattooStyle` interface.
To add a placement zone, append to `src/data/placements.ts` and set `svgX/svgY` coordinates.
