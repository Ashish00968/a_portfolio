import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Animate progress bar
    const duration = 1400; // ms
    const interval = 20;
    const step = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      // Start fade out after progress completes
      const timeout = setTimeout(() => {
        setFadeOut(true);
        // Remove from DOM after fade animation
        setTimeout(() => onComplete?.(), 500);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loading-content">
        {/* Animated Logo */}
        <div className="loading-logo">
          <svg viewBox="0 0 120 50" className="logo-svg">
            {/* Letter A */}
            <text
              x="10"
              y="40"
              className="logo-letter logo-letter-a"
              fontFamily="Outfit, sans-serif"
              fontWeight="700"
              fontSize="42"
            >
              A
            </text>
            {/* Dot */}
            <circle cx="45" cy="38" r="3" className="logo-dot logo-dot-1" />
            {/* Letter N */}
            <text
              x="55"
              y="40"
              className="logo-letter logo-letter-n"
              fontFamily="Outfit, sans-serif"
              fontWeight="700"
              fontSize="42"
            >
              N
            </text>
            {/* Dot */}
            <circle cx="95" cy="38" r="3" className="logo-dot logo-dot-2" />
          </svg>
        </div>

        {/* Progress Bar */}
        <div className="loading-bar-track">
          <div 
            className="loading-bar-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Ambient particles */}
      <div className="loading-particles">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
