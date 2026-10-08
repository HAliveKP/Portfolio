import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ArrowUp, Terminal, Heart } from 'lucide-react';

interface FooterProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerminal, onOpenResume }) => {
  const { profile } = PORTFOLIO_DATA;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#1F242D] bg-[#07080A] py-16 sm:py-20 px-5 sm:px-8 lg:px-12">
      <div className="max-w-[1360px] mx-auto flex flex-col gap-8">
        {/* Main Footer Row */}
        <div className="flex flex-wrap items-center justify-between gap-6">
          {/* Monogram & Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenTerminal}
              className="px-2.5 py-1 rounded-[4px] bg-[#111418] border border-[#1F242D] hover:border-[#38BDF8] text-xs font-mono font-bold text-[#F3F4F6] hover:text-[#38BDF8] transition-colors"
              title="Click for Terminal Mode (Easter Egg)"
            >
              [ HKP ]
            </button>
            <div>
              <div className="font-syne font-bold text-sm text-[#F3F4F6]">
                {profile.name}
              </div>
              <div className="font-mono text-[11px] text-[#4B5563]">
                {profile.location} · {profile.coordinates}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-[#9CA3AF]">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#38BDF8] transition-colors"
            >
              GITHUB
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#38BDF8] transition-colors"
            >
              LINKEDIN
            </a>
            <button
              onClick={onOpenResume}
              className="hover:text-[#38BDF8] transition-colors"
            >
              RESUME
            </button>
            <button
              onClick={onOpenTerminal}
              className="hover:text-[#00E5FF] transition-colors flex items-center gap-1 text-[#00E5FF]"
            >
              <Terminal className="w-3 h-3" />
              <span>TERMINAL</span>
            </button>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-2 rounded-[4px] bg-[#111418] border border-[#1F242D] hover:border-[#38BDF8] text-xs font-mono text-[#9CA3AF] hover:text-[#38BDF8] transition-colors group"
            aria-label="Scroll back to top"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-[#38BDF8]" />
          </button>
        </div>

        {/* Bottom micro-row */}
        <div className="pt-6 border-t border-[#1F242D]/60 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-[#4B5563]">
          <div>
            DESIGN SYSTEM: OBSIDIAN KINETIC · STRICT ZERO-SLOP DISCIPLINE
          </div>
          <div>
            © 2026 {profile.name}. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
};
