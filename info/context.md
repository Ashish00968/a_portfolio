# Agent Context & Work Continuity Guide

> **Target Audience**: AI Agents & Pair-Programming Assistants  
> **Repository**: `Ashish00968/a_portfolio` (`ashish-portfolio`)  
> **Current Version**: v3.2 (3D Spatial UI/UX, Orbital Command Palette & Interactive DEM Telemetry)  
> **Last Updated**: October 2026

---

## 1. Project Background & Evolution

The project has evolved through six distinct evolutionary stages:

### Stage 1: Legacy Portfolio
- A single-page static HTML/CSS/JS site with generic freelance copy, pricing tiers, and high-contrast orange neon glows.

### Stage 2: Brief v2 Multi-Route Architectural Rebuild
- Redesigned from the ground up according to `Ashish_Portfolio_Redesign_Brief_v2.md`.
- Migrated from a single-page scroll to clean, dedicated routes via `react-router-dom`:
  - `/` (Cinematic Home)
  - `/tech-stack` (formerly `/web-development`)
  - `/tech-stack/discover-himalayan-trails` (Dedicated DHT Case Study)
  - `/travel` (Field Ground Truth & Mountain Notes)
  - `/photography-video` (Unified Media Gallery & Stills)
  - `/about` & `/contact`
- Built `HeroPortrait.jsx` with documented `public/ashish-portrait.jpg` auto-detection and fallback.
- Added `public/_redirects` to ensure Netlify SPA deep links work seamlessly without 404s.

### Stage 3: Spaceship Aesthetic & Hierarchy Rebalance
Per Ashish's explicit design request:
1. **Spaceship.com Theme & Animations**:
   - Deep Cosmic Obsidian color palette (`#06090e`, `#0a0d10`, `#11161c`).
   - `SpaceshipBackground.jsx`: Canvas starfield and orbital nebula background.
   - `SpotlightCard.jsx`: Hardware-accelerated cursor-following radial spotlight with illuminated borders.
   - Telemetry HUD badges (`[ONLINE / ACTIVE]`, coordinates, elevation, base station).
2. **"Web Dev" Rebranded to "Tech Stack"**:
   - Replaced all "Web Dev" / "Web Development" mentions across the entire site with **"Tech Stack"** (`/tech-stack`).
   - Categorized skills: Core Engineering & Frontend, 3D Geospatial & Terrain Systems, Media Engine, Creative Post-Production.
   - Interactive Skill Inspector displaying real-world purpose on hover.
3. **Primary Destination Reordering**:
   - Primary top navigation and homepage explore pills ordered strictly:
     1. **Tech Stack** (`/tech-stack`)
     2. **Travel** (`/travel`)
     3. **Photography & Videography** (`/photography-video`)
   - Followed by **About** and **Contact**, with **DHT Atlas** featured as the flagship platform in the header pill and within Tech Stack.

### Stage 4: Authentic Field Photography & Expedition Storytelling Integration
- Analyzed and web-optimized 4 high-resolution authentic photographs from Ashish's May 2025 Himalayan expeditions in `Photos/`:
  1. `20250516_170134.jpg` -> `public/ashish-portrait.jpg` (576KB): Featured portrait standing before the Himalayan gateway arch and snow peaks. Auto-detected by `HeroPortrait.jsx` on `/`.
  2. `20250519_131935.jpg` -> `public/field-explorer-glacier.jpg` (968KB): Ashish surveying Pir Panjal glaciers; powers the new Featured Expedition spotlight on `/travel` and lead gallery item on `/photography-video`.
  3. `20250519_132706.jpg` -> `public/pir-panjal-glacier-face.jpg` (979KB): High-resolution hanging glacier & rock face study; powers the 3D DEM calibration visual on DHT Case Study (`/tech-stack/discover-himalayan-trails`) and fine art gallery.
  4. `20250519_152559.jpg` -> `public/alpine-reflection-ridge.jpg` (498KB): Ashish sitting along the 3,978m Rohtang Pass ridgeline; powers the authentic field visual interlude on `/about` and Rohtang Pass card on `/travel`.
- Enriched `photographyGallery` with 8 curated works featuring telemetry pills and responsive alternating lead grid rhythm.

### Stage 5: Orbital Command Palette, Fullscreen Lightbox, Pipeline UI & SEO Plumbing (v3.1)
- **Spaceship Orbital Command Palette (`⌘K` / `Ctrl+K`)**:
  - `CommandPalette.jsx` and `CommandPalette.css` mounted via `createPortal(..., document.body)` to escape header stacking contexts.
  - Desktop `[⌘K]` command pill in navbar and mobile drawer launcher.
  - Search filtering across routes, external platforms (DHT Live Atlas, Editzportfolio, GitHub), and quick actions (copy email).
  - Arrow navigation (`ArrowUp`/`ArrowDown`), `Enter` activation, `Escape` closing.
- **Route Code Splitting & Performance**:
  - `HomePage` eagerly loaded for instant FCP.
  - `TechStackPage`, `DhtCaseStudyPage`, `PhotoVideoPage`, `TravelPage`, `AboutPage`, and `ContactPage` code-split with `React.lazy()` and `<Suspense>`.
  - Zero-layout-shift telemetry loading indicator (`[LOADING TELEMETRY...]`).
- **Dynamic SEO & Metadata**:
  - Centralized `routeMeta` in `portfolioData.js`.
  - `ScrollToTop.jsx` dynamically updates `document.title` and `<meta name="description">` on route changes.
  - `index.html` canonical meta, Open Graph / Twitter image tags, and `Person` JSON-LD schema.
- **Accessible Media Interactivity**:
  - Before/After comparison slider with pointer capture (`setPointerCapture`), `role="slider"`, `aria-valuenow`, and keyboard arrows (`ArrowLeft`/`ArrowRight` 5% deltas).
  - Fullscreen Lightbox modal with cycling chevrons, index badge (`01 / 08`), keyboard cycling (`ArrowLeft`/`ArrowRight`), body scroll lock, and `Escape` dismiss.
- **DHT System & Telemetry Pipeline UI**:
  - 4-stage pipeline (`01 GPX Ingestion`, `02 3D DEM Shaders`, `03 Zustand Store`, `04 Edge Media`) displayed with `SpotlightCard` and telemetry labels.

### Stage 6: 3D Spatial UI/UX, Perspective Tilt Physics & Interactive 3D DEM Elevation Inspector (v3.2 — Current State)
- **3D Depth-Layered Orbital Starfield & Topographic Horizon (`SpaceshipBackground.jsx`)**:
  - Upgraded to a 3D depth-layered starfield (`z: 0.25` to `1.0`) with smooth pointer-driven camera parallax and subtle 3D topographic DEM contour waves undulating along the lower horizon.
- **3D Perspective Tilt & Specular Border Beam (`SpotlightCard.jsx` & `.css`)**:
  - Added hardware-accelerated `perspective(1000px) rotateX(...) rotateY(...)` 3D tilt driven via `requestAnimationFrame` CSS custom properties (`--rotate-x`, `--rotate-y`) for zero React re-renders during mouse movement, plus a radial border beam mask.
- **3D Spatial Telemetry Portrait Frame (`HeroPortrait.jsx` & `.css`)**:
  - Physics-based Framer Motion (`useMotionValue` + `useSpring`) 3D frame tilt, counter-parallax portrait depth, Z-elevated floating HUD pill (`DEM LOCK // 4,261M` at `translateZ(28px)`), optical viewfinder corner reticles, and diagonal specular glass glare.
- **Interactive 3D Topographic DEM & GPX Waypoint Inspector (`ElevationProfile3D.jsx` & `.css`)**:
  - Embedded in both `HomePage.jsx` and `DhtCaseStudyPage.jsx`, allowing visitors to scrub across 5 field-verified Patalsu Peak waypoints (`WP-01 2,480M` to `WP-36 4,261M`) on a 3D perspective stage with live altitude, GPS coordinates, slope gradient, and terrain zone telemetry.

---

## 2. Active Environment & Dev Commands

- **Local Development Server**:
  ```bash
  npm run dev -- --port 5173
  ```
- **Linting (Strict 0 Errors Requirement)**:
  ```bash
  npm run lint
  ```
- **Production Build (Rollup / LightningCSS Validation)**:
  ```bash
  npm run build
  ```
- **Visual Validation**:
  - Validated via Playwright MCP at Desktop (1440×900) and Mobile (390×844).

---

## 3. Important Implementation Rules & Gotchas

### 1. Data Integrity & Single Source of Truth
- **Never hardcode text, telemetry, or external URLs in JSX.** All copy, routes, coordinates, and skills belong in [src/data/portfolioData.js](file:///Users/apple/Documents/Development/Websites/ashish-portfolio/src/data/portfolioData.js).

### 2. Lucide Icon Quirk
- **Do NOT import `Github` from `lucide-react`**: The version installed does not export `Github`. Always use the custom inline SVG `GithubIcon` defined in `Footer.jsx` and `ContactPage.jsx`.

### 3. Netlify & SPA Routing Base
- When deploying with multi-level routes (e.g. `/tech-stack/discover-himalayan-trails`), `vite.config.js` must set `base: '/'` so script and asset requests resolve to `/assets/...` instead of relative paths.
- `public/_redirects` contains:
  ```
  /*    /index.html   200
  ```
  Never delete this file. It prevents 404 errors on direct navigation to `/tech-stack`, `/travel`, etc.

### 4. Modal Portals & Stacking Context
- Modals, Command Palettes, and Lightboxes should always mount via `createPortal(..., document.body)` to avoid getting trapped behind parent backdrop filters or header z-indexes.

### 5. LightningCSS Syntax Strictness
- Vite 8 uses `lightningcss` for CSS minification. Ensure all CSS blocks are strictly closed; unclosed curly brackets before `@keyframes` or media queries will fail the production build.

### 6. Emil Kowalski Animation Discipline (`emil-design-eng`)
- **No `transition: all`**: Explicitly animate individual properties (`transform`, `opacity`, `background-color`, `border-color`).
- **Snappy Durations**: Fast interactions (160ms–260ms), custom easing (`cubic-bezier(0.23, 1, 0.32, 1)`).
- **Physical Tactile Press**: `:active { transform: scale(0.97); }` on buttons and cards.
- **Respect Reduced Motion**: Canvas particles and Framer Motion stagger children respect `prefers-reduced-motion`.

---

## 4. Current State & Feature Status Matrix

| Component / Route | Status | Notes |
| :--- | :--- | :--- |
| **3D Starfield & DEM Horizon Canvas** | Active | `SpaceshipBackground.jsx` with Z-depth parallax & contour waves |
| **3D Spotlight Card Component** | Active | `SpotlightCard.jsx` with 3D perspective tilt & specular border beam |
| **3D Hero Portrait HUD Frame** | Active | `HeroPortrait.jsx` with spring 3D tilt, `translateZ` HUD & reticles |
| **3D DEM Elevation Inspector** | Active | `ElevationProfile3D.jsx` interactive 36-waypoint ridge on `/` & `/dht` |
| **Command Palette (`⌘K`)** | Active | `CommandPalette.jsx` via portal, fuzzy search, key shortcuts |
| **Navbar & Mobile Drawer** | Active | Tech Stack, Travel, Photo & Video, About, Contact + `[⌘K]` + DHT Pill |
| **Homepage (`/`)** | Active | Hero with telemetry, 3D portrait, explore pills, DHT card + 3D DEM stage |
| **Tech Stack Page (`/tech-stack`)** | Active | 4 categorized pillars, interactive skill inspector, DHT architecture |
| **DHT Case Study (`/tech-stack/discover-himalayan-trails`)** | Active | 3D DEM details, 4-stage pipeline grid, interactive 3D elevation stage |
| **Travel Page (`/travel`)** | Active | Documented peaks (Patalsu, Rohtang, Kinnaur) & Trekking Hills Travels |
| **Photo & Video Page (`/photography-video`)** | Active | Gallery, cycling Lightbox, RAW vs Graded slider with pointer capture |
| **About Page (`/about`)** | Active | IIITDM Jabalpur CS foundation, mountain background, competencies |
| **Contact Page (`/contact`)** | Active | Direct email link, copy button, verified links, mail composer |
| **Route Code Splitting & SEO** | Active | `React.lazy()`, `routeMeta` in `portfolioData.js`, dynamic titles in `ScrollToTop` |
