import React from 'react';
import { Smartphone, FileCode, Sparkles, Gauge, LucideIcon } from 'lucide-react';
import { FeatureItem } from '../data.ts';

const iconMap: Record<FeatureItem['iconName'], LucideIcon> = {
  Smartphone,
  FileCode,
  Sparkles,
  Gauge,
};

interface FeatureCardProps {
  feature: FeatureItem;
  index: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const IconComponent = iconMap[feature.iconName] || Sparkles;

  return (
    <div className="feature-card group">
      <div>
        {/* 40px Icon Box, radius 10px, background rgba(0,191,255,0.10) */}
        <div
          style={{ animationDelay: `${index * 0.75}s` }}
          className="feature-icon-box w-10 h-10 rounded-[10px] bg-[#00BFFF]/10 border border-[#00BFFF]/20 flex items-center justify-center text-[#00BFFF] mb-4"
        >
          <IconComponent className="w-5 h-5" strokeWidth={1.8} aria-hidden="true" />
        </div>

        {/* Card Title: 20px (18px mobile), weight 600 */}
        <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#F5F7FF] tracking-tight mb-2.5 group-hover:text-white transition-colors duration-200">
          {feature.title}
        </h3>

        {/* Card Text: 15px, color #A7B4C9, line-height 1.6 */}
        <p className="text-[15px] text-[#A7B4C9] leading-[1.6]">
          {feature.description}
        </p>
      </div>
    </div>
  );
};
