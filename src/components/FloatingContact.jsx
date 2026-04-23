import React, { useState, useEffect, useRef } from 'react';
import { Mail, MessageCircle, X, Zap } from 'lucide-react';
import './FloatingContact.css';

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="5"/>
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
  </svg>
);

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const widgetRef = useRef(null);

  // Show widget only after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div
      ref={widgetRef}
      className={`floating-contact ${isVisible ? 'visible' : ''} ${isOpen ? 'open' : ''}`}
    >
      {/* Expanded Card */}
      <div className="fc-card">
        <div className="fc-card-header">
          <span className="fc-title">Let's Work Together</span>
          <button className="fc-close" onClick={() => setIsOpen(false)}>
            <X size={16} />
          </button>
        </div>
        <div className="fc-links">
          <a href="mailto:ashishnirankari0001@gmail.com" className="fc-link fc-link-email">
            <Mail size={18} />
            <span>Email Me</span>
          </a>
          <a
            href="https://instagram.com/ashish_0968"
            target="_blank"
            rel="noreferrer"
            className="fc-link fc-link-instagram"
          >
            <InstagramIcon size={18} />
            <span>Instagram</span>
          </a>
          <a
            href="https://www.fiverr.com/s/38rRj"
            target="_blank"
            rel="noreferrer"
            className="fc-link fc-link-fiverr"
          >
            <Zap size={18} />
            <span>Fiverr</span>
          </a>
        </div>
      </div>

      {/* Floating Button */}
      <button
        className="fc-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Quick Contact"
      >
        <MessageCircle size={24} className={`fc-icon ${isOpen ? 'hidden' : ''}`} />
        <X size={24} className={`fc-icon ${!isOpen ? 'hidden' : ''}`} />
        <span className="fc-tooltip">Let's Work Together</span>
      </button>
    </div>
  );
};

export default FloatingContact;
