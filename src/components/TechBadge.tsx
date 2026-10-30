import React from 'react';
import { TechBadgeItem } from '../data.ts';
import { HERO_TIMINGS } from '../constants/heroAnimation.ts';

export interface TechBadgeProps {
  tech: TechBadgeItem;
  index: number;
}

export const TechBadge: React.FC<TechBadgeProps> = ({ tech, index }) => {
  const entranceDelay = HERO_TIMINGS.TECH_BADGES_START + index * HERO_TIMINGS.BADGE_STAGGER;

  return (
    <li
      style={
        {
          animationDelay: `${entranceDelay}ms`,
          '--i': index,
          '--dot': tech.dotColor,
        } as React.CSSProperties
      }
      className="tech-badge-entrance tech-badge-item group relative overflow-hidden h-[32px] px-4 rounded-full bg-[#0B1730] border border-[rgba(0,191,255,0.2)] text-[#F5F7FF] text-[13px] font-mono inline-flex items-center justify-center select-none cursor-default"
    >
      {/* Soft light shine sweep across badge on hover */}
      <span aria-hidden="true" className="tech-badge-shine" />

      {/* 6px colored dot positioned absolutely 10px from left edge, vertically centered */}
      <span
        aria-hidden="true"
        className="tech-badge-dot"
        style={{ backgroundColor: tech.dotColor }}
      />

      {/* Text perfectly centered with 16px equal padding at rest, slides 6px right on hover */}
      <span className="tech-badge-text whitespace-nowrap">{tech.name}</span>
    </li>
  );
};
