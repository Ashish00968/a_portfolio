import React from 'react';
import { Compass, Briefcase, MapPin } from 'lucide-react';
import SpotlightCard from '../components/ui/SpotlightCard';
import Scroll3DReveal from '../components/ui/Scroll3DReveal';
import { travelExperience } from '../data/portfolioData';
import './TravelPage.css';

const TravelPage = () => {
  return (
    <div className="travel-page">
      <div className="container">
        {/* Header */}
        <header className="page-header">
          <div className="telemetry-hud-strip">
            <span className="telemetry-tag">
              <span className="telemetry-dot" aria-hidden="true"></span>
              GROUND TELEMETRY // HIMACHAL PRADESH
            </span>
            <span className="telemetry-tag">VERIFIED GPS TRACKS</span>
          </div>

          <span className="eyebrow">Topography & Field Notes</span>
          <h1 className="page-title">Travel & Mountain Experience</h1>
          <p className="page-lead">
            Documenting North India and Himalayan trails. Ground-level terrain knowledge that directly informs the information architecture of Discover Himalayan Trails.
          </p>
        </header>

        {/* Philosophy Callout */}
        <section className="travel-ethos-section">
          <Scroll3DReveal pitch={6} depth={-28}>
            <SpotlightCard className="travel-ethos-banner" spotlightColor="rgba(212, 138, 82, 0.18)">
              <div className="travel-ethos-icon">
                <Compass size={28} />
              </div>
              <div className="travel-ethos-content">
                <h3>Physical Topography Informs Digital Systems</h3>
                <p>{travelExperience.overview}</p>
              </div>
            </SpotlightCard>
          </Scroll3DReveal>
        </section>

        {/* Featured Expedition Spotlight Banner */}
        {travelExperience.featuredExpedition && (
          <section className="featured-expedition-section">
            <Scroll3DReveal pitch={6.5} depth={-36}>
              <SpotlightCard className="expedition-spotlight-card" spotlightColor="rgba(56, 189, 248, 0.22)">
              <div className="expedition-grid">
                <div className="expedition-media-frame">
                  <img
                    src={travelExperience.featuredExpedition.image}
                    alt={travelExperience.featuredExpedition.title}
                    className="expedition-img"
                    loading="lazy"
                  />
                  <div className="expedition-overlay-gradient"></div>
                  <div className="expedition-badge-strip">
                    <span className="telemetry-tag expedition-tag">
                      <span className="telemetry-dot" aria-hidden="true"></span>
                      {travelExperience.featuredExpedition.telemetry}
                    </span>
                  </div>
                </div>

                <div className="expedition-content">
                  <div className="expedition-header-meta">
                    <span className="eyebrow">{travelExperience.featuredExpedition.subtitle}</span>
                    <span className="expedition-alt-pill">{travelExperience.featuredExpedition.altitude}</span>
                  </div>
                  <h2 className="expedition-title">{travelExperience.featuredExpedition.title}</h2>
                  <span className="expedition-location">
                    <MapPin size={13} /> {travelExperience.featuredExpedition.location}
                  </span>
                  <p className="expedition-notes">
                    {travelExperience.featuredExpedition.notes}
                  </p>
                  <div className="expedition-caption-box">
                    <span className="caption-text">{travelExperience.featuredExpedition.caption}</span>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </Scroll3DReveal>
        </section>
      )}

        {/* Real Regions & Visited Trails */}
        <section className="travel-regions-section">
          <div className="section-header">
            <span className="eyebrow">Field Grounding</span>
            <h2>Documented Regions & Mountain Trails</h2>
            <p>
              Distinguishing directly visited terrain with authentic GPS waypoints from researched atlas routes:
            </p>
          </div>

          <div className="travel-regions-grid">
            {travelExperience.fieldSummary.map((item, index) => (
              <Scroll3DReveal
                key={item.region}
                pitch={index % 2 === 0 ? 6 : 4.5}
                depth={index % 2 === 0 ? -30 : -22}
              >
                <SpotlightCard
                  className="region-card"
                  spotlightColor={index % 2 === 0 ? "rgba(56, 189, 248, 0.16)" : "rgba(212, 138, 82, 0.16)"}
                >
                  {item.image && (
                    <div className="region-img-frame">
                      <img
                        src={item.image}
                        alt={item.region}
                        className="region-img"
                        loading="lazy"
                      />
                      <div className="region-img-overlay">
                        <span className="region-status-badge status-visited">{item.status}</span>
                        <span className="region-elevation">{item.elevation}</span>
                      </div>
                    </div>
                  )}
                  <div className="region-card-body">
                    <div className="region-card-header">
                      <h3>{item.region}</h3>
                    </div>
                    <span className="region-location">{item.location}</span>
                    <p>{item.details}</p>
                    <div className="region-tags">
                      {item.tags?.map((tag) => (
                        <span key={tag} className="editorial-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </Scroll3DReveal>
            ))}
          </div>
        </section>

        {/* Industry Collaboration */}
        <section className="industry-collab-section">
          <Scroll3DReveal pitch={5.5} depth={-24}>
            <SpotlightCard className="industry-card">
              <div className="industry-header">
                <div className="industry-icon">
                  <Briefcase size={22} />
                </div>
                <div>
                  <h3>{travelExperience.industryExperience.company}</h3>
                  <span className="industry-sub">Industry Engagement & Field Collaboration</span>
                </div>
              </div>
              <p className="industry-text">
                {travelExperience.industryExperience.statusNote}
              </p>
            </SpotlightCard>
          </Scroll3DReveal>
        </section>

        {/* Truthfulness note */}
        <section className="travel-truth-note">
          <p>
            <em>Ethical disclosure:</em> Every destination page on Discover Himalayan Trails clearly distinguishes field-recorded GPS tracks from researched geospatial boundaries. We never claim completed summits without actual on-the-ground verification.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TravelPage;
