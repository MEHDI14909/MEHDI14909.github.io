'use client';
import { useRef, useEffect } from 'react';

const useSpotlightEffect = (config) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let mouseX = -1000;
    let mouseY = -1000;
    let currentX = -1000;
    let currentY = -1000;
    let clickBoost = 0;
    const pulses = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (currentX === -1000) {
        currentX = mouseX;
        currentY = mouseY;
      }
    };

    const handlePointerDown = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (currentX === -1000) {
        currentX = mouseX;
        currentY = mouseY;
      }
      clickBoost = 1;
      pulses.push({
        x: event.clientX,
        y: event.clientY,
        radius: 20,
        alpha: 0.45,
      });
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const hexToRgb = (hex) => {
      const clean = hex.replace('#', '');
      const bigint = parseInt(clean, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `${r},${g},${b}`;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const rgbColor = hexToRgb(config.color || '#ffffff');
      const baseRadius = config.radius || 300;
      const baseBrightness = config.brightness || 0.2;
      const smooth = config.smoothing || 0.16;

      if (mouseX !== -1000 && mouseY !== -1000) {
        currentX += (mouseX - currentX) * smooth;
        currentY += (mouseY - currentY) * smooth;

        const dynamicRadius = baseRadius + clickBoost * 110;
        const dynamicAlpha = Math.min(0.5, baseBrightness + clickBoost * 0.22);

        const gradient = ctx.createRadialGradient(
          currentX,
          currentY,
          0,
          currentX,
          currentY,
          dynamicRadius
        );
        gradient.addColorStop(0, `rgba(${rgbColor}, ${dynamicAlpha})`);
        gradient.addColorStop(0.45, `rgba(${rgbColor}, ${dynamicAlpha * 0.45})`);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Click glow pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.radius += 12;
        p.alpha *= 0.92;

        const pulseGrad = ctx.createRadialGradient(
          p.x,
          p.y,
          p.radius * 0.2,
          p.x,
          p.y,
          p.radius
        );
        pulseGrad.addColorStop(0, `rgba(${rgbColor}, ${p.alpha * 0.6})`);
        pulseGrad.addColorStop(0.7, `rgba(${rgbColor}, ${p.alpha})`);
        pulseGrad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = pulseGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (p.alpha < 0.015) {
          pulses.splice(i, 1);
        }
      }

      clickBoost *= 0.91;
      animationFrameId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('mouseleave', handleMouseLeave);
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [config.radius, config.brightness, config.color, config.smoothing]);

  return canvasRef;
};

export const Component = ({ config = {}, className, ...rest }) => {
  const spotlightConfig = {
    radius: 300,
    brightness: 0.2,
    color: '#ffffff',
    smoothing: 0.16,
    ...config,
  };

  const canvasRef = useSpotlightEffect(spotlightConfig);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] w-full h-full ${className || ''}`}
      {...rest}
    />
  );
};

export default Component;
export { Component as SpotlightCursor };
