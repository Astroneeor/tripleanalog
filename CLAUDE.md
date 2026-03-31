# BMEN 388 — Neonatal Sepsis Biosensor Presentation

## Project Overview
A 15-slide Vite + vanilla JS presentation for a BMEN 388 Biomedical Signals course project. Arrow-key navigation, staggered animations, interactive elements. Dark lab aesthetic.

## Tech Stack
- **Vite** (vanilla JS, no framework)
- **Google Fonts**: Playfair Display, JetBrains Mono, Cormorant Garamond
- Single `index.html` + `src/main.js` + `src/style.css`

## File Structure
```
bmen388-presentation/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.js       ← all slide logic + engine
    └── style.css     ← all styles
```

## Design System

### Colors (CSS Variables)
```css
--bg: #05080f
--bg2: #080d1a
--surface: #0d1526
--surface2: #121e35
--border: rgba(0, 200, 180, 0.15)
--border-bright: rgba(0, 220, 200, 0.4)
--cyan: #00dcc8          /* primary accent */
--gold: #e8c56a          /* secondary accent */
--red: #ff6b7a           /* rejection / warning */
--text: #e2eaf8
--text-dim: rgba(226, 234, 248, 0.55)
--text-muted: rgba(226, 234, 248, 0.3)
```

### Fonts
```css
--font-display: 'Playfair Display'    /* headings */
--font-mono: 'JetBrains Mono'         /* labels, data, code */
--font-body: 'Cormorant Garamond'     /* body copy */
```

### Background Effects
- Animated dot-grid drifting at 48px spacing (CSS `background-image` with `linear-gradient`)
- Noise texture overlay via inline SVG `feTurbulence` filter on `body::before`
- Glow orbs: `.orb-cyan` and `.orb-gold` — absolute positioned divs with `filter: blur(80px)`

---

## Slide Engine

### Core Concept
All slides live in a `slides[]` array. Each slide is an object:
```js
{
  id: 'slide-id',
  section: 'intro' | 'biomarker' | 'design' | 'circuit',
  render: () => `<html string>`,   // returns full slide HTML
  onActivate: () => {}             // optional — runs when slide becomes active
}
```

### Navigation
```js
let current = 0

function navigate(dir) {
  // add .exiting to current slide (slides left)
  // add .active to next slide (slides in from right)
  // call slides[current].onActivate() if defined
}

// Keyboard bindings
ArrowRight / ArrowDown / Space → navigate(1)
ArrowLeft / ArrowUp           → navigate(-1)
```

### Slide Transition CSS
```css
.slide {
  position: absolute; inset: 0;
  opacity: 0; transform: translateX(60px);
  transition: opacity 0.55s cubic-bezier(0.4,0,0.2,1),
              transform 0.55s cubic-bezier(0.4,0,0.2,1);
}
.slide.active   { opacity: 1; transform: translateX(0); }
.slide.exiting  { opacity: 0; transform: translateX(-60px); }
```

### Stagger Animation
Wrap children in `.stagger`. Children animate in with delays when parent slide becomes `.active`:
```css
.stagger > *:nth-child(1) { transition-delay: 0.1s; }
.stagger > *:nth-child(2) { transition-delay: 0.2s; }
/* ... up to nth-child(8) */
```

---

## Slide List (15 slides)

| # | ID | Section | Title | Time |
|---|-----|---------|-------|------|
| 1 | `title` | intro | Title + team credits | — |
| 2 | `problem` | intro | Neonatal sepsis kills 3M/year | 30s |
| 3 | `current-models` | intro | State of the art biosensor approaches | 30s |
| 4 | `our-gap` | intro | The design gap we're filling | 30s |
| 5 | `3pt-sensor` | biomarker | Why a three-point sensor? | 30s |
| 6 | `biomarkers` | biomarker | IL-6, PCT, CRP — which and why | 1m |
| 7 | `markers-deep` | biomarker | Deep dive: what / why / how per marker | 2m |
| 8 | `values-parallel` | biomarker | Circuit values + interactive concentration slider | 1m |
| 9 | `design-process` | design | Meeting timeline / design process | 30s |
| 10 | `versions` | design | V1 → V4 design iterations | 30s |
| 11 | `why-final` | design | Why V4 is the right answer | 30s |
| 12 | `circuit-overview` | circuit | Full signal chain end-to-end | 20s |
| 13 | `input-circuit` | circuit | EIS input stage + Randles model | 30s |
| 14 | `mux-output` | circuit | MUX + output values interactive panel | 1m |
| 15 | `learnings` | circuit | Conclusions + limitations | — |

---

## Key Components

### Section Tag
```html
<div class="section-tag">slide 05 · Biomarker Strategy</div>
```
Cyan pill with animated pulse dot. Always first child in `.stagger`.

### Card
```html
<div class="card">               <!-- cyan top border -->
<div class="card gold-accent">   <!-- gold top border -->
<div class="card red-accent">    <!-- red top border -->
```

### Stat Box
```html
<div class="stat-box">
  <div class="stat-num">3M</div>           <!-- cyan glow -->
  <div class="stat-num gold">72h</div>     <!-- gold glow -->
  <div class="stat-label">Deaths / year</div>
</div>
```

### Signal Chain
```html
<div class="signal-chain">
  <div class="chain-node">Biosensor<div class="cn-label">Randles cell</div></div>
  <div class="chain-arrow">→</div>
  <!-- repeat -->
</div>
```
Arrows animate with `translateX` pulse.

### Biomarker Table
```html
<table class="bm-table">
  <thead><tr><th>Marker</th><th>Role</th>...</tr></thead>
  <tbody>
    <tr>
      <td class="bm-name">IL-6</td>     <!-- cyan -->
      <td class="bm-time">2–4 h</td>    <!-- gold mono -->
      ...
    </tr>
  </tbody>
</table>
```

### Version Cards (Design Iterations)
```html
<div class="version-row">
  <div class="version-card rejected">   <!-- ::after → "REJECTED" in red -->
  <div class="version-card active-v">   <!-- ::after → "FINAL" in cyan -->
</div>
```

### Diagram Placeholder
```html
<div class="diagram-placeholder" style="height:200px;">
  <div class="diagram-icon">⚡</div>
  <div class="diagram-label">Insert screenshot here</div>
</div>
```
Hatched diagonal pattern background. Replace with `<img>` when you have LTSpice screenshots.

### Timeline
```html
<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-dot"></div>        <!-- cyan -->
    <div class="timeline-dot gold"></div>   <!-- gold -->
    <div>content</div>
  </div>
</div>
```
Vertical gradient line runs behind via `::before` on `.timeline`.

### MUX Visual (Slide 14)
```html
<div class="mux-visual">
  <div class="channel-stack">
    <div class="ch-box selected" onclick="selectCh('IL-6')">IL-6 Ch</div>
    ...
  </div>
  <div class="mux-wire"></div>
  <div class="mux-box">MUX<br>4:1</div>
  <div class="mux-wire"></div>
  <div class="mux-out">V_out_MUX</div>
</div>
```

### Readout Panel
```css
.readout-val.ok   { color: #4ade80; }
.readout-val.warn { color: var(--gold); }
.readout-val.crit { color: var(--red); animation: blink 1s step-end infinite; }
```

---

## Interactive Slides

### Slide 8 — Concentration Slider (IL-6 channel)
Uses `onActivate()`. Langmuir binding equation:
```js
const Rct = Rct0 / (1 + CONC / Kd)           // Rct0=5000, Kd=1
const Cdl = Cdl0 * (1 + 0.5 * CONC / Kd)     // Cdl0=10e-12
const Vout = (Rct / (Rct + 1000)) * 1         // voltage divider approx
```
Updates `#rct-out`, `#cdl-out`, `#vout-out` live on `input` event.

### Slide 14 — MUX Channel Selector
`window.selectCh(ch)` is set in `onActivate()`:
```js
window.selectCh = (ch) => {
  const data = {
    'IL-6': { conc: '8.5 ng/mL', rct: '588 Ω', vout: '369 mV', ... },
    'CRP':  { ... },
    'PCT':  { ... },
  }
  // update readout panel DOM
}
```
Called from inline `onclick` in the rendered HTML.

---

## Fixed UI Elements
```html
<div id="progress"></div>          <!-- top bar, width = current/total % -->
<div id="nav-ui">                  <!-- bottom right: counter + ← → buttons -->
<div id="key-hint">                <!-- bottom left: ← → keyboard hint -->
```

Progress bar uses gradient `var(--cyan) → var(--gold)` with cyan box-shadow glow.

---

## How to Run
```bash
npm install
npm run dev       # localhost:5173
npm run build     # outputs to /dist
```

To host: upload `/dist` contents to **Cloudflare Pages**, **Vercel**, or **Netlify**. Since `vite.config.js` sets `base: './'`, all asset paths are relative — works from any subdirectory.

---

## Content Notes

### Biomarker values
| Marker | Kd | Rct₀ | Cdl₀ | Probe freq |
|--------|----|------|------|-----------|
| IL-6 | 1 ng/mL | 5 kΩ | 10 pF | ~10 Hz |
| CRP | 100 ng/mL | 50 kΩ | 47 pF | ~100 Hz |
| PCT | 5 ng/mL | 500 kΩ | 22 pF | ~10 Hz |

### Design iteration versions
- **V1**: Antibody + amperometric → rejected (cold chain, short shelf life)
- **V2**: Single-channel EIS (PCT only) → too limited
- **V3**: Triple biomarker + analog switch → LTSpice SW component limitations
- **V4 (final)**: Three parallel TIAs + 4:1 behavioral MUX

### Signal chain (slide 12)
Blood Sample → EIS Aptasensor → AC Excitation (V₁=1V) → TIA LT1677 (Rf=100kΩ) → Bandpass Filter (fc≈5Hz) → 4:1 MUX → ADC 12-bit → Display

### Key equations
```
Rct(C) = Rct₀ / (1 + C/Kd)
Cdl(C) = Cdl₀ × (1 + 0.5·C/Kd)
V_out  = I_sensor × Rf
fc     = 1 / (2π · R · C) = 5 Hz with R=31.8kΩ, C=1µF
```

### Diagram placeholders to replace
- Slide 12: LTSpice full schematic screenshot
- Slide 13: BiosensorEIS custom component / Randles cell diagram

### Team
- Neeor Alam
- Cassandra Len De Vera
- Hannah Nguyen
- Calumn Hickerson

University of Calgary · BMEN 388 · March 2026