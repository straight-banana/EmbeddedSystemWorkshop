import { useState, useEffect, useRef } from "react";

// ── Color palette: circuit-board dark theme ──────────────────────────────────
const C = {
  bg:      '#0a0e1a',
  card:    '#111827',
  card2:   '#1e293b',
  border:  '#1e3a5f',
  cyan:    '#22d3ee',
  green:   '#4ade80',
  orange:  '#fb923c',
  red:     '#f87171',
  purple:  '#a78bfa',
  yellow:  '#fbbf24',
  blue:    '#60a5fa',
  text:    '#e2e8f0',
  muted:   '#94a3b8',
  dim:     '#475569',
  arduino: '#00adb5',
  esp32:   '#e95b2e',
};

const topics = [
  { id: 'boards',  icon: '🔌', title: 'Arduino vs ESP32'  },
  { id: 'voltage', icon: '⚡', title: 'Voltage & Threshold' },
  { id: 'signals', icon: '〰️', title: 'Digital vs Analog'  },
  { id: 'i2c',    icon: '🔗', title: 'I2C Protocol'       },
  { id: 'serial', icon: '📟', title: 'Serial & Baud Rate' },
  { id: 'adc',    icon: '🔢', title: 'ADC Conversion'     },
  { id: 'pcm',    icon: '🎵', title: 'PCM (Sampling)'     },
  { id: 'pwm',    icon: '💡', title: 'PWM Duty Cycle'     },
  { id: 'gpio',   icon: '📌', title: 'GPIO & Resistors'   },
  { id: 'boot',   icon: '🚀', title: 'Boot & Memory'      },
  { id: 'delay',  icon: '⏱️', title: 'delay() vs millis()' },
];

// ── Shared UI primitives ─────────────────────────────────────────────────────
const Box = ({ children, style }) => (
  <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, ...style }}>
    {children}
  </div>
);

const SLabel = ({ children, color = C.cyan }) => (
  <div style={{ color, fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
    marginBottom: 8, fontFamily: 'monospace', opacity: 0.85 }}>
    {children}
  </div>
);

const EasyIdea = ({ text }) => (
  <div style={{ background: '#16213e', borderLeft: `3px solid ${C.yellow}`,
    borderRadius: '0 8px 8px 0', padding: 12, marginTop: 12 }}>
    <div style={{ color: C.yellow, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>
      💡 EASY IDEA
    </div>
    <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>{text}</div>
  </div>
);

const Chip = ({ children, active, color = C.cyan, onClick }) => (
  <button onClick={onClick} style={{
    padding: '5px 13px', borderRadius: 6, cursor: 'pointer', fontSize: 12,
    border: `1.5px solid ${active ? color : '#30445f'}`,
    background: active ? color + '22' : 'transparent',
    color: active ? color : C.dim,
    fontWeight: active ? 600 : 400, transition: 'all 0.15s',
  }}>{children}</button>
);

const MiniBtn = ({ children, active, color = C.cyan, onClick }) => (
  <button onClick={onClick} style={{
    padding: '4px 9px', borderRadius: 6, cursor: 'pointer', fontSize: 11,
    border: `1px solid ${active ? color : C.dim}`,
    background: active ? color + '22' : 'transparent',
    color: active ? color : C.muted,
    fontWeight: active ? 700 : 400,
  }}>{children}</button>
);

// ── SECTION 1: Arduino vs ESP32 ──────────────────────────────────────────────
function BoardsSection() {
  const specs = [
    { label: 'Clock Speed', ard: 16,   esp: 240,  max: 240,  unit: 'MHz' },
    { label: 'RAM (SRAM)',  ard: 2,    esp: 520,  max: 520,  unit: 'KB'  },
    { label: 'Flash',       ard: 32,   esp: 4096, max: 4096, unit: 'KB'  },
  ];
  return (
    <div>
      <h2 style={{ color: C.text, fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>🔌 Arduino vs ESP32</h2>
      <p style={{ color: C.muted, fontSize: 13, margin: '0 0 16px' }}>MCU (Micro Controller Unit) Comparison</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        {[
          { name: 'Arduino Uno / Nano', mcu: 'ATmega328P', color: C.arduino,
            specs: ['16 MHz clock', '2 KB SRAM', '32 KB Flash', '5V Logic', 'No WiFi / BT'] },
          { name: 'ESP32', mcu: 'Dual-core Xtensa LX6', color: C.esp32,
            specs: ['240 MHz clock', '520 KB SRAM', '4 MB Flash', '3.3V Logic', 'WiFi + BLE ✅'] },
        ].map(b => (
          <Box key={b.name} style={{ borderColor: b.color + '55' }}>
            <div style={{ color: b.color, fontWeight: 800, fontSize: 15, marginBottom: 4 }}>{b.name}</div>
            <div style={{ color: C.muted, fontSize: 10, fontFamily: 'monospace', marginBottom: 10 }}>{b.mcu}</div>
            {b.specs.map(s => (
              <div key={s} style={{ fontSize: 12, color: C.text, padding: '4px 0',
                borderBottom: `1px solid ${C.border}`, display: 'flex', gap: 6 }}>
                <span style={{ color: b.color }}>▸</span>{s}
              </div>
            ))}
          </Box>
        ))}
      </div>

      <Box style={{ marginBottom: 12 }}>
        <SLabel>Performance Comparison</SLabel>
        {specs.map(s => (
          <div key={s.label} style={{ marginBottom: 12 }}>
            <div style={{ color: C.muted, fontSize: 11, marginBottom: 4 }}>{s.label}</div>
            {[{ val: s.ard, color: C.arduino, label: 'Arduino' },
              { val: s.esp, color: C.esp32,   label: 'ESP32'   }].map(b => (
              <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                <div style={{ width: 55, color: b.color, fontSize: 11, textAlign: 'right' }}>{b.label}</div>
                <div style={{ flex: 1, height: 13, background: C.card2, borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${(b.val / s.max) * 100}%`, height: '100%',
                    background: b.color + 'bb', borderRadius: 4, minWidth: 4 }} />
                </div>
                <div style={{ width: 80, color: C.text, fontSize: 11 }}>{b.val} {s.unit}</div>
              </div>
            ))}
          </div>
        ))}
      </Box>

      <Box>
        <SLabel color={C.red}>⚠️ Voltage Compatibility</SLabel>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center', padding: '10px 16px', background: C.arduino + '22',
            borderRadius: 8, border: `1px solid ${C.arduino}` }}>
            <div style={{ color: C.arduino, fontWeight: 700, fontSize: 11 }}>Arduino OUTPUT</div>
            <div style={{ color: C.text, fontSize: 26, fontWeight: 900 }}>5V</div>
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ color: C.red, fontWeight: 700, fontSize: 12 }}>⚠️ DANGEROUS!</div>
            <div style={{ color: C.muted, fontSize: 11, lineHeight: 1.5 }}>Need TXS0108E<br/>Logic Level Shifter</div>
            <div style={{ fontSize: 22, margin: '4px 0', color: C.dim }}>→</div>
          </div>
          <div style={{ textAlign: 'center', padding: '10px 16px', background: C.esp32 + '22',
            borderRadius: 8, border: `1px solid ${C.esp32}` }}>
            <div style={{ color: C.esp32, fontWeight: 700, fontSize: 11 }}>ESP32 INPUT</div>
            <div style={{ color: C.text, fontSize: 26, fontWeight: 900 }}>3.3V</div>
            <div style={{ color: C.red, fontSize: 10 }}>MAX!</div>
          </div>
        </div>
        <div style={{ marginTop: 10, padding: 8, background: C.green + '11', borderRadius: 6,
          color: C.green, fontSize: 12, textAlign: 'center' }}>
          ✅ ESP32 → Arduino (3.3V → 5V pin) = SAFE! Arduino INPUT handles lower voltages.
        </div>
      </Box>

      <EasyIdea text="Arduino = সাইকেল: শেখার জন্য easy, documentation বেশি। ESP32 = মোটরসাইকেল: বেশি শক্তিশালী, WiFi/BLE আছে। কিন্তু সাবধান — Arduino 5V, ESP32 3.3V! সরাসরি connect করলে ESP32 নষ্ট হবে।" />
    </div>
  );
}

// ── SECTION 2: Voltage & Threshold ──────────────────────────────────────────
function VoltageSection() {
  const [volt, setVolt]   = useState(2.5);
  const [board, setBoard] = useState('arduino');

  const cfg = board === 'arduino'
    ? { max: 5,   highMin: 2.5, lowMax: 1.0, label: 'Arduino — 5V Logic' }
    : { max: 3.3, highMin: 1.8, lowMax: 0.8, label: 'ESP32 — 3.3V Logic' };

  const v     = Math.min(volt, cfg.max);
  const state = v >= cfg.highMin ? 'HIGH' : v <= cfg.lowMax ? 'LOW' : 'UNDEFINED';
  const sc    = state === 'HIGH' ? C.green : state === 'LOW' ? C.red : C.orange;

  const highZoneH = ((cfg.max - cfg.highMin) / cfg.max) * 100;
  const lowZoneH  = (cfg.lowMax / cfg.max) * 100;
  const fillH     = (v / cfg.max) * 100;

  // ── Pull-up / Pull-down hypothetical demo ──────────────────────────────
  const [pinConfig, setPinConfig] = useState('floating');
  const [pulled, setPulled]       = useState(false);
  const [pinVolt, setPinVolt]     = useState(cfg.max);

  const pinVoltRef   = useRef(cfg.max);
  const pinConfigRef = useRef('floating');
  const pulledRef    = useRef(false);
  const cfgRef       = useRef(cfg);
  const histCanvasRef = useRef(null);
  const histRef        = useRef([]);

  useEffect(() => { pinConfigRef.current = pinConfig; }, [pinConfig]);
  useEffect(() => { pulledRef.current = pulled; }, [pulled]);
  useEffect(() => { cfgRef.current = cfg; }, [cfg]);
  useEffect(() => { histRef.current = new Array(150).fill(pinVoltRef.current); }, [pinConfig]);

  useEffect(() => {
    let animId, lastTick = 0;
    if (histRef.current.length === 0) histRef.current = new Array(150).fill(cfg.max);

    const draw = (ts) => {
      if (ts - lastTick > 60) {
        lastTick = ts;
        const conf = pinConfigRef.current;
        const c = cfgRef.current;
        const prev = pinVoltRef.current;
        let next;
        if (conf === 'floating') {
          next = prev + (Math.random() - 0.5) * c.max * 0.45;
          next = Math.max(0, Math.min(c.max, next));
        } else if (conf === 'pullup') {
          const target = pulledRef.current ? 0 : c.max;
          next = Math.max(0, Math.min(c.max, target + (Math.random() - 0.5) * c.max * 0.05));
        } else {
          const target = pulledRef.current ? c.max : 0;
          next = Math.max(0, Math.min(c.max, target + (Math.random() - 0.5) * c.max * 0.05));
        }
        pinVoltRef.current = next;
        setPinVolt(next);
        histRef.current.push(next);
        if (histRef.current.length > 150) histRef.current.shift();
      }

      const canvas = histCanvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const W = canvas.width, H = canvas.height;
        const c = cfgRef.current;
        ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);
        const hiY = H - (c.highMin / c.max) * H;
        const loY = H - (c.lowMax / c.max) * H;
        ctx.fillStyle = C.green + '16';  ctx.fillRect(0, 0, W, hiY);
        ctx.fillStyle = C.orange + '16'; ctx.fillRect(0, hiY, W, loY - hiY);
        ctx.fillStyle = C.red + '16';    ctx.fillRect(0, loY, W, H - loY);
        ctx.strokeStyle = C.dim + '66'; ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
        ctx.beginPath(); ctx.moveTo(0, hiY); ctx.lineTo(W, hiY); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, loY); ctx.lineTo(W, loY); ctx.stroke();
        ctx.setLineDash([]);

        const hist = histRef.current, n = hist.length, stepX = W / n;
        ctx.strokeStyle = C.cyan; ctx.lineWidth = 2.5; ctx.shadowColor = C.cyan; ctx.shadowBlur = 4;
        ctx.beginPath();
        hist.forEach((vv, i) => {
          const y = H - (vv / c.max) * H;
          i === 0 ? ctx.moveTo(i * stepX, y) : ctx.lineTo(i * stepX, y);
        });
        ctx.stroke(); ctx.shadowBlur = 0;
      }
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, []);

  const pinState = pinVolt >= cfg.highMin ? 'HIGH' : pinVolt <= cfg.lowMax ? 'LOW' : 'UNDEFINED';
  const pinSc = pinState === 'HIGH' ? C.green : pinState === 'LOW' ? C.red : C.orange;

  return (
    <div>
      <h2 style={{ color: C.text, fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>⚡ Voltage & Threshold</h2>
      <p style={{ color: C.muted, fontSize: 13, margin: '0 0 16px' }}>How an MCU decides if a signal is HIGH (1) or LOW (0)</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <Chip active={board === 'arduino'} color={C.arduino}
          onClick={() => { setBoard('arduino'); setVolt(2.5); }}>🟦 Arduino (5V)</Chip>
        <Chip active={board === 'esp32'} color={C.esp32}
          onClick={() => { setBoard('esp32'); setVolt(1.65); }}>🟥 ESP32 (3.3V)</Chip>
      </div>

      <Box>
        <SLabel>{cfg.label}</SLabel>
        <div style={{ display: 'flex', gap: 20, alignItems: 'stretch' }}>
          <div style={{ width: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ color: C.muted, fontSize: 10 }}>{cfg.max}V</div>
            <div style={{ flex: 1, width: 34, position: 'relative', background: C.card2,
              borderRadius: 6, overflow: 'hidden', minHeight: 190 }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0,
                height: `${highZoneH}%`, background: C.green + '33',
                borderBottom: `2px solid ${C.green}` }}>
                <span style={{ color: C.green, fontSize: 8, position: 'absolute', top: 3, left: 3 }}>HIGH</span>
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0,
                height: `${lowZoneH}%`, background: C.red + '33',
                borderTop: `2px solid ${C.red}` }}>
                <span style={{ color: C.red, fontSize: 8, position: 'absolute', bottom: 3, left: 3 }}>LOW</span>
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0,
                height: `${fillH}%`, background: sc + '55',
                borderTop: `3px solid ${sc}`, transition: 'height 0.1s, border-color 0.1s' }} />
            </div>
            <div style={{ color: C.muted, fontSize: 10 }}>0V</div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ color: C.muted, fontSize: 12 }}>Input Voltage</span>
                <span style={{ color: sc, fontWeight: 700, fontSize: 18, fontFamily: 'monospace' }}>
                  {v.toFixed(2)} V
                </span>
              </div>
              <input type="range" min="0" max={cfg.max * 100} value={v * 100}
                onChange={e => setVolt(Number(e.target.value) / 100)}
                style={{ width: '100%', accentColor: sc, cursor: 'pointer' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', color: C.dim, fontSize: 10 }}>
                <span>0V</span><span>{cfg.max}V</span>
              </div>
            </div>

            <div style={{ background: sc + '22', border: `2px solid ${sc}`, borderRadius: 10,
              padding: 14, textAlign: 'center' }}>
              <div style={{ color: sc, fontSize: 40, fontWeight: 900, fontFamily: 'monospace', lineHeight: 1 }}>
                {state === 'UNDEFINED' ? '???' : state}
              </div>
              <div style={{ color: C.muted, fontSize: 12, marginTop: 4 }}>
                {state === 'HIGH' && `Pin reads digital 1 — voltage ≥ ${cfg.highMin}V`}
                {state === 'LOW' && `Pin reads digital 0 — voltage ≤ ${cfg.lowMax}V`}
                {state === 'UNDEFINED' && '⚠️ Undefined zone — output is unpredictable!'}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 12 }}>
              {[
                { l: 'HIGH when', v: `≥ ${cfg.highMin}V`, c: C.green  },
                { l: 'LOW when',  v: `≤ ${cfg.lowMax}V`, c: C.red    },
                { l: 'Output',    v: `${cfg.max}V`,       c: C.cyan   },
              ].map(i => (
                <div key={i.l} style={{ background: C.card2, borderRadius: 8, padding: 8, textAlign: 'center' }}>
                  <div style={{ color: C.dim, fontSize: 10 }}>{i.l}</div>
                  <div style={{ color: i.c, fontWeight: 700, fontFamily: 'monospace', fontSize: 14 }}>{i.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Box>

      <Box style={{ marginTop: 12, borderColor: C.purple + '55' }}>
        <SLabel color={C.purple}>🔧 What Pull-up / Pull-down Resistors Actually Do</SLabel>
        <p style={{ color: C.muted, fontSize: 12, marginTop: -2, marginBottom: 12 }}>
          A resistor can't change where the Undefined Zone sits — but it can guarantee the pin never rests there by default.
        </p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
          <Chip active={pinConfig === 'floating'} color={C.red}
            onClick={() => { setPinConfig('floating'); setPulled(false); }}>🌀 Floating (no resistor)</Chip>
          <Chip active={pinConfig === 'pullup'} color={C.cyan}
            onClick={() => { setPinConfig('pullup'); setPulled(false); }}>⬆️ Pull-up Resistor</Chip>
          <Chip active={pinConfig === 'pulldown'} color={C.orange}
            onClick={() => { setPinConfig('pulldown'); setPulled(false); }}>⬇️ Pull-down Resistor</Chip>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 110px', gap: 16, alignItems: 'center', marginBottom: 12 }}>
          <canvas ref={histCanvasRef} width={420} height={120} style={{ width: '100%', borderRadius: 6, display: 'block' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: pinSc, fontFamily: 'monospace', fontWeight: 900, fontSize: 22 }}>
              {pinState === 'UNDEFINED' ? '???' : pinState}
            </div>
            <div style={{ color: C.dim, fontSize: 10, marginBottom: 8 }}>{pinVolt.toFixed(2)}V</div>

            {pinConfig !== 'floating' ? (
              <button
                onMouseDown={() => setPulled(true)}
                onMouseUp={() => setPulled(false)}
                onMouseLeave={() => setPulled(false)}
                onTouchStart={e => { e.preventDefault(); setPulled(true); }}
                onTouchEnd={() => setPulled(false)}
                style={{
                  width: 58, height: 58, borderRadius: '50%', cursor: 'pointer',
                  background: pulled ? pinSc + '44' : C.card2,
                  border: `3px solid ${pinConfig === 'pullup' ? C.cyan : C.orange}`,
                  color: C.text, fontSize: 9, fontWeight: 700,
                  boxShadow: pulled ? `0 0 14px ${pinSc}88` : 'none',
                  transform: pulled ? 'scale(0.93)' : 'scale(1)', transition: 'all 0.08s',
                  userSelect: 'none',
                }}>{pulled ? '⬤' : 'HOLD'}</button>
            ) : (
              <div style={{ color: C.red, fontSize: 10 }}>⚡ uncontrollable!</div>
            )}
          </div>
        </div>

        <div style={{
          background: (pinConfig === 'floating' ? C.red : C.green) + '15',
          border: `1px solid ${(pinConfig === 'floating' ? C.red : C.green)}55`,
          borderRadius: 8, padding: 10, fontSize: 12,
          color: pinConfig === 'floating' ? C.red : C.green, lineHeight: 1.6,
        }}>
          {pinConfig === 'floating' && "⚠️ With no resistor, the pin has no default state — it drifts on stray electrical noise and regularly lands in the orange Undefined Zone, where the MCU genuinely can't tell HIGH from LOW."}
          {pinConfig === 'pullup' && "✅ The pull-up resistor ties the pin firmly to VCC by default — it never rests in the Undefined Zone, only ever HIGH. Hold the button to pull it down to GND (LOW); release and it snaps right back to a solid HIGH."}
          {pinConfig === 'pulldown' && "✅ The pull-down resistor ties the pin firmly to GND by default — it never rests in the Undefined Zone, only ever LOW. Hold the button to pull it up to VCC (HIGH); release and it snaps right back to a solid LOW."}
        </div>
      </Box>

      <EasyIdea text="স্কুলের gate-এ guard আছে। সে বলছে: 'এই লাইন থেকে লম্বা হলে ভেতরে ঢুকতে পারবে।' Microcontroller-ও voltage দেখে সিদ্ধান্ত নেয়। Threshold-এর উপরে = HIGH (1), নিচে = LOW (0), মাঝামাঝি = guard confused (Undefined)! Pull-up/pull-down resistor লাগালে pin আর কখনো মাঝামাঝি 'confused' অবস্থায় আটকে থাকে না — হয় জোর করে HIGH, না হয় জোর করে LOW রাখে।" />
    </div>
  );
}

// ── SECTION 3: Digital vs Analog — INTERACTIVE LAB ──────────────────────────
function SignalsSection() {
  const [noise, setNoise]     = useState(false);
  const [pressed, setPressed] = useState(false);
  const [analogPct, setAnalogPct] = useState(50);
  const [readout, setReadout] = useState({ digRaw: 0, digClean: 0, anaRaw: 50 });

  const pressedRef = useRef(false);
  const analogRef  = useRef(50);
  const noiseRef   = useRef(false);
  useEffect(() => { pressedRef.current = pressed; }, [pressed]);
  useEffect(() => { analogRef.current = analogPct; }, [analogPct]);
  useEffect(() => { noiseRef.current = noise; }, [noise]);

  const digCanvasRef = useRef(null);
  const anaCanvasRef = useRef(null);
  const digHistRef = useRef([]);
  const anaHistRef = useRef([]);

  useEffect(() => {
    let animId, frame = 0;
    if (digHistRef.current.length === 0) for (let i = 0; i < 200; i++) digHistRef.current.push({ raw: 0, clean: 0 });
    if (anaHistRef.current.length === 0) for (let i = 0; i < 200; i++) anaHistRef.current.push(50);

    const drawDigital = () => {
      const canvas = digCanvasRef.current; if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const W = canvas.width, H = canvas.height;
      ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);
      const hiY = H * 0.25, loY = H * 0.75;
      ctx.fillStyle = C.green + '14'; ctx.fillRect(0, 0, W, hiY);
      ctx.fillStyle = C.red + '14';   ctx.fillRect(0, loY, W, H - loY);
      const hist = digHistRef.current, n = hist.length, stepX = W / n;
      ctx.strokeStyle = C.muted + 'aa'; ctx.lineWidth = 1.5;
      ctx.beginPath();
      hist.forEach((p, i) => { const y = H - (p.raw / 5) * H; i === 0 ? ctx.moveTo(i * stepX, y) : ctx.lineTo(i * stepX, y); });
      ctx.stroke();
      ctx.strokeStyle = C.cyan; ctx.lineWidth = 3; ctx.shadowColor = C.cyan; ctx.shadowBlur = 5;
      ctx.beginPath();
      let prevY = null;
      hist.forEach((p, i) => {
        const y = p.clean ? H * 0.12 : H * 0.88;
        const x = i * stepX;
        if (prevY !== null && Math.abs(y - prevY) > 2) { ctx.lineTo(x, prevY); ctx.lineTo(x, y); }
        else { i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
        prevY = y;
      });
      ctx.stroke(); ctx.shadowBlur = 0;
    };

    const drawAnalog = () => {
      const canvas = anaCanvasRef.current; if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const W = canvas.width, H = canvas.height;
      ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = C.border; ctx.lineWidth = 1;
      [0, 25, 50, 75, 100].forEach(p => { const y = H - (p / 100) * H; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); });
      const hist = anaHistRef.current, n = hist.length, stepX = W / n;
      ctx.strokeStyle = C.orange; ctx.lineWidth = 3; ctx.shadowColor = C.orange; ctx.shadowBlur = 5;
      ctx.beginPath();
      hist.forEach((v, i) => { const y = H - (v / 100) * H; const x = i * stepX; i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); });
      ctx.stroke(); ctx.shadowBlur = 0;
    };

    const loop = () => {
      frame++;
      if (frame % 2 === 0) {
        const baseV = pressedRef.current ? 5 : 0;
        const dn = noiseRef.current ? (Math.random() * 1.6 - 0.8) : 0;
        const raw = Math.max(0, Math.min(5, baseV + dn));
        const clean = raw >= 2.5 ? 1 : 0;
        digHistRef.current.push({ raw, clean });
        if (digHistRef.current.length > 200) digHistRef.current.shift();

        const an = noiseRef.current ? (Math.random() * 8 - 4) : 0;
        const araw = Math.max(0, Math.min(100, analogRef.current + an));
        anaHistRef.current.push(araw);
        if (anaHistRef.current.length > 200) anaHistRef.current.shift();
      }
      drawDigital(); drawAnalog();
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    const ri = setInterval(() => {
      const dh = digHistRef.current[digHistRef.current.length - 1] || { raw: 0, clean: 0 };
      const ah = anaHistRef.current[anaHistRef.current.length - 1] ?? 50;
      setReadout({ digRaw: dh.raw, digClean: dh.clean, anaRaw: ah });
    }, 150);

    return () => { cancelAnimationFrame(animId); clearInterval(ri); };
  }, []);

  return (
    <div>
      <h2 style={{ color: C.text, fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>〰️ Digital vs Analog — Interactive Lab</h2>
      <p style={{ color: C.muted, fontSize: 13, margin: '0 0 16px' }}>Press a button, turn a dial, and watch how each signal type really behaves</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <Chip active={noise} color={C.red} onClick={() => setNoise(n => !n)}>
          {noise ? '🔊 Electrical Noise: ON' : '🔇 Electrical Noise: OFF'}
        </Chip>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        {/* DIGITAL LAB */}
        <Box style={{ borderColor: C.cyan + '55' }}>
          <SLabel color={C.cyan}>🔲 Digital Lab — Hold the Button</SLabel>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 10 }}>
            <button
              onMouseDown={() => setPressed(true)}
              onMouseUp={() => setPressed(false)}
              onMouseLeave={() => setPressed(false)}
              onTouchStart={e => { e.preventDefault(); setPressed(true); }}
              onTouchEnd={() => setPressed(false)}
              style={{
                width: 62, height: 62, borderRadius: '50%', cursor: 'pointer', flexShrink: 0,
                background: pressed ? C.cyan + '44' : C.card2,
                border: `3px solid ${C.cyan}`, color: C.text, fontWeight: 700, fontSize: 10,
                boxShadow: pressed ? `0 0 18px ${C.cyan}88` : 'none',
                transform: pressed ? 'scale(0.93)' : 'scale(1)', transition: 'all 0.08s',
                userSelect: 'none',
              }}>{pressed ? '⬤' : 'HOLD'}</button>
            <div>
              <div style={{ color: C.dim, fontSize: 10 }}>digitalRead() →</div>
              <div style={{ color: readout.digClean ? C.green : C.red, fontFamily: 'monospace', fontWeight: 900, fontSize: 28 }}>
                {readout.digClean ? 'HIGH' : 'LOW'}
              </div>
            </div>
          </div>
          <canvas ref={digCanvasRef} width={400} height={110} style={{ width: '100%', borderRadius: 6, display: 'block' }} />
          <div style={{ display: 'flex', gap: 12, marginTop: 6, fontSize: 10 }}>
            <span style={{ color: C.muted }}>▬ raw voltage</span>
            <span style={{ color: C.cyan }}>▬ interpreted bit</span>
          </div>
          {noise && (
            <div style={{ marginTop: 8, color: C.green, fontSize: 11 }}>
              ✅ Noise injected, but the reading stays clean — the threshold ignores small jitter.
            </div>
          )}
        </Box>

        {/* ANALOG LAB */}
        <Box style={{ borderColor: C.orange + '55' }}>
          <SLabel color={C.orange}>〰️ Analog Lab — Turn the Dial</SLabel>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 10 }}>
            <div style={{ width: 62, height: 62, flexShrink: 0 }}>
              <svg viewBox="0 0 64 64" style={{ width: '100%', height: '100%' }}>
                <circle cx="32" cy="32" r="28" fill={C.card2} stroke={C.orange} strokeWidth="3" />
                <line x1="32" y1="32"
                  x2={32 + 22 * Math.sin((-135 + analogPct / 100 * 270) * Math.PI / 180)}
                  y2={32 - 22 * Math.cos((-135 + analogPct / 100 * 270) * Math.PI / 180)}
                  stroke={C.orange} strokeWidth="3" strokeLinecap="round" />
                <circle cx="32" cy="32" r="3" fill={C.orange} />
              </svg>
            </div>
            <div>
              <div style={{ color: C.dim, fontSize: 10 }}>analogRead() →</div>
              <div style={{ color: C.orange, fontFamily: 'monospace', fontWeight: 900, fontSize: 24 }}>
                {Math.round(readout.anaRaw)}%
              </div>
              <div style={{ color: C.dim, fontSize: 10 }}>≈ {Math.round((readout.anaRaw / 100) * 1023)} / 1023</div>
            </div>
          </div>
          <input type="range" min="0" max="100" value={analogPct}
            onChange={e => setAnalogPct(Number(e.target.value))}
            style={{ width: '100%', accentColor: C.orange, cursor: 'pointer', marginBottom: 8 }} />
          <div style={{ display: 'flex', gap: 5, marginBottom: 8, flexWrap: 'wrap' }}>
            {[['Dark', 0], ['Dim', 25], ['Mid', 50], ['Bright', 75], ['Max', 100]].map(([l, v]) => (
              <MiniBtn key={l} active={analogPct === v} color={C.orange} onClick={() => setAnalogPct(v)}>{l}</MiniBtn>
            ))}
          </div>
          <canvas ref={anaCanvasRef} width={400} height={110} style={{ width: '100%', borderRadius: 6, display: 'block' }} />
          <div style={{ height: 17 }}>
            {noise && (
              <div style={{ marginTop: 8, color: C.red, fontSize: 11 }}>
                ⚠️ Every bit of noise shows up directly — there's no threshold to protect it.
              </div>
            )}
          </div>
        </Box>
      </div>

      <Box>
        <SLabel>Digital vs Analog — Quick Reference</SLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[
            { label: 'DIGITAL', color: C.cyan,   rows: [['States', '2 only (HIGH/LOW)'], ['Function', 'digitalRead/Write'], ['Noise', 'Resistant (thresholded)']] },
            { label: 'ANALOG',  color: C.orange, rows: [['States', 'Infinite (0–max)'], ['Function', 'analogRead/Write'], ['Noise', 'Sensitive (no threshold)']] },
          ].map(col => (
            <div key={col.label}>
              <div style={{ color: col.color, fontWeight: 800, fontSize: 13, marginBottom: 6 }}>{col.label}</div>
              {col.rows.map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ color: C.dim, fontSize: 11 }}>{k}</span>
                  <span style={{ color: col.color, fontSize: 11, fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Box>

      <EasyIdea text="Digital button = light switch: HOLD করলে wire সাথে সাথে HIGH report করে, wire-এ noise থাকলেও threshold ছোট jitter ignore করে। Analog dial = পানির tap: একটু ঘোরালেই reading বদলে যায় — কিন্তু এটাই সমস্যা, noise সরাসরি ঢুকে পড়ে কারণ filter করার কোনো threshold নেই।" />
    </div>
  );
}

// ── SECTION 4: I2C Protocol ──────────────────────────────────────────────────
function I2CSection() {
  const canvasRef  = useRef(null);
  const [paused, setPaused] = useState(false);
  const tRef      = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const DATA = [1,1,0,1,0,0,1,0,1,1,0,1];
    const CLK  = 80;
    let animId;

    const drawWire = (pts, col) => {
      ctx.strokeStyle = col; ctx.lineWidth = 2.5;
      ctx.shadowColor = col; ctx.shadowBlur = 5;
      ctx.beginPath();
      let py = null;
      pts.forEach(([x, y]) => {
        if (py !== null && Math.abs(y - py) > 5) { ctx.lineTo(x, py); ctx.lineTo(x, y); }
        else { py === null ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
        py = y;
      });
      ctx.stroke(); ctx.shadowBlur = 0;
    };

    const draw = () => {
      ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);
      if (!pausedRef.current) tRef.current += 1.5;
      const t = tRef.current;

      const sclPts = [];
      for (let x = 0; x <= W; x += 2) {
        const ph = ((x + t) % CLK) / CLK;
        sclPts.push([x, ph < 0.5 ? 30 : 70]);
      }
      drawWire(sclPts, C.purple);
      ctx.fillStyle = C.purple; ctx.font = 'bold 12px monospace';
      ctx.fillText('SCL (Clock)', 4, 22);

      const sdaPts = [];
      for (let x = 0; x <= W; x += 2) {
        const bit = DATA[Math.floor((x + t) / CLK) % DATA.length];
        sdaPts.push([x, bit ? 115 : 155]);
      }
      drawWire(sdaPts, C.orange);
      ctx.fillStyle = C.orange; ctx.font = 'bold 12px monospace';
      ctx.fillText('SDA (Data)', 4, 107);

      ctx.fillStyle = C.dim; ctx.font = '10px monospace';
      ['1','0'].forEach((v, i) => ctx.fillText(v, W-18, [34, 74][i]));
      ['1','0'].forEach((v, i) => ctx.fillText(v, W-18, [119, 159][i]));

      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div>
      <h2 style={{ color: C.text, fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>🔗 I2C Protocol</h2>
      <p style={{ color: C.muted, fontSize: 13, margin: '0 0 16px' }}>Inter-Integrated Circuit — 2-wire communication between devices</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <Chip active={paused} color={C.green} onClick={() => setPaused(p => !p)}>{paused ? '▶️ Play' : '⏸️ Pause'}</Chip>
      </div>

      <Box style={{ marginBottom: 12 }}>
        <SLabel>Live I2C Timing Diagram</SLabel>
        <canvas ref={canvasRef} width={560} height={190}
          style={{ width: '100%', borderRadius: 6, display: 'block' }} />
        <div style={{ display: 'flex', gap: 20, marginTop: 8 }}>
          {[['SCL', C.purple, 'Clock — controls timing'],
            ['SDA', C.orange, 'Data — carries bits']].map(([l, c, d]) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 20, height: 3, background: c, borderRadius: 2 }} />
              <span style={{ color: c, fontSize: 12, fontWeight: 700 }}>{l}</span>
              <span style={{ color: C.dim, fontSize: 11 }}>{d}</span>
            </div>
          ))}
        </div>
      </Box>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Box>
          <SLabel>How I2C Works</SLabel>
          {[['SDA', 'Serial Data — actual bit stream', C.orange],
            ['SCL', 'Serial Clock — timing control',   C.purple],
            ['GND', 'Common ground (always needed!)',  C.dim   ]].map(([w, d, c]) => (
            <div key={w} style={{ display: 'flex', gap: 10, padding: '7px 0', borderBottom: `1px solid ${C.border}` }}>
              <span style={{ color: c, fontWeight: 700, fontFamily: 'monospace', width: 36 }}>{w}</span>
              <span style={{ color: C.muted, fontSize: 12 }}>{d}</span>
            </div>
          ))}
        </Box>
        <Box>
          <SLabel>Key Facts</SLabel>
          {[['Total wires',    '2 (SDA + SCL)'],
            ['Devices per bus','Up to 127'],
            ['Pull-up needed', '4.7kΩ or 10kΩ'],
            ['Common use',     'OLED, RTC, sensors']].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between',
              padding: '7px 0', borderBottom: `1px solid ${C.border}` }}>
              <span style={{ color: C.dim, fontSize: 12 }}>{k}</span>
              <span style={{ color: C.cyan, fontSize: 12, fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </Box>
      </div>

      <EasyIdea text="টেবিলে কয়েকজন বসে সবাই কথা বলতে চায়। একটা ব্যবস্থা করা হলো — সবাইকে নির্দিষ্ট টাইম দেওয়া হলো। SCL সেই সময় দেয় (clock), SDA দিয়ে কথা বলা হয় (data)। একই wire-এ অনেক device — অনেকটা সংসদ ভবনের মতো!" />
    </div>
  );
}

// ── SECTION 5: Serial & Baud Rate ────────────────────────────────────────────
function SerialSection() {
  const [boardBaud,   setBoardBaud]   = useState(115200);
  const [monitorBaud, setMonitorBaud] = useState(9600);
  const [charIdx, setCharIdx] = useState(0);
  const bauds   = [9600, 57600, 115200, 921600];
  const matched = boardBaud === monitorBaud;
  const goodMsg = 'Temp: 25.4 C\nHumid: 68%\nStatus: OK\nLoop #1024';
  const badMsg  = '▒○◘•∞‼▒○◘○●▒‼∞●▒◘○•‼▒∞';
  const msg     = matched ? goodMsg : badMsg;

  useEffect(() => {
    const id = setInterval(() => setCharIdx(i => (i + 1) % ((msg.length + 1) * 2)), 80);
    return () => clearInterval(id);
  }, [msg]);

  const displayed = msg.slice(0, charIdx % (msg.length + 1));

  return (
    <div>
      <h2 style={{ color: C.text, fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>📟 Serial Monitor & Baud Rate</h2>
      <p style={{ color: C.muted, fontSize: 13, margin: '0 0 16px' }}>Text-based communication between MCU and your computer over USB</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <Box>
          <SLabel color={C.arduino}>🔲 Board Code</SLabel>
          <div style={{ fontFamily: 'monospace', fontSize: 12, background: '#0a0e1a',
            padding: 10, borderRadius: 6, marginBottom: 12, lineHeight: 1.6 }}>
            <span style={{ color: C.dim }}>{'// In setup():'}</span><br/>
            <span style={{ color: C.cyan }}>Serial</span>
            <span style={{ color: C.muted }}>.</span>
            <span style={{ color: C.yellow }}>begin</span>
            <span style={{ color: C.muted }}>(</span>
            <span style={{ color: C.orange }}>{boardBaud}</span>
            <span style={{ color: C.muted }}>);</span>
          </div>
          <div style={{ color: C.muted, fontSize: 11, marginBottom: 6 }}>Select board baud rate:</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {bauds.map(b => (
              <MiniBtn key={b} active={boardBaud === b} color={C.arduino} onClick={() => setBoardBaud(b)}>{b}</MiniBtn>
            ))}
          </div>
        </Box>
        <Box>
          <SLabel color={C.esp32}>💻 Serial Monitor</SLabel>
          <div style={{ color: C.muted, fontSize: 11, marginBottom: 6 }}>Select monitor baud rate:</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
            {bauds.map(b => (
              <MiniBtn key={b} active={monitorBaud === b} color={C.esp32} onClick={() => setMonitorBaud(b)}>{b}</MiniBtn>
            ))}
          </div>
          <div style={{ background: '#0a0e1a', borderRadius: 6, padding: 10, minHeight: 72,
            fontFamily: 'monospace', fontSize: 12, color: matched ? C.green : C.red,
            whiteSpace: 'pre', overflow: 'auto' }}>
            {displayed}<span style={{ color: C.cyan }}>|</span>
          </div>
        </Box>
      </div>

      <Box style={{ textAlign: 'center', marginBottom: 12,
        borderColor: (matched ? C.green : C.red) + '77',
        background: (matched ? C.green : C.red) + '11' }}>
        <div style={{ color: matched ? C.green : C.red, fontSize: 18, fontWeight: 800 }}>
          {matched ? '✅ Baud Matched — Clear output!' : '⚠️ Mismatch — Garbage characters!'}
        </div>
        <div style={{ color: C.muted, fontSize: 12, marginTop: 4 }}>
          Board: <strong style={{ color: C.arduino }}>{boardBaud}</strong>
          {'  |  '}
          Monitor: <strong style={{ color: C.esp32 }}>{monitorBaud}</strong>
        </div>
        {!matched && <div style={{ color: C.orange, fontSize: 12, marginTop: 4 }}>Set both dropdowns to the same value!</div>}
      </Box>

      <Box>
        <SLabel>Common Baud Rates</SLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {[['9600','Old devices,\nGPS'],['57600','Mid-range\ntasks'],['115200','ESP32 default\nmost common'],['921600','ESP32\nbootloader']].map(([r, u]) => (
            <div key={r} style={{ background: C.card2, borderRadius: 8, padding: 10, textAlign: 'center' }}>
              <div style={{ color: C.yellow, fontFamily: 'monospace', fontWeight: 700 }}>{r}</div>
              <div style={{ color: C.dim, fontSize: 10, marginTop: 3, whiteSpace: 'pre-line' }}>{u}</div>
            </div>
          ))}
        </div>
      </Box>

      <EasyIdea text="Baud rate = কথা বলার speed। তুমি 115,200 words/min বলছো, কিন্তু অন্যজন 9,600 words/min শুনছে — সে বুঝবে না! Serial.begin() এর value আর Serial Monitor-এর dropdown — দুটো সবসময় একই হতে হবে।" />
    </div>
  );
}

// ── SECTION 6: ADC Conversion ────────────────────────────────────────────────
function ADCSection() {
  const [volt, setVolt] = useState(2.5);
  const [bits, setBits] = useState(10);

  const vMax   = bits === 10 ? 5.0 : 3.3;
  const maxOut = Math.pow(2, bits) - 1;
  const v      = Math.min(volt, vMax);
  const digital = Math.round((v / vMax) * maxOut);

  return (
    <div>
      <h2 style={{ color: C.text, fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>🔢 ADC — Analog to Digital Conversion</h2>
      <p style={{ color: C.muted, fontSize: 13, margin: '0 0 16px' }}>Converting real-world voltage into a number the MCU can process</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <Chip active={bits === 10} color={C.arduino}
          onClick={() => { setBits(10); setVolt(2.5); }}>🟦 Arduino (10-bit, 5V)</Chip>
        <Chip active={bits === 12} color={C.esp32}
          onClick={() => { setBits(12); setVolt(1.65); }}>🟥 ESP32 (12-bit, 3.3V)</Chip>
      </div>

      <Box style={{ marginBottom: 12 }}>
        <SLabel>Live ADC Conversion</SLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 56px 1fr', gap: 16, alignItems: 'center' }}>
          <div>
            <div style={{ color: C.muted, fontSize: 11, marginBottom: 4 }}>Analog Input Voltage</div>
            <div style={{ color: C.orange, fontFamily: 'monospace', fontSize: 38, fontWeight: 900 }}>
              {v.toFixed(2)}<span style={{ fontSize: 16 }}>V</span>
            </div>
            <input type="range" min="0" max={vMax * 100} value={v * 100}
              onChange={e => setVolt(Number(e.target.value) / 100)}
              style={{ width: '100%', accentColor: C.orange, marginTop: 8, cursor: 'pointer' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', color: C.dim, fontSize: 10 }}>
              <span>0V</span><span>{vMax}V</span>
            </div>
            <div style={{ marginTop: 8, height: 10, background: C.card2, borderRadius: 5, overflow: 'hidden' }}>
              <div style={{ width: `${(v / vMax) * 100}%`, height: '100%',
                background: C.orange, borderRadius: 5, transition: 'width 0.1s' }} />
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ color: C.cyan, fontSize: 26 }}>→</div>
            <div style={{ color: C.dim, fontSize: 10, lineHeight: 1.4 }}>ADC<br/>{bits}-bit</div>
          </div>

          <div>
            <div style={{ color: C.muted, fontSize: 11, marginBottom: 4 }}>Digital Output ({bits}-bit)</div>
            <div style={{ color: C.cyan, fontFamily: 'monospace', fontSize: 38, fontWeight: 900 }}>{digital}</div>
            <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>of {maxOut} max</div>
            <div style={{ marginTop: 10, height: 10, background: C.card2, borderRadius: 5, overflow: 'hidden' }}>
              <div style={{ width: `${(digital / maxOut) * 100}%`, height: '100%',
                background: C.cyan, borderRadius: 5, transition: 'width 0.1s' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: C.dim, fontSize: 10 }}>
              <span>0</span><span>{maxOut}</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 14, background: '#0a0e1a', borderRadius: 8, padding: 10,
          fontFamily: 'monospace', fontSize: 12 }}>
          <span style={{ color: C.dim }}>// Formula: </span>
          <span style={{ color: C.text }}>({v.toFixed(2)} / {vMax}) × {maxOut} = </span>
          <span style={{ color: C.green, fontWeight: 700 }}>{digital}</span>
        </div>
      </Box>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Box>
          <SLabel>ADC Pin Reference</SLabel>
          {[['Arduino Uno',  'A0–A5',    '10-bit', '0–1023'],
            ['Arduino Nano', 'A0–A7',    '10-bit', '0–1023'],
            ['ESP32',        'GPIO32–39+','12-bit', '0–4095']].map(([b, p, r, range]) => (
            <div key={b} style={{ padding: '7px 0', borderBottom: `1px solid ${C.border}` }}>
              <div style={{ color: C.text, fontSize: 12, fontWeight: 600 }}>{b}</div>
              <div style={{ color: C.dim, fontSize: 11 }}>
                Pins: <span style={{ color: C.cyan }}>{p}</span>
                {' · '}{r} · Range: <span style={{ color: C.yellow }}>{range}</span>
              </div>
            </div>
          ))}
        </Box>
        <Box>
          <SLabel color={C.purple}>DAC (Reverse)</SLabel>
          <div style={{ color: C.muted, fontSize: 12, marginBottom: 8 }}>Digital → Analog voltage</div>
          {[['Arduino Uno', 'No real DAC (use PWM)'],
            ['ESP32',       'GPIO25 & GPIO26 (8-bit)']].map(([b, v]) => (
            <div key={b} style={{ padding: '7px 0', borderBottom: `1px solid ${C.border}` }}>
              <div style={{ color: C.text, fontSize: 12 }}>{b}</div>
              <div style={{ color: C.purple, fontSize: 11 }}>{v}</div>
            </div>
          ))}
          <EasyIdea text="গান phone-এ number হিসেবে stored। Speaker number বোঝে না। DAC সেই number-কে real sound-এ convert করে!" />
        </Box>
      </div>
    </div>
  );
}
// ── SECTION: PCM — Pulse Code Modulation ────────────────────────────────────
function PCMSection() {
  const [waveFreq, setWaveFreq]     = useState(3);
  const [sampleRate, setSampleRate] = useState(20);
  const [bitDepth, setBitDepth]     = useState(3);
  const canvasRef = useRef(null);

  const levels   = Math.pow(2, bitDepth);
  const nyquist  = 2 * waveFreq;
  const violates = sampleRate < nyquist;
  const aliasFreq = (() => {
    let f = waveFreq % sampleRate;
    if (f > sampleRate / 2) f = sampleRate - f;
    return f;
  })();

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);
    const midY = H / 2, amp = H * 0.36;

    ctx.strokeStyle = C.border; ctx.lineWidth = 1;
    for (let l = 0; l < levels; l++) {
      const v01 = l / (levels - 1 || 1);
      const y = midY + amp - v01 * 2 * amp;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    ctx.strokeStyle = C.orange + 'dd'; ctx.lineWidth = 2;
    ctx.beginPath();
    for (let px = 0; px <= W; px++) {
      const t = px / W;
      const v = Math.sin(2 * Math.PI * waveFreq * t);
      const y = midY - v * amp;
      px === 0 ? ctx.moveTo(px, y) : ctx.lineTo(px, y);
    }
    ctx.stroke();

    if (violates && aliasFreq > 0.05) {
      ctx.strokeStyle = C.red + 'bb'; ctx.lineWidth = 2; ctx.setLineDash([6, 4]);
      ctx.beginPath();
      for (let px = 0; px <= W; px++) {
        const t = px / W;
        const v = Math.sin(2 * Math.PI * aliasFreq * t);
        const y = midY - v * amp;
        px === 0 ? ctx.moveTo(px, y) : ctx.lineTo(px, y);
      }
      ctx.stroke(); ctx.setLineDash([]);
    }

    const nSamples = Math.max(2, Math.floor(sampleRate));
    const samples = [];
    for (let k = 0; k <= nSamples; k++) {
      const t = k / nSamples;
      if (t > 1.0001) break;
      const v = Math.sin(2 * Math.PI * waveFreq * t);
      const v01 = (v + 1) / 2;
      const lvl = Math.round(v01 * (levels - 1));
      const qv01 = lvl / (levels - 1 || 1);
      const qv = qv01 * 2 - 1;
      samples.push({ t, qv });
    }

    ctx.strokeStyle = C.cyan; ctx.lineWidth = 2.5; ctx.shadowColor = C.cyan; ctx.shadowBlur = 4;
    ctx.beginPath();
    ctx.moveTo(samples[0].t * W, midY - samples[0].qv * amp);
    for (let i = 1; i < samples.length; i++) {
      const yPrev = midY - samples[i - 1].qv * amp;
      const xCur = samples[i].t * W;
      const yCur = midY - samples[i].qv * amp;
      ctx.lineTo(xCur, yPrev);
      ctx.lineTo(xCur, yCur);
    }
    const last = samples[samples.length - 1];
    ctx.lineTo(W, midY - last.qv * amp);
    ctx.stroke(); ctx.shadowBlur = 0;

    const showTicks = nSamples <= 40;
    samples.forEach(s => {
      const x = s.t * W, y = midY - s.qv * amp;
      if (showTicks) {
        ctx.strokeStyle = C.dim + '55'; ctx.lineWidth = 1; ctx.setLineDash([2, 3]);
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); ctx.setLineDash([]);
      }
      ctx.fillStyle = C.yellow;
      ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
    });
  }, [waveFreq, sampleRate, bitDepth]);

  return (
    <div>
      <h2 style={{ color: C.text, fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>🎵 PCM — Pulse Code Modulation</h2>
      <p style={{ color: C.muted, fontSize: 13, margin: '0 0 16px' }}>How a continuous analog signal becomes a stream of digital numbers</p>

      <Box style={{ marginBottom: 12 }}>
        <SLabel>Sampling + Quantization Lab</SLabel>
        <canvas ref={canvasRef} width={560} height={170} style={{ width: '100%', borderRadius: 6, display: 'block', marginBottom: 10 }} />
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', fontSize: 10, marginBottom: 14 }}>
          <span style={{ color: C.orange }}>▬ original analog wave</span>
          <span style={{ color: C.cyan }}>▬ digital (sample &amp; hold)</span>
          <span style={{ color: C.yellow }}>● sample points</span>
          {violates && <span style={{ color: C.red }}>▬ ▬ phantom alias wave</span>}
          <span style={{ color: C.dim }}>— quantization levels</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ color: C.muted, fontSize: 11 }}>Signal Frequency</span>
              <span style={{ color: C.orange, fontFamily: 'monospace', fontWeight: 700 }}>{waveFreq} Hz</span>
            </div>
            <input type="range" min="1" max="8" value={waveFreq}
              onChange={e => setWaveFreq(Number(e.target.value))}
              style={{ width: '100%', accentColor: C.orange, cursor: 'pointer' }} />
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ color: C.muted, fontSize: 11 }}>Sample Rate</span>
              <span style={{ color: C.cyan, fontFamily: 'monospace', fontWeight: 700 }}>{sampleRate} Hz</span>
            </div>
            <input type="range" min="2" max="40" value={sampleRate}
              onChange={e => setSampleRate(Number(e.target.value))}
              style={{ width: '100%', accentColor: C.cyan, cursor: 'pointer' }} />
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ color: C.muted, fontSize: 11 }}>Bit Depth</span>
              <span style={{ color: C.yellow, fontFamily: 'monospace', fontWeight: 700 }}>{bitDepth}-bit ({levels} lvl)</span>
            </div>
            <input type="range" min="1" max="5" value={bitDepth}
              onChange={e => setBitDepth(Number(e.target.value))}
              style={{ width: '100%', accentColor: C.yellow, cursor: 'pointer' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
          <MiniBtn color={C.red} onClick={() => setSampleRate(Math.max(2, Math.round(waveFreq * 1.3)))}>🟥 Undersample</MiniBtn>
          <MiniBtn color={C.yellow} onClick={() => setSampleRate(Math.min(40, 2 * waveFreq))}>🟨 Exactly at Nyquist</MiniBtn>
          <MiniBtn color={C.green} onClick={() => setSampleRate(Math.min(40, waveFreq * 8))}>🟩 Oversample (safe)</MiniBtn>
        </div>
      </Box>

      <Box style={{ marginBottom: 12, borderColor: (violates ? C.red : C.green) + '66',
        background: (violates ? C.red : C.green) + '11' }}>
        <SLabel color={violates ? C.red : C.green}>Nyquist Check</SLabel>
        <div style={{ color: violates ? C.red : C.green, fontWeight: 800, fontSize: 16 }}>
          {violates ? '❌ Violated — Aliasing occurs!' : '✅ Satisfied — Signal recoverable'}
        </div>
        <div style={{ color: C.muted, fontSize: 12, marginTop: 4 }}>
          Nyquist rule: Sample Rate ≥ 2 × Signal Frequency = <strong style={{ color: C.text }}>{nyquist} Hz</strong> needed.
          Currently sampling at <strong style={{ color: C.text }}>{sampleRate} Hz</strong>.
          {violates && (
            <span> The {waveFreq} Hz wave gets misread as a <strong style={{ color: C.red }}>{aliasFreq.toFixed(1)} Hz</strong> phantom wave (the dashed line above)!</span>
          )}
        </div>
      </Box>

      <Box style={{ marginBottom: 12 }}>
        <SLabel>The 3-Step PCM Pipeline</SLabel>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          {[
            { icon: '📸', label: 'Sample', desc: `Read voltage every 1/${sampleRate}s`, color: C.orange },
            { icon: '📏', label: 'Quantize', desc: `Round to nearest of ${levels} levels`, color: C.yellow },
            { icon: '🔢', label: 'Encode', desc: `Write as ${bitDepth}-bit binary number`, color: C.cyan },
          ].map((s, i) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 140 }}>
              <div style={{ flex: 1, background: C.card2, borderRadius: 8, padding: 10, textAlign: 'center' }}>
                <div style={{ fontSize: 20 }}>{s.icon}</div>
                <div style={{ color: s.color, fontWeight: 700, fontSize: 12 }}>{s.label}</div>
                <div style={{ color: C.dim, fontSize: 10, marginTop: 2 }}>{s.desc}</div>
              </div>
              {i < 2 && <div style={{ color: C.dim, fontSize: 18 }}>→</div>}
            </div>
          ))}
        </div>
      </Box>

      <Box>
        <SLabel>Real-World PCM Standards</SLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[['Telephone', '8 kHz · 8-bit'], ['CD Audio', '44.1 kHz · 16-bit'], ['Studio Master', '96 kHz · 24-bit']].map(([n, s]) => (
            <div key={n} style={{ background: C.card2, borderRadius: 8, padding: 10, textAlign: 'center' }}>
              <div style={{ color: C.text, fontSize: 12, fontWeight: 600 }}>{n}</div>
              <div style={{ color: C.purple, fontSize: 11, fontFamily: 'monospace', marginTop: 3 }}>{s}</div>
            </div>
          ))}
        </div>
      </Box>

      <EasyIdea text="PCM = flipbook ছবি আঁকার মতো। আসল movement (analog wave) কে নির্দিষ্ট সময় পরপর ছবি তুলে (Sample) ধরা হয়, প্রতিটা ছবিকে কাছাকাছি একটা preset shade-এ snap করা হয় (Quantize), তারপর সেই shade-এর number লেখা হয় (Encode)। Sample rate কম হলে motion ভুল দেখাবে (Aliasing) — ঠিক যেমন ক্যামেরায় ঘুরন্ত চাকা উল্টোদিকে ঘুরছে মনে হয়!" />
    </div>
  );
}

// ── SECTION 7: PWM — Frequency, Duty Cycle & Persistence of Vision ─────────
function PWMSection() {
  const [duty, setDuty]             = useState(50);
  const [freqSlider, setFreqSlider] = useState(40);
  const [slowMo, setSlowMo]         = useState(1);

  const freq    = Math.max(1, Math.round(Math.pow(10, (freqSlider / 100) * 3)));
  const effFreq = freq / slowMo;
  const band    = effFreq < 8 ? 'ultraslow' : effFreq < 15 ? 'blink' : effFreq < 50 ? 'flicker' : 'fused';
  const bandInfo = {
    ultraslow: { label: '🐢 Ultra-slow — every single pulse fully visible', color: C.blue   },
    blink:     { label: '👀 Clearly blinking — easy to count by eye',       color: C.green  },
    flicker:   { label: '😵 Flicker zone — uncomfortable strobe effect',    color: C.orange },
    fused:     { label: '✨ Fused — looks like a steady, dimmed glow',      color: C.purple },
  }[band];

  const ledRef    = useRef(null);
  const canvasRef = useRef(null);
  const simTimeRef = useRef(0);
  const lastTsRef  = useRef(null);
  const histRef    = useRef([]);
  const dutyRef = useRef(duty), freqRef = useRef(freq), slowMoRef = useRef(slowMo);
  useEffect(() => { dutyRef.current = duty; }, [duty]);
  useEffect(() => { freqRef.current = freq; }, [freq]);
  useEffect(() => { slowMoRef.current = slowMo; }, [slowMo]);

  useEffect(() => {
    let animId;
    if (histRef.current.length === 0) for (let i = 0; i < 240; i++) histRef.current.push(0);

    const loop = (ts) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      simTimeRef.current += dt / slowMoRef.current;

      const ef = freqRef.current / slowMoRef.current;
      const phase = (simTimeRef.current * ef) % 1;
      const isOn = phase < dutyRef.current / 100;
      const fused = ef >= 50;

      if (ledRef.current) {
        if (fused) {
          const b = dutyRef.current / 100;
          ledRef.current.style.background = `rgba(251,191,36,${0.12 + b * 0.85})`;
          ledRef.current.style.boxShadow = b > 0.02 ? `0 0 ${10 + b * 24}px ${4 + b * 10}px rgba(251,191,36,${0.15 + b * 0.5})` : 'none';
        } else {
          ledRef.current.style.background = isOn ? 'rgba(251,191,36,0.95)' : 'rgba(251,191,36,0.08)';
          ledRef.current.style.boxShadow = isOn ? '0 0 28px 10px rgba(251,191,36,0.55)' : 'none';
        }
      }

      histRef.current.push(isOn ? 1 : 0);
      if (histRef.current.length > 240) histRef.current.shift();

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const W = canvas.width, H = canvas.height;
        ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);
        const hist = histRef.current, n = hist.length, stepX = W / n;
        ctx.strokeStyle = C.cyan; ctx.lineWidth = 2.5; ctx.shadowColor = C.cyan; ctx.shadowBlur = 4;
        ctx.beginPath();
        let prevY = null;
        hist.forEach((v, i) => {
          const y = v ? H * 0.15 : H * 0.85;
          const x = i * stepX;
          if (prevY !== null && Math.abs(y - prevY) > 2) { ctx.lineTo(x, prevY); ctx.lineTo(x, y); }
          else { i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
          prevY = y;
        });
        ctx.stroke(); ctx.shadowBlur = 0;
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(animId); lastTsRef.current = null; };
  }, []);

  const freqPresets = [1, 5, 10, 24, 60, 100, 500, 1000];
  const slowMoOpts = [{ l: 'Real-time', v: 1 }, { l: '10x Slower', v: 10 }, { l: '100x Slower', v: 100 }, { l: '1000x Slower', v: 1000 }];

  return (
    <div>
      <h2 style={{ color: C.text, fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>💡 PWM — Pulse Width Modulation</h2>
      <p style={{ color: C.muted, fontSize: 13, margin: '0 0 16px' }}>Slow time down and watch why a blinking LED can look perfectly steady</p>

      <Box style={{ marginBottom: 12 }}>
        <SLabel>Frequency & Slow-Motion Lab</SLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 130px', gap: 18 }}>
          <div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ color: C.muted, fontSize: 12 }}>Switching Frequency</span>
                <span style={{ color: C.cyan, fontFamily: 'monospace', fontWeight: 700, fontSize: 15 }}>{freq} Hz</span>
              </div>
              <input type="range" min="0" max="100" value={freqSlider}
                onChange={e => setFreqSlider(Number(e.target.value))}
                style={{ width: '100%', accentColor: C.cyan, cursor: 'pointer' }} />
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 6 }}>
                {freqPresets.map(f => (
                  <MiniBtn key={f} active={freq === f} color={C.cyan}
                    onClick={() => setFreqSlider(Math.round((Math.log10(f) / 3) * 100))}>{f}Hz</MiniBtn>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ color: C.muted, fontSize: 12 }}>Duty Cycle</span>
                <span style={{ color: C.yellow, fontFamily: 'monospace', fontWeight: 700, fontSize: 15 }}>{duty}%</span>
              </div>
              <input type="range" min="0" max="100" value={duty}
                onChange={e => setDuty(Number(e.target.value))}
                style={{ width: '100%', accentColor: C.yellow, cursor: 'pointer' }} />
            </div>

            <div style={{ color: C.muted, fontSize: 11, marginBottom: 6 }}>🎥 Slow Motion — see what's <em>really</em> happening</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {slowMoOpts.map(s => (
                <MiniBtn key={s.v} active={slowMo === s.v} color={C.purple} onClick={() => setSlowMo(s.v)}>{s.l}</MiniBtn>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ color: C.dim, fontSize: 9, letterSpacing: 1, marginBottom: 8 }}>👁️ WHAT YOU'D SEE</div>
            <div ref={ledRef} style={{
              width: 76, height: 76, borderRadius: '50%', margin: '0 auto',
              border: `3px solid ${C.yellow}`, background: 'rgba(251,191,36,0.08)',
            }} />
            <div style={{ marginTop: 12, color: bandInfo.color, fontSize: 11, fontWeight: 700, lineHeight: 1.4 }}>
              {bandInfo.label}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 14, background: '#0a0e1a', borderRadius: 8, padding: 10,
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div>
            <span style={{ color: C.dim, fontSize: 11 }}>Effective rate your eye experiences: </span>
            <span style={{ color: bandInfo.color, fontWeight: 700, fontFamily: 'monospace' }}>
              {effFreq < 1 ? effFreq.toFixed(3) : effFreq.toFixed(effFreq < 10 ? 1 : 0)} Hz
            </span>
          </div>
          {slowMo > 1 && (
            <div style={{ color: C.purple, fontSize: 11, fontWeight: 600 }}>
              🎥 Slowed {slowMo}× — the real signal is actually switching at {freq} Hz!
            </div>
          )}
        </div>
      </Box>

      <Box style={{ marginBottom: 12 }}>
        <SLabel>📈 What's Actually Happening — Real Signal, Unfiltered</SLabel>
        <canvas ref={canvasRef} width={560} height={120} style={{ width: '100%', borderRadius: 6, display: 'block' }} />
        <div style={{ color: C.dim, fontSize: 11, marginTop: 6 }}>
          This graph never lies — it always plots the true ON/OFF pulses, even when they're far too fast for your eye (or the LED above) to follow one by one.
        </div>
      </Box>

      <Box style={{ marginBottom: 12, borderColor: C.purple + '55' }}>
        <SLabel color={C.purple}>🧠 Why This Trick Works: Persistence of Vision</SLabel>
        <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
          Your eye and brain hold onto an image for roughly <strong style={{ color: C.text }}>1/20th to 1/30th of a second</strong> after light hits the retina. Once flashes happen faster than about <strong style={{ color: C.text }}>50 Hz</strong> — the "flicker fusion threshold" — individual pulses blend into what looks like one constant, dimmer glow instead of a blink. That's the exact illusion PWM relies on: Arduino's default PWM runs around <strong style={{ color: C.text }}>490–980 Hz</strong>, far above what any human eye could ever resolve as separate flashes.
        </div>
      </Box>

      <Box>
        <SLabel>PWM Pin Reference</SLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <div style={{ color: C.arduino, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>Arduino</div>
            <div style={{ fontSize: 12, color: C.text, marginBottom: 4 }}>
              Pins: <span style={{ color: C.yellow, fontFamily: 'monospace' }}>3, 5, 6, 9, 10, 11</span>
            </div>
            <div style={{ color: C.dim, fontSize: 11, marginBottom: 6 }}>Look for ~ (tilde) on the board</div>
            <code style={{ background: C.card2, padding: '4px 8px', borderRadius: 5,
              fontSize: 11, color: C.muted }}>analogWrite(pin, 0–255)</code>
          </div>
          <div>
            <div style={{ color: C.esp32, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>ESP32</div>
            <div style={{ fontSize: 12, color: C.text, marginBottom: 4 }}>
              Almost <span style={{ color: C.yellow }}>ALL pins</span> support PWM
            </div>
            <div style={{ color: C.dim, fontSize: 11, marginBottom: 6 }}>Uses LEDC peripheral</div>
            <code style={{ background: C.card2, padding: '4px 8px', borderRadius: 5,
              fontSize: 11, color: C.muted }}>ledcWrite(ch, 0–255)</code>
          </div>
        </div>
      </Box>

      <EasyIdea text="একটা ফ্যানের ব্লেড ঘুরতে দেখলে আলাদা আলাদা ব্লেড বোঝা যায় না — চোখ সেগুলো মিশিয়ে ফেলে। PWM-ও তাই করে: light কে এত দ্রুত ON/OFF করা হয় (Arduino-তে ~500-1000 বার/সেকেন্ড) যে চোখ সেটা আলাদা blink হিসেবে ধরতে পারে না, শুধু dim/bright একটা glow মনে হয়। Slow Motion বাটন চেপে দেখো — আসলে নিচে কী ঘটছে!" />
    </div>
  );
}

// ── SECTION 8: GPIO & Pull Resistors ────────────────────────────────────────
function GPIOSection() {
  const [mode, setMode]     = useState('pullup');
  const [pressed, setPressed] = useState(false);

  const pinState = mode === 'pullup' ? (pressed ? 'LOW' : 'HIGH') : (pressed ? 'HIGH' : 'LOW');
  const sc = pinState === 'HIGH' ? C.green : C.red;

  const PullUpSVG = () => (
    <svg viewBox="0 0 140 195" style={{ width: '100%' }}>
      <text x="48" y="14" fill={C.green} fontSize="12" fontFamily="monospace" fontWeight="bold">VCC</text>
      <line x1="70" y1="18" x2="70" y2="42" stroke={C.green} strokeWidth="2"/>
      <rect x="54" y="42" width="32" height="14" rx="3" fill="none" stroke={C.yellow} strokeWidth="2"/>
      <text x="91" y="53" fill={C.yellow} fontSize="9" fontFamily="monospace">10kΩ</text>
      <line x1="70" y1="56" x2="70" y2="82" stroke={C.cyan} strokeWidth="2"/>
      <line x1="28" y1="82" x2="70" y2="82" stroke={C.cyan} strokeWidth="2"/>
      <text x="4" y="80" fill={C.cyan} fontSize="10" fontFamily="monospace">GPIO</text>
      <text x="4" y="91" fill={C.dim} fontSize="8" fontFamily="monospace">(INPUT)</text>
      <line x1="70" y1="82" x2="70" y2="108" stroke={C.cyan} strokeWidth="2"/>
      <circle cx="70" cy={pressed ? 114 : 122} r="6" fill={pressed ? sc : C.card2} stroke={C.muted} strokeWidth="1.5"/>
      <circle cx="70" cy={pressed ? 122 : 132} r="6" fill="none" stroke={C.muted} strokeWidth="1.5"/>
      {pressed && <line x1="70" y1="120" x2="70" y2="128" stroke={sc} strokeWidth="2"/>}
      <line x1="70" y1="138" x2="70" y2="158" stroke={C.red} strokeWidth="2"/>
      <line x1="55" y1="158" x2="85" y2="158" stroke={C.red} strokeWidth="2"/>
      <line x1="61" y1="163" x2="79" y2="163" stroke={C.red} strokeWidth="1.5"/>
      <line x1="67" y1="168" x2="73" y2="168" stroke={C.red} strokeWidth="1"/>
      <text x="88" y="165" fill={C.red} fontSize="10" fontFamily="monospace">GND</text>
    </svg>
  );

  const PullDownSVG = () => (
    <svg viewBox="0 0 140 195" style={{ width: '100%' }}>
      <text x="48" y="14" fill={C.green} fontSize="12" fontFamily="monospace" fontWeight="bold">VCC</text>
      <line x1="70" y1="18" x2="70" y2="40" stroke={C.green} strokeWidth="2"/>
      <circle cx="70" cy={pressed ? 46 : 54} r="6" fill={pressed ? sc : C.card2} stroke={C.green} strokeWidth="1.5"/>
      <circle cx="70" cy={pressed ? 54 : 64} r="6" fill="none" stroke={C.green} strokeWidth="1.5"/>
      {pressed && <line x1="70" y1="52" x2="70" y2="60" stroke={sc} strokeWidth="2"/>}
      <line x1="70" y1="70" x2="70" y2="95" stroke={C.cyan} strokeWidth="2"/>
      <line x1="28" y1="95" x2="70" y2="95" stroke={C.cyan} strokeWidth="2"/>
      <text x="4" y="93" fill={C.cyan} fontSize="10" fontFamily="monospace">GPIO</text>
      <text x="4" y="104" fill={C.dim} fontSize="8" fontFamily="monospace">(INPUT)</text>
      <line x1="70" y1="95" x2="70" y2="118" stroke={C.cyan} strokeWidth="2"/>
      <rect x="54" y="118" width="32" height="14" rx="3" fill="none" stroke={C.yellow} strokeWidth="2"/>
      <text x="91" y="129" fill={C.yellow} fontSize="9" fontFamily="monospace">10kΩ</text>
      <line x1="70" y1="132" x2="70" y2="152" stroke={C.red} strokeWidth="2"/>
      <line x1="55" y1="152" x2="85" y2="152" stroke={C.red} strokeWidth="2"/>
      <line x1="61" y1="157" x2="79" y2="157" stroke={C.red} strokeWidth="1.5"/>
      <line x1="67" y1="162" x2="73" y2="162" stroke={C.red} strokeWidth="1"/>
      <text x="88" y="158" fill={C.red} fontSize="10" fontFamily="monospace">GND</text>
    </svg>
  );

  return (
    <div>
      <h2 style={{ color: C.text, fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>📌 GPIO & Pull Resistors</h2>
      <p style={{ color: C.muted, fontSize: 13, margin: '0 0 16px' }}>General Purpose I/O and solving the floating pin problem</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <Chip active={mode === 'pullup'}   color={C.cyan}   onClick={() => { setMode('pullup');   setPressed(false); }}>⬆️ Pull-up</Chip>
        <Chip active={mode === 'pulldown'} color={C.orange} onClick={() => { setMode('pulldown'); setPressed(false); }}>⬇️ Pull-down</Chip>
      </div>

      <Box style={{ marginBottom: 12 }}>
        <SLabel>{mode === 'pullup' ? 'Pull-up Resistor Circuit' : 'Pull-down Resistor Circuit'}</SLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 16, alignItems: 'center' }}>
          <div>{mode === 'pullup' ? <PullUpSVG /> : <PullDownSVG />}</div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ color: C.muted, fontSize: 12, marginBottom: 4 }}>
              Default (nothing pressed):
              <span style={{ color: mode === 'pullup' ? C.green : C.red, fontWeight: 700, marginLeft: 6 }}>
                {mode === 'pullup' ? 'HIGH' : 'LOW'}
              </span>
            </div>

            <button
              onMouseDown={() => setPressed(true)}
              onMouseUp={() => setPressed(false)}
              onTouchStart={e => { e.preventDefault(); setPressed(true); }}
              onTouchEnd={() => setPressed(false)}
              style={{
                width: 80, height: 80, borderRadius: '50%', cursor: 'pointer',
                background: pressed ? sc + '44' : C.card2,
                border: `3px solid ${sc}`, color: C.text,
                fontWeight: 700, fontSize: 13, userSelect: 'none',
                boxShadow: pressed ? `0 0 20px ${sc}88` : 'none',
                transform: pressed ? 'scale(0.93)' : 'scale(1)',
                transition: 'all 0.08s',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
              {pressed ? '⬤' : 'HOLD\nME'}
            </button>

            <div style={{ marginTop: 14 }}>
              <div style={{ color: C.dim, fontSize: 11, marginBottom: 2 }}>digitalRead() returns:</div>
              <div style={{ color: sc, fontFamily: 'monospace', fontSize: 32, fontWeight: 900 }}>{pinState}</div>
              <div style={{ color: sc, fontSize: 14 }}>({pinState === 'HIGH' ? '1' : '0'})</div>
            </div>
          </div>
        </div>
      </Box>

      <Box style={{ marginBottom: 12 }}>
        <SLabel>Pull-up vs Pull-down Quick Reference</SLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {[{ l:'Default State', p:'HIGH', d:'LOW' },
            { l:'On Button Press', p:'LOW', d:'HIGH' },
            { l:'Resistor to', p:'VCC', d:'GND' },
            { l:'Arduino built-in', p:'Yes ✅', d:'No ❌' }].map(row => (
            <div key={row.l} style={{ background: C.card2, borderRadius: 8, padding: 8, textAlign: 'center' }}>
              <div style={{ color: C.dim, fontSize: 9, textTransform: 'uppercase', marginBottom: 5 }}>{row.l}</div>
              <div style={{ color: C.cyan,   fontSize: 11, marginBottom: 2 }}>⬆️ {row.p}</div>
              <div style={{ color: C.orange, fontSize: 11 }}>⬇️ {row.d}</div>
            </div>
          ))}
        </div>
      </Box>

      <Box style={{ borderColor: C.red + '66' }}>
        <SLabel color={C.red}>⚠️ Floating Pin Problem</SLabel>
        <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.6 }}>
          An unconnected GPIO input pin picks up random electromagnetic noise → random HIGH/LOW output. This is a "floating" pin. Pull-up or pull-down resistors anchor the pin to a known default state.
        </div>
        <div style={{ marginTop: 10 }}>
          <code style={{ background: C.card2, padding: '4px 8px', borderRadius: 5, fontSize: 12,
            color: C.yellow }}>pinMode(pin, INPUT_PULLUP)</code>
          <span style={{ color: C.dim, fontSize: 12, marginLeft: 8 }}>— enables Arduino's built-in pull-up</span>
        </div>
      </Box>

      <EasyIdea text="Pull-up = balloon (gas ভরা): normal = উপরে (HIGH), টান দিলে নিচে (LOW). Pull-down = পাথর: normal = নিচে (LOW), উপরে টানলে HIGH. Floating (কোনোটাই না) = নতুন লোক যে জানে না কোথায় যাবে — random output!" />
    </div>
  );
}

// ── SECTION 9: Boot & Memory ─────────────────────────────────────────────────
function BootSection() {
  const [step, setStep]       = useState(-1);
  const [autoPlay, setAutoPlay] = useState(false);
  const timerRef = useRef(null);

  const bootSteps = [
    { icon:'🔌', label:'Power ON',             desc:'Board receives stable power supply', color: C.cyan   },
    { icon:'⚡', label:'Voltage Stabilize',    desc:'~100 ms — power rails settle to spec', color: C.yellow },
    { icon:'📡', label:'Bootloader Active',    desc:'~2 seconds — window open for code upload', color: C.purple },
    { icon:'⚙️', label:'setup() runs once',   desc:'Your init code: pin modes, Serial, libraries', color: C.orange },
    { icon:'🔄', label:'loop() runs forever', desc:'Infinite repeat — your main program logic', color: C.green  },
  ];

  useEffect(() => {
    if (!autoPlay) { clearTimeout(timerRef.current); return; }
    if (step >= bootSteps.length - 1) { setAutoPlay(false); return; }
    timerRef.current = setTimeout(() => setStep(s => s + 1), 750);
    return () => clearTimeout(timerRef.current);
  }, [autoPlay, step]);

  const memory = [
    { type:'Flash',  ard:32,  esp:4096, unit:'KB', desc:'Code storage — survives power off', max:4096, col: C.cyan   },
    { type:'SRAM',   ard:2,   esp:520,  unit:'KB', desc:'Runtime variables — cleared on reset', max:520,  col: C.orange },
    { type:'EEPROM', ard:1,   esp:'via Flash', unit:'KB', desc:'Non-volatile settings', max:null, col: C.purple },
  ];

  return (
    <div>
      <h2 style={{ color: C.text, fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>🚀 Boot Sequence & Memory</h2>
      <p style={{ color: C.muted, fontSize: 13, margin: '0 0 16px' }}>What happens between power-on and your code actually running</p>

      <Box style={{ marginBottom: 12 }}>
        <SLabel>Boot Sequence — Step by Step</SLabel>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          <button onClick={() => { setStep(-1); setAutoPlay(false); }} style={{ padding:'5px 12px', borderRadius:6, border:`1px solid ${C.dim}`, background:'transparent', color:C.muted, cursor:'pointer', fontSize:12 }}>↺ Reset</button>
          <button onClick={() => { setStep(-1); setTimeout(() => setAutoPlay(true), 50); }} style={{ padding:'5px 12px', borderRadius:6, border:`1px solid ${C.green}`, background:C.green+'22', color:C.green, cursor:'pointer', fontSize:12 }}>▶️ Auto Play</button>
          <button onClick={() => setStep(s => Math.min(s + 1, bootSteps.length - 1))} style={{ padding:'5px 12px', borderRadius:6, border:`1px solid ${C.cyan}`, background:C.cyan+'22', color:C.cyan, cursor:'pointer', fontSize:12 }}>Next Step →</button>
        </div>

        {bootSteps.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 6 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%', fontSize: 18,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: step >= i ? s.color + '33' : C.card2,
                border: `2px solid ${step >= i ? s.color : C.dim}`,
                boxShadow: step === i ? `0 0 16px ${s.color}` : 'none',
                transition: 'all 0.4s',
              }}>
                {step >= i ? s.icon : '○'}
              </div>
              {i < bootSteps.length - 1 && (
                <div style={{ width: 2, height: 18, marginTop: 2,
                  background: step > i ? s.color : C.dim, transition: 'background 0.4s' }} />
              )}
            </div>
            <div style={{ flex: 1, paddingTop: 8, opacity: step >= i ? 1 : 0.25, transition: 'opacity 0.4s' }}>
              <div style={{ color: s.color, fontWeight: 700, fontSize: 13 }}>{s.label}</div>
              <div style={{ color: C.muted, fontSize: 11 }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </Box>

      <Box style={{ marginBottom: 12 }}>
        <SLabel>Memory Types Comparison</SLabel>
        {memory.map(m => (
          <div key={m.type} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
              <span style={{ color: m.col, fontWeight: 700, fontSize: 13 }}>{m.type}</span>
              <span style={{ color: C.dim, fontSize: 11 }}>{m.desc}</span>
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 3 }}>
              <span style={{ color: C.arduino, fontSize: 11, width: 55 }}>Arduino</span>
              <div style={{ flex: 1, height: 12, background: C.card2, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: m.max ? `${Math.max((m.ard / m.max) * 100, 1)}%` : '1%',
                  height: '100%', background: C.arduino, borderRadius: 4, minWidth: 4 }} />
              </div>
              <span style={{ color: C.text, fontSize: 11, width: 80 }}>{m.ard} {m.unit}</span>
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={{ color: C.esp32, fontSize: 11, width: 55 }}>ESP32</span>
              <div style={{ flex: 1, height: 12, background: C.card2, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: typeof m.esp === 'number' ? '100%' : '12%',
                  height: '100%', background: C.esp32, borderRadius: 4 }} />
              </div>
              <span style={{ color: C.text, fontSize: 11, width: 80 }}>
                {m.esp} {typeof m.esp === 'number' ? m.unit : ''}
              </span>
            </div>
          </div>
        ))}
      </Box>

      <Box>
        <SLabel>Reset Types</SLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[['Power-on Reset','Power off then back on'],
            ['Manual Reset', 'RST / EN button pressed'],
            ['Watchdog Reset','Code hangs → auto-restart'],
            ['Brown-out Reset','Supply voltage drops too low']].map(([t, c]) => (
            <div key={t} style={{ background: C.card2, borderRadius: 8, padding: 8 }}>
              <div style={{ color: C.cyan, fontSize: 12, fontWeight: 600 }}>{t}</div>
              <div style={{ color: C.dim, fontSize: 11 }}>{c}</div>
            </div>
          ))}
        </div>
      </Box>

      <EasyIdea text="Boot = সকালের routine: চোখ খোলা (power) → শরীর ঠিক (stabilize) → দিনের কাজ (code চলা). Watchdog = factory security guard — কিছুক্ষণ পরপর check করে। কেউ response না দিলে system restart করে!" />
    </div>
  );
}

// ── SECTION 10: delay() vs millis() ─────────────────────────────────────────
function DelaySection() {
  const [elapsed, setElapsed] = useState(0);
  const [paused,  setPaused]  = useState(false);
  const pausedRef  = useRef(false);
  const elapsedRef = useRef(0);

  useEffect(() => { pausedRef.current = paused; }, [paused]);
  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) {
        elapsedRef.current += 100;
        setElapsed(elapsedRef.current);
      }
    }, 100);
    return () => clearInterval(id);
  }, []);

  const PERIOD = 4000;
  const phase  = elapsed % PERIOD;
  const ledOn  = phase < PERIOD / 2;
  const blocked = phase > 60;
  const msLeft  = Math.round((PERIOD / 2) - (phase % (PERIOD / 2)));

  const sideJobs = [
    { icon:'📡', label:'WiFi heartbeat',  col: C.cyan   },
    { icon:'🌡️', label:'Sensor read',     col: C.purple },
    { icon:'⌨️', label:'Button check',    col: C.yellow },
    { icon:'🌐', label:'MQTT publish',    col: C.green  },
  ];

  return (
    <div>
      <h2 style={{ color: C.text, fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>⏱️ delay() vs millis()</h2>
      <p style={{ color: C.muted, fontSize: 13, margin: '0 0 16px' }}>Blocking vs Non-blocking timing — critical for responsive embedded programs</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <Chip active={paused} color={C.green} onClick={() => setPaused(p => !p)}>
          {paused ? '▶️ Resume' : '⏸️ Pause'}
        </Chip>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <Box style={{ borderColor: (blocked ? C.red : C.green) + '66' }}>
          <SLabel color={C.red}>delay() — Blocking ❌</SLabel>

          <div style={{ textAlign: 'center', marginBottom: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', margin: '0 auto 4px',
              background: ledOn ? C.yellow + 'cc' : C.card2,
              boxShadow: ledOn ? `0 0 14px ${C.yellow}88` : 'none',
              border: `2px solid ${C.yellow}`, transition: 'all 0.2s' }} />
            <div style={{ color: C.muted, fontSize: 11 }}>LED {ledOn ? 'ON' : 'OFF'}</div>
          </div>

          <div style={{ background: blocked ? C.red+'22' : C.green+'22',
            border: `1px solid ${blocked ? C.red : C.green}`,
            borderRadius: 8, padding: 8, textAlign: 'center', marginBottom: 10 }}>
            <div style={{ color: blocked ? C.red : C.green, fontWeight: 700, fontSize: 12 }}>
              {blocked ? `⛔ FROZEN — ${(msLeft / 1000).toFixed(1)}s left` : '✅ Running...'}
            </div>
          </div>

          <div style={{ fontFamily: 'monospace', fontSize: 11, background: '#0a0e1a',
            padding: 10, borderRadius: 6, lineHeight: 1.7 }}>
            <div style={{ color: C.cyan }}>digitalWrite(LED, HIGH);</div>
            <div style={{ color: blocked && ledOn ? C.red : C.dim }}>
              delay(2000);
              <span style={{ color: C.red }}> // 😴 frozen</span>
            </div>
            <div style={{ color: C.cyan }}>digitalWrite(LED, LOW);</div>
            <div style={{ color: blocked && !ledOn ? C.red : C.dim }}>
              delay(2000);
              <span style={{ color: C.red }}> // 😴 frozen</span>
            </div>
          </div>

          {blocked && (
            <div style={{ marginTop: 8, color: C.red, fontSize: 11 }}>
              ❌ WiFi drops · Buttons missed · Serial ignored
            </div>
          )}
        </Box>

        <Box style={{ borderColor: C.green + '66' }}>
          <SLabel color={C.green}>millis() — Non-blocking ✅</SLabel>

          <div style={{ textAlign: 'center', marginBottom: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', margin: '0 auto 4px',
              background: ledOn ? C.green + 'cc' : C.card2,
              boxShadow: ledOn ? `0 0 14px ${C.green}88` : 'none',
              border: `2px solid ${C.green}`, transition: 'all 0.2s' }} />
            <div style={{ color: C.muted, fontSize: 11 }}>LED {ledOn ? 'ON' : 'OFF'}</div>
          </div>

          <div style={{ background: C.green+'22', border:`1px solid ${C.green}`,
            borderRadius: 8, padding: 8, textAlign: 'center', marginBottom: 10 }}>
            <div style={{ color: C.green, fontWeight: 700, fontSize: 12 }}>✅ Always running!</div>
          </div>

          <div style={{ fontFamily: 'monospace', fontSize: 11, background: '#0a0e1a',
            padding: 10, borderRadius: 6, lineHeight: 1.7, marginBottom: 8 }}>
            <div style={{ color: C.muted }}>if (now - prev {'>'} 2000) {'{'}</div>
            <div style={{ color: C.cyan, paddingLeft: 12 }}>  toggle(LED);</div>
            <div style={{ color: C.muted, paddingLeft: 12 }}>  prev = now;</div>
            <div style={{ color: C.muted }}>{'}'}</div>
          </div>

          {sideJobs.map((j, i) => (
            <div key={i} style={{ fontSize: 11, color: j.col, padding: '2px 0',
              opacity: 0.4 + (Math.sin(elapsed / 400 + i * 1.3) + 1) * 0.3 }}>
              {j.icon} {j.label} ✓
            </div>
          ))}
        </Box>
      </div>

      <Box>
        <SLabel>Why millis() Matters for IoT</SLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 10 }}>
          {[['While waiting...','Board frozen ❌','Board runs ✅'],
            ['WiFi / BLE',     'Drops ❌',       'Stays up ✅'  ],
            ['Button input',   'Missed ❌',      'Captured ✅'  ]].map(([l, da, mb]) => (
            <div key={l} style={{ background: C.card2, borderRadius: 8, padding: 10 }}>
              <div style={{ color: C.dim, fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 5 }}>{l}</div>
              <div style={{ color: C.red,   fontSize: 11, marginBottom: 3 }}>delay(): {da}</div>
              <div style={{ color: C.green, fontSize: 11 }}>millis(): {mb}</div>
            </div>
          ))}
        </div>
        <div style={{ color: C.dim, fontSize: 11, fontFamily: 'monospace' }}>
          ⚠️ Always store millis() in <span style={{ color: C.yellow }}>unsigned long</span> — overflows after ~49 days
        </div>
      </Box>

      <EasyIdea text="delay() = দুধ জ্বাল দিয়ে দাঁড়িয়ে থাকা — গরম হওয়া পর্যন্ত কিছুই করা যায় না। millis() = দুধ জ্বাল দিয়ে এই ফাঁকে কাপ নিয়ে চিনি-কফি ready করা। দুধ গরম হলে ঢেলে ফেলবো। IoT-তে সবসময় millis() ব্যবহার করো!" />
    </div>
  );
}

// ── Main App ─────────────────────────────────────────────────────────────────
const sectionMap = {
  boards: BoardsSection, voltage: VoltageSection, signals: SignalsSection,
  i2c: I2CSection, serial: SerialSection, adc: ADCSection, pcm: PCMSection,
  pwm: PWMSection, gpio: GPIOSection, boot: BootSection, delay: DelaySection,
};

export default function App() {
  const [active, setActive] = useState('boards');
  const ActiveSection = sectionMap[active];

  return (
    <div style={{ display: 'flex', height: '100vh', background: C.bg, color: C.text,
      fontFamily: "'Segoe UI', system-ui, sans-serif", overflow: 'hidden' }}>

      <div style={{ width: 200, background: C.card, borderRight: `1px solid ${C.border}`,
        display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '14px 12px 10px', borderBottom: `1px solid ${C.border}` }}>
          <div style={{ color: C.cyan, fontFamily: 'monospace', fontSize: 10, fontWeight: 700,
            letterSpacing: 2, textTransform: 'uppercase' }}>⚡ MCU Workshop</div>
          <div style={{ color: C.dim, fontSize: 10, marginTop: 2 }}>Embedded Systems Visualizer</div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 6px' }}>
          {topics.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 8,
              padding: '7px 8px', borderRadius: 7, border: 'none', cursor: 'pointer',
              background: active === t.id ? C.cyan + '1a' : 'transparent',
              color: active === t.id ? C.cyan : C.muted,
              fontSize: 12, fontWeight: active === t.id ? 600 : 400,
              textAlign: 'left', transition: 'all 0.12s', marginBottom: 2,
              borderLeft: active === t.id ? `3px solid ${C.cyan}` : '3px solid transparent',
            }}>
              <span style={{ fontSize: 15 }}>{t.icon}</span>
              <span style={{ lineHeight: 1.3 }}>{t.title}</span>
            </button>
          ))}
        </div>
        <div style={{ padding: '10px 12px', borderTop: `1px solid ${C.border}`,
          color: C.dim, fontSize: 9, lineHeight: 1.5 }}>
          Arduino &amp; ESP32 Workshop Notes<br/>Interactive Study Tool
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
        <ActiveSection key={active} />
      </div>
    </div>
  );
}