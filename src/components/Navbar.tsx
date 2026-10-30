import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../data.ts';
import { Button } from './Button.tsx';
import { Logo } from './Logo.tsx';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerBtnRef = useRef<HTMLButtonElement>(null);

  // Throttled scroll listener: 1px bottom border and logo scroll-shrink appearing after scrolling > 10px
  useEffect(() => {
    let isMounted = true;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (isMounted) {
            setIsScrolled(window.scrollY > 10);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      isMounted = false;
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Active-link highlighting while scrolling (IntersectionObserver, 40% threshold)
  useEffect(() => {
    const sectionIds = ['home', 'services', 'portfolio', 'why-us', 'process', 'contact'];
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.4, // 40% threshold per spec
      }
    );

    sectionElements.forEach((el) => observer.observe(el));

    return () => {
      sectionElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Close mobile menu on outside click or Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileOpen) {
        setIsMobileOpen(false);
        hamburgerBtnRef.current?.focus();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        isMobileOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        hamburgerBtnRef.current &&
        !hamburgerBtnRef.current.contains(e.target as Node)
      ) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#050817]/85 backdrop-blur-[8px] border-b border-[rgba(0,191,255,0.15)] shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
          : 'bg-[#050817]/85 backdrop-blur-[8px] border-b border-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-[64px] md:h-[72px] flex items-center justify-between">
        {/* Brand Logo: Animated </> icon and first/second word with one-time shine & hover sweep */}
        <Logo
          variant="navbar"
          isScrolled={isScrolled}
          onClick={() => setIsMobileOpen(false)}
        />

        {/* Desktop Navigation Links (5 links) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const sectionKey = item.href.replace('#', '');
            const isActive = activeSection === sectionKey;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`group px-3 py-2 rounded-md text-[14px] lg:text-[15px] font-medium transition-colors duration-200 relative ${
                  isActive
                    ? 'text-[#00BFFF]'
                    : 'text-[#A7B4C9] hover:text-[#F5F7FF]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0.5 left-3 right-3 h-[2px] bg-[#00BFFF] rounded-full origin-left transition-transform duration-250 ease-out ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                  aria-hidden="true"
                />
              </a>
            );
          })}
        </nav>

        {/* Right Desktop CTA: filled cyan "Get a Quote" button (h: 44px, p: 0 20px) */}
        <div className="hidden md:block">
          <Button
            href="#contact"
            variant="primary"
            size="md"
            className="h-[44px] px-[20px]"
          >
            Get a Quote
          </Button>
        </div>

        {/* Mobile Hamburger (44x44px touch target) */}
        <button
          ref={hamburgerBtnRef}
          type="button"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-nav-menu"
          aria-label={isMobileOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          className="md:hidden w-11 h-11 flex items-center justify-center rounded-[10px] text-[#F5F7FF] hover:text-[#00BFFF] bg-[#142238]/60 border border-[rgba(0,191,255,0.2)] focus-visible:outline-2 focus-visible:outline-[#00BFFF]"
        >
          {isMobileOpen ? (
            <X className="w-5 h-5" aria-hidden="true" />
          ) : (
            <Menu className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Slide-down Menu (slides down in 250ms) */}
      <div
        id="mobile-nav-menu"
        ref={mobileMenuRef}
        className={`md:hidden overflow-hidden transition-all duration-250 ease-in-out bg-[#050817]/95 border-b border-[rgba(0,191,255,0.2)] backdrop-blur-md ${
          isMobileOpen ? 'max-h-[460px] opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
        }`}
        aria-hidden={!isMobileOpen}
      >
        <div className="max-w-[1200px] mx-auto px-4 flex flex-col space-y-1">
          {NAV_ITEMS.map((item) => {
            const sectionKey = item.href.replace('#', '');
            const isActive = activeSection === sectionKey;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`min-h-[44px] flex items-center px-4 rounded-lg text-[16px] font-medium transition-colors ${
                  isActive
                    ? 'text-[#00BFFF] bg-[#00BFFF]/10'
                    : 'text-[#A7B4C9] hover:text-[#F5F7FF] hover:bg-white/5'
                }`}
              >
                {item.label}
              </a>
            );
          })}

          <div className="pt-3 px-2">
            <Button
              href="#contact"
              variant="primary"
              size="md"
              fullWidthOnMobile
              className="h-[44px]"
              onClick={() => setIsMobileOpen(false)}
            >
              Get a Quote
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
