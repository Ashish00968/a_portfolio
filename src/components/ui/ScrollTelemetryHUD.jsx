import React, { useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from 'framer-motion';
import { Mountain, ArrowUp, Compass } from 'lucide-react';
import './ScrollTelemetryHUD.css';

/**
 * ScrollTelemetryHUD — Floating 3D Himalayan Orbital Altimeter & Attitude Gimbal
 * Dynamically calculates simulated Himalayan altitude (2,480m Solang Base -> 4,261m Patalsu Peak)
 * along with a 3D attitude gimbal reflecting scroll velocity and spatial orientation.
 * Adheres strictly to Emil Kowalski animation rules (tactile :active scale, GPU-composited).
 */
const ScrollTelemetryHUD = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Track global scroll
  const { scrollY, scrollYProgress } = useScroll();

  // Smooth springs for high-fidelity physical momentum
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.5,
  });

  // Dynamic Himalayan Altitude computation: 2,480m -> 4,261m
  const rawAltitude = useTransform(smoothProgress, [0, 1], [2480, 4261]);
  const [displayAltitude, setDisplayAltitude] = useState(2480);

  // Attitude gimbal 3D rotation based on scroll depth
  const gimbalPitch = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? ['0deg', '0deg'] : ['-12deg', '18deg']
  );
  const gimbalRoll = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    shouldReduceMotion ? ['0deg', '0deg', '0deg'] : ['-4deg', '6deg', '-2deg']
  );

  // Visibility toggle: reveal after user scrolls past 90px
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    const unsubscribeY = scrollY.on('change', (latest) => {
      setIsVisible(latest > 90);
    });
    const unsubscribeAlt = rawAltitude.on('change', (latest) => {
      setDisplayAltitude(Math.round(latest));
    });

    return () => {
      unsubscribeY();
      unsubscribeAlt();
    };
  }, [scrollY, rawAltitude]);

  // Derive active field waypoint milestone
  const getWaypointLabel = (alt) => {
    if (alt < 2750) return 'WP-01 · SOLANG BASE';
    if (alt < 3200) return 'WP-08 · DHUNDI CHECK';
    if (alt < 3800) return 'WP-22 · BAKARTHACH';
    return 'WP-36 · PATALSU SUMMIT';
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          className="scroll-telemetry-hud"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.96 }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
          aria-label="Elevation Telemetry HUD"
        >
          <button
            type="button"
            className="hud-altimeter-pill"
            onClick={handleScrollToTop}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            title="Click to initiate ascent to summit / scroll to top"
            aria-label="Scroll to top of page"
          >
            {/* 3D Attitude Gimbal */}
            <div className="hud-gimbal-stage" aria-hidden="true">
              <motion.div
                className="hud-gimbal-sphere"
                style={{
                  rotateX: gimbalPitch,
                  rotateZ: gimbalRoll,
                }}
              >
                <div className="gimbal-horizon-line" />
                <div className="gimbal-center-pip" />
              </motion.div>
            </div>

            {/* Altitude Telemetry readout */}
            <div className="hud-readout-col">
              <div className="hud-primary-row">
                <Mountain size={12} className="hud-mountain-icon" aria-hidden="true" />
                <span className="hud-altitude-val">
                  {displayAltitude.toLocaleString()}
                  <span className="hud-unit">M</span>
                </span>
                <span className="hud-pct-badge">
                  {Math.round(smoothProgress.get() * 100)}%
                </span>
              </div>
              <span className="hud-waypoint-label">
                {getWaypointLabel(displayAltitude)}
              </span>
            </div>

            {/* Return-to-top ascent icon indicator */}
            <div className="hud-action-indicator" aria-hidden="true">
              <ArrowUp size={13} className={`hud-arrow ${isHovered ? 'hovered' : ''}`} />
            </div>
          </button>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default ScrollTelemetryHUD;
