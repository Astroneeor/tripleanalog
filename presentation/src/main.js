import './style.css'

// LTSpice `public/Sepsis circuit v20.asc` — resistor / cap values used in deck copy.
// Rct1/cdl1, Rct2/cdl2, Rct3/cdl3 are mapped to IL-6 / PCT / CRP in the same order as netlist InstNames.
const SCHEMATIC_V20 = {
  channels: [
    { id: 'IL-6', rct: '200 kΩ', cdl: '22 pF', rctOhm: 200e3, cdlF: 22e-12 },
    { id: 'PCT', rct: '300 kΩ', cdl: '47 pF', rctOhm: 300e3, cdlF: 47e-12 },
    { id: 'CRP', rct: '100 kΩ', cdl: '10 pF', rctOhm: 100e3, cdlF: 10e-12 },
  ],
  rf: '100 kΩ',
  rhp: '160 kΩ',
  rlp: '16 kΩ',
  cBand: '100 nF',
  cComp: '50 pF',
  mux: 'ADG1408',
  ac: '~1 V peak · 100 Hz (V1)',
  supply: '3.3 V · 1.65 V ref',
}

// Band corners from R–C pairs (first-order): ~10 Hz high-pass, ~100 Hz low-pass (order-of-magnitude).
const SCHEMATIC_NOTES =
  'Bandpass ~10–100 Hz (from Rhp ' +
  SCHEMATIC_V20.rhp +
  ', Rlp ' +
  SCHEMATIC_V20.rlp +
  ', C ' +
  SCHEMATIC_V20.cBand +
  ' — approximate)'

// Assets in `presentation/public/`: full schematic + MUX detail
const CIRCUIT_IMG_MAIN = '/circuit-main.jpeg'
const CIRCUIT_IMG_MUX = '/circuit-mux-zoom.png'
const OPAMP_IMG_BEFORE_AFTER = '/BeforeandAfterOpAmp.png'
const OPAMP_IMG_AFTER_AMP = '/AfterOpAmp.jpeg'

// ─── SLIDE DEFINITIONS ────────────────────────────────
const slideDefs = [

  // ─── SLIDE 1: TITLE ───────────────────────────────
  {
    id: 'title',
    section: 'intro',
    render: () => `
      <div class="slide-bg"></div>
      <div class="orb orb-cyan" style="width:600px;height:600px;top:-100px;right:-200px;"></div>
      <div class="orb orb-gold" style="width:400px;height:400px;bottom:-100px;left:-100px;"></div>
      <div class="slide-inner" style="justify-content:center;">
        <div class="stagger">
          <div class="section-tag">BMEN 388 · Biomedical Signals</div>
          <h1 class="display-title" style="font-size:clamp(38px,5.5vw,72px);margin-bottom:24px;max-width:820px;">
            Point-of-Care <em>Biosensor</em><br>
            for Neonatal <span class="gold">Sepsis</span> Detection
          </h1>
          <div class="rule"></div>
          <div class="team-grid">
            ${['Neeor Alam','Cassandra Len De Vera','Hannah Nguyen','Calumn Hickerson'].map((n,i) => `
            <div class="team-card" style="animation-delay:${0.6+i*0.1}s">
              <div class="team-name">${n.split(' ')[0]}<br><span style="font-weight:300;font-size:15px;">${n.split(' ').slice(1).join(' ')}</span></div>
            </div>`).join('')}
          </div>
          <p class="mono-label" style="margin-top:28px;opacity:0.5;">University of Calgary · March 2026</p>
        </div>
      </div>
    `
  },

  // ─── SLIDE 2: THE PROBLEM ──────────────────────────
  {
    id: 'problem',
    section: 'intro',
    render: () => `
      <div class="slide-bg"></div>
      <div class="orb orb-cyan" style="width:500px;height:500px;top:-80px;left:-150px;"></div>
      <div class="slide-inner" style="justify-content:center;">
        <div class="stagger">
          <div class="section-tag">Problem Statement</div>
          <h2 class="slide-title">Neonatal sepsis kills <em>3 million</em> children a year</h2>
          <p class="slide-subtitle">The window for intervention is hours, not days.</p>
          <div class="two-col" style="gap:24px;">
            <div>
              <div class="rule"></div>
              <ul class="slide-bullets">
                <li style="font-size:24px;">Life-threatening infection in infants <strong style="color:var(--text);">&lt; 28 days old</strong></li>
                <li style="font-size:26px;">Blood cultures: <strong style="color:var(--text);">24–72 hours</strong> turnaround</li>
                <li style="font-size:26px;">Current POC: <strong style="color:var(--text);">single marker</strong>, binary output</li>
              </ul>
            </div>
            <div style="display:flex;flex-direction:column;gap:12px;">
              <div class="stat-box">
                <div class="stat-num">3M</div>
                <div class="stat-label">Neonatal deaths / year</div>
              </div>
              <div class="stat-box">
                <div class="stat-num gold">72h</div>
                <div class="stat-label">Blood culture turnaround</div>
              </div>
              <div class="stat-box">
                <div class="stat-num" style="font-size:32px;">1 marker</div>
                <div class="stat-label">Current POC capability</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },

  // ─── SLIDE 3: CURRENT MODELS ───────────────────────
  {
    id: 'current-models',
    section: 'intro',
    render: () => `
      <div class="slide-bg"></div>
      <div class="slide-inner" style="justify-content:center;">
        <div class="stagger">
          <div class="section-tag">State of the Art</div>
          <h2 class="slide-title">Existing Biosensor <em>Approaches</em></h2>
          <p class="slide-subtitle">Current tools still miss early, reliable decision windows.</p>
          <div class="card red-accent" style="padding:20px 24px;margin-bottom:18px;">
            <div class="v-label" style="color:var(--red);">Core Clinical Reality</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
              <div class="card" style="padding:16px;background:rgba(255,107,122,0.06);border-color:rgba(255,107,122,0.25);">
                <div class="mono-label" style="color:var(--red);margin-bottom:6px;">Gap 1</div>
                <p class="body-text" style="font-size:18px;">No tool consistently diagnoses sepsis <strong style="color:var(--text);">early enough</strong>.</p>
              </div>
              <div class="card" style="padding:16px;background:rgba(255,107,122,0.06);border-color:rgba(255,107,122,0.25);">
                <div class="mono-label" style="color:var(--red);margin-bottom:6px;">Gap 2</div>
                <p class="body-text" style="font-size:18px;">No single biomarker is reliable enough alone.</p>
              </div>
            </div>
          </div>
          <div class="card gold-accent" style="padding:20px 22px;">
            <div class="v-label" style="color:var(--gold);">Decision Basis</div>
            <ul class="slide-bullets" style="font-size:24px;">
              <li>No single marker can reliably represent sepsis status</li>
              <li>Need strong <strong style="color:var(--text);">sensitivity + PPV/NPV</strong> for early screening</li>
            </ul>
          </div>
        </div>
      </div>
    `
  },

  // ─── SLIDE 4: OUR GAP ──────────────────────────────
  {
    id: 'our-gap',
    section: 'intro',
    render: () => `
      <div class="slide-bg"></div>
      <div class="orb orb-gold" style="width:500px;height:500px;bottom:-100px;right:-100px;"></div>
      <div class="slide-inner" style="justify-content:center;">
        <div class="stagger">
          <div class="section-tag">Design Gap</div>
          <h2 class="slide-title">The gap we're <em>filling</em></h2>
          <div class="card" style="padding:28px 30px;margin-bottom:20px;background:rgba(232,197,106,0.06);border-color:rgba(232,197,106,0.3);">
            <div class="mono-label" style="color:var(--gold);margin-bottom:10px;">Design Challenge</div>
            <ul class="slide-bullets">
              <li>No current POC tool maps <strong style="color:var(--text);">sepsis timeline progression</strong></li>
              <li>Clinicians need both presence and stage, not binary output only</li>
            </ul>
          </div>
          <div class="two-col">
            <div>
              <p class="mono-label" style="margin-bottom:10px;color:var(--red);">current standard</p>
              <div class="card red-accent">
                <p class="body-text" style="font-size:24px;">Single marker \u2192 binary result \u2192 no timeline</p>
              </div>
            </div>
            <div>
              <p class="mono-label" style="margin-bottom:10px;color:var(--cyan);">our proposal</p>
              <div class="card">
                <p class="body-text" style="font-size:24px;">Three markers \u2192 integrated readout \u2192 earlier intervention</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },

  // ─── SLIDE 5: 3-POINT SENSOR ───────────────────────
  {
    id: '3pt-sensor',
    section: 'biomarker',
    render: () => `
      <div class="slide-bg"></div>
      <div class="slide-inner" style="justify-content:center;">
        <div class="stagger">
          <div class="section-tag">Biomarker Strategy</div>
          <h2 class="slide-title">Why a <em>three-point</em> sensor?</h2>
          <p class="slide-subtitle" style="font-size:clamp(30px,3vw,40px);">One biomarker is a snapshot. Three biomarkers are a story.</p>
          <div class="card" style="padding:28px;">
            <div class="diagram-placeholder" style="height:200px;" id="timeline-viz">
              <div style="position:relative;z-index:1;width:100%;padding:0 20px;">
                <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                  <span class="mono-label">0h</span>
                  <span class="mono-label">12h</span>
                  <span class="mono-label">24h</span>
                  <span class="mono-label">48h</span>
                </div>
                <div style="position:relative;height:100px;">
                  ${[
                    { label:'IL-6', color:'#00dcc8', path:'M0,90 C20,80 40,10 80,5 C120,0 140,20 180,40 C220,60 260,80 320,90', delay:'0.3s' },
                    { label:'PCT', color:'#e8c56a', path:'M0,90 C40,88 80,85 120,30 C160,0 200,10 260,20 C300,30 320,50 380,70 C420,80 460,85 480,90', delay:'0.6s' },
                    { label:'CRP', color:'#ff9980', path:'M0,90 C60,90 100,88 180,70 C260,40 300,20 380,10 C440,5 460,8 540,20 L540,90', delay:'0.9s' },
                  ].map(b => `
                    <svg style="position:absolute;inset:0;width:100%;height:100%;overflow:visible;" viewBox="0 0 540 100">
                      <path d="${b.path}" fill="none" stroke="${b.color}" stroke-width="2.5" opacity="0.85"
                        stroke-dasharray="1000" stroke-dashoffset="1000"
                        style="animation:draw-line 1.5s ease forwards;animation-delay:${b.delay}">
                      </path>
                      <text x="10" y="85" fill="${b.color}" font-family="JetBrains Mono" font-size="10" font-weight="700">${b.label}</text>
                    </svg>`).join('')}
                </div>
                <p class="mono-label" style="text-align:center;margin-top:4px;opacity:0.9;">time post-infection \u2192</p>
                <p class="body-text" style="text-align:center;font-size:20px;margin-top:8px;">IL-6 spikes first, PCT follows, and CRP rises later for staging support.</p>
              </div>
            </div>
          </div>
          <ul class="slide-bullets" style="margin-top:16px;">
            <li>Simultaneous readout determines <strong style="color:var(--text);">onset time</strong>, severity trend, and treatment response</li>
            <li>A single-marker device structurally cannot provide this</li>
            <li>Detection chemistry uses antibody-based recognition across all three channels</li>
          </ul>
        </div>
      </div>
      <style>
        @keyframes draw-line {
          to { stroke-dashoffset: 0; }
        }
      </style>
    `
  },

  // ─── SLIDE 6: BIOMARKERS CHOSEN ────────────────────
  {
    id: 'biomarkers',
    section: 'biomarker',
    render: () => `
      <div class="slide-bg"></div>
      <div class="slide-inner" style="justify-content:center;">
        <div class="stagger">
          <div class="section-tag">Biomarker Selection</div>
          <h2 class="slide-title"><em>Which</em> markers, and why?</h2>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;">
            ${[
              { name:'IL-6', color:'var(--cyan)', window:'2–4 h', role:'Earliest inflammatory responder', value:'Best early sensitivity', active:false, focus:'Early spike enables early detection.' },
              { name:'PCT', color:'var(--gold)', window:'8–24 h', role:'Bacterial-sepsis specific', value:'Highest decision specificity', active:false, focus:'High specificity improves bacterial-risk confidence.' },
              { name:'CRP', color:'#ff9980', window:'24–48 h', role:'Late progression marker', value:'Strong monitoring support', active:true, focus:'Late sustained rise supports progression monitoring.' },
            ].map(m => `
            <div class="card marker-point ${m.active ? 'active' : ''}" style="padding:20px;border-color:${m.color}66;background:${m.color}12;transition:border-color .25s ease, box-shadow .25s ease, background .25s ease;" data-marker="${m.name}" data-color="${m.color}">
              <div class="marker-name" style="font-family:var(--font-display);font-size:34px;font-weight:700;color:var(--text);margin-bottom:10px;transition:color .25s ease,font-weight .25s ease;">${m.name}</div>
              <p class="mono-label" style="color:${m.color};margin-bottom:6px;">Time Window</p>
              <p class="body-text" style="font-size:19px;margin-bottom:10px;">${m.window}</p>
              <p class="body-text" style="font-size:18px;margin-bottom:6px;">${m.role}</p>
              <p class="body-text marker-value" style="font-size:18px;color:var(--text);font-weight:700;transition:color .25s ease,font-weight .25s ease;" data-default="${m.value}" data-focus="${m.focus}" data-color="${m.color}">${m.value}</p>
            </div>`).join('')}
          </div>
        </div>
      </div>
    `,
    onActivate: () => {
      const points = Array.from(document.querySelectorAll('.marker-point'))
      if (!points.length) return
      if (window.__markerTimers) window.__markerTimers.forEach((t) => clearTimeout(t))
      window.__markerTimers = []
      window.__markerStepDone = false
      const paint = (activeIdx = null, allActive = false) => {
        points.forEach((el, i) => {
          const active = allActive || i === activeIdx
          const color = el.dataset.color
          const nameEl = el.querySelector('.marker-name')
          const valueEl = el.querySelector('.marker-value')
          if (nameEl) {
            nameEl.style.color = active ? color : 'var(--text)'
            nameEl.style.fontWeight = active ? '900' : '700'
          }
          if (valueEl) {
            valueEl.textContent = active ? valueEl.dataset.focus : valueEl.dataset.default
            valueEl.style.color = active ? color : 'var(--text)'
            valueEl.style.fontWeight = active ? '800' : '700'
          }
          el.style.boxShadow = active ? `0 0 24px ${color}44` : 'none'
        })
      }
      window.__paintMarkers = paint
      paint(null)
    },
    onAdvance: (dir = 1) => {
      if (dir < 0 || window.__markerStepDone) return false
      const paint = window.__paintMarkers
      if (typeof paint !== 'function') return false
      paint(null, true)
      window.__markerStepDone = true
      return true
    }
  },

  // ─── SLIDE 7: IL-6 / PCT / CRP DEEP DIVE ──────────
  {
    id: 'markers-deep',
    section: 'biomarker',
    render: () => `
      <div class="slide-bg"></div>
      <div class="slide-inner" style="justify-content:center;">
        <div class="stagger">
          <div class="section-tag">Marker Deep Dive</div>
          <h2 class="slide-title">IL-6 · PCT · CRP — the <em>decision logic</em></h2>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;">
            ${[
              { name:'IL-6', color:'var(--cyan)', cue:'Earliest spike', use:'Early-warning trigger', note:'Best for onset timing' },
              { name:'PCT', color:'var(--gold)', cue:'Most specific', use:'Confidence for bacterial risk', note:'Supports treatment urgency' },
              { name:'CRP', color:'#ff9980', cue:'Late sustained rise', use:'Progression tracking', note:'Supports monitoring' },
            ].map(m => `
            <div class="card" style="border-color:${m.color}40;padding:20px;">
              <div style="font-family:var(--font-display);font-weight:900;font-size:34px;color:${m.color};margin-bottom:12px;">${m.name}</div>
              <p class="body-text" style="font-size:19px;margin-bottom:8px;">${m.cue}</p>
              <p class="body-text" style="font-size:18px;margin-bottom:8px;">${m.use}</p>
              <div style="font-family:var(--font-mono);font-size:13px;color:${m.color};background:${m.color}15;padding:6px 10px;border-radius:3px;">${m.note}</div>
            </div>`).join('')}
          </div>
        </div>
      </div>
    `
  },

  // ─── SLIDE 8: VALUES IN PARALLEL ──────────────────
  {
    id: 'values-parallel',
    section: 'biomarker',
    render: () => `
      <div class="slide-bg"></div>
      <div class="slide-inner" style="justify-content:center;">
        <div class="stagger">
          <div class="section-tag">Sensor Values</div>
          <h2 class="slide-title">Equivalent circuit values <em>per channel</em></h2>
          <p class="slide-subtitle">R<sub>ct</sub> / C<sub>dl</sub> from LTSpice v20; concentration ↔ impedance still needs calibration.</p>
          <div class="two-col">
            <div>
              <div style="display:grid;grid-template-columns:1fr;gap:10px;">
                ${[
                  { label:'IL-6 (Rct1 / Cdl1)', vals:'Rct ' + SCHEMATIC_V20.channels[0].rct + ' · Cdl ' + SCHEMATIC_V20.channels[0].cdl + ' · Kd TBD', tone:'var(--cyan)' },
                  { label:'PCT (Rct2 / Cdl2)', vals:'Rct ' + SCHEMATIC_V20.channels[1].rct + ' · Cdl ' + SCHEMATIC_V20.channels[1].cdl + ' · Kd TBD', tone:'var(--gold)' },
                  { label:'CRP (Rct3 / Cdl3)', vals:'Rct ' + SCHEMATIC_V20.channels[2].rct + ' · Cdl ' + SCHEMATIC_V20.channels[2].cdl + ' · Kd TBD', tone:'#ff9980' },
                ].map(c => `
                <div class="card" style="padding:16px;border-color:${c.tone}44;">
                  <p class="mono-label" style="color:${c.tone};margin-bottom:6px;">${c.label}</p>
                  <p class="body-text" style="font-size:18px;">${c.vals}</p>
                </div>`).join('')}
              </div>
            </div>
            <div>
              <div class="card" style="padding:20px;">
                <div class="mono-label" style="margin-bottom:12px;">Illustrative: IL-6 channel (not concentration-calibrated)</div>
                <div class="conc-slider-wrap">
                  <label>Relative binding load (0–10, arbitrary units)</label>
                  <input type="range" id="conc-slider" min="0" max="10" step="0.1" value="2">
                  <div class="conc-readout" id="conc-val">2.0 (relative)</div>
                  <div class="conc-interp" id="conc-interp">Higher load \u2192 higher Rct \u2192 lower TIA amplitude (trend)</div>
                </div>
                <div class="rule" style="margin:14px 0;"></div>
                <div class="readout-panel">
                  <div class="readout-header">MODELED FROM V20 NOMINAL (IL-6)</div>
                  <div class="readout-line">
                    <span class="readout-key">Rct (trend)</span>
                    <span class="readout-val ok" id="rct-out">\u2248 200 k\u03A9</span>
                  </div>
                  <div class="readout-line">
                    <span class="readout-key">Cdl (trend)</span>
                    <span class="readout-val ok" id="cdl-out">\u2248 22 pF</span>
                  </div>
                  <div class="readout-line">
                    <span class="readout-key">TIA V (order of)</span>
                    <span class="readout-val ok" id="vout-out">\u2248 0.5 V pk</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    onActivate: () => {
      const slider = document.getElementById('conc-slider')
      if (!slider) return
      const ch = SCHEMATIC_V20.channels[0]
      const update = () => {
        const load = parseFloat(slider.value)
        const rct = ch.rctOhm * (1 + 0.12 * load)
        const cdl = ch.cdlF * (1 + 0.05 * load)
        const vPk = Math.max(0.12, 0.85 - 0.07 * load)
        document.getElementById('conc-val').textContent = load.toFixed(1) + ' (relative)'
        document.getElementById('rct-out').textContent = '\u2248 ' + (rct / 1e3).toFixed(0) + ' k\u03A9'
        document.getElementById('cdl-out').textContent = '\u2248 ' + (cdl * 1e12).toFixed(0) + ' pF'
        document.getElementById('vout-out').textContent = '\u2248 ' + vPk.toFixed(2) + ' V pk'
        const interp = load < 2.5
          ? 'Lower load — larger amplitude (qualitative low-risk trend)'
          : load < 6.5
            ? 'Mid load — medium amplitude'
            : 'Higher load — smaller amplitude (qualitative high-risk trend)'
        document.getElementById('conc-interp').textContent = interp
        const color = load < 3 ? 'ok' : load < 7 ? 'warn' : 'crit'
        ;['rct-out', 'cdl-out', 'vout-out'].forEach((id) => {
          const el = document.getElementById(id)
          el.className = `readout-val ${color}`
        })
      }
      slider.addEventListener('input', update)
      update()
    }
  },

  // ─── SLIDE 9: DESIGN PROCESS ───────────────────────
  {
    id: 'design-process',
    section: 'design',
    render: () => `
      <div class="slide-bg"></div>
      <div class="slide-inner" style="justify-content:center;">
        <div class="stagger">
          <div class="section-tag">Process + Professionalism</div>
          <h2 class="slide-title">How professionalism shaped our <em>process</em></h2>
          <div class="card gold-accent" style="padding:18px 22px;margin-bottom:14px;">
            <ul class="slide-bullets">
              <li>Safety-first design principle: prioritize minimizing false negatives in early screening</li>
              <li>Ethical framing: unnecessary treatment risk is generally lower than missed neonatal sepsis</li>
            </ul>
          </div>
          <div class="timeline">
            ${[
              { date:'Meeting 1 \u2014 Mar 15', title:'Clinical problem definition', body:'Confirmed urgency limits of blood culture \u00B7 set early-detection requirement', dot:''},
              { date:'Meeting 2 \u2014 Mar 20', title:'Reliability criteria set', body:'Selected metrics focus: sensitivity + PPV/NPV + practical bedside usability', dot:'gold'},
              { date:'Meeting 3 \u2014 Mar 25', title:'Design risk review', body:'Compared single/dual/triple marker reliability and documented failure modes', dot:''},
              { date:'Meeting 4 \u2014 Mar 28', title:'Responsible final architecture', body:'Locked tri-marker with transparent limits and risk-based output philosophy', dot:'gold'},
            ].map(t => `
            <div class="timeline-item">
              <div class="timeline-dot ${t.dot}"></div>
              <div>
                <div class="mono-label" style="margin-bottom:3px;">${t.date}</div>
                <div style="font-family:var(--font-display);font-weight:700;font-size:20px;color:var(--text);margin-bottom:5px;">${t.title}</div>
                <p class="body-text" style="font-size:20px;">${t.body}</p>
              </div>
            </div>`).join('')}
          </div>
        </div>
      </div>
    `
  },

  // ─── SLIDE 10: DIFFERENT VERSIONS ─────────────────
  {
    id: 'versions',
    section: 'design',
    render: () => `
      <div class="slide-bg"></div>
      <div class="slide-inner" style="justify-content:center;">
        <div class="stagger">
          <div class="section-tag">Accountability Through Iteration</div>
          <h2 class="slide-title">Transparent evolution for <em>reliability</em></h2>
          <div class="card" style="padding:18px 22px;margin-bottom:14px;">
            <ul class="slide-bullets">
              <li>Professional accountability required explicit trade-off documentation</li>
              <li>Reliability goal drove progression: single \u2192 dual \u2192 triple marker</li>
            </ul>
          </div>
          <div class="version-row" style="margin-bottom:14px;">
            <div class="version-card" style="background:rgba(0,220,200,0.08);border-color:rgba(0,220,200,0.45);">
              <div class="v-label" style="font-size:18px;">V1 \u2014 Single Marker (IL-6)</div>
              <p class="body-text" style="font-size:22px;">Strong early signal, but short half-life limits reliability alone.</p>
            </div>
            <div class="version-card" style="background:rgba(232,197,106,0.08);border-color:rgba(232,197,106,0.45);">
              <div class="v-label" style="font-size:18px;">V2 \u2014 Dual Marker (PCT + CRP)</div>
              <p class="body-text" style="font-size:22px;">Improved trend capture, but still misses earliest sepsis dynamics.</p>
            </div>
          </div>
          <div class="version-row">
            <div class="version-card" style="background:rgba(255,153,128,0.08);border-color:rgba(255,153,128,0.45);">
              <div class="v-label" style="font-size:18px;">V3 \u2014 Triple Marker (switch-based)</div>
              <p class="body-text" style="font-size:22px;">Right concept, but switch-model instability failed verification standards.</p>
            </div>
            <div class="version-card active-v" style="box-shadow:0 0 28px rgba(0,220,200,0.25);border-color:var(--cyan);">
              <div class="v-label" style="color:var(--cyan);font-size:18px;">V4 \u2014 Three TIAs + ADG1408 MUX</div>
              <p class="body-text" style="font-size:22px;">Stable, traceable architecture with independent channel verification and explicit risk tracking.</p>
            </div>
          </div>
        </div>
      </div>
    `
  },

  // ─── SLIDE 11: WHY THE FINAL ───────────────────────
  {
    id: 'why-final',
    section: 'design',
    render: () => `
      <div class="slide-bg"></div>
      <div class="orb orb-cyan" style="width:400px;height:400px;top:-50px;right:-50px;"></div>
      <div class="slide-inner" style="justify-content:center;">
        <div class="stagger">
          <div class="section-tag">Final Design Rationale</div>
          <h2 class="slide-title">Why <em>V4</em> is the right answer</h2>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:20px;">
            ${[
              { title:'Long sensor life', body:'Stable recognition layer supports practical storage and transport' },
              { title:'Readable signal', body:'Direct impedance change converts cleanly to electrical output' },
              { title:'Fast response', body:'Minutes-scale binding enables bedside screening workflow' },
            ].map(r => `
            <div class="card" style="padding:22px;">
              <div style="font-family:var(--font-display);font-weight:700;font-size:24px;color:var(--text);margin-bottom:10px;">${r.title}</div>
              <p class="body-text" style="font-size:19px;">${r.body}</p>
            </div>`).join('')}
          </div>
          <div class="card gold-accent" style="padding:20px 24px;">
            <p class="body-text" style="font-size:20px;">
              <strong style="color:var(--gold);">Key relation (qualitative):</strong>
              binding load \u2191 \u2192 R<sub>ct</sub> \u2191 \u2192 TIA amplitude \u2193
            </p>
          </div>
        </div>
      </div>
    `
  },

  // ─── SLIDE 12: CIRCUIT OVERVIEW ───────────────────
  {
    id: 'circuit-overview',
    section: 'circuit',
    render: () => `
      <div class="slide-bg"></div>
      <div class="slide-inner" style="justify-content:center;">
        <div class="stagger">
          <div class="section-tag">Circuit Overview</div>
          <h2 class="slide-title">Full signal chain — <em>end to end</em></h2>
          <div class="signal-chain" style="margin-bottom:20px;">
            ${[
              { label:'Blood Sample', sub:'electrode contact' },
              { label:'EIS Antibody Sensor', sub:'Randles cell' },
              { label:'AC Excitation', sub: SCHEMATIC_V20.ac },
              { label:'TIA (LT1677)', sub:'Rf ' + SCHEMATIC_V20.rf },
              { label:'Bandpass', sub: '~10–100 Hz (approx.)' },
              { label: SCHEMATIC_V20.mux, sub:'MUX' },
              { label:'ADC', sub:'12-bit (STM32)' },
              { label:'Display', sub:'threshold / UI' },
            ].flatMap((n, i) => [
              `<div class="chain-node">${n.label}<div class="cn-label">${n.sub}</div></div>`,
              i < 7 ? '<div class="chain-arrow">\u2192</div>' : ''
            ]).join('')}
          </div>
          <div class="two-col wide">
            <div class="circuit-screenshots">
              <figure class="circuit-shot circuit-shot--main">
                <img src="${CIRCUIT_IMG_MAIN}" alt="LTSpice full schematic" loading="lazy" />
                <figcaption class="mono-label" style="margin-top:8px;opacity:0.85;">Full schematic (v20)</figcaption>
              </figure>
              <figure class="circuit-shot circuit-shot--mux">
                <img src="${CIRCUIT_IMG_MUX}" alt="MUX detail" loading="lazy" />
                <figcaption class="mono-label" style="margin-top:8px;opacity:0.85;">${SCHEMATIC_V20.mux} detail</figcaption>
              </figure>
            </div>
            <div style="display:flex;flex-direction:column;gap:10px;">
              <div class="card" style="padding:14px 16px;">
                <div class="mono-label" style="margin-bottom:6px;">V1 \u2014 AC excitation</div>
                <p class="body-text" style="font-size:15px;">SINE(1.65, 1, 100): \u2248 ${SCHEMATIC_V20.ac} (matches v20)</p>
              </div>
              <div class="card" style="padding:14px 16px;">
                <div class="mono-label" style="margin-bottom:6px;">Supply</div>
                <p class="body-text" style="font-size:15px;">${SCHEMATIC_V20.supply} (V4 / V5 in v20)</p>
              </div>
              <div class="card" style="padding:14px 16px;">
                <div class="mono-label" style="margin-bottom:6px;">Bandpass (Rhp / Rlp / C)</div>
                <p class="body-text" style="font-size:15px;">${SCHEMATIC_V20.rhp}, ${SCHEMATIC_V20.rlp}, ${SCHEMATIC_V20.cBand} \u2192 ${SCHEMATIC_NOTES}</p>
              </div>
              <div class="card" style="padding:14px 16px;">
                <div class="mono-label" style="margin-bottom:6px;">Stability</div>
                <p class="body-text" style="font-size:15px;">C1 = ${SCHEMATIC_V20.cComp} across feedback (TIA)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },

  // ─── SLIDE 13: ANALOG FRONT-END (slide 12 in deck order) ──
  {
    id: 'input-circuit',
    section: 'circuit',
    render: () => `
      <div class="slide-bg"></div>
      <div class="slide-inner" style="justify-content:flex-start;padding-top:40px;">
        <div class="stagger">
          <div class="section-tag">Analog front-end</div>
          <h2 class="slide-title">Dual-stage <em>AFE</em></h2>
          <ul class="slide-bullets" style="margin-bottom:22px;max-width:1180px;gap:14px;">
            <li><strong>Architecture:</strong> dual-stage analog front-end (3.3 V rail / 1.65 V virtual ground).</li>
            <li><strong>Stage 1 — TIA:</strong> transimpedance amplification converts high-impedance (100 k\u03A9\u2013500 k\u03A9) biosensor charge transfers into raw voltage.</li>
            <li><strong>Stage 2 — MFB bandpass:</strong> active multiple-feedback filter; hardware-level 100 Hz isolation (Q = 2.5, passband gain = 1 V/V). <strong>System yield:</strong> safely bounds the 100 k\u03A9 target amplitude between 0.65 V and 2.65 V, neutralizing ADC aliasing and rail saturation threats.</li>
          </ul>
          <div class="op-amp-stack">
            <figure class="op-amp-figure">
              <img src="${OPAMP_IMG_BEFORE_AFTER}" alt="Before and after op amp comparison" loading="lazy" />
              <figcaption class="mono-label" style="margin-top:12px;opacity:0.9;">Before and after (combined PNG) — before first, after second</figcaption>
            </figure>
            <figure class="op-amp-figure">
              <img src="${OPAMP_IMG_AFTER_AMP}" alt="After amplification output" loading="lazy" />
              <figcaption class="mono-label" style="margin-top:12px;opacity:0.9;">After amplification only (filtered output)</figcaption>
            </figure>
          </div>
        </div>
      </div>
    `
  },

  // ─── SLIDE 14: MUX + OUTPUT VALUES ────────────────
  {
    id: 'mux-output',
    section: 'circuit',
    render: () => `
      <div class="slide-bg"></div>
      <div class="slide-inner" style="justify-content:center;">
        <div class="stagger">
          <div class="section-tag">Output Stage</div>
          <h2 class="slide-title">MUX + <em>output values</em> — what the ADC sees</h2>
          <div class="two-col">
            <div>
              <div class="mux-visual" style="height:200px;">
                <div class="channel-stack">
                  <div class="ch-box selected" data-ch="IL-6">IL-6 Ch</div>
                  <div class="ch-box" data-ch="CRP">CRP Ch</div>
                  <div class="ch-box" data-ch="PCT">PCT Ch</div>
                  <div class="ch-box" style="opacity:0.3;cursor:default;">Spare</div>
                </div>
                <div class="mux-wire"></div>
                <div class="mux-box">
                  <div>${SCHEMATIC_V20.mux}</div>
                  <div style="font-size:8px;">8:1</div>
                  <div style="font-size:8px;margin-top:4px;color:var(--text-muted);">select</div>
                </div>
                <div class="mux-wire"></div>
                <div class="mux-out">V_out_MUX<br><span style="font-family:var(--font-mono);font-size:10px;color:var(--text-muted);">\u2192 ADC</span></div>
              </div>
              <p class="body-text" style="font-size:16px;margin-top:14px;font-style:italic;">
                Click a channel for nominal R<sub>ct</sub> and qualitative output bands (not concentration-calibrated).
              </p>
            </div>
            <div>
              <div class="readout-panel" style="height:100%;">
                <div class="readout-header">QUALITATIVE EXAMPLE (NOT CALIBRATED)</div>
                <div class="readout-line">
                  <span class="readout-key">Selected channel</span>
                  <span class="readout-val ok" id="ch-sel">IL-6</span>
                </div>
                <div class="readout-line">
                  <span class="readout-key">Concentration</span>
                  <span class="readout-val warn" id="conc-disp">TBD (wet lab)</span>
                </div>
                <div class="readout-line">
                  <span class="readout-key">Rct (nominal)</span>
                  <span class="readout-val ok" id="rct-disp">${SCHEMATIC_V20.channels[0].rct}</span>
                </div>
                <div class="readout-line">
                  <span class="readout-key">TIA V (band)</span>
                  <span class="readout-val warn" id="vout-disp">\u2248 0.4\u20130.8 V pk</span>
                </div>
                <div class="readout-line">
                  <span class="readout-key">ADC (illustrative)</span>
                  <span class="readout-val ok" id="adc-disp">\u2248 mid-scale / 4095</span>
                </div>
                <div class="readout-status sepsis" id="status-disp">\u26A0 Thresholds TBD after calibration</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    onActivate: () => {
      const data = {
        'IL-6': { conc: 'TBD (wet lab)', rct: SCHEMATIC_V20.channels[0].rct, vout: '\u2248 0.4\u20130.8 V pk', adc: '\u2248 mid-scale / 4095' },
        'CRP': { conc: 'TBD (wet lab)', rct: SCHEMATIC_V20.channels[2].rct, vout: '\u2248 0.3\u20130.7 V pk', adc: '\u2248 mid-scale / 4095' },
        'PCT': { conc: 'TBD (wet lab)', rct: SCHEMATIC_V20.channels[1].rct, vout: '\u2248 0.35\u20130.75 V pk', adc: '\u2248 mid-scale / 4095' },
      }

      function selectChannel(ch) {
        document.querySelectorAll('.ch-box[data-ch]').forEach(el => el.classList.remove('selected'))
        const active = document.querySelector(`.ch-box[data-ch="${ch}"]`)
        if (active) active.classList.add('selected')

        const d = data[ch]
        if (!d) return
        document.getElementById('ch-sel').textContent = ch
        document.getElementById('conc-disp').textContent = d.conc
        document.getElementById('rct-disp').textContent = d.rct
        document.getElementById('vout-disp').textContent = d.vout
        document.getElementById('adc-disp').textContent = d.adc
      }

      document.querySelectorAll('.ch-box[data-ch]').forEach(el => {
        el.addEventListener('click', () => selectChannel(el.dataset.ch))
      })
    }
  },

  // ─── SLIDE 15: LEARNINGS ───────────────────────────
  {
    id: 'learnings',
    section: 'circuit',
    render: () => `
      <div class="slide-bg"></div>
      <div class="orb orb-gold" style="width:600px;height:600px;bottom:-200px;right:-200px;"></div>
      <div class="orb orb-cyan" style="width:300px;height:300px;top:-50px;left:-50px;"></div>
      <div class="slide-inner" style="justify-content:center;">
        <div class="stagger">
          <div class="section-tag">Conclusions</div>
          <h2 class="slide-title">Learnings &amp; <em>next steps</em></h2>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px;">
            ${[
              { label:'What worked', color:'var(--cyan)', items:['Tri-marker logic maps to clinical progression','Parallel channels gave clean, verifiable simulation outputs','Signal chain remains portable and practical for bedside use'] },
              { label:'Limitations to address', color:'var(--gold)', items:['Model simplifications still require wet-lab validation','Cross-reactivity and false positives need clinical tuning','Regulatory path and safety validation remain mandatory'] },
            ].map(col => `
            <div class="card" style="padding:22px 24px;border-color:${col.color}40;">
              <div class="mono-label" style="color:${col.color};margin-bottom:12px;">${col.label}</div>
              <div style="display:flex;flex-direction:column;gap:8px;">
                ${col.items.map(i => `
                <div style="display:flex;gap:10px;align-items:flex-start;">
                  <span style="color:${col.color};flex-shrink:0;margin-top:2px;">\u25B8</span>
                  <p class="body-text" style="font-size:22px;">${i}</p>
                </div>`).join('')}
              </div>
            </div>`).join('')}
          </div>
          <div class="card gold-accent" style="padding:18px 24px;text-align:center;">
            <p class="body-text" style="font-size:22px;">
              Biological sample \u2192 electrical signal \u2192 clinical decision
            </p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'thank-you',
    section: 'closing',
    render: () => `
      <div class="slide-bg"></div>
      <div class="orb orb-cyan" style="width:420px;height:420px;top:-120px;right:-120px;"></div>
      <div class="slide-inner" style="justify-content:center;align-items:center;text-align:center;">
        <div class="stagger" style="max-width:980px;">
          <div class="section-tag" style="margin:0 auto 22px;">Closing</div>
          <h2 class="slide-title" style="font-size:clamp(64px,8vw,116px);">Thank You</h2>
          <p class="body-text" style="font-size:34px;margin-top:8px;">Questions and feedback welcome.</p>
        </div>
      </div>
    `
  }
]

const slideOrder = [
  'title',
  'problem',
  'current-models',
  'our-gap',
  'design-process',
  'versions',
  '3pt-sensor',
  'biomarkers',
  'values-parallel',
  'why-final',
  'circuit-overview',
  'input-circuit',
  'mux-output',
  'learnings',
  'thank-you',
]

const slides = slideOrder.map((id) => slideDefs.find((slide) => slide.id === id)).filter(Boolean)

// ─── ENGINE ───────────────────────────────────────────
let current = 0

function render() {
  const app = document.getElementById('app')
  app.innerHTML = `
    <div class="deck" id="deck"></div>
    <div id="progress"></div>
    <div id="nav-ui">
      <span class="slide-counter" id="counter">01 / ${slides.length.toString().padStart(2,'0')}</span>
      <div class="nav-arrows">
        <button class="nav-btn" onclick="navigate(-1)">\u2190</button>
        <button class="nav-btn" onclick="navigate(1)">\u2192</button>
      </div>
    </div>
    <div id="key-hint"><kbd>\u2190</kbd><kbd>\u2192</kbd> navigate</div>
  `
  const deck = document.getElementById('deck')
  slides.forEach((slide, i) => {
    const el = document.createElement('div')
    el.className = `slide${i === 0 ? ' active' : ''}`
    el.id = `slide-${i}`
    el.innerHTML = slide.render()
    deck.appendChild(el)
  })
  updateUI()
  if (slides[0].onActivate) slides[0].onActivate(1)
}

function navigate(dir) {
  if (slides[current].onAdvance && slides[current].onAdvance(dir)) return
  const next = current + dir
  if (next < 0 || next >= slides.length) return

  const currentEl = document.getElementById(`slide-${current}`)
  const nextEl = document.getElementById(`slide-${next}`)

  currentEl.classList.add('exiting')
  currentEl.classList.remove('active')
  nextEl.style.transform = dir > 0 ? 'translateX(60px)' : 'translateX(-60px)'
  nextEl.offsetHeight
  nextEl.classList.add('active')

  setTimeout(() => {
    currentEl.classList.remove('exiting')
    currentEl.style.transform = ''
  }, 600)

  current = next
  updateUI()
  if (slides[current].onActivate) slides[current].onActivate(dir)
}

function updateUI() {
  document.getElementById('counter').textContent =
    `${(current+1).toString().padStart(2,'0')} / ${slides.length.toString().padStart(2,'0')}`
  const pct = ((current) / (slides.length - 1)) * 100
  document.getElementById('progress').style.width = pct + '%'
}

window.navigate = navigate

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); navigate(1) }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); navigate(-1) }
})

render()
