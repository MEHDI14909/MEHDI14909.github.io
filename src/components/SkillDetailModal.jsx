import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Check,
  Copy,
  Send,
  ChevronDown,
  Code2,
  Server,
  Layers,
  Sparkles,
} from 'lucide-react';

const EMAIL_ADDRESS = 'syedmehdi.deve@gmail.com';

const GENERAL_QA_TABS = {
  frontend: {
    id: 'frontend',
    label: 'Frontend Developer',
    headline: 'Interactive, Responsive User Interfaces',
    summary:
      'Using React.js and modern JavaScript, I break down interfaces into reusable functional components, manage component lifecycle and state with hooks (useState, useEffect, useRef), and ensure fast, predictable UI rendering.',
    tags: ['React.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'Responsive Design'],
    faqs: [
      {
        q: 'How do you handle HTML & CSS styling and responsive layouts?',
        a: 'I build clean semantic HTML5 paired with Tailwind CSS, modular SCSS partials, Flexbox, and CSS Grid so layouts scale smoothly across mobile phones, tablets, laptops, and desktop displays.',
      },
      {
        q: 'Can you add animations without slowing down the website?',
        a: 'Yes. I animate GPU-composited properties (transform and opacity) with Framer Motion and respect user reduced-motion preferences.',
      },
      {
        q: 'Do you convert UI concepts or templates into custom sites?',
        a: 'Yes, several of my live deployments showcase custom landing pages, e-commerce catalogs, interactive drawers, modals, and sliders tailored to real brand requirements.',
      },
    ],
  },
  backend: {
    id: 'backend',
    label: 'Backend Developer',
    headline: 'Structured APIs & Server Architecture',
    summary:
      'Developing clean server-side endpoints with Node.js and Express.js, organizing modular routers, validating input payloads, and wiring dependable authentication and database layers.',
    tags: ['Node.js', 'Express.js', 'REST APIs', 'JWT & bcrypt'],
    faqs: [
      {
        q: 'How do you organize Express.js servers?',
        a: 'I separate routes, controllers, database config (such as backend/config/db.js), and middleware cleanly so APIs stay easy to maintain and extend.',
      },
      {
        q: 'How do you connect backend APIs with React frontends?',
        a: 'Through structured REST JSON endpoints using Axios or Fetch, CORS configuration, and consistent request/response contracts.',
      },
    ],
  },
  fullstack: {
    id: 'fullstack',
    label: 'Full Stack Developer',
    headline: 'Complete End-to-End MERN & PHP Builds',
    summary:
      'Connecting Vite + React frontends, Node.js/Express REST backends, and MongoDB/MySQL/SQL Server databases into cohesive, production-ready web applications.',
    tags: ['MERN Stack', 'MongoDB & Mongoose', 'PHP & Laravel', 'SQL & NoSQL'],
    faqs: [
      {
        q: 'Which full-stack stacks do you build with?',
        a: 'Primarily MERN (React, Express, Node.js, MongoDB/Mongoose) as well as PHP/Laravel + MySQL and .NET/C# + SQL Server structures.',
      },
      {
        q: 'Can you handle both UI polish and database persistence?',
        a: 'Yes—from interactive forms, validation, and responsive storefronts down to schema modeling and backend routes.',
      },
    ],
  },
};

const TECH_CAPABILITIES = {
  react: {
    id: 'react',
    label: 'React.js',
    badge: 'FRONTEND COMPONENT ARCHITECTURE',
    summary:
      'Building interactive, modern single-page applications (SPAs) with reusable components, state hooks, and fast rendering.',
    tags: ['Single Page Apps (SPA)', 'Dynamic Dashboards', 'Interactive Portals'],
    faqs: [
      {
        q: 'React.js par aap mere liye kya kya bana sakte hain?',
        a: 'Main React.js par modern Single Page Applications (SPAs), dynamic client dashboards, real-time analytics interfaces, multi-step forms, aur interactive e-commerce/business frontends develop kar sakta hoon.',
      },
      {
        q: 'Kya aap custom component libraries aur UI elements bana sakte hain?',
        a: 'Bilkul. Reusable buttons, modals, accordions, cards, aur navigation bars clean Tailwind aur Framer Motion architecture ke sath banata hoon.',
      },
      {
        q: 'React.js mein state management aur performance kaise optimize karte hain?',
        a: 'Clean state lifting, memoization, modular hooks, aur unnecessary re-renders avoid kar ke fast UX maintain kiya jata hai.',
      },
    ],
  },
  javascript: {
    id: 'javascript',
    label: 'JavaScript',
    badge: 'ES6+ CLIENT LOGIC',
    summary:
      'Crafting clean client-side logic, interactive DOM workflows, search/filtering, and reliable asynchronous data handling.',
    tags: ['ES6+ Modern JS', 'Dynamic DOM Manipulation', 'Async Workflows'],
    faqs: [
      {
        q: 'Asynchronous operations aur APIs ko kaise handle karte hain?',
        a: 'Async/await, structured try/catch error boundaries, aur clean loading/empty states ke sath REST endpoints integrate kiye jate hain.',
      },
      {
        q: 'JavaScript code ki quality aur stability kaise ensure karte hain?',
        a: 'Modular functions, input validation, edge-case handling, aur clean separation between UI state aur data logic se.',
      },
    ],
  },
  nodejs: {
    id: 'nodejs',
    label: 'Node.js',
    badge: 'SERVER-SIDE RUNTIME',
    summary:
      'Powering scalable backend services, API servers, environment configurations, and decoupled client-server architectures.',
    tags: ['Backend Services', 'Scalable Runtime', 'API Servers'],
    faqs: [
      {
        q: 'Node.js mein backend services kis tarah structure karte hain?',
        a: 'Decoupled backend/ directory, modular routes, dedicated DB configuration, aur environment-driven settings ke sath.',
      },
      {
        q: 'Server security aur environment variables ko kaise protect karte hain?',
        a: 'Sensitive keys ko .env mein rakha jata hai, CORS policies configure hoti hain, aur bcrypt/JWT se routes secure kiye jate hain.',
      },
    ],
  },
  express: {
    id: 'express',
    label: 'Express.js',
    badge: 'REST API FRAMEWORK',
    summary:
      'Building modular Express.js v5 routers, JSON body parsing, middleware chains, and clean REST endpoints.',
    tags: ['REST Routers', 'Middleware', 'Auth Integration'],
    faqs: [
      {
        q: 'Express.js mein API endpoints aur routing kaise organize karte hain?',
        a: 'Feature-based router modules (jaise /user routes), CORS middleware, aur clean JSON status handling ke sath.',
      },
    ],
  },
  htmlcss: {
    id: 'htmlcss',
    label: 'HTML & CSS',
    badge: 'SEMANTIC MARKUP & STYLING',
    summary:
      'Crafting clean, accessible HTML5 layouts paired with SCSS partials, Flexbox, Grid, and Tailwind CSS v4.',
    tags: ['Semantic HTML5', 'Tailwind CSS v4', 'Modular SCSS'],
    faqs: [
      {
        q: 'HTML & CSS se kis tarah ki styling aur layouts banate hain?',
        a: 'Pixel-clean responsive layouts, editorial typography, custom animations, aur consistent spacing across mobile aur desktop screens.',
      },
    ],
  },
  restapi: {
    id: 'restapi',
    label: 'REST APIs',
    badge: 'API INTEGRATION & TRANSPORT',
    summary:
      'Designing and integrating structured CRUD endpoints with Axios, predictable JSON schemas, and clean error handling.',
    tags: ['CRUD Endpoints', 'Axios Client', 'JSON Contracts'],
    faqs: [
      {
        q: 'Frontend aur backend ke beech data transfer kaise manage hota hai?',
        a: 'Clean HTTP methods (GET, POST, PUT, DELETE), Axios instances, aur validated request payloads ke zariye.',
      },
    ],
  },
  database: {
    id: 'database',
    label: 'Database Management',
    badge: 'DATA PERSISTENCE & QUERIES',
    summary:
      'Connecting servers to SQL and NoSQL databases, structuring clean schemas, and managing dependable CRUD queries.',
    tags: ['Schema Modeling', 'MongoDB & Mongoose', 'Relational SQL'],
    faqs: [
      {
        q: 'Database management aur queries mein aap kya handle karte hain?',
        a: 'Main MongoDB (Mongoose), MySQL, aur SQL Server schemas structure karta hoon aur clean, reliable queries likhta hoon.',
      },
    ],
  },
  responsive: {
    id: 'responsive',
    label: 'Responsive UI',
    badge: 'ADAPTIVE MULTI-SCREEN UI',
    summary:
      'Ensuring websites adapt fluidly across smartphones, tablets, laptops, and widescreen desktops with zero overflow.',
    tags: ['Mobile-First Grid', 'Touch Friendly', 'Zero Overflow'],
    faqs: [
      {
        q: 'Har screen size par design consistent kaise rehta hai?',
        a: 'Fluid CSS grids, responsive breakpoints, flexible image frames, aur proper mobile navigation drawers ke zariye.',
      },
    ],
  },
};

const EXTRA_CAPABILITIES = {
  php: {
    id: 'php',
    label: 'PHP & Laravel',
    badge: 'SERVER-SIDE WEB PLATFORMS',
    summary:
      'Developing structured server-rendered applications, MVC routes, authentication flows, and business portals with PHP & Laravel.',
    tags: ['Laravel MVC', 'Form Processing', 'MySQL Backends'],
    faqs: [
      {
        q: 'PHP / Laravel se kis tarah ke projects ban sakte hain?',
        a: 'Management systems (jaise Gym Management System), e-commerce storefronts, admin panels, aur complete database-backed portals.',
      },
    ],
  },
  dotnet: {
    id: 'dotnet',
    label: '.NET',
    badge: 'STRUCTURED BACKEND PLATFORM',
    summary:
      'Building strongly typed layered applications with clean separation of models, logic, and relational data access.',
    tags: ['.NET Core', 'Layered Architecture', 'Enterprise Apps'],
    faqs: [
      {
        q: '.NET stack mein kya architecture follow karte hain?',
        a: 'Strongly typed models, structured controllers, aur SQL Server integration ke sath clean backend layers.',
      },
    ],
  },
  csharp: {
    id: 'csharp',
    label: 'C#',
    badge: 'OBJECT-ORIENTED LOGIC',
    summary:
      'Applying clean OOP principles, class structures, and strongly typed backend models using C#.',
    tags: ['OOP Principles', 'Clean Models', 'Backend Logic'],
    faqs: [
      {
        q: 'C# ka istemal kis tarah ke work mein hota hai?',
        a: 'Object-oriented backend business logic, structured data models, aur .NET web services mein.',
      },
    ],
  },
  mongodb: {
    id: 'mongodb',
    label: 'MongoDB',
    badge: 'NOSQL DOCUMENT DATABASE',
    summary:
      'Modeling flexible MongoDB collections, Mongoose schemas, validation rules, and aggregation pipelines for MERN applications.',
    tags: ['Mongoose ODM', 'Document Schemas', 'MERN Persistence'],
    faqs: [
      {
        q: 'MongoDB aur Mongoose ko MERN apps mein kis tarah structure karte hain?',
        a: 'Dedicated database connection config (jaise backend/config/db.js), clean Mongoose schemas, referenced relationships, aur CRUD API integration ke sath.',
      },
    ],
  },
  sqlserver: {
    id: 'sqlserver',
    label: 'SQL Server',
    badge: 'RELATIONAL T-SQL STORAGE',
    summary:
      'Structuring relational tables, foreign key relationships, and T-SQL queries for dependable application data.',
    tags: ['T-SQL Queries', 'Relational Tables', 'Constraints'],
    faqs: [
      {
        q: 'SQL Server mein schema aur queries kis tarah manage karte hain?',
        a: 'Proper normalization, primary/foreign keys, joins, aur clean CRUD stored/query flows ke sath.',
      },
    ],
  },
  mysql: {
    id: 'mysql',
    label: 'MySQL',
    badge: 'RELATIONAL WEB DATABASE',
    summary:
      'Designing normalized MySQL schemas for catalogs, user records, orders, and management portals.',
    tags: ['Normalized Schemas', 'Joins & Indexing', 'PHP Integration'],
    faqs: [
      {
        q: 'MySQL kis tarah ke websites ke liye best use karte hain?',
        a: 'PHP/Laravel business dashboards, inventory/e-commerce stores, aur relational reporting systems ke liye.',
      },
    ],
  },
};

export default function SkillDetailModal({
  modalState,
  onClose,
  onOpenContact,
}) {
  const [activeTab, setActiveTab] = useState('react');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!modalState) return;
    if (modalState.mode === 'general') {
      setActiveTab(modalState.activeId || 'frontend');
    } else if (modalState.mode === 'extra') {
      setActiveTab(modalState.activeId || 'php');
    } else {
      setActiveTab(modalState.activeId || 'react');
    }
    setOpenFaqIndex(0);
  }, [modalState]);

  useEffect(() => {
    if (!modalState) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalState, onClose]);

  const handleCopyEmail = async () => {
    let copiedOk = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(EMAIL_ADDRESS);
        copiedOk = true;
      }
    } catch {
      // Fallback below
    }
    if (!copiedOk) {
      try {
        const el = document.createElement('textarea');
        el.value = EMAIL_ADDRESS;
        el.setAttribute('readonly', '');
        el.style.position = 'fixed';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        copiedOk = document.execCommand('copy');
        document.body.removeChild(el);
      } catch {
        copiedOk = false;
      }
    }
    if (copiedOk) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  const isGeneral = modalState?.mode === 'general';
  const isExtra = modalState?.mode === 'extra';
  const mapSource = isGeneral
    ? GENERAL_QA_TABS
    : isExtra
    ? EXTRA_CAPABILITIES
    : TECH_CAPABILITIES;

  const tabItems = Object.values(mapSource);
  const current = mapSource[activeTab] || tabItems[0];

  return (
    <AnimatePresence>
      {modalState && (
        <div
          key="skill-detail-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="capabilities-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm"
          onClick={onClose}
        >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-[28px] bg-[#0B0B0D] text-white border border-white/15 shadow-[0_32px_90px_rgba(0,0,0,0.75)] overflow-hidden"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          <div className="h-1 w-full bg-gradient-to-r from-[#A2090F] via-[#E11D24] to-[#111113] shrink-0" />

          {/* Header */}
          <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-white/10 flex items-start justify-between gap-4 shrink-0">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-[#FF6B73]">
                {isGeneral ? (
                  <Code2 className="w-3.5 h-3.5" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
                <span>
                  {isGeneral
                    ? 'Developer Capabilities & Q&A'
                    : isExtra
                    ? 'Extended Backend & Database Stack'
                    : 'Explore Capabilities by Technology'}
                </span>
              </div>
              <h3
                id="capabilities-modal-title"
                className="text-2xl sm:text-3xl font-black tracking-tight text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                What I Can Build For You
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400">
                {isGeneral
                  ? 'Select a category below to explore developer responsibilities and answers.'
                  : 'Click any technology button below to inspect capabilities and answers.'}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close capabilities modal"
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Tabs Row */}
          <div className="px-6 sm:px-8 py-3.5 border-b border-white/10 bg-white/[0.02] overflow-x-auto shrink-0">
            <div className="flex items-center gap-2 flex-nowrap">
              {tabItems.map((tab) => {
                const isActive = current.id === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id);
                      setOpenFaqIndex(0);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 border ${
                      isActive
                        ? 'bg-white text-[#111113] border-white shadow-sm'
                        : 'bg-white/[0.04] text-zinc-300 border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Scrollable Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-5 grow">
            {/* Active Tech Overview Box */}
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 sm:p-6 space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-[#A2090F]/25 border border-[#A2090F]/40 flex items-center justify-center text-[#FF6B73]">
                  {isGeneral ? (
                    <Layers className="w-4 h-4" />
                  ) : (
                    <Server className="w-4 h-4" />
                  )}
                </span>
                <span
                  className="text-lg sm:text-xl font-extrabold text-white"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {current.label}
                </span>
                {current.badge && (
                  <span className="text-[10px] font-bold tracking-[0.14em] uppercase px-2.5 py-0.5 rounded-full bg-[#A2090F]/30 text-white/90 border border-[#A2090F]/45">
                    {current.badge}
                  </span>
                )}
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed">
                {current.summary}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {current.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs font-semibold text-zinc-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Expandable Q&A Accordions */}
            <div className="space-y-2.5">
              {current.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={faq.q}
                    className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaqIndex((prev) => (prev === idx ? -1 : idx))
                      }
                      className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left text-sm font-bold text-white hover:bg-white/[0.03] transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-white' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-white/8 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="px-6 sm:px-8 py-4 border-t border-white/10 bg-white/[0.02] flex flex-wrap items-center justify-between gap-3 shrink-0">
            <span className="text-xs text-zinc-400">
              Want to build something with{' '}
              <strong className="text-white">{current.label}</strong>?
            </span>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors cursor-pointer whitespace-nowrap"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenContact();
                }}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold bg-[#A2090F] hover:bg-white text-white hover:text-[#111113] transition-colors duration-300 cursor-pointer whitespace-nowrap shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Inquiry</span>
              </button>
            </div>
          </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
