# tripleanalog

Repository for a **BMEN 388 Biomedical Signals** course project: a neonatal sepsis **point-of-care biosensor** concept with a triple-biomarker (IL-6, PCT, CRP) analog signal chain, LTSpice-based design values, and a slide deck for the presentation.

## Presentation (slide deck)

The deployable **Vite + vanilla JS** deck lives in **`presentation/`**. It covers the clinical problem, biomarker rationale, design iterations, full schematic screenshots (including MUX detail), TIA / bandpass front-end, multiplexer + qualitative ADC framing, and conclusions.

- **Run locally:** `cd presentation && npm install && npm run dev`
- **Production build:** `cd presentation && npm run build` → output in `presentation/dist/` (configured with relative `base` for static hosts).
- **Details:** see **[`presentation/README.md`](presentation/README.md)** for navigation, `public/` assets, and layout.

Course / team credits appear on the title slide inside the deck.

## Other material

- **`388 Signals Research/`** — research notes and references used while building content (not the app itself).
- **`bmen388-presentation/`** — older static attempt; the active deck is under **`presentation/`**.

## License / course use

Academic project (University of Calgary · BMEN 388). Adapt as needed for course submission and hosting (e.g. Cloudflare Pages).
