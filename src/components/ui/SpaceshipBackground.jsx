import React, { useEffect, useRef } from 'react';
import './SpaceshipBackground.css';

/**
 * SpaceshipBackground — 3D Depth-Layered Orbital Starfield & Topographic Horizon
 * Combines 3D parallax star layers with subtle Digital Elevation Model (DEM)
 * contour waves that react smoothly to pointer position while respecting
 * prefers-reduced-motion.
 */
const SpaceshipBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Pointer tracking with smooth lerp for 3D camera parallax
    const pointer = { targetX: 0, targetY: 0, currentX: 0, currentY: 0 };
    const handlePointerMove = (e) => {
      if (prefersReducedMotion) return;
      pointer.targetX = (e.clientX / Math.max(width, 1) - 0.5) * 2;
      pointer.targetY = (e.clientY / Math.max(height, 1) - 0.5) * 2;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // 3D depth-layered starfield (z: 0.25 far -> 1.0 near)
    const starCount = Math.min(Math.floor((width * height) / 15000), 85);
    const stars = Array.from({ length: starCount }, () => {
      const z = Math.random() * 0.75 + 0.25;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        size: z * 1.45 + 0.35,
        alpha: z * 0.65 + 0.15,
        velocity: (z * 0.14 + 0.03) * (Math.random() > 0.2 ? 1 : -0.5),
        pulseOffset: Math.random() * Math.PI * 2,
        tint: Math.random() > 0.82 ? '56, 189, 248' : Math.random() > 0.9 ? '212, 138, 82' : '240, 246, 255',
      };
    });

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smoothly interpolate camera parallax
      pointer.currentX += (pointer.targetX - pointer.currentX) * 0.05;
      pointer.currentY += (pointer.targetY - pointer.currentY) * 0.05;

      // 1. Ambient 3D orbital nebula washes
      const nebulaX = width * 0.72 + pointer.currentX * -24;
      const nebulaY = height * 0.28 + pointer.currentY * -18;
      const grad = ctx.createRadialGradient(
        nebulaX,
        nebulaY,
        40,
        nebulaX,
        nebulaY,
        width * 0.75
      );
      grad.addColorStop(0, 'rgba(56, 189, 248, 0.038)');
      grad.addColorStop(0.45, 'rgba(99, 102, 241, 0.022)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      const alpenglowX = width * 0.22 + pointer.currentX * 18;
      const alpenglowY = height * 0.78 + pointer.currentY * 14;
      const gradWarm = ctx.createRadialGradient(
        alpenglowX,
        alpenglowY,
        20,
        alpenglowX,
        alpenglowY,
        width * 0.55
      );
      gradWarm.addColorStop(0, 'rgba(212, 138, 82, 0.024)');
      gradWarm.addColorStop(1, 'transparent');
      ctx.fillStyle = gradWarm;
      ctx.fillRect(0, 0, width, height);

      // 2. Subtle 3D Topographic DEM Contour Horizon Lines
      const contourCount = 4;
      for (let c = 0; c < contourCount; c++) {
        const layerDepth = (c + 1) / contourCount;
        const baseY = height * (0.76 + c * 0.055) + pointer.currentY * (layerDepth * 14);
        ctx.beginPath();
        const step = 36;
        for (let x = 0; x <= width + step; x += step) {
          const nx = x * 0.0022 + pointer.currentX * 0.15 * layerDepth;
          const elevation =
            Math.sin(nx + time * 0.35 + c * 0.9) * 18 * layerDepth +
            Math.cos(nx * 2.1 - time * 0.2 + c) * 9 * layerDepth;
          const py = baseY + elevation;
          if (x === 0) {
            ctx.moveTo(x, py);
          } else {
            ctx.lineTo(x, py);
          }
        }
        ctx.strokeStyle =
          c % 2 === 0
            ? `rgba(56, 189, 248, ${0.022 + layerDepth * 0.018})`
            : `rgba(212, 138, 82, ${0.016 + layerDepth * 0.014})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 3. 3D Depth-Layered Cosmic Particles
      if (!prefersReducedMotion) {
        time += 0.016;
      }

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        if (!prefersReducedMotion) {
          star.y -= star.velocity;
          if (star.y < -10) star.y = height + 10;
          if (star.y > height + 10) star.y = -10;
        }

        const parallaxX = pointer.currentX * star.z * 22;
        const parallaxY = pointer.currentY * star.z * 16;
        const drawX = (star.x + parallaxX + width) % width;
        const drawY = (star.y + parallaxY + height) % height;

        const dynamicAlpha = Math.max(
          0.08,
          Math.min(0.95, star.alpha + Math.sin(time * 1.4 + star.pulseOffset) * 0.18)
        );

        ctx.fillStyle = `rgba(${star.tint}, ${dynamicAlpha})`;
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="spaceship-canvas" aria-hidden="true" />;
};

export default SpaceshipBackground;
