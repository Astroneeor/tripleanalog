# BMEN 388 — Neonatal sepsis biosensor (slide deck)

Vite + vanilla JavaScript presentation: arrow-key navigation, slide transitions, a few interactive slides. Styling lives in `src/style.css`; slide content and order are in `src/main.js`.

## Quick start

```bash
cd presentation
npm install
npm run dev
```

Open the URL Vite prints (typically `http://localhost:5173`).

## Build (for hosting)

```bash
npm run build
```

Output is written to `dist/`. `vite.config.js` sets `base: './'` so assets work from a subdirectory (e.g. Cloudflare Pages).

```bash
npm run preview
```

Preview the production build locally.

## Deploy

Upload the contents of `dist/` to a static host (Cloudflare Pages, Netlify, Vercel, etc.). Point the build command to `npm run build` and the output directory to `dist` if the platform asks.

## Navigation

- **Right / Down / Space** — next slide  
- **Left / Up** — previous slide  

Some slides use an extra in-slide step (e.g. biomarker highlight) before advancing.

## Assets (`public/`)

Files here are served from the site root (`/filename`).

| File | Role |
|------|------|
| `Sepsis circuit v20.asc` | LTSpice netlist; resistor values referenced in copy |
| `circuit-main.jpeg` | Full schematic on **Circuit Overview** |
| `circuit-mux-zoom.png` | MUX (ADG1408) zoom, side-by-side with main |
| `BeforeandAfterOpAmp.png` | Analog front-end slide — combined **before + after** image (before shown first) |
| `AfterOpAmp.jpeg` | Analog front-end slide — after-amplification / filtered output image |

## Project layout

```
presentation/
├── index.html
├── package.json
├── vite.config.js
├── public/           # static assets (images, .asc)
└── src/
    ├── main.js       # slides, navigation, interactives
    └── style.css
```

## Credits

BMEN 388 · University of Calgary — team listed on the title slide.
