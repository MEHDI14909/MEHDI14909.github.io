import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import {
  ArrowUpRight,
  Server,
  Database,
  Code2,
  X,
  Check,
  FolderGit2,
  Globe,
  Cpu,
} from 'lucide-react';
import { FlowButton } from '@/components/ui/flow-button';
import FutureProjectsShowcase from './FutureProjectsShowcase.jsx';
import {
  PROJECT_CATEGORIES,
  COMPLETED_PROJECTS,
  FULLSTACK_PROJECTS,
  FUTURE_PROJECTS,
} from '../data/projectsData.js';

const editorialEase = [0.22, 1, 0.36, 1];

const smoothHoverTransition = {
  duration: 0.42,
  ease: editorialEase,
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: editorialEase },
  },
};

function LivePreviewTrigger({ project, onInspect }) {
  const sharedClasses =
    'inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wide px-3 py-1.5 rounded-full bg-white/90 text-[#111113] border border-black/10 shadow-[0_6px_18px_rgba(0,0,0,0.22)] backdrop-blur-md hover:bg-neutral-800 hover:text-white hover:border-white/20 active:bg-[#111113] active:text-white active:scale-95 transition-all duration-300 ease-out cursor-pointer select-none whitespace-nowrap';

  if (project.liveUrl) {
    return (
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className={sharedClasses}
      >
        <Globe className="w-3 h-3" />
        <span>Live Preview</span>
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        if (onInspect) onInspect(project);
      }}
      className={sharedClasses}
    >
      <Globe className="w-3 h-3" />
      <span>Live Preview</span>
    </button>
  );
}

function DetailsHoverButton({ label = 'Details', onClick, glass = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group/details relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold overflow-hidden transition-all duration-300 ease-out active:scale-95 cursor-pointer whitespace-nowrap ${
        glass
          ? 'text-white bg-white/[0.1] border border-white/22 hover:text-[#111113] hover:border-white hover:shadow-[0_10px_24px_rgba(0,0,0,0.3)]'
          : 'text-[#111113] bg-neutral-100/90 border border-black/10 hover:text-white hover:border-transparent hover:shadow-[0_10px_24px_rgba(162,9,15,0.35)]'
      }`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 opacity-0 group-hover/details:opacity-100 transition-opacity duration-300 ease-out ${
          glass
            ? 'bg-white'
            : 'bg-gradient-to-r from-[#111113] via-[#7A070B] to-[#A2090F]'
        }`}
      />
      <span className="relative z-10">{label}</span>
      <ArrowUpRight className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover/details:translate-x-0.5 group-hover/details:-translate-y-0.5" />
    </button>
  );
}

function ProjectVisualStage({
  project,
  heightClass = 'aspect-[19/9.2]',
  onInspect,
  showLiveBadge = true,
}) {
  const [primaryErr, setPrimaryErr] = useState(false);
  const [secondaryErr, setSecondaryErr] = useState(false);

  if (project.previewMode === 'architecture-mern' || !project.previewImage || primaryErr) {
    const responsiveHeight = heightClass.includes('16/10')
      ? 'sm:aspect-[16/10] md:aspect-[19/9.2]'
      : 'sm:aspect-[19/9.2]';
    return (
      <div
        className={`relative w-full min-h-[260px] sm:min-h-0 ${responsiveHeight} overflow-hidden rounded-[24px] bg-gradient-to-br ${project.previewAccent} text-white p-4 sm:p-6 flex flex-col justify-between gap-4 border border-white/10`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#A2090F]/35 blur-[70px]"
        />
        <div className="relative flex items-center justify-between text-[11px] font-semibold tracking-[0.18em] uppercase text-zinc-400">
          <span>Full-Stack Architecture</span>
          <span className="tabular-nums text-white/80">MERN</span>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 my-auto py-1 sm:py-3">
          <div className="rounded-2xl bg-white/[0.06] border border-white/12 p-3.5 flex flex-col gap-2">
            <Code2 className="w-4 h-4 text-white/90" />
            <div className="text-xs font-bold text-white">Client</div>
            <div className="text-[11px] text-zinc-400 leading-snug">
              React 19 · Tailwind v4 · Axios
            </div>
          </div>

          <div className="rounded-2xl bg-white/[0.06] border border-white/12 p-3.5 flex flex-col gap-2">
            <Server className="w-4 h-4 text-white/90" />
            <div className="text-xs font-bold text-white">API Server</div>
            <div className="text-[11px] text-zinc-400 leading-snug">
              Node.js · Express v5 · JWT
            </div>
          </div>

          <div className="rounded-2xl bg-white/[0.06] border border-white/12 p-3.5 flex flex-col gap-2">
            <Database className="w-4 h-4 text-white/90" />
            <div className="text-xs font-bold text-white">Database</div>
            <div className="text-[11px] text-zinc-400 leading-snug">
              MongoDB · Mongoose
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-between text-xs text-zinc-400 border-t border-white/10 pt-3">
          {showLiveBadge ? (
            <LivePreviewTrigger project={project} onInspect={onInspect} />
          ) : (
            <span>{project.name}</span>
          )}
          <span>frontend/ + backend/</span>
        </div>
      </div>
    );
  }

  if (project.previewMode === 'jbl-new-style') {
    return (
      <div
        className={`relative w-full ${heightClass} overflow-hidden rounded-[24px] bg-gradient-to-br from-[#0B0B0F] via-[#260D09] to-[#08080A] border border-white/10 p-5 flex items-center justify-center`}
      >
        {/* Subtle studio grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Warm orange-crimson acoustic glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute w-64 h-64 rounded-full bg-gradient-to-tr from-[#FF5500]/45 via-[#E11D24]/35 to-transparent blur-[60px] transition-transform duration-700 ease-out group-hover:scale-125"
        />

        {/* Concentric sound-wave rings */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-[#FF5500]/25 transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-white/10 transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Bold editorial JBL backdrop typography */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute select-none text-[72px] sm:text-[116px] lg:text-[132px] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#FF5500]/80 via-[#E11D24]/45 to-transparent"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          JBL
        </span>

        {/* Real transparent JBL headphones cutout */}
        <img
          src={project.previewImage}
          alt={`${project.name} wireless headphones`}
          referrerPolicy="no-referrer"
          onError={() => setPrimaryErr(true)}
          className="relative z-10 max-h-[88%] max-w-[74%] object-contain drop-shadow-[0_22px_34px_rgba(0,0,0,0.85)] transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-rotate-3 select-none"
        />

        {/* Top floating HUD badges */}
        <div className="pointer-events-none absolute top-3.5 inset-x-3.5 z-20 flex items-center justify-between gap-2">
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#FF8A50] bg-black/55 border border-white/10 px-2.5 py-1 rounded-full backdrop-blur-md">
            Pure Bass Audio
          </span>
          <span className="text-[11px] font-bold text-white bg-white/10 border border-white/15 px-3 py-1 rounded-full backdrop-blur-md tabular-nums">
            $150 · Wireless
          </span>
        </div>

        {/* Bottom equalizer accent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3.5 right-4 z-20 flex items-end gap-1 h-5"
        >
          <span className="w-1 h-2.5 rounded-full bg-[#FF5500]/80 group-hover:h-4 transition-all duration-300" />
          <span className="w-1 h-4 rounded-full bg-[#FF5500] group-hover:h-2.5 transition-all duration-300 delay-75" />
          <span className="w-1 h-3 rounded-full bg-[#E11D24] group-hover:h-5 transition-all duration-300 delay-100" />
          <span className="w-1 h-5 rounded-full bg-[#FF7A45] group-hover:h-3 transition-all duration-300 delay-150" />
          <span className="w-1 h-2 rounded-full bg-[#FF5500]/80 group-hover:h-4 transition-all duration-300 delay-200" />
        </div>

        {showLiveBadge && (
          <div className="absolute bottom-3 left-3 z-20">
            <LivePreviewTrigger project={project} onInspect={onInspect} />
          </div>
        )}
      </div>
    );
  }

  if (project.previewMode === 'screenshot') {
    return (
      <div
        className={`relative w-full ${heightClass} overflow-hidden rounded-[22px] bg-gradient-to-br ${project.previewAccent} ring-1 ring-black/5 flex items-center justify-center`}
        style={
          project.exactBgColor
            ? { backgroundColor: project.exactBgColor }
            : undefined
        }
      >
        {/* Seamless Ambient Edge-Fill when not using exact solid color */}
        {!project.exactBgColor && (
          <img
            src={project.previewImage}
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="pointer-events-none absolute inset-0 w-full h-full object-cover blur-2xl scale-125 opacity-95 select-none"
          />
        )}

        {/* Crisp 100% Uncropped Screenshot with Silky Cinema Zoom */}
        <img
          src={project.previewImage}
          alt={`${project.name} preview`}
          referrerPolicy="no-referrer"
          onError={() => setPrimaryErr(true)}
          style={
            project.trimTopColor
              ? { clipPath: 'inset(4px 0 0 0)' }
              : undefined
          }
          className="relative z-10 w-full h-full object-contain object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035] will-change-transform select-none"
        />

        {/* Delicate inner frame border refinement on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-black/[0.04] group-hover:ring-black/[0.12] transition-all duration-500 z-10"
        />

        {project.trimTopColor && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 inset-x-0 h-[5px] z-10"
            style={{ backgroundColor: project.trimTopColor }}
          />
        )}

        {showLiveBadge && (
          <div className="absolute bottom-3 left-3 z-20">
            <LivePreviewTrigger project={project} onInspect={onInspect} />
          </div>
        )}
      </div>
    );
  }

  // Studio-framed showcase for crisp product/book/food assets without awkward cropping
  return (
    <div
      className={`relative w-full ${heightClass} overflow-hidden rounded-[24px] bg-gradient-to-br ${project.previewAccent} border border-black/10 p-5 sm:p-6 flex items-center justify-center`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.12),transparent_68%)]"
      />
      <div className="relative z-10 flex items-center justify-center gap-4 h-full w-full">
        <img
          src={project.previewImage}
          alt={`${project.name} visual preview`}
          referrerPolicy="no-referrer"
          onError={() => setPrimaryErr(true)}
          className="max-h-full max-w-[78%] object-contain drop-shadow-[0_18px_36px_rgba(0,0,0,0.55)] transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-1 select-none"
        />
        {project.secondaryImage && !secondaryErr && (
          <img
            src={project.secondaryImage}
            alt={`${project.name} secondary preview`}
            referrerPolicy="no-referrer"
            onError={() => setSecondaryErr(true)}
            className="hidden sm:block max-h-[78%] max-w-[34%] object-contain drop-shadow-[0_16px_30px_rgba(0,0,0,0.5)] opacity-90 transition-transform duration-500 ease-out group-hover:translate-x-1.5 group-hover:rotate-2 select-none"
          />
        )}
      </div>
      {showLiveBadge && (
        <div className="absolute bottom-3 left-3 z-20">
          <LivePreviewTrigger project={project} onInspect={onInspect} />
        </div>
      )}
    </div>
  );
}

function AnimatedProjectCard({
  children,
  delay = 0,
  className = '',
  layout = false,
}) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spotlightBg = useMotionTemplate`radial-gradient(480px circle at ${mouseX}px ${mouseY}px, rgba(162, 9, 15, 0.045), transparent 72%)`;

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.article
      ref={cardRef}
      layout={layout}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay, ease: editorialEase },
      }}
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{ y: -6, transition: smoothHoverTransition }}
      className={className}
    >
      {/* Ultra-soft editorial cursor aura */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out z-0"
        style={{ background: spotlightBg }}
      />
      {/* Delicate hairline crimson accent reveal along top edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-10 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#A2090F]/75 to-transparent opacity-0 scale-x-50 group-hover:opacity-100 group-hover:scale-x-100 transition-all duration-500 ease-out z-20"
      />
      {children}
    </motion.article>
  );
}

function FeaturedSpotlightCard({ project, idx, onInspect }) {
  return (
    <AnimatedProjectCard
      delay={idx * 0.08}
      className="group relative rounded-[30px] sm:rounded-[34px] p-4 sm:p-7 lg:p-8 bg-white text-[#111113] border border-white/90 shadow-[0_18px_50px_rgba(0,0,0,0.24)] hover:border-white hover:shadow-[0_28px_72px_rgba(0,0,0,0.36)] transition-[box-shadow,border-color] duration-500 ease-out grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-9 items-center overflow-hidden"
    >
      {/* Responsive Showcase Stage (no scroll overlap on mobile/tablet stacked view) */}
      <div
        onClick={() => onInspect(project)}
        className={`relative z-10 lg:col-span-7 cursor-pointer ${
          idx % 2 === 1 ? 'lg:order-2' : ''
        }`}
      >
        <ProjectVisualStage
          project={project}
          heightClass="aspect-[16/10] sm:aspect-[19/9.2]"
          onInspect={onInspect}
        />
      </div>

        {/* Editorial Details */}
        <div
          className={`relative z-10 lg:col-span-5 space-y-4 ${
            idx % 2 === 1 ? 'lg:order-1' : ''
          }`}
        >
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-neutral-500">
          <span className="font-black text-[#111113] group-hover:text-[#A2090F] transition-colors duration-300 tabular-nums">
            {project.index}
          </span>
          <span aria-hidden="true">·</span>
          <span className="text-[#A2090F] font-bold">Priority Highlight</span>
          <span aria-hidden="true">·</span>
          <span>{project.purpose}</span>
        </div>

        <div>
          <h3
            onClick={() => onInspect(project)}
            className="text-2xl sm:text-3xl font-black tracking-tight text-[#111113] group-hover:text-[#A2090F] transition-colors duration-300 cursor-pointer text-balance"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {project.name}
          </h3>
          <p className="mt-2.5 text-sm sm:text-base text-neutral-700 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Clean Unboxed Stack Breakdown */}
        <div className="pt-3 border-t border-black/10 space-y-2 text-xs">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="font-bold uppercase tracking-[0.14em] text-neutral-500">
              Frontend:
            </span>
            <span className="font-semibold text-[#111113]">
              {project.frontendStack.join(' · ')}
            </span>
          </div>
          {project.backendStack.length > 0 && (
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="font-bold uppercase tracking-[0.14em] text-neutral-500">
                Backend:
              </span>
              <span className="font-semibold text-[#111113]">
                {project.backendStack.join(' · ')}
              </span>
            </div>
          )}
          {project.databaseStack.length > 0 && (
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="font-bold uppercase tracking-[0.14em] text-neutral-500">
                Database:
              </span>
              <span className="font-semibold text-[#111113]">
                {project.databaseStack.join(' · ')}
              </span>
            </div>
          )}
        </div>

        {/* Verified Features */}
        <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-700">
          {project.features.slice(0, 3).map((feat) => (
            <li key={feat} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#A2090F] shrink-0 mt-0.5" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>

        {/* Action Buttons using FlowButton */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          {project.liveUrl && (
            <FlowButton
              text="Live Demo"
              href={project.liveUrl}
              variant="dark"
              compact
            />
          )}
          <FlowButton
            text="GitHub Repo"
            href={project.githubUrl}
            variant="ink"
            compact
          />
          <DetailsHoverButton
            label="Inspect Details"
            onClick={() => onInspect(project)}
          />
        </div>
        </div>
    </AnimatedProjectCard>
  );
}

export default function ProjectsSection({ onOpenContact }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredProjects = COMPLETED_PROJECTS.filter((project) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'featured') return project.isPriority;
    return project.category === activeCategory;
  });

  // Top 2 priority editorial spotlights when showing All or Priority Picks
  const showSpotlightPair =
    activeCategory === 'all' || activeCategory === 'featured';
  const spotlightProjects = showSpotlightPair
    ? filteredProjects.filter((p) => p.priorityRank <= 2)
    : [];
  const gridProjects = showSpotlightPair
    ? filteredProjects.filter((p) => p.priorityRank > 2)
    : filteredProjects;

  const scrollToBlock = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative z-10 w-full bg-transparent text-white border-t border-white/25 overflow-hidden scroll-mt-16"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 pt-14 sm:pt-16 lg:pt-20 pb-20 sm:pb-24">
        {/* SECTION HEADER */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 sm:pb-12 border-b border-white/25"
        >
          <div className="space-y-3 sm:space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-white/95">
              <FolderGit2 className="w-4 h-4 shrink-0 text-white" />
              <span>Projects Showcase</span>
              <span aria-hidden="true" className="h-px w-8 bg-white/50" />
            </div>

            <h2
              id="projects-heading"
              className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.04] text-balance drop-shadow-sm"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              SELECTED WEB{' '}
              <span className="text-white/90 underline decoration-white/40 decoration-2 underline-offset-8">
                PROJECTS
              </span>
            </h2>

            <p className="text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
              A curated collection of responsive websites, interactive stores,
              product showcases, and full-stack engineering built and deployed
              across real repositories.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-white/85 tabular-nums">
              <span>10 Verified Builds</span>
              <span aria-hidden="true">·</span>
              <span>9 Live Deployments</span>
              <span aria-hidden="true">·</span>
              <span>1 MERN Architecture</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <FlowButton
              text="MERN Stack"
              onClick={() => scrollToBlock('mern-projects')}
              variant="light"
            />
            <FlowButton
              text="Future Slots"
              onClick={() => scrollToBlock('future-projects')}
              variant="outline"
            />
          </div>
        </motion.div>

        {/* SECTION A — COMPLETED PROJECTS HEADER & FILTER BAR */}
        <div className="mt-12 sm:mt-14 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
            <div className="space-y-1.5">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/85">
                Section A · Portfolio Builds
              </p>
              <h2
                className="text-2xl sm:text-4xl font-black tracking-tight text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Completed Projects
              </h2>
            </div>

            {/* Responsive Multi-Screen Category Filter Bar (Smoked Translucent Glass) */}
            <div className="w-full lg:w-auto self-start lg:self-auto">
              <div className="flex flex-wrap items-center gap-1 p-1.5 rounded-2xl xl:rounded-full bg-black/25 backdrop-blur-xl text-white border border-white/20 shadow-[0_14px_34px_rgba(0,0,0,0.22)]">
                {PROJECT_CATEGORIES.map((tab) => {
                  const isActive = activeCategory === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setActiveCategory(tab.key)}
                      className={`relative px-3.5 sm:px-4 py-2 rounded-xl xl:rounded-full text-xs font-bold tracking-wide transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0 z-10 ${
                        isActive
                          ? 'text-[#111113]'
                          : 'text-white/80 hover:text-white hover:bg-white/[0.08]'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="projects-filter-pill"
                          transition={{
                            type: 'spring',
                            stiffness: 340,
                            damping: 30,
                          }}
                          className="absolute inset-0 rounded-xl xl:rounded-full bg-white shadow-sm -z-10"
                        />
                      )}
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* PRIORITY EDITORIAL SPOTLIGHT CARDS */}
          {spotlightProjects.length > 0 && (
            <div className="space-y-6">
              {spotlightProjects.map((project, idx) => (
                <FeaturedSpotlightCard
                  key={project.id}
                  project={project}
                  idx={idx}
                  onInspect={setSelectedProject}
                />
              ))}
            </div>
          )}

          {/* REMAINING COMPLETED PROJECTS GRID — Crisp White Cards (MERN/React stays rich Red) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7">
            {gridProjects.map((project, idx) => {
              const isRedProject =
                project.isFullStack || project.id === 'mind_games';

              return (
                <AnimatedProjectCard
                  key={project.id}
                  layout="position"
                  delay={(idx % 2) * 0.08}
                  className={`group relative rounded-[32px] p-4 sm:p-6 transition-[box-shadow,border-color] duration-500 ease-out flex flex-col justify-between gap-5 overflow-hidden ${
                    isRedProject
                      ? 'bg-gradient-to-br from-[#B50B12] via-[#8E070C] to-[#5A0407] text-white border border-white/25 hover:border-white/45 shadow-[0_18px_50px_rgba(0,0,0,0.28)] hover:shadow-[0_28px_72px_rgba(0,0,0,0.42)]'
                      : 'bg-white text-[#111113] border border-white/90 hover:border-white shadow-[0_18px_50px_rgba(0,0,0,0.24)] hover:shadow-[0_28px_72px_rgba(0,0,0,0.36)]'
                  }`}
                >
                  <div className="relative z-10 space-y-5">
                    <div
                      onClick={() => setSelectedProject(project)}
                      className="cursor-pointer"
                    >
                      <ProjectVisualStage
                        project={project}
                        heightClass="aspect-[19/9.2]"
                        onInspect={setSelectedProject}
                      />
                    </div>

                    {/* Clean Unboxed Metadata Line */}
                    <div
                      className={`flex flex-wrap items-center justify-between gap-2 text-xs ${
                        isRedProject ? 'text-white/75' : 'text-neutral-500'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-black tabular-nums ${
                            isRedProject ? 'text-white' : 'text-[#111113]'
                          }`}
                        >
                          {project.index}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span
                          className={`font-semibold ${
                            isRedProject ? 'text-white/90' : 'text-neutral-700'
                          }`}
                        >
                          {project.purpose}
                        </span>
                      </div>
                      {project.isPriority && (
                        <span
                          className={`font-bold ${
                            isRedProject ? 'text-white' : 'text-[#A2090F]'
                          }`}
                        >
                          Priority
                        </span>
                      )}
                    </div>

                    <div>
                      <h3
                        onClick={() => setSelectedProject(project)}
                        className={`text-xl sm:text-2xl font-black tracking-tight transition-colors duration-300 cursor-pointer ${
                          isRedProject
                            ? 'text-white group-hover:text-white/90'
                            : 'text-[#111113] group-hover:text-[#A2090F]'
                        }`}
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {project.name}
                      </h3>
                      <p
                        className={`mt-2 text-sm leading-relaxed ${
                          isRedProject ? 'text-white/85' : 'text-neutral-700'
                        }`}
                      >
                        {project.description}
                      </p>
                    </div>

                    {/* Clean Stack Separation */}
                    <div
                      className={`pt-3 border-t space-y-1.5 text-xs ${
                        isRedProject ? 'border-white/15' : 'border-black/10'
                      }`}
                    >
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <span
                          className={`font-bold uppercase tracking-[0.14em] ${
                            isRedProject ? 'text-white/65' : 'text-neutral-500'
                          }`}
                        >
                          Frontend:
                        </span>
                        <span
                          className={`font-semibold ${
                            isRedProject ? 'text-white' : 'text-[#111113]'
                          }`}
                        >
                          {project.frontendStack.join(' · ')}
                        </span>
                      </div>
                      {project.backendStack.length > 0 && (
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                          <span
                            className={`font-bold uppercase tracking-[0.14em] ${
                              isRedProject ? 'text-white/65' : 'text-neutral-500'
                            }`}
                          >
                            Backend:
                          </span>
                          <span
                            className={`font-semibold ${
                              isRedProject ? 'text-white' : 'text-[#111113]'
                            }`}
                          >
                            {project.backendStack.join(' · ')}
                          </span>
                        </div>
                      )}
                      {project.databaseStack.length > 0 && (
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                          <span
                            className={`font-bold uppercase tracking-[0.14em] ${
                              isRedProject ? 'text-white/65' : 'text-neutral-500'
                            }`}
                          >
                            Database:
                          </span>
                          <span
                            className={`font-semibold ${
                              isRedProject ? 'text-white' : 'text-[#111113]'
                            }`}
                          >
                            {project.databaseStack.join(' · ')}
                          </span>
                        </div>
                      )}
                    </div>

                    <ul
                      className={`space-y-1 text-xs ${
                        isRedProject ? 'text-white/85' : 'text-neutral-700'
                      }`}
                    >
                      {project.features.slice(0, 2).map((feat) => (
                        <li key={feat} className="flex items-start gap-2">
                          <Check
                            className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                              isRedProject ? 'text-white' : 'text-[#A2090F]'
                            }`}
                          />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Working Action Row */}
                  <div
                    className={`relative z-10 pt-3 border-t flex flex-wrap items-center justify-between gap-2.5 ${
                      isRedProject ? 'border-white/15' : 'border-black/10'
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2.5">
                      {project.liveUrl && (
                        <FlowButton
                          text="Live Demo"
                          href={project.liveUrl}
                          variant={isRedProject ? 'light' : 'dark'}
                          compact
                        />
                      )}
                      <FlowButton
                        text="GitHub"
                        href={project.githubUrl}
                        variant={isRedProject ? 'outline' : 'ink'}
                        compact
                      />
                    </div>
                    <DetailsHoverButton
                      label="Details"
                      glass={isRedProject}
                      onClick={() => setSelectedProject(project)}
                    />
                  </div>
                </AnimatedProjectCard>
              );
            })}
          </div>
        </div>

        {/* SECTION B — MERN STACK / FULL-STACK PROJECTS (Rich Crimson Red Centerpiece) */}
        <div
          id="mern-projects"
          className="scroll-mt-16 mt-20 sm:mt-24 pt-12 border-t border-white/25 space-y-8"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <div className="space-y-1.5">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/85">
                Section B · Client, Server &amp; Database Engineering
              </p>
              <h2
                className="text-2xl sm:text-4xl font-black tracking-tight text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                MERN Stack &amp; Full-Stack Projects
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-white/90 max-w-md">
              Projects genuinely structured with decoupled React frontends,
              Node.js/Express REST backends, and MongoDB database layers.
            </p>
          </motion.div>

          {FULLSTACK_PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: editorialEase },
              }}
              viewport={{ once: true, amount: 0.15 }}
              whileHover={{ y: -5, transition: smoothHoverTransition }}
              className="group relative rounded-[36px] bg-gradient-to-br from-[#B50B12] via-[#8E070C] to-[#5A0407] text-white border border-white/25 hover:border-white/45 overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.38)] hover:shadow-[0_32px_80px_rgba(0,0,0,0.5)] transition-[box-shadow,border-color] duration-500 ease-out"
            >
              <div className="h-1 w-full bg-gradient-to-r from-white/80 via-[#FF8A91] to-transparent" />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/[0.12] blur-[100px] transition-transform duration-700 ease-out group-hover:scale-110"
              />

              <div className="relative p-5 sm:p-8 lg:p-10 space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-9 items-center">
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-white/75">
                      <Cpu className="w-4 h-4 text-white" />
                      <span className="text-white font-bold">MERN Stack</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.purpose}</span>
                    </div>
                    <h3
                      className="text-2xl sm:text-4xl font-black tracking-tight text-white"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {project.name}
                    </h3>
                    <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <FlowButton
                        text="Inspect Stack"
                        onClick={() => setSelectedProject(project)}
                        variant="light"
                      />
                      <FlowButton
                        text="GitHub Repo"
                        href={project.githubUrl}
                        variant="outline"
                      />
                    </div>
                  </div>

                  <div
                    onClick={() => setSelectedProject(project)}
                    className="lg:col-span-7 group cursor-pointer"
                  >
                    <ProjectVisualStage
                      project={project}
                      heightClass="aspect-[19/9.2]"
                      onInspect={setSelectedProject}
                    />
                  </div>
                </div>

                {/* Strict 3-Column Separation: Frontend / Backend / Database */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-6 border-t border-white/20">
                  <div className="rounded-2xl bg-black/22 backdrop-blur-md border border-white/20 p-5 space-y-3">
                    <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.16em] text-white/75">
                      <Code2 className="w-4 h-4 text-white" />
                      <span>01. Frontend</span>
                    </div>
                    <p className="text-sm font-bold text-white leading-relaxed">
                      {project.frontendStack.join(' · ')}
                    </p>
                    <p className="text-xs text-white/80 leading-relaxed">
                      Vite-bundled React 19 client inside frontend/ with routing
                      and Axios API transport.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-black/22 backdrop-blur-md border border-white/20 p-5 space-y-3">
                    <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.16em] text-white/75">
                      <Server className="w-4 h-4 text-white" />
                      <span>02. Backend</span>
                    </div>
                    <p className="text-sm font-bold text-white leading-relaxed">
                      {project.backendStack.join(' · ')}
                    </p>
                    <p className="text-xs text-white/80 leading-relaxed">
                      Express v5 server (backend/server.js) with CORS, JSON
                      parsing, /user router, JWT &amp; bcrypt dependencies.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-black/22 backdrop-blur-md border border-white/20 p-5 space-y-3">
                    <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.16em] text-white/75">
                      <Database className="w-4 h-4 text-white" />
                      <span>03. Database</span>
                    </div>
                    <p className="text-sm font-bold text-white leading-relaxed">
                      {project.databaseStack.join(' · ')}
                    </p>
                    <p className="text-xs text-white/80 leading-relaxed">
                      Dedicated Mongoose connection layer inside
                      backend/config/db.js for MongoDB persistence.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SECTION C — FUTURE PROJECTS (Art-Directed 3-Slot Exhibition Showcase) */}
        <FutureProjectsShowcase
          projects={FUTURE_PROJECTS}
          onOpenContact={onOpenContact}
          onInspectProject={setSelectedProject}
        />
      </div>

      {/* PROJECT DETAIL & PREVIEW LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
              className="bg-white text-[#111113] rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl relative border border-black/10 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-[#111113] via-[#A2090F] to-[#111113] shrink-0" />

              <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-black/10 flex items-start justify-between gap-4 shrink-0">
                <div>
                  <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#A2090F] mb-1">
                    Project {selectedProject.index} · {selectedProject.purpose}
                  </p>
                  <h3
                    id="modal-project-title"
                    className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111113]"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {selectedProject.name}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="text-neutral-500 hover:text-black hover:bg-neutral-100 rounded-full p-2 transition-colors cursor-pointer shrink-0"
                  aria-label="Close project preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 grow">
                <ProjectVisualStage
                  project={selectedProject}
                  heightClass="aspect-[19/9.2]"
                  showLiveBadge={false}
                />

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
                    Overview
                  </h4>
                  <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                    {selectedProject.description}
                  </p>
                  <p className="text-xs text-neutral-500">
                    Implementation Note: {selectedProject.developmentNote}
                  </p>
                </div>

                {/* Technology Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-black/10">
                  <div className="p-4 rounded-2xl bg-[#F8F8FA] border border-black/10 space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-500">
                      Frontend
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-[#111113] leading-relaxed">
                      {selectedProject.frontendStack.join(' · ')}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F8F8FA] border border-black/10 space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-500">
                      Backend
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-[#111113] leading-relaxed">
                      {selectedProject.backendStack.length > 0
                        ? selectedProject.backendStack.join(' · ')
                        : 'Frontend-only static build'}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F8F8FA] border border-black/10 space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-500">
                      Database
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-[#111113] leading-relaxed">
                      {selectedProject.databaseStack.length > 0
                        ? selectedProject.databaseStack.join(' · ')
                        : 'No external database'}
                    </div>
                  </div>
                </div>

                {/* Key Features */}
                <div className="space-y-2.5 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
                    Verified Key Features
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-neutral-700">
                    {selectedProject.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2 p-3 rounded-xl bg-[#F8F8FA] border border-black/8"
                      >
                        <Check className="w-4 h-4 text-[#A2090F] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="px-6 sm:px-8 py-4 border-t border-black/10 bg-[#F8F8FA] flex flex-wrap items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2 text-xs text-neutral-600">
                  <Globe className="w-4 h-4 text-neutral-500" />
                  <span>
                    {selectedProject.liveUrl
                      ? 'Live deployment available'
                      : 'Source repository available on GitHub'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  {selectedProject.liveUrl && (
                    <FlowButton
                      text="Open Live Demo"
                      href={selectedProject.liveUrl}
                      variant="dark"
                      compact
                    />
                  )}
                  <FlowButton
                    text="View on GitHub"
                    href={selectedProject.githubUrl}
                    variant="ink"
                    compact
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
