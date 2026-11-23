import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function AnimatedHeroWordmark() {
  const prefersReducedMotion = useReducedMotion();
  const syedLetters = ['S', 'Y', 'E', 'D'];
  const mehdiLetters = ['M', 'E', 'H', 'D', 'I'];

  return (
    <h1
      id="hero-heading"
      aria-label="SYED MEHDI"
      className="text-5xl sm:text-6xl md:text-[3.75rem] lg:text-[4.85rem] xl:text-[5.65rem] font-black tracking-[-0.01em] text-white leading-[0.96] mb-3 md:mb-4 drop-shadow-[0_10px_28px_rgba(0,0,0,0.28)] select-none flex flex-wrap items-baseline gap-x-3.5 sm:gap-x-5"
      style={{ fontFamily: 'var(--font-display)' }}
    >
      {/* First Word: SYED */}
      <span className="inline-flex items-baseline whitespace-nowrap">
        {syedLetters.map((char, idx) => (
          <motion.span
            key={`syed-${idx}`}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.48,
              delay: idx * 0.045,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={
              prefersReducedMotion
                ? undefined
                : { y: -4, transition: { type: 'spring', stiffness: 360, damping: 16 } }
            }
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </span>

      {/* Second Word: MEHDI */}
      <span className="inline-flex items-baseline whitespace-nowrap">
        {mehdiLetters.map((char, idx) => (
          <motion.span
            key={`mehdi-${idx}`}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.48,
              delay: 0.18 + idx * 0.045,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={
              prefersReducedMotion
                ? undefined
                : { y: -4, transition: { type: 'spring', stiffness: 360, damping: 16 } }
            }
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </span>
    </h1>
  );
}

const SUBTITLE_TEXT = 'FULL STACK DEVELOPER';

export function TypewriterCycleSubtitle() {
  const prefersReducedMotion = useReducedMotion();
  const [displayedCount, setDisplayedCount] = useState(
    prefersReducedMotion ? SUBTITLE_TEXT.length : 0
  );
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedCount(SUBTITLE_TEXT.length);
      return;
    }

    let timeoutId;

    if (!isDeleting && displayedCount < SUBTITLE_TEXT.length) {
      timeoutId = window.setTimeout(() => {
        setDisplayedCount((prev) => prev + 1);
      }, 68);
    } else if (!isDeleting && displayedCount === SUBTITLE_TEXT.length) {
      timeoutId = window.setTimeout(() => {
        setIsDeleting(true);
      }, 2100);
    } else if (isDeleting && displayedCount > 0) {
      timeoutId = window.setTimeout(() => {
        setDisplayedCount((prev) => prev - 1);
      }, 36);
    } else if (isDeleting && displayedCount === 0) {
      timeoutId = window.setTimeout(() => {
        setIsDeleting(false);
      }, 420);
    }

    return () => window.clearTimeout(timeoutId);
  }, [displayedCount, isDeleting, prefersReducedMotion]);

  return (
    <h2
      aria-label={SUBTITLE_TEXT}
      className="min-h-[1.75rem] sm:min-h-[2rem] md:min-h-[2.25rem] lg:min-h-[2.6rem] text-sm sm:text-lg md:text-xl lg:text-[1.65rem] font-bold tracking-[0.18em] sm:tracking-[0.22em] text-white/95 uppercase mb-4 md:mb-5 leading-tight flex items-center"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      <span>{SUBTITLE_TEXT.slice(0, displayedCount)}</span>
      {!prefersReducedMotion && (
        <span
          aria-hidden="true"
          className="inline-block w-[2.5px] h-[1.05em] ml-1.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-blink"
        />
      )}
    </h2>
  );
}

const HERO_DESCRIPTION_PARTS = [
  { text: 'Designing ', highlight: false },
  { text: 'expressive, responsive web interfaces', highlight: true, delay: 0 },
  { text: ' and engineering ', highlight: false },
  { text: 'scalable full-stack applications', highlight: true, delay: 1.2 },
  {
    text: ' with React.js, JavaScript, Node.js, Express.js, and modern databases—built for ',
    highlight: false,
  },
  { text: 'speed, clarity, and lasting impact.', highlight: true, delay: 2.4 },
];

export function BlurWaveDescription() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <p
        className="text-white/90 text-sm sm:text-base md:text-[16px] lg:text-[18px] xl:text-[19px] font-medium leading-[1.65] mb-7 md:mb-9 max-w-[38rem]"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {HERO_DESCRIPTION_PARTS.map((part) => part.text).join('')}
      </p>
    );
  }

  let runningWordIndex = 0;

  return (
    <p
      className="text-white/85 text-sm sm:text-base md:text-[16px] lg:text-[18px] xl:text-[19px] font-medium leading-[1.65] mb-7 md:mb-9 max-w-[39rem]"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {HERO_DESCRIPTION_PARTS.map((segment, segIdx) => {
        const segmentWords = segment.text.split(/(\s+)/);
        const content = segmentWords.map((token, tokIdx) => {
          if (/^\s+$/.test(token)) {
            return <React.Fragment key={`sp-${segIdx}-${tokIdx}`}>{token}</React.Fragment>;
          }
          if (!token) return null;
          const idx = runningWordIndex++;
          return (
            <motion.span
              key={`wd-${segIdx}-${tokIdx}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.42,
                delay: 0.28 + idx * 0.025,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block"
            >
              {token}
            </motion.span>
          );
        });

        if (segment.highlight) {
          return (
            <motion.span
              key={`seg-${segIdx}`}
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{
                duration: 3.6,
                delay: segment.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="font-bold text-white underline decoration-white/35 decoration-1 underline-offset-4"
            >
              {content}
            </motion.span>
          );
        }

        return <React.Fragment key={`seg-${segIdx}`}>{content}</React.Fragment>;
      })}
    </p>
  );
}
