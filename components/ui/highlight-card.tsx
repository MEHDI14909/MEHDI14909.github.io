"use client";

import { FC, ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ComponentProps {
  title: string;
  description: string[];
  icon?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

const Component: FC<ComponentProps> = ({
  title,
  description,
  icon,
  footer,
  className,
}) => {
  return (
    <div
      className={cn(
        "group w-full h-full cursor-default transform transition-all duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.015] motion-reduce:transform-none",
        className
      )}
    >
      <Card className="w-full h-full text-white rounded-[34px] border border-white/18 bg-gradient-to-br from-black/60 via-black/48 to-black/72 shadow-[0_24px_64px_rgba(0,0,0,0.42)] relative backdrop-blur-2xl overflow-hidden hover:border-white/35 hover:shadow-[0_32px_84px_rgba(0,0,0,0.58)] transition-all duration-500 flex flex-col justify-between">
        {/* Subtle ambient starfield & light sweep */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] to-white/[0.08] opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
          <div className="absolute -bottom-20 -left-20 w-52 h-52 rounded-full bg-gradient-to-tr from-[#A2090F]/35 via-white/10 to-transparent blur-3xl opacity-55 group-hover:opacity-85 transform group-hover:scale-110 transition-all duration-700" />
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/[0.07] blur-3xl opacity-45 group-hover:opacity-75 transition-opacity duration-700" />

          {/* Delicate 4-point star accents */}
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="absolute top-8 right-9 w-4 h-4 text-white/40 group-hover:text-white/85 group-hover:rotate-45 transition-all duration-700"
            fill="currentColor"
          >
            <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
          </svg>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="absolute top-20 left-8 w-2.5 h-2.5 text-white/30 group-hover:text-white/75 group-hover:scale-125 transition-all duration-700"
            fill="currentColor"
          >
            <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
          </svg>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="absolute bottom-24 right-10 w-3 h-3 text-white/25 group-hover:text-white/70 group-hover:-rotate-45 transition-all duration-700"
            fill="currentColor"
          >
            <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
          </svg>

          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000 ease-out" />
        </div>

        <div className="p-7 sm:p-9 relative z-10 flex-1 flex flex-col items-center justify-center text-center">
          <div className="relative mb-6">
            <div className="absolute -inset-2 rounded-full border border-white/15 scale-95 group-hover:scale-110 group-hover:border-white/35 transition-all duration-500" />
            <div className="p-5 rounded-full backdrop-blur-lg border border-white/20 bg-gradient-to-br from-white/10 to-black/60 shadow-2xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
              <div className="transform group-hover:rotate-12 transition-transform duration-500">
                {icon}
              </div>
            </div>
          </div>

          <h3
            className="mb-4 text-2xl sm:text-3xl font-black tracking-tight text-white text-balance transform group-hover:scale-[1.03] transition-transform duration-300"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {title}
          </h3>

          <div className="space-y-2 max-w-sm">
            {description.map((line, idx) => (
              <p
                key={idx}
                className="text-zinc-300 text-xs sm:text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300"
              >
                {line}
              </p>
            ))}
          </div>

          <div className="mt-7 w-14 h-0.5 bg-gradient-to-r from-transparent via-white/75 to-transparent rounded-full group-hover:w-32 transition-all duration-500" />

          {footer && <div className="mt-6 w-full flex justify-center">{footer}</div>}
        </div>

        <div className="pointer-events-none absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-white/10 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Card>
    </div>
  );
};

export default Component;
