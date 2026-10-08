import React, { useRef, useEffect, useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { MapPin, Building2, CheckCircle2 } from 'lucide-react';

export const Journey: React.FC = () => {
  const { timeline } = PORTFOLIO_DATA;
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalHeight = rect.height;
      const visibleTop = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, visibleTop / (totalHeight + windowHeight * 0.4)));
      setScrollPercentage(progress * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="journey"
      ref={containerRef}
      className="py-24 sm:py-32 lg:py-40 px-5 sm:px-8 lg:px-12 max-w-[1360px] mx-auto border-t border-[#1F242D]"
      aria-label="Academic and Technical Journey"
    >
      {/* Section Header: Aligned flush across grid */}
      <div className="flex flex-col gap-4 mb-16 lg:mb-20">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.06em] text-[#38BDF8]">
            // 04
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.06em] text-[#4B5563]">
            TIMELINE & TRAJECTORY (EDITABLE VIA DATA FILE)
          </span>
        </div>
        <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl text-[#F3F4F6] tracking-tight">
          Journey.
        </h2>
        <p className="font-sans text-sm sm:text-base text-[#9CA3AF] max-w-2xl leading-relaxed">
          From self-taught programming and acoustic exploration to studying Artificial Intelligence at Coventry University and co-founding the AWS Cloud Club in Kathmandu.
        </p>
      </div>

      {/* Timeline Layout */}
      <div className="relative pl-6 sm:pl-10 md:pl-12 lg:pl-16">
        {/* Background Vertical Hairline */}
        <div
          className="absolute left-[11px] sm:left-[19px] md:left-[23px] lg:left-[31px] top-4 bottom-4 w-[1px] bg-[#1F242D]"
          aria-hidden="true"
        />

        {/* Dynamic Downward Drawing Line: Solid #38BDF8, strictly no gradients */}
        <div
          className="absolute left-[11px] sm:left-[19px] md:left-[23px] lg:left-[31px] top-4 w-[2px] bg-[#38BDF8] transition-all duration-150"
          style={{ height: `${Math.min(100, Math.max(0, scrollPercentage))}%` }}
          aria-hidden="true"
        />

        {/* Timeline Entries */}
        <div className="space-y-12 sm:space-y-16">
          {timeline.map((entry, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Marker Node (4px rounded container with tiny status dot) */}
              <div
                className="absolute -left-[27px] sm:-left-[35px] md:-left-[39px] lg:-left-[47px] top-1.5 w-7 h-7 rounded-[4px] bg-[#0B0D10] border border-[#1F242D] flex items-center justify-center group-hover:border-[#38BDF8] transition-colors"
                aria-hidden="true"
              >
                <span className="w-2 h-2 rounded-full bg-[#38BDF8] group-hover:bg-[#00E5FF] transition-colors" />
              </div>

              {/* Timeline Card */}
              <div className="p-6 sm:p-8 lg:p-9 rounded-[8px] bg-[#111418] border border-[#1F242D] hover:border-[#38BDF8]/40 transition-colors">
                {/* Year & Institution Row */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="font-syne font-bold text-2xl sm:text-3xl text-[#F3F4F6]">
                      {entry.year}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.06em] text-[#38BDF8] bg-[#0B0D10] px-2.5 py-1 rounded-[4px] border border-[#1F242D]">
                      {entry.role}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs text-[#9CA3AF]">
                    <MapPin className="w-3.5 h-3.5 text-[#4B5563]" />
                    <span>{entry.location}</span>
                  </div>
                </div>

                {/* Institution name */}
                <div className="flex items-center gap-2 text-xs font-mono text-[#9CA3AF] mb-4">
                  <Building2 className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>{entry.institution}</span>
                </div>

                {/* Description */}
                <p className="font-sans text-xs sm:text-sm text-[#9CA3AF] leading-relaxed mb-5">
                  {entry.description}
                </p>

                {/* Highlights */}
                {entry.highlights && entry.highlights.length > 0 && (
                  <div className="pt-4 border-t border-[#1F242D] space-y-2">
                    <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#4B5563]">
                      KEY FOCUS & MILESTONES:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {entry.highlights.map((h, hIdx) => (
                        <div
                          key={hIdx}
                          className="flex items-start gap-2 text-xs font-sans text-[#F3F4F6]"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hook into next section */}
      <div className="mt-16 lg:mt-20 pt-8 border-t border-[#1F242D] flex justify-end">
        <button
          onClick={() => {
            const el = document.getElementById('beyond');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="font-mono text-xs uppercase tracking-[0.06em] text-[#9CA3AF] hover:text-[#38BDF8] transition-colors flex items-center gap-2 group"
        >
          <span>NEXT → BEYOND CODE</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </section>
  );
};
