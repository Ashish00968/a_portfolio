import React from 'react';
import { GraduationCap, Compass, Cpu, Camera, Video, MapPin } from 'lucide-react';
import SpotlightCard from '../components/ui/SpotlightCard';
import { profile, getAssetPath } from '../data/portfolioData';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="container">
        {/* Header */}
        <header className="page-header">
          <div className="telemetry-hud-strip">
            <span className="telemetry-tag">
              <span className="telemetry-dot" aria-hidden="true"></span>
              IIITDM JABALPUR // CS FOUNDATION
            </span>
            <span className="telemetry-tag">BASE: HIMALAYAN TRAIL RESEARCH</span>
          </div>

          <span className="eyebrow">Background & Perspective</span>
          <h1 className="page-title">About Ashish</h1>
          <p className="page-lead">
            Computer science student at IIITDM Jabalpur, creator of Discover Himalayan Trails, and adventure-travel enthusiast exploring North India.
          </p>
        </header>

        {/* Narrative & Pillars Grid */}
        <section className="about-narrative-section">
          <div className="about-grid">
            {/* Left: Prose Story */}
            <div className="about-prose">
              <p className="about-paragraph lead">
                I operate at the intersection of modern web engineering and high-altitude mountain travel.
              </p>
              <p className="about-paragraph">
                Most travel platforms today are built in remote offices with little understanding of what it feels like when low battery, zero signal, and freezing winds hit an unmarked trail junction. I founded <strong>Discover Himalayan Trails (DHT)</strong> to build something grounded in physical reality: an independent travel atlas featuring verified GPS coordinates, 3D topographic models, and unvarnished logistical field notes.
              </p>
              <p className="about-paragraph">
                Currently pursuing a <strong>B.Tech in Computer Science at IIITDM Jabalpur</strong>, my technical interests focus on modern frontend architecture (React 19, TypeScript), geospatial data visualization (Mapbox GL JS 3D terrain), and high-performance media delivery.
              </p>
              <p className="about-paragraph">
                Complementing my engineering work, I shoot landscape photography and edit cinematic mountain video. Having visual capabilities ensures that digital products are not only technically sound, but visually compelling and respectful of the landscapes they represent.
              </p>
            </div>

            {/* Right: Key Facts Card */}
            <div className="about-facts-sidebar">
              <SpotlightCard className="fact-card">
                <div className="fact-header">
                  <GraduationCap size={20} className="fact-icon" />
                  <h4>Academic Foundation</h4>
                </div>
                <p className="fact-title">{profile.education.degree}</p>
                <p className="fact-sub">{profile.education.institution}</p>
                <p className="fact-desc">
                  Rigorous computer science curriculum: data structures, software engineering, algorithms, and system design.
                </p>
              </SpotlightCard>

              <SpotlightCard className="fact-card">
                <div className="fact-header">
                  <Compass size={20} className="fact-icon" />
                  <h4>Primary Digital Work</h4>
                </div>
                <p className="fact-title">Discover Himalayan Trails</p>
                <p className="fact-sub">Independent Founder & Builder</p>
                <p className="fact-desc">
                  Interactive 3D digital atlas mapping North India trails with real GPS coordinates and elevation contours.
                </p>
              </SpotlightCard>

              <SpotlightCard className="fact-card">
                <div className="fact-header">
                  <MapPin size={20} className="fact-icon" />
                  <h4>Field Experience</h4>
                </div>
                <p className="fact-title">Himachal Pradesh & North India</p>
                <p className="fact-sub">Solang, Sethan, Rohtang, Kinnaur</p>
                <p className="fact-desc">
                  Field treks, summit ascents (Patalsu Peak 4,261m), waypoint recording, and collaboration with Trekking Hills Travels.
                </p>
              </SpotlightCard>
            </div>
          </div>
        </section>

        {/* Authentic Field Ground Truth Visual Interlude */}
        <section className="about-visual-section">
          <SpotlightCard className="about-visual-card" spotlightColor="rgba(56, 189, 248, 0.2)">
            <div className="about-visual-media-frame">
              <img
                src={getAssetPath('/alpine-reflection-ridge.jpg')}
                alt="Ashish Nirankari at 3,978m along the high alpine ridgeline"
                className="about-visual-img"
                loading="lazy"
              />
              <div className="about-visual-gradient"></div>
              <div className="about-visual-telemetry">
                <span className="telemetry-tag">
                  <span className="telemetry-dot" aria-hidden="true"></span>
                  FIELD TELEMETRY // 32.37° N, 77.24° E · 3,978M
                </span>
                <span className="telemetry-tag">PIR PANJAL DIVIDE</span>
              </div>
            </div>
            <div className="about-visual-footer">
              <span className="about-visual-caption">
                Ashish Nirankari at 3,978m along the high pass ridgeline — field-testing terrain models, elevation contours, and offline resilience for Discover Himalayan Trails.
              </span>
            </div>
          </SpotlightCard>
        </section>

        {/* Competencies Breakdown */}
        <section className="about-competencies-section">
          <div className="section-header">
            <span className="eyebrow">Disciplines</span>
            <h2>Areas of Practice</h2>
          </div>

          <div className="competencies-grid">
            <SpotlightCard className="competency-card">
              <div className="comp-icon"><Cpu size={20} /></div>
              <h3>Tech Stack & Systems Architecture</h3>
              <p>
                React 19, TypeScript, Vite, Mapbox GL JS 3D DEM, responsive layout systems, and zero-layout-shift image optimization.
              </p>
            </SpotlightCard>

            <SpotlightCard className="competency-card">
              <div className="comp-icon"><Compass size={20} /></div>
              <h3>Himalayan Route & Trail Research</h3>
              <p>
                GPS waypoint tracking, contour evaluation, mountain pass seasonality, base village logistics, and route documentation.
              </p>
            </SpotlightCard>

            <SpotlightCard className="competency-card">
              <div className="comp-icon"><Camera size={20} /></div>
              <h3>Photography & Color Science</h3>
              <p>
                Outdoor landscape photography, camera LOG dynamic range balancing, RAW color grading, and alpine tone reproduction.
              </p>
            </SpotlightCard>

            <SpotlightCard className="competency-card">
              <div className="comp-icon"><Video size={20} /></div>
              <h3>Cinematic Video Editing</h3>
              <p>
                Travel sequence pacing, beat synchronization, color timing, ambient sound foley, and short-form mountain reels.
              </p>
            </SpotlightCard>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
