'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';

export type CollapsingCardItem = {
  idx: number;
  wordmark: string;
  title: string;
  handle?: string;
  detail?: string;
  ctaLabel?: string;
  href?: string;
  external?: boolean;
  theme?: 'obsidian' | 'light';
  icon?: React.ComponentType<{ className?: string }>;
  allowCopy?: boolean;
  onCopy?: () => void;
  isCopied?: boolean;
};

type CollapsingCardsProps = {
  items?: CollapsingCardItem[];
  defaultActiveIdx?: number;
  className?: string;
};

const DEFAULT_CARDS: CollapsingCardItem[] = [
  {
    idx: 1,
    wordmark: 'Email',
    title: 'Email',
    handle: 'syedmehdi.deve@gmail.com',
    detail: 'Best for detailed project scopes, briefs, and direct proposals.',
    ctaLabel: 'Send a Direct Email',
    href: 'mailto:syedmehdi.deve@gmail.com',
    external: false,
    theme: 'obsidian',
  },
  {
    idx: 2,
    wordmark: 'WhatsApp',
    title: 'WhatsApp',
    handle: '+923222549467',
    detail: 'Quick voice or text discussions directly on WhatsApp.',
    ctaLabel: 'Message on WhatsApp',
    href: 'https://wa.me/923222549467',
    external: true,
    theme: 'light',
  },
  {
    idx: 3,
    wordmark: 'LinkedIn',
    title: 'LinkedIn',
    handle: 'linkedin.com/in/syedmehdi4909',
    detail: 'Professional network, collaborations, and engineering roles.',
    ctaLabel: 'Connect on LinkedIn',
    href: 'https://www.linkedin.com/in/syedmehdi4909/',
    external: true,
    theme: 'obsidian',
  },
  {
    idx: 4,
    wordmark: 'GitHub',
    title: 'GitHub',
    handle: 'github.com/MEHDI14909',
    detail: 'Inspect source code, live web builds, and active commits.',
    ctaLabel: 'Explore Repositories',
    href: 'https://github.com/MEHDI14909',
    external: true,
    theme: 'light',
  },
  {
    idx: 5,
    wordmark: 'Fiverr',
    title: 'Fiverr',
    handle: 'fiverr.com/syedmehdi321456',
    detail: 'Milestone-based freelance web development orders.',
    ctaLabel: 'Hire on Fiverr',
    href: 'https://www.fiverr.com/syedmehdi321456',
    external: true,
    theme: 'obsidian',
  },
];

export default function CollapsingCards({
  items = DEFAULT_CARDS,
  defaultActiveIdx = 1,
  className = '',
}: CollapsingCardsProps) {
  const [activeIdx, setActiveIdx] = useState<number>(defaultActiveIdx);
  const totalCount = String(items.length).padStart(2, '0');

  return (
    <div
      className={`flex flex-col lg:flex-row gap-3 w-full lg:h-[340px] ${className}`}
    >
      {items.map((item) => {
        const isActive = activeIdx === item.idx;
        const isDark = (item.theme ?? 'obsidian') === 'obsidian';
        const Icon = item.icon;
        const idxLabel = String(item.idx).padStart(2, '0');

        return (
          <div
            key={item.idx}
            role="button"
            tabIndex={0}
            aria-expanded={isActive}
            onMouseEnter={() => setActiveIdx(item.idx)}
            onFocus={() => setActiveIdx(item.idx)}
            onClick={() => setActiveIdx(item.idx)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveIdx(item.idx);
              }
            }}
            className={`group relative rounded-[26px] sm:rounded-[28px] overflow-hidden cursor-pointer border transition-all duration-700 ease-[cubic-bezier(0.2,1,0.3,1)] motion-reduce:duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
              isActive
                ? 'lg:flex-[2.75] min-h-[250px] sm:min-h-[240px] lg:min-h-0 lg:min-w-0'
                : 'lg:flex-[0.85] lg:min-w-[132px] min-h-[82px] sm:min-h-[88px] lg:min-h-0'
            } ${
              isDark
                ? `bg-[#0B0B0D] text-white ${
                    isActive
                      ? 'border-white/30 shadow-[0_26px_68px_rgba(0,0,0,0.62)]'
                      : 'border-white/15 hover:border-white/25 shadow-[0_14px_38px_rgba(0,0,0,0.4)]'
                  }`
                : `bg-white text-[#111113] ${
                    isActive
                      ? 'border-white shadow-[0_26px_68px_rgba(0,0,0,0.34)]'
                      : 'border-white/85 hover:border-white shadow-[0_14px_38px_rgba(0,0,0,0.22)]'
                  }`
            }`}
          >
            {/* Subtle top hairline accent */}
            <div
              aria-hidden="true"
              className={`absolute top-0 inset-x-0 h-[2px] origin-left transition-transform duration-500 ease-out z-20 ${
                isDark
                  ? 'bg-gradient-to-r from-white/75 via-[#A2090F] to-transparent'
                  : 'bg-gradient-to-r from-[#111113] via-[#A2090F] to-transparent'
              } ${isActive ? 'scale-x-100' : 'scale-x-0'}`}
            />

            {/* Soft crimson studio glow inside active dark cards */}
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute -bottom-16 -right-16 w-56 h-56 rounded-full blur-[72px] transition-all duration-700 ease-out ${
                isDark
                  ? isActive
                    ? 'bg-[#A2090F]/40 opacity-100 scale-110'
                    : 'bg-[#A2090F]/20 opacity-35 scale-90'
                  : isActive
                  ? 'bg-[#A2090F]/10 opacity-100 scale-110'
                  : 'bg-[#A2090F]/5 opacity-0 scale-90'
              }`}
            />

            {/* Collapsed Upright Display Wordmark (Clean on Mobile, Tablet & Desktop) */}
            <div
              className={`pointer-events-none absolute inset-0 z-10 flex lg:flex-col items-center lg:items-start justify-between px-5 py-4 sm:p-6 transition-opacity duration-300 ${
                isActive ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <div className="flex lg:flex-col items-center lg:items-start gap-3">
                <span
                  className={`text-xs font-bold tabular-nums ${
                    isDark ? 'text-zinc-400' : 'text-neutral-500'
                  }`}
                >
                  {idxLabel}
                </span>
                {Icon && (
                  <span
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-105 ${
                      isDark
                        ? 'bg-white/[0.06] border-white/15 text-white'
                        : 'bg-neutral-100 border-black/10 text-[#111113]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between lg:w-full gap-2">
                <span
                  className={`text-base sm:text-lg font-extrabold tracking-tight whitespace-nowrap ${
                    isDark ? 'text-white' : 'text-[#111113]'
                  }`}
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {item.wordmark}
                </span>
                <ArrowUpRight
                  className={`w-4 h-4 shrink-0 ${
                    isDark ? 'text-zinc-400' : 'text-neutral-500'
                  }`}
                />
              </div>
            </div>

            {/* Expanded Card Content */}
            <div className="relative z-10 h-full p-5 sm:p-7 flex flex-col justify-between gap-4">
              {/* Top Row: Index + Icon Medallion */}
              <div
                className={`flex items-center justify-between gap-3 transition-all duration-500 ease-[cubic-bezier(0.2,1,0.3,1)] ${
                  isActive
                    ? 'opacity-100 translate-y-0 delay-100'
                    : 'opacity-0 -translate-y-2 pointer-events-none hidden lg:flex'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {Icon && (
                    <span
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-500 ${
                        isActive ? 'scale-100' : 'scale-90'
                      } ${
                        isDark
                          ? 'bg-white/10 border border-white/15 text-white'
                          : 'bg-[#111113] text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </span>
                  )}
                  <div className="min-w-0">
                    <div
                      className={`text-xs font-semibold tabular-nums ${
                        isDark ? 'text-zinc-400' : 'text-[#A2090F]'
                      }`}
                    >
                      {idxLabel} / {totalCount}
                    </div>
                    <h3
                      className={`text-xl sm:text-3xl font-extrabold tracking-tight leading-tight truncate ${
                        isDark ? 'text-white' : 'text-[#111113]'
                      }`}
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {item.title}
                    </h3>
                  </div>
                </div>

                {item.allowCopy && item.onCopy && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      item.onCopy?.();
                    }}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                      isDark
                        ? 'bg-white/10 hover:bg-white text-white hover:text-[#111113] border-white/15'
                        : 'bg-neutral-100 hover:bg-[#111113] text-[#111113] hover:text-white border-black/10'
                    }`}
                  >
                    {item.isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Bottom Meta & Clean Action Button */}
              <div
                className={`mt-auto space-y-4 transition-all duration-500 ease-[cubic-bezier(0.2,1,0.3,1)] ${
                  isActive
                    ? 'opacity-100 translate-y-0 delay-150'
                    : 'opacity-0 translate-y-3 pointer-events-none hidden lg:block'
                }`}
              >
                <div className="space-y-1.5 max-w-md">
                  {item.handle && (
                    <p
                      className={`text-sm sm:text-lg font-bold tracking-tight break-words ${
                        isDark ? 'text-white' : 'text-[#111113]'
                      }`}
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {item.handle}
                    </p>
                  )}
                  {item.detail && (
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isDark ? 'text-zinc-300' : 'text-neutral-600'
                      }`}
                    >
                      {item.detail}
                    </p>
                  )}
                </div>

                {item.href && (
                  <div
                    className={`pt-3 border-t flex items-center justify-between gap-3 ${
                      isDark ? 'border-white/12' : 'border-black/10'
                    }`}
                  >
                    <a
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      onClick={(e) => e.stopPropagation()}
                      className={`group/cta inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 whitespace-nowrap ${
                        isDark
                          ? 'bg-white text-[#111113] hover:bg-[#A2090F] hover:text-white shadow-sm'
                          : 'bg-[#111113] text-white hover:bg-[#A2090F] shadow-sm'
                      }`}
                    >
                      <span>{item.ctaLabel || 'Open'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                    </a>

                    <span
                      className={`hidden sm:inline text-xs font-medium ${
                        isDark ? 'text-zinc-400' : 'text-neutral-500'
                      }`}
                    >
                      Hover or click to switch
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
