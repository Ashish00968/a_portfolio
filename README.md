# Ashish Nirankari — Portfolio

Cinematic, spaceship-inspired personal portfolio for **Ashish Nirankari** — Computer Science student at IIITDM Jabalpur, founder of **Discover Himalayan Trails**, geospatial systems engineer, and high-altitude visual creator.

---

## 🏔️ Architecture & Dedicated Routes (v3.1)

The site is built with **React 19**, **Vite 8**, **React Router 7**, and **Framer Motion**, utilizing route code-splitting (`React.lazy()` + `<Suspense>`) for instant initial paint and zero layout shifts:

- `/` — Cinematic Spaceship editorial homepage with live telemetry and hero portrait
- `/tech-stack` — Technical capabilities, systems architecture principles, and web projects
- `/tech-stack/discover-himalayan-trails` — Flagship case study for Discover Himalayan Trails (Mapbox GL JS 3D DEM, GPS tracks, 4-stage system & telemetry pipeline)
- `/travel` — Regional mountain field notes and verified industry context (Himachal Pradesh, Trekking Hills Travels)
- `/photography-video` — Himalayan landscape photography, interactive RAW vs. Graded color slider, full-screen cycling Lightbox, and cinematic video edits
- `/about` — Background, IIITDM Jabalpur CS foundation, and technical ethos
- `/contact` — Verified communication channels, mail client composer, and instant clipboard copy

---

## ⚡ Spaceship Orbital Command Palette (`⌘K` / `Ctrl+K`)

- Press `⌘K` (Mac) or `Ctrl+K` (Windows/Linux), or click the `[⌘K]` command pill in the header.
- Instant fuzzy search across routes, external platforms (DHT Live Atlas, Editzportfolio, GitHub), and quick actions (copy email).
- Keyboard-driven navigation with `ArrowUp`, `ArrowDown`, `Enter`, and `Escape`.
- Rendered via React portal (`createPortal(..., document.body)`) with frosted glass blur and Cosmic Obsidian telemetry styling.

---

## 📷 Portrait Image Slot (For Ashish)

The hero section features a dedicated, responsive portrait frame designed specifically for outdoor photographs:

1. Place your photograph at:
   ```
   public/ashish-portrait.jpg
   ```
2. The site will **automatically detect and display your photo** with cinematic aspect-ratio, focal crop, and subtle entrance animation.
3. If no image is placed, it gracefully falls back to an atmospheric mountain visual with coordinates (`32.2396° N, 77.1887° E`).

---

## 🛠️ Development & Building

```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Lint code (Strict ESLint 9 — 0 errors & 0 warnings)
npm run lint

# Production build (Vite 8 / Rollup code-splitting)
npm run build

# Preview production build locally
npm run preview
```

---

## 🎨 Design System

- **Cosmic Obsidian Palette**: Space Obsidian (`#06090e`), Deep Alpine Ink (`#0a0d10`), Slate Stone (`#11161c`), Electric Cyan (`#38bdf8`), and Alpenglow Amber (`#d48a52`).
- **Interactive Lighting**: Dynamic mouse-following radial spotlight cards (`SpotlightCard.jsx`) and cosmic starfield canvas (`SpaceshipBackground.jsx`).
- **Emil Kowalski Animation Discipline**: No `transition: all`, transform and opacity-driven spring physics, tactile `:active` press responses, and full `prefers-reduced-motion` compliance.
- **Truthfulness**: 100% verified academic background, real projects, authentic GPS tracks, and genuine field photography.
