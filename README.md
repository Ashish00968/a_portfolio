# Ashish Nirankari — Portfolio

Cinematic, spaceship-inspired personal portfolio for **Ashish Nirankari** — Computer Science student at IIITDM Jabalpur, founder of **Discover Himalayan Trails**, geospatial systems engineer, and high-altitude visual creator.

---

## 🌐 Live Deployments

- **GitHub Pages**: [https://ashish00968.github.io/a_portfolio/](https://ashish00968.github.io/a_portfolio/)
- **Netlify**: Auto-deployed via GitHub webhook with `netlify.toml` and `public/_redirects`

---

## 🏔️ Architecture & Dedicated Routes (v3.3)

The site is built with **React 19**, **Vite 8**, **React Router 7**, and **Framer Motion**, utilizing route code-splitting (`React.lazy()` + `<Suspense>`) for instant initial paint and zero layout shifts:

- `/` — Cinematic Spaceship editorial homepage with live telemetry, 3D spatial hero portrait, and interactive DEM ridge
- `/tech-stack` — Technical capabilities, systems architecture principles, and web projects
- `/tech-stack/discover-himalayan-trails` — Flagship case study for Discover Himalayan Trails (Mapbox GL JS 3D DEM, GPS tracks, 4-stage system & telemetry pipeline)
- `/travel` — Regional mountain field notes and verified industry context (Himachal Pradesh, Trekking Hills Travels)
- `/photography-video` — Himalayan landscape photography, interactive RAW vs. Graded color slider, full-screen cycling Lightbox, and cinematic video edits
- `/about` — Background, IIITDM Jabalpur CS foundation, and technical ethos
- `/contact` — Verified communication channels, mail client composer, and instant clipboard copy

---

## 🚀 3D Scroll Physics & Himalayan Orbital Altimeter HUD

- **Relativistic Starfield Warp & Topographic DEM Horizon (`SpaceshipBackground.jsx`)**: Canvas starfield with velocity-damped scroll tracking (`scrollY` exponential decay `0.07`). Stars stretch along the vertical vector into high-speed warp streaks proportional to scroll speed, while 4-layer DEM contours dynamically undulate.
- **3D Perspective Scroll Container (`Scroll3DReveal.jsx`)**: Hardware-accelerated 3D scroll reveal (`perspective: 1200px`, `transform-style: preserve-3d`) driven by Framer Motion spring physics (`stiffness: 180, damping: 24`). Features entry pitch (`rotateX: 6.5° → 0°`), scale smoothing, and exit displacement (`translateZ`).
- **Floating 3D Himalayan Orbital Altimeter HUD (`ScrollTelemetryHUD.jsx`)**: Fixed viewport altimeter mapping page scroll directly to field altitude from Solang Base (`2,480m`) to Patalsu Summit (`4,261m`), tracking waypoints (`WP-01` to `WP-36`) with a 3D attitude gimbal ring and smooth scroll-to-top action.
- **Hero 3D Spatial Tilt & Depth Separation (`HeroPortrait.jsx`)**: Dual-tier transform separating mouse-driven spring tilt from scroll-driven pitch (`rotateX: 0° → 10.5°`, `translateZ: 0px → -42px`), creating 3D depth separation between the portrait frame and the forward-projected HUD pill (`DEM LOCK // 4,261M`).
- **Emil Kowalski Animation Discipline**: All motion is GPU-composited (`transform`, `opacity`), zero `transition: all`, physical `:active` scaling (`scale(0.95)`), and 100% `prefers-reduced-motion` compliance.

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
