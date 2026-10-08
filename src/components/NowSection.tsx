import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Hammer, BookOpen, Headphones, Clock } from 'lucide-react';

export const NowSection: React.FC = () => {
  const { now } = PORTFOLIO_DATA;

  const categoryIcons = {
    Building: <Hammer className="w-4 h-4 text-[#38BDF8]" />,
    Learning: <BookOpen className="w-4 h-4 text-[#00E5FF]" />,
    Listening: <Headphones className="w-4 h-4 text-[#38BDF8]" />,
  };

  return (
    <section
      id="now"
      className="py-24 sm:py-32 lg:py-40 px-5 sm:px-8 lg:px-12 max-w-[1360px] mx-auto border-t border-[#1F242D]"
      aria-label="Now - Current Endeavors and Changelog"
    >
      {/* Section Header: Aligned flush across grid */}
      <div className="flex flex-col gap-4 mb-16 lg:mb-20">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.06em] text-[#38BDF8]">
            // 06
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.06em] text-[#4B5563]">
            CURRENT FOCUS · WHAT I AM DOING RIGHT NOW
          </span>
        </div>
        <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl text-[#F3F4F6] tracking-tight">
          Now.
        </h2>
        <p className="font-sans text-sm sm:text-base text-[#9CA3AF] max-w-2xl leading-relaxed">
          Inspired by Derek Sivers' /now page concept. A transparent snapshot of my current priorities, active research experiments, and daily listening habits.
        </p>
      </div>

      {/* Changelog-style Card: 8px container, hairline borders */}
      <div className="rounded-[8px] bg-[#111418] border border-[#1F242D] overflow-hidden">
        {/* Card Header with UPDATED OCT 2026 tag */}
        <div className="bg-[#161B22] px-6 lg:px-8 py-4 border-b border-[#1F242D] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.06em] text-[#F3F4F6] font-semibold">
              CHANGELOG & ACTIVE FOCUS
            </span>
            <span className="font-mono text-xs text-[#4B5563]">
              // KATHMANDU
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-[#0B0D10] border border-[#1F242D] font-mono text-[11px] uppercase tracking-[0.06em] text-[#00E5FF]">
              <Clock className="w-3 h-3 text-[#00E5FF]" />
              <span>{now.updated}</span>
            </div>
          </div>
        </div>

        {/* 3 Categories: Aligned to 12-col grid */}
        <div className="divide-y divide-[#1F242D]">
          {now.items.map((item, index) => (
            <div
              key={index}
              className="p-6 sm:p-8 lg:p-9 grid grid-cols-1 md:grid-cols-12 gap-6 items-start hover:bg-[#14181F] transition-colors"
            >
              {/* Category Column: 3 cols */}
              <div className="md:col-span-3 flex items-center gap-3">
                <div className="p-2 rounded-[4px] bg-[#0B0D10] border border-[#1F242D]">
                  {categoryIcons[item.category]}
                </div>
                <div>
                  <div className="font-mono text-xs uppercase tracking-[0.06em] font-semibold text-[#38BDF8]">
                    {item.category}
                  </div>
                  {item.meta && (
                    <div className="font-mono text-[10px] text-[#4B5563] mt-0.5">
                      {item.meta}
                    </div>
                  )}
                </div>
              </div>

              {/* Detail Column: 9 cols */}
              <div className="md:col-span-9 space-y-2">
                <h3 className="font-syne font-bold text-lg sm:text-xl text-[#F3F4F6]">
                  {item.headline}
                </h3>
                <p className="font-sans text-sm text-[#9CA3AF] leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hook into next section */}
      <div className="mt-16 lg:mt-20 pt-8 border-t border-[#1F242D] flex justify-end">
        <button
          onClick={() => {
            const el = document.getElementById('contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="font-mono text-xs uppercase tracking-[0.06em] text-[#9CA3AF] hover:text-[#38BDF8] transition-colors flex items-center gap-2 group"
        >
          <span>NEXT → CONTACT</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </section>
  );
};
