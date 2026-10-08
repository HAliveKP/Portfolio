import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { acousticSynth } from '../utils/audioSynth';
import { Music, Play, Square, Volume2, Disc } from 'lucide-react';

export const BeyondCode: React.FC = () => {
  const { beyondCode } = PORTFOLIO_DATA;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [bpm] = useState(76);

  useEffect(() => {
    acousticSynth.setOnNote((step) => {
      setCurrentStep(step);
    });

    return () => {
      acousticSynth.stop();
    };
  }, []);

  const togglePlayback = () => {
    if (isPlaying) {
      acousticSynth.stop();
      setIsPlaying(false);
      setCurrentStep(null);
    } else {
      acousticSynth.start(bpm);
      setIsPlaying(true);
    }
  };

  return (
    <section
      id="beyond"
      className="py-24 sm:py-32 lg:py-40 px-5 sm:px-8 lg:px-12 max-w-[1360px] mx-auto border-t border-[#1F242D]"
      aria-label="Beyond Code - Music and Songwriting"
    >
      {/* Section Header: Aligned flush across grid */}
      <div className="flex flex-col gap-4 mb-16 lg:mb-20">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.06em] text-[#38BDF8]">
            // 05
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.06em] text-[#4B5563]">
            PARALLEL CRAFT · SONGWRITING & COMPOSITION
          </span>
        </div>
        <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl text-[#F3F4F6] tracking-tight">
          Beyond Code: The Same Discipline.
        </h2>
        <p className="font-sans text-sm sm:text-base text-[#9CA3AF] max-w-2xl leading-relaxed">
          Music and software engineering aren't separate worlds. They require the exact same mental muscle: establishing a motif, removing the unnecessary, and iterating until the idea lands effortlessly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Essay & Philosophical Framing (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <div className="p-7 lg:p-8 rounded-[8px] bg-[#111418] border border-[#1F242D]">
            <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#00E5FF] mb-2 flex items-center gap-2">
              <Music className="w-3.5 h-3.5" />
              <span>THE PHILOSOPHY OF ARRANGEMENT</span>
            </div>
            <h3 className="font-syne font-bold text-xl sm:text-2xl text-[#F3F4F6] mb-4">
              {beyondCode.heading}
            </h3>

            <div className="space-y-4 text-sm text-[#9CA3AF] font-sans leading-relaxed">
              {beyondCode.essay.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-[#1F242D] text-xs font-sans italic text-[#38BDF8]">
              "{beyondCode.quote}"
            </div>
          </div>

          {/* Core Parallels Table */}
          <div className="rounded-[8px] bg-[#111418] border border-[#1F242D] p-6">
            <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#4B5563] mb-4">
              MAPPING: COMPOSITION ↔ SYSTEMS ENGINEERING
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-[4px] bg-[#0B0D10] border border-[#1F242D]">
                <div className="font-mono text-[10px] text-[#38BDF8] uppercase mb-1.5 font-semibold">
                  MOTIF / INTERFACE
                </div>
                <div className="font-sans text-xs text-[#9CA3AF] leading-relaxed">
                  A clean melodic hook is like a well-designed API contract: unmistakable and memorable.
                </div>
              </div>

              <div className="p-4 rounded-[4px] bg-[#0B0D10] border border-[#1F242D]">
                <div className="font-mono text-[10px] text-[#00E5FF] uppercase mb-1.5 font-semibold">
                  EDITING / REFACTORING
                </div>
                <div className="font-sans text-xs text-[#9CA3AF] leading-relaxed">
                  Cutting superfluous lyrics is identical to removing dead code and unneeded abstractions.
                </div>
              </div>

              <div className="p-4 rounded-[4px] bg-[#0B0D10] border border-[#1F242D]">
                <div className="font-mono text-[10px] text-[#38BDF8] uppercase mb-1.5 font-semibold">
                  TENSION / LATENCY
                </div>
                <div className="font-sans text-xs text-[#9CA3AF] leading-relaxed">
                  Harmonic dissonance must resolve cleanly, just like async promises and distributed queues.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Synthesizer & Audio Motif Player (5 cols) */}
        <div className="lg:col-span-5">
          <div className="rounded-[8px] bg-[#07080A] border border-[#1F242D] p-6 lg:p-7 space-y-6">
            {/* Player Header */}
            <div className="flex items-center justify-between border-b border-[#1F242D] pb-4">
              <div className="flex items-center gap-2">
                <Disc
                  className={`w-4 h-4 text-[#38BDF8] ${
                    isPlaying ? 'animate-spin' : ''
                  }`}
                />
                <span className="font-mono text-xs uppercase tracking-[0.06em] text-[#F3F4F6]">
                  ACOUSTIC MOTIF PLAYER
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.06em] px-2 py-0.5 rounded-[4px] bg-[#111418] border border-[#1F242D] text-[#00E5FF]">
                {isPlaying ? 'ACTIVE // PLAYING' : 'IDLE // STANDBY'}
              </span>
            </div>

            {/* Track Info */}
            <div>
              <div className="font-syne font-bold text-lg text-[#F3F4F6]">
                Kathmandu Nightscape
              </div>
              <div className="font-mono text-xs text-[#9CA3AF] mt-1">
                Key: D Minor · 76 BPM · Synthesized Acoustic Plucks
              </div>
              <p className="font-sans text-xs text-[#4B5563] mt-2.5 leading-relaxed">
                A contemplative four-bar progression generated dynamically using the Web Audio API without external audio files.
              </p>
            </div>

            {/* Interactive Step Visualizer: Clean rectilinear boxes, no shadows */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#4B5563]">
                <span>16-STEP HARMONIC SEQUENCE</span>
                <span>{currentStep !== null ? `STEP ${currentStep + 1}/16` : '0/16'}</span>
              </div>
              <div className="grid grid-cols-8 sm:grid-cols-16 gap-1.5">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-9 rounded-[2px] border transition-colors flex items-center justify-center ${
                      currentStep === i
                        ? 'bg-[#00E5FF] border-[#00E5FF]'
                        : i % 4 === 0
                        ? 'bg-[#161B22] border-[#1F242D]'
                        : 'bg-[#111418] border-[#1F242D]/60'
                    }`}
                  >
                    <span className="font-mono text-[8px] text-[#4B5563]">
                      {i + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={togglePlayback}
                className={`px-6 py-3 rounded-[4px] font-mono text-xs tracking-[0.06em] uppercase flex items-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#38BDF8] ${
                  isPlaying
                    ? 'bg-[#161B22] border border-[#00E5FF] text-[#00E5FF]'
                    : 'bg-[#38BDF8] text-[#0B0D10] font-semibold hover:bg-white'
                }`}
                aria-label={isPlaying ? 'Stop acoustic motif' : 'Play acoustic motif'}
              >
                {isPlaying ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>STOP AUDIO</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>LISTEN TO MOTIF</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-3">
                <Volume2 className="w-4 h-4 text-[#4B5563]" />
                <span className="font-mono text-[11px] text-[#9CA3AF]">
                  WEB AUDIO SYNTH
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-[4px] bg-[#111418] border border-[#1F242D] text-[11px] font-mono text-[#4B5563] flex items-center gap-2">
              <span className="text-[#38BDF8]">ℹ</span>
              <span>Composed & programmed in code. Zero external MP3 downloads.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hook into next section */}
      <div className="mt-16 lg:mt-20 pt-8 border-t border-[#1F242D] flex justify-end">
        <button
          onClick={() => {
            const el = document.getElementById('now');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="font-mono text-xs uppercase tracking-[0.06em] text-[#9CA3AF] hover:text-[#38BDF8] transition-colors flex items-center gap-2 group"
        >
          <span>NEXT → NOW</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </section>
  );
};
