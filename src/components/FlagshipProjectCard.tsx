import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Project } from '../data/portfolioData';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';

interface FlagshipProjectCardProps {
  project: Project;
  onSelect?: (project: Project) => void;
}

export const FlagshipProjectCard: React.FC<FlagshipProjectCardProps> = ({
  project,
  onSelect,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect && onSelect(project)}
      className="relative rounded-[8px] bg-[#111418] border border-[#1F242D] hover:border-[#38BDF8]/40 transition-colors duration-200 p-6 sm:p-8 lg:p-10 group overflow-hidden cursor-pointer mb-6"
    >
      {/* Cursor-following Sub-Zero Cyan Glow Overlay */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[8px] transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered && mousePos ? 1 : 0,
          background: mousePos
            ? `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 229, 255, 0.08), transparent 75%)`
            : 'none',
        }}
        aria-hidden="true"
      />

      {/* Horizontal Layout: Text on Left, Stack and Buttons on Right */}
      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Index, Status, Title, Description */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            {/* 1. Header row */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.06em] text-[#38BDF8]">
                01
              </span>
              <span className="font-mono text-[10px] tracking-[0.06em] uppercase text-[#38BDF8] px-2 py-0.5 rounded-[4px] bg-[#38BDF8]/10 border border-[#38BDF8]/30">
                FEATURED
              </span>
              {project.badge && (
                <span className="font-mono text-[10px] text-[#4B5563] tracking-[0.06em] uppercase">
                  {project.badge}
                </span>
              )}
              {project.liveUrl && (
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.06em] uppercase text-[#00E5FF] px-2 py-0.5 rounded-[4px] bg-[#00E5FF]/10 border border-[#00E5FF]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
                  LIVE
                </span>
              )}
            </div>

            {/* 2. Title in Syne 22px / 600 */}
            <h3 className="font-syne font-semibold text-[22px] sm:text-2xl text-[#F3F4F6] tracking-tight group-hover:text-white transition-colors leading-snug">
              {project.title}
            </h3>

            {/* 3. Description in Inter 14px, #9CA3AF */}
            <p className="mt-3 font-sans text-[14px] text-[#9CA3AF] leading-relaxed max-w-xl">
              {project.description}
            </p>
          </div>
        </div>

        {/* Right Column: Stack chips and Buttons */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6 lg:border-l lg:border-[#1F242D] lg:pl-8">
          {/* 4. Stack Chips */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#4B5563] mb-3">
              TECHNOLOGY STACK
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[11px] uppercase tracking-[0.06em] px-2.5 py-1 rounded-[4px] bg-[#0B0D10] border border-[#1F242D] text-[#9CA3AF]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 5. Buttons */}
          <div className="pt-4 border-t border-[#1F242D] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-3 py-1.5 rounded-[4px] bg-[#0B0D10] border border-[#1F242D] hover:border-[#38BDF8] text-xs font-mono text-[#38BDF8] hover:text-white transition-colors inline-flex items-center gap-1.5"
                  aria-label={`Open live demo for ${project.title}`}
                >
                  <span>LIVE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-3 py-1.5 rounded-[4px] bg-[#0B0D10] border border-[#1F242D] hover:border-[#38BDF8] text-xs font-mono text-[#9CA3AF] hover:text-[#38BDF8] transition-colors inline-flex items-center gap-1.5"
                  aria-label={`Open GitHub repository for ${project.title}`}
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GITHUB</span>
                </a>
              )}
            </div>

            {onSelect && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(project);
                }}
                className="font-mono text-xs text-[#9CA3AF] hover:text-[#38BDF8] transition-colors inline-flex items-center gap-1 py-1"
                aria-label={`View details for ${project.title}`}
              >
                <span>DETAILS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
