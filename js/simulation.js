/**
 * AES MONG DUONG - OPERATIONAL SIMULATION GAMES ENGINE
 * "FROM SOP TO SMART DECISIONS"
 * Web Audio FX, Cute 3D Character Renderer, Telemetry Canvas & Branching Simulation
 */

class SimulationSoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  playTone(freq, type, duration, gainVal = 0.1) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  playClick() {
    this.playTone(800, 'sine', 0.06, 0.08);
  }

  playInspect() {
    this.playTone(520, 'sine', 0.08, 0.1);
    setTimeout(() => this.playTone(780, 'triangle', 0.12, 0.12), 60);
  }

  playAlarm() {
    this.playTone(440, 'sawtooth', 0.2, 0.15);
    setTimeout(() => this.playTone(380, 'sawtooth', 0.25, 0.15), 180);
  }

  playSuccess() {
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((note, idx) => {
      setTimeout(() => this.playTone(note, 'sine', 0.25, 0.12), idx * 80);
    });
  }

  playAchievement() {
    const notes = [440, 554.37, 659.25, 880, 1108.73];
    notes.forEach((note, idx) => {
      setTimeout(() => this.playTone(note, 'triangle', 0.35, 0.15), idx * 100);
    });
  }
}

// Character SVG Factory: Cute 3D Asian Industrial Engineers
const CharacterGraphics = {
  getEngineerSVG(role = 'player', expression = 'neutral') {
    // Cute stylized engineer with safety helmet, reflective stripes, navy AES workwear
    let mouth = '<path d="M42 62 Q50 68 58 62" stroke="#1E293B" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
    if (expression === 'smile') {
      mouth = '<path d="M40 60 Q50 72 60 60" stroke="#1E293B" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
    } else if (expression === 'concern') {
      mouth = '<path d="M42 65 Q50 59 58 65" stroke="#1E293B" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
    } else if (expression === 'talking') {
      mouth = '<ellipse cx="50" cy="63" rx="5" ry="4" fill="#B91C1C"/>';
    }

    const helmetColor = role === 'supervisor' ? '#E2E8F0' : '#FFFFFF';
    const helmetStripe = role === 'supervisor' ? '#F59E0B' : '#0284C7';

    return `
      <svg class="sim-avatar-svg" viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
        <!-- Body / Navy AES Workwear -->
        <path d="M22 88 C20 78 30 76 50 76 C70 76 80 78 78 88 L85 125 L15 125 Z" fill="#0B192C"/>
        <!-- Safety Vest (Neon Yellow/Green with reflective strip) -->
        <path d="M30 77 L34 125 L44 125 L40 77 Z" fill="#84CC16"/>
        <path d="M70 77 L66 125 L56 125 L60 77 Z" fill="#84CC16"/>
        <!-- Reflective Silver Stripes -->
        <rect x="33" y="98" width="10" height="6" fill="#F1F5F9" rx="1"/>
        <rect x="57" y="98" width="10" height="6" fill="#F1F5F9" rx="1"/>
        <!-- AES Logo on Vest -->
        <rect x="46" y="86" width="8" height="6" rx="1" fill="#0284C7"/>

        <!-- Neck -->
        <rect x="44" y="68" width="12" height="12" fill="#FED7AA" rx="3"/>

        <!-- Cute 3D Head / Face -->
        <ellipse cx="50" cy="52" rx="26" ry="24" fill="#FED7AA"/>
        <!-- Hair -->
        <path d="M26 44 C26 30 38 24 50 24 C62 24 74 30 74 44 C74 48 70 42 66 42 C60 42 56 38 50 38 C44 38 40 42 34 42 C30 42 26 48 26 44 Z" fill="#1E1B4B"/>

        <!-- Cute Expressive Big Eyes -->
        <ellipse cx="38" cy="51" rx="4.5" ry="6.5" fill="#0F172A"/>
        <circle cx="39.5" cy="49" r="2" fill="#FFFFFF"/>
        <ellipse cx="62" cy="51" rx="4.5" ry="6.5" fill="#0F172A"/>
        <circle cx="63.5" cy="49" r="2" fill="#FFFFFF"/>

        <!-- Eyebrows -->
        <path d="M34 43 Q40 41 44 43" stroke="#1E1B4B" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M56 43 Q60 41 66 43" stroke="#1E1B4B" stroke-width="2" fill="none" stroke-linecap="round"/>

        <!-- Cute Cheeks -->
        <circle cx="32" cy="58" r="4" fill="#FDA4AF" opacity="0.6"/>
        <circle cx="68" cy="58" r="4" fill="#FDA4AF" opacity="0.6"/>

        <!-- Mouth -->
        ${mouth}

        <!-- White AES Safety Helmet with Branding -->
        <path d="M22 36 C22 15 34 10 50 10 C66 10 78 15 78 36 C80 37 80 40 76 40 L24 40 C20 40 20 37 22 36 Z" fill="${helmetColor}"/>
        <!-- Helmet Ridge / 3D curvature -->
        <path d="M46 10 C46 8 54 8 54 10 L54 36 L46 36 Z" fill="#E2E8F0"/>
        <!-- Helmet AES Branding Stripe -->
        <rect x="36" y="24" width="28" height="4.5" rx="1.5" fill="${helmetStripe}"/>
      </svg>
    `;
  }
};

class SimulationGameManager {
  constructor() {
    this.sound = new SimulationSoundEngine();
    this.currentStage = 1; // 1 = Thermal Drift Dilemma, 2 = Trade-off Matrix
    this.xp = parseInt(localStorage.getItem('aes_sim_xp') || '450', 10);
    this.game1Investigated = new Set();
    this.game2Investigated = new Set();
    this.game2SliderValues = {
      safety: 85,
      schedule: 40,
      cost: 55,
      material: 20
    };
    this.tempCanvas = null;
    this.tempCtx = null;
    this.tempAnimationId = null;
  }

  init() {
    this.bindGlobalEvents();
    this.loadStage(1);
    this.updateXP(0);
  }

  updateXP(amount) {
    this.xp += amount;
    localStorage.setItem('aes_sim_xp', this.xp.toString());
    const pill = document.getElementById('sim-global-xp');
    if (pill) pill.textContent = `${this.xp} XP`;
  }

  bindGlobalEvents() {
    // Stage Selector Tabs
    const stage1Btn = document.getElementById('tab-stage-1');
    const stage2Btn = document.getElementById('tab-stage-2');

    if (stage1Btn) {
      stage1Btn.addEventListener('click', () => {
        this.sound.playClick();
        this.loadStage(1);
      });
    }

    if (stage2Btn) {
      stage2Btn.addEventListener('click', () => {
        this.sound.playClick();
        this.loadStage(2);
      });
    }

    // Audio Toggle
    const audioBtn = document.getElementById('sim-audio-toggle');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        this.sound.muted = !this.sound.muted;
        audioBtn.innerHTML = this.sound.muted ? '🔇 Audio: OFF' : '🔊 Audio: ON';
      });
    }

    // Modal Close
    const closeBtn = document.getElementById('sim-inspect-close');
    const overlay = document.getElementById('sim-inspect-overlay');
    if (closeBtn && overlay) {
      closeBtn.addEventListener('click', () => {
        this.sound.playClick();
        overlay.classList.remove('open');
      });
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('open');
        }
      });
    }

    // Reset button
    const resetBtn = document.getElementById('sim-btn-reset-stage');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.sound.playClick();
        this.resetCurrentStage();
      });
    }
  }

  resetCurrentStage() {
    if (this.currentStage === 1) {
      this.game1Investigated.clear();
      this.loadStage(1);
    } else {
      this.game2Investigated.clear();
      this.loadStage(2);
    }
  }

  loadStage(stageNum) {
    this.currentStage = stageNum;
    const stage1Btn = document.getElementById('tab-stage-1');
    const stage2Btn = document.getElementById('tab-stage-2');
    const viewport = document.getElementById('sim-main-viewport');

    if (stageNum === 1) {
      if (stage1Btn) stage1Btn.classList.add('active');
      if (stage2Btn) stage2Btn.classList.remove('active');
      if (viewport) viewport.classList.remove('state-alarm');
      this.renderStage1();
    } else {
      if (stage2Btn) stage2Btn.classList.add('active');
      if (stage1Btn) stage1Btn.classList.remove('active');
      if (viewport) viewport.classList.remove('state-alarm');
      this.renderStage2();
    }
  }

  /* ========================================================================
     STAGE 1: THE THERMAL DRIFT DILEMMA
     ======================================================================== */
  renderStage1() {
    const stageContent = document.getElementById('sim-dynamic-stage-content');
    if (!stageContent) return;

    stageContent.innerHTML = `
      <!-- Stage 1 Header -->
      <div class="sim-stage-header">
        <div class="sim-stage-badge-group">
          <span class="sim-badge-stage">STAGE 1</span>
          <div>
            <h2 class="sim-stage-title-text">THE THERMAL DRIFT DILEMMA</h2>
            <div class="sim-stage-subtitle-text">“The alarm has not triggered. But is everything really safe?”</div>
          </div>
        </div>
        <div class="sim-timer-pill" id="sim-shift-timer">
          ⏳ 20 MINUTES TO SHIFT HANDOVER
        </div>
      </div>

      <!-- Stage 1 Central Control Room Scene -->
      <div class="sim-scene-container">
        <div class="sim-ccr-deck">
          
          <!-- Central DCS Monitor: ID Fan Bearing Temperature -->
          <div class="sim-dcs-monitor-card">
            <div class="sim-dcs-header-row">
              <span class="sim-dcs-tag">DCS-CCR-IDFAN-01A // BEARING TEMP</span>
              <span class="sim-dcs-live-val" id="sim-live-temp-val">73.5°C</span>
            </div>
            
            <div class="sim-dcs-chart-wrap" id="sim-dcs-chart-interactive" title="Click to zoom trend">
              <canvas id="sim-dcs-canvas" class="sim-dcs-canvas" width="600" height="180"></canvas>
              <div class="sim-chart-hint-tooltip">🔍 Click Trend to Inspect</div>
            </div>

            <div class="sim-dcs-legend-row">
              <div class="sim-legend-item">
                <span class="sim-legend-color" style="background:#38BDF8;"></span>
                <span>Actual: 62°C ➔ 73.5°C (Upward Drift)</span>
              </div>
              <div class="sim-legend-item">
                <span class="sim-legend-color" style="background:#F59E0B;"></span>
                <span>Yellow Alarm: 75°C</span>
              </div>
              <div class="sim-legend-item">
                <span class="sim-legend-color" style="background:#EF4444;"></span>
                <span>Auto Trip: 85°C</span>
              </div>
            </div>
          </div>

          <!-- Co-worker & Player Dialogue Stage -->
          <div class="sim-character-stage">
            <div class="sim-speech-bubble" id="sim-coworker-bubble">
              <div class="sim-speech-speaker">Co-Worker (Control Operator Minh)</div>
              <p class="sim-speech-text" id="sim-coworker-dialogue">
                “The line is still green, and no audible alarm has triggered yet! Static SOPs do not require us to intervene right now. Let the night shift monitor it when they take over.”
              </p>
            </div>

            <div class="sim-cast-row">
              <div class="sim-avatar-box">
                ${CharacterGraphics.getEngineerSVG('player', 'concern')}
                <div class="sim-avatar-label">You (O&M Engineer)</div>
              </div>
              <div class="sim-avatar-box">
                ${CharacterGraphics.getEngineerSVG('coworker', 'smile')}
                <div class="sim-avatar-label">Minh (Co-Worker)</div>
              </div>
            </div>
          </div>

        </div>

        <!-- Investigation HUD: Mission 01 -->
        <div class="sim-investigation-section">
          <div class="sim-inv-header">
            <div class="sim-inv-title">
              <span class="sim-inv-title-icon">🔎</span>
              <span>MISSION 01: Before deciding, what supporting signals will you investigate?</span>
            </div>
            <div class="sim-inv-counter" id="sim-inv-counter-1">0 / 5 Signals Inspected</div>
          </div>

          <div class="sim-tools-grid">
            <button class="sim-tool-btn" id="tool-btn-temp">
              <div class="sim-tool-icon">📈</div>
              <div class="sim-tool-text">
                <span class="sim-tool-label">Temperature Trend</span>
                <span class="sim-tool-status">Rate of rise (+2.3°C/hr)</span>
              </div>
            </button>

            <button class="sim-tool-btn" id="tool-btn-lube">
              <div class="sim-tool-icon">🛢️</div>
              <div class="sim-tool-text">
                <span class="sim-tool-label">Lube Oil Pressure</span>
                <span class="sim-tool-status">1.8 bar (Normal: 2.2 bar)</span>
              </div>
            </button>

            <button class="sim-tool-btn" id="tool-btn-vib">
              <div class="sim-tool-icon">〰️</div>
              <div class="sim-tool-text">
                <span class="sim-tool-label">Mechanical Vibration</span>
                <span class="sim-tool-status">3.2 mm/s RMS (Harmonic)</span>
              </div>
            </button>

            <button class="sim-tool-btn" id="tool-btn-log">
              <div class="sim-tool-icon">📋</div>
              <div class="sim-tool-text">
                <span class="sim-tool-label">Shift Logbook</span>
                <span class="sim-tool-status">Filter DP & Greasing log</span>
              </div>
            </button>

            <button class="sim-tool-btn" id="tool-btn-alarm">
              <div class="sim-tool-icon">🔔</div>
              <div class="sim-tool-text">
                <span class="sim-tool-label">Alarm History</span>
                <span class="sim-tool-status">2 nuisance spikes logged</span>
              </div>
            </button>
          </div>
        </div>

        <!-- Decision Moment Container (Unlocked after investigation) -->
        <div class="sim-decision-section" id="sim-stage1-decision-box">
          <div class="sim-decision-prompt">
            <span class="sim-decision-tag">DECISION POINT // 20 MINUTES TO HANDOVER</span>
            <h3 class="sim-decision-question">You have 20 minutes before handover. What will you do?</h3>
          </div>

          <div class="sim-decision-cards-grid">
            <div class="sim-choice-card" id="choice-1-a">
              <div>
                <div class="sim-choice-letter">A</div>
                <div class="sim-choice-title">WAIT</div>
                <div class="sim-choice-desc">Leave the console because the parameter has not exceeded 75°C. Let the night shift take over under standard procedures.</div>
              </div>
              <button class="sim-choice-action-btn">Choose Option A</button>
            </div>

            <div class="sim-choice-card" id="choice-1-b">
              <div>
                <div class="sim-choice-letter">B</div>
                <div class="sim-choice-title">ACT NOW</div>
                <div class="sim-choice-desc">Trigger emergency load reduction immediately to force the bearing temperature down without coordinating.</div>
              </div>
              <button class="sim-choice-action-btn">Choose Option B</button>
            </div>

            <div class="sim-choice-card" id="choice-1-c">
              <div>
                <div class="sim-choice-letter">C</div>
                <div class="sim-choice-title">CROSS-CHECK & TRANSFER</div>
                <div class="sim-choice-desc">Check supporting parameters, log the upward drift rate, and establish an active 15-minute monitoring protocol with the incoming Shift Supervisor.</div>
              </div>
              <button class="sim-choice-action-btn" style="background:#0284C7;">Choose Option C (Proactive)</button>
            </div>
          </div>
        </div>

        <!-- Consequence Viewport (Populated on choice) -->
        <div id="sim-stage1-consequence-area" style="display:none;"></div>

      </div>
    `;

    this.initStage1Canvas();
    this.bindStage1Investigation();
    this.bindStage1Decisions();
  }

  initStage1Canvas() {
    const canvas = document.getElementById('sim-dcs-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    this.tempCanvas = canvas;
    this.tempCtx = ctx;

    const dataPoints = [62, 63.5, 65, 66.8, 68.2, 69.5, 71, 72.3, 73.5];
    let offset = 0;

    const drawChart = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Draw grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let y = 30; y < h; y += 35) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Yellow Alarm line (75°C) ~ y = 50
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(0, 52);
      ctx.lineTo(w, 52);
      ctx.stroke();
      ctx.fillStyle = '#F59E0B';
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillText('75°C ALARM THRESHOLD', w - 160, 48);

      // Auto Trip line (85°C) ~ y = 20
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.6)';
      ctx.beginPath();
      ctx.moveTo(0, 22);
      ctx.lineTo(w, 22);
      ctx.stroke();
      ctx.fillStyle = '#EF4444';
      ctx.fillText('85°C TRIP THRESHOLD', w - 150, 18);
      ctx.setLineDash([]);

      // Live upward temperature curve
      ctx.beginPath();
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 3.5;
      const step = w / (dataPoints.length - 1);

      dataPoints.forEach((val, i) => {
        // Map 60°C -> h - 20, 85°C -> 22
        const normalized = (val - 60) / 25;
        const y = (h - 25) - normalized * (h - 50);
        const x = i * step;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Pulsing current dot at 73.5°C
      const lastX = (dataPoints.length - 1) * step;
      const lastVal = dataPoints[dataPoints.length - 1];
      const lastY = (h - 25) - ((lastVal - 60) / 25) * (h - 50);

      offset = (offset + 0.08) % (Math.PI * 2);
      const pulseR = 5 + Math.sin(offset) * 2;

      ctx.beginPath();
      ctx.arc(lastX, lastY, pulseR, 0, Math.PI * 2);
      ctx.fillStyle = '#FBBF24';
      ctx.shadowColor = '#FBBF24';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      this.tempAnimationId = requestAnimationFrame(drawChart);
    };

    drawChart();

    const chartWrap = document.getElementById('sim-dcs-chart-interactive');
    if (chartWrap) {
      chartWrap.addEventListener('click', () => {
        this.sound.playInspect();
        this.showInspectModal(
          'DCS TREND ANALYSIS',
          'ID FAN 01A BEARING TEMPERATURE',
          'Current: 73.5°C (Nominal: 62.0°C)\nDrift Rate: +2.3°C / hr over past 5 hours\nProjected Alarm Breach (75.0°C): in ~35 minutes',
          'Steady upward drift detected. Even though the line is green and no audible horn has fired, the rate of change indicates thermal disequilibrium.'
        );
      });
    }
  }

  bindStage1Investigation() {
    const tools = [
      {
        id: 'tool-btn-temp',
        key: 'temp',
        title: 'TELEMETRY: BEARING TEMP TREND',
        sub: 'Rate of Change Analysis',
        data: 'T_start: 62.0°C (18:00)\nT_now: 73.5°C (23:40)\nGradient: +2.3°C / hr\nMargin to Alarm: 1.5°C remaining',
        insight: 'Crucial Finding: Waiting for the 75°C alarm guarantees the incoming shift will inherit an immediate critical alarm with zero response buffer.'
      },
      {
        id: 'tool-btn-lube',
        key: 'lube',
        title: 'TELEMETRY: LUBRICATION SYSTEM',
        sub: 'Lube Oil Pressure & Viscosity Check',
        data: 'Header Pressure: 1.82 bar (Nominal: 2.20 bar)\nLube Oil Temp: 48°C (Normal)\nFilter DP: 0.28 bar (Acceptable)\nOil Level Sightglass: 72%',
        insight: 'Oil pressure is slightly depressed (1.82 bar). While still within nominal permissives, lower pressure degrades boundary oil-film thickness under high load.'
      },
      {
        id: 'tool-btn-vib',
        key: 'vib',
        title: 'TELEMETRY: MECHANICAL VIBRATION',
        sub: 'Drive End Bearing Spectrum',
        data: 'Radial Vibration: 3.2 mm/s RMS (Alarm: 4.5 mm/s)\nAxial Vibration: 1.8 mm/s\nDominant Harmonic: 1X rotational speed',
        insight: 'Check supporting signals before acting! Slight vibration harmonics indicate early bearing friction. A coordinated lube check can resolve this before mechanical damage.'
      },
      {
        id: 'tool-btn-log',
        key: 'log',
        title: 'SHIFT LOGBOOK ARCHIVE',
        sub: 'Previous Shift Maintenance Entries',
        data: 'Shift 1 (Morning): Routine grease top-up performed\nShift 2 (Afternoon): Filter differential pressure recorded clean\nNotes: Unit at 100% MCR dispatch since 14:00',
        insight: 'Grease was applied 2 shifts ago. The thermal rise coincided with continuous high-load dispatch and slight lube pressure throttling.'
      },
      {
        id: 'tool-btn-alarm',
        key: 'alarm',
        title: 'HISTORICAL ALARM LOG',
        sub: 'Pre-Alarm Chatter Review',
        data: '22:15: Pre-alarm 72°C chatter logged (Auto-reset)\n23:05: Lube oil low-pressure warning threshold approached\n00:00: Shift Handover Window opens',
        insight: 'Nuisance pre-alarms were acknowledged and cleared without investigation. This is procedural blindness: treating an un-tripped state as a safe state.'
      }
    ];

    tools.forEach(tool => {
      const btn = document.getElementById(tool.id);
      if (btn) {
        btn.addEventListener('click', () => {
          this.sound.playInspect();
          btn.classList.add('inspected');
          this.game1Investigated.add(tool.key);

          const counter = document.getElementById('sim-inv-counter-1');
          if (counter) {
            counter.textContent = `${this.game1Investigated.size} / 5 Signals Inspected`;
          }

          if (this.game1Investigated.size === 5) {
            this.updateXP(100);
          }

          this.showInspectModal(tool.title, tool.sub, tool.data, tool.insight);
        });
      }
    });
  }

  showInspectModal(badge, heading, data, insight) {
    const overlay = document.getElementById('sim-inspect-overlay');
    const badgeEl = document.getElementById('sim-modal-badge');
    const headEl = document.getElementById('sim-modal-heading');
    const dataEl = document.getElementById('sim-modal-data');
    const insightEl = document.getElementById('sim-modal-insight');

    if (overlay && badgeEl && headEl && dataEl && insightEl) {
      badgeEl.textContent = badge;
      headEl.textContent = heading;
      dataEl.textContent = data;
      insightEl.textContent = insight;
      overlay.classList.add('open');
    }
  }

  bindStage1Decisions() {
    const choiceA = document.getElementById('choice-1-a');
    const choiceB = document.getElementById('choice-1-b');
    const choiceC = document.getElementById('choice-1-c');

    if (choiceA) {
      choiceA.addEventListener('click', () => {
        this.sound.playAlarm();
        this.triggerStage1Consequence('A');
      });
    }

    if (choiceB) {
      choiceB.addEventListener('click', () => {
        this.sound.playTone(300, 'square', 0.3, 0.12);
        this.triggerStage1Consequence('B');
      });
    }

    if (choiceC) {
      choiceC.addEventListener('click', () => {
        this.sound.playSuccess();
        this.triggerStage1Consequence('C');
      });
    }
  }

  triggerStage1Consequence(option) {
    const viewport = document.getElementById('sim-main-viewport');
    const area = document.getElementById('sim-stage1-consequence-area');
    const decisionBox = document.getElementById('sim-stage1-decision-box');
    if (!area) return;

    if (decisionBox) decisionBox.style.display = 'none';
    area.style.display = 'block';

    if (option === 'A') {
      if (viewport) viewport.classList.add('state-alarm');
      area.innerHTML = `
        <div class="sim-consequence-wrap result-fail">
          <div class="sim-consequence-header">
            <div class="sim-consequence-icon">🚨</div>
            <div>
              <h3 class="sim-consequence-title">45 MINUTES LATER: ID FAN TRIPPED</h3>
              <div class="sim-consequence-sub">CONSEQUENCE TIMELINE // 00:25 NIGHT SHIFT</div>
            </div>
          </div>

          <div class="sim-metrics-box">
            <div class="sim-metric-val-item">
              <div class="sim-metric-val-title">Equipment Status</div>
              <div class="sim-metric-val-number">TRIPPED (86.2°C)</div>
            </div>
            <div class="sim-metric-val-item">
              <div class="sim-metric-val-title">Generation Loss</div>
              <div class="sim-metric-val-number">600 MW ➔ 0 MW</div>
            </div>
            <div class="sim-metric-val-item">
              <div class="sim-metric-val-title">Outage Buffer Impact</div>
              <div class="sim-metric-val-number">-4.0 HOURS BUFFER</div>
            </div>
          </div>

          <div class="sim-consequence-body">
            You handed over the console without noting the rate-of-rise trend. 35 minutes into the night shift, the temperature crossed 75°C into Yellow Alarm. With no active monitoring protocol in place, thermal runaway accelerated to 86.2°C, tripping ID Fan 01A and initiating an emergency boiler master fuel trip (MFT).
          </div>

          <div class="sim-reflection-grid">
            <div class="sim-reflection-card">
              <h4>Trend vs Static Alarm</h4>
              <p>The parameter had not breached the alarm at handover, but the direction and speed of change guaranteed a crisis.</p>
            </div>
            <div class="sim-reflection-card">
              <h4>Context Blindness</h4>
              <p>Procedural compliance (“the line is green”) hid the underlying lube pressure degradation.</p>
            </div>
            <div class="sim-reflection-card">
              <h4>Transfer Failure</h4>
              <p>The incoming shift needed an actionable protocol, not just a casual verbal comment.</p>
            </div>
          </div>

          <div class="sim-takeaway-banner">
            💡 <strong>KEY TAKEAWAY:</strong> “Smart decisions do not wait for alarms. Recognize trends before boundaries are breached.”
          </div>

          <div style="margin-top:20px; display:flex; gap:12px;">
            <button class="sim-btn sim-btn-reset" onclick="window.simManager.resetCurrentStage()">↺ Replay Scenario</button>
            <button class="sim-btn sim-btn-primary" onclick="window.simManager.loadStage(2)">Proceed to Stage 2: Trade-Off Matrix ➔</button>
          </div>
        </div>
      `;
    } else if (option === 'B') {
      area.innerHTML = `
        <div class="sim-consequence-wrap result-warning">
          <div class="sim-consequence-header">
            <div class="sim-consequence-icon">⚠️</div>
            <div>
              <h3 class="sim-consequence-title">PREMATURE LOAD REDUCTION TRIGGERED</h3>
              <div class="sim-consequence-sub">CONSEQUENCE TIMELINE // 23:45 IMMEDIATE INTERVENTION</div>
            </div>
          </div>

          <div class="sim-metrics-box">
            <div class="sim-metric-val-item">
              <div class="sim-metric-val-title">Equipment Status</div>
              <div class="sim-metric-val-number">PROTECTED (68.4°C)</div>
            </div>
            <div class="sim-metric-val-item">
              <div class="sim-metric-val-title">Generation Lost</div>
              <div class="sim-metric-val-number">220 MW Dropped</div>
            </div>
            <div class="sim-metric-val-item">
              <div class="sim-metric-val-title">Dispatch Penalty</div>
              <div class="sim-metric-val-number">UNVERIFIED TRIP</div>
            </div>
          </div>

          <div class="sim-consequence-body">
            You pressed the emergency control without cross-checking oil pressure or establishing an agreed transfer protocol. While the bearing cooled down, plant generation plunged from 600 MW to 380 MW with no dispatch approval. Management and the National Load Dispatch Center (NLDC) issued a penalty inquiry.
          </div>

          <div class="sim-reflection-grid">
            <div class="sim-reflection-card">
              <h4>Was it Justified?</h4>
              <p>Emergency trips should be reserved for acute hazard thresholds, not premature panic before investigating root cause.</p>
            </div>
            <div class="sim-reflection-card">
              <h4>Missing Verification</h4>
              <p>A simple auxiliary lube pump trim or grease calibration could have stabilized the bearing at full load.</p>
            </div>
          </div>

          <div class="sim-takeaway-banner">
            💡 <strong>KEY TAKEAWAY:</strong> “Proactivity requires verified diagnostic correlation, not impulsive intervention.”
          </div>

          <div style="margin-top:20px; display:flex; gap:12px;">
            <button class="sim-btn sim-btn-reset" onclick="window.simManager.resetCurrentStage()">↺ Replay Scenario</button>
            <button class="sim-btn sim-btn-primary" onclick="window.simManager.loadStage(2)">Proceed to Stage 2: Trade-Off Matrix ➔</button>
          </div>
        </div>
      `;
    } else if (option === 'C') {
      this.sound.playAchievement();
      this.updateXP(250);
      area.innerHTML = `
        <div class="sim-consequence-wrap result-success">
          <div class="sim-consequence-header">
            <div class="sim-consequence-icon">🏆</div>
            <div>
              <h3 class="sim-consequence-title">15-MINUTE MONITORING PROTOCOL ACTIVATED</h3>
              <div class="sim-consequence-sub">OPTIMAL PROACTIVE TRANSFER // 23:55 DIGITAL HANDOVER COMPLETE</div>
            </div>
          </div>

          <div class="sim-achievement-card">
            <div class="sim-achieve-trophy">🎖️</div>
            <div class="sim-achieve-text">
              <h4>ACHIEVEMENT UNLOCKED: PROACTIVE TRANSFER MASTER</h4>
              <p>Demonstrated LTEM Level 7 (Decision Transfer to Workplace). Zero generation lost, bearing stabilized safely.</p>
            </div>
          </div>

          <div class="sim-metrics-box">
            <div class="sim-metric-val-item">
              <div class="sim-metric-val-title">Bearing Temp</div>
              <div class="sim-metric-val-number">STABILIZED (69.1°C)</div>
            </div>
            <div class="sim-metric-val-item">
              <div class="sim-metric-val-title">Generation Maintained</div>
              <div class="sim-metric-val-number">600 MW (100% MCR)</div>
            </div>
            <div class="sim-metric-val-item">
              <div class="sim-metric-val-title">Outage Buffer Saved</div>
              <div class="sim-metric-val-number">+4.0 HOURS SAVED</div>
            </div>
          </div>

          <div class="sim-consequence-body">
            <strong>Exemplary Operational Excellence:</strong> You correlated the lube pressure deficit with the upward temperature drift rate. You exported the 5-hour trendline into the Digital Shift Logbook and had the incoming Shift Supervisor digitally sign an active 15-minute auxiliary lube pump standby protocol. At 00:15, auxiliary lubrication engaged, stabilizing the bearing at 69.1°C with zero plant downtime!
          </div>

          <div class="sim-reflection-grid">
            <div class="sim-reflection-card">
              <h4>1. Trend Recognition</h4>
              <p>Recognized the +2.3°C/hr gradient before touching the 75°C Yellow Alarm boundary.</p>
            </div>
            <div class="sim-reflection-card">
              <h4>2. Cross-Signal Verification</h4>
              <p>Diagnosed lube pressure (1.82 bar) as the contributor before taking action.</p>
            </div>
            <div class="sim-reflection-card">
              <h4>3. Structured Transfer</h4>
              <p>The incoming shift received an actionable, digitally signed monitoring protocol.</p>
            </div>
          </div>

          <div class="sim-takeaway-banner">
            ⭐ <strong>SMART DECISION GOLD STANDARD:</strong> “Safe operations emerge when engineers treat trends as signals, not waiting for alarms to force a crisis.”
          </div>

          <div style="margin-top:20px; display:flex; gap:12px;">
            <button class="sim-btn sim-btn-reset" onclick="window.simManager.resetCurrentStage()">↺ Replay Scenario</button>
            <button class="sim-btn sim-btn-primary" onclick="window.simManager.loadStage(2)">Proceed to Stage 2: Trade-Off Matrix ➔</button>
          </div>
        </div>
      `;
    }
  }

  /* ========================================================================
     STAGE 2: THE TRADE-OFF MATRIX & TURNOVER FRICTION
     ======================================================================== */
  renderStage2() {
    const stageContent = document.getElementById('sim-dynamic-stage-content');
    if (!stageContent) return;

    stageContent.innerHTML = `
      <!-- Stage 2 Header -->
      <div class="sim-stage-header">
        <div class="sim-stage-badge-group">
          <span class="sim-badge-stage" style="background:#059669;">STAGE 2</span>
          <div>
            <h2 class="sim-stage-title-text">THE TRADE-OFF MATRIX & TURNOVER FRICTION</h2>
            <div class="sim-stage-subtitle-text">“Cross-functional decision making under schedule, maintenance and supply chain friction.”</div>
          </div>
        </div>
        <div class="sim-timer-pill" style="background:rgba(5,150,105,0.15); border-color:#059669; color:#34D399;">
          ⏱️ OUTAGE PROGRESS: DAY 3 / 25
        </div>
      </div>

      <!-- Stage 2 Scene Container -->
      <div class="sim-scene-container">
        
        <!-- Boiler Cooldown & Status Deck -->
        <div class="sim-ccr-deck">
          <div class="sim-dcs-monitor-card" style="border-color:#059669;">
            <div class="sim-dcs-header-row">
              <span class="sim-dcs-tag" style="color:#34D399;">BOILER COOLDOWN STATUS // UNIT 1</span>
              <span class="sim-dcs-live-val" style="color:#34D399;">60°C // 0 BAR</span>
            </div>
            
            <div style="background:rgba(5,150,105,0.1); border:1px solid rgba(5,150,105,0.3); border-radius:10px; padding:14px; margin-bottom:12px;">
              <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:800; color:#E2E8F0; margin-bottom:6px;">
                <span>Boiler Bottom Pressure: 0.0 bar</span>
                <span style="color:#10B981;">✓ WITHIN EXPECTED RANGE</span>
              </div>
              <div style="font-size:0.8rem; color:#94A3B8;">
                Thermal and hydraulic conditions permit isolation handover. However, secondary systems have pending constraints.
              </div>
            </div>

            <!-- Pulsing SCM Alert Banner -->
            <div style="background:rgba(239,68,68,0.15); border:1px solid #EF4444; border-radius:10px; padding:12px; display:flex; align-items:center; gap:12px; animation:alarmPulse 2s infinite alternate;">
              <div style="font-size:1.4rem;">📦</div>
              <div>
                <div style="font-size:0.82rem; font-weight:800; color:#F87171;">SCM URGENT ALERT: HIGH-PRESSURE GASKET SETS</div>
                <div style="font-size:0.75rem; color:#E2E8F0;">Status: ⚠ Pending Supplemental Customs Clearance (Hai Phong). NOT physically available on site.</div>
              </div>
            </div>
          </div>

          <!-- Characters: Maintenance Supervisor & Dialogue -->
          <div class="sim-character-stage">
            <div class="sim-speech-bubble">
              <div class="sim-speech-speaker">Maintenance Supervisor (Tuan)</div>
              <p class="sim-speech-text">
                “Thermal and pressure parameters are green! Sign the isolation handover right now so my 30 contractor technicians can start disassembling the boiler manholes.”
              </p>
            </div>

            <div class="sim-cast-row">
              <div class="sim-avatar-box">
                ${CharacterGraphics.getEngineerSVG('player', 'neutral')}
                <div class="sim-avatar-label">You (Operations Lead)</div>
              </div>
              <div class="sim-avatar-box">
                ${CharacterGraphics.getEngineerSVG('supervisor', 'concern')}
                <div class="sim-avatar-label">Tuan (Maintenance Sup.)</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Investigation HUD: Stage 2 -->
        <div class="sim-investigation-section">
          <div class="sim-inv-header">
            <div class="sim-inv-title">
              <span class="sim-inv-title-icon" style="background:#059669;">🔍</span>
              <span>MULTI-FACTOR INVESTIGATION: Inspect the 5 cross-functional constraints before deciding</span>
            </div>
            <div class="sim-inv-counter" id="sim-inv-counter-2">0 / 5 Factors Inspected</div>
          </div>

          <div class="sim-tools-grid">
            <button class="sim-tool-btn" id="s2-tool-schedule">
              <div class="sim-tool-icon">📅</div>
              <div class="sim-tool-text">
                <span class="sim-tool-label">Maintenance Schedule</span>
                <span class="sim-tool-status">30 technicians awaiting LOTO</span>
              </div>
            </button>

            <button class="sim-tool-btn" id="s2-tool-scm">
              <div class="sim-tool-icon">🚚</div>
              <div class="sim-tool-text">
                <span class="sim-tool-label">SCM Material Status</span>
                <span class="sim-tool-status">Gaskets ETA: 14 hours (Customs)</span>
              </div>
            </button>

            <button class="sim-tool-btn" id="s2-tool-loto">
              <div class="sim-tool-icon">🔒</div>
              <div class="sim-tool-text">
                <span class="sim-tool-label">Handover Checklist</span>
                <span class="sim-tool-status">Lockout/Tagout verification</span>
              </div>
            </button>

            <button class="sim-tool-btn" id="s2-tool-milestone">
              <div class="sim-tool-icon">🎯</div>
              <div class="sim-tool-text">
                <span class="sim-tool-label">Outage Milestone</span>
                <span class="sim-tool-status">Critical path float: 18 hours</span>
              </div>
            </button>

            <button class="sim-tool-btn" id="s2-tool-alt">
              <div class="sim-tool-icon">🔄</div>
              <div class="sim-tool-text">
                <span class="sim-tool-label">Alternative Materials</span>
                <span class="sim-tool-status">Standard Nitrile (UNSAFE for steam)</span>
              </div>
            </button>
          </div>
        </div>

        <!-- Interactive 4D Trade-Off Matrix -->
        <div class="sim-matrix-container">
          <div class="sim-matrix-title-row">
            <h3 style="margin:0; font-size:1.1rem; color:#FFFFFF; font-weight:800;">
              ⚖️ INTERACTIVE TRADE-OFF MATRIX (Adjust Factors to Evaluate Dynamic Impact)
            </h3>
            <span style="font-size:0.75rem; color:#38BDF8; font-weight:700;">Live Simulation Gauges</span>
          </div>

          <div class="sim-matrix-grid">
            <div class="sim-slider-card">
              <h4><span>SAFETY INTEGRITY</span> <span id="val-safety">85%</span></h4>
              <div class="sim-slider-bar-track">
                <div class="sim-slider-bar-fill fill-safety" id="bar-safety" style="width:85%;"></div>
              </div>
              <div class="sim-slider-sub">Zero tolerance for unrated gaskets or premature boundary entry.</div>
            </div>

            <div class="sim-slider-card">
              <h4><span>SCHEDULE ADHERENCE</span> <span id="val-schedule">40%</span></h4>
              <div class="sim-slider-bar-track">
                <div class="sim-slider-bar-fill fill-schedule" id="bar-schedule" style="width:40%;"></div>
              </div>
              <div class="sim-slider-sub">30 contractor personnel idle penalty: $4,200 / shift.</div>
            </div>

            <div class="sim-slider-card">
              <h4><span>COST & PENALTY RISK</span> <span id="val-cost">55%</span></h4>
              <div class="sim-slider-bar-track">
                <div class="sim-slider-bar-fill fill-cost" id="bar-cost" style="width:55%;"></div>
              </div>
              <div class="sim-slider-sub">Avoidable steam leaks exceed $85,000 in emergency repairs.</div>
            </div>

            <div class="sim-slider-card">
              <h4><span>MATERIAL READINESS</span> <span id="val-material">20%</span></h4>
              <div class="sim-slider-bar-track">
                <div class="sim-slider-bar-fill fill-material" id="bar-material" style="width:20%;"></div>
              </div>
              <div class="sim-slider-sub">0/2 high-pressure critical-path gasket sets currently on-site.</div>
            </div>
          </div>
        </div>

        <!-- Cross-Functional Perspectives Triad -->
        <div class="sim-perspectives-triad">
          <div class="sim-perspective-card">
            <div class="sim-perspective-icon">⚡</div>
            <div class="sim-perspective-info">
              <h5>Operations Perspective</h5>
              <p>“Can we sign cold-side auxiliary valve isolation first, keeping contractors busy while protecting the main boiler steam path?”</p>
            </div>
          </div>

          <div class="sim-perspective-card">
            <div class="sim-perspective-icon">🛠️</div>
            <div class="sim-perspective-info">
              <h5>Maintenance Perspective</h5>
              <p>“If contractors sit idle for 8 hours, our Outage Milestone slips by 1 full day and contractor standby penalties apply.”</p>
            </div>
          </div>

          <div class="sim-perspective-card">
            <div class="sim-perspective-icon">📦</div>
            <div class="sim-perspective-info">
              <h5>Supply Chain (SCM) Perspective</h5>
              <p>“Customs clearance expedited with priority courier. Gaskets guaranteed at gate by 08:00 tomorrow morning.”</p>
            </div>
          </div>
        </div>

        <!-- Decision Moment (Stage 2) -->
        <div class="sim-decision-section">
          <div class="sim-decision-prompt">
            <span class="sim-decision-tag" style="color:#34D399;">DECISION POINT // HANDOVER BOTTLENECK</span>
            <h3 class="sim-decision-question">How would you handle this outage handover friction?</h3>
          </div>

          <div class="sim-decision-cards-grid">
            <div class="sim-choice-card" id="s2-choice-1">
              <div>
                <div class="sim-choice-letter">1</div>
                <div class="sim-choice-title">PROCEED AS PLANNED</div>
                <div class="sim-choice-desc">Sign the full isolation handover immediately and let the contractors disassemble the manholes now without replacement parts.</div>
              </div>
              <button class="sim-choice-action-btn">Choose Option 1</button>
            </div>

            <div class="sim-choice-card" id="s2-choice-2">
              <div>
                <div class="sim-choice-letter">2</div>
                <div class="sim-choice-title">PAUSE AND WAIT</div>
                <div class="sim-choice-desc">Refuse to sign any handover. Freeze all 30 contractors until the gaskets arrive tomorrow morning.</div>
              </div>
              <button class="sim-choice-action-btn">Choose Option 2</button>
            </div>

            <div class="sim-choice-card" id="s2-choice-3">
              <div>
                <div class="sim-choice-letter">3</div>
                <div class="sim-choice-title">SUBSTITUTE GASKETS</div>
                <div class="sim-choice-desc">Authorise standard nitrile warehouse gaskets to avoid milestone slip and keep maintenance happy.</div>
              </div>
              <button class="sim-choice-action-btn">Choose Option 3</button>
            </div>

            <div class="sim-choice-card" id="s2-choice-4" style="border-color:#059669;">
              <div>
                <div class="sim-choice-letter" style="background:#059669; color:#fff;">4</div>
                <div class="sim-choice-title">RE-SEQUENCE WORKFLOW</div>
                <div class="sim-choice-desc">Sign cold-side isolation for auxiliary valve overhauls now. Keep 30 technicians 100% productive, while SCM expedites hot-path gaskets for 08:00 AM.</div>
              </div>
              <button class="sim-choice-action-btn" style="background:#059669;">Choose Option 4 (System Master)</button>
            </div>
          </div>
        </div>

        <!-- Consequence Stage 2 Viewport -->
        <div id="sim-stage2-consequence-area" style="display:none;"></div>

      </div>
    `;

    this.bindStage2Investigation();
    this.bindStage2Decisions();
  }

  bindStage2Investigation() {
    const tools = [
      {
        id: 's2-tool-schedule',
        key: 'schedule',
        title: 'MAINTENANCE WORK SEQUENCE',
        sub: 'Critical Path Breakdown',
        data: 'Planned Start: 00:00\nContractor Headcount: 30 technicians on site\nWork Package A: Main superheater manhole (Requires new gasket)\nWork Package B: Auxiliary safety valve inspection (No gasket needed)',
        insight: 'Work Package B (Safety valves) can proceed immediately without waiting for customs! This gives 12 hours of productive contractor work.'
      },
      {
        id: 's2-tool-scm',
        key: 'scm',
        title: 'SCM CUSTOMS EXPEDITE REPORT',
        sub: 'Hai Phong Port Logistics',
        data: 'Shipment: 2 sets Spiral Wound Superheater Gaskets\nClearance Status: Pre-cleared at 22:30\nDedicated Hotshot Van dispatched: ETA 08:00 AM tomorrow',
        insight: 'The material is 100% genuine and verified, arriving at 08:00 AM. Opening the high-pressure manholes before arrival risks dust contamination.'
      },
      {
        id: 's2-tool-loto',
        key: 'loto',
        title: 'ISOLATION & LOTO VERIFICATION',
        sub: 'Lockout/Tagout Safety Permissive',
        data: 'Electrical: Motor breakers racked out & locked\nThermal: 60°C bottom header (Safe)\nHydraulic: 0.0 bar (De-pressurized)\nAtmosphere: Natural draft ventilation verified',
        insight: 'Isolation is technically safe, but procedural handover should be gated to specific work zones to prevent work on unsupplied components.'
      },
      {
        id: 's2-tool-milestone',
        key: 'milestone',
        title: '25-DAY OUTAGE SCHEDULE FLOAT',
        sub: 'Critical Path Buffer Analysis',
        data: 'Day 3 Target: Boiler access complete\nDay 4 Target: Ultrasonic tube thickness testing\nTotal Float: 18 hours buffer on inspection phase',
        insight: '18 hours of float exist on this sub-network. A re-sequencing of tasks absorbs the delivery window without moving the Day 25 commercial sync date.'
      },
      {
        id: 's2-tool-alt',
        key: 'alt',
        title: 'ALTERNATIVE MATERIAL SPECIFICATION',
        sub: 'Warehouse Nitrile Gasket Review',
        data: 'Material: Nitrile (NBR) Bonded Sheet\nMax Temperature Rating: 120°C\nMax Pressure Rating: 16 bar\nBoiler Steam Requirement: 540°C // 167 bar (UNSAFE)',
        insight: 'CRITICAL HAZARD: Warehouse nitrile gaskets would catastrophically blow out upon boiler steam pressurization. Never substitute unrated materials to protect schedule!'
      }
    ];

    tools.forEach(tool => {
      const btn = document.getElementById(tool.id);
      if (btn) {
        btn.addEventListener('click', () => {
          this.sound.playInspect();
          btn.classList.add('inspected');
          this.game2Investigated.add(tool.key);

          const counter = document.getElementById('sim-inv-counter-2');
          if (counter) {
            counter.textContent = `${this.game2Investigated.size} / 5 Factors Inspected`;
          }

          if (this.game2Investigated.size === 5) {
            this.updateXP(100);
          }

          this.showInspectModal(tool.title, tool.sub, tool.data, tool.insight);
        });
      }
    });
  }

  bindStage2Decisions() {
    for (let i = 1; i <= 4; i++) {
      const btn = document.getElementById(`s2-choice-${i}`);
      if (btn) {
        btn.addEventListener('click', () => {
          if (i === 3) this.sound.playAlarm();
          else if (i === 4) this.sound.playAchievement();
          else this.sound.playTone(320, 'triangle', 0.2, 0.1);

          this.triggerStage2Consequence(i);
        });
      }
    }
  }

  triggerStage2Consequence(choiceNum) {
    const area = document.getElementById('sim-stage2-consequence-area');
    if (!area) return;
    area.style.display = 'block';

    if (choiceNum === 1) {
      area.innerHTML = `
        <div class="sim-consequence-wrap result-warning">
          <div class="sim-consequence-header">
            <div class="sim-consequence-icon">⚠️</div>
            <div>
              <h3 class="sim-consequence-title">OPTION 1: PROCEED AS PLANNED — MANHOLE CONTAMINATED</h3>
              <div class="sim-consequence-sub">CONSEQUENCE TIMELINE // 8 HOURS OF IDLE OPEN EQUIPMENT</div>
            </div>
          </div>

          <!-- Cause and Effect Outage Timeline -->
          <div class="sim-timeline-container">
            <div class="sim-timeline-labels">
              <span>NOW (Day 3)</span>
              <span>HANDOVER</span>
              <span>DISASSEMBLY</span>
              <span>PARTS DELAY</span>
              <span>SCHEDULE SLIP</span>
            </div>
            <div class="sim-timeline-nodes">
              <div class="sim-timeline-node active">1</div>
              <div class="sim-timeline-node active">2</div>
              <div class="sim-timeline-node active">3</div>
              <div class="sim-timeline-node flagged">!</div>
              <div class="sim-timeline-node">5</div>
            </div>
          </div>

          <div class="sim-consequence-body">
            You signed the full handover. Contractors stripped the high-pressure manholes by 03:00 AM, then sat idle for 5 hours because no new gaskets were present to re-seal. High-moisture plant air entered the superheater headers, causing surface rust and requiring an unscheduled borescope cleaning.
          </div>

          <div class="sim-takeaway-banner">
            💡 <strong>KEY TAKEAWAY:</strong> “Opening an asset without the material to close it creates vulnerability, not progress.”
          </div>

          <div style="margin-top:20px; display:flex; gap:12px;">
            <button class="sim-btn sim-btn-reset" onclick="window.simManager.resetCurrentStage()">↺ Replay Scenario</button>
            <button class="sim-btn sim-btn-primary" onclick="window.simManager.loadStage(1)">Back to Stage 1 ➔</button>
          </div>
        </div>
      `;
    } else if (choiceNum === 2) {
      area.innerHTML = `
        <div class="sim-consequence-wrap result-fail">
          <div class="sim-consequence-header">
            <div class="sim-consequence-icon">🛑</div>
            <div>
              <h3 class="sim-consequence-title">OPTION 2: PAUSE AND WAIT — $4,200 CONTRACTOR PENALTY</h3>
              <div class="sim-consequence-sub">CONSEQUENCE TIMELINE // ZERO PROGRESS ACROSS ENTIRE SHIFT</div>
            </div>
          </div>

          <div class="sim-consequence-body">
            You completely refused handover. 30 skilled contractor technicians sat in the staging area drinking tea for 8 hours. Maintenance filed an administrative grievance, and the contractor billed AES $4,200 in idle standby fees. You failed to utilize the 18 hours of float or identify independent auxiliary work packages.
          </div>

          <div class="sim-takeaway-banner">
            💡 <strong>KEY TAKEAWAY:</strong> “Blind refusal is not safety leadership. Great engineers isolate what is ready and re-sequence what is blocked.”
          </div>

          <div style="margin-top:20px; display:flex; gap:12px;">
            <button class="sim-btn sim-btn-reset" onclick="window.simManager.resetCurrentStage()">↺ Replay Scenario</button>
            <button class="sim-btn sim-btn-primary" onclick="window.simManager.loadStage(1)">Back to Stage 1 ➔</button>
          </div>
        </div>
      `;
    } else if (choiceNum === 3) {
      area.innerHTML = `
        <div class="sim-consequence-wrap result-fail">
          <div class="sim-consequence-header">
            <div class="sim-consequence-icon">💥</div>
            <div>
              <h3 class="sim-consequence-title">OPTION 3: CATASTROPHIC STEAM LEAK ON RE-START</h3>
              <div class="sim-consequence-sub">CONSEQUENCE TIMELINE // DAY 25 COMMISSIONING FAILURE</div>
            </div>
          </div>

          <div class="sim-consequence-body">
            <strong>CRITICAL SAFETY VIOLATION:</strong> You authorized nitrile warehouse gaskets (rated for 120°C / 16 bar) on a 540°C / 167 bar superheater steam line. During boiler light-off on Day 25, the gasket suffered explosive thermal decomposition, causing an emergency plant trip, $85,000 in damage, and 4 extra days of forced outage.
          </div>

          <div class="sim-takeaway-banner">
            ❌ <strong>UNCOMPROMISING RULE:</strong> “Never compromise material specifications to protect a schedule.”
          </div>

          <div style="margin-top:20px; display:flex; gap:12px;">
            <button class="sim-btn sim-btn-reset" onclick="window.simManager.resetCurrentStage()">↺ Replay Scenario</button>
          </div>
        </div>
      `;
    } else if (choiceNum === 4) {
      this.updateXP(300);
      area.innerHTML = `
        <div class="sim-consequence-wrap result-success">
          <div class="sim-consequence-header">
            <div class="sim-consequence-icon">🏆</div>
            <div>
              <h3 class="sim-consequence-title">OPTION 4: MASTER RE-SEQUENCING EXECUTED</h3>
              <div class="sim-consequence-sub">OPTIMAL CROSS-FUNCTIONAL LEADERSHIP // 100% CREW PRODUCTIVITY</div>
            </div>
          </div>

          <div class="sim-achievement-card">
            <div class="sim-achieve-trophy">🎖️</div>
            <div class="sim-achieve-text">
              <h4>ACHIEVEMENT UNLOCKED: CROSS-FUNCTIONAL SYSTEM LEADER</h4>
              <p>Solved multi-factor friction by aligning Operations, Maintenance & SCM. 0 hours lost, 100% safety preserved!</p>
            </div>
          </div>

          <!-- Cause and Effect Outage Timeline -->
          <div class="sim-timeline-container">
            <div class="sim-timeline-labels">
              <span>DAY 3 (00:00)</span>
              <span>COLD ISOLATION</span>
              <span>VALVES OVERHAUL</span>
              <span>GASKETS ARRIVE (08:00)</span>
              <span>MANHOLE COMPLETE</span>
            </div>
            <div class="sim-timeline-nodes">
              <div class="sim-timeline-node active">✓</div>
              <div class="sim-timeline-node active">✓</div>
              <div class="sim-timeline-node active">✓</div>
              <div class="sim-timeline-node active">✓</div>
              <div class="sim-timeline-node active">✓</div>
            </div>
          </div>

          <div class="sim-consequence-body">
            <strong>Systemic Leadership Masterclass:</strong> You signed cold-side isolation for Work Package B (Auxiliary safety valves), putting all 30 technicians to work immediately with zero idle time. At 08:00 AM, SCM's hotshot courier arrived with the certified superheater gaskets. Technicians transitioned to the main manholes just as auxiliary work completed. 
          </div>

          <div class="sim-reflection-grid">
            <div class="sim-reflection-card">
              <h4>1. Competing Priorities</h4>
              <p>Aligned maintenance's schedule urgency with operations' isolation safety.</p>
            </div>
            <div class="sim-reflection-card">
              <h4>2. Incomplete Information</h4>
              <p>Proactively verified SCM's exact customs ETA instead of guessing.</p>
            </div>
            <div class="sim-reflection-card">
              <h4>3. Cross-Functional Dependencies</h4>
              <p>Collaborated across Operations, Maintenance, and SCM to solve the whole system.</p>
            </div>
          </div>

          <div class="sim-takeaway-banner">
            ⭐ <strong>FINAL KEY TAKEAWAY:</strong> “A bottleneck is rarely owned by one function. Solve the system, not just the task.”
          </div>

          <div style="margin-top:20px; display:flex; gap:12px;">
            <button class="sim-btn sim-btn-reset" onclick="window.simManager.resetCurrentStage()">↺ Replay Scenario</button>
            <a href="assessment.html" class="sim-btn sim-btn-primary">Proceed to Final Certification Assessment ➔</a>
          </div>
        </div>
      `;
    }
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  window.simManager = new SimulationGameManager();
  window.simManager.init();
});
