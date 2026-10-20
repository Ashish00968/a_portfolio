import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';
import {
  ArrowUpRight,
  Compass,
  ArrowRight,
  Cpu,
  Camera,
  MapPin,
} from 'lucide-react';
import HeroPortrait from '../components/home/HeroPortrait';
import SpotlightCard from '../components/ui/SpotlightCard';
import ElevationProfile3D from '../components/ui/ElevationProfile3D';
import { dhtCaseStudy, profile, getAssetPath } from '../data/portfolioData';
import './HomePage.css';

const HomePage = () => {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef(null);

  // 1. Cosmic scroll telemetry progress bar across entire page
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // 2. Hero subtle scroll-driven parallax and gentle fade
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroTextY = useTransform(
    heroProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : 36]
  );
  const heroVisualY = useTransform(
    heroProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : 54]
  );
  const heroOpacity = useTransform(
    heroProgress,
    [0, 0.85],
    [1, shouldReduceMotion ? 1 : 0.3]
  );
  const scrollCueOpacity = useTransform(heroProgress, [0, 0.15], [1, 0]);

  // Entrance variants adhering to Emil Kowalski design guidelines
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] },
    },
  };

  // Section 2: DHT highlights stagger
  const highlightsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.09,
      },
    },
  };

  const highlightItemVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -14 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
    },
  };

  // Section 3: Core Pillars stagger
  const pillarsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  };

  const pillarItemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] },
    },
  };

  return (
    <div className="home-page">
      {/* Pinned Telemetry Scroll Progress Bar */}
      <motion.div
        className="home-scroll-progress-bar"
        style={{ scaleX }}
        aria-hidden="true"
      />

      {/* ------------------------------------------------------------------ */}
      {/* 1. CINEMATIC HERO SECTION                                          */}
      {/* ------------------------------------------------------------------ */}
      <section ref={heroRef} className="home-hero">
        <div className="container hero-grid">
          {/* Left Column: Identity, Telemetry & Thesis with Scroll Parallax */}
          <motion.div
            className="hero-text-block"
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            style={{ y: heroTextY, opacity: heroOpacity }}
          >
            {/* Spaceship Orbital Telemetry Banner */}
            <motion.div variants={heroItemVariants} className="hero-telemetry-banner">
              <span className="telemetry-tag">
                <span className="telemetry-dot" aria-hidden="true"></span>
                {profile.telemetry.systemStatus}
              </span>
              <span className="telemetry-tag">COORD: {profile.telemetry.coordinates}</span>
              <span className="telemetry-tag">ELEV: {profile.telemetry.elevation}</span>
            </motion.div>

            <motion.div variants={heroItemVariants} className="eyebrow">
              IIITDM Jabalpur · Systems & High Altitude Craft
            </motion.div>

            <motion.h1 variants={heroItemVariants} className="hero-display-name">
              Ashish Nirankari
            </motion.h1>

            <motion.div variants={heroItemVariants} className="hero-statement">
              <span className="hero-statement-line">Engineering Systems for the Web.</span>
              <span className="hero-statement-line accent">Mapping the High Mountains.</span>
            </motion.div>

            <motion.p variants={heroItemVariants} className="hero-supporting-copy">
              Computer Science at IIITDM Jabalpur. Architecting modern web platforms, 3D geospatial terrain systems, and high-altitude visual media. Founder of Discover Himalayan Trails.
            </motion.p>

            <motion.div variants={heroItemVariants} className="hero-actions-row">
              <Link
                to="/tech-stack/discover-himalayan-trails"
                className="btn btn-primary"
              >
                <span>DHT Flagship Atlas</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/tech-stack" className="btn btn-secondary">
                <span>Explore Tech Stack</span>
              </Link>
            </motion.div>

            {/* Top Navigation / Explore Destinations — exact order requested */}
            <motion.div variants={heroItemVariants} className="hero-destinations-glance">
              <span className="destinations-label">Explore:</span>
              <div className="destinations-pills">
                <Link to="/tech-stack" className="destination-link">
                  <span className="dest-num">01</span>
                  <span>Tech Stack</span>
                </Link>
                <span className="destination-sep">/</span>
                <Link to="/travel" className="destination-link">
                  <span className="dest-num">02</span>
                  <span>Travel</span>
                </Link>
                <span className="destination-sep">/</span>
                <Link to="/photography-video" className="destination-link">
                  <span className="dest-num">03</span>
                  <span>Photography & Videography</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Ashish's 3D Spatial Portrait Slot */}
          <motion.div
            className="hero-visual-block"
            style={{ y: heroVisualY, opacity: heroOpacity }}
          >
            <HeroPortrait />
          </motion.div>
        </div>

        {/* Subtle Spaceship scroll cue fades on scroll */}
        <motion.div
          className="scroll-cue"
          style={{ opacity: scrollCueOpacity }}
          aria-hidden="true"
        >
          <span className="scroll-cue-text">Scroll to initiate telemetry</span>
          <div className="scroll-cue-bar"></div>
        </motion.div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. FLAGSHIP SPOTLIGHT: DISCOVER HIMALAYAN TRAILS                   */}
      {/* ------------------------------------------------------------------ */}
      <section className="section-dht-feature">
        <div className="container">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <SpotlightCard
              className="dht-feature-card"
              spotlightColor="rgba(56, 189, 248, 0.2)"
              enableTilt={false}
            >
              <div className="dht-feature-header">
                <div className="dht-meta-tag">
                  <Compass size={14} />
                  <span>Flagship Platform & Digital Atlas</span>
                </div>
                <span className="telemetry-tag">
                  <span className="telemetry-dot" aria-hidden="true"></span>
                  ONLINE // MAPBOX 3D TERRAIN
                </span>
              </div>

              <div className="dht-feature-grid">
                <div className="dht-feature-info">
                  <h2 className="dht-feature-title">Discover Himalayan Trails</h2>
                  <p className="dht-feature-summary">
                    An independent digital travel atlas documenting high-altitude Himalayan trails with authentic GPS waypoints, 3D topographic terrain models, and verified field notes.
                  </p>

                  <motion.div
                    className="dht-highlights-list"
                    variants={highlightsContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                  >
                    <motion.div variants={highlightItemVariants} className="dht-highlight-item">
                      <span className="highlight-num">01</span>
                      <div>
                        <strong>3D Elevation & Waypoints</strong>
                        <p>Mapbox GL JS digital elevation models with actual trail GPS data.</p>
                      </div>
                    </motion.div>
                    <motion.div variants={highlightItemVariants} className="dht-highlight-item">
                      <span className="highlight-num">02</span>
                      <div>
                        <strong>Built for Mountain Reality</strong>
                        <p>Lightweight architecture and Cloudinary LQIP for remote connectivity.</p>
                      </div>
                    </motion.div>
                    <motion.div variants={highlightItemVariants} className="dht-highlight-item">
                      <span className="highlight-num">03</span>
                      <div>
                        <strong>Verified Destination Guides</strong>
                        <p>In-depth topographic guides for Patalsu Peak (4,261m) & Rohtang Pass (3,978m).</p>
                      </div>
                    </motion.div>
                  </motion.div>

                  <div className="dht-actions-row">
                    <a
                      href={dhtCaseStudy.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      <span>Launch Live Atlas</span>
                      <ArrowUpRight size={16} />
                    </a>
                    <Link
                      to="/tech-stack/discover-himalayan-trails"
                      className="btn btn-secondary"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>

                <div className="dht-feature-preview">
                  <motion.div
                    className="dht-preview-frame"
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <img
                      src={getAssetPath('/patalsu-thumbnail.jpg')}
                      alt="Patalsu Peak trail vista — Discover Himalayan Trails"
                      className="dht-preview-img"
                      loading="lazy"
                    />
                    <div className="dht-preview-overlay">
                      <div className="dht-preview-caption">
                        <span className="caption-title">Patalsu Peak Summit Ridge</span>
                        <span className="caption-sub">4,261m · Solang Valley · 36 GPS Waypoints</span>
                      </div>
                      <a
                        href={dhtCaseStudy.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="preview-live-badge"
                      >
                        discoverhimalayantrails.com
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Interactive 3D DEM Elevation & GPX Waypoint Inspector */}
              <ElevationProfile3D />
            </SpotlightCard>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. SELECTED WORK PREVIEWS (TECH STACK, TRAVEL, PHOTO & VIDEO)      */}
      {/* ------------------------------------------------------------------ */}
      <section className="section-previews">
        <div className="container">
          <motion.div
            className="section-header"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="eyebrow">Interactive Index</span>
            <h2>Core Pillars of Work</h2>
            <p>
              Navigating between software architecture, high-altitude trail research, and sensory mountain media.
            </p>
          </motion.div>

          <motion.div
            className="previews-grid"
            variants={pillarsContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {/* Preview 1: Tech Stack */}
            <motion.div
              variants={pillarItemVariants}
              whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              className="preview-card-motion"
            >
              <SpotlightCard className="preview-card" spotlightColor="rgba(56, 189, 248, 0.16)">
                <div className="preview-card-header">
                  <div className="preview-icon-wrapper">
                    <Cpu size={20} />
                  </div>
                  <span className="preview-cat">Pillar 01</span>
                </div>
                <h3>Tech Stack</h3>
                <p>
                  React 19, TypeScript, Mapbox 3D DEM integrations, reactive state, and media delivery engines optimized for alpine trailheads.
                </p>
                <div className="preview-meta">
                  <span className="preview-tag">React 19</span>
                  <span className="preview-tag">Mapbox 3D</span>
                  <span className="preview-tag">Zustand</span>
                </div>
                <Link to="/tech-stack" className="preview-link">
                  <span>Inspect Tech Stack</span>
                  <ArrowRight size={15} />
                </Link>
              </SpotlightCard>
            </motion.div>

            {/* Preview 2: Travel */}
            <motion.div
              variants={pillarItemVariants}
              whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              className="preview-card-motion"
            >
              <SpotlightCard className="preview-card" spotlightColor="rgba(212, 138, 82, 0.16)">
                <div className="preview-card-header">
                  <div className="preview-icon-wrapper accent-mountain">
                    <MapPin size={20} />
                  </div>
                  <span className="preview-cat">Pillar 02</span>
                </div>
                <h3>Travel & Field Notes</h3>
                <p>
                  Firsthand trail logistics, high-altitude acclimatization, elevation checkpoints, and honest documentation across Himachal Pradesh.
                </p>
                <div className="preview-meta">
                  <span className="preview-tag">Solang Valley</span>
                  <span className="preview-tag">Sethan / Hampta</span>
                  <span className="preview-tag">Kinnaur</span>
                </div>
                <Link to="/travel" className="preview-link">
                  <span>Read Field Travel</span>
                  <ArrowRight size={15} />
                </Link>
              </SpotlightCard>
            </motion.div>

            {/* Preview 3: Photography & Videography */}
            <motion.div
              variants={pillarItemVariants}
              whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              className="preview-card-motion"
            >
              <SpotlightCard className="preview-card" spotlightColor="rgba(129, 140, 248, 0.16)">
                <div className="preview-card-header">
                  <div className="preview-icon-wrapper accent-video">
                    <Camera size={20} />
                  </div>
                  <span className="preview-cat">Pillar 03</span>
                </div>
                <h3>Photography & Videography</h3>
                <p>
                  RAW LOG alpenglow color science, interactive before/after tone curves, and rhythmic mountain edits synced to natural audio Foley.
                </p>
                <div className="preview-meta">
                  <span className="preview-tag">Himalayan Stills</span>
                  <span className="preview-tag">RAW Grading</span>
                  <span className="preview-tag">Cinematic Reels</span>
                </div>
                <Link to="/photography-video" className="preview-link">
                  <span>View Stills & Edits</span>
                  <ArrowRight size={15} />
                </Link>
              </SpotlightCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. GROUNDED TRAVEL ETHOS                                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="section-ethos">
        <div className="container-narrow">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <SpotlightCard className="ethos-card" spotlightColor="rgba(56, 189, 248, 0.14)">
              <span className="eyebrow">The Mountain Connection</span>
              <blockquote className="ethos-quote">
                "Building for the mountains requires understanding altitude, sudden weather shifts, and trail logistics—not just code. Physical ground truth directly shapes every interface decision."
              </blockquote>
              <div className="ethos-footer">
                <span className="ethos-author">Ashish Nirankari · IIITDM Jabalpur</span>
                <Link to="/travel" className="ethos-link">
                  <span>Read Field Experience & Travel Notes</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
