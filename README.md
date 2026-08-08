# ⚡ MCU Workshop Visualizer

An interactive React app that turns an Arduino / ESP8266 / ESP32 embedded-systems workshop into hands-on, animated visualizations. Instead of reading static diagrams, you press buttons, drag sliders, and watch real-time signal graphs to build intuition for how microcontrollers actually behave.

Built with plain React + Canvas + SVG — no UI kit, no Tailwind, no backend.

---

## 📖 Companion Study Guide

**`Embedded_Systems_Student_Guide.docx`** is the full written course this app is based on — read it alongside (or instead of) the visualizer for the theory, wiring diagrams, and code listings behind each topic.

| Session | Topic |
|---|---|
| 01 | Hardware Fundamentals (MCU vs MPU, Arduino / ESP8266 / ESP32 / Raspberry Pi) |
| 02 | Pins — Digital, Analogue & PWM |
| 03 | Boot, Reset & Memory |
| 04 | Code, Firmware & the IDE |
| 05 | Serial, Monitor, Plotter & Debugging |
| 06 | Communication Protocols (I2C, SPI, UART) |
| 07 | Interfaces, Displays & Sensors |
| 08 | Platform-Specific & Going Further |
| Appendix A | Quick Reference Cheat Sheet |
| Appendix B | Glossary of Terms |

The guide uses a colour-coded box system: 🔑 yellow = key concepts to memorise, 🛠️ teal = hands-on exercises, ⚠️ red = warnings that can burn hardware or crash code, 💡 green = pro tips.

---

## 🚀 Running the Visualizer

This is a standard [Create React App](https://create-react-app.dev/) project.

```bash
npm install
npm start
```

Open the printed `localhost` URL (default `http://localhost:3000`).

Other available scripts:

```bash
npm run build   # production build, output in /build
npm test        # run tests (react-scripts test)
```

> Requires Node.js and npm. No extra configuration or environment variables are needed.

---

## 🧠 Topics Covered in the App

| # | Topic | What You Can Interact With |
|---|---|---|
| 1 | **Arduino vs ESP32** | Spec comparison bars, voltage compatibility warning |
| 2 | **Voltage & Threshold** | Drag the voltage slider to see HIGH / LOW / Undefined zones; switch between Floating / Pull-up / Pull-down to see how resistors eliminate the undefined zone |
| 3 | **Digital vs Analog** | Hold a button to drive a live digital signal; turn a dial to drive a live analog signal; toggle noise to see threshold immunity vs. raw sensitivity |
| 4 | **I2C Protocol** | Animated SDA/SCL timing diagram |
| 5 | **Serial & Baud Rate** | Mismatch board vs. monitor baud rates and watch garbage characters appear |
| 6 | **ADC Conversion** | Slide the analog voltage, see live 10-bit / 12-bit digital conversion |
| 7 | **PCM (Sampling)** | Adjust sample rate, bit depth, and signal frequency; trigger real aliasing when you violate the Nyquist rate |
| 8 | **PWM Duty Cycle** | Control frequency + duty cycle + slow-motion playback to see *why* a blinking LED looks steady (persistence of vision / flicker fusion) |
| 9 | **GPIO & Resistors** | Press-and-hold button wired through animated pull-up/pull-down circuit diagrams |
| 10 | **Boot & Memory** | Step through the MCU boot sequence; compare Flash / SRAM / EEPROM sizes |
| 11 | **delay() vs millis()** | Side-by-side blocking vs. non-blocking timing simulation |

Every section includes an "Easy Idea" callout with a plain-language analogy for the concept.

---

## 📁 Project Structure

```
EmbeddedSystemWorkshop-main/
├── Embedded_Systems_Student_Guide.docx   # Companion written study guide
├── index.html                            # Standalone reference page: copy-paste code
│                                          # snippets for 8 core topics (digital/analog
│                                          # I/O, I2C, WiFi, Bluetooth) — open directly
│                                          # in a browser, not part of the build
├── public/                                # CRA static assets (favicon, manifest, etc.)
├── src/
│   ├── App.js                             # Main visualizer component (all 11 topic
│   │                                       # sections live here)
│   ├── App.css / index.css                # Styling
│   └── index.js                           # React entry point
├── package.json
└── package-lock.json
```

---

## 🛠️ Tech Stack

- **React 19** — `useState`, `useEffect`, `useRef` only, no extra hooks/libraries
- **Canvas API** — real-time oscilloscope-style waveforms
- **Inline SVG** — circuit diagrams (pull-up/pull-down, rotary dial)
- **Plain inline styles** — no CSS framework required

---

## 📝 Notes

- All animations use `requestAnimationFrame` for smooth 60fps rendering without unnecessary re-renders (canvas/LED visuals are mutated imperatively via refs where needed).
- The sidebar navigation remounts each section on switch (`key={active}`) so timers and animation loops reset cleanly between topics.
- Content is adapted from the bilingual (Bengali/English) `Embedded_Systems_Student_Guide.docx` workshop notes — use the visualizer to *see* a concept in action, then flip to the guide for the deeper explanation, wiring instructions, and full code listings.
