import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowUpRight, Compass } from 'lucide-react';
import { profile } from '../../data/portfolioData';
import './Footer.css';

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="5"/>
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Pre-footer subtle invite */}
        <div className="footer-invite">
          <div className="footer-invite-text">
            <span className="eyebrow">Collaboration</span>
            <h3>Building for the web. Drawn to the mountains.</h3>
            <p>
              Available for web engineering projects, 3D geospatial platforms, and visual media engagements.
            </p>
          </div>
          <div className="footer-invite-action">
            <Link to="/contact" className="btn btn-primary">
              Get in Touch
            </Link>
          </div>
        </div>

        <div className="hairline-divider"></div>

        {/* Footer main grid */}
        <div className="footer-grid">
          {/* Identity column */}
          <div className="footer-col brand-col">
            <span className="footer-brand-title">Ashish Nirankari</span>
            <p className="footer-brand-desc">
              B.Tech in Computer Science at IIITDM Jabalpur. Founder of Discover Himalayan Trails. Creating digital products grounded in mountain reality.
            </p>
            <div className="footer-social-links">
              <a
                href={`mailto:${profile.social.email}`}
                aria-label="Email Ashish"
                className="social-circle"
              >
                <Mail size={16} />
              </a>
              <a
                href={profile.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="social-circle"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="social-circle"
              >
                <GithubIcon size={16} />
              </a>
              <a
                href={profile.social.dhtUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discover Himalayan Trails"
                className="social-circle"
              >
                <Compass size={16} />
              </a>
            </div>
          </div>

          {/* Navigation links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Portfolio</h4>
            <ul className="footer-links">
              <li><Link to="/tech-stack">Tech Stack</Link></li>
              <li><Link to="/tech-stack/discover-himalayan-trails">DHT Flagship Case Study</Link></li>
              <li><Link to="/travel">Travel & Field Context</Link></li>
              <li><Link to="/photography-video">Photography & Videography</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </div>

          {/* External platforms */}
          <div className="footer-col">
            <h4 className="footer-col-title">Live Works</h4>
            <ul className="footer-links">
              <li>
                <a href={profile.social.dhtUrl} target="_blank" rel="noopener noreferrer" className="external-link">
                  <span>discoverhimalayantrails.com</span>
                  <ArrowUpRight size={14} />
                </a>
              </li>
              <li>
                <a href={profile.social.videoPortfolioUrl} target="_blank" rel="noopener noreferrer" className="external-link">
                  <span>editzportfolio.netlify.app</span>
                  <ArrowUpRight size={14} />
                </a>
              </li>
              <li>
                <a href="https://ashish00968.github.io/travel/place/himachal-pradesh/patalsu-peak" target="_blank" rel="noopener noreferrer" className="external-link">
                  <span>Patalsu Peak Guide (DHT)</span>
                  <ArrowUpRight size={14} />
                </a>
              </li>
              <li>
                <a href="https://ashish00968.github.io/travel/place/himachal-pradesh/rohtang-pass" target="_blank" rel="noopener noreferrer" className="external-link">
                  <span>Rohtang Pass Guide (DHT)</span>
                  <ArrowUpRight size={14} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="copyright-text">
            &copy; {currentYear} Ashish Nirankari. All content authentic and field-verified.
          </p>
          <p className="location-text">
            IIITDM Jabalpur · Himachal Pradesh & North India Trails
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
