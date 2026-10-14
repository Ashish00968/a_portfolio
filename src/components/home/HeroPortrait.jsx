/**
 * ============================================================================
 * ASHISH'S 3D SPATIAL PORTRAIT & TELEMETRY FRAME
 * ============================================================================
 * Features physics-based 3D perspective tilt, multi-plane Z-depth HUD badges,
 * counter-parallax image depth, and diagonal specular glass reflection.
 * Auto-detects `public/ashish-portrait.jpg` with graceful fallback.
 * ============================================================================
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Camera, Compass } from 'lucide-react';
import { profile } from '../../data/portfolioData';
import './HeroPortrait.css';

const HeroPortrait = () => {
  const [imageSrc, setImageSrc] = useState(profile.portrait.customImagePath);
  const [hasCustomImage, setHasCustomImage] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const frameRef = useRef(null);

  // Normalized pointer coordinates (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Physics springs adhering to Emil Kowalski animation feel
  const springConfig = { stiffness: 180, damping: 24, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D frame tilt angles
  const rotateX = useTransform(
    smoothY,
    [-0.5, 0.5],
    shouldReduceMotion ? ['0deg', '0deg'] : ['6.5deg', '-6.5deg']
  );
  const rotateY = useTransform(
    smoothX,
    [-0.5, 0.5],
    shouldReduceMotion ? ['0deg', '0deg'] : ['-6.5deg', '6.5deg']
  );

  // Counter-parallax for inner portrait image
  const imgX = useTransform(
    smoothX,
    [-0.5, 0.5],
    shouldReduceMotion ? ['0%', '0%'] : ['-1.8%', '1.8%']
  );
  const imgY = useTransform(
    smoothY,
    [-0.5, 0.5],
    shouldReduceMotion ? ['0%', '0%'] : ['-1.8%', '1.8%']
  );

  // Specular glare sweep
  const glareX = useTransform(smoothX, [-0.5, 0.5], ['15%', '85%']);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ['15%', '85%']);

  useEffect(() => {
    const img = new Image();
    img.src = profile.portrait.customImagePath;
    img.onload = () => {
      setImageSrc(profile.portrait.customImagePath);
      setHasCustomImage(true);
    };
    img.onerror = () => {
      setImageSrc(profile.portrait.fallbackPlaceholder);
      setHasCustomImage(false);
    };
  }, []);

  const handlePointerMove = (e) => {
    if (shouldReduceMotion || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(Math.max(-0.5, Math.min(0.5, nx)));
    mouseY.set(Math.max(-0.5, Math.min(0.5, ny)));
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={frameRef}
      className="portrait-container"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Ambient 3D orbital halo behind frame */}
      <div className="portrait-ambient-halo" aria-hidden="true" />

      <motion.div
        className="portrait-frame"
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Top-left floating 3D HUD Telemetry Pill (Z-elevated) */}
        <div className="portrait-floating-hud" aria-hidden="true">
          <Compass size={12} className="portrait-hud-icon" />
          <span>DEM LOCK // 4,261M</span>
        </div>

        <div className="portrait-image-wrapper">
          <motion.img
            src={imageSrc}
            alt={profile.portrait.alt}
            className="portrait-image"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            style={{
              x: imgX,
              y: imgY,
              scale: shouldReduceMotion ? 1 : 1.045,
            }}
          />
          <div className="portrait-overlay-gradient" />
          <motion.div
            className="portrait-specular-glare"
            style={{
              '--glare-x': glareX,
              '--glare-y': glareY,
            }}
            aria-hidden="true"
          />
          {/* Subtle corner reticle ticks */}
          <span className="reticle-corner tl" aria-hidden="true" />
          <span className="reticle-corner tr" aria-hidden="true" />
          <span className="reticle-corner bl" aria-hidden="true" />
          <span className="reticle-corner br" aria-hidden="true" />
        </div>

        {/* Bottom 3D elevated metadata bar */}
        <div className="portrait-metadata">
          <div className="portrait-meta-left">
            <span className="portrait-coord">32.2396° N, 77.1887° E</span>
            <span className="portrait-region">Himachal Pradesh · North India</span>
          </div>

          <div className="portrait-meta-right">
            {hasCustomImage ? (
              <span className="portrait-status-badge">
                <span className="portrait-status-dot" aria-hidden="true" />
                Ashish Nirankari
              </span>
            ) : (
              <span
                className="portrait-placeholder-badge"
                title="Drop ashish-portrait.jpg into public/ to replace"
              >
                <Camera size={12} />
                <span>Portrait Slot</span>
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroPortrait;
