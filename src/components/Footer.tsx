import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-[#050817] border-t border-[rgba(0,191,255,0.15)] py-8 text-[#A7B4C9]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between text-[14px] text-[#A7B4C9] gap-4">
          <p>© {currentYear} Nexa. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[13px]">
            <a
              href="#services"
              onClick={(e) => handleLinkClick(e, '#services')}
              className="hover:text-[#00BFFF] transition-colors"
            >
              Services
            </a>
            <a
              href="#portfolio"
              onClick={(e) => handleLinkClick(e, '#portfolio')}
              className="hover:text-[#00BFFF] transition-colors"
            >
              Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="hover:text-[#00BFFF] transition-colors"
            >
              Free Quote
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
