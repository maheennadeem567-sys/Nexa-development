import React, { useState, useEffect } from 'react';
import { SCROLL_INDICATOR_DELAY } from '../constants/heroAnimation.ts';

export const ScrollDownIndicator: React.FC = () => {
  const [isScrolledPast, setIsScrolledPast] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolledPast(true);
      } else {
        setIsScrolledPast(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = document.querySelector('#services');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      style={{ animationDelay: `${SCROLL_INDICATOR_DELAY}ms` }}
      className={`scroll-indicator-wrapper absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center transition-opacity duration-300 ${
        isScrolledPast ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <button
        type="button"
        onClick={handleClick}
        aria-label="Scroll to services"
        className="group flex flex-col items-center gap-2 cursor-pointer bg-transparent border-0 p-1 rounded-md focus-visible:outline-2 focus-visible:outline-[#00BFFF] focus-visible:outline-offset-2"
      >
        {/* Mouse outline: 22px wide, 34px tall, 2px border rgba(0,191,255,0.5), radius 12px */}
        <div
          aria-hidden="true"
          className="w-[22px] h-[34px] rounded-[12px] border-2 border-[rgba(0,191,255,0.5)] group-hover:border-[#00BFFF] transition-colors duration-200 flex justify-center pt-2 relative"
        >
          {/* 4px cyan dot that moves down 8px and fades, looping every 1.6s */}
          <span className="scroll-indicator-dot w-[4px] h-[4px] rounded-full bg-[#00BFFF] block" />
        </div>

        {/* Small monospace text "SCROLL DOWN" (11px, letter-spacing 0.15em, color #A7B4C9) */}
        <span
          aria-hidden="true"
          className="text-[11px] font-mono tracking-[0.15em] text-[#A7B4C9] group-hover:text-[#00BFFF] transition-colors duration-200 uppercase select-none"
        >
          SCROLL DOWN
        </span>
      </button>
    </div>
  );
};
