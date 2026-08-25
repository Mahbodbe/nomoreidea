# 🚀 nomoreidea — Mahbod BemaniCham's Portfolio

Personal index and engineering log of **Mahbod BemaniCham**, Electrical Engineering undergraduate at **Amirkabir University of Technology (Tehran Polytechnic)**.

Live page: hosted via GitHub Pages (or any static host) from the root of this repository.

---

## 📐 Design System & Philosophy

Built with **[Hallmark](https://github.com/nutlope/hallmark)** anti-AI-slop design discipline:

- **Theme:** `Grid` — Swiss neo-grotesque systems design (near-white cool sheet, exposed 12-column hairline grid, Archivo 800 lowercase display, single **ultramarine** signal ink spent on geometry).
- **Macrostructure:** `Index-First` (13) — the page *is* an index of real repositories, not a marketing brochure.
- **Nav / Footer:** `N9` Edge-aligned minimal · `Ft4` Dense colophon.
- **Enrichment:** Tier A constructed geometry (marks kit: period square, signal bar, registration mark, dot lattice, diagonal rule, cropped numeral). Zero photos, zero fake browser chrome, zero stock placeholders.
- **Zero AI-slop tells:** no gradient text, no three equal icon cards, no centred-everything, no invented statistics. Every listed repository, collaborator, and course is verified against the real GitHub API.
- **Architecture:** pure static HTML + CSS. Zero build step, zero framework dependencies, zero trackers.

---

## 📂 Structure

```
nomoreidea/
├── index.html        # Single-page semantic HTML5 markup
├── css/
│   ├── tokens.css    # Portable OKLCH design tokens (colors, type, spacing)
│   └── site.css      # Grid layout, marks kit, responsive typography
└── tools/
    └── audit.py      # Headless-Chromium CDP responsive & contrast auditor
```

---

## 🛠️ Local Development & Audit

Serve locally with any HTTP server:

```bash
# Start a local static server
python3 -m http.server 8000

# Run the 6-viewport responsiveness & contrast audit (requires Chromium + python websockets)
python3 tools/audit.py http://127.0.0.1:8000/index.html
```

---

## 👨‍💻 Author

**Mahbod BemaniCham**  
Electrical Engineering — Amirkabir University of Technology (Tehran Polytechnic)  
- 🐙 **GitHub:** [@Mahbodbe](https://github.com/Mahbodbe)  
- 💼 **LinkedIn:** [mahbod-bemanicham](https://www.linkedin.com/in/mahbod-bemanicham-048b252ab)  
- ✉️ **Email:** mahbod2023@gmail.com  

---

## 📄 License

[MIT License](LICENSE) — feel free to reuse the design system.
