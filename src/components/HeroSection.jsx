import React, { useState, useEffect, useRef } from 'react';
import { FlowButton } from '@/components/ui/flow-button';
import {
  AnimatedHeroWordmark,
  TypewriterCycleSubtitle,
  BlurWaveDescription,
} from './HeroAnimatedTypography.jsx';

export default function HeroSection() {
  // Content entrance state
  const [contentVisible, setContentVisible] = useState(false);

  // Canvas frame sequence references
  const canvasRef = useRef(null);
  const videoFallbackRef = useRef(null);
  const framesRef = useRef([]);
  const [framesLoaded, setFramesLoaded] = useState(false);
  const lastDrawnFrameRef = useRef(-1);
  const ctxRef = useRef(null);

  // Mouse tracking references for smooth cursor tracking
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
  const currentMouseRef = useRef({ x: 0.5, y: 0.5 });
  const stageRef = useRef(null);
  const rafIdRef = useRef(null);

  // Preload all 96 extracted frames for instantaneous, zero-latency 60fps tracking
  useEffect(() => {
    let isCancelled = false;
    const TOTAL_FRAMES = 96;
    const images = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, '0');
      img.src = `/assets/character_frames/f_${numStr}.jpg`;
      img.onload = () => {
        if (isCancelled) return;
        loadedCount++;
        if (loadedCount >= 8 || i === 50) {
          setFramesLoaded(true);
        }
        // Immediately paint center frame 50 when ready if nothing drawn yet
        if (i === 50 && lastDrawnFrameRef.current === -1 && canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) {
            ctxRef.current = ctx;
            ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
            lastDrawnFrameRef.current = 50;
          }
        }
      };
      img.onerror = () => {
        if (i === 50 && !isCancelled) {
          setFramesLoaded(true);
        }
      };
      images.push(img);
    }
    framesRef.current = images;

    return () => {
      isCancelled = true;
    };
  }, []);

  // Entrance animation trigger
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setContentVisible(true);
    }, 80);
    return () => window.clearTimeout(timer);
  }, []);

  // Track cursor and touch events
  useEffect(() => {
    const handleMouseMove = (e) => {
      const normX = Math.min(Math.max(0, e.clientX / window.innerWidth), 1);
      const normY = Math.min(Math.max(0, e.clientY / window.innerHeight), 1);
      targetMouseRef.current = { x: normX, y: normY };
    };

    const handleMouseLeave = () => {
      targetMouseRef.current = { x: 0.5, y: 0.5 };
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      const normX = Math.min(Math.max(0, touch.clientX / window.innerWidth), 1);
      const normY = Math.min(Math.max(0, touch.clientY / window.innerHeight), 1);
      targetMouseRef.current = { x: normX, y: normY };
    };

    const handleTouchEnd = () => {
      targetMouseRef.current = { x: 0.5, y: 0.5 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // 60FPS Animation Loop: Fluid gaze tracking and zero lag
  useEffect(() => {
    const LERP_FACTOR = 0.085;
    let isRunning = true;

    const update = () => {
      if (!isRunning) return;

      currentMouseRef.current.x +=
        (targetMouseRef.current.x - currentMouseRef.current.x) * LERP_FACTOR;
      currentMouseRef.current.y +=
        (targetMouseRef.current.y - currentMouseRef.current.y) * LERP_FACTOR;

      const currX = currentMouseRef.current.x;

      // Frame 28 = looks RIGHT, Frame 50 = looks CENTER, Frame 72 = looks LEFT
      const targetFrame = Math.round(50 + (0.5 - currX) * 44);
      const clampedFrame = Math.max(26, Math.min(74, targetFrame));

      if (clampedFrame !== lastDrawnFrameRef.current) {
        const canvas = canvasRef.current;
        const frames = framesRef.current;
        if (canvas && frames.length >= clampedFrame) {
          const img = frames[clampedFrame - 1];
          if (img && img.complete && img.naturalWidth > 0) {
            if (!ctxRef.current) {
              ctxRef.current = canvas.getContext('2d');
            }
            const ctx = ctxRef.current;
            if (ctx) {
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              lastDrawnFrameRef.current = clampedFrame;
            }
          }
        }
      }

      // Fallback video sync
      const video = videoFallbackRef.current;
      if (video && video.duration && !video.seeking) {
        const targetVideoTime = (clampedFrame / 96) * video.duration;
        if (Math.abs(video.currentTime - targetVideoTime) > 0.03) {
          video.currentTime = targetVideoTime;
        }
      }

      rafIdRef.current = requestAnimationFrame(update);
    };

    rafIdRef.current = requestAnimationFrame(update);

    return () => {
      isRunning = false;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  const scrollToTarget = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const characterMaskStyle = {
    WebkitMaskImage:
      'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 4%, black 14%, black 100%)',
    maskImage:
      'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 4%, black 14%, black 100%)',
  };

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative z-10 w-full min-h-[100svh] flex flex-col justify-between md:justify-center overflow-hidden select-none text-white bg-[#A2090F]"
    >
      {/* Subtle architectural dot texture & radial studio spotlight behind 3D character */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.45) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-white/[0.06] blur-[120px] z-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none hidden md:block absolute top-1/2 right-[8%] -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,95,95,0.28)_0%,rgba(162,9,15,0.08)_50%,transparent_75%)] blur-[40px] z-0"
      />

      {/* Responsive Container: Stacked on Mobile (< md), Split Left/Right ("barabar mein") on Tablet & Desktop (md+) */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 pt-24 sm:pt-28 md:pt-24 pb-0 md:pb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
        {/* Left Hero Content Column */}
        <div
          className={`w-full md:w-[56%] lg:w-[54%] xl:w-[52%] max-w-2xl relative z-20 transition-all duration-700 ease-out ${
            contentVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Main Heading: Clean Animated "SYED MEHDI" */}
          <AnimatedHeroWordmark />

          {/* Subtitle: Looping Typewriter "FULL STACK DEVELOPER" */}
          <TypewriterCycleSubtitle />

          {/* Portfolio Description: Larger copy with Blur-Wave Entrance */}
          <BlurWaveDescription />

          {/* Unified FlowButton CTAs matching the rest of the portfolio */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
            <FlowButton
              text="View Projects"
              onClick={() => scrollToTarget('projects')}
              variant="light"
            />
            <FlowButton
              text="Let's Connect"
              onClick={() => scrollToTarget('contact')}
              variant="outline"
            />
          </div>
        </div>
      </div>

      {/* 3D CHARACTER STAGE: Responsive vertical stage on mobile (< md), right-side split stage ("barabar mein") on tablet & desktop (md+) */}
      <div className="relative w-full h-[350px] sm:h-[430px] mt-4 md:mt-0 md:absolute md:inset-y-0 md:right-0 md:w-[50%] lg:w-[52%] xl:w-[50%] md:h-full z-0 pointer-events-none overflow-hidden flex items-end justify-center md:justify-end">
        <div
          ref={stageRef}
          className="relative w-full h-full flex items-end justify-center md:justify-end will-change-transform"
        >
          {/* 60FPS Frame-Sequence Canvas centered cleanly on character */}
          <canvas
            ref={canvasRef}
            width={1280}
            height={720}
            style={characterMaskStyle}
            className={`w-full h-full md:h-[min(92vh,760px)] lg:h-[min(96vh,860px)] object-cover object-[51%_bottom] select-none pointer-events-none transition-opacity duration-300 ${
              framesLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Soft top edge fade on mobile so stacked character blends seamlessly */}
          <div
            aria-hidden="true"
            className="md:hidden pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#A2090F] to-transparent"
          />

          {/* Fallback Video if frames loading */}
          {!framesLoaded && (
            <video
              ref={videoFallbackRef}
              src="/assets/aistudio/Create_left_and_right_image_b25dda15_8d2c20fc.mp4"
              muted
              playsInline
              preload="auto"
              style={characterMaskStyle}
              className="absolute inset-x-0 bottom-0 w-full h-full md:h-[min(92vh,760px)] lg:h-[min(96vh,860px)] object-cover object-[51%_bottom] pointer-events-none select-none"
            />
          )}
        </div>
      </div>
    </section>
  );
}
