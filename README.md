<div align="center">

🇬🇧 **English** | [🇮🇷 فارسی](README_FA.md)

# ⚡ Mahbod BemaniCham

**Electrical Engineering — Control Systems major · Electronics minor**
**Amirkabir University of Technology (Tehran Polytechnic)**

[![Portfolio](https://img.shields.io/badge/🌐_Live_Portfolio-mahbodbe.github.io%2Fnomoreidea-3b82f6?style=for-the-badge)](https://mahbodbe.github.io/nomoreidea/)
[![GitHub](https://img.shields.io/badge/GitHub-@Mahbodbe-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Mahbodbe)
[![Telegram](https://img.shields.io/badge/Telegram-@Mb__Mb84-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/Mb_Mb84)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-mahbod--bemanicham-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mahbod-bemanicham-048b252ab)

*This repository is the source code of my personal portfolio — a hand-built, zero-framework,
anti-template engineering index.*

</div>

---

## 🧭 What is this?

Most portfolios look like they were generated. This one is **deliberately built to not be**.

`nomoreidea` is my personal corner of the web: a static, single-page index of the things
I have actually engineered — embedded systems, digital hardware, desktop applications,
and web platforms. No stock photos. No invented metrics. No "trusted by 50,000+ teams."
Every number on this site is real, every screenshot is from a repository you can open.

The design system is a custom-built dark theme I call **Cobalt Night**: a deep navy-blue
canvas (`oklch(16% 0.028 258)`) with layered band rhythm, hairline borders instead of cards,
and exactly one signal color — electric cobalt — spent only where it means something.
Typography is Space Grotesk + Inter + JetBrains Mono.

## 🎨 Design Philosophy (Hallmark Discipline)

This project follows the [Hallmark](https://github.com/nutlope/hallmark) anti-AI-slop design doctrine:

| Principle | How it's applied here |
|---|---|
| **Honest copy** | Zero fabricated statistics. Every repo count, course, and collaborator name is verified against the live GitHub API. |
| **Locked tokens** | Every color and font flows through named CSS custom properties in `tokens.css`. Zero inline hex values anywhere in `site.css`. |
| **No re-drawn chrome** | No fake browser bars, no fake phone frames, no fake IDE windows. Real screenshots inside `<figure>` elements with hairline borders. |
| **Structural variety** | The page is an *index*, not the default "hero → 3 feature cards → CTA → footer" AI template. |
| **Mobile floor** | Verified pixel-perfect at 320 / 375 / 414 / 768 / 1280 / 1920 px via automated CDP audit. |
| **Accessibility** | automated WCAG AA checks for computed solid-color text/background pairs, visible focus rings, full keyboard navigation, reduced-motion support. |

## 🛠️ Tech Stack

Deliberately boring. Deliberately fast.

```
HTML5 · CSS3 (custom properties, OKLCH color space, CSS Grid)
Zero JavaScript frameworks · Zero build step · Zero trackers
```

Everything is two files: `index.html` and `css/site.css` (+ `css/tokens.css`). That's it.
No React. No Tailwind. No Webpack. It loads instantly and works offline.

## 📂 Repository Structure

```
nomoreidea/
├── index.html                  # Semantic single-page markup
├── css/
│   ├── tokens.css              # Portable OKLCH design tokens
│   └── site.css                # Layout, typography, components
├── images/
│   ├── mahbod.jpg              # Portrait
│   └── projects/               # Real screenshots from real repos
└── tools/
    └── audit.py                # Headless-Chromium CDP responsive & contrast auditor
```

## 🔍 Automated Quality Gate

I wrote [`tools/audit.py`](tools/audit.py) — a headless-Chromium CDP auditor that loads the
page at six viewport widths (320 → 1920 px) and programmatically checks:

- Horizontal overflow at any viewport
- Tap targets below 44×44 px (WCAG)
- Clickable text wrapping onto two lines
- WCAG AA contrast failures on every text node

Latest run: **TOTAL ISSUES: 0**

```bash
python3 -m http.server 8000
python3 tools/audit.py http://127.0.0.1:8000/index.html
```

## 🚀 Featured Work

These are the projects indexed on the portfolio:

- **[Smart Parking DAQ System](https://github.com/Mahbodbe/smart-parking)** — ESP32 multi-sensor
  data acquisition, PID servo gate control, ANPR + RFID two-factor authentication, live telemetry dashboard
- **[Hamming ECC Packet Processor](https://github.com/Mahbodbe/HammingProject)** — VHDL RTL engine
  with SIPO/PISO serialization, ALU core, FSM control unit, and hardware Hamming ECC
- **[Qt Deep Dive](https://github.com/Mahbodbe/Qt-Deep-Dive)** — 14-chapter modern Qt/C++ engineering log:
  polymorphic OS singletons, Qt Charts telemetry, shared library architecture with DAO layer
- **[Learning Qt](https://github.com/Mahbodbe/Learning-Qt)** — Foundation GUI practice: widgets,
  signals/slots, custom QSS themes
- **[Smart Door Lock](https://github.com/Mahbodbe/DoorLock)** — Phased MFRC522 RFID + PIR +
  break-beam access-control build

## 📄 License

MIT — see [LICENSE](LICENSE). Reuse the design system if you find it useful;
a star would make my day ⭐

---

<div align="center">

**Built by [Mahbod BemaniCham](https://github.com/Mahbodbe)** ·
Tehran Polytechnic · Tehran, Iran · 2026

</div>
