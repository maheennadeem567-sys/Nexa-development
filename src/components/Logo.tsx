import React from 'react';
import { BRAND } from '../data.ts';

export interface LogoProps {
  /**
   * 'navbar' enables entrance animation, scroll shrink, and navbar text sizing.
   * 'footer' disables entrance animation and scroll shrink.
   */
  variant?: 'navbar' | 'footer';
  /**
   * Whether the navbar is scrolled > 10px. Only applies to 'navbar' variant.
   */
  isScrolled?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'navbar',
  isScrolled = false,
  className = '',
  onClick,
}) => {
  const isNavbar = variant === 'navbar';
  const animateEntrance = isNavbar;
  const enableScrollShrink = isNavbar;

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onClick) {
      onClick(e);
    }
    // Smooth scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.location.hash !== '#home') {
      try {
        window.history.pushState(null, '', '#home');
      } catch {
        // Safe fallback in restricted environments
      }
    }
  };

  const brandName = `${BRAND.first}${BRAND.second ? ' ' + BRAND.second : ''}`;

  return (
    <a
      href="#home"
      onClick={handleLogoClick}
      aria-label={`${brandName} home`}
      className={`logo-link min-h-[44px] inline-flex items-center gap-2.5 rounded-lg py-1 px-1 -mx-1 select-none focus-visible:outline-2 focus-visible:outline-[#00BFFF] focus-visible:outline-offset-2 group ${className}`}
    >
      {/* Scroll Scaler: shrinks slightly (scale 1 to 0.94) on scroll when in navbar */}
      <div
        className="logo-scaler inline-flex items-center gap-2.5 will-change-transform"
        style={{
          transform: enableScrollShrink && isScrolled ? 'scale(0.94)' : 'scale(1)',
          transformOrigin: 'left center',
          transition: 'transform 250ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Icon box: 32x32 rounded square with </> icon */}
        <div
          aria-hidden="true"
          className={`logo-icon-box w-8 h-8 rounded-lg bg-[#00BFFF]/10 border border-[#00BFFF]/30 flex items-center justify-center text-[#00BFFF] flex-shrink-0 transition-all duration-250 ${
            animateEntrance ? 'logo-icon-box-animated' : ''
          }`}
        >
          {/* Custom Code SVG with separate left bracket, slash, and right bracket paths for animation */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-[#00BFFF] overflow-visible"
            aria-hidden="true"
          >
            {/* Left bracket: < */}
            <path
              d="M7 8L3 12L7 16"
              className={`logo-bracket-left ${
                animateEntrance ? 'logo-bracket-left-animated' : ''
              }`}
            />
            {/* Slash: / */}
            <path
              d="M14.5 4L9.5 20"
              className={`logo-slash ${
                animateEntrance ? 'logo-slash-animated' : ''
              }`}
            />
            {/* Right bracket: > */}
            <path
              d="M17 8L21 12L17 16"
              className={`logo-bracket-right ${
                animateEntrance ? 'logo-bracket-right-animated' : ''
              }`}
            />
          </svg>
        </div>

        {/* Brand Text: Displays "Nexa" */}
        <span
          className={`logo-text font-bold tracking-tight inline-flex items-baseline gap-1 whitespace-nowrap ${
            isNavbar
              ? 'text-[19px] sm:text-[21px]'
              : 'text-[20px]'
          }`}
        >
          {/* First word ("Nexa") */}
          <span
            className={`logo-word-first text-white inline-block ${
              animateEntrance ? 'logo-word-first-animated' : ''
            }`}
          >
            {BRAND.first}
          </span>

          {/* Second word if present */}
          {BRAND.second ? (
            <span
              className={`logo-word-second logo-cyan-word text-[#00BFFF] inline-block ${
                animateEntrance ? 'logo-word-second-animated logo-cyan-shine-once' : ''
              }`}
            >
              {BRAND.second}
            </span>
          ) : null}
        </span>
      </div>
    </a>
  );
};
