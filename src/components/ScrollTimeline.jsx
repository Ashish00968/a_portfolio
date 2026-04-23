import React, { useState, useEffect, useRef } from 'react';
import './ScrollTimeline.css';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'portfolio', label: 'Work' },
  { id: 'before-after', label: 'Raw vs Edited' },
  { id: 'process', label: 'Process' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

const ScrollTimeline = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);
  const progressRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Cancel any pending RAF to prevent stacking
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        // Update progress bar via ref (avoids re-render)
        if (progressRef.current) {
          progressRef.current.style.width = `${progress}%`;
        }

        // Show after initial scroll
        setIsVisible(scrollTop > 100);

        // Determine active section
        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i].id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.4) {
              setActiveSection(sections[i].id);
              break;
            }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMarkerClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`scroll-timeline ${isVisible ? 'visible' : ''}`}>
      {/* Background track */}
      <div className="st-track">
        {/* Progress fill — updated via ref, not state */}
        <div
          ref={progressRef}
          className="st-progress"
          style={{ width: '0%' }}
        />

        {/* Section markers */}
        {sections.map((section, index) => {
          const position = (index / (sections.length - 1)) * 100;
          return (
            <button
              key={section.id}
              className={`st-marker ${activeSection === section.id ? 'active' : ''}`}
              style={{ left: `${position}%` }}
              onClick={() => handleMarkerClick(section.id)}
              title={section.label}
            >
              <span className="st-marker-dot" />
              <span className="st-marker-label">{section.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollTimeline;
