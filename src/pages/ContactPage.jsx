import React, { useState } from 'react';
import { Mail, ArrowUpRight, Copy, Check, Compass } from 'lucide-react';
import SpotlightCard from '../components/ui/SpotlightCard';
import { profile } from '../data/portfolioData';
import './ContactPage.css';

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="5"/>
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
  </svg>
);

const ContactPage = () => {
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.social.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDirectEmail = (e) => {
    e.preventDefault();
    const encodedSubject = encodeURIComponent(subject || 'Inquiry / Collaboration');
    const encodedBody = encodeURIComponent(message || '');
    window.location.href = `mailto:${profile.social.email}?subject=${encodedSubject}&body=${encodedBody}`;
  };

  return (
    <div className="contact-page">
      <div className="container">
        {/* Header */}
        <header className="page-header">
          <div className="telemetry-hud-strip">
            <span className="telemetry-tag">
              <span className="telemetry-dot" aria-hidden="true"></span>
              COMMUNICATIONS TELEMETRY // ACTIVE
            </span>
            <span className="telemetry-tag">BASE: IIITDM JABALPUR</span>
          </div>

          <span className="eyebrow">Get in Touch</span>
          <h1 className="page-title">Contact & Collaboration</h1>
          <p className="page-lead">
            Available for tech stack engineering, geospatial/3D mapping interfaces, and mountain travel or visual content initiatives.
          </p>
        </header>

        <div className="contact-grid">
          {/* Left Column: Direct channels */}
          <div className="contact-channels">
            <SpotlightCard className="channel-card highlight" spotlightColor="rgba(56, 189, 248, 0.2)">
              <span className="channel-label">Direct Communication Channel</span>
              <div className="channel-email-row">
                <a href={`mailto:${profile.social.email}`} className="email-address">
                  {profile.social.email}
                </a>
                <button
                  type="button"
                  className="copy-btn"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="channel-hint">
                Best way to get in touch. Answered directly by Ashish.
              </p>
            </SpotlightCard>

            {/* Social & Web Profiles */}
            <SpotlightCard className="channel-card">
              <span className="channel-label">Verified Profiles</span>
              <ul className="verified-links-list">
                <li>
                  <a
                    href={profile.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="verified-link-item"
                  >
                    <div className="vlink-icon"><InstagramIcon size={18} /></div>
                    <div className="vlink-text">
                      <span className="vlink-title">Instagram</span>
                      <span className="vlink-sub">{profile.social.instagramHandle}</span>
                    </div>
                    <ArrowUpRight size={16} className="vlink-arrow" />
                  </a>
                </li>
                <li>
                  <a
                    href={profile.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="verified-link-item"
                  >
                    <div className="vlink-icon"><GithubIcon size={18} /></div>
                    <div className="vlink-text">
                      <span className="vlink-title">GitHub</span>
                      <span className="vlink-sub">Ashish00968</span>
                    </div>
                    <ArrowUpRight size={16} className="vlink-arrow" />
                  </a>
                </li>
                <li>
                  <a
                    href={profile.social.dhtUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="verified-link-item"
                  >
                    <div className="vlink-icon"><Compass size={18} /></div>
                    <div className="vlink-text">
                      <span className="vlink-title">Discover Himalayan Trails</span>
                      <span className="vlink-sub">discoverhimalayantrails.com</span>
                    </div>
                    <ArrowUpRight size={16} className="vlink-arrow" />
                  </a>
                </li>
              </ul>
            </SpotlightCard>
          </div>

          {/* Right Column: Direct Mail Composer */}
          <div className="contact-composer">
            <SpotlightCard className="composer-card" spotlightColor="rgba(56, 189, 248, 0.16)">
              <span className="channel-label">Compose Message</span>
              <h3>Send an Email</h3>
              <p className="composer-intro">
                Prefill your message below to open directly in your mail application:
              </p>

              <form onSubmit={handleDirectEmail} className="composer-form">
                <div className="form-group">
                  <label htmlFor="contact-subject">Subject</label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="e.g. Tech stack project / Mountain travel atlas discussion"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Briefly describe your project, timeline, or idea..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="form-textarea"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary composer-submit-btn">
                  <Mail size={16} />
                  <span>Open in Mail Client</span>
                </button>
              </form>

              <div className="composer-note">
                <p>
                  No simulated submission form. This directly triggers your mail app with Ashish's verified address prefilled.
                </p>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
