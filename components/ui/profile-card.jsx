import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FlowButton } from '@/components/ui/flow-button';

const DEFAULT_PORTRAIT_SRC =
  '/assets/aistudio/WhatsApp_Image_2026-11-16_at_11.16.06_AM_6bb5095f.jpeg';

export const ProfileCard = ({
  imageSrc = DEFAULT_PORTRAIT_SRC,
  name = 'Syed Mehdi',
  handle = 'syedmehdi.deve@gmail.com',
  subtitle = 'Karachi, Pakistan',
  actionLabel = 'Connect',
  onAction,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.015,
        transition: { duration: 0.35, ease: 'easeOut' },
      }}
      className="w-full max-w-sm mx-auto"
    >
      <div className="group bg-white text-[#111113] rounded-3xl border border-black/15 shadow-[0_18px_48px_rgba(0,0,0,0.32)] hover:shadow-[0_24px_62px_rgba(0,0,0,0.42)] overflow-hidden transition-shadow duration-300">
        <div className="relative overflow-hidden bg-neutral-100">
          {!imageError ? (
            <img
              src={imageSrc}
              alt={name}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full aspect-square object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03] select-none"
            />
          ) : (
            <div className="w-full aspect-square flex items-center justify-center bg-neutral-100 text-[#111113]">
              <span
                className="text-2xl font-black tracking-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {name}
              </span>
            </div>
          )}

          {/* Subtle clean inner edge shade along picture borders */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 shadow-[inset_0_0_24px_rgba(0,0,0,0.28)] ring-1 ring-inset ring-black/15"
          />

          {/* Top-left subtle dark scrim so name & shade stand out cleanly */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/45 via-black/15 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 via-black/12 to-transparent pointer-events-none" />

          {/* Syed Mehdi name with soft dark shade & hero-style silver glow on hover */}
          <div className="absolute top-4 left-4">
            <h3
              className="relative inline-block text-xl sm:text-2xl font-bold tracking-tight text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.85),0_0_24px_rgba(0,0,0,0.45)] group-hover:text-zinc-100 group-hover:[text-shadow:0_2px_12px_rgba(0,0,0,0.9),0_0_22px_rgba(255,255,255,0.75)] transition-all duration-500 ease-out select-none"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {name}
            </h3>
          </div>
        </div>

        <div className="p-4 flex items-center justify-between gap-3 bg-white border-t border-black/10">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full overflow-hidden ring-1 ring-black/20 shrink-0 transition-transform duration-300 ease-out group-hover:scale-105 bg-neutral-100">
              {!imageError ? (
                <img
                  src={imageSrc}
                  alt={`${name} avatar`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top select-none"
                />
              ) : null}
            </div>
            <div className="min-w-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5">
              <div className="text-sm font-bold text-[#111113] truncate">
                {handle}
              </div>
              <div className="text-xs text-neutral-500 truncate">{subtitle}</div>
            </div>
          </div>

          {onAction && (
            <FlowButton
              text={actionLabel}
              onClick={onAction}
              variant="dark"
              compact
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const Component = ProfileCard;
export default ProfileCard;
