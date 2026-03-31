import './style.css'

// ─── SLIDE DEFINITIONS ────────────────────────────────
const slides = [

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
          <p class="body-text" style="max-width:600px;margin-bottom:40px;">
            A three-biomarker electrochemical aptasensor platform —
            <em>IL-6, PCT &amp; CRP</em> — enabling real-time infection
            timeline tracking at the bedside.
          </p>
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
          <div class="section-tag">slide 02 · Problem Statement</div>
          <h2 class="slide-title">Neonatal sepsis kills <em>3 million</em> children a year</h2>
          <p class="slide-subtitle">The window for intervention is hours, not days.</p>
          <div class="two-col" style="gap:24px;">
            <div>
              <div class="rule"></div>
              <ul class="slide-bullets">
                <li>Life-threatening infection in infants <strong style="color:var(--text);">&lt; 28 days old</strong></li>
                <li>Blood cultures take <strong style="color:var(--text);">24–72 hours</strong> — septic shock develops in hours</li>
                <li>Current POC devices: single biomarker, binary yes/no</li>
                <li>No temporal context — <em>when</em> did infection start?</li>
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
          <div class="section-tag">slide 03 · State of the Art</div>
          <h2 class="slide-title">Existing Biosensor <em>Approaches</em></h2>
          <p class="slide-subtitle">Why none of them solve the problem completely.</p>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
            ${[
              { label: 'Antibody + Electrochemical', pro: 'Clinically validated, lots of literature', con: 'Requires cold-chain storage, degrades over time', color: 'red-accent' },
              { label: 'QCM / Piezoelectric', pro: 'Label-free mass sensing', con: 'Mechanical complexity, temperature-sensitive', color: 'red-accent' },
              { label: 'Optical (SPR)', pro: 'Very fast, high sensitivity', con: 'Expensive hardware, not POC-friendly', color: 'red-accent' },
              { label: 'MIP + Electrochemical', pro: 'Excellent shelf life, no cold chain', con: 'Hard to synthesise for large proteins (PCT)', color: '' },
              { label: 'Aptamer + EIS \u2713', pro: 'DNA-stable, chemically synthesised, miniaturisable', con: 'Requires validated aptamer sequences', color: 'gold-accent' },
              { label: 'Nanobody + Capacitive', pro: 'Small size, high affinity', con: 'Still protein-based \u2014 stability limitations', color: '' },
            ].map(m => `
            <div class="card ${m.color}" style="padding:16px 18px;">
              <div class="v-label" style="color:${m.color === 'gold-accent' ? 'var(--gold)' : m.color === 'red-accent' ? 'var(--text-muted)' : 'var(--cyan)'};">${m.label}</div>
              <div style="font-family:var(--font-body);font-size:15px;color:#4ade80;margin:8px 0 3px;">+ ${m.pro}</div>
              <div style="font-family:var(--font-body);font-size:15px;color:var(--red);">\u2212 ${m.con}</div>
            </div>`).join('')}
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
          <div class="section-tag">slide 04 · Design Gap</div>
          <h2 class="slide-title">The gap we're <em>filling</em></h2>
          <div class="card" style="padding:32px 36px;margin-bottom:24px;background:rgba(232,197,106,0.06);border-color:rgba(232,197,106,0.3);">
            <div class="mono-label" style="color:var(--gold);margin-bottom:12px;">design challenge</div>
            <p class="body-text" style="font-size:clamp(18px,2.2vw,26px);line-height:1.5;">
              No existing POC device detects <em>multiple</em> sepsis biomarkers simultaneously
              to construct a <strong style="color:var(--gold);">temporal infection timeline</strong>
              — telling clinicians not just <em>if</em> sepsis is present, but <em>when it started</em>
              and how severe it has become.
            </p>
          </div>
          <div class="two-col">
            <div>
              <p class="mono-label" style="margin-bottom:10px;color:var(--red);">current standard</p>
              <div class="card red-accent">
                <p class="body-text" style="font-size:15px;">Single biomarker \u2192 Binary result \u2192 No timeline \u2192 Delayed treatment</p>
              </div>
            </div>
            <div>
              <p class="mono-label" style="margin-bottom:10px;color:var(--cyan);">our proposal</p>
              <div class="card">
                <p class="body-text" style="font-size:15px;">Three biomarkers \u2192 Simultaneous readout \u2192 Infection timeline \u2192 Earlier intervention</p>
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
          <div class="section-tag">slide 05 · Biomarker Strategy</div>
          <h2 class="slide-title">Why a <em>three-point</em> sensor?</h2>
          <p class="slide-subtitle">One biomarker is a snapshot. Three biomarkers are a story.</p>
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
                <p class="mono-label" style="text-align:center;margin-top:4px;opacity:0.6;">time post-infection \u2192</p>
              </div>
            </div>
          </div>
          <ul class="slide-bullets" style="margin-top:16px;">
            <li>Simultaneous readout determines <strong style="color:var(--text);">onset time</strong>, severity trend, and treatment response</li>
            <li>A single-marker device structurally cannot provide this</li>
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
          <div class="section-tag">slide 06 · Biomarker Selection</div>
          <h2 class="slide-title"><em>Which</em> markers, and why?</h2>
          <div class="rule"></div>
          <table class="bm-table">
            <thead>
              <tr>
                <th>Marker</th>
                <th>Role</th>
                <th>Peak Time</th>
                <th>Diagnostic Value</th>
                <th>Clinical Range</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="bm-name">IL-6</td>
                <td class="body-text" style="font-size:16px;">Pro-inflammatory cytokine — earliest responder</td>
                <td class="bm-time">2–4 h</td>
                <td class="body-text" style="font-size:16px;">Highest early sensitivity; falls with treatment</td>
                <td class="mono-label">0.01–10 ng/mL</td>
              </tr>
              <tr>
                <td class="bm-name" style="color:var(--gold) !important;">PCT</td>
                <td class="body-text" style="font-size:16px;">Pro-hormone; highly specific to bacterial sepsis</td>
                <td class="bm-time" style="color:var(--gold) !important;">8–24 h</td>
                <td class="body-text" style="font-size:16px;">Best specificity; guides antibiotic therapy</td>
                <td class="mono-label">0.5–50 ng/mL</td>
              </tr>
              <tr>
                <td class="bm-name" style="color:#ff9980 !important;">CRP</td>
                <td class="body-text" style="font-size:16px;">Acute-phase protein; confirms progression</td>
                <td class="bm-time" style="color:#ff9980 !important;">24–48 h</td>
                <td class="body-text" style="font-size:16px;">Lower early specificity; strong for monitoring</td>
                <td class="mono-label">0.1–15 \u00B5g/mL</td>
              </tr>
            </tbody>
          </table>
          <p class="mono-label" style="margin-top:18px;opacity:0.6;">
            Sources: Kasper et al. (PMC2220039) · Turkish J. Pediatrics 2024 · Shi et al. 2025
          </p>
        </div>
      </div>
    `
  },

  // ─── SLIDE 7: IL-6 / PCT / CRP DEEP DIVE ──────────
  {
    id: 'markers-deep',
    section: 'biomarker',
    render: () => `
      <div class="slide-bg"></div>
      <div class="slide-inner" style="justify-content:center;">
        <div class="stagger">
          <div class="section-tag">slide 07 · Marker Deep Dive</div>
          <h2 class="slide-title">IL-6 · PCT · CRP — the <em>how</em></h2>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;">
            ${[
              {
                name:'IL-6', color:'var(--cyan)',
                what:'Cytokine released by macrophages within minutes of bacterial invasion. Triggers the acute-phase response.',
                why:'Rises earliest (2\u20134h), making it our primary early-warning signal.',
                how:'Electrochemical EIS aptasensor. Anti-IL-6 aptamer on interdigitated gold electrode.',
                freq:'~10 Hz EIS probe frequency'
              },
              {
                name:'PCT', color:'var(--gold)',
                what:'Precursor of calcitonin. Systemically released during bacterial (not viral) infection.',
                why:'Most specific marker for bacterial sepsis. Rising PCT \u2192 antibiotic needed.',
                how:'Same EIS architecture, separate aptamer. Calibrated Rct\u2080 = 500k\u03A9.',
                freq:'~10 Hz EIS probe frequency'
              },
              {
                name:'CRP', color:'#ff9980',
                what:'Liver-derived acute-phase protein. Responds to IL-6 signalling, peaks later.',
                why:'Confirms infection timeline and monitors treatment response at 24\u201348h.',
                how:'EIS aptasensor with Rct\u2080 = 50k\u03A9. Larger Cdl shift due to protein size.',
                freq:'~100 Hz EIS probe frequency'
              }
            ].map(m => `
            <div class="card" style="border-color:${m.color}40;padding:20px;">
              <div style="font-family:var(--font-display);font-weight:900;font-size:32px;color:${m.color};margin-bottom:14px;">${m.name}</div>
              <div class="mono-label" style="margin-bottom:4px;">What</div>
              <p class="body-text" style="font-size:15px;margin-bottom:10px;">${m.what}</p>
              <div class="mono-label" style="margin-bottom:4px;">Why</div>
              <p class="body-text" style="font-size:15px;margin-bottom:10px;">${m.why}</p>
              <div class="mono-label" style="margin-bottom:4px;">How</div>
              <p class="body-text" style="font-size:15px;margin-bottom:8px;">${m.how}</p>
              <div style="font-family:var(--font-mono);font-size:12px;color:${m.color};background:${m.color}15;padding:5px 10px;border-radius:3px;">${m.freq}</div>
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
          <div class="section-tag">slide 08 · Sensor Values</div>
          <h2 class="slide-title">Equivalent circuit values <em>per channel</em></h2>
          <p class="slide-subtitle">Try the concentration slider below to see how Rct and Cdl respond.</p>
          <div class="two-col">
            <div>
              <table class="bm-table">
                <thead><tr><th>Component</th><th>IL-6</th><th>CRP</th><th>PCT</th></tr></thead>
                <tbody>
                  <tr><td>Rs (\u03A9)</td><td class="mono-label" style="color:var(--cyan)">1k</td><td class="mono-label" style="color:var(--cyan)">1k</td><td class="mono-label" style="color:var(--cyan)">1k</td></tr>
                  <tr><td>Rct\u2080 (\u03A9)</td><td class="mono-label" style="color:var(--cyan)">5k</td><td class="mono-label" style="color:var(--cyan)">50k</td><td class="mono-label" style="color:var(--cyan)">500k</td></tr>
                  <tr><td>Cdl\u2080 (F)</td><td class="mono-label" style="color:var(--cyan)">10p</td><td class="mono-label" style="color:var(--cyan)">47p</td><td class="mono-label" style="color:var(--cyan)">22p</td></tr>
                  <tr><td>Kd</td><td class="mono-label" style="color:var(--gold)">1 ng/mL</td><td class="mono-label" style="color:var(--gold)">100 ng/mL</td><td class="mono-label" style="color:var(--gold)">5 ng/mL</td></tr>
                  <tr><td>Rf (TIA)</td><td class="mono-label" style="color:var(--cyan)">100k</td><td class="mono-label" style="color:var(--cyan)">100k</td><td class="mono-label" style="color:var(--cyan)">100k</td></tr>
                </tbody>
              </table>
              <ul class="slide-bullets" style="margin-top:12px;">
                <li style="font-size:15px;">Rct <strong style="color:var(--cyan);">decreases</strong> as aptamer sites become occupied</li>
                <li style="font-size:15px;">Cdl <strong style="color:var(--cyan);">increases</strong> as bound protein alters the dielectric</li>
              </ul>
            </div>
            <div>
              <div class="card" style="padding:20px;">
                <div class="mono-label" style="margin-bottom:12px;">Interactive: IL-6 channel</div>
                <div class="conc-slider-wrap">
                  <label>IL-6 concentration (ng/mL)</label>
                  <input type="range" id="conc-slider" min="0.01" max="10" step="0.01" value="1">
                  <div class="conc-readout" id="conc-val">1.00 ng/mL</div>
                  <div class="conc-interp" id="conc-interp">Borderline elevated — early sepsis</div>
                </div>
                <div class="rule" style="margin:14px 0;"></div>
                <div class="readout-panel">
                  <div class="readout-header">COMPUTED EIS PARAMETERS</div>
                  <div class="readout-line">
                    <span class="readout-key">Rct_eff</span>
                    <span class="readout-val ok" id="rct-out">2.50 k\u03A9</span>
                  </div>
                  <div class="readout-line">
                    <span class="readout-key">Cdl_eff</span>
                    <span class="readout-val ok" id="cdl-out">15.0 pF</span>
                  </div>
                  <div class="readout-line">
                    <span class="readout-key">Vout (est.)</span>
                    <span class="readout-val ok" id="vout-out">\u2014</span>
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
      const update = () => {
        const c = parseFloat(slider.value)
        const Kd = 1, Rct0 = 5000, Cdl0 = 10e-12
        const rct = Rct0 / (1 + c / Kd)
        const cdl = Cdl0 * (1 + 0.5 * c / Kd)
        const vout = (rct / (rct + 1000)) * 1
        document.getElementById('conc-val').textContent = c.toFixed(2) + ' ng/mL'
        document.getElementById('rct-out').textContent = (rct / 1000).toFixed(2) + ' k\u03A9'
        document.getElementById('cdl-out').textContent = (cdl * 1e12).toFixed(1) + ' pF'
        document.getElementById('vout-out').textContent = (vout * 1000).toFixed(0) + ' mV'
        const interp = c < 0.1 ? 'Normal range \u2014 no infection indicated'
          : c < 1 ? 'Slightly elevated \u2014 monitor closely'
          : c < 5 ? 'Elevated \u2014 early sepsis likely'
          : 'Critically high \u2014 sepsis confirmed'
        const color = c < 0.1 ? 'ok' : c < 1 ? 'ok' : c < 5 ? 'warn' : 'crit'
        document.getElementById('conc-interp').textContent = interp
        ;['rct-out','cdl-out','vout-out'].forEach(id => {
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
          <div class="section-tag">slide 09 · Design Process</div>
          <h2 class="slide-title">How we <em>arrived</em> here</h2>
          <div class="timeline">
            ${[
              { date:'Meeting 1 \u2014 Mar 15', title:'Problem scoping', body:'Identified neonatal sepsis \u00B7 Brainstormed biomarkers \u00B7 Lit review planned', dot:''},
              { date:'Meeting 2 \u2014 Mar 20', title:'Biosensor type locked', body:'Aptamer > Antibody (stability) \u00B7 EIS > Optical (cost) \u00B7 IL-6 + PCT + CRP locked', dot:'gold'},
              { date:'Meeting 3 \u2014 Mar 25', title:'Circuit architecture decided', body:'Three parallel TIAs over analog switch \u00B7 Filter: fc = 5 Hz \u00B7 LTSpice assigned', dot:''},
              { date:'Meeting 4 \u2014 Mar 28', title:'4:1 MUX confirmed', body:'Behavioral MUX verified in LTSpice \u00B7 V3 analog-switch documented \u00B7 Final schematic', dot:'gold'},
            ].map(t => `
            <div class="timeline-item">
              <div class="timeline-dot ${t.dot}"></div>
              <div>
                <div class="mono-label" style="margin-bottom:3px;">${t.date}</div>
                <div style="font-family:var(--font-display);font-weight:700;font-size:20px;color:var(--text);margin-bottom:5px;">${t.title}</div>
                <p class="body-text" style="font-size:16px;">${t.body}</p>
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
          <div class="section-tag">slide 10 · Design Iterations</div>
          <h2 class="slide-title">Versions we <em>considered</em> and why we moved on</h2>
          <div class="version-row" style="margin-bottom:14px;">
            <div class="version-card rejected">
              <div class="v-label">V1 \u2014 Antibody + Amperometric</div>
              <ul class="slide-bullets">
                <li style="font-size:15px;">Cold-chain storage required</li>
                <li style="font-size:15px;">Degrades in 4\u20138 weeks — fails lifetime criterion</li>
              </ul>
            </div>
            <div class="version-card rejected">
              <div class="v-label">V2 \u2014 Single-channel EIS</div>
              <ul class="slide-bullets">
                <li style="font-size:15px;">Proved aptamer + EIS on PCT (Randles cell)</li>
                <li style="font-size:15px;">One marker can\u2019t build a timeline</li>
              </ul>
            </div>
          </div>
          <div class="version-row">
            <div class="version-card rejected">
              <div class="v-label">V3 \u2014 Triple Biomarker + Analog Switch</div>
              <ul class="slide-bullets">
                <li style="font-size:15px;">LTSpice SW component limitations</li>
                <li style="font-size:15px;">Simulation instability \u2192 abandoned</li>
              </ul>
            </div>
            <div class="version-card active-v">
              <div class="v-label" style="color:var(--cyan);">V4 \u2014 Three Parallel TIAs + 4:1 MUX</div>
              <ul class="slide-bullets">
                <li style="font-size:15px;">Independent TIA per channel (Rf = 100k\u03A9) + bandpass</li>
                <li style="font-size:15px;">4:1 behavioral MUX \u2192 ADC readout</li>
                <li style="font-size:15px;">Clean, simulatable, independently verifiable</li>
              </ul>
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
          <div class="section-tag">slide 11 · Final Design Rationale</div>
          <h2 class="slide-title">Why <em>V4</em> is the right answer</h2>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:20px;">
            ${[
              { icon:'\u26A1', title:'Long sensor life', body:'DNA aptamers: no cold chain, thermally stable, >3 months at room temp' },
              { icon:'\uD83D\uDCE1', title:'Clean electrical output', body:'Non-faradaic EIS \u2192 direct impedance-to-voltage. No optics, no redox probe' },
              { icon:'\u23F1', title:'Fast response', body:'Equilibrium-driven binding. Full signal in minutes. No incubation step' },
            ].map(r => `
            <div class="card" style="padding:22px;">
              <div style="font-size:36px;margin-bottom:12px;">${r.icon}</div>
              <div style="font-family:var(--font-display);font-weight:700;font-size:20px;color:var(--text);margin-bottom:10px;">${r.title}</div>
              <p class="body-text" style="font-size:16px;">${r.body}</p>
            </div>`).join('')}
          </div>
          <div class="card gold-accent" style="padding:20px 24px;">
            <p class="body-text" style="font-size:20px;">
              <strong style="color:var(--gold);">Key equation:</strong> Rct = Rct\u2080 / (1 + C/Kd) &nbsp;\u2014&nbsp;
              concentration \u2191 &nbsp;\u2192&nbsp; Rct \u2193 &nbsp;\u2192&nbsp; V<sub>out</sub> = I \u00D7 Rf \u2191
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
          <div class="section-tag">slide 12 · Circuit Overview</div>
          <h2 class="slide-title">Full signal chain — <em>end to end</em></h2>
          <div class="signal-chain" style="margin-bottom:20px;">
            ${[
              { label:'Blood Sample', sub:'electrode contact' },
              { label:'EIS Aptasensor', sub:'Randles cell' },
              { label:'AC Excitation', sub:'V\u2081 = 1V AC' },
              { label:'TIA (LT1677)', sub:'Rf = 100k\u03A9' },
              { label:'Bandpass Filter', sub:'fc \u2248 5 Hz' },
              { label:'4:1 MUX', sub:'channel select' },
              { label:'ADC', sub:'12-bit STM32' },
              { label:'Display', sub:'threshold LED' },
            ].flatMap((n, i) => [
              `<div class="chain-node">${n.label}<div class="cn-label">${n.sub}</div></div>`,
              i < 7 ? '<div class="chain-arrow">\u2192</div>' : ''
            ]).join('')}
          </div>
          <div class="two-col wide">
            <div class="diagram-placeholder" style="height:220px;">
              <div class="diagram-icon">\u26A1</div>
              <div class="diagram-label">LTSpice Schematic Placeholder</div>
              <div style="font-family:var(--font-mono);font-size:9px;color:var(--text-muted);opacity:0.4;margin-top:4px;">Insert simulation screenshot here</div>
            </div>
            <div style="display:flex;flex-direction:column;gap:10px;">
              <div class="card" style="padding:14px 16px;">
                <div class="mono-label" style="margin-bottom:6px;">V1 \u2014 AC source</div>
                <p class="body-text" style="font-size:15px;">1V amplitude \u00B7 0.1\u201310 kHz sweep \u00B7 PCT @ 10 Hz, CRP @ 100 Hz</p>
              </div>
              <div class="card" style="padding:14px 16px;">
                <div class="mono-label" style="margin-bottom:6px;">Supply: \u00B11.65V split</div>
                <p class="body-text" style="font-size:15px;">3.3V single-supply \u2192 virtual ground at 1.65V \u00B7 Battery-compatible</p>
              </div>
              <div class="card" style="padding:14px 16px;">
                <div class="mono-label" style="margin-bottom:6px;">Filter design</div>
                <p class="body-text" style="font-size:15px;">R=31.8k\u03A9, C=1\u00B5F \u2192 fc \u2248 5 Hz \u00B7 Passes biosignal, rejects HF noise</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },

  // ─── SLIDE 13: INPUT CIRCUIT ───────────────────────
  {
    id: 'input-circuit',
    section: 'circuit',
    render: () => `
      <div class="slide-bg"></div>
      <div class="slide-inner" style="justify-content:center;">
        <div class="stagger">
          <div class="section-tag">slide 13 · Input Stage</div>
          <h2 class="slide-title">The biosensor front-end — <em>EIS input stage</em></h2>
          <div class="two-col wide">
            <div>
              <div class="diagram-placeholder" style="height:260px;">
                <div class="diagram-icon">\uD83D\uDD0C</div>
                <div class="diagram-label">EIS Aptasensor Symbol</div>
                <div style="font-family:var(--font-mono);font-size:9px;color:var(--text-muted);opacity:0.4;text-align:center;padding:0 20px;position:relative;z-index:1;">
                  BiosensorEIS custom component<br>WE \u2192 RE with Rs, Rct \u2225 Cdl
                </div>
              </div>
            </div>
            <div class="stagger">
              <ul class="slide-bullets" style="margin-bottom:16px;">
                <li>Each channel = simplified Randles cell</li>
                <li>Aptamer layer on WE \u2192 biomarker-dependent Cdl</li>
              </ul>
              <div class="card" style="padding:18px;margin-bottom:10px;">
                <div class="mono-label" style="margin-bottom:6px;">Randles model</div>
                <div style="font-family:var(--font-mono);font-size:16px;color:var(--cyan);">
                  Z = Rs + 1/( 1/Rct + j\u03C9Cdl )
                </div>
              </div>
              <div class="card" style="padding:18px;margin-bottom:10px;">
                <div class="mono-label" style="margin-bottom:6px;">Concentration \u2192 impedance</div>
                <div style="font-family:var(--font-mono);font-size:16px;color:var(--gold);">
                  Rct(C) = Rct\u2080 / (1 + C/Kd)
                </div>
              </div>
              <div class="card" style="padding:18px;">
                <div class="mono-label" style="margin-bottom:6px;">Voltage output (TIA)</div>
                <div style="font-family:var(--font-mono);font-size:16px;color:var(--cyan);">
                  V_out = I_sensor \u00D7 Rf
                </div>
              </div>
            </div>
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
          <div class="section-tag">slide 14 · Output Stage</div>
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
                  <div>MUX</div>
                  <div style="font-size:8px;">4:1</div>
                  <div style="font-size:8px;margin-top:4px;color:var(--text-muted);">S0 S1</div>
                </div>
                <div class="mux-wire"></div>
                <div class="mux-out">V_out_MUX<br><span style="font-family:var(--font-mono);font-size:10px;color:var(--text-muted);">\u2192 ADC</span></div>
              </div>
              <p class="body-text" style="font-size:16px;margin-top:14px;font-style:italic;">
                Click a channel to see expected output at clinical concentrations.
              </p>
            </div>
            <div>
              <div class="readout-panel" style="height:100%;">
                <div class="readout-header">SIMULATED OUTPUT — SEPTIC INFANT SAMPLE</div>
                <div class="readout-line">
                  <span class="readout-key">Selected channel</span>
                  <span class="readout-val ok" id="ch-sel">IL-6</span>
                </div>
                <div class="readout-line">
                  <span class="readout-key">Concentration</span>
                  <span class="readout-val warn" id="conc-disp">8.5 ng/mL</span>
                </div>
                <div class="readout-line">
                  <span class="readout-key">Rct_eff</span>
                  <span class="readout-val ok" id="rct-disp">588 \u03A9</span>
                </div>
                <div class="readout-line">
                  <span class="readout-key">TIA Vout</span>
                  <span class="readout-val warn" id="vout-disp">369 mV</span>
                </div>
                <div class="readout-line">
                  <span class="readout-key">ADC code (12-bit)</span>
                  <span class="readout-val ok" id="adc-disp">736 / 4095</span>
                </div>
                <div class="readout-status sepsis" id="status-disp">\u26A0 SEPSIS THRESHOLD EXCEEDED</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    onActivate: () => {
      const data = {
        'IL-6': { conc: '8.5 ng/mL', rct: '588 \u03A9', vout: '369 mV', adc: '736 / 4095', status: true },
        'CRP':  { conc: '12.3 \u00B5g/mL', rct: '3.85 k\u03A9', vout: '794 mV', adc: '1587 / 4095', status: true },
        'PCT':  { conc: '22.1 ng/mL', rct: '18.5 k\u03A9', vout: '942 mV', adc: '1884 / 4095', status: true },
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
          <div class="section-tag">slide 15 · Conclusions</div>
          <h2 class="slide-title">Learnings &amp; <em>next steps</em></h2>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px;">
            ${[
              { label:'What worked', color:'var(--cyan)', items:['Aptamer-EIS: stable, simulatable, literature-validated','Randles cell maps biology \u2192 circuit cleanly','Three parallel channels: independently verifiable','Langmuir binding \u2192 direct calibration curve'] },
              { label:'Limitations to address', color:'var(--gold)', items:['Idealised Randles model \u2014 no Warburg impedance','ADG1404 has no LTSpice model \u2014 used behavioural MUX','Aptamer cross-reactivity in blood needs wet-lab validation','Health Canada Class II certification required'] },
            ].map(col => `
            <div class="card" style="padding:22px 24px;border-color:${col.color}40;">
              <div class="mono-label" style="color:${col.color};margin-bottom:12px;">${col.label}</div>
              <div style="display:flex;flex-direction:column;gap:8px;">
                ${col.items.map(i => `
                <div style="display:flex;gap:10px;align-items:flex-start;">
                  <span style="color:${col.color};flex-shrink:0;margin-top:2px;">\u2192</span>
                  <p class="body-text" style="font-size:16px;">${i}</p>
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
  }
]

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
  if (slides[0].onActivate) slides[0].onActivate()
}

function navigate(dir) {
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
  if (slides[current].onActivate) slides[current].onActivate()
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
