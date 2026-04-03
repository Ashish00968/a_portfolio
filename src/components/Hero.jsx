import React, { useEffect, useState } from 'react';
import { PlayCircle } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Small delay to trigger initial animations smoothly
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <header id="hero" className="hero">
      {/* Replaced heavy video background with a performant animated gradient background */}
      <div className="hero-bg animated-gradient"></div>
      
      <div className={`container hero-content text-center ${loaded ? 'fade-in-up active' : 'fade-in-up'}`}>
        <div className="badge mb-sm"><span className="pulse-dot"></span> Available for Work</div>
        
        <h1 className="headline">
          I turn your simple videos into<br />
          <span className="text-neon-blue text-glow">cinematic edits / Vlogs.</span>
        </h1>
        
        <p className="description">
          Stunning cinematic edits for Instagram & YouTube. Perfect timing, dynamic pacing, and immersive storytelling tailored for Travel Creators and Vloggers.
        </p>
        
        <div className="hero-actions">
          <a href="#contact" className="btn btn-primary btn-glow btn-lg">Get in Touch</a>
          <a href="#portfolio" className="btn btn-secondary btn-lg play-reel-btn">
            <PlayCircle size={20} /> View Showcase
          </a>
        </div>
      </div>

      <div className={`scroll-indicator ${loaded ? 'fade-in active delay-4' : 'fade-in delay-4'}`}>
        <span>Scroll</span>
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
