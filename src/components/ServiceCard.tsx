import React, { useState, useEffect, useRef } from 'react';
import {
  Globe,
  Smartphone,
  Layout,
  ShoppingCart,
  Code2,
  Sparkles,
  LucideIcon,
} from 'lucide-react';
import { ServiceItem } from '../data.ts';
import { SERVICES_TIMINGS } from '../constants/servicesAnimation.ts';

const iconMap: Record<ServiceItem['iconName'], LucideIcon> = {
  Globe,
  Smartphone,
  Layout,
  ShoppingCart,
  Code2,
  Sparkles,
};

const iconAnimationClassMap: Record<ServiceItem['iconName'], string> = {
  Globe: 'service-icon-globe',
  Smartphone: 'service-icon-phone',
  Layout: 'service-icon-layout',
  ShoppingCart: 'service-icon-cart',
  Code2: 'service-icon-code',
  Sparkles: 'service-icon-sparkles',
};

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
  onSelectService?: (serviceTitle: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  index,
  onSelectService,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const IconComponent = iconMap[service.iconName] || Globe;
  const iconAnimClass = iconAnimationClassMap[service.iconName] || '';

  // Entrance Observer (triggered when 20% visible)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const currentCard = cardRef.current;
    if (!currentCard) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(currentCard);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(currentCard);
    return () => {
      observer.disconnect();
    };
  }, []);

  const cardDelay = SERVICES_TIMINGS.ENTRANCE_START + index * SERVICES_TIMINGS.CARD_STAGGER;
  const iconDelay = cardDelay + 150;

  const handleGetQuoteClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onSelectService) {
      onSelectService(service.title);
    }
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={cardRef}
      className={`service-card group relative flex flex-col justify-between bg-[#142238] rounded-[16px] p-5 sm:p-6 border border-[rgba(0,191,255,0.15)] overflow-hidden h-full ${
        isVisible ? 'service-card-entrance' : 'opacity-0'
      }`}
      style={{
        animationDelay: isVisible ? `${cardDelay}ms` : '0ms',
        animationDuration: `${SERVICES_TIMINGS.CARD_DURATION}ms`,
      }}
    >
      {/* 2px cyan gradient line along top edge */}
      <div
        className="service-top-line absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00BFFF]/20 via-[#00BFFF] to-[#00BFFF]/20 origin-left transition-transform duration-300 ease-out"
        style={{
          transform: 'scaleX(0)',
        }}
        aria-hidden="true"
      />

      {/* Diagonal light shine sweep overlay */}
      <div
        className="service-shine absolute -inset-full pointer-events-none bg-gradient-to-r from-transparent via-[rgba(0,191,255,0.10)] to-transparent w-[80px] -z-0"
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Top row: 44px icon box on the left, title on the right */}
        <div className="flex items-center gap-3.5 mb-4">
          <div
            className={`service-icon-box w-11 h-11 rounded-[12px] bg-[#00BFFF]/10 border border-[#00BFFF]/20 flex items-center justify-center text-[#00BFFF] flex-shrink-0 transition-colors duration-250 ${
              isVisible ? 'service-icon-pop' : 'opacity-0'
            }`}
            style={{
              animationDelay: isVisible ? `${iconDelay}ms` : '0ms',
              animationDuration: '400ms',
            }}
            aria-hidden="true"
          >
            <IconComponent className={`w-5 h-5 ${iconAnimClass}`} strokeWidth={1.75} />
          </div>

          <h3 className="service-card-title text-[18px] font-semibold text-[#F5F7FF] tracking-tight leading-[1.3] min-h-[2.6em] flex items-center">
            {service.title}
          </h3>
        </div>

        {/* Description: 14px, line-height 1.5, max 3 lines */}
        <p className="text-[14px] text-[#A7B4C9] leading-[1.5] line-clamp-3">
          {service.description}
        </p>
      </div>

      {/* Footer row pinned to bottom with margin-top: auto, separated by 1px divider */}
      <div className="relative z-10 mt-auto pt-3.5 border-t border-[rgba(0,191,255,0.12)] flex items-center justify-end">
        <a
          href="#contact"
          onClick={handleGetQuoteClick}
          className="service-link inline-flex items-center gap-1.5 py-1 px-2 -mx-2 rounded text-[14px] font-medium text-[#00BFFF] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#00BFFF] focus-visible:outline-offset-2 relative group/link min-h-[44px] sm:min-h-0 flex items-center"
          aria-label={`Get a quote for ${service.title}`}
        >
          <span>Get Quote</span>
          <span
            className="service-link-arrow inline-block transition-transform duration-200"
            aria-hidden="true"
          >
            &rarr;
          </span>
          <span
            className="service-link-underline absolute bottom-0.5 left-2 right-2 h-[1px] bg-[#00BFFF] origin-left scale-x-0 transition-transform duration-200 ease-out"
            aria-hidden="true"
          />
        </a>
      </div>
    </div>
  );
};
