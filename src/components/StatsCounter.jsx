import React, { useState, useEffect, useRef } from 'react';
import { Film, MapPin, Star, Zap } from 'lucide-react';
import './StatsCounter.css';

const statsData = [
  { icon: Film, value: 50, suffix: '+', label: 'Reels Edited', color: 'blue' },
  { icon: MapPin, value: 12, suffix: '+', label: 'Destinations Covered', color: 'orange' },
  { icon: Star, value: 100, suffix: '%', label: 'Client Satisfaction', color: 'blue' },
  { icon: Zap, value: 48, suffix: 'hr', label: 'Avg. Delivery Time', color: 'orange' },
];

const AnimatedCounter = ({ target, suffix, duration = 2000, started }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;

    let startTime = null;
    let animationFrame;

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      
      setCount(Math.floor(easedProgress * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, started]);

  return (
    <span className="counter-number">
      {count}{suffix}
    </span>
  );
};

const StatsCounter = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="container">
        <div className="stats-grid">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`stat-card ${hasAnimated ? 'animate-in' : ''}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`stat-icon stat-icon-${stat.color}`}>
                  <Icon size={24} />
                </div>
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  started={hasAnimated}
                  duration={2000 + index * 200}
                />
                <span className="stat-label">{stat.label}</span>
                {hasAnimated && (
                  <div className={`stat-glow-pulse stat-glow-${stat.color}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
