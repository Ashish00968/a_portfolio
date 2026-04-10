import React, { useState, useEffect } from 'react';
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);

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
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
        {/* Progress fill */}
        <div
          className="st-progress"
          style={{ width: `${scrollProgress}%` }}
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
