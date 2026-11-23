import React, { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  Sparkles,
  User,
  MapPin,
  Code2,
  Cpu,
  Compass,
  Quote,
  Target,
  GraduationCap,
} from 'lucide-react';
import { FlowButton } from '@/components/ui/flow-button';
import { ProfileCard } from '@/components/ui/profile-card';
import { RoadmapCard } from '@/components/ui/roadmap-card';

const PORTRAIT_IMAGE_SRC =
  '/assets/aistudio/WhatsApp_Image_2026-11-16_at_11.16.06_AM_6bb5095f.jpeg';

const PERSONAL_INFO_ITEMS = [
  {
    label: 'Name',
    value: 'Syed Mehdi',
    icon: User,
  },
  {
    label: 'Location',
    value: 'Karachi, Pakistan',
    icon: MapPin,
  },
  {
    label: 'Current Focus',
    value: 'Web Development',
    icon: Code2,
  },
  {
    label: 'Professional Interest',
    value: 'Software Engineering',
    icon: Cpu,
  },
  {
    label: 'Mindset',
    value: 'Creativity and Continuous Learning',
    icon: Compass,
  },
];

const BRAND_PILLARS = [
  {
    index: '01',
    label: 'Mindset',
    text: 'Stay curious, embrace challenges, and never stop learning.',
  },
  {
    index: '02',
    label: 'Craft',
    text: 'Focus on the details, build with intention, and turn ideas into meaningful experiences.',
  },
  {
    index: '03',
    label: 'Perspective Beyond Syntax',
    text: "Code is more than just syntax. It's a way to solve problems, express creativity, and create experiences that connect with people.",
  },
];

const DRIVING_QUALITIES = [
  {
    index: '01',
    title: 'Curiosity',
    statement: 'Always exploring new ideas, technologies, and possibilities.',
  },
  {
    index: '02',
    title: 'Creativity',
    statement: 'Turning imagination into meaningful digital experiences.',
  },
  {
    index: '03',
    title: 'Attention to Detail',
    statement: 'Believing that the smallest details can make the biggest difference.',
  },
];

// Grouped related themes into two distinct, non-overlapping cards
const BEYOND_THE_SCREEN_ITEMS = [
  {
    index: '01',
    title: 'Creative Problem-Solving & Design',
    description:
      'Finding inspiration in thoughtful visual design, creative thinking, and discovering human-centered ways to turn complex challenges into intuitive experiences.',
  },
  {
    index: '02',
    title: 'Curiosity, Innovation & Continuous Growth',
    description:
      'Exploring emerging technology, sharpening my craft every day, and imagining how modern digital experiences can evolve next.',
  },
];

const EDUCATION_ROADMAP_ITEMS = [
  {
    quarter: 'Academic Foundation',
    title: 'Aptech — ADSE',
    description:
      'Formal software engineering diploma track covering structured programming, application logic, and database fundamentals.',
    status: 'in-progress',
  },
  {
    quarter: 'Current Direction',
    title: 'Full-Stack Development',
    description:
      'Learning end-to-end web architecture and applying concepts by building practical client, API, and database applications.',
    status: 'in-progress',
  },
  {
    quarter: 'Career Destination',
    title: 'Software Engineer',
    description:
      'Long-term engineering goal focused on designing reliable, scalable, and maintainable software systems.',
    status: 'upcoming',
  },
];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

const instantHoverSpring = {
  type: 'spring',
  stiffness: 200,
  damping: 24,
  delay: 0,
};

const instantTap = {
  duration: 0.16,
  delay: 0,
};

export default function AboutMe({ onOpenContact }) {
  const storySectionRef = useRef(null);
  const { scrollYProgress: storyScrollProgress } = useScroll({
    target: storySectionRef,
    offset: ['start end', 'center center'],
  });
  const storyScale = useTransform(storyScrollProgress, [0, 1], [0.985, 1]);
  const storyOpacity = useTransform(storyScrollProgress, [0, 0.4, 1], [0.75, 0.95, 1]);

  const storyMouseX = useMotionValue(0);
  const storyMouseY = useMotionValue(0);
  const storySpotlight = useMotionTemplate`radial-gradient(420px circle at ${storyMouseX}px ${storyMouseY}px, rgba(17, 17, 19, 0.065), rgba(17, 17, 19, 0.02) 45%, transparent 72%)`;

  const handleStoryMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    storyMouseX.set(e.clientX - rect.left);
    storyMouseY.set(e.clientY - rect.top);
  };

  const handleDiscoverStory = () => {
    const storyEl = document.getElementById('personal-story');
    if (storyEl) {
      storyEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollToSkills = () => {
    const skillsEl = document.getElementById('skills');
    if (skillsEl) {
      skillsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative z-10 w-full bg-transparent text-white overflow-hidden scroll-mt-16 border-t border-white/25"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 pt-14 sm:pt-16 lg:pt-20 pb-20 sm:pb-24">
        {/* SECTION HEADER */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpVariants}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 sm:pb-12 border-b border-white/25"
        >
          <div className="space-y-3 sm:space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-white/95">
              <Sparkles className="w-4 h-4 shrink-0 text-white" />
              <span>About Me</span>
              <span aria-hidden="true" className="h-px w-8 bg-white/50" />
            </div>

            <h2
              id="about-heading"
              className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.02] text-balance drop-shadow-sm"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              THE HUMAN BEHIND{' '}
              <span className="text-white/90 underline decoration-white/40 decoration-2 underline-offset-8">
                THE CODE
              </span>
            </h2>

            <p className="text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
              Curiosity, creativity, and deliberate craft—shaped by a vision to
              build experiences people genuinely remember.
            </p>
          </div>

          <div className="shrink-0">
            <FlowButton
              text="Discover My Story"
              onClick={handleDiscoverStory}
              variant="light"
            />
          </div>
        </motion.div>

        {/* TOP INTRO ROW: White ProfileCard + White Animated Personal Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pt-12 sm:pt-14 items-center">
          {/* Profile Card Column */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <ProfileCard
              imageSrc={PORTRAIT_IMAGE_SRC}
              name="Syed Mehdi"
              handle="syedmehdi.deve@gmail.com"
              subtitle="Web Developer · Karachi"
              actionLabel="Connect"
              onAction={onOpenContact}
            />
          </motion.div>

          {/* Frosted Translucent Glass Personal Information Cards */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PERSONAL_INFO_ITEMS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.35, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] },
                    }}
                    viewport={{ once: true, amount: 0.2 }}
                    whileHover={{ y: -6, scale: 1.02, transition: instantHoverSpring }}
                    className={`group rounded-[26px] p-5 bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-xl text-white border border-white/22 hover:border-white/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_14px_34px_rgba(0,0,0,0.2)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_20px_48px_rgba(0,0,0,0.32)] transition-[background-color,border-color,box-shadow] duration-300 ease-out cursor-default ${
                      idx === PERSONAL_INFO_ITEMS.length - 1
                        ? 'sm:col-span-2'
                        : ''
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2.5">
                      <span className="w-9 h-9 rounded-full bg-white/[0.12] border border-white/20 text-white flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-[#111113] group-hover:scale-110 transition-all duration-300 ease-out">
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/70 group-hover:text-white transition-colors duration-300 ease-out">
                        {item.label}
                      </span>
                    </div>
                    <p
                      className="text-base font-bold text-white leading-snug transition-colors duration-300 ease-out"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {item.value}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* PERSONAL STORY (#personal-story) — Clean Black/White Aesthetic + Instant Interactive Hover */}
        <motion.div
          ref={storySectionRef}
          id="personal-story"
          style={{ scale: storyScale, opacity: storyOpacity }}
          className="scroll-mt-20 mt-12 sm:mt-16"
        >
          <motion.div
            onMouseMove={handleStoryMouseMove}
            whileHover={{ y: -6, scale: 1.012, transition: instantHoverSpring }}
            className="group relative rounded-[32px] bg-white text-[#111113] border border-white/80 overflow-hidden shadow-[0_18px_48px_rgba(0,0,0,0.24)] hover:border-black/35 hover:shadow-[0_28px_72px_rgba(0,0,0,0.42)] transition-[border-color,box-shadow] duration-300 ease-out cursor-default"
          >
            {/* Interactive Cursor-Following Neutral Spotlight */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: storySpotlight }}
            />

            {/* Sleek Top Accent Bar (Black) */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: 0 }}
              className="h-1.5 w-full bg-[#111113]"
            />

            <div className="relative p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-4 space-y-3 transition-transform duration-300 ease-out group-hover:translate-x-1"
              >
                <div className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.2em] uppercase text-[#A2090F]">
                  <span aria-hidden="true" className="h-px w-6 bg-[#A2090F]" />
                  <span>Personal Story</span>
                </div>
                <h3
                  className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111113] leading-tight"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  The Beginning of My Journey
                </h3>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-8 relative pt-5 border-t border-neutral-200 lg:pt-0 lg:border-t-0 lg:pl-6 lg:border-l-2 group-hover:border-[#111113] transition-colors duration-300 ease-out"
              >
                <p className="text-base sm:text-lg lg:text-xl text-neutral-800 group-hover:text-[#111113] leading-relaxed font-medium transition-colors duration-300 ease-out">
                  “It all started with curiosity. One day, I discovered how a
                  simple line of code could bring an idea to life, and that moment
                  sparked my passion for web development. Since then, I&apos;ve
                  been exploring, learning, and building with a dream of becoming
                  a Software Engineer.”
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* MINDSET, CRAFT & PERSPECTIVE BEYOND SYNTAX — Smoked Translucent Glass Cards */}
        <div className="mt-12 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {BRAND_PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, y: 22, scale: 0.97 }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] },
              }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -7, scale: 1.02, transition: instantHoverSpring }}
              className="group rounded-[30px] p-6 sm:p-7 bg-black/26 hover:bg-black/38 backdrop-blur-xl text-white border border-white/16 hover:border-white/38 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_16px_40px_rgba(0,0,0,0.24)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_24px_56px_rgba(0,0,0,0.38)] transition-[background-color,border-color,box-shadow] duration-300 ease-out flex flex-col justify-between cursor-default"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/12 border border-white/20 text-xs font-black tabular-nums text-white group-hover:bg-white group-hover:text-[#111113] group-hover:scale-110 transition-all duration-300 ease-out">
                    {pillar.index}
                  </span>
                  <Compass className="w-4 h-4 text-white/45 group-hover:text-white transition-colors duration-300 ease-out" />
                </div>
                <p className="text-xs font-bold tracking-[0.18em] uppercase text-white/90 mb-2.5">
                  {pillar.label}
                </p>
                <p className="text-sm sm:text-base text-white/75 group-hover:text-white/95 leading-relaxed font-medium transition-colors duration-300">
                  {pillar.text}
                </p>
              </div>
              <div className="mt-6 h-0.5 w-10 bg-white/20 group-hover:w-full group-hover:bg-white transition-all duration-200 ease-out" />
            </motion.div>
          ))}
        </div>

        {/* PERSONAL PHILOSOPHY — Translucent Obsidian Glass Centerpiece Card */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
          }}
          viewport={{ once: true, amount: 0.2 }}
          whileHover={{ y: -5, scale: 1.01, transition: instantHoverSpring }}
          whileTap={{ scale: 0.99, transition: instantTap }}
          className="relative mt-12 sm:mt-14 rounded-[32px] bg-black/50 backdrop-blur-2xl text-white border border-white/18 overflow-hidden shadow-[0_22px_60px_rgba(0,0,0,0.42)] hover:shadow-[0_28px_72px_rgba(0,0,0,0.58)] transition-shadow duration-300"
        >
          <div className="h-1 w-full bg-gradient-to-r from-white/45 via-white/15 to-transparent" />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/[0.06] blur-[95px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-white/[0.04] blur-[90px]"
          />

          <div className="relative p-7 sm:p-10 lg:p-12 flex flex-col gap-5">
            <div className="flex items-center gap-2.5 text-xs font-bold tracking-[0.22em] uppercase text-zinc-400">
              <span className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center">
                <Quote className="w-3.5 h-3.5 text-white" />
              </span>
              <span>Personal Philosophy</span>
            </div>

            <blockquote
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-extrabold tracking-tight text-white leading-[1.18] max-w-4xl text-balance"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              “I don&apos;t just build websites. I care about the experiences
              people remember.”
            </blockquote>
          </div>
        </motion.div>

        {/* WHAT DRIVES ME — Frosted Light-Glass Cards */}
        <div className="mt-14 sm:mt-16 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/85 mb-1.5">
                Core Principles
              </p>
              <h3
                className="text-2xl sm:text-3xl font-black tracking-tight text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                What Drives Me
              </h3>
            </div>
            <span className="text-xs text-white/85">
              Three values behind every build
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {DRIVING_QUALITIES.map((item, idx) => (
              <motion.div
                key={item.index}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] },
                }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -8, scale: 1.02, transition: instantHoverSpring }}
                className="group rounded-[30px] p-6 sm:p-7 bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-xl text-white border border-white/20 hover:border-white/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_14px_34px_rgba(0,0,0,0.2)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_22px_52px_rgba(0,0,0,0.34)] transition-[background-color,border-color,box-shadow] duration-300 cursor-default"
              >
                <div
                  className="w-12 h-12 rounded-full bg-white/[0.12] border border-white/25 flex items-center justify-center text-base font-black tabular-nums text-white mb-5 group-hover:bg-white group-hover:text-[#111113] group-hover:border-white group-hover:scale-110 transition-all duration-300 ease-out"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {item.index}
                </div>
                <h4
                  className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {item.title}
                </h4>
                <p className="text-sm text-white/75 group-hover:text-white/95 leading-relaxed transition-colors duration-300">
                  {item.statement}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* BEYOND THE SCREEN — Grouped Non-Repetitive White Cards */}
        <div className="mt-14 sm:mt-16 pt-12 border-t border-white/25 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUpVariants}
            className="lg:col-span-4 space-y-3"
          >
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/85">
              Outside The Editor
            </p>
            <h3
              className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Beyond the Screen
            </h3>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              The creative habits and curiosity that keep my perspective fresh
              and fuel how I approach building meaningful experiences.
            </p>
          </motion.div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BEYOND_THE_SCREEN_ITEMS.map((item, idx) => (
              <motion.div
                key={item.index}
                initial={{ opacity: 0, y: 22, scale: 0.96 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] },
                }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -7, scale: 1.025, transition: instantHoverSpring }}
                className="group rounded-[32px] p-6 sm:p-7 bg-white text-[#111113] border border-white/80 shadow-[0_14px_38px_rgba(0,0,0,0.22)] hover:shadow-[0_22px_54px_rgba(0,0,0,0.34)] transition-shadow duration-300 cursor-default"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-xs font-bold tracking-wider text-[#111113] tabular-nums group-hover:bg-[#111113] group-hover:text-white transition-all duration-300 ease-out">
                    {item.index}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 group-hover:bg-[#111113] group-hover:text-white group-hover:rotate-12 transition-all duration-300 ease-out">
                    <Sparkles className="w-4 h-4" />
                  </span>
                </div>
                <h4
                  className="text-base sm:text-lg font-bold text-[#111113] tracking-tight mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* EDUCATION & TRAJECTORY (#education) — Horizontal RoadmapCard */}
        <div
          id="education"
          aria-labelledby="education-heading"
          className="scroll-mt-20 mt-14 sm:mt-16 pt-12 border-t border-white/25 space-y-5"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-white/90">
            <GraduationCap className="w-4 h-4 shrink-0 text-white" />
            <span id="education-heading">Education &amp; Trajectory</span>
            <span aria-hidden="true" className="h-px w-8 bg-white/45" />
          </div>

          <RoadmapCard
            title="Academic Foundation & Engineering Path"
            description="Verified education paired with practical full-stack learning toward Software Engineering."
            items={EDUCATION_ROADMAP_ITEMS}
            className="max-w-none rounded-[32px] border-white/18 bg-black/50 backdrop-blur-2xl text-white shadow-[0_24px_64px_rgba(0,0,0,0.42)] p-1 sm:p-2"
          />
        </div>

        {/* CURRENT FOCUS — Frosted Translucent Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
          }}
          viewport={{ once: true, amount: 0.2 }}
          whileHover={{ y: -5, scale: 1.01, transition: instantHoverSpring }}
          whileTap={{ scale: 0.99, transition: instantTap }}
          className="group mt-14 sm:mt-16 rounded-[32px] p-7 sm:p-10 bg-white/[0.08] hover:bg-white/[0.12] backdrop-blur-xl text-white border border-white/22 hover:border-white/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_18px_48px_rgba(0,0,0,0.24)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.34)] transition-[background-color,border-color,box-shadow] duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
        >
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.2em] uppercase text-white/90">
              <span className="w-8 h-8 rounded-full bg-white/12 border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#111113] transition-colors duration-300 ease-out">
                <Target className="w-4 h-4" />
              </span>
              <span>Current Focus</span>
            </div>
            <h3
              className="text-2xl sm:text-3xl font-black tracking-tight text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              What I&apos;m Focusing On
            </h3>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Currently focused on developing my web development skills,
              exploring modern technologies, improving my understanding of
              frontend and backend development, and working towards my goal of
              becoming a Software Engineer.
            </p>
          </div>

          <div className="shrink-0 flex flex-col items-start lg:items-end gap-4">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white/90">
              <MapPin className="w-4 h-4 text-white/80" />
              <span>Karachi, Pakistan</span>
            </div>
            {onOpenContact && (
              <FlowButton
                text="Connect With Me"
                onClick={onOpenContact}
                variant="light"
              />
            )}
          </div>
        </motion.div>

        {/* PERSONAL MOTTO — White Animated Editorial Centerpiece */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
          }}
          viewport={{ once: true, amount: 0.2 }}
          whileHover={{ y: -5, scale: 1.01, transition: instantHoverSpring }}
          whileTap={{ scale: 0.99, transition: instantTap }}
          className="group relative mt-12 sm:mt-14 rounded-[36px] bg-white text-[#111113] border border-white/80 overflow-hidden shadow-[0_20px_56px_rgba(0,0,0,0.26)] hover:shadow-[0_26px_68px_rgba(0,0,0,0.36)] transition-shadow duration-300"
        >
          <div className="h-1.5 w-full bg-gradient-to-r from-[#111113] via-neutral-700 to-neutral-300" />

          <div className="relative p-8 sm:p-12 lg:p-14 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.22em] uppercase text-[#111113]">
                <span className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-[#111113] group-hover:text-white transition-colors duration-300 ease-out">
                  <Quote className="w-3.5 h-3.5" />
                </span>
                <span>Personal Motto · Guiding Principle</span>
              </div>

              <blockquote
                className="text-2xl sm:text-3xl lg:text-[38px] font-black tracking-tight text-[#111113] leading-[1.18] text-balance"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                “Write code with purpose. Design with empathy. Build
                experiences that stay with people.”
              </blockquote>

              <p className="text-sm sm:text-base text-neutral-600 max-w-2xl leading-relaxed">
                Every line is a bridge between curiosity and craft—turning
                thoughtful ideas into digital work worth remembering.
              </p>

              <div className="pt-2 flex items-center gap-3 text-xs sm:text-sm font-semibold text-neutral-500">
                <span className="h-px w-8 bg-neutral-400" />
                <span>Syed Mehdi · Web Developer</span>
              </div>
            </div>

            <div className="shrink-0">
              <FlowButton
                text="Explore My Skills"
                onClick={handleScrollToSkills}
                variant="ink"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
