import React from 'react';
import { ArrowUpRight, ArrowLeft, CheckCircle2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import SpotlightCard from '../components/ui/SpotlightCard';
import ElevationProfile3D from '../components/ui/ElevationProfile3D';
import { dhtCaseStudy } from '../data/portfolioData';
import './DhtCaseStudyPage.css';

const DhtCaseStudyPage = () => {
  return (
    <div className="dht-page">
      <div className="container">
        {/* Breadcrumb / Back Link */}
        <div className="case-study-breadcrumb">
          <Link to="/tech-stack" className="back-link">
            <ArrowLeft size={16} />
            <span>Back to Tech Stack</span>
          </Link>
        </div>

        {/* Hero Banner */}
        <header className="case-study-hero">
          <div className="case-study-hero-text">
            <span className="eyebrow">Flagship Product Case Study</span>
            <h1>Discover Himalayan Trails</h1>
            <p className="case-study-subtitle">
              An independent digital travel atlas and geospatial platform mapping Himalayan trails across North India with real GPS tracks, 3D terrain models, and logistical field notes.
            </p>

            <div className="case-study-cta-group">
              <a
                href={dhtCaseStudy.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <span>Launch Live Atlas</span>
                <ArrowUpRight size={16} />
              </a>
              <a
                href={dhtCaseStudy.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <span>View GitHub Repository</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Meta Bar */}
          <div className="case-study-meta-grid">
            <div className="meta-item">
              <span className="meta-label">Role</span>
              <span className="meta-value">{dhtCaseStudy.myRole}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Project Type</span>
              <span className="meta-value">Independent Founder & Builder</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Status</span>
              <span className="meta-value status-live">Live & In Active Development</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Primary Stack</span>
              <span className="meta-value">React 19 · TypeScript · Mapbox 3D DEM</span>
            </div>
          </div>
        </header>

        {/* Main Case Study Content */}
        <main className="case-study-body">
          {/* Section: Product Vision & Problem */}
          <section className="cs-section">
            <div className="cs-section-header">
              <span className="eyebrow">01 / The Problem</span>
              <h2>Why Build a Himalayan Atlas?</h2>
            </div>
            <div className="cs-two-col">
              <div>
                <p className="cs-paragraph">
                  {dhtCaseStudy.problemStatement}
                </p>
                <p className="cs-paragraph">
                  Commercial itinerary aggregators treat mountain destinations as generic package deals. They obscure essential information: elevation gain profiles, water availability, base village connectivity, seasonal snow closures, and verified trail coordinates.
                </p>
              </div>
              <div className="cs-callout-card">
                <h4>The DHT Thesis</h4>
                <p>
                  "Hikers and travellers exploring high-altitude trails need geospatial honesty: authentic terrain contours, altitude milestones, and unembellished logistical notes."
                </p>
              </div>
            </div>
          </section>

          {/* Section: Technical & Geospatial Architecture */}
          <section className="cs-section">
            <div className="cs-section-header">
              <span className="eyebrow">02 / Technical Architecture</span>
              <h2>Engineering Decisions & Stack</h2>
            </div>

            <div className="cs-features-grid">
              {dhtCaseStudy.keyHighlights.map((highlight, index) => (
                <div key={highlight.title} className="cs-feature-card">
                  <div className="cs-feature-header">
                    <span className="cs-feature-num">0{index + 1}</span>
                    <h3>{highlight.title}</h3>
                  </div>
                  <p>{highlight.desc}</p>
                </div>
              ))}
            </div>

            <div className="cs-stack-breakdown">
              <h3>Verified Tech Stack</h3>
              <div className="cs-tech-tags">
                {dhtCaseStudy.techStack.map((tech) => (
                  <span key={tech} className="tech-pill">{tech}</span>
                ))}
              </div>
            </div>

            {/* Topographic Ground Truth Visual Reference */}
            <div className="cs-terrain-visual-card">
              <div className="cs-terrain-img-frame">
                <img
                  src="/pir-panjal-glacier-face.jpg"
                  alt="Pir Panjal Hanging Glacier and Topographic Rock Formations"
                  className="cs-terrain-img"
                  loading="lazy"
                />
                <div className="cs-terrain-overlay">
                  <span className="telemetry-tag">
                    <span className="telemetry-dot" aria-hidden="true"></span>
                    TOPOGRAPHIC GROUND TRUTH // 4,020M ROCK AMPHITHEATER
                  </span>
                  <span className="telemetry-tag">1.5× DEM ELEVATION CALIBRATION</span>
                </div>
              </div>
              <div className="cs-terrain-caption">
                <p>
                  High-resolution field reconnaissance of glacial chutes and metamorphic contours in the Pir Panjal range — physical reference data used to calibrate 3D DEM terrain shaders and elevation contour profiles in Discover Himalayan Trails.
                </p>
              </div>
            </div>
          </section>

          {/* Section: System & Telemetry Pipeline */}
          <section className="cs-section">
            <div className="cs-section-header">
              <div className="telemetry-hud-strip">
                <span className="telemetry-tag">
                  <span className="telemetry-dot" aria-hidden="true"></span>
                  SPATIAL RUNTIME PIPELINE
                </span>
                <span className="telemetry-tag">4-STAGE GEOSPATIAL ENGINE</span>
              </div>
              <span className="eyebrow">03 / System & Telemetry Pipeline</span>
              <h2>End-to-End Geospatial Architecture</h2>
              <p>
                How field measurements collected in the Pir Panjal range transform into hardware-accelerated 3D terrain exploration in the browser:
              </p>
            </div>

            <div className="cs-pipeline-grid">
              {dhtCaseStudy.architecturePipeline.map((item) => (
                <SpotlightCard
                  key={item.step}
                  className="cs-pipeline-card"
                  spotlightColor="rgba(56, 189, 248, 0.12)"
                  borderColor="rgba(56, 189, 248, 0.35)"
                >
                  <div className="cs-pipeline-header">
                    <span className="cs-pipeline-step-badge">{item.step}</span>
                    <span className="telemetry-tag cs-pipeline-telemetry">{item.telemetry}</span>
                  </div>
                  <h3 className="cs-pipeline-title">{item.phase}</h3>
                  <p className="cs-pipeline-desc">{item.description}</p>
                </SpotlightCard>
              ))}
            </div>

            {/* Interactive 3D DEM Elevation & GPX Waypoint Inspector */}
            <ElevationProfile3D />
          </section>

          {/* Section: Live Destination Pages */}
          <section className="cs-section">
            <div className="cs-section-header">
              <span className="eyebrow">04 / Content & Destination Structure</span>
              <h2>Topographic Destination Profiles</h2>
              <p>
                Real trail profiles implemented in Discover Himalayan Trails with actual GPS waypoints and regional context:
              </p>
            </div>

            <div className="cs-destinations-grid">
              {dhtCaseStudy.destinationPages.map((dest) => (
                <div key={dest.name} className="cs-dest-card">
                  {dest.image && (
                    <div className="cs-dest-img-frame">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="cs-dest-img"
                        loading="lazy"
                      />
                      <div className="cs-dest-img-overlay">
                        <span className="cs-dest-altitude">{dest.altitude}</span>
                        <span className="cs-dest-region">{dest.region}</span>
                      </div>
                    </div>
                  )}
                  <div className="cs-dest-body">
                    {!dest.image && (
                      <div className="cs-dest-header">
                        <span className="cs-dest-altitude">{dest.altitude}</span>
                        <span className="cs-dest-region">{dest.region}</span>
                      </div>
                    )}
                    <h3>{dest.name}</h3>
                    <p className="cs-dest-desc">{dest.desc}</p>
                    <span className="cs-dest-stats">{dest.stats}</span>

                    <div className="cs-dest-links">
                      <a
                        href={dest.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn-sm"
                      >
                        <span>Open on DHT Live</span>
                        <ArrowUpRight size={14} />
                      </a>
                      {dest.githubPagesUrl && (
                        <a
                          href={dest.githubPagesUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-ghost btn-sm"
                        >
                          <span>GitHub Pages Mirror</span>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Current Status & Roadmap */}
          <section className="cs-section">
            <div className="cs-section-header">
              <span className="eyebrow">05 / Development Status</span>
              <h2>Current State & Next Steps</h2>
            </div>
            <div className="cs-status-card">
              <p className="cs-paragraph">
                Discover Himalayan Trails is an ongoing, independent initiative founded by Ashish Nirankari. It is built as a portfolio flagship to demonstrate real-world web engineering, geospatial visualization, and domain-informed software design.
              </p>
              <div className="cs-status-list">
                <div className="status-item">
                  <CheckCircle2 size={18} className="status-icon" />
                  <span>3D Digital Elevation Model (DEM) map canvas with Mapbox GL JS</span>
                </div>
                <div className="status-item">
                  <CheckCircle2 size={18} className="status-icon" />
                  <span>Verified trail GPS routes for Patalsu Peak and Rohtang Pass</span>
                </div>
                <div className="status-item">
                  <CheckCircle2 size={18} className="status-icon" />
                  <span>Low-bandwidth optimized Cloudinary image pipeline</span>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default DhtCaseStudyPage;
