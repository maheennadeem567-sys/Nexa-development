import React, { useState, useEffect, useRef } from 'react';
import { PROCESS_STEPS_DATA } from '../data.ts';

export const WorkProcessTimeline: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
        }
      },
      { threshold: 0.2 }
    );

    const current = containerRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* =========================================================================
          Desktop Timeline (>= 1024px): Horizontal 4-step timeline with 1200ms fill
          ========================================================================= */}
      <div className="hidden lg:block relative">
        {/* Horizontal connector track connecting the 4 circles (from 12.5% to 87.5% of container) */}
        <div
          aria-hidden="true"
          className="absolute top-[23px] left-[12.5%] right-[12.5%] h-[2px] bg-[rgba(0,191,255,0.25)] z-0"
        >
          {/* Active progress line that fills from left to right over 1200ms */}
          <div
            className={`h-full bg-[#00BFFF] transition-all duration-[1200ms] ease-out shadow-[0_0_12px_rgba(0,191,255,0.6)] ${
              isInView ? 'w-full' : 'w-0'
            }`}
          />
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-4 gap-8 relative z-10">
          {PROCESS_STEPS_DATA.map((step, index) => {
            // Delays for circles lighting up as the 1200ms progress line reaches them:
            // Step 1: 0ms, Step 2: 400ms, Step 3: 800ms, Step 4: 1200ms
            const lightUpDelay = index * 400;

            return (
              <div key={step.step} className="flex flex-col items-center text-center group">
                {/* 48px circle */}
                <div
                  style={{
                    transitionDelay: isInView ? `${lightUpDelay}ms` : '0ms',
                  }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-mono font-bold text-[16px] transition-all duration-300 select-none border-2 ${
                    isInView
                      ? 'bg-[#00BFFF] text-[#050817] border-[#00BFFF] shadow-[0_0_20px_rgba(0,191,255,0.45)]'
                      : 'bg-[#0B1730] text-[#00BFFF] border-[#00BFFF] shadow-[0_0_12px_rgba(0,191,255,0.15)]'
                  }`}
                >
                  {step.step}
                </div>

                {/* Step Title & Description */}
                <div className="mt-6">
                  <h3 className="text-[20px] font-semibold text-[#F5F7FF] tracking-tight mb-2.5 group-hover:text-[#00BFFF] transition-colors duration-200">
                    {step.title}
                  </h3>
                  <p className="text-[15px] text-[#A7B4C9] leading-[1.6] max-w-[260px] mx-auto">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          Mobile & Tablet Timeline (< 1024px): Vertical timeline with 1200ms fill
          ========================================================================= */}
      <div className="lg:hidden relative pl-2 sm:pl-4">
        {/* Vertical connector track connecting the 4 circles (left: 23px) */}
        <div
          aria-hidden="true"
          className="absolute left-[31px] sm:left-[39px] top-[24px] bottom-[36px] w-[2px] bg-[rgba(0,191,255,0.25)] z-0"
        >
          {/* Active progress line that fills from top to bottom over 1200ms */}
          <div
            className={`w-full bg-[#00BFFF] transition-all duration-[1200ms] ease-out shadow-[0_0_12px_rgba(0,191,255,0.6)] ${
              isInView ? 'h-full' : 'h-0'
            }`}
          />
        </div>

        {/* Vertical Steps List */}
        <div className="space-y-8 relative z-10">
          {PROCESS_STEPS_DATA.map((step, index) => {
            const lightUpDelay = index * 400;

            return (
              <div key={step.step} className="flex items-start gap-5 sm:gap-6 group">
                {/* 48px circle */}
                <div
                  style={{
                    transitionDelay: isInView ? `${lightUpDelay}ms` : '0ms',
                  }}
                  className={`w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center font-mono font-bold text-[16px] transition-all duration-300 select-none border-2 ${
                    isInView
                      ? 'bg-[#00BFFF] text-[#050817] border-[#00BFFF] shadow-[0_0_20px_rgba(0,191,255,0.45)]'
                      : 'bg-[#0B1730] text-[#00BFFF] border-[#00BFFF] shadow-[0_0_12px_rgba(0,191,255,0.15)]'
                  }`}
                >
                  {step.step}
                </div>

                {/* Step Title & Description */}
                <div className="pt-1 pb-2">
                  <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#F5F7FF] tracking-tight mb-2 group-hover:text-[#00BFFF] transition-colors duration-200">
                    {step.title}
                  </h3>
                  <p className="text-[15px] text-[#A7B4C9] leading-[1.6]">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
