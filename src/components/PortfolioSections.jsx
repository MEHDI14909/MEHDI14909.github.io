import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Server,
  Database,
  Smartphone,
  Globe,
  Monitor,
  ArrowUpRight,
  Compass,
  Sparkles,
  Workflow,
  LayoutGrid,
} from 'lucide-react';

const SKILL_ITEMS = [
  { id: 'react', name: 'React.js', category: 'frontend', type: 'tech', note: 'Interactive SPAs & reusable UI components', icon: Code2 },
  { id: 'javascript', name: 'JavaScript', category: 'frontend', type: 'tech', note: 'ES6+ client logic & asynchronous flows', icon: Code2 },
  { id: 'htmlcss', name: 'HTML & CSS', category: 'frontend', type: 'tech', note: 'Semantic markup, Flexbox, Grid & Tailwind CSS', icon: Monitor },
  { id: 'responsive', name: 'Responsive UI', category: 'frontend', type: 'tech', note: 'Adaptive layouts for mobile, tablet & desktop', icon: Smartphone },
  { id: 'nodejs', name: 'Node.js', category: 'backend', type: 'tech', note: 'Server runtime & backend API services', icon: Server },
  { id: 'express', name: 'Express.js', category: 'backend', type: 'tech', note: 'Routing, middleware & structured endpoints', icon: Server },
  { id: 'restapi', name: 'REST APIs', category: 'backend', type: 'tech', note: 'CRUD endpoint design & API integration', icon: Globe },
  { id: 'php', name: 'PHP', category: 'backend', type: 'extra', note: 'Server-side web scripting & form handling', icon: Globe },
  { id: 'dotnet', name: '.NET', category: 'backend', type: 'extra', note: 'Structured backend application development', icon: Server },
  { id: 'csharp', name: 'C#', category: 'backend', type: 'extra', note: 'Object-oriented backend logic & models', icon: Code2 },
  { id: 'database', name: 'Database Management', category: 'database', type: 'tech', note: 'Schema design, queries & data persistence', icon: Database },
  { id: 'mongodb', name: 'MongoDB', category: 'database', type: 'extra', note: 'NoSQL document collections, schemas & pipelines', icon: Database },
  { id: 'sqlserver', name: 'SQL Server', category: 'database', type: 'extra', note: 'Relational tables, T-SQL & stored procedures', icon: Database },
  { id: 'mysql', name: 'MySQL', category: 'database', type: 'extra', note: 'Relational schemas, joins & optimization', icon: Database },
];

// Distinct, outcome-focused services without repeating tech stack keywords above
const SERVICES_LIST = [
  {
    index: '01',
    title: 'End-to-End Product Architecture',
    description:
      'Structuring complete web applications from initial wireframe to maintainable production-ready codebase with clean organization.',
    icon: LayoutGrid,
  },
  {
    index: '02',
    title: 'Multi-Screen Adaptive Experience',
    description:
      'Ensuring every layout adjusts fluidly across smartphones, tablets, laptops, and desktop displays without clipping or overflow.',
    icon: Compass,
  },
  {
    index: '03',
    title: 'Interactive Motion & Visual Polish',
    description:
      'Adding purposeful micro-interactions, clear typographic hierarchy, and engaging transitions that keep users focused.',
    icon: Sparkles,
  },
  {
    index: '04',
    title: 'Workflow & Information Flow',
    description:
      'Connecting user actions cleanly with validation, structured storage, and reliable state handling behind the scenes.',
    icon: Workflow,
  },
];

const fadeUp = {
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

export default function PortfolioSections({
  onOpenTechModal,
  onOpenExtraModal,
}) {
  const [skillFilter, setSkillFilter] = useState('all');

  const filteredSkills =
    skillFilter === 'all'
      ? SKILL_ITEMS
      : SKILL_ITEMS.filter((s) => s.category === skillFilter);

  const filterTabs = [
    { key: 'all', label: 'All Stack' },
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' },
    { key: 'database', label: 'Databases' },
  ];

  return (
    <>
      {/* TECHNICAL SKILLS SECTION */}
      <section
        id="skills"
        className="relative z-10 w-full bg-transparent text-white border-t border-white/25 scroll-mt-16"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 py-16 sm:py-20 lg:py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/25"
          >
            <div className="space-y-2">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/85">
                Capabilities &amp; Tools
              </p>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Technical Skills
              </h2>
              <p className="text-sm sm:text-base text-white/90 max-w-xl">
                Technologies I work with across frontend interfaces, backend
                services, and database management. Click any card to inspect
                details.
              </p>
            </div>

            {/* Responsive 2x2 Grid on Very Small Mobile, Frosted Glass Bar on sm+ */}
            <div className="w-full sm:w-auto self-start lg:self-auto">
              <div className="grid grid-cols-2 sm:inline-flex items-center gap-1 p-1.5 rounded-2xl sm:rounded-full bg-black/25 backdrop-blur-xl text-white border border-white/20 shadow-[0_14px_34px_rgba(0,0,0,0.22)]">
                {filterTabs.map((tab) => {
                  const isActive = skillFilter === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setSkillFilter(tab.key)}
                      className={`relative px-3.5 sm:px-5 py-2 rounded-xl sm:rounded-full text-xs font-bold tracking-wide transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0 z-10 text-center ${
                        isActive
                          ? 'text-[#111113]'
                          : 'text-white/80 hover:text-white hover:bg-white/[0.08]'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="skills-filter-active-pill"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          className="absolute inset-0 rounded-xl sm:rounded-full bg-white shadow-sm -z-10"
                        />
                      )}
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Translucent Frosted-Glass Skill Cards */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredSkills.map((skill, idx) => {
              const Icon = skill.icon;
              return (
                <motion.button
                  key={skill.id}
                  type="button"
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.95 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.35, delay: idx * 0.03, ease: [0.16, 1, 0.3, 1] },
                  }}
                  viewport={{ once: true, amount: 0.15 }}
                  whileHover={{ y: -8, scale: 1.025, transition: instantHoverSpring }}
                  whileTap={{ scale: 0.98, transition: instantTap }}
                  onClick={() =>
                    skill.type === 'tech'
                      ? onOpenTechModal(skill.id)
                      : onOpenExtraModal(skill.id)
                  }
                  className="group text-center rounded-[30px] p-6 bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-xl text-white border border-white/20 hover:border-white/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_14px_34px_rgba(0,0,0,0.2)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_22px_50px_rgba(0,0,0,0.34)] transition-[background-color,border-color,box-shadow] duration-300 ease-out cursor-pointer flex flex-col items-center justify-between gap-4 relative overflow-hidden"
                >
                  <div className="w-full flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/70 group-hover:text-white transition-colors duration-300 ease-out">
                      {skill.category}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/15 flex items-center justify-center text-white/80 group-hover:bg-white group-hover:text-[#111113] group-hover:border-white group-hover:rotate-12 transition-all duration-300 ease-out">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Frosted Circular Icon Medallion */}
                  <div className="w-16 h-16 rounded-full bg-white/[0.1] border border-white/25 text-white flex items-center justify-center group-hover:bg-white group-hover:text-[#111113] group-hover:border-white group-hover:scale-110 transition-all duration-300 ease-out shadow-[0_8px_20px_rgba(0,0,0,0.16)]">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="space-y-1.5">
                    <h3
                      className="text-lg font-bold text-white"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {skill.name}
                    </h3>
                    <p className="text-xs text-white/75 group-hover:text-white/90 leading-relaxed transition-colors duration-300">
                      {skill.note}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION — Smoked Dark Translucent Glass Cards */}
      <section
        id="services"
        className="relative z-10 w-full bg-transparent text-white border-t border-white/25 scroll-mt-16"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 py-16 sm:py-20 lg:py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-white/25"
          >
            <div className="space-y-2">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/85">
                How I Can Help
              </p>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Services
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-white/90 max-w-md">
              Focused web development services centered on clean design,
              responsiveness, and reliable code structure.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            {SERVICES_LIST.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.index}
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.4, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] },
                  }}
                  viewport={{ once: true, amount: 0.15 }}
                  whileHover={{ y: -7, scale: 1.02, transition: instantHoverSpring }}
                  className="group rounded-[30px] p-6 sm:p-8 bg-black/28 hover:bg-black/40 backdrop-blur-xl text-white border border-white/16 hover:border-white/38 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_16px_40px_rgba(0,0,0,0.24)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_24px_58px_rgba(0,0,0,0.36)] transition-[background-color,border-color,box-shadow] duration-300 ease-out flex flex-col sm:flex-row items-start sm:items-center gap-5 cursor-default"
                >
                  <div className="w-16 h-16 rounded-full bg-white/[0.09] border border-white/20 text-white flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-[#111113] group-hover:border-white group-hover:scale-110 transition-all duration-300 ease-out">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/14 border border-white/20 text-[11px] font-black tabular-nums text-white group-hover:bg-white group-hover:text-[#111113] transition-colors duration-300">
                        {service.index}
                      </span>
                      <h3
                        className="text-lg sm:text-xl font-bold text-white"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-sm text-white/75 group-hover:text-white/90 leading-relaxed transition-colors duration-300">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
