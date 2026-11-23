import React, { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Linkedin, Github, Briefcase, Sparkles } from 'lucide-react';
import { FlowButton } from '@/components/ui/flow-button';
import CollapsingCards from '@/components/ui/cue-collapsing-cards-accordion';
import HighlightCard from '@/components/ui/highlight-card';
import OnboardingForm from '@/components/ui/multistep-form';

const CONTACT_DETAILS = {
  name: 'Syed Mehdi',
  email: 'syedmehdi.deve@gmail.com',
  whatsappDisplay: '+923222549467',
  whatsappUrl: 'https://wa.me/923222549467',
  linkedinUrl: 'https://www.linkedin.com/in/syedmehdi4909/',
  githubUrl: 'https://github.com/MEHDI14909',
  fiverrUrl: 'https://www.fiverr.com/syedmehdi321456',
};

const EDITORIAL_EASE = [0.22, 1, 0.36, 1];

function WhatsAppIcon({ className = 'w-5 h-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function StarEmblemIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-8 h-8 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2.5L14.4 9.6L21.5 12L14.4 14.4L12 21.5L9.6 14.4L2.5 12L9.6 9.6L12 2.5Z" />
      <circle cx="19" cy="5" r="1" fill="currentColor" stroke="none" />
      <circle cx="5" cy="19" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function ContactSection({ focusInquirySignal = 0 }) {
  const prefersReducedMotion = useReducedMotion();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const formCardRef = useRef(null);
  const nameInputRef = useRef(null);

  React.useEffect(() => {
    if (!focusInquirySignal) return;
    const timer = window.setTimeout(() => {
      nameInputRef.current?.focus();
    }, 500);
    return () => window.clearTimeout(timer);
  }, [focusInquirySignal]);

  const handleCopyEmail = async () => {
    let copiedOk = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(CONTACT_DETAILS.email);
        copiedOk = true;
      }
    } catch {
      // Fallback below
    }
    if (!copiedOk) {
      try {
        const el = document.createElement('textarea');
        el.value = CONTACT_DETAILS.email;
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
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2400);
    }
  };

  const scrollToForm = () => {
    formCardRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'center',
    });
    window.setTimeout(() => {
      nameInputRef.current?.focus();
    }, 350);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative z-10 w-full bg-transparent text-white border-t border-white/25 overflow-hidden scroll-mt-16"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 pt-14 sm:pt-16 lg:pt-20 pb-20 sm:pb-24 space-y-12 sm:space-y-16">
        {/* 1. COMPACT EDITORIAL HEADER */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: EDITORIAL_EASE },
          }}
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 sm:pb-10 border-b border-white/25"
        >
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-white/95">
              <Sparkles className="w-4 h-4 shrink-0 text-white" />
              <span>Contact {CONTACT_DETAILS.name}</span>
              <span aria-hidden="true" className="h-px w-8 bg-white/50" />
            </div>

            <h2
              id="contact-heading"
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.03] text-balance drop-shadow-sm"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Have a Project?{' '}
              <span className="text-white/90 underline decoration-white/40 decoration-2 underline-offset-8">
                Let&apos;s Make It Happen.
              </span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl leading-relaxed">
              Have an interesting idea or a project in mind? Let&apos;s connect
              and create something meaningful together.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <FlowButton
              text="Fill Inquiry Form"
              onClick={scrollToForm}
              variant="light"
            />
            <FlowButton
              text={copiedEmail ? 'Email Copied!' : 'Copy Email'}
              onClick={handleCopyEmail}
              variant="outline"
            />
          </div>
        </motion.div>

        {/* 2. HERO WORKSPACE — MULTI-STEP ONBOARDING FORM + HIGHLIGHT STAR CARD */}
        <div
          ref={formCardRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch"
        >
          {/* MULTI-STEP PROJECT INQUIRY FORM (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col justify-start">
            <OnboardingForm
              recipientEmail={CONTACT_DETAILS.email}
              recipientName={CONTACT_DETAILS.name}
              whatsappUrl={CONTACT_DETAILS.whatsappUrl}
              nameInputRef={nameInputRef}
            />
          </div>

          {/* RIGHT COLUMN: HIGHLIGHT STAR CARD ("Got Something in Mind? Let's Talk.") */}
          <div className="lg:col-span-4 flex">
            <HighlightCard
              title="Got Something in Mind? Let's Talk."
              description={[
                'Available for freelance projects and collaborations.',
                'Based in Karachi (PKT · UTC+5), working worldwide.',
                'Replies typically arrive within 24 hours.',
                'Clean builds with focused communication.',
              ]}
              icon={<StarEmblemIcon />}
              footer={
                <FlowButton
                  text="Start Your Brief"
                  onClick={scrollToForm}
                  variant="light"
                  compact
                />
              }
            />
          </div>
        </div>

        {/* 3. INTERACTIVE 5-CARD COLLAPSING ACCORDION (Appears ONCE — Zero Duplication) */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <p className="text-xs font-bold text-white/85">
                Direct Channels
              </p>
              <h2
                className="text-2xl sm:text-3xl font-black tracking-tight text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Connect Across Any Channel
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-white/85">
              Hover or tap any card to open its link
            </p>
          </div>

          <CollapsingCards
            defaultActiveIdx={1}
            items={[
              {
                idx: 1,
                wordmark: 'Email',
                title: 'Email',
                handle: CONTACT_DETAILS.email,
                detail:
                  'Best for detailed project scopes, briefs, and direct proposals.',
                ctaLabel: 'Send a Direct Email',
                href: `mailto:${CONTACT_DETAILS.email}`,
                external: false,
                theme: 'obsidian',
                icon: Mail,
                allowCopy: true,
                onCopy: handleCopyEmail,
                isCopied: copiedEmail,
              },
              {
                idx: 2,
                wordmark: 'WhatsApp',
                title: 'WhatsApp',
                handle: CONTACT_DETAILS.whatsappDisplay,
                detail:
                  'Quick voice or text discussions directly on WhatsApp.',
                ctaLabel: 'Message on WhatsApp',
                href: CONTACT_DETAILS.whatsappUrl,
                external: true,
                theme: 'light',
                icon: WhatsAppIcon,
              },
              {
                idx: 3,
                wordmark: 'LinkedIn',
                title: 'LinkedIn',
                handle: 'linkedin.com/in/syedmehdi4909',
                detail:
                  'Professional network, collaborations, and engineering roles.',
                ctaLabel: 'Connect on LinkedIn',
                href: CONTACT_DETAILS.linkedinUrl,
                external: true,
                theme: 'obsidian',
                icon: Linkedin,
              },
              {
                idx: 4,
                wordmark: 'GitHub',
                title: 'GitHub',
                handle: 'github.com/MEHDI14909',
                detail:
                  'Inspect source code, live web builds, and active commits.',
                ctaLabel: 'Explore Repositories',
                href: CONTACT_DETAILS.githubUrl,
                external: true,
                theme: 'light',
                icon: Github,
              },
              {
                idx: 5,
                wordmark: 'Fiverr',
                title: 'Fiverr',
                handle: 'fiverr.com/syedmehdi321456',
                detail: 'Milestone-based freelance web development orders.',
                ctaLabel: 'Hire on Fiverr',
                href: CONTACT_DETAILS.fiverrUrl,
                external: true,
                theme: 'obsidian',
                icon: Briefcase,
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
