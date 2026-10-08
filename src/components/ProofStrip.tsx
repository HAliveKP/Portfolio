import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GraduationCap, GitBranch, Cloud, MapPin } from 'lucide-react';

export const ProofStrip: React.FC = () => {
  const { proofFacts } = PORTFOLIO_DATA;

  const icons = [
    <GraduationCap className="w-4 h-4 text-[#38BDF8]" key="grad" />,
    <GitBranch className="w-4 h-4 text-[#00E5FF]" key="git" />,
    <Cloud className="w-4 h-4 text-[#38BDF8]" key="cloud" />,
    <MapPin className="w-4 h-4 text-[#00E5FF]" key="pin" />,
  ];

  return (
    <section
      id="proof"
      className="py-24 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-12 max-w-[1360px] mx-auto border-t border-[#1F242D]"
      aria-label="Verified Facts and Proof"
    >
      <div className="flex flex-col gap-10">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.06em] text-[#38BDF8]">
              // 01
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.06em] text-[#4B5563]">
              VERIFIED BACKGROUND · NO INFLATED METRICS
            </span>
          </div>
          <div className="font-mono text-[11px] text-[#4B5563] tracking-[0.06em]">
            PROVENANCE: VERIFIABLE
          </div>
        </div>

        {/* 4 Proof Facts Grid: Aligned flush across the 12-col architectural layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {proofFacts.map((fact, index) => (
            <div
              key={index}
              className="p-6 rounded-[8px] bg-[#111418] border border-[#1F242D] hover:border-[#38BDF8]/40 transition-colors flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-[10px] tracking-[0.06em] uppercase text-[#4B5563] group-hover:text-[#9CA3AF] transition-colors">
                  {fact.label}
                </span>
                <div className="p-1.5 rounded-[4px] bg-[#0B0D10] border border-[#1F242D]">
                  {icons[index % icons.length]}
                </div>
              </div>

              <div>
                <div className="font-mono text-base font-semibold text-[#F3F4F6] tracking-tight group-hover:text-white transition-colors">
                  {fact.value}
                </div>
                <div className="font-sans text-xs text-[#9CA3AF] mt-2 leading-relaxed">
                  {fact.sub}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1F242D]/60 flex items-center justify-between text-[10px] font-mono text-[#4B5563]">
                <span>INDEX #0{index + 1}</span>
                <span className="text-[#38BDF8]/70">CONFIRMED</span>
              </div>
            </div>
          ))}
        </div>

        {/* Hook into next section */}
        <div className="pt-8 border-t border-[#1F242D] flex justify-end">
          <button
            onClick={() => {
              const el = document.getElementById('work');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="font-mono text-xs uppercase tracking-[0.06em] text-[#9CA3AF] hover:text-[#38BDF8] transition-colors flex items-center gap-2 group"
          >
            <span>NEXT → FEATURED WORK</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};
