import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import './Scroll3DReveal.css';

/**
 * Scroll3DReveal — Reusable 3D Perspective Scroll Container
 * Imparts real physical perspective pitch and Z-axis depth displacement
 * as elements scroll through the viewport, adhering to Emil Kowalski's
 * design engineering principles (GPU-only composited transforms, zero CLS).
 */
const Scroll3DReveal = ({
  children,
  className = '',
  pitch = 6.5,
  depth = -32,
  enableExitTilt = true,
  offset = ['start end', 'end start'],
  ...rest
}) => {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Track element progress through the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset,
  });

  // Physical spring smoothing to eliminate micro-stutter
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.6,
  });

  // 3D Perspective Transformations
  // Phase 0 -> 0.45 (Entry): pitch from +pitch to 0deg, translateZ from depth to 0, scale 0.96 to 1
  // Phase 0.45 -> 0.65 (Active Viewport): locked at 0deg, translateZ 0, scale 1.0
  // Phase 0.65 -> 1.0 (Exit): gently pitch backwards to -pitch*0.6
  const rotateX = useTransform(
    smoothProgress,
    [0, 0.42, 0.65, 1],
    shouldReduceMotion
      ? ['0deg', '0deg', '0deg', '0deg']
      : [`${pitch}deg`, '0deg', '0deg', enableExitTilt ? `${-pitch * 0.6}deg` : '0deg']
  );

  const translateZ = useTransform(
    smoothProgress,
    [0, 0.42, 0.65, 1],
    shouldReduceMotion
      ? ['0px', '0px', '0px', '0px']
      : [`${depth}px`, '0px', '0px', enableExitTilt ? `${depth * 0.5}px` : '0px']
  );

  const scale = useTransform(
    smoothProgress,
    [0, 0.42, 0.65, 1],
    shouldReduceMotion ? [1, 1, 1, 1] : [0.965, 1, 1, 0.985]
  );

  const opacity = useTransform(
    smoothProgress,
    [0, 0.32, 0.72, 1],
    [0.35, 1, 1, enableExitTilt ? 0.55 : 1]
  );

  return (
    <div ref={containerRef} className={`scroll-3d-perspective-stage ${className}`} {...rest}>
      <motion.div
        className="scroll-3d-plane"
        style={{
          rotateX,
          translateZ,
          scale,
          opacity,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Scroll3DReveal;
