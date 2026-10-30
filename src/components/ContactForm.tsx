import React, { useState, useEffect, useRef } from 'react';
import { Mail, Linkedin, MapPin, Sparkles, ArrowUpRight, Instagram } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    const currentGrid = gridRef.current;
    if (currentGrid) {
      observer.observe(currentGrid);
    }
    return () => {
      if (currentGrid) {
        observer.unobserve(currentGrid);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-[1100px] mx-auto">
      {/* 3 Contact Cards Grid */}
      <div
        ref={gridRef}
        className={`contact-cards-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 ${
          isVisible ? 'is-visible' : ''
        }`}
      >
        {/* Card 1: EMAIL */}
        <div className="contact-card group bg-[#142238] rounded-[24px] p-6 sm:p-8 border border-[rgba(0,191,255,0.15)] flex flex-col items-center text-center justify-between min-h-[300px] card-shadow">
          <div className="flex flex-col items-center w-full">
            {/* Purple Icon Box */}
            <div
              style={{ animationDelay: '0s' }}
              className="contact-icon-box w-16 h-16 rounded-[20px] bg-gradient-to-br from-[#3B1C5A] via-[#2A1645] to-[#1E1138] border border-[#A855F7]/30 flex items-center justify-center text-[#E9D5FF] mb-6 shadow-md"
            >
              <Mail className="w-7 h-7" strokeWidth={1.8} />
            </div>

            {/* Label */}
            <div className="text-[12px] font-mono tracking-[0.2em] text-[#A7B4C9] uppercase mb-2">
              // EMAIL
            </div>

            {/* Value */}
            <a
              href="mailto:maheennadeem567@gmail.com"
              className="text-[15px] sm:text-[17px] font-bold text-[#F5F7FF] hover:text-[#00BFFF] transition-colors duration-200 mb-6 break-all"
            >
              maheennadeem567@gmail.com
            </a>
          </div>

          {/* Action Button */}
          <a
            href="mailto:maheennadeem567@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#2A1645]/80 hover:bg-[#3B1C5A] border border-[#A855F7]/40 text-white text-[13px] font-medium transition-all duration-200 group/btn shadow-sm"
          >
            <span>Send Email</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
          </a>
        </div>

        {/* Card 2: LINKEDIN */}
        <div className="contact-card group bg-[#142238] rounded-[24px] p-6 sm:p-8 border border-[rgba(0,191,255,0.15)] flex flex-col items-center text-center justify-between min-h-[300px] card-shadow">
          <div className="flex flex-col items-center w-full">
            {/* Cyan/Blue Icon Box */}
            <div
              style={{ animationDelay: '0.75s' }}
              className="contact-icon-box w-16 h-16 rounded-[20px] bg-gradient-to-br from-[#0E3A5A] via-[#0B2A42] to-[#081C2E] border border-[#00BFFF]/30 flex items-center justify-center text-[#00BFFF] mb-6 shadow-md"
            >
              <Linkedin className="w-7 h-7" strokeWidth={1.8} />
            </div>

            {/* Label */}
            <div className="text-[12px] font-mono tracking-[0.2em] text-[#A7B4C9] uppercase mb-2">
              // LINKEDIN
            </div>

            {/* Value */}
            <a
              href="https://www.linkedin.com/in/maheen-nadeem-446340405"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] sm:text-[17px] font-bold text-[#F5F7FF] hover:text-[#00BFFF] transition-colors duration-200 mb-6 break-all"
            >
              maheen-nadeem-446340405
            </a>
          </div>

          {/* Action Button */}
          <a
            href="https://www.linkedin.com/in/maheen-nadeem-446340405"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0E3A5A]/80 hover:bg-[#134D78] border border-[#00BFFF]/40 text-white text-[13px] font-medium transition-all duration-200 group/btn shadow-sm"
          >
            <span>View Profile</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
          </a>
        </div>

        {/* Card 3: LOCATION */}
        <div className="contact-card group bg-[#142238] rounded-[24px] p-6 sm:p-8 border border-[rgba(0,191,255,0.15)] flex flex-col items-center text-center justify-between min-h-[300px] card-shadow">
          <div className="flex flex-col items-center w-full">
            {/* Purple Icon Box */}
            <div
              style={{ animationDelay: '1.5s' }}
              className="contact-icon-box w-16 h-16 rounded-[20px] bg-gradient-to-br from-[#3B1C5A] via-[#2A1645] to-[#1E1138] border border-[#A855F7]/30 flex items-center justify-center text-[#E9D5FF] mb-6 shadow-md"
            >
              <MapPin className="w-7 h-7" strokeWidth={1.8} />
            </div>

            {/* Label */}
            <div className="text-[12px] font-mono tracking-[0.2em] text-[#A7B4C9] uppercase mb-2">
              // LOCATION
            </div>

            {/* Value */}
            <div className="text-[15px] sm:text-[17px] font-bold text-[#F5F7FF] mb-6">
              Rawalpindi, Pakistan
            </div>
          </div>

          {/* Open to work Pill - hidden on mobile/tablet, shown on desktop */}
          <div className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00BFFF]/10 border border-[#00BFFF]/30 text-[#00BFFF] text-[13px] font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#00BFFF]" />
            <span>Open to work</span>
          </div>
        </div>
      </div>

      {/* Connect on Socials Section */}
      <div className="flex flex-col items-center justify-center pt-8 border-t border-[rgba(0,191,255,0.12)]">
        <div className="text-[11px] font-mono tracking-[0.25em] text-[#A7B4C9] uppercase mb-4">
          CONNECT ON SOCIALS
        </div>
        <div className="flex items-center justify-center gap-3">
          <a
            href="https://www.linkedin.com/in/maheen-nadeem-446340405"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="w-11 h-11 rounded-[14px] bg-[#0B1730] border border-[rgba(0,191,255,0.2)] hover:border-[#00BFFF] hover:bg-[#00BFFF]/10 flex items-center justify-center text-[#A7B4C9] hover:text-[#00BFFF] transition-all duration-200 group shadow-sm hover:scale-105"
          >
            <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          </a>
          <a
            href="https://www.instagram.com/mahii15531/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Profile"
            className="w-11 h-11 rounded-[14px] bg-[#0B1730] border border-[rgba(0,191,255,0.2)] hover:border-[#00BFFF] hover:bg-[#00BFFF]/10 flex items-center justify-center text-[#A7B4C9] hover:text-[#00BFFF] transition-all duration-200 group shadow-sm hover:scale-105"
          >
            <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          </a>
        </div>
      </div>
    </div>
  );
};
