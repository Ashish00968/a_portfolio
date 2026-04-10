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
const MAX_SCALE = 1.25;
const MAGNIFY_RANGE = 280; // px radius of influence

const EditingProcess = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scales, setScales] = useState(steps.map(() => BASE_SCALE));
  const sectionRef = useRef(null);
  const scrollerRef = useRef(null);
  const cardRefs = useRef([]);
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

  // macOS Dock magnification: scale based on cursor distance
  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const mouseX = e.clientX;
      const newScales = cardRefs.current.map((card) => {
        if (!card) return BASE_SCALE;
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const distance = Math.abs(mouseX - cardCenterX);

        if (distance > MAGNIFY_RANGE) return BASE_SCALE;

        // Cosine curve for smooth falloff (like macOS Dock)
        const ratio = 1 - distance / MAGNIFY_RANGE;
        const scale = BASE_SCALE + (MAX_SCALE - BASE_SCALE) * Math.cos((1 - ratio) * Math.PI / 2);
        return scale;
      });
      setScales(newScales);
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setScales(steps.map(() => BASE_SCALE));
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

      {/* Horizontal scrollable strip with Dock magnification */}
      <div className="process-carousel-wrapper">
        <div
          className={`process-scroller ${isVisible ? 'visible' : ''}`}
          ref={scrollerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            const scale = scales[index];
            const isActive = scale > 1.05;

            return (
              <div
                key={step.title}
                ref={(el) => (cardRefs.current[index] = el)}
                className={`process-step ${isVisible ? 'step-visible' : ''} ${isActive ? 'magnified' : ''}`}
                style={{
                  animationDelay: `${index * 120 + 200}ms`,
                  transform: `scale(${scale})`,
                  zIndex: isActive ? 10 : 2,
                }}
              >
                <div className={`step-number step-number-${step.color}`}>
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className={`step-icon step-icon-${step.color}`}>
                  <Icon size={28} />
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <p className="process-hint text-center">
        <span className="hint-icon">←</span> Hover & scroll to explore <span className="hint-icon">→</span>
      </p>
    </section>
  );
};

export default EditingProcess;
