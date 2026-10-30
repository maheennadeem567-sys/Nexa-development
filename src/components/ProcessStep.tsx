import React from 'react';
import { ProcessStepItem } from '../data.ts';

interface ProcessStepProps {
  step: ProcessStepItem;
  index: number;
  total: number;
}

export const ProcessStep: React.FC<ProcessStepProps> = ({ step, index, total }) => {
  const isLast = index === total - 1;

  return (
    <div className="relative flex flex-row lg:flex-col items-start lg:items-center text-left lg:text-center group">
      {/* Mobile/Tablet vertical connector line */}
      {!isLast && (
        <div
          className="absolute left-[24px] top-[48px] bottom-[-24px] w-[2px] bg-[rgba(0,191,255,0.25)] lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* 48px circle */}
      <div className="relative z-10 w-12 h-12 flex-shrink-0 rounded-full bg-[#0B1730] border-2 border-[#00BFFF] flex items-center justify-center font-mono font-bold text-[16px] text-[#00BFFF] shadow-[0_0_16px_rgba(0,191,255,0.25)] group-hover:bg-[#00BFFF] group-hover:text-[#050817] transition-all duration-250">
        {step.step}
      </div>

      {/* Step details */}
      <div className="ml-5 lg:ml-0 lg:mt-6 pb-8 lg:pb-0">
        <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#F5F7FF] tracking-tight mb-2 group-hover:text-[#00BFFF] transition-colors duration-200">
          {step.title}
        </h3>
        <p className="text-[15px] text-[#A7B4C9] leading-[1.6] max-w-[280px] lg:mx-auto">
          {step.description}
        </p>
      </div>
    </div>
  );
};
