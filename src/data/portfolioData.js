/**
 * Portfolio Central Content Data
 * Source of truth for Ashish Nirankari's portfolio
 * Aligned with Ashish_Portfolio_Redesign_Brief_v2.md & Spaceship Theme Direction
 */

/**
 * Helper to resolve static asset paths against Vite's base path
 * Handles both root deployment (Netlify) and repository subfolder (GitHub Pages: /a_portfolio/)
 */
export const getAssetPath = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL || '/';
  return base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
};

export const profile = {
  name: 'Ashish Nirankari',
  title: 'Full Stack Engineer & Founder of Discover Himalayan Trails',
  telemetry: {
    systemStatus: 'ONLINE / ACTIVE',
    coordinates: '32.2396° N, 77.1887° E',
    elevation: '4,261 M (SOLANG / PATALSU)',
    baseStation: 'IIITDM JABALPUR',
  },
  hero: {
    name: 'ASHISH NIRANKARI',
    headlinePrimary: 'Engineering Systems for the Web.',
    headlineSecondary: 'Mapping the High Mountains.',
    supportingLine:
      'Computer Science at IIITDM Jabalpur. Architecting modern web platforms, 3D geospatial terrain systems, and high-altitude visual media.',
  },
  portrait: {
    customImagePath: getAssetPath('/ashish-portrait.jpg'),
    fallbackPlaceholder: getAssetPath('/sethan-thumbnail.jpg'),
    alt: 'Ashish Nirankari — Mountain outdoor portrait slot',
    caption: 'Ashish Nirankari · Himalayan field & web craft',
  },
  location: 'India',
  education: {
    degree: 'B.Tech in Computer Science',
    institution: 'IIITDM Jabalpur',
  },
  social: {
    email: 'ashishnirankari0968@gmail.com',
    instagram: 'https://instagram.com/ashish_0968',
    instagramHandle: '@ashish_0968',
    dhtUrl: 'https://discoverhimalayantrails.com',
    videoPortfolioUrl: 'https://editzportfolio.netlify.app',
    github: 'https://github.com/Ashish00968',
  },
};

export const navItems = [
  { label: 'Tech Stack', path: '/tech-stack' },
  { label: 'Travel', path: '/travel' },
  { label: 'Photography & Video', path: '/photography-video' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const routeMeta = {
  '/': {
    title: 'Ashish Nirankari — Systems Engineer & Founder, Discover Himalayan Trails',
    description:
      'Computer Science at IIITDM Jabalpur. Architecting modern web platforms, 3D geospatial terrain systems, and high-altitude visual media.',
  },
  '/tech-stack': {
    title: 'Tech Stack & Engineering Architecture — Ashish Nirankari',
    description:
      'Core engineering systems, React 19, TypeScript, Mapbox 3D DEM geospatial engines, and low-bandwidth media architectures by Ashish Nirankari (IIITDM Jabalpur).',
  },
  '/tech-stack/discover-himalayan-trails': {
    title: 'Discover Himalayan Trails Case Study — 3D Digital Atlas by Ashish Nirankari',
    description:
      'Architectural deep-dive into Discover Himalayan Trails: 3D DEM terrain visualization, GPS waypoint telemetry, reactive state, and mountain platform design.',
  },
  '/travel': {
    title: 'Mountain Field Notes & GPS Telemetry — Ashish Nirankari',
    description:
      'High-altitude Himalayan exploration, Patalsu Peak (4,261m) GPS summit tracks, Rohtang Pass ridgeline surveys, and mountain ground truth by Ashish Nirankari.',
  },
  '/photography-video': {
    title: 'Photography & Videography — Ashish Nirankari',
    description:
      'Himalayan alpenglow landscapes, RAW vs Graded color science comparison, and cinematic mountain video edits by Ashish Nirankari.',
  },
  '/about': {
    title: 'About Ashish Nirankari — IIITDM Jabalpur CS & Mountain Explorer',
    description:
      'Computer Science student at IIITDM Jabalpur, engineering philosophies, high-altitude expedition background, and technical craft.',
  },
  '/contact': {
    title: 'Contact & Transmission Checkpoint — Ashish Nirankari',
    description:
      'Direct transmission checkpoint for engineering collaborations, geospatial platform discussions, and field project inquiries with Ashish Nirankari.',
  },
};

export const commandPaletteItems = [
  {
    category: 'Navigation',
    items: [
      {
        id: 'nav-home',
        label: 'Home',
        description: 'Cosmic overview & orbital telemetry',
        path: '/',
        shortcut: 'H',
      },
      {
        id: 'nav-tech-stack',
        label: 'Tech Stack',
        description: 'Core engineering & 3D geospatial systems',
        path: '/tech-stack',
        shortcut: 'T',
      },
      {
        id: 'nav-dht',
        label: 'Discover Himalayan Trails Case Study',
        description: '3D DEM atlas architecture breakdown',
        path: '/tech-stack/discover-himalayan-trails',
        shortcut: 'D',
      },
      {
        id: 'nav-travel',
        label: 'Travel & Field Notes',
        description: 'High-altitude GPS tracks & summit telemetry',
        path: '/travel',
        shortcut: 'M',
      },
      {
        id: 'nav-photo-video',
        label: 'Photography & Videography',
        description: 'Mountain galleries, RAW color science & reels',
        path: '/photography-video',
        shortcut: 'P',
      },
      {
        id: 'nav-about',
        label: 'About',
        description: 'IIITDM Jabalpur CS background & philosophy',
        path: '/about',
        shortcut: 'A',
      },
      {
        id: 'nav-contact',
        label: 'Contact',
        description: 'Direct transmission & verified coordinates',
        path: '/contact',
        shortcut: 'C',
      },
    ],
  },
  {
    category: 'External Platforms',
    items: [
      {
        id: 'ext-dht',
        label: 'Discover Himalayan Trails (Live Atlas)',
        description: 'Interactive 3D Himalayan terrain platform',
        url: 'https://discoverhimalayantrails.com',
        external: true,
      },
      {
        id: 'ext-editz',
        label: 'Editzportfolio (Video Showcase)',
        description: 'Cinematic video reels and travel cuts',
        url: 'https://editzportfolio.netlify.app',
        external: true,
      },
      {
        id: 'ext-github',
        label: 'GitHub Profile',
        description: '@Ashish00968 repositories & open source',
        url: 'https://github.com/Ashish00968',
        external: true,
      },
    ],
  },
  {
    category: 'Quick Actions',
    items: [
      {
        id: 'act-email',
        label: 'Send Transmission',
        description: 'Compose direct message to ashishnirankari0968@gmail.com',
        action: 'email',
        url: 'mailto:ashishnirankari0968@gmail.com',
      },
      {
        id: 'act-copy-email',
        label: 'Copy Email Address',
        description: 'ashishnirankari0968@gmail.com',
        action: 'copy',
        value: 'ashishnirankari0968@gmail.com',
      },
    ],
  },
];

export const techStackData = [
  {
    category: 'Core Engineering & Frontend',
    description: 'Modern component architectures, type-safe development, and reactive state systems.',
    skills: [
      { name: 'React 19', level: 'Advanced', purpose: 'Concurrent rendering, modern hooks, component architecture' },
      { name: 'TypeScript', level: 'Advanced', purpose: 'Strict type safety, geospatial interfaces, API models' },
      { name: 'JavaScript (ESNext)', level: 'Advanced', purpose: 'Asynchronous streams, DOM performance, functional patterns' },
      { name: 'Zustand', level: 'Proficient', purpose: 'Lightweight reactive store for map state and filter telemetry' },
      { name: 'Framer Motion', level: 'Advanced', purpose: 'Physics-based springs, layout animations, GPU-accelerated transforms' },
      { name: 'Tailwind CSS / Pure CSS', level: 'Advanced', purpose: 'Fluid typography tokens, responsive grids, zero-runtime styling' },
      { name: 'Vite 8', level: 'Advanced', purpose: 'Lightning-fast HMR, Rollup bundling, optimized chunk splitting' },
    ],
  },
  {
    category: '3D Geospatial & Terrain Systems',
    description: 'Digital Elevation Models (DEM), interactive map camera controls, and GPS telemetry.',
    skills: [
      { name: 'Mapbox GL JS (3D DEM)', level: 'Advanced', purpose: '1.5× DEM terrain exaggeration, vector tiles, camera fly-throughs' },
      { name: 'GPS Waypoint Telemetry', level: 'Field-Verified', purpose: 'Recording, parsing, and rendering authentic 36-waypoint GPX tracks' },
      { name: 'GeoJSON & Spatial Data', level: 'Advanced', purpose: 'Elevation contours, trail boundaries, waypoint metadata serialization' },
      { name: 'Topographic UI Design', level: 'Specialized', purpose: 'Altitude profiles, slope gradients, seasonal snow cover indicators' },
    ],
  },
  {
    category: 'Media Engine & Network Resilience',
    description: 'Built for low-bandwidth alpine trailheads with zero layout shifts.',
    skills: [
      { name: 'Cloudinary CDN', level: 'Advanced', purpose: 'Dynamic responsive transformations, auto-format WebP/AVIF delivery' },
      { name: 'LQIP Pipeline', level: 'Implemented', purpose: 'Low-Quality Image Placeholders preventing CLS on 3G mountain networks' },
      { name: 'Responsive Aspect Ratios', level: 'Standard', purpose: 'Explicit bounding boxes, lazy-loading, async decoding' },
    ],
  },
  {
    category: 'Creative Post-Production & Foley',
    description: 'High-altitude color science, pacing, and immersive mountain sound design.',
    skills: [
      { name: 'Camera RAW LOG Color Grading', level: 'Specialized', purpose: 'Tonal curve balancing, alpenglow highlight recovery, cinematic LUTS' },
      { name: 'Video Editing & Pacing', level: 'Proficient', purpose: 'Rhythmic cutting, transition reels, high-frame-rate mountain footage' },
      { name: 'Sound Design & Ambient Foley', level: 'Complementary', purpose: 'Glacial stream Foley, mountain wind texture, beat synchronization' },
    ],
  },
];

export const dhtCaseStudy = {
  title: 'Discover Himalayan Trails',
  badge: 'Flagship Platform & Digital Atlas',
  liveUrl: 'https://discoverhimalayantrails.com',
  githubUrl: 'https://github.com/Ashish00968/travel',
  summary:
    'An independent digital travel atlas and destination platform documenting Himalayan trails across North India with authentic GPS routes, 3D terrain exploration, and verified field notes.',
  overview:
    'Discover Himalayan Trails (DHT) was founded and developed to solve the clutter and commercial bias in Himalayan mountain tourism. Rather than aggregator itineraries, DHT provides verified trail waypoints, 3D elevation contours, base-village logistics, and candid alpine guidance.',
  myRole: 'Founder, Lead Designer & Frontend Engineer',
  problemStatement:
    'Most travel guides for the Himalayas are generic, commercialized, and lack crucial topographic and geospatial context. Hikers and travellers need verified trail coordinates, altitude profiles, realistic seasonal windows, and field-tested advice without commercial fluff.',
  keyHighlights: [
    {
      title: '3D Terrain & GPS Waypoint Tracks',
      desc: 'Interactive 3D elevation maps with actual GPS waypoints, elevation profiles, and camera fly-throughs using Mapbox GL JS with 1.5× DEM exaggeration.',
    },
    {
      title: 'Authentic Destination Architecture',
      desc: 'Structured 3-level travel hierarchy spanning states, subregions, and specific peaks, passes, and high-altitude trails.',
    },
    {
      title: 'Optimized Visual Media Delivery',
      desc: 'Zero-layout-shift responsive media engine powered by Cloudinary CDN with progressive LQIP loading for smooth mobile performance.',
    },
    {
      title: 'Field-Verified Notes & Guidance',
      desc: 'Real logistical details: exact altitudes, base villages, seasonal windows, gear guidance, and genuine trek difficulty assessments.',
    },
  ],
  techStack: [
    'React 19',
    'TypeScript',
    'Mapbox GL JS (3D DEM)',
    'Tailwind CSS',
    'Zustand',
    'Cloudinary CDN',
    'Vite',
  ],
  destinationPages: [
    {
      name: 'Patalsu Peak (4,261m)',
      region: 'Solang Valley, Himachal Pradesh',
      url: 'https://discoverhimalayantrails.com/place/himachal-pradesh/patalsu-peak',
      githubPagesUrl: 'https://ashish00968.github.io/travel/place/himachal-pradesh/patalsu-peak',
      desc: 'Non-technical summit trek above Solang Valley with 360° panoramas of Kullu and Lahaul ranges and authentic 36-waypoint GPS track.',
      altitude: '4,261 m',
      stats: '12 km round trip · Solang Base',
      image: getAssetPath('/patalsu-thumbnail.jpg'),
    },
    {
      name: 'Rohtang Pass (3,978m)',
      region: 'Pir Panjal Range, Himachal Pradesh',
      url: 'https://discoverhimalayantrails.com/place/himachal-pradesh/rohtang-pass',
      githubPagesUrl: 'https://ashish00968.github.io/travel/place/himachal-pradesh/rohtang-pass',
      desc: 'Historic mountain pass connecting Kullu Valley with the arid Lahaul and Spiti Valleys, with high-altitude terrain inspection.',
      altitude: '3,978 m',
      stats: 'High mountain pass · Pir Panjal',
      image: getAssetPath('/alpine-reflection-ridge.jpg'),
    },
  ],
  architecturePipeline: [
    {
      step: '01',
      title: '01 Field Ingestion & GPX Telemetry',
      phase: 'Field Ingestion & GPX Telemetry',
      description:
        'Recording high-precision waypoint coordinates, elevation deltas, and multi-day trail paths on mountain expeditions using field GPS instruments.',
      telemetry: '36-WAYPOINT GPX // SUB-METER ACCURACY',
    },
    {
      step: '02',
      title: '02 3D DEM Terrain & Shaders',
      phase: '3D DEM Terrain & Shaders',
      description:
        'Raster digital elevation tiles rendered with 1.5× vertical exaggeration, custom slope angle shaders, and dynamic sun-angle hillshading in Mapbox GL JS.',
      telemetry: 'MAPBOX GL JS // 1.5× VERTICAL DEM',
    },
    {
      step: '03',
      title: '03 Reactive Telemetry Store',
      phase: 'Reactive Telemetry Store',
      description:
        'Zustand-powered decoupled spatial store coordinating camera bounding boxes, active elevation crosshairs, and waypoint inspectors at 60 FPS.',
      telemetry: 'ZUSTAND STORE // ZERO-PROP DRILL HUD',
    },
    {
      step: '04',
      title: '04 Edge Media & Low-Bandwidth Delivery',
      phase: 'Edge Media & Low-Bandwidth Delivery',
      description:
        'Cloudinary CDN image transformations, WebP/AVIF auto-format negotiation, and low-quality image placeholders (LQIP) eliminating CLS on remote 3G mountain edges.',
      telemetry: 'CLOUDINARY CDN // LQIP ZERO-CLS',
    },
  ],
  status:
    'Live platform continuously expanding with curated destinations, detailed GPS tracks, and 3D geospatial storytelling.',
};

export const architecturePipeline = dhtCaseStudy.architecturePipeline;

export const elevationTelemetryWaypoints = [
  {
    id: 'WP-01',
    name: 'Solang Valley Base',
    elevation: 2480,
    elevationLabel: '2,480 M',
    distance: '0.0 KM',
    slope: '8°',
    coordinates: '32.3166° N, 77.1575° E',
    zone: 'Deodar & Pine Canopy',
    xPercent: 8,
    yPercent: 78,
  },
  {
    id: 'WP-09',
    name: 'Shagadugh Alpine Meadow',
    elevation: 3140,
    elevationLabel: '3,140 M',
    distance: '2.4 KM',
    slope: '19°',
    coordinates: '32.3241° N, 77.1482° E',
    zone: 'Timberline Clearing',
    xPercent: 30,
    yPercent: 60,
  },
  {
    id: 'WP-18',
    name: 'Patalsu Spur Snowline',
    elevation: 3680,
    elevationLabel: '3,680 M',
    distance: '4.1 KM',
    slope: '27°',
    coordinates: '32.3318° N, 77.1394° E',
    zone: 'Glacial Moraine & Ridge',
    xPercent: 54,
    yPercent: 42,
  },
  {
    id: 'WP-27',
    name: 'High Shoulder Cornice',
    elevation: 4020,
    elevationLabel: '4,020 M',
    distance: '5.2 KM',
    slope: '32°',
    coordinates: '32.3379° N, 77.1331° E',
    zone: 'Exposed Alpine Crest',
    xPercent: 76,
    yPercent: 25,
  },
  {
    id: 'WP-36',
    name: 'Patalsu Peak Summit',
    elevation: 4261,
    elevationLabel: '4,261 M',
    distance: '6.0 KM',
    slope: '35°',
    coordinates: '32.3422° N, 77.1288° E',
    zone: '360° Pir Panjal Divide',
    xPercent: 93,
    yPercent: 14,
  },
];

export const webProjects = [
  {
    id: 'dht',
    title: 'Discover Himalayan Trails',
    tagline: 'Interactive 3D Himalayan Travel Atlas & Platform',
    category: 'Flagship Platform',
    featured: true,
    liveUrl: 'https://discoverhimalayantrails.com',
    caseStudyRoute: '/tech-stack/discover-himalayan-trails',
    githubUrl: 'https://github.com/Ashish00968/travel',
    description:
      'Interactive 3D travel atlas documenting high-altitude Himalayan trails with DEM elevation, GPS waypoints, and curated field notes.',
    tags: ['React 19', 'TypeScript', 'Mapbox GL JS 3D', 'Cloudinary CDN', 'Zustand'],
  },
  {
    id: 'video-portfolio',
    title: 'Cinematic Edits Portfolio',
    tagline: 'Visual Media & Video Showcase Site',
    category: 'Creative Web Portfolio',
    featured: false,
    liveUrl: 'https://editzportfolio.netlify.app',
    caseStudyRoute: null,
    githubUrl: null,
    description:
      'Dedicated showcase for cinematic travel edits, reels, and video production work featuring smooth modal playback and responsive design.',
    tags: ['Web Design', 'Video Integration', 'Responsive UI', 'Netlify'],
  },
];

export const photographyGallery = [
  {
    id: 'pir-panjal-explorer',
    title: 'Glacial Amphitheater Survey',
    location: 'Pir Panjal Range, Himachal Pradesh',
    category: 'Trails & Summits',
    src: getAssetPath('/field-explorer-glacier.jpg'),
    width: 1800,
    height: 1350,
    caption: 'Surveying sheer glacial faces, hanging ice, and mountain weather fronts at the edge of the high amphitheater.',
    telemetry: '3,850 M · PIR PANJAL GLACIER',
    isAshishWork: true,
  },
  {
    id: 'glacial-rock-face',
    title: 'Pir Panjal Hanging Glacier & Rock Chutes',
    location: 'Pir Panjal High Ridges, Himachal Pradesh',
    category: 'Himalayan Landscapes',
    src: getAssetPath('/pir-panjal-glacier-face.jpg'),
    width: 1800,
    height: 1350,
    caption: 'Telephoto study of vertical granite couloirs, avalanche runnels, and active glacial ice melt.',
    telemetry: '4,020 M · ROCK CHUTES & ICE',
    isAshishWork: true,
  },
  {
    id: 'alpine-ridge-rest',
    title: 'Alpine Ridge Reflection (3,978m)',
    location: 'Rohtang Pass Crest, Himachal Pradesh',
    category: 'Trails & Summits',
    src: getAssetPath('/alpine-reflection-ridge.jpg'),
    width: 1800,
    height: 1013,
    caption: 'Rest checkpoint atop the windswept granite crest overlooking the snow-draped Pir Panjal divide.',
    telemetry: '3,978 M · ROHTANG RIDGELINE',
    isAshishWork: true,
  },
  {
    id: 'himalayan-gateway',
    title: 'Gateway to the High Range',
    location: 'Solang & Lahaul Gateway, Himachal Pradesh',
    category: 'Outdoor Environments',
    src: getAssetPath('/ashish-portrait.jpg'),
    width: 1800,
    height: 1350,
    caption: 'Traditional Himalayan welcome gateway marking the transition into alpine territory beneath snow-capped peaks.',
    telemetry: '32.2396° N · ENTRY TO HIGH PASS',
    isAshishWork: true,
  },
  {
    id: 'sethan-sunset',
    title: 'Sethan Mountain Sunset',
    location: 'Sethan, Hampta Valley, Himachal Pradesh',
    category: 'Himalayan Landscapes',
    src: getAssetPath('/sethan-thumbnail.jpg'),
    width: 1200,
    height: 675,
    caption: 'Evening alpenglow over the snow-dusted ridges above Sethan village.',
    telemetry: '2,800 M · ALPENGLOW STUDY',
    isAshishWork: true,
  },
  {
    id: 'patalsu-ridge',
    title: 'Patalsu Peak Ascent Ridge',
    location: 'Solang Valley, Himachal Pradesh',
    category: 'Trails & Summits',
    src: getAssetPath('/patalsu-thumbnail.jpg'),
    width: 1200,
    height: 675,
    caption: 'Looking towards the high snowfields along the ridge ascending Patalsu.',
    telemetry: '4,261 M · SUMMIT RIDGE TRACK',
    isAshishWork: true,
  },
  {
    id: 'manali-valley',
    title: 'Manali Forest & Valley Vistas',
    location: 'Kullu Valley, Himachal Pradesh',
    category: 'Outdoor Environments',
    src: getAssetPath('/manali-transitions-thumbnail.jpg'),
    width: 1200,
    height: 675,
    caption: 'Pine forests and rushing glacial waters in the upper Beas basin.',
    telemetry: '2,050 M · VALLEY FOOTHILLS',
    isAshishWork: true,
  },
  {
    id: 'kalpa-kinnaur',
    title: 'Kalpa & Kinner Kailash Vista',
    location: 'Kinnaur, Himachal Pradesh',
    category: 'Himalayan Landscapes',
    src: getAssetPath('/kalpa-thumbnail.jpg'),
    width: 1200,
    height: 675,
    caption: 'Towering sacred peaks of the Kinnaur range rising over alpine orchards.',
    telemetry: '2,960 M · KINNER KAILASH RANGE',
    isAshishWork: true,
  },
];

export const photoEditComparison = {
  title: 'Raw LOG vs. Graded Mountain Frame',
  description:
    'Balancing dynamic range, high-altitude alpine skies, and tonal depth from flat camera profiles to finished cinematic stills.',
  rawImg: getAssetPath('/before.jpg'),
  gradedImg: getAssetPath('/after.jpg'),
  rawLabel: 'Flat Camera RAW / LOG',
  gradedLabel: 'Graded & Balanced',
};

export const videoShowcase = [
  {
    id: 1,
    title: 'Sethan Sunset',
    category: 'Cinematic Color Grading',
    desc: 'Cinematic pacing, mountain light transitions, and natural alpine tone curves.',
    youtubeId: '7SS_xdbI3Xc',
    imgSrc: getAssetPath('/sethan-thumbnail.jpg'),
  },
  {
    id: 2,
    title: 'Patalsu Peak Hike',
    category: 'Travel Cinematic',
    desc: 'An immersive cinematic sequence capturing the high-altitude ascent of Patalsu Peak near Manali.',
    youtubeId: 'yinFLtDCJ3k',
    imgSrc: getAssetPath('/patalsu-thumbnail.jpg'),
  },
  {
    id: 3,
    title: 'Manali Transitions',
    category: 'Travel Reel',
    desc: 'Rhythmic, seamless transitions highlighting the mountain energy and pine forest roads of Manali.',
    youtubeId: 'Q53KC68VNaM',
    imgSrc: getAssetPath('/manali-transitions-thumbnail.jpg'),
  },
  {
    id: 4,
    title: 'Kalpa Cinematic',
    category: 'Slow Motion B-Roll',
    desc: 'Atmospheric sequence capturing the quiet scale and mountain ridges of Kalpa in Kinnaur.',
    youtubeId: '_FOL-z3aICs',
    imgSrc: getAssetPath('/kalpa-thumbnail.jpg'),
  },
];

export const travelExperience = {
  overview:
    'Meaningful travel platforms require understanding elevation, unpredictable weather, trail junctions, and base-village logistics—not just code. Physical ground truth directly shapes the information architecture of Discover Himalayan Trails.',
  featuredExpedition: {
    title: 'Pir Panjal High Amphitheater Survey',
    subtitle: 'Glacial Reconnaissance & Waypoint Telemetry',
    location: 'Pir Panjal Range · Himachal Pradesh',
    altitude: '3,850 m – 4,020 m',
    image: getAssetPath('/field-explorer-glacier.jpg'),
    caption: 'Ashish Nirankari surveying high-altitude glacial terrain and pass approaches in the Pir Panjal range.',
    telemetry: 'SURVEY CHECKPOINT // PIR PANJAL · 32.37° N, 77.24° E · 3,978M',
    notes: 'Directly observing glacial retreat corridors, meltwater flow patterns, and steep snow couloirs to ensure Discover Himalayan Trails elevation profiles reflect physical conditions on the ground.',
  },
  fieldSummary: [
    {
      region: 'Patalsu Peak & Solang Valley',
      location: 'Himachal Pradesh · Kullu District',
      elevation: '4,261 m',
      image: getAssetPath('/patalsu-thumbnail.jpg'),
      details: 'Summited and recorded a complete 36-waypoint GPS track along the ascent ridge. Captured 360° photographic panoramas of the Beas Kund and Hanuman Tibba peaks.',
      tags: ['GPS Tracked', 'Summit Hike', 'DHT Guide'],
      status: 'Visited & Documented',
    },
    {
      region: 'Rohtang Pass Ridgeline',
      location: 'Himachal Pradesh · Pir Panjal Range',
      elevation: '3,978 m',
      image: getAssetPath('/alpine-reflection-ridge.jpg'),
      details: 'Historic high mountain pass dividing the lush Kullu valley from the arid rain-shadow of Lahaul. Curated terrain notes for the DHT atlas.',
      tags: ['Mountain Pass', 'High Alpine Ridge', 'DHT Guide'],
      status: 'Visited & Documented',
    },
    {
      region: 'Sethan Village & Hampta Foothills',
      location: 'Himachal Pradesh · Pir Panjal Fringe',
      elevation: '2,600 m – 3,200 m',
      image: getAssetPath('/sethan-thumbnail.jpg'),
      details: 'Field photography of alpine alpenglow, boulder-strewn slopes, and transition trails leading up towards Hampta Pass. Color grading case study origin.',
      tags: ['Photography', 'Cinematic Video'],
      status: 'Visited & Documented',
    },
    {
      region: 'Kinnaur & Kinner Kailash Vista',
      location: 'Himachal Pradesh · Sutlej Valley',
      elevation: '2,960 m',
      image: getAssetPath('/kalpa-thumbnail.jpg'),
      details: 'High-altitude research into tribal circuit routes, sacred peak topographies, and dry alpine valley transitions.',
      tags: ['Regional Atlas', 'Landscape Study'],
      status: 'Visited & Documented',
    },
  ],
  industryExperience: {
    company: 'Trekking Hills Travels',
    statusNote:
      'Collaboration and engagement with Trekking Hills Travels. Specific role, project deliverables, and timelines are documented as part of ongoing field and digital initiatives.',
  },
};
