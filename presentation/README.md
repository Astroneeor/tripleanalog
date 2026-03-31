# BMEN 388 — Neonatal Sepsis Biosensor Presentation

A 15-slide interactive presentation for the BMEN 388 Biomedical Signals course project at the University of Calgary.

## What is this?

A Vite + vanilla JS slide deck presenting a conceptual three-biomarker (IL-6, PCT, CRP) electrochemical aptasensor platform for point-of-care neonatal sepsis detection. Arrow-key navigation, staggered animations, interactive EIS parameter sliders, and a MUX channel selector.

## Quick Start

```bash
npm install
npm run dev       # http://localhost:5173
```

## Build & Deploy

```bash
npm run build     # outputs to /dist
```

Upload `/dist` to Cloudflare Pages, Vercel, or Netlify. Asset paths are relative (`base: './'`), so it works from any subdirectory.

## Navigation

| Key | Action |
|-----|--------|
| `→` / `↓` / `Space` | Next slide |
| `←` / `↑` | Previous slide |

On-screen arrow buttons and a progress bar are also provided.

## Interactive Slides

- **Slide 8** — Drag the IL-6 concentration slider to see Rct, Cdl, and Vout update live via the Langmuir binding equation.
- **Slide 14** — Click IL-6 / CRP / PCT channels on the MUX diagram to see simulated ADC output values for a septic infant sample.

## Team

Neeor Alam · Cassandra Len De Vera · Hannah Nguyen · Calumn Hickerson

University of Calgary · BMEN 388 · March 2026
