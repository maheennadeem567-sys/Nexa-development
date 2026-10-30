import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import {
  BRAND_DATA,
  SERVICES_DATA,
  PROJECTS_DATA,
  WHY_CHOOSE_US_DATA,
  PROCESS_STEPS_DATA,
  TECH_BADGES_DATA,
} from './data.ts';
import { Navbar } from './components/Navbar.tsx';
import { Button } from './components/Button.tsx';
import { SectionHeading } from './components/SectionHeading.tsx';
import { ServiceCard } from './components/ServiceCard.tsx';
import { ProjectCard } from './components/ProjectCard.tsx';
import { FeatureCard } from './components/FeatureCard.tsx';
import { ProcessStep } from './components/ProcessStep.tsx';
import { ContactForm } from './components/ContactForm.tsx';
import { CodeEditor } from './components/CodeEditor.tsx';
import { TechBadge } from './components/TechBadge.tsx';
import { FloatingTile } from './components/FloatingTile.tsx';
import { ScrollDownIndicator } from './components/ScrollDownIndicator.tsx';
import { Footer } from './components/Footer.tsx';
import { BackToTop } from './components/BackToTop.tsx';
import { Reveal } from './components/Reveal.tsx';

import { HERO_TIMINGS, FLOATING_TILES_DATA } from './constants/heroAnimation.ts';

// Specialized Agency Badge with pop-in sparkle and idle border glow & twinkle
const HeroAgencyBadge: React.FC = () => {
  return (
    <div
      aria-label="Nexa Agency"
      className="hero-badge-entrance hero-agency-badge animate-hero-badge-glow relative overflow-hidden inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00BFFF]/10 border border-[#00BFFF]/25 text-[#00BFFF] text-[13px] font-mono tracking-wide mb-5 select-none"
    >
      {/* Sparkle icon: pop-in at 200ms, idle twinkle starts after entrance (800ms) */}
      <span
        aria-hidden="true"
        className="hero-sparkle-popin relative z-10 flex-shrink-0"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#00BFFF] animate-hero-sparkle" />
      </span>

      {/* Badge text */}
      <span className="relative z-10 font-mono">
        Nexa Agency
      </span>
    </div>
  );
};

export default function App() {
  const heroRef = useRef<HTMLElement>(null);
  const [isHeroPaused, setIsHeroPaused] = useState(false);

  const whyUsGridRef = useRef<HTMLDivElement>(null);
  const [isWhyUsVisible, setIsWhyUsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observerWhyUs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsWhyUsVisible(true);
          observerWhyUs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    const currentWhyUs = whyUsGridRef.current;
    if (currentWhyUs) {
      observerWhyUs.observe(currentWhyUs);
    }

    const handleVisibility = () => {
      if (document.hidden) {
        setIsHeroPaused(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroPaused(!entry.isIntersecting || document.hidden);
      },
      { threshold: 0.1 }
    );

    const currentHero = heroRef.current;
    if (currentHero) {
      observer.observe(currentHero);
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      if (currentHero) {
        observer.unobserve(currentHero);
      }
      observerWhyUs.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050817] text-[#F5F7FF] flex flex-col overflow-x-hidden selection:bg-[#00BFFF]/20 selection:text-[#00BFFF]">
      {/* 1. Navbar (Sticky) */}
      <Navbar />

      <main id="main-content" className="flex-grow pt-[64px] md:pt-[72px]">
        {/* 2. Hero Section (#home): min-height calc(100vh-72px), vertically centered, 72px bottom padding */}
        <section
          id="home"
          ref={heroRef}
          className={`section-anchor min-h-[calc(100vh-72px)] flex items-center pt-8 pb-[72px] lg:pt-10 lg:pb-[72px] relative overflow-hidden ${
            isHeroPaused ? 'hero-animations-paused' : ''
          }`}
          aria-label="Introduction and overview"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full">
            {/* 56px gap (gap-14) stacked on mobile/tablet, 2 columns on desktop (55% / 45%) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-8 items-center">
              {/* Left Column (55% on desktop: 7 cols of 12) with Staggered Page-Load Sequence */}
              <div className="lg:col-span-7 text-left relative">
                {/* 1. Top badge: fade + translateY 12px at 0ms, sparkle pop-in at 200ms */}
                <HeroAgencyBadge />

                {/* 2. H1 heading: animate each word one by one (translateY 30px to 0, 0.8s duration, 0.15s stagger, shimmer on Innovative) */}
                <h1
                  aria-label="Innovative Web & App Development"
                  className="text-[36px] sm:text-[44px] lg:text-[56px] font-bold text-[#F5F7FF] tracking-tight leading-[1.1] mb-5"
                >
                  <span className="block" aria-hidden="true">
                    <span className="inline-block overflow-hidden align-top mr-[0.28em] pb-[0.08em]">
                      <span
                        style={{ animationDelay: '0ms' }}
                        className="animate-hero-word-slide animate-hero-innovative-shimmer inline-block"
                      >
                        Innovative
                      </span>
                    </span>
                    <span className="inline-block overflow-hidden align-top mr-[0.28em] pb-[0.08em]">
                      <span
                        style={{ animationDelay: '150ms' }}
                        className="animate-hero-word-slide inline-block"
                      >
                        Web
                      </span>
                    </span>
                    <span className="inline-block overflow-hidden align-top mr-[0.28em] pb-[0.08em]">
                      <span
                        style={{ animationDelay: '300ms' }}
                        className="animate-hero-word-slide inline-block"
                      >
                        &amp;
                      </span>
                    </span>
                    <span className="inline-block overflow-hidden align-top pb-[0.08em]">
                      <span
                        style={{ animationDelay: '450ms' }}
                        className="animate-hero-word-slide inline-block"
                      >
                        App
                      </span>
                    </span>
                  </span>
                  <span className="block" aria-hidden="true">
                    <span className="inline-block overflow-hidden align-top pb-[0.08em]">
                      <span
                        style={{ animationDelay: '600ms' }}
                        className="animate-hero-word-slide inline-block"
                      >
                        Development
                      </span>
                    </span>
                  </span>
                </h1>

                {/* 3. Description paragraph: fade + translateY 16px to 0, 600ms at 600ms */}
                <p
                  style={{ animationDelay: `${HERO_TIMINGS.DESCRIPTION_DELAY}ms` }}
                  className="hero-desc-entrance text-[16px] text-[#A7B4C9] leading-[1.6] max-w-[620px] mb-8"
                >
                  {BRAND_DATA.heroDescription}
                </p>

                {/* 4. 2 Buttons: Get a Free Quote (760ms) & View Our Work (860ms) */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
                  <Button
                    href="#contact"
                    variant="primary"
                    size="lg"
                    fullWidthOnMobile
                    entranceDelay={HERO_TIMINGS.BUTTON_PRIMARY_DELAY}
                    icon={<ArrowRight className="w-4 h-4" />}
                    className="shadow-[0_4px_20px_rgba(0,191,255,0.3)]"
                  >
                    Get a Free Quote
                  </Button>

                  <Button
                    href="#portfolio"
                    variant="outline"
                    size="lg"
                    fullWidthOnMobile
                    entranceDelay={HERO_TIMINGS.BUTTON_OUTLINE_DELAY}
                  >
                    View Our Work
                  </Button>
                </div>

                {/* 5 & 6. Core Technologies & Frameworks (960ms label fade + 1000ms-1350ms badges) */}
                <div>
                  <div
                    style={{ animationDelay: `${HERO_TIMINGS.TECH_LABEL_DELAY}ms` }}
                    className="hero-label-entrance text-[12px] font-mono uppercase tracking-wider text-[#A7B4C9] mb-3"
                  >
                    Core Technologies &amp; Frameworks
                  </div>
                  <ul
                    aria-label="Core technologies and frameworks"
                    className="tech-badges-list flex flex-wrap gap-2 list-none p-0 m-0"
                  >
                    {TECH_BADGES_DATA.map((tech, idx) => (
                      <TechBadge key={tech.name} tech={tech} index={idx} />
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column (45% on desktop: 5 cols of 12) */}
              <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
                {/* Editor Wrapper with 44px padding on left & right for floating tiles overlap without page overflow */}
                <div className="relative w-full max-w-[608px] px-[44px] flex justify-center">
                  {/* 4. Soft Ambient Radial Cyan Glow (about 560px, rgba(0,191,255,0.12), drifts slowly) */}
                  <div
                    aria-hidden="true"
                    className="hero-ambient-glow pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full -z-10 hidden lg:block"
                    style={{
                      background:
                        'radial-gradient(circle, rgba(0, 191, 255, 0.12) 0%, rgba(0, 191, 255, 0.04) 50%, transparent 70%)',
                      filter: 'blur(50px)',
                    }}
                  />

                  {/* 3. 6 Floating Technology Tiles (React, JS, Firebase, Backend, HTML, Flutter) */}
                  {FLOATING_TILES_DATA.map((tile, idx) => (
                    <FloatingTile key={tile.id} tile={tile} index={idx} />
                  ))}

                  {/* 2. Code Editor Window (Window entrance: fade + translateY 20px, 700ms at 300ms) */}
                  <div className="code-window-entrance w-full">
                    <CodeEditor />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Scroll-Down Indicator (centered, 24px from bottom, real button, smooth scrolls to #services) */}
          <ScrollDownIndicator />
        </section>

        {/* 3. Services Section (6 cards) (#services) */}
        <section
          id="services"
          className="section-anchor min-h-[calc(100svh-72px)] flex flex-col justify-center bg-[#0B1730]/40 border-y border-[rgba(0,191,255,0.08)] relative overflow-hidden"
          style={{
            paddingBlock: 'clamp(24px, 4vh, 56px)',
          }}
          aria-labelledby="services-title"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full">
            {/* Heading block with clamp typography */}
            <div
              className="max-w-[760px] text-center mx-auto"
              style={{
                marginBottom: 'clamp(20px, 3vh, 40px)',
              }}
            >
              <div className="section-badge-pill inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#00BFFF]/10 border border-[#00BFFF]/25 text-[#00BFFF] text-[13px] font-medium tracking-wide mb-3 select-none">
                <span className="section-badge-dot" />
                <span>What We Build</span>
              </div>
              <h2
                id="services-title"
                className="font-bold text-[#F5F7FF] tracking-tight leading-[1.2] mb-3"
                style={{
                  fontSize: 'clamp(30px, 4vh + 12px, 40px)',
                }}
              >
                Our Services
              </h2>
              <p className="text-[16px] text-[#A7B4C9] leading-[1.6] max-w-[560px] mx-auto">
                Digital solutions designed around your goals.
              </p>
            </div>

            {/* Grid: 3 columns (desktop), 2 columns (tablet), 1 column (mobile), grid-auto-rows: 1fr for equal card height */}
            <div className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 grid-auto-rows-[1fr]">
              {SERVICES_DATA.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* 4. Featured Projects (1 card) (#portfolio) */}
        <section
          id="portfolio"
          className="section-anchor py-12 relative min-h-[calc(100vh-72px)] flex flex-col justify-center"
          aria-labelledby="portfolio-title"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full">
            <Reveal>
              <SectionHeading
                badge="Recent Work"
                title="Featured Projects"
                subtitle="A showcase of our work and practical development skills."
                className="mb-6"
              />
            </Reveal>

            {/* Centered single card container */}
            <div className="w-full flex justify-center">
              {PROJECTS_DATA.map((project, index) => (
                <Reveal
                  key={project.id}
                  delayMs={Math.min(index * 100, 300)}
                >
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Why Choose Us (4 cards) (#why-us) */}
        <section
          id="why-us"
          className="section-anchor py-14 md:py-[72px] lg:py-24 bg-[#0B1730]/40 border-y border-[rgba(0,191,255,0.08)] relative"
          aria-labelledby="why-choose-us-title"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <Reveal>
              <SectionHeading
                badge="Engineering Excellence"
                title="Why Choose Us"
                subtitle="Built on principles of reliability, speed, and modern engineering standards."
              />
            </Reveal>

            {/* Grid: 4 cols desktop, 2 cols tablet, 1 col mobile */}
            <div
              ref={whyUsGridRef}
              className={`why-us-grid ${isWhyUsVisible ? 'is-visible' : ''}`}
            >
              {WHY_CHOOSE_US_DATA.map((feature, index) => (
                <FeatureCard key={feature.id} feature={feature} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* 5. Our Work Process (4 steps) (#process) */}
        <section
          id="process"
          className="section-anchor py-14 md:py-[72px] lg:py-24 relative overflow-hidden"
          aria-labelledby="process-title"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <Reveal>
              <SectionHeading
                badge="Structured Delivery"
                title="Work Process"
                subtitle="A clear, collaborative pathway from initial concept to live deployment."
              />
            </Reveal>

            {/* Process container with desktop horizontal line and mobile vertical layout */}
            <div className="relative mt-12">
              {/* Desktop horizontal connector line (>=1024px) */}
              <div
                className="hidden lg:block absolute top-[24px] left-[12.5%] right-[12.5%] h-[2px] bg-[rgba(0,191,255,0.25)] -z-0"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 relative z-10">
                {PROCESS_STEPS_DATA.map((step, idx) => (
                  <Reveal
                    key={step.step}
                    delayMs={Math.min(idx * 80, 300)}
                  >
                    <ProcessStep
                      step={step}
                      index={idx}
                      total={PROCESS_STEPS_DATA.length}
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. Contact Section (#contact) */}
        <section
          id="contact"
          className="section-anchor py-14 md:py-[72px] lg:py-24 relative"
          aria-labelledby="contact-title"
        >
          {/* Subtle cyan background glow */}
          <div
            className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-[#00BFFF]/5 rounded-full blur-[90px] pointer-events-none -z-10"
            aria-hidden="true"
          />

          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <Reveal>
              <SectionHeading
                badge="Start A Project"
                title="Get In Touch"
                subtitle="Have a project in mind, a question, or just want to connect? Feel free to reach out!"
              />
            </Reveal>

            <Reveal delayMs={100}>
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>

      {/* 9. Footer */}
      <Footer />

      {/* Back To Top Floating Action Button */}
      <BackToTop />
    </div>
  );
}
