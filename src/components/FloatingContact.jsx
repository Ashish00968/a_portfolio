import React, { useState, useEffect, useRef } from 'react';
import { Mail, MessageCircle, X } from 'lucide-react';
import './FloatingContact.css';

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const widgetRef = useRef(null);

  // Show widget only after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', handleScroll);
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
            <i className="fab fa-instagram" style={{ fontSize: '18px' }} />
            <span>Instagram</span>
          </a>
          <a
            href="https://fiverr.com/YOUR_PROFILE"
            target="_blank"
            rel="noreferrer"
            className="fc-link fc-link-fiverr"
          >
            <i className="fas fa-bolt" style={{ fontSize: '18px' }} />
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
