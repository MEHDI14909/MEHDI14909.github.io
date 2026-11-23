import React, { useState, useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Compass,
  ExternalLink,
  GitBranch,
  Image as ImageIcon,
  Layers,
  Plus,
  Search,
  Send,
  ShoppingBag,
  Sparkles,
  Star,
} from 'lucide-react';
import { FlowButton } from '@/components/ui/flow-button';

const SLOT_DEFINITIONS = [
  {
    slotNumber: '01',
    slotLabel: 'Slot 01',
    edition: 'PHP · Laravel & MySQL',
    defaultTitle: 'Gym Management System',
    defaultDescription:
      'Comprehensive fitness club and gym operations platform built with PHP Laravel and MySQL for member subscriptions, attendance tracking, trainer scheduling, and billing.',
    defaultStack: 'PHP · Laravel · MySQL',
    defaultImage: '/assets/projects/gym-management-preview.svg',
    theme: 'editorial-light',
  },
  {
    slotNumber: '02',
    slotLabel: 'Slot 02',
    edition: 'PHP · Laravel & MySQL',
    defaultTitle: 'E-Commerce Website',
    defaultDescription:
      'Complete online shopping storefront powered by PHP Laravel and MySQL with structured product catalogs, smart filtering, shopping cart persistence, and order management.',
    defaultStack: 'PHP · Laravel · MySQL',
    previewVariant: 'ecommerce',
    theme: 'studio-white',
  },
  {
    slotNumber: '03',
    slotLabel: 'Slot 03',
    edition: 'AI Assistant · Coming Soon',
    defaultTitle: 'Personalized Chatbot',
    defaultDescription:
      'Interactive personalized chatbot experience crafted for natural user conversations, smart guidance, and tailored responses—coming soon.',
    defaultStack: 'Interactive Chat UI · API Integration',
    previewVariant: 'chatbot',
    theme: 'obsidian-dark',
  },
];

const editorialEase = [0.22, 1, 0.36, 1];

const gentleHoverTransition = {
  duration: 0.42,
  ease: editorialEase,
};

function InteractiveTiltFrame({
  children,
  className = '',
  spotlightColor = 'rgba(162, 9, 15, 0.055)',
}) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spotlight = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 72%)`;

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -5, transition: gentleHoverTransition }}
      className={`group relative overflow-hidden ${className}`}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out z-0"
        style={{ background: spotlight }}
      />
      {children}
    </motion.div>
  );
}

function EcommerceStorePreviewCanvas({ heightClass = 'aspect-[16/9]' }) {
  const responsiveAspect = heightClass.includes('16/9')
    ? 'sm:aspect-[16/9]'
    : 'sm:aspect-[19/9.2]';
  return (
    <div
      className={`relative w-full min-h-[250px] sm:min-h-0 ${responsiveAspect} overflow-hidden rounded-[22px] bg-[#F6F6F9] border border-black/10 text-[#111113] flex flex-col justify-between p-3 sm:p-4 select-none`}
    >
      {/* Storefront Mini Topbar */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-black/8">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-md bg-[#111113] text-white text-[10px] font-black flex items-center justify-center">
            V
          </span>
          <span className="text-[11px] sm:text-xs font-black tracking-wider uppercase text-[#111113]">
            VELORA
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-[10px] font-semibold text-neutral-500">
          <span className="text-[#111113] font-bold">Shop</span>
          <span>New Drop</span>
          <span>Tech</span>
          <span>Apparel</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white border border-black/10 text-[9px] text-neutral-500">
            <Search className="w-2.5 h-2.5" />
            <span className="hidden sm:inline">Search</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#111113] text-white text-[9px] font-bold">
            <ShoppingBag className="w-2.5 h-2.5" />
            <span>2</span>
          </span>
        </div>
      </div>

      {/* Storefront Editorial Promo Hero */}
      <div className="relative my-2 rounded-2xl bg-gradient-to-r from-[#111115] via-[#260D12] to-[#9E080E] text-white p-3 sm:p-4 flex items-center justify-between gap-3 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -top-8 w-32 h-32 rounded-full bg-[#FF6B3D]/30 blur-2xl"
        />
        <div className="relative z-10 space-y-1 max-w-[62%]">
          <span className="inline-block text-[8px] sm:text-[9px] font-extrabold tracking-[0.16em] uppercase px-2 py-0.5 rounded-full bg-white/15 text-white/95">
            Seasonal Drop · 40% Off
          </span>
          <div className="text-xs sm:text-sm font-black leading-tight tracking-tight">
            Curated Tech &amp; Essentials
          </div>
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-[#111113] text-[9px] font-extrabold mt-0.5 shadow-sm">
            <span>Shop Catalog</span>
            <ArrowUpRight className="w-2.5 h-2.5" />
          </div>
        </div>

        <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center p-1.5 shrink-0 transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-rotate-3">
          <img
            src="/assets/projects/jbl-hero.png"
            alt="Featured Wireless Headphones"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.6)]"
          />
        </div>
      </div>

      {/* 3 Clean E-Commerce Product Grid Cards */}
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-xl bg-white border border-black/8 p-2 flex flex-col justify-between gap-1.5 shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5">
          <div className="h-10 sm:h-12 rounded-lg bg-gradient-to-br from-[#18181D] to-[#2B1216] flex items-center justify-center p-1">
            <img
              src="/assets/projects/jbl-hero.png"
              alt="Studio Wireless"
              referrerPolicy="no-referrer"
              className="h-full object-contain"
            />
          </div>
          <div>
            <div className="text-[9px] sm:text-[10px] font-bold text-[#111113] truncate">
              Studio Audio
            </div>
            <div className="flex items-center justify-between mt-0.5">
              <span className="text-[9px] font-black text-[#A2090F] tabular-nums">
                $149
              </span>
              <span className="inline-flex items-center gap-0.5 text-[8px] font-semibold text-neutral-500">
                <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                4.9
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white border border-black/8 p-2 flex flex-col justify-between gap-1.5 shadow-sm transition-transform duration-300 delay-75 group-hover:-translate-y-0.5">
          <div className="h-10 sm:h-12 rounded-lg bg-gradient-to-br from-[#F0F1F5] to-[#E2E4EC] flex items-center justify-center">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#111113] border-2 border-neutral-400 flex items-center justify-center shadow">
              <div className="w-2.5 h-0.5 bg-white rounded-full rotate-45" />
            </div>
          </div>
          <div>
            <div className="text-[9px] sm:text-[10px] font-bold text-[#111113] truncate">
              Chrono Minimal
            </div>
            <div className="flex items-center justify-between mt-0.5">
              <span className="text-[9px] font-black text-[#A2090F] tabular-nums">
                $189
              </span>
              <span className="inline-flex items-center gap-0.5 text-[8px] font-semibold text-neutral-500">
                <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                4.8
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white border border-black/8 p-2 flex flex-col justify-between gap-1.5 shadow-sm transition-transform duration-300 delay-150 group-hover:-translate-y-0.5">
          <div className="h-10 sm:h-12 rounded-lg bg-gradient-to-br from-[#2B0C10] to-[#121216] flex items-center justify-center">
            <div className="w-6 h-7 sm:w-7 sm:h-8 rounded-lg bg-gradient-to-b from-[#E11D24] to-[#8E0A10] border border-white/25 shadow flex items-center justify-center">
              <Plus className="w-3 h-3 text-white" />
            </div>
          </div>
          <div>
            <div className="text-[9px] sm:text-[10px] font-bold text-[#111113] truncate">
              Urban Pack
            </div>
            <div className="flex items-center justify-between mt-0.5">
              <span className="text-[9px] font-black text-[#A2090F] tabular-nums">
                $94
              </span>
              <span className="inline-flex items-center gap-0.5 text-[8px] font-semibold text-neutral-500">
                <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                5.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatbotShowcaseCanvas({ heightClass = 'aspect-[16/9]' }) {
  const responsiveAspect = heightClass.includes('16/9')
    ? 'sm:aspect-[16/9]'
    : 'sm:aspect-[19/9.2]';
  return (
    <div
      className={`relative w-full min-h-[250px] sm:min-h-0 ${responsiveAspect} overflow-hidden rounded-[22px] bg-gradient-to-br from-[#0A0A0F] via-[#180C12] to-[#08080C] border border-white/15 text-white p-3 sm:p-4 flex flex-col justify-between select-none`}
    >
      {/* Glowing Crimson-Coral Radial Orb Aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -right-10 w-44 h-44 rounded-full bg-gradient-to-br from-[#FF5E47]/40 via-[#A2090F]/35 to-transparent blur-3xl transition-transform duration-700 group-hover:scale-125"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-12 -left-10 w-36 h-36 rounded-full bg-[#A2090F]/25 blur-2xl"
      />

      {/* Chat Workspace Top Bar */}
      <div className="relative z-10 flex items-center justify-between gap-2 pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="relative w-6 h-6 rounded-full bg-gradient-to-tr from-[#A2090F] via-[#E11D24] to-[#FF7852] flex items-center justify-center shadow-[0_0_16px_rgba(255,94,71,0.55)]">
            <Bot className="w-3.5 h-3.5 text-white" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#0E0E14]" />
          </div>
          <div>
            <div className="text-[11px] font-extrabold tracking-tight text-white leading-none">
              Personalized AI
            </div>
            <div className="text-[9px] text-emerald-400 font-semibold mt-0.5">
              Custom Context Active
            </div>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/[0.07] border border-white/15 text-[9px] font-bold tracking-wide text-[#FF8C7A]">
          <Sparkles className="w-2.5 h-2.5" />
          <span>Coming Soon</span>
        </span>
      </div>

      {/* Interactive Conversation Bubbles */}
      <div className="relative z-10 my-auto py-2 space-y-2">
        {/* User Bubble */}
        <div className="flex justify-end">
          <div className="max-w-[78%] rounded-2xl rounded-tr-sm bg-gradient-to-r from-[#B90E16] via-[#E11D24] to-[#FF6242] px-3 py-1.5 text-[10px] sm:text-[11px] font-semibold text-white shadow-[0_8px_20px_rgba(225,29,36,0.3)]">
            Tailor a smart workflow for my portfolio visitors
          </div>
        </div>

        {/* Assistant Bubble */}
        <div className="flex items-start gap-2">
          <div className="w-5 h-5 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-2.5 h-2.5 text-[#FF7A66]" />
          </div>
          <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/[0.06] border border-white/12 backdrop-blur-md px-3 py-2 space-y-1.5">
            <p className="text-[10px] sm:text-[11px] text-zinc-200 leading-snug">
              Ready! Configured custom persona memory, instant project Q&amp;A,
              and guided client intake responses.
            </p>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/25 text-[8.5px] font-bold text-emerald-300">
                <CheckCircle2 className="w-2.5 h-2.5" />
                Persona Memory
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/[0.07] border border-white/10 text-[8.5px] font-semibold text-zinc-300">
                Smart Replies
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Glass Prompt Composer */}
      <div className="relative z-10 flex items-center justify-between gap-2 rounded-full bg-white/[0.06] border border-white/15 px-3 py-1.5 backdrop-blur-md transition-colors duration-300 group-hover:border-[#FF6B57]/40">
        <span className="text-[10px] text-zinc-400 truncate">
          Ask anything tailored to your workflow...
        </span>
        <span className="w-5 h-5 rounded-full bg-gradient-to-r from-[#E11D24] to-[#FF6B3D] flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(255,107,61,0.5)] transition-transform duration-300 group-hover:scale-110">
          <Send className="w-2.5 h-2.5 text-white" />
        </span>
      </div>
    </div>
  );
}

function ArchitecturalPreviewCanvas({
  project,
  defaultImage,
  defaultTitle,
  previewVariant,
  slotNumber,
  isDark = false,
  heightClass = 'aspect-[16/9]',
}) {
  const [imgError, setImgError] = useState(false);

  if (!project?.previewImage && previewVariant === 'ecommerce') {
    return <EcommerceStorePreviewCanvas heightClass={heightClass} />;
  }

  if (!project?.previewImage && previewVariant === 'chatbot') {
    return <ChatbotShowcaseCanvas heightClass={heightClass} />;
  }

  const previewSrc = project?.previewImage || defaultImage;

  if (previewSrc && !imgError) {
    return (
      <div
        className={`relative w-full ${heightClass} overflow-hidden rounded-[24px] ${
          isDark
            ? 'bg-[#141418] border border-white/15'
            : 'bg-[#14141A] border border-black/10'
        } flex items-center justify-center`}
      >
        <img
          src={previewSrc}
          alt={project?.name || defaultTitle || `Slot ${slotNumber} preview`}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="w-full h-full object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] will-change-transform select-none"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full ${heightClass} overflow-hidden rounded-[24px] p-5 sm:p-6 flex flex-col justify-between transition-colors duration-300 ${
        isDark
          ? 'bg-gradient-to-br from-[#141419] via-[#1B1115] to-[#0D0D10] border border-white/15 text-white'
          : 'bg-gradient-to-br from-[#16161A] via-[#261116] to-[#0E0E11] border border-black/15 text-white'
      }`}
    >
      {/* Animated subtle architectural grid + zoom stage */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25 transition-transform duration-700 ease-out group-hover:scale-105"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Crimson Ambient Glow Inside Canvas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-14 -right-14 w-56 h-56 rounded-full bg-[#A2090F]/45 blur-[70px] transition-transform duration-700 ease-out group-hover:scale-125"
      />

      {/* Diagonal optical shimmer on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -translate-x-full group-hover:translate-x-[420%] transition-transform duration-1000 ease-out"
      />

      {/* Corner Framing Reticles */}
      <div className="relative z-10 flex items-center justify-between text-[11px] font-semibold tracking-[0.2em] uppercase text-white/70">
        <span className="tabular-nums">Frame {slotNumber}</span>
        <span className="inline-flex items-center gap-1.5 text-white/80">
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Preview Canvas</span>
        </span>
      </div>

      {/* Central Sculptural Blueprint Layers (scales gently on hover) */}
      <div className="relative z-10 my-auto flex items-center justify-center py-4">
        <div className="relative w-full max-w-[260px] h-28 sm:h-32 transition-transform duration-700 ease-out group-hover:scale-[1.05]">
          <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-2xl border border-white/15 bg-white/[0.03] transition-transform duration-500 group-hover:translate-x-3.5 group-hover:translate-y-3.5" />
          <div className="relative h-full w-full rounded-2xl border border-white/25 bg-white/[0.06] backdrop-blur-sm p-4 flex flex-col justify-between shadow-[0_18px_40px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/75">
                Media Stage
              </span>
              <span className="text-xs font-black tabular-nums text-[#FF6B73]">
                {slotNumber}
              </span>
            </div>
            <div className="space-y-1.5">
              <div className="h-2 w-3/4 rounded-full bg-white/25 group-hover:bg-white/40 transition-colors duration-300" />
              <div className="h-2 w-1/2 rounded-full bg-white/15 group-hover:bg-white/25 transition-colors duration-300" />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between text-[11px] text-white/65 border-t border-white/15 pt-3">
        <span>Project Visual Display</span>
        <span className="tabular-nums">16 : 9</span>
      </div>
    </div>
  );
}

function SlotBlueprintMeta({ project, defaultStack, isDark = false }) {
  const stackText =
    project &&
    [
      ...(project.frontendStack || []),
      ...(project.backendStack || []),
      ...(project.databaseStack || []),
    ].join(' · ');

  return (
    <div
      className={`pt-4 border-t space-y-2.5 text-xs ${
        isDark ? 'border-white/20' : 'border-black/10'
      }`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span
          className={`font-bold uppercase tracking-[0.14em] ${
            isDark ? 'text-white/70' : 'text-neutral-500'
          }`}
        >
          Tech Stack
        </span>
        <span
          className={`font-semibold ${
            isDark ? 'text-white' : 'text-[#111113]'
          }`}
        >
          {stackText || defaultStack || 'Frontend · Backend · Database'}
        </span>
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span
          className={`font-bold uppercase tracking-[0.14em] ${
            isDark ? 'text-white/70' : 'text-neutral-500'
          }`}
        >
          Destinations
        </span>
        <span
          className={`inline-flex items-center gap-3 font-semibold ${
            isDark ? 'text-white/90' : 'text-neutral-700'
          }`}
        >
          <span className="inline-flex items-center gap-1">
            <GitBranch className="w-3.5 h-3.5" />
            <span>GitHub Repo</span>
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Live Demo</span>
          </span>
        </span>
      </div>
    </div>
  );
}

export default function FutureProjectsShowcase({
  projects = [],
  onOpenContact,
  onInspectProject,
}) {
  const [focusedSlot, setFocusedSlot] = useState('01');
  const sectionRef = useRef(null);

  // Always preserve exactly 3 exhibition slots: Slot 01, Slot 02, Slot 03
  const slots = SLOT_DEFINITIONS.map((def, index) => ({
    ...def,
    project: projects[index] || null,
  }));

  const leadSlot = slots[0];
  const secondarySlots = [slots[1], slots[2]];

  const handleSlotJump = (slotNum) => {
    setFocusedSlot(slotNum);
    const el = document.getElementById(`future-slot-${slotNum}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div
      ref={sectionRef}
      id="future-projects"
      className="scroll-mt-16 mt-20 sm:mt-24 pt-14 border-t border-white/25 space-y-10"
    >
      {/* ART-DIRECTED SECTION HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
        }}
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
      >
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-white/90">
            <Compass className="w-4 h-4 text-white shrink-0" />
            <span>Section C · Next Exhibition</span>
            <span aria-hidden="true" className="h-px w-8 bg-white/50" />
          </div>

          <h2
            className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-[1.05] text-balance drop-shadow-sm"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Space Reserved for{' '}
            <span className="text-white/90 underline decoration-white/40 decoration-2 underline-offset-8">
              Upcoming Builds
            </span>
          </h2>

          <p className="text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
            Three curated showcase frames engineered to present upcoming
            projects with full visual previews, stack architecture, GitHub
            repositories, and live deployments.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {/* Interactive Slot Focus Selector (Smoked Glass) */}
          <div className="inline-flex items-center flex-nowrap gap-1 p-1.5 rounded-full bg-black/25 backdrop-blur-xl text-white border border-white/20 shadow-[0_14px_34px_rgba(0,0,0,0.22)]">
            {SLOT_DEFINITIONS.map((def) => {
              const active = focusedSlot === def.slotNumber;
              return (
                <button
                  key={def.slotNumber}
                  type="button"
                  onClick={() => handleSlotJump(def.slotNumber)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0 z-10 tabular-nums ${
                    active
                      ? 'text-[#111113]'
                      : 'text-white/80 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="future-slot-focus-pill"
                      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                      className="absolute inset-0 rounded-full bg-white shadow-sm -z-10"
                    />
                  )}
                  <span>{def.slotLabel}</span>
                </button>
              );
            })}
          </div>

          {onOpenContact && (
            <FlowButton
              text="Discuss a Project"
              onClick={onOpenContact}
              variant="light"
            />
          )}
        </div>
      </motion.div>

      {/* SLOT 01 — LEAD ASYMMETRIC ARCHITECTURAL SHOWCASE (Rich Red Frame) */}
      <motion.div
        id={`future-slot-${leadSlot.slotNumber}`}
        initial={{ opacity: 0, y: 24, scale: 0.985 }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
        }}
        viewport={{ once: true, amount: 0.12 }}
        onMouseEnter={() => setFocusedSlot(leadSlot.slotNumber)}
      >
        <InteractiveTiltFrame
          spotlightColor="rgba(255, 255, 255, 0.08)"
          className={`rounded-[36px] p-6 sm:p-9 lg:p-11 bg-gradient-to-br from-[#B50B12] via-[#8E070C] to-[#580407] text-white border transition-[box-shadow,border-color] duration-500 ease-out shadow-[0_22px_64px_rgba(0,0,0,0.34)] hover:shadow-[0_30px_76px_rgba(0,0,0,0.46)] ${
            focusedSlot === leadSlot.slotNumber
              ? 'border-white/60 ring-2 ring-white/30'
              : 'border-white/25'
          }`}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-white/80 via-[#FF8A91] to-transparent"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center">
            {/* Visual Canvas (7 Columns) */}
            <div
              onClick={() => {
                if (leadSlot.project && onInspectProject) {
                  onInspectProject(leadSlot.project);
                } else if (onOpenContact) {
                  onOpenContact();
                }
              }}
              className="lg:col-span-7 cursor-pointer"
            >
              <ArchitecturalPreviewCanvas
                project={leadSlot.project}
                defaultImage={leadSlot.defaultImage}
                defaultTitle={leadSlot.defaultTitle}
                previewVariant={leadSlot.previewVariant}
                slotNumber={leadSlot.slotNumber}
                isDark={true}
                heightClass="aspect-[16/9]"
              />
            </div>

            {/* Monograph Spec Panel (5 Columns) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-white/75">
                <span className="font-black text-white tabular-nums">
                  {leadSlot.slotLabel}
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-white/95 font-bold">
                  {leadSlot.edition}
                </span>
              </div>

              <div className="space-y-2.5">
                <h3
                  className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight text-balance"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {leadSlot.project?.name || leadSlot.defaultTitle}
                </h3>
                <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                  {leadSlot.project?.description || leadSlot.defaultDescription}
                </p>
              </div>

              <SlotBlueprintMeta
                project={leadSlot.project}
                defaultStack={leadSlot.defaultStack}
                isDark={true}
              />

              <div className="pt-2 flex flex-wrap items-center gap-3">
                {leadSlot.project ? (
                  <>
                    {leadSlot.project.liveUrl && (
                      <FlowButton
                        text="Live Demo"
                        href={leadSlot.project.liveUrl}
                        variant="light"
                        compact
                      />
                    )}
                    {leadSlot.project.githubUrl && (
                      <FlowButton
                        text="GitHub Repo"
                        href={leadSlot.project.githubUrl}
                        variant="outline"
                        compact
                      />
                    )}
                  </>
                ) : (
                  onOpenContact && (
                    <FlowButton
                      text="Discuss a Project"
                      onClick={onOpenContact}
                      variant="light"
                      compact
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </InteractiveTiltFrame>
      </motion.div>

      {/* SLOTS 02 & 03 — DUAL RED EXHIBITION FRAMES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {secondarySlots.map((slot, idx) => {
          const colSpanClass = idx === 0 ? 'lg:col-span-6' : 'lg:col-span-6';

          return (
            <motion.div
              key={slot.slotNumber}
              id={`future-slot-${slot.slotNumber}`}
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  duration: 0.55,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                },
              }}
              viewport={{ once: true, amount: 0.15 }}
              onMouseEnter={() => setFocusedSlot(slot.slotNumber)}
              className={`${colSpanClass} flex`}
            >
              <InteractiveTiltFrame
                spotlightColor="rgba(255, 255, 255, 0.08)"
                className={`w-full rounded-[34px] p-6 sm:p-8 flex flex-col justify-between gap-6 transition-[box-shadow,border-color] duration-500 ease-out bg-gradient-to-br from-[#B50B12] via-[#8E070C] to-[#580407] text-white border shadow-[0_22px_64px_rgba(0,0,0,0.34)] hover:shadow-[0_30px_76px_rgba(0,0,0,0.46)] ${
                  focusedSlot === slot.slotNumber
                    ? 'border-white/60 ring-2 ring-white/30'
                    : 'border-white/25'
                }`}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-white/80 via-[#FF8A91] to-transparent"
                />

                <div className="relative z-10 space-y-5">
                  <div
                    onClick={() => {
                      if (slot.project && onInspectProject) {
                        onInspectProject(slot.project);
                      } else if (onOpenContact) {
                        onOpenContact();
                      }
                    }}
                    className="cursor-pointer"
                  >
                    <ArchitecturalPreviewCanvas
                      project={slot.project}
                      defaultImage={slot.defaultImage}
                      defaultTitle={slot.defaultTitle}
                      previewVariant={slot.previewVariant}
                      slotNumber={slot.slotNumber}
                      isDark={true}
                      heightClass="aspect-[16/9]"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-black tabular-nums text-white">
                        {slot.slotLabel}
                      </span>
                      <span aria-hidden="true" className="text-white/45">
                        ·
                      </span>
                      <span className="font-bold text-white/95">
                        {slot.edition}
                      </span>
                    </div>
                    <Sparkles className="w-4 h-4 text-white/70" />
                  </div>

                  <div className="space-y-2">
                    <h3
                      className="text-xl sm:text-2xl font-black tracking-tight leading-snug text-white"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {slot.project?.name || slot.defaultTitle}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/85">
                      {slot.project?.description || slot.defaultDescription}
                    </p>
                  </div>

                  <SlotBlueprintMeta
                    project={slot.project}
                    defaultStack={slot.defaultStack}
                    isDark={true}
                  />
                </div>

                <div className="relative z-10 pt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-3">
                  {slot.project ? (
                    <div className="flex flex-wrap items-center gap-2.5">
                      {slot.project.liveUrl && (
                        <FlowButton
                          text="Live Demo"
                          href={slot.project.liveUrl}
                          variant="light"
                          compact
                        />
                      )}
                      {slot.project.githubUrl && (
                        <FlowButton
                          text="GitHub"
                          href={slot.project.githubUrl}
                          variant="outline"
                          compact
                        />
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="inline-flex items-center gap-2 text-xs font-semibold text-white/80">
                        <Layers className="w-3.5 h-3.5" />
                        <span>
                          {slot.slotNumber === '03'
                            ? 'Coming Soon'
                            : 'Upcoming Release'}
                        </span>
                      </div>

                      {onOpenContact && (
                        <FlowButton
                          text="Collaborate"
                          onClick={onOpenContact}
                          variant="light"
                          compact
                        />
                      )}
                    </>
                  )}
                </div>
              </InteractiveTiltFrame>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
