import React, { useState } from 'react';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '../data.ts';

interface ProjectCardProps {
  project: ProjectItem;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [showDemoNotice, setShowDemoNotice] = useState(false);
  const isPersonalPortfolio = project.id === 'personal-portfolio';

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (project.url === '#' || !project.url) {
      e.preventDefault();
      setShowDemoNotice(true);
      setTimeout(() => setShowDemoNotice(false), 3000);
    }
  };

  const renderPreviewGraphic = () => {
    if (isPersonalPortfolio) {
      return (
        <div className="w-full h-[180px] relative overflow-hidden bg-[#0B1730]">
          <img
          src="/assets/aistudio/maheen-portfolio-workspace.png"
            alt="Maheen Portfolio Workspace"
            className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
          {/* Subtle overlay badge on hover */}
          <div className="absolute inset-0 bg-[#050817]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00BFFF] text-[#050817] text-[13px] font-semibold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
              <span>View Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
          </div>
        </div>
      );
    }

    switch (project.id) {
      case 'weather-forecast':
        return (
          <div className="w-full h-[180px] bg-gradient-to-br from-[#0B1D3A] via-[#0D2447] to-[#071328] relative overflow-hidden flex flex-col justify-between p-4 select-none">
            <div className="flex items-center justify-between z-10">
              <span className="text-[11px] font-mono tracking-wider uppercase text-[#00BFFF] bg-[#00BFFF]/10 border border-[#00BFFF]/20 px-2 py-0.5 rounded">
                Live Forecast API
              </span>
              <span className="text-[12px] text-[#A7B4C9]">San Francisco, CA</span>
            </div>
            <div className="flex items-center justify-between z-10 px-2">
              <div>
                <div className="text-[32px] font-bold text-white tracking-tight leading-none">
                  24°C
                </div>
                <div className="text-[12px] text-[#A7B4C9] mt-0.5">Partly Cloudy · 68% Hum</div>
              </div>
              <svg className="w-14 h-14 text-[#00BFFF]" viewBox="0 0 64 64" fill="none">
                <circle cx="28" cy="28" r="14" fill="#00BFFF" fillOpacity="0.25" stroke="#00BFFF" strokeWidth="2.5" />
                <path
                  d="M20 44h26a10 10 0 0 0 0-20 12 12 0 0 0-23-4 10 10 0 0 0-3 24z"
                  fill="#142238"
                  stroke="#38BDF8"
                  strokeWidth="2.5"
                />
              </svg>
            </div>
            <div className="grid grid-cols-4 gap-1.5 z-10 pt-1 border-t border-[rgba(0,191,255,0.15)] text-[11px] text-center">
              <span className="text-[#A7B4C9]">Mon <strong className="text-white">22°</strong></span>
              <span className="text-[#A7B4C9]">Tue <strong className="text-[#00BFFF]">24°</strong></span>
              <span className="text-[#A7B4C9]">Wed <strong className="text-white">21°</strong></span>
              <span className="text-[#A7B4C9]">Thu <strong className="text-white">25°</strong></span>
            </div>
          </div>
        );

      case 'online-quiz':
        return (
          <div className="w-full h-[180px] bg-gradient-to-br from-[#0B1D3A] via-[#0E2648] to-[#071328] relative overflow-hidden flex flex-col justify-between p-4 select-none">
            <div className="flex items-center justify-between z-10">
              <span className="text-[11px] font-mono tracking-wider uppercase text-[#00BFFF] bg-[#00BFFF]/10 border border-[#00BFFF]/20 px-2 py-0.5 rounded">
                Quiz Engine v2
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 bg-[#142238] border border-[rgba(0,191,255,0.2)] text-[#00BFFF] rounded">
                00:45s
              </span>
            </div>
            <div className="z-10 mt-1">
              <div className="text-[12px] text-[#A7B4C9]">Question 04 of 10</div>
              <div className="text-[13px] font-medium text-white truncate mt-0.5">
                Which data structure guarantees O(1) key lookups?
              </div>
            </div>
            <div className="space-y-1.5 z-10">
              <div className="flex items-center justify-between px-2.5 py-1 rounded bg-[#00BFFF]/15 border border-[#00BFFF]/50 text-[12px] text-[#00BFFF]">
                <span>B. Hash Map / Dictionary</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div className="flex items-center justify-between px-2.5 py-1 rounded bg-[#142238]/80 border border-white/5 text-[12px] text-[#A7B4C9]">
                <span>C. Binary Search Tree</span>
                <span className="text-[10px] text-gray-500">Choice</span>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-[180px] bg-gradient-to-br from-[#0B1D3A] via-[#0F284B] to-[#071328] relative overflow-hidden flex flex-col justify-between p-4 select-none">
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              </div>
              <span className="text-[11px] font-mono text-[#A7B4C9]">portfolio.developer.dev</span>
            </div>
            <div className="flex items-center gap-3 z-10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#00BFFF] to-[#38BDF8] p-[2px] flex-shrink-0">
                <div className="w-full h-full rounded-full bg-[#142238] flex items-center justify-center font-bold text-[#00BFFF] text-sm">
                  DEV
                </div>
              </div>
              <div>
                <div className="text-[14px] font-bold text-white tracking-tight">Alex Morgan</div>
                <div className="text-[12px] text-[#00BFFF]">Full-Stack Web Engineer</div>
              </div>
            </div>
            <div className="flex items-center gap-2 z-10 pt-2 border-t border-[rgba(0,191,255,0.15)] text-[11px]">
              <span className="px-2 py-0.5 rounded bg-[#142238] text-[#A7B4C9] border border-white/5">TypeScript</span>
              <span className="px-2 py-0.5 rounded bg-[#142238] text-[#A7B4C9] border border-white/5">Tailwind</span>
              <span className="px-2 py-0.5 rounded bg-[#00BFFF]/10 text-[#00BFFF] border border-[#00BFFF]/20">Open to Work</span>
            </div>
          </div>
        );
    }
  };

  const isRealUrl = Boolean(project.url && project.url !== '#');

  const cardContent = (
    <div className="group flex flex-col justify-between bg-[#142238] rounded-[16px] overflow-hidden border border-[rgba(0,191,255,0.15)] hover:border-[rgba(0,191,255,0.45)] hover:-translate-y-[6px] hover:shadow-[0_0_24px_rgba(0,191,255,0.2)] transition-all duration-[250ms] ease card-shadow w-full max-w-[340px] aspect-square mx-auto">
      <div className="flex flex-col h-full">
        <div className="w-full h-[45%] border-b border-[rgba(0,191,255,0.12)] bg-[#0B1730] overflow-hidden rounded-t-[16px]">
          {isPersonalPortfolio ? (
            renderPreviewGraphic()
          ) : (
            <div className="w-full h-full transform transition-transform duration-300 ease-out group-hover:scale-[1.04]">
              {renderPreviewGraphic()}
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col justify-between flex-grow">
          <div>
            <div className="text-[11px] font-mono text-[#00BFFF] uppercase tracking-wider mb-1">
              {project.category}
            </div>
            <h3 className="text-[18px] font-semibold text-[#F5F7FF] tracking-tight mb-1 group-hover:text-white transition-colors duration-200 truncate">
              {project.title}
            </h3>
            <p className="text-[13px] text-[#A7B4C9] leading-[1.5] mb-2.5 line-clamp-3 overflow-hidden">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-1">
            {project.tech.map((t) => (
              <span
                key={t}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-mono bg-[#0B1730] text-[#A7B4C9] border border-[rgba(0,191,255,0.15)] group-hover:border-[rgba(0,191,255,0.3)] transition-colors duration-200"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 pt-0">
        <div className="relative">
          <span
            className="w-full h-[38px] inline-flex items-center justify-center gap-2 rounded-[10px] border border-[rgba(0,191,255,0.35)] text-[#00BFFF] bg-[#00BFFF]/5 group-hover:bg-[#00BFFF] group-hover:text-[#050817] font-medium text-[14px] transition-all duration-200"
            aria-hidden="true"
          >
            <span>View Project</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </span>

          {showDemoNotice && (
            <div
              role="alert"
              className="absolute -top-12 left-1/2 -translate-x-1/2 w-[90%] bg-[#050817] text-[#00BFFF] border border-[#00BFFF]/40 text-[12px] py-1.5 px-3 rounded shadow-lg text-center font-medium animate-fade-in"
            >
              Demo URL placeholder in data.ts
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (isPersonalPortfolio) {
    return (
      <a
        href={project.url}
        onClick={handleLinkClick}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full focus-visible:outline-2 focus-visible:outline-[#00BFFF] focus-visible:outline-offset-2 rounded-[16px]"
        aria-label={`View ${project.title} live site`}
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
};
