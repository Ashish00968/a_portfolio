import React, { useRef, useState, useCallback, useEffect } from 'react';
import './SpotlightCard.css';

/**
 * SpotlightCard — 3D Spatial Perspective & Dynamic Cursor Spotlight
 * Features hardware-accelerated 3D tilt physics (--rotate-x, --rotate-y),
 * radial cursor illumination, and specular edge reflection.
 * Zero React re-renders during mousemove for 120fps responsiveness.
 */
const SpotlightCard = ({
  children,
  className = '',
  spotlightColor = 'rgba(56, 189, 248, 0.14)',
  borderColor = 'rgba(56, 189, 248, 0.35)',
  interactive = true,
  enableTilt = true,
  maxTilt = 4.5,
  ...rest
}) => {
  const cardRef = useRef(null);
  const rafRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotionRef = useRef(false);

  useEffect(() => {
    prefersReducedMotionRef.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      const el = cardRef.current;
      if (!el) return;

      const clientX = e.clientX;
      const clientY = e.clientY;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        el.style.setProperty('--mouse-x', `${x}px`);
        el.style.setProperty('--mouse-y', `${y}px`);

        if (enableTilt && !prefersReducedMotionRef.current) {
          const normX = Math.max(-1, Math.min(1, (x / rect.width - 0.5) * 2));
          const normY = Math.max(-1, Math.min(1, (y / rect.height - 0.5) * 2));
          const rotateX = (-normY * maxTilt).toFixed(2);
          const rotateY = (normX * maxTilt).toFixed(2);
          el.style.setProperty('--rotate-x', `${rotateX}deg`);
          el.style.setProperty('--rotate-y', `${rotateY}deg`);
        }
      });
    },
    [enableTilt, maxTilt]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    const el = cardRef.current;
    if (!el) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    el.style.setProperty('--rotate-x', '0deg');
    el.style.setProperty('--rotate-y', '0deg');
  }, []);

  return (
    <div
      ref={cardRef}
      className={`spotlight-card ${interactive ? 'interactive' : ''} ${
        enableTilt ? 'tilt-enabled' : ''
      } ${className}`}
      onMouseMove={interactive ? handleMouseMove : undefined}
      onMouseEnter={interactive ? handleMouseEnter : undefined}
      onMouseLeave={interactive ? handleMouseLeave : undefined}
      style={{
        '--mouse-x': '-1000px',
        '--mouse-y': '-1000px',
        '--rotate-x': '0deg',
        '--rotate-y': '0deg',
        '--spotlight-color': spotlightColor,
        '--spotlight-border-color': borderColor,
      }}
      {...rest}
    >
      <div
        className="spotlight-card-glow"
        style={{ opacity: isHovered ? 1 : 0 }}
        aria-hidden="true"
      />
      <div
        className="spotlight-card-border-beam"
        style={{ opacity: isHovered ? 1 : 0 }}
        aria-hidden="true"
      />
      <div className="spotlight-card-content">{children}</div>
    </div>
  );
};

export default SpotlightCard;
