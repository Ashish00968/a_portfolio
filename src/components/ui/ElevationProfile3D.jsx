import React, { useState, useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Compass, Mountain, Navigation } from 'lucide-react';
import { elevationTelemetryWaypoints } from '../../data/portfolioData';
import './ElevationProfile3D.css';

/**
 * ElevationProfile3D — Interactive 3D Topographic DEM & GPX Waypoint Inspector
 * Lets visitors scrub across authentic Patalsu Peak (2,480m -> 4,261m) GPS
 * checkpoints on a 3D perspective ridge mesh with live orbital telemetry.
 */
const ElevationProfile3D = () => {
  const [activeIndex, setActiveIndex] = useState(
    elevationTelemetryWaypoints.length - 1
  );
  const shouldReduceMotion = useReducedMotion();
  const stageRef = useRef(null);

  const activePoint =
    elevationTelemetryWaypoints[activeIndex] || elevationTelemetryWaypoints[0];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 160, damping: 24 });
  const smoothY = useSpring(mouseY, { stiffness: 160, damping: 24 });

  const rotateX = useTransform(
    smoothY,
    [-0.5, 0.5],
    shouldReduceMotion ? ['0deg', '0deg'] : ['11deg', '3deg']
  );
  const rotateY = useTransform(
    smoothX,
    [-0.5, 0.5],
    shouldReduceMotion ? ['0deg', '0deg'] : ['-5deg', '5deg']
  );

  const handlePointerMove = (e) => {
    if (shouldReduceMotion || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
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
      ref={stageRef}
      className="elev3d-wrapper"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Top Telemetry Bar */}
      <div className="elev3d-header">
        <div className="elev3d-title-group">
          <span className="telemetry-tag">
            <span className="telemetry-dot" aria-hidden="true" />
            INTERACTIVE 3D DEM // PATALSU GPX TRACK
          </span>
          <h4 className="elev3d-heading">
            36-Waypoint Ridge Elevation Telemetry
          </h4>
        </div>

        <div className="elev3d-live-badge">
          <Compass size={13} className="elev3d-badge-icon" />
          <span>{activePoint.id} · {activePoint.coordinates}</span>
        </div>
      </div>

      {/* 3D Perspective Stage */}
      <motion.div
        className="elev3d-stage"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Background 3D Isometric Grid Planes */}
        <div className="elev3d-grid-floor" aria-hidden="true" />

        {/* Multi-layer Topographic Ridge SVG */}
        <svg
          className="elev3d-svg"
          viewBox="0 0 600 200"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="demRidgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(56, 189, 248, 0.28)" />
              <stop offset="60%" stopColor="rgba(129, 140, 248, 0.14)" />
              <stop offset="100%" stopColor="rgba(10, 13, 16, 0.02)" />
            </linearGradient>
            <linearGradient id="demStrokeGrad" x1="0%" y1="50%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="65%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#d48a52" />
            </linearGradient>
          </defs>

          {/* Secondary background DEM ridge contour */}
          <path
            d="M 0,185 Q 110,160 190,140 T 360,105 T 510,64 L 600,48 L 600,200 L 0,200 Z"
            fill="rgba(212, 138, 82, 0.05)"
            stroke="rgba(212, 138, 82, 0.22)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* Primary Patalsu Peak GPX elevation fill */}
          <path
            d="M 0,176 C 75,164 135,142 180,120 C 235,95 280,96 324,84 C 378,68 415,58 456,50 C 495,42 530,32 558,28 L 600,24 L 600,200 L 0,200 Z"
            fill="url(#demRidgeGrad)"
          />

          {/* Primary illuminated GPX ridge line */}
          <path
            d="M 0,176 C 75,164 135,142 180,120 C 235,95 280,96 324,84 C 378,68 415,58 456,50 C 495,42 530,32 558,28 L 600,24"
            fill="none"
            stroke="url(#demStrokeGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Interactive 3D Z-Elevated Waypoint Pins */}
        <div className="elev3d-nodes-layer">
          {elevationTelemetryWaypoints.map((wp, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={wp.id}
                type="button"
                className={`elev3d-node ${isSelected ? 'active' : ''}`}
                style={{
                  left: `${wp.xPercent}%`,
                  top: `${wp.yPercent}%`,
                }}
                onMouseEnter={() => setActiveIndex(idx)}
                onFocus={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Inspect ${wp.name} at ${wp.elevationLabel}`}
                aria-pressed={isSelected}
              >
                <span className="elev3d-node-pulse" aria-hidden="true" />
                <span className="elev3d-node-dot" aria-hidden="true" />
                <span className="elev3d-node-label">{wp.elevationLabel}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Bottom Interactive Readout Strip */}
      <div className="elev3d-readout-grid">
        <div className="elev3d-stat">
          <span className="elev3d-stat-label">CHECKPOINT</span>
          <strong className="elev3d-stat-value">
            <Mountain size={13} className="elev3d-inline-icon" />
            {activePoint.name}
          </strong>
        </div>
        <div className="elev3d-stat">
          <span className="elev3d-stat-label">ALTITUDE / GAIN</span>
          <strong className="elev3d-stat-value accent-cyan">
            {activePoint.elevationLabel} · {activePoint.distance}
          </strong>
        </div>
        <div className="elev3d-stat">
          <span className="elev3d-stat-label">SLOPE / TERRAIN</span>
          <strong className="elev3d-stat-value">
            <Navigation size={12} className="elev3d-inline-icon" />
            {activePoint.slope} · {activePoint.zone}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default ElevationProfile3D;
