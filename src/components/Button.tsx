import React, { useState, useEffect, useRef } from 'react';
import { HERO_TIMINGS } from '../constants/heroAnimation.ts';

// Centralized timing constants for button animations
export const ENTRANCE_DELAY_PRIMARY = HERO_TIMINGS.BUTTON_PRIMARY_DELAY; // 760ms
export const ENTRANCE_DELAY_OUTLINE = HERO_TIMINGS.BUTTON_OUTLINE_DELAY; // 860ms
export const ENTRANCE_DURATION = HERO_TIMINGS.BUTTON_ENTRANCE_DURATION; // 600ms
export const HOVER_DURATION = HERO_TIMINGS.HOVER_DURATION; // 200ms
export const NUDGE_INTERVAL = HERO_TIMINGS.NUDGE_INTERVAL; // 6000ms
export const RIPPLE_DURATION = HERO_TIMINGS.RIPPLE_DURATION; // 500ms

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'md' | 'lg' | 'sm';
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  fullWidthOnMobile?: boolean;
  disabled?: boolean;
  'aria-label'?: string;
  icon?: React.ReactNode;
  entranceDelay?: number;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  className = '',
  fullWidthOnMobile = false,
  disabled = false,
  'aria-label': ariaLabel,
  icon,
  entranceDelay,
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isNudging, setIsNudging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isHoveredRef = useRef(false);
  const isFocusedRef = useRef(false);
  const rippleTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    isFocusedRef.current = isFocused;
  }, [isFocused]);

  // Idle arrow attention effect: nudges 3px to right and back every 6s
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!icon) return;

    // Skip if user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    let isCancelled = false;
    let nudgeInterval: ReturnType<typeof setInterval> | null = null;
    let nudgeTimer: ReturnType<typeof setTimeout> | null = null;

    // Start loop after entrance animation completes
    const startDelay = (entranceDelay || 0) + ENTRANCE_DURATION;
    const startTimer = setTimeout(() => {
      if (isCancelled) return;

      nudgeInterval = setInterval(() => {
        if (isCancelled) return;
        // Suppress nudge while hovered or focused
        if (isHoveredRef.current || isFocusedRef.current) return;

        setIsNudging(true);
        nudgeTimer = setTimeout(() => {
          if (!isCancelled) {
            setIsNudging(false);
          }
        }, 500);
      }, NUDGE_INTERVAL);
    }, Math.max(startDelay, 1200));

    return () => {
      isCancelled = true;
      clearTimeout(startTimer);
      if (nudgeInterval) clearInterval(nudgeInterval);
      if (nudgeTimer) clearTimeout(nudgeTimer);
    };
  }, [icon, entranceDelay]);

  // Clean up ripple timers on unmount
  useEffect(() => {
    return () => {
      rippleTimersRef.current.forEach(clearTimeout);
    };
  }, []);

  const triggerRipple = (e: React.MouseEvent<HTMLElement>) => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX || rect.left + rect.width / 2;
    const clientY = e.clientY || rect.top + rect.height / 2;

    const diameter = Math.max(rect.width, rect.height) * 2;
    const radius = diameter / 2;
    const x = clientX - rect.left - radius;
    const y = clientY - rect.top - radius;

    const rippleColor =
      variant === 'primary' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 191, 255, 0.25)';

    const newRipple: Ripple = {
      id: Date.now() + Math.random(),
      x,
      y,
      size: diameter,
      color: rippleColor,
    };

    setRipples((prev) => [...prev, newRipple]);

    const timer = setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, RIPPLE_DURATION);

    rippleTimersRef.current.push(timer);
  };

  const handlePointerEnter = () => setIsHovered(true);
  const handlePointerLeave = () => setIsHovered(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // Height rules: 44px for md, 48px for lg (Hero/Form buttons)
  const sizeClasses = {
    sm: 'h-[36px] px-3 text-[13px]',
    md: 'h-[44px] px-5 text-[15px]',
    lg: 'h-[48px] px-6 text-[16px]',
  }[size];

  const variantClasses = {
    primary: 'btn-primary',
    outline: 'btn-outline',
    ghost:
      'bg-transparent text-[#F5F7FF] hover:text-[#00BFFF] hover:bg-[#00BFFF]/5 active:scale-[0.98]',
  }[variant];

  const isAnimatedVariant = variant === 'primary' || variant === 'outline';
  const entranceClass = entranceDelay !== undefined ? 'btn-entrance' : '';

  const baseClasses = `btn-animated inline-flex items-center justify-center rounded-[10px] font-medium transition-all duration-200 select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-[#00BFFF] focus-visible:outline-offset-2 ${
    fullWidthOnMobile ? 'w-full sm:w-auto' : ''
  } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${sizeClasses} ${variantClasses} ${entranceClass} ${className}`;

  const entranceStyle =
    entranceDelay !== undefined ? { animationDelay: `${entranceDelay}ms` } : undefined;

  const content = (
    <>
      {/* Light shine sweep for primary button (plays once per hover) */}
      {variant === 'primary' && (
        <span
          aria-hidden="true"
          className="btn-shine absolute inset-0 w-[45px] h-[220%] -top-1/2 pointer-events-none bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.25)] to-transparent pointer-events-none opacity-0"
        />
      )}

      {/* Ripples layer */}
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden="true"
          className="absolute rounded-full pointer-events-none animate-btn-ripple"
          style={{
            left: r.x,
            top: r.y,
            width: r.size,
            height: r.size,
            backgroundColor: r.color,
          }}
        />
      ))}

      {/* Button label content */}
      <span className="relative z-10 flex items-center justify-center">
        {children}
        {icon && (
          <span
            aria-hidden="true"
            className={`btn-icon-arrow inline-flex items-center ml-2 flex-shrink-0 ${
              isNudging ? 'animate-arrow-nudge' : ''
            }`}
          >
            {icon}
          </span>
        )}
      </span>
    </>
  );

  if (href) {
    const isAnchor = href.startsWith('#');
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      triggerRipple(e);

      if (isAnchor) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <a
        href={href}
        onClick={handleClick}
        onMouseEnter={isAnimatedVariant ? handlePointerEnter : undefined}
        onMouseLeave={isAnimatedVariant ? handlePointerLeave : undefined}
        onFocus={isAnimatedVariant ? handleFocus : undefined}
        onBlur={isAnimatedVariant ? handleBlur : undefined}
        className={baseClasses}
        style={entranceStyle}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerRipple(e);
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      onClick={handleButtonClick}
      onMouseEnter={isAnimatedVariant ? handlePointerEnter : undefined}
      onMouseLeave={isAnimatedVariant ? handlePointerLeave : undefined}
      onFocus={isAnimatedVariant ? handleFocus : undefined}
      onBlur={isAnimatedVariant ? handleBlur : undefined}
      disabled={disabled}
      className={baseClasses}
      style={entranceStyle}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
};
