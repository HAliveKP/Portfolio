import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { FileText, ChevronRight, CornerDownLeft } from 'lucide-react';

interface HeroProps {
  onOpenResume: () => void;
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, onOpenTerminal }) => {
  const { profile } = PORTFOLIO_DATA;

  // Terminal typewriter effect
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [isTypingDone, setIsTypingDone] = useState(false);

  const terminalOutput = [
    { cmd: '$ whoami', delay: 350 },
    { out: `name:     ${profile.name} (${profile.handle})`, delay: 650 },
    { out: `role:     ${profile.title}`, delay: 950 },
    { out: `degree:   BSc (Hons) AI @ Coventry Univ. (Softwarica)`, delay: 1250 },
    { out: `location: ${profile.location} [${profile.coordinates}]`, delay: 1550 },
    { out: `focus:    Grounded RAG · Safety Gates · Toy Systems`, delay: 1850 },
    { out: `status:   Active research & building // Khula Gyan`, delay: 2150 },
  ];

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    terminalOutput.forEach((item, index) => {
      const t = setTimeout(() => {
        setTypedLines((prev) => [
          ...prev,
          item.cmd ? item.cmd : `  ${item.out}`,
        ]);
        if (index === terminalOutput.length - 1) {
          setIsTypingDone(true);
        }
      }, item.delay);
      timeouts.push(t);
    });

    return () => timeouts.forEach((t) => clearTimeout(t));
  }, []);

  const handleScrollToWork = () => {
    const el = document.getElementById('work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToProof = () => {
    const el = document.getElementById('proof');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-16 px-5 sm:px-8 lg:px-12 max-w-[1360px] mx-auto"
      aria-label="Introduction & Overview"
    >
      {/* Top micro metadata header */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-b border-[#1F242D] pb-5">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#38BDF8]">
            // 00
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#4B5563]">
            INITIALIZATION · SYSTEM REPO
          </span>
          <span className="text-[#1F242D]">/</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#9CA3AF]">
            KATHMANDU · NEPAL
          </span>
        </div>

        {/* Status chip with pulsing live dot (permitted exception) */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#111418] border border-[#1F242D]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E5FF]"></span>
          </span>
          <span className="font-mono text-[11px] font-medium tracking-[0.06em] uppercase text-[#F3F4F6]">
            {profile.status}
          </span>
        </div>
      </div>

      {/* Main hero grid: Strict 12-column architectural grid with gallery pacing */}
      <div className="my-auto py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: 7 cols */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="inline-flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.06em] text-[#38BDF8]">
              STUDENT & BUILDER
            </span>
            <span className="w-8 h-[1px] bg-[#1F242D]" />
            <span className="font-mono text-xs uppercase tracking-[0.06em] text-[#9CA3AF]">
              {profile.name}
            </span>
          </div>

          <h1 className="font-syne font-extrabold text-4xl sm:text-5xl lg:text-[64px] tracking-tight leading-[1.05] text-[#F3F4F6]">
            I build things to{' '}
            <span className="relative inline-block text-[#F3F4F6]">
              figure
              <span
                className="absolute left-0 bottom-1 sm:bottom-2 w-full h-[3px] bg-[#38BDF8]"
                aria-hidden="true"
              />
            </span>{' '}
            them out.
          </h1>

          <p className="text-base sm:text-lg text-[#9CA3AF] max-w-2xl leading-relaxed font-sans">
            AI student at Coventry University via Softwarica College in Kathmandu. Building grounded retrieval systems, verifiable agent safety gates, and first-principles toy models to understand modern artificial intelligence from the ground up.
          </p>

          {/* Action buttons: 4px radius, no heavy drop shadows */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={handleScrollToWork}
              className="px-6 py-3.5 rounded-[4px] bg-[#F3F4F6] hover:bg-white text-[#0B0D10] font-syne font-bold text-xs tracking-wider uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#38BDF8]"
            >
              [ VIEW WORK ]
            </button>

            <button
              onClick={onOpenResume}
              className="px-6 py-3.5 rounded-[4px] bg-[#111418] hover:bg-[#161B22] border border-[#1F242D] hover:border-[#38BDF8]/60 text-[#F3F4F6] hover:text-[#38BDF8] font-mono text-xs tracking-[0.06em] uppercase transition-colors flex items-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#38BDF8]"
            >
              <FileText className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>[ RESUME ]</span>
            </button>
          </div>

          {/* Quick anchor tags */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-[#4B5563]">
            <span>EXPLORE:</span>
            <button
              onClick={() => {
                const el = document.getElementById('khula-gyan-case-study');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[#9CA3AF] hover:text-[#38BDF8] transition-colors underline decoration-[#1F242D] hover:decoration-[#38BDF8]"
            >
              Khula Gyan (RAG)
            </button>
            <span>·</span>
            <button
              onClick={() => {
                const el = document.getElementById('thinking');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[#9CA3AF] hover:text-[#38BDF8] transition-colors underline decoration-[#1F242D] hover:decoration-[#38BDF8]"
            >
              3 Principles
            </button>
            <span>·</span>
            <button
              onClick={() => {
                const el = document.getElementById('beyond');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[#9CA3AF] hover:text-[#38BDF8] transition-colors underline decoration-[#1F242D] hover:decoration-[#38BDF8]"
            >
              Songwriting
            </button>
          </div>
        </div>

        {/* Right Column: 5 cols terminal whoami card (no heavy shadow, rectilinear notches) */}
        <div className="lg:col-span-5">
          <div className="relative rounded-[8px] bg-[#07080A] border border-[#1F242D] overflow-hidden transition-colors hover:border-[#38BDF8]/40">
            {/* Terminal Header Bar */}
            <div className="bg-[#111418] px-4 py-3 border-b border-[#1F242D] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-[1px] bg-[#1F242D]" />
                <span className="w-2 h-2 rounded-[1px] bg-[#1F242D]" />
                <span className="w-2 h-2 rounded-[1px] bg-[#1F242D]" />
                <span className="ml-2 font-mono text-[11px] text-[#9CA3AF] tracking-[0.06em]">
                  hkp@terminal: ~/whoami
                </span>
              </div>
              <button
                onClick={onOpenTerminal}
                className="font-mono text-[10px] text-[#38BDF8] hover:underline tracking-wider uppercase"
                title="Launch full CLI"
              >
                INTERACTIVE CLI ↗
              </button>
            </div>

            {/* Terminal Output Body */}
            <div className="p-5 font-mono text-xs leading-relaxed text-[#F3F4F6] min-h-[280px] flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="text-[#4B5563] text-[11px]">
                  # System verification: session established 2026.
                </div>
                {typedLines.map((line, idx) => {
                  const isCmd = line.startsWith('$');
                  return (
                    <div
                      key={idx}
                      className={
                        isCmd
                          ? 'text-[#38BDF8] font-semibold flex items-center gap-1.5'
                          : 'text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors'
                      }
                    >
                      {isCmd ? (
                        <>
                          <ChevronRight className="w-3.5 h-3.5 text-[#00E5FF]" />
                          <span>{line.replace('$', '').trim()}</span>
                        </>
                      ) : (
                        <span>{line}</span>
                      )}
                    </div>
                  );
                })}

                {/* Blinking cursor */}
                {!isTypingDone && (
                  <div className="flex items-center gap-1 text-[#00E5FF]">
                    <span className="inline-block w-2 h-4 bg-[#00E5FF] animate-pulse" />
                  </div>
                )}
              </div>

              {/* Terminal quick execution hint */}
              <div className="pt-4 mt-4 border-t border-[#1F242D] flex items-center justify-between text-[11px] text-[#4B5563]">
                <span>Type `help` in CLI overlay</span>
                <button
                  onClick={onOpenTerminal}
                  className="text-[#00E5FF] hover:underline flex items-center gap-1"
                >
                  <span>RUN COMMANDS</span>
                  <CornerDownLeft className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar with Bouncing SCROLL cue */}
      <div className="pt-6 border-t border-[#1F242D] flex flex-wrap items-center justify-between gap-4">
        <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#4B5563]">
          LOC: KATHMANDU [27.71° N, 85.32° E] · TIMEZONE: UTC+5:45
        </div>

        <button
          onClick={handleScrollToProof}
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.06em] text-[#9CA3AF] hover:text-[#38BDF8] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#38BDF8] px-2 py-1 rounded-[4px]"
          aria-label="Scroll down to proof strip"
        >
          <span>SCROLL</span>
          <span className="inline-block animate-bounce text-[#38BDF8]">↓</span>
        </button>

        <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#4B5563]">
          NEXT → VERIFIED PROOF
        </div>
      </div>
    </section>
  );
};
