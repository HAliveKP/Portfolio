import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ShieldCheck, BookOpenCheck, Box, Quote } from 'lucide-react';

export const HowIThink: React.FC = () => {
  const { principles } = PORTFOLIO_DATA;
  const [selectedPrinciple, setSelectedPrinciple] = useState(0);

  const principleIcons = [
    <ShieldCheck className="w-5 h-5 text-[#38BDF8]" key="shield" />,
    <BookOpenCheck className="w-5 h-5 text-[#00E5FF]" key="book" />,
    <Box className="w-5 h-5 text-[#38BDF8]" key="box" />,
  ];

  return (
    <section
      id="thinking"
      className="py-24 sm:py-32 lg:py-40 px-5 sm:px-8 lg:px-12 max-w-[1360px] mx-auto border-t border-[#1F242D]"
      aria-label="Core Principles and Philosophy"
    >
      {/* Section Header: Aligned flush across grid */}
      <div className="flex flex-col gap-4 mb-16 lg:mb-20">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.06em] text-[#38BDF8]">
            // 03
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.06em] text-[#4B5563]">
            ENGINEERING PHILOSOPHY & HEURISTICS
          </span>
        </div>
        <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl text-[#F3F4F6] tracking-tight">
          How I Think.
        </h2>
        <p className="font-sans text-sm sm:text-base text-[#9CA3AF] max-w-2xl leading-relaxed">
          Three non-negotiable principles distilled directly from building retrieval pipelines, agent runtimes, and low-level toy implementations.
        </p>
      </div>

      {/* 3 Principles Grid: Aligned flush to 12-col grid (each 4 cols on lg) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {principles.map((p, idx) => {
          const isSelected = selectedPrinciple === idx;
          return (
            <div
              key={p.number}
              onClick={() => setSelectedPrinciple(idx)}
              className={`p-7 lg:p-8 rounded-[8px] bg-[#111418] border transition-colors cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-[#38BDF8]/60 bg-[#161B22]'
                  : 'border-[#1F242D] hover:border-[#38BDF8]/30 hover:bg-[#14181F]'
              }`}
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#38BDF8]">
                      // {p.number}
                    </span>
                    <span className="w-4 h-[1px] bg-[#1F242D]" />
                    <span className="font-mono text-[10px] text-[#4B5563] tracking-[0.06em] uppercase">
                      {p.subtitle}
                    </span>
                  </div>
                  <div className="p-2 rounded-[4px] bg-[#0B0D10] border border-[#1F242D]">
                    {principleIcons[idx]}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-syne font-bold text-xl sm:text-2xl text-[#F3F4F6] tracking-tight mb-3">
                  {p.title}
                </h3>

                {/* Thesis */}
                <p className="font-sans text-xs sm:text-sm text-[#9CA3AF] leading-relaxed mb-6">
                  {p.thesis}
                </p>

                {/* Practical Example from real project */}
                <div className="p-4 rounded-[4px] bg-[#0B0D10] border border-[#1F242D] mb-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#00E5FF] mb-1.5">
                    IN PRACTICE
                  </div>
                  <p className="font-sans text-xs text-[#F3F4F6] leading-relaxed">
                    {p.practicalExample}
                  </p>
                </div>
              </div>

              {/* Quote footer */}
              <div className="pt-5 border-t border-[#1F242D] mt-4">
                <div className="flex items-start gap-2 text-xs font-sans italic text-[#9CA3AF]">
                  <Quote className="w-3.5 h-3.5 text-[#38BDF8] shrink-0 mt-0.5" />
                  <span>"{p.quote}"</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hook into next section */}
      <div className="mt-16 lg:mt-20 pt-8 border-t border-[#1F242D] flex justify-end">
        <button
          onClick={() => {
            const el = document.getElementById('journey');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="font-mono text-xs uppercase tracking-[0.06em] text-[#9CA3AF] hover:text-[#38BDF8] transition-colors flex items-center gap-2 group"
        >
          <span>NEXT → JOURNEY</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </section>
  );
};
