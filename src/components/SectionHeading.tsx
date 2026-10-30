import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = 'center',
  className = '',
}) => {
  const alignmentClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-[760px] mb-12 ${alignmentClass} ${className}`}>
      {badge && (
        <div className="section-badge-pill inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#00BFFF]/10 border border-[#00BFFF]/25 text-[#00BFFF] text-[13px] font-medium tracking-wide mb-3 select-none">
          <span className="section-badge-dot" />
          <span>{badge}</span>
        </div>
      )}
      <h2 className="text-[28px] lg:text-[40px] font-bold text-[#F5F7FF] tracking-tight leading-[1.2] mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-[16px] text-[#A7B4C9] leading-[1.6] max-w-[560px] ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
