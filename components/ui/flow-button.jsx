'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';

export function FlowButton({
  text = 'Modern Button',
  onClick,
  href,
  type = 'button',
  variant = 'light',
  compact = false,
  className = '',
}) {
  const isLight = variant === 'light';
  const isInk = variant === 'ink';
  const isDark = variant === 'dark';

  const containerStyle = isLight
    ? 'border-white/80 bg-white text-[#111111] hover:text-white shadow-lg'
    : isDark
    ? 'border-[#111113] bg-[#111113] text-white hover:border-[#A2090F] active:bg-[#A2090F] active:border-[#A2090F] shadow-sm'
    : isInk
    ? 'border-[#111111]/25 bg-transparent text-[#111111] hover:text-white active:bg-[#A2090F] active:text-white'
    : 'border-white/35 bg-transparent text-white hover:text-[#111111]';

  const arrowColor =
    isLight || isInk
      ? 'stroke-[#111111] group-hover/flow:stroke-white group-active/flow:stroke-white'
      : isDark
      ? 'stroke-white'
      : 'stroke-white group-hover/flow:stroke-[#111111]';

  const circleColor = isLight
    ? 'bg-[#111111]'
    : isInk || isDark
    ? 'bg-[#A2090F]'
    : 'bg-white';

  const sizeClasses = compact
    ? 'px-6 py-2 text-xs'
    : 'px-8 py-3 text-sm';

  const arrowSize = compact ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const leftArrowPos = compact
    ? 'left-[-28%] group-hover/flow:left-3'
    : 'left-[-25%] group-hover/flow:left-4';
  const rightArrowPos = compact
    ? 'right-3 group-hover/flow:right-[-28%]'
    : 'right-4 group-hover/flow:right-[-25%]';
  const textShift = compact
    ? '-translate-x-2 group-hover/flow:translate-x-2'
    : '-translate-x-3 group-hover/flow:translate-x-3';

  const sharedClassName = `group/flow relative inline-flex items-center justify-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] font-semibold cursor-pointer transition-all duration-[650ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent hover:rounded-[12px] active:scale-[0.97] whitespace-nowrap shrink-0 ${sizeClasses} ${containerStyle} ${className}`;

  const content = (
    <>
      {/* Left arrow */}
      <ArrowRight
        className={`absolute ${arrowSize} fill-none z-[9] transition-all duration-[750ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${leftArrowPos} ${arrowColor}`}
      />

      {/* Text */}
      <span
        className={`relative z-[1] transition-all duration-[750ms] ease-out ${textShift}`}
      >
        {text}
      </span>

      {/* Expanding Circle */}
      <span
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-[50%] opacity-0 group-hover/flow:w-[320px] group-hover/flow:h-[320px] group-hover/flow:opacity-100 group-active/flow:w-[320px] group-active/flow:h-[320px] group-active/flow:opacity-100 transition-all duration-[750ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${circleColor}`}
      />

      {/* Right arrow */}
      <ArrowRight
        className={`absolute ${arrowSize} fill-none z-[9] transition-all duration-[750ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${rightArrowPos} ${arrowColor}`}
      />
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={sharedClassName}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={sharedClassName}
    >
      {content}
    </button>
  );
}

export default FlowButton;
