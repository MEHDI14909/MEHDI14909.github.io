import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { MotionConfig, motion } from 'framer-motion';
import { Home, User, Code2, FolderGit2, Layers3, Mail } from 'lucide-react';
import { Toaster } from 'sonner';
import Dock from '@/components/ui/dock';
import HeroSection from './components/HeroSection.jsx';
import AboutMe from './components/AboutMe.jsx';
import PortfolioSections from './components/PortfolioSections.jsx';
import SkillDetailModal from './components/SkillDetailModal.jsx';
import ProjectsSection from './components/ProjectsSection.jsx';
import ContactSection from './components/ContactSection.jsx';
import Footer from './components/Footer.jsx';
import { SpotlightCursor } from '@/components/ui/spotlight-cursor';

const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'services', 'contact'];

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [capabilitiesModal, setCapabilitiesModal] = useState(null);
  const [focusInquirySignal, setFocusInquirySignal] = useState(0);

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('theme');
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-22% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navigateToSection = useCallback((sectionId) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const openContactAndFocus = useCallback(() => {
    navigateToSection('contact');
    setFocusInquirySignal((prev) => prev + 1);
  }, [navigateToSection]);

  const openTechModal = useCallback((activeId = 'react') => {
    setCapabilitiesModal({ mode: 'tech', activeId });
  }, []);

  const openExtraModal = useCallback((activeId = 'php') => {
    setCapabilitiesModal({ mode: 'extra', activeId });
  }, []);

  const dockItems = useMemo(
    () => [
      {
        icon: Home,
        label: 'Home',
        onClick: () => navigateToSection('hero'),
      },
      {
        icon: User,
        label: 'About',
        onClick: () => navigateToSection('about'),
      },
      {
        icon: Code2,
        label: 'Skills',
        onClick: () => navigateToSection('skills'),
      },
      {
        icon: FolderGit2,
        label: 'Projects',
        onClick: () => navigateToSection('projects'),
      },
      {
        icon: Layers3,
        label: 'Services',
        onClick: () => navigateToSection('services'),
      },
      {
        icon: Mail,
        label: 'Contact',
        onClick: () => openContactAndFocus(),
      },
    ],
    [navigateToSection, openContactAndFocus]
  );

  return (
    <MotionConfig reducedMotion="user">
      <div
        data-active-section={activeSection}
        className="relative w-full min-h-screen overflow-x-hidden text-white bg-gradient-to-br from-[#C40D15] via-[#9E080E] to-[#5E0407]"
      >
        {/* Fixed Full-Site Crimson Ambient Glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 overflow-hidden z-0"
        >
          <motion.div
            animate={{
              opacity: [0.4, 0.78, 0.4],
              scale: [1, 1.12, 1],
            }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-24 right-0 w-[260px] h-[260px] sm:w-[420px] sm:h-[420px] lg:w-[580px] lg:h-[580px] rounded-full blur-[110px] sm:blur-[150px] bg-[#FF424A]/35"
          />
          <motion.div
            animate={{
              opacity: [0.35, 0.7, 0.35],
              scale: [1.05, 0.95, 1.05],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/3 -right-24 w-[240px] h-[240px] sm:w-[380px] sm:h-[380px] lg:w-[520px] lg:h-[520px] rounded-full blur-[110px] sm:blur-[150px] bg-[#FB7185]/25"
          />
          <motion.div
            animate={{
              opacity: [0.3, 0.65, 0.3],
              scale: [1, 1.08, 1],
            }}
            transition={{ duration: 7.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-24 -left-24 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] lg:w-[540px] lg:h-[540px] rounded-full blur-[110px] sm:blur-[145px] bg-[#FF6B4A]/25"
          />
        </div>

        <SpotlightCursor
          config={{
            radius: 320,
            brightness: 0.22,
            color: '#ffffff',
            smoothing: 0.16,
          }}
        />

        {/* DOCK NAVIGATION */}
        <header className="fixed top-3 left-1/2 -translate-x-1/2 z-40">
          <Dock items={dockItems} className="py-0" />
        </header>

        {/* MAIN PORTFOLIO FLOW */}
        <main>
          <HeroSection />

          <AboutMe onOpenContact={openContactAndFocus} />

          <PortfolioSections
            onOpenTechModal={openTechModal}
            onOpenExtraModal={openExtraModal}
          />

          <ProjectsSection onOpenContact={openContactAndFocus} />

          <ContactSection focusInquirySignal={focusInquirySignal} />
        </main>

        {/* FOOTER */}
        <Footer onNavigate={navigateToSection} />

        {/* INTERACTIVE CAPABILITIES & Q&A MODALS */}
        <SkillDetailModal
          modalState={capabilitiesModal}
          onClose={() => setCapabilitiesModal(null)}
          onOpenContact={openContactAndFocus}
        />

        <Toaster position="bottom-right" richColors />
      </div>
    </MotionConfig>
  );
}
