import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Compass, ExternalLink, Cpu, Mountain, Gauge, Film, Sparkles, CheckCircle2 } from 'lucide-react';
import SpotlightCard from '../components/ui/SpotlightCard';
import { dhtCaseStudy, webProjects, techStackData, profile, getAssetPath } from '../data/portfolioData';
import './TechStackPage.css';

const categoryIcons = {
  'Core Engineering & Frontend': Cpu,
  '3D Geospatial & Terrain Systems': Mountain,
  'Media Engine & Network Resilience': Gauge,
  'Creative Post-Production & Foley': Film,
};

const TechStackPage = () => {
  const [activeSkill, setActiveSkill] = useState(null);

  return (
    <div className="tech-stack-page">
      <div className="container">
        {/* Page Header */}
        <header className="page-header">
          <div className="telemetry-hud-strip">
            <span className="telemetry-tag">
              <span className="telemetry-dot" aria-hidden="true"></span>
              {profile.telemetry.systemStatus}
            </span>
            <span className="telemetry-tag">BASE: {profile.telemetry.baseStation}</span>
            <span className="telemetry-tag">COORD: {profile.telemetry.coordinates}</span>
          </div>

          <span className="eyebrow">Systems Architecture</span>
          <h1 className="page-title">Tech Stack & Engineering</h1>
          <p className="page-lead">
            High-performance web architectures, 3D geospatial terrain systems, and media engines engineered to thrive on high-altitude low-bandwidth networks.
          </p>
        </header>

        {/* ------------------------------------------------------------------ */}
        {/* 1. INTERACTIVE TECH STACK MATRIX (SPACESHIP SPOTLIGHT CARDS)      */}
        {/* ------------------------------------------------------------------ */}
        <section className="tech-matrix-section">
          <div className="section-header">
            <span className="eyebrow">Stack Architecture</span>
            <h2>Core Competencies & Toolchain</h2>
            <p>
              Hover over any tool to inspect real-world implementation purpose and production role.
            </p>
          </div>

          <div className="tech-categories-grid">
            {techStackData.map((category) => {
              const IconComponent = categoryIcons[category.category] || Cpu;
              return (
                <SpotlightCard key={category.category} className="tech-category-card">
                  <div className="tech-category-header">
                    <div className="tech-icon-box">
                      <IconComponent size={20} />
                    </div>
                    <div>
                      <h3 className="tech-category-title">{category.category}</h3>
                      <p className="tech-category-desc">{category.description}</p>
                    </div>
                  </div>

                  <div className="skills-pill-cloud">
                    {category.skills.map((skill) => (
                      <button
                        key={skill.name}
                        type="button"
                        className={`skill-chip ${activeSkill?.name === skill.name ? 'is-active' : ''}`}
                        onClick={() => setActiveSkill(skill)}
                        onMouseEnter={() => setActiveSkill(skill)}
                      >
                        <span className="skill-chip-name">{skill.name}</span>
                        <span className="skill-chip-level">{skill.level}</span>
                      </button>
                    ))}
                  </div>
                </SpotlightCard>
              );
            })}
          </div>

          {/* Active Skill Telemetry Readout */}
          <div className="skill-telemetry-readout">
            <div className="telemetry-readout-header">
              <Sparkles size={16} className="readout-sparkle" />
              <span className="readout-label">SYSTEM TELEMETRY // SKILL INSPECTOR:</span>
              <strong className="readout-name">
                {activeSkill ? activeSkill.name : 'Select or hover over any technology above'}
              </strong>
            </div>
            <p className="readout-purpose">
              {activeSkill ? activeSkill.purpose : 'Every library in the stack is chosen with zero bloat in mind, optimizing for bundle weight, real-time 3D canvas efficiency, and rugged offline resilience.'}
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 2. FLAGSHIP ARCHITECTURE: DISCOVER HIMALAYAN TRAILS                */}
        {/* ------------------------------------------------------------------ */}
        <section className="flagship-stack-section">
          <SpotlightCard className="flagship-stack-card" spotlightColor="rgba(56, 189, 248, 0.18)">
            <div className="flagship-badge-row">
              <span className="telemetry-tag">
                <Compass size={14} /> Flagship Architectural Implementation
              </span>
              <span className="telemetry-tag">Status: 100% Live</span>
            </div>

            <div className="flagship-content-grid">
              <div className="flagship-details">
                <h2 className="flagship-title">Discover Himalayan Trails</h2>
                <div className="flagship-meta-row">
                  <span className="flagship-role">Role: Founder, Lead Designer & Frontend Engineer</span>
                  <span className="flagship-institution">IIITDM Jabalpur CS Foundation</span>
                </div>

                <p className="flagship-description">
                  {dhtCaseStudy.overview}
                </p>

                <div className="flagship-architectural-highlights">
                  <div className="arch-item">
                    <CheckCircle2 size={16} className="arch-icon" />
                    <div>
                      <strong>3D Terrain Topography:</strong> Mapbox GL JS with 1.5× digital elevation model (DEM) vertical exaggeration for authentic mountain relief.
                    </div>
                  </div>
                  <div className="arch-item">
                    <CheckCircle2 size={16} className="arch-icon" />
                    <div>
                      <strong>GPS Waypoint Telemetry:</strong> Accurate multi-node trail elevation profiles (e.g. 36 waypoints across Solang to Patalsu Peak at 4,261m).
                    </div>
                  </div>
                  <div className="arch-item">
                    <CheckCircle2 size={16} className="arch-icon" />
                    <div>
                      <strong>Low-Bandwidth Resilience:</strong> Cloudinary automated AVIF/WebP generation with progressive LQIP blur-up placeholders.
                    </div>
                  </div>
                </div>

                <div className="flagship-actions">
                  <a
                    href={dhtCaseStudy.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <span>Launch Live Platform</span>
                    <ArrowUpRight size={16} />
                  </a>
                  <Link
                    to="/tech-stack/discover-himalayan-trails"
                    className="btn btn-secondary"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight size={16} />
                  </Link>
                  <a
                    href={dhtCaseStudy.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost"
                  >
                    <span>GitHub Code</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              <div className="flagship-visual">
                <div className="flagship-img-frame">
                  <img
                    src={getAssetPath('/patalsu-thumbnail.jpg')}
                    alt="Discover Himalayan Trails — Patalsu Peak Guide"
                    className="flagship-img"
                    loading="lazy"
                  />
                  <div className="flagship-img-caption">
                    <span className="caption-tag">TOPOGRAPHY TELEMETRY</span>
                    <span className="caption-sub">Patalsu Peak (4,261m) · Solang Valley Ridge</span>
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 3. SELECTED PROJECTS & PORTFOLIO DEPLOYMENTS                      */}
        {/* ------------------------------------------------------------------ */}
        <section className="other-projects-section">
          <div className="section-header">
            <span className="eyebrow">Production Deployments</span>
            <h2>Connected Applications</h2>
            <p>
              Dedicated web applications engineered and maintained in production.
            </p>
          </div>

          <div className="projects-grid">
            {webProjects.map((project) => (
              <SpotlightCard key={project.id} className="project-spotlight-card">
                <div className="project-card-header">
                  <span className="telemetry-tag">{project.category}</span>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-live-btn"
                      aria-label={`Open ${project.title}`}
                    >
                      <span>Live Site</span>
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-tagline">{project.tagline}</p>
                <p className="project-desc">{project.description}</p>

                <div className="project-tags">
                  {project.tags.map((t) => (
                    <span key={t} className="editorial-tag">{t}</span>
                  ))}
                </div>

                <div className="project-card-footer">
                  {project.caseStudyRoute && (
                    <Link to={project.caseStudyRoute} className="project-link-action">
                      <span>Explore Case Study</span>
                      <ArrowRight size={14} />
                    </Link>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-github-link"
                    >
                      <ExternalLink size={14} />
                      <span>Source Repository</span>
                    </a>
                  )}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TechStackPage;
