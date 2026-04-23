import React, { useRef, useEffect, useState, useCallback } from 'react';
import { FolderDown, Scissors, Volume2, Music, Palette, Wand2, Sparkles } from 'lucide-react';
import './EditingProcess.css';

const steps = [
  {
    icon: FolderDown,
    title: 'Raw Footage',
    desc: 'I receive your raw clips, understand your vision, and plan the narrative structure.',
    color: 'blue',
  },
  {
    icon: Scissors,
    title: 'Assembly Cut',
    desc: 'Selecting the best takes, building the timeline, and establishing the story flow.',
    color: 'orange',
  },
  {
    icon: Volume2,
    title: 'Sound Design',
    desc: 'Music selection, foley, ambient sound, and mixing for an immersive audio experience.',
    color: 'blue',
  },
  {
    icon: Music,
    title: 'Beat Sync & Story',
    desc: 'Syncing every cut to the beat — connecting scenes through storyline and rhythm for maximum impact.',
    color: 'orange',
  },
  {
    icon: Palette,
    title: 'Color Grade',
    desc: 'Cinematic color grading to set the mood — from LOG to a polished cinematic look.',
    color: 'blue',
  },
  {
    icon: Wand2,
    title: 'Effects & Motion',
    desc: 'Motion graphics, dynamic text, visual effects, and creative transitions that make it pop.',
    color: 'orange',
  },
  {
    icon: Sparkles,
    title: 'Final Polish',
    desc: 'Captions, final color tweaks, export in your desired format — ready to publish.',
    color: 'blue',
  },
];

const BASE_SCALE = 1;
const MAX_SCALE = 1.35; // Increased for more "wow"
const MAGNIFY_RANGE = 250; 
const CARD_WIDTH = 200;
const CARD_GAP = 14;

const EditingProcess = () => {
  const [isVisible, setIsVisible] = useState(false);
  // Store transformation data in a single array of objects
  const [transforms, setTransforms] = useState(steps.map(() => ({ scale: 1, x: 0 })));
  const sectionRef = useRef(null);
  const scrollerRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      if (!scrollerRef.current) return;
      
      const scroller = scrollerRef.current;
      const rect = scroller.getBoundingClientRect();
      // Mouse X position relative to the scroller context
      const mouseX = e.clientX - rect.left + scroller.scrollLeft;

      // Calculate base positions and scales
      const newScales = steps.map((_, i) => {
        const cardCenterX = i * (CARD_WIDTH + CARD_GAP) + CARD_WIDTH / 2 + 20; // 20 is padding adjustment
        const distance = Math.abs(mouseX - cardCenterX);
        
        if (distance > MAGNIFY_RANGE) return BASE_SCALE;
        
        // Smoother magnification curve
        const ratio = 1 - distance / MAGNIFY_RANGE;
        const scale = BASE_SCALE + (MAX_SCALE - BASE_SCALE) * Math.pow(Math.cos((1 - ratio) * Math.PI / 2), 2);
        return scale;
      });

      // Calculate X-offsets to prevent overlap (The macOS "shove" effect)
      const newTransforms = newScales.map((scale, i) => {
        // Each card is pushed by the full growth of all previous cards
        // Growth is (scale - 1) * width. Scale happens from center, so 
        // card i needs to shift by half of its own growth + full growth of predecessors
        // to maintain exactly the same visual gap.
        const myGrowth = (scale - 1) * CARD_WIDTH;
        const precedingGrowth = newScales.slice(0, i).reduce((acc, s) => acc + (s - 1) * CARD_WIDTH, 0);
        
        return {
          scale,
          x: precedingGrowth + (myGrowth * 0.5)
        };
      });

      setTransforms(newTransforms);
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setTransforms(steps.map(() => ({ scale: 1, x: 0 })));
  }, []);

  return (
    <section id="process" className="process-section section-padding" ref={sectionRef}>
      <div className="container text-center margin-bottom">
        <h2 className="section-title">
          My Editing <span className="text-neon-blue text-glow">Process</span>
        </h2>
        <p className="section-subtitle">
          From raw footage to cinematic masterpiece — here's how the magic happens.
        </p>
      </div>

      <div className="process-carousel-wrapper">
        <div
          className={`process-scroller ${isVisible ? 'visible' : ''}`}
          ref={scrollerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Inner container that expands to accommodate the "dock" growth */}
          <div className="process-inner">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const { scale, x } = transforms[index];
              const isActive = scale > 1.05;

              return (
                <div
                  key={step.title}
                  className={`process-step ${isVisible ? 'step-visible' : ''} ${isActive ? 'magnified' : ''}`}
                  style={{
                    animationDelay: `${index * 120 + 200}ms`,
                    transform: `translateX(${x}px) scale(${scale})`,
                    zIndex: isActive ? 10 : 2,
                  }}
                >
                  <div className={`step-number step-number-${step.color}`}>
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className={`step-icon step-icon-${step.color}`}>
                    <Icon 
                      size={28} 
                      style={{ 
                        transform: `scale(${1 + (scale - 1) * 0.5})`,
                        transition: 'transform 0.1s ease-out' 
                      }} 
                    />
                  </div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
                  
                  {/* Magnetic glow overlay */}
                  {isActive && <div className="step-magnetic-glow" style={{ opacity: (scale - 1) * 3 }} />}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <p className="process-hint text-center">
        <span className="hint-icon">←</span> Hover & scroll to explore <span className="hint-icon">→</span>
      </p>
    </section>
  );
};

export default EditingProcess;
