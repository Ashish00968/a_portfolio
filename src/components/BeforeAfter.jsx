import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import './BeforeAfter.css';

const BeforeAfter = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isSliding, setIsSliding] = useState(false);
  const containerRef = useRef(null);
  const sectionRef = useScrollReveal();

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let position = ((clientX - rect.left) / rect.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    setSliderPos(position);
  };

  const stopSliding = () => setIsSliding(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isSliding) return;
      e.preventDefault();
      handleMove(e.clientX);
    };
    const handleTouchMove = (e) => {
      if (!isSliding) return;
      handleMove(e.touches[0].clientX);
    };

    if (isSliding) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('mouseup', stopSliding);
      window.addEventListener('touchend', stopSliding);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', stopSliding);
      window.removeEventListener('touchend', stopSliding);
    };
  }, [isSliding]);

  return (
    <section id="before-after" className="before-after section-padding bg-darker" ref={sectionRef}>
      <div className="container container-sm text-center margin-bottom">
        <h2 className="section-title reveal">Raw vs <span className="text-neon-blue text-glow">Edited</span></h2>
        <p className="section-subtitle reveal" data-delay="1">Drag the slider to see the magic of advanced color grading.</p>
      </div>
      
      <div className="container">
        <div 
          className="ba-slider reveal-scale reveal" 
          data-delay="2"
          ref={containerRef}
          onMouseDown={(e) => { setIsSliding(true); handleMove(e.clientX); }}
          onTouchStart={(e) => { setIsSliding(true); handleMove(e.touches[0].clientX); }}
        >
          {/* Base Image (Raw/Before) */}
          <div className="ba-image raw">
            <img src="/before.jpg" alt="Raw Image" className="raw-img"/>
            <span className="ba-label label-left">RAW (LOG)</span>
          </div>
          
          {/* Overlay Image (Edited/After) */}
          <div className="ba-image edited" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
            <img src="/after.jpg" alt="Color Graded"/>
            <span className="ba-label label-right text-neon-blue">GRADED</span>
          </div>
          
          {/* Handle */}
          <div className="ba-handle" style={{ left: `${sliderPos}%` }}>
            <div className="ba-handle-line"></div>
            <div className="ba-handle-btn">
              <ChevronLeft size={16} />
              <ChevronRight size={16} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
