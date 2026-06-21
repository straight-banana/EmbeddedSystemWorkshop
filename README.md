# ⚡ MCU Workshop Visualizer

An interactive React app that turns Arduino & ESP32 embedded-systems workshop notes into hands-on, animated visualizations — press buttons, drag sliders, and watch real-time signal graphs instead of just reading static diagrams.

No external UI libraries, no Tailwind, no backend — just React, Canvas, and SVG.

---

## 🚀 Running It

You have three options, from zero-setup to full project.

### Option 1 — Just double-click it (no install)

Open **`EmbeddedVisualizer_standalone.html`** directly in any browser. It loads React and Babel from a CDN and runs immediately — best for a quick look or demoing on someone else's PC.

> Requires an internet connection (for the CDN scripts), but nothing to install.

### Option 2 — Vite (recommended for editing)

```bash
npm create vite@latest mcu-visualizer -- --template react
cd mcu-visualizer
```

Replace the contents of `src/App.jsx` with **`App.jsx`** from this project, then:

```bash
npm install
npm run dev
```

Open the printed `localhost` URL.

### Option 3 — Create React App

```bash
npx create-react-app mcu-visualizer
cd mcu-visualizer
```

Replace the contents of `src/App.js` with **`App.jsx`**, then:

```bash
npm start
```

> No extra packages are needed in either setup — the component only uses core React (`useState`, `useEffect`, `useRef`) plus the browser's built-in Canvas and SVG.

---

## 📁 Files in This Project

| File | Purpose |
|---|---|
| `App.jsx` | The component, pre-named `App` — drop straight into `src/App.jsx` (Vite) or `src/App.js` (CRA) with zero edits |
| `EmbeddedVisualizer.jsx` | Same component, named `EmbeddedVisualizer` — use if you're embedding it elsewhere or want a custom file/component name |
| `EmbeddedVisualizer_standalone.html` | Self-contained file with React + Babel loaded via CDN — double-click and run, no Node/npm required |

---

## 🧠 Topics Covered

| # | Topic | What You Can Interact With |
|---|---|---|
| 1 | **Arduino vs ESP32** | Spec comparison bars, voltage compatibility warning |
| 2 | **Voltage & Threshold** | Drag voltage slider to see HIGH/LOW/Undefined zones; flip between Floating / Pull-up / Pull-down to see how resistors eliminate the undefined zone |
| 3 | **Digital vs Analog** | Hold a button to drive a live digital signal; turn a dial to drive a live analog signal; toggle noise to see threshold immunity vs. raw sensitivity |
| 4 | **I2C Protocol** | Animated SDA/SCL timing diagram |
| 5 | **Serial & Baud Rate** | Mismatch board vs. monitor baud rates and watch garbage characters appear |
| 6 | **ADC Conversion** | Slide analog voltage, see live 10-bit/12-bit digital conversion |
| 7 | **PCM (Sampling)** | Adjust sample rate, bit depth, and signal frequency; trigger real aliasing when you violate the Nyquist rate |
| 8 | **PWM Duty Cycle** | Control frequency + duty cycle + slow-motion playback to see *why* a blinking LED looks steady (persistence of vision / flicker fusion) |
| 9 | **GPIO & Resistors** | Press-and-hold button wired through animated pull-up/pull-down circuit diagrams |
| 10 | **Boot & Memory** | Step through the MCU boot sequence; compare Flash/SRAM/EEPROM sizes |
| 11 | **delay() vs millis()** | Side-by-side blocking vs. non-blocking timing simulation |

Every section includes a "Easy Idea" callout with a plain-language (Bengali) analogy for the concept.

---

## 🛠️ Tech Stack

- **React** — `useState`, `useEffect`, `useRef` only (no extra hooks/libraries)
- **Canvas API** — real-time oscilloscope-style waveforms
- **Inline SVG** — circuit diagrams (pull-up/pull-down, rotary dial)
- **Plain inline styles** — no Tailwind/CSS framework required

---

## 📝 Notes

- All animations use `requestAnimationFrame` for smooth 60fps rendering without unnecessary re-renders (canvas/LED visuals are mutated imperatively via refs where needed).
- The sidebar navigation remounts each section on switch (`key={active}`) so timers and animation loops reset cleanly between topics.
- Source content adapted from a bilingual (Bengali/English) Arduino & ESP32 workshop notes document.