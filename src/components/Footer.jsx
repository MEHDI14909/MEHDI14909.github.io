import React from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';

function WhatsAppBrandLogo({ className = 'w-9 h-9' }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 3C8.82 3 3 8.71 3 15.76c0 2.53.75 4.98 2.17 7.08L3.4 29l6.36-1.67A13.1 13.1 0 0 0 16 28.52c7.18 0 13-5.71 13-12.76C29 8.71 23.18 3 16 3Zm0 23.22c-2.06 0-4.08-.57-5.83-1.64l-.42-.25-3.77.99 1.01-3.66-.27-.43a10.42 10.42 0 0 1-1.61-5.47C5.11 9.89 9.99 5.3 16 5.3c6.01 0 10.89 4.59 10.89 10.46 0 5.87-4.88 10.46-10.89 10.46Z"
        fill="currentColor"
      />
      <path
        d="M21.9 18.73c-.32-.16-1.91-.94-2.21-1.05-.3-.11-.51-.16-.73.16-.21.32-.83 1.05-1.02 1.26-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.6-1.59-.96-.85-1.61-1.9-1.8-2.22-.19-.32-.02-.49.14-.65.15-.15.32-.38.48-.56.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.56-.08-.16-.73-1.74-1-2.38-.26-.63-.53-.54-.73-.55h-.62c-.22 0-.56.08-.86.4-.3.32-1.13 1.1-1.13 2.68 0 1.58 1.16 3.11 1.32 3.32.16.21 2.28 3.47 5.52 4.86.77.33 1.37.53 1.84.68.77.24 1.48.21 2.04.13.62-.09 1.91-.78 2.18-1.53.27-.75.27-1.4.19-1.53-.08-.13-.3-.21-.62-.38Z"
        fill="currentColor"
      />
    </svg>
  );
}

function EmailBrandLogo({ className = 'w-9 h-9' }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="3.5"
        y="6.5"
        width="25"
        height="19"
        rx="4"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <path
        d="M5.5 9.5 16 17.5 26.5 9.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 22.5 12 16.2M26.5 22.5 20 16.2"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FiverrBrandLogo({ className = 'h-9 w-auto' }) {
  return (
    <svg
      viewBox="0 0 88 28"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <text
        x="2"
        y="22"
        fill="currentColor"
        fontFamily="Sora, Inter, system-ui, sans-serif"
        fontSize="22"
        fontWeight="900"
        letterSpacing="-0.06em"
      >
        fiverr
      </text>
      <circle cx="77" cy="20" r="3.6" fill="#1DBF73" />
    </svg>
  );
}

function GitHubBrandLogo({ className = 'w-9 h-9' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
      />
    </svg>
  );
}

function LinkedInBrandLogo({ className = 'w-9 h-9' }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="3.5"
        y="3.5"
        width="25"
        height="25"
        rx="6"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <path
        d="M10.2 13.8V22M10.2 10.2v.4"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M15.2 22v-8.2m0 3.1c.5-1.9 2.1-3.1 4-3.1 2.3 0 3.6 1.5 3.6 4.2V22"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const BRAND_CHANNELS = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    sublabel: '+92 322 2549467',
    href: 'https://wa.me/923222549467',
    external: true,
    accentClass:
      'hover:border-[#25D366]/65 hover:bg-[#25D366]/14 hover:shadow-[0_18px_40px_rgba(37,211,102,0.22)]',
    iconClass: 'text-white group-hover:text-[#25D366]',
    Logo: WhatsAppBrandLogo,
  },
  {
    id: 'email',
    label: 'Email',
    sublabel: 'syedmehdi.deve@gmail.com',
    href: 'mailto:syedmehdi.deve@gmail.com',
    external: false,
    accentClass:
      'hover:border-[#FF5B69]/65 hover:bg-[#FF5B69]/14 hover:shadow-[0_18px_40px_rgba(255,91,105,0.24)]',
    iconClass: 'text-white group-hover:text-[#FF7A85]',
    Logo: EmailBrandLogo,
  },
  {
    id: 'fiverr',
    label: 'Fiverr',
    sublabel: 'Freelance Gigs',
    href: 'https://www.fiverr.com/syedmehdi321456',
    external: true,
    accentClass:
      'hover:border-[#1DBF73]/65 hover:bg-[#1DBF73]/14 hover:shadow-[0_18px_40px_rgba(29,191,115,0.22)]',
    iconClass: 'text-white group-hover:text-white',
    Logo: FiverrBrandLogo,
  },
  {
    id: 'github',
    label: 'GitHub',
    sublabel: '@MEHDI14909',
    href: 'https://github.com/MEHDI14909',
    external: true,
    accentClass:
      'hover:border-white/55 hover:bg-white/14 hover:shadow-[0_18px_40px_rgba(255,255,255,0.16)]',
    iconClass: 'text-white group-hover:scale-110',
    Logo: GitHubBrandLogo,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    sublabel: '/in/syedmehdi4909',
    href: 'https://www.linkedin.com/in/syedmehdi4909/',
    external: true,
    accentClass:
      'hover:border-[#0A66C2]/70 hover:bg-[#0A66C2]/18 hover:shadow-[0_18px_40px_rgba(10,102,194,0.26)]',
    iconClass: 'text-white group-hover:text-[#58A6FF]',
    Logo: LinkedInBrandLogo,
  },
];

export default function Footer({ onNavigate }) {
  return (
    <footer
      className="relative z-10 w-full border-t border-white/20 bg-black/35 backdrop-blur-2xl text-white overflow-hidden"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[200px] rounded-full bg-[#A2090F]/25 blur-[95px]"
      />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 py-12 sm:py-16 space-y-10">
        {/* Top Row: Signature Wordmark & Back to Top */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-md">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('hero');
              }}
              className="inline-block text-2xl sm:text-3xl font-black tracking-tight text-white hover:text-white/85 transition-colors"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              SYED MEHDI
            </a>
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
              Crafting clean, responsive digital experiences and dependable
              software solutions.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('hero')}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-white text-[#111113] hover:bg-[#A2090F] hover:text-white transition-colors duration-300 cursor-pointer whitespace-nowrap shrink-0 shadow-[0_10px_28px_rgba(0,0,0,0.28)]"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center Row: Large Interactive Brand Logo Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {BRAND_CHANNELS.map((channel) => {
            const BrandLogo = channel.Logo;
            return (
              <a
                key={channel.id}
                href={channel.href}
                target={channel.external ? '_blank' : undefined}
                rel={channel.external ? 'noopener noreferrer' : undefined}
                aria-label={`${channel.label} — ${channel.sublabel}`}
                className={`group relative rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-md p-4 sm:p-5 flex flex-col justify-between gap-4 min-h-[116px] transition-all duration-300 ease-out hover:-translate-y-1 ${channel.accentClass}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div
                    className={`transition-all duration-300 ${channel.iconClass}`}
                  >
                    <BrandLogo />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/45 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
                </div>

                <div className="min-w-0">
                  <div
                    className="text-sm font-extrabold text-white tracking-tight"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {channel.label}
                  </div>
                  <div className="text-[11px] font-medium text-white/65 truncate mt-0.5">
                    {channel.sublabel}
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-white/70">
          <p>© {new Date().getFullYear()} Syed Mehdi. All rights reserved.</p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('contact');
            }}
            className="inline-flex items-center gap-1.5 font-semibold text-white/85 hover:text-white transition-colors whitespace-nowrap"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
