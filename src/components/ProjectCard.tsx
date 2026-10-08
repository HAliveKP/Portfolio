import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Project } from '../data/portfolioData';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect?: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
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

  const visibleStack = project.stack.slice(0, 4);
  const remainingCount = project.stack.length - 4;
  const indexStr = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect && onSelect(project)}
      className="relative p-6 rounded-[8px] bg-[#111418] border border-[#1F242D] hover:border-[#38BDF8]/40 transition-colors duration-200 flex flex-col h-full group overflow-hidden cursor-pointer"
    >
      {/* Cursor-following Sub-Zero Cyan Glow Overlay */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[8px] transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered && mousePos ? 1 : 0,
          background: mousePos
            ? `radial-gradient(320px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 229, 255, 0.08), transparent 75%)`
            : 'none',
        }}
        aria-hidden="true"
      />

      {/* Relative content wrapper */}
      <div className="relative z-20 flex flex-col flex-1">
        {/* 1. Header Row */}
        <div className="flex items-center justify-between gap-2 mb-4">
          {/* Left: Mono index "01" */}
          <span className="font-mono text-xs uppercase tracking-[0.06em] text-[#4B5563] group-hover:text-[#38BDF8] transition-colors">
            {indexStr}
          </span>

          {/* Right: Status chips */}
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.06em] uppercase text-[#00E5FF] px-2 py-0.5 rounded-[4px] bg-[#00E5FF]/10 border border-[#00E5FF]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
                LIVE
              </span>
            )}

            {project.status === 'in-progress' ? (
              <span className="font-mono text-[10px] tracking-[0.06em] uppercase text-[#00E5FF] px-2 py-0.5 rounded-[4px] bg-[#00E5FF]/10 border border-[#00E5FF]/30">
                IN PROGRESS
              </span>
            ) : project.featured ? (
              <span className="font-mono text-[10px] tracking-[0.06em] uppercase text-[#38BDF8] px-2 py-0.5 rounded-[4px] bg-[#38BDF8]/10 border border-[#38BDF8]/30">
                FEATURED
              </span>
            ) : (
              <span className="font-mono text-[10px] tracking-[0.06em] uppercase text-[#9CA3AF] px-2 py-0.5 rounded-[4px] bg-[#161B22] border border-[#1F242D]">
                SHIPPED
              </span>
            )}
          </div>
        </div>

        {/* 2. Title in Syne 22px / 600 */}
        <h3 className="font-syne font-semibold text-[22px] text-[#F3F4F6] tracking-tight group-hover:text-white transition-colors leading-snug">
          {project.title}
        </h3>

        {/* 3. Description clamped to 3 lines (line-clamp-3), Inter 14px, #9CA3AF */}
        <p className="mt-3 font-sans text-[14px] text-[#9CA3AF] leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* 4. Stack chips: JetBrains Mono 11px uppercase, max 4 visible, then "+N" chip */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {visibleStack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[11px] uppercase tracking-[0.06em] px-2 py-0.5 rounded-[4px] bg-[#0B0D10] border border-[#1F242D] text-[#9CA3AF]"
            >
              {tech}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="font-mono text-[11px] uppercase tracking-[0.06em] px-2 py-0.5 rounded-[4px] bg-[#0B0D10] border border-[#1F242D] text-[#4B5563]">
              +{remainingCount}
            </span>
          )}
        </div>

        {/* 5. Footer: Pinned to bottom with mt-auto */}
        <div className="mt-auto pt-5 border-t border-[#1F242D] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {project.repoComingSoon ? (
              <span className="font-mono text-[10px] tracking-[0.06em] uppercase text-[#00E5FF] px-2.5 py-1 rounded-[4px] bg-[#0B0D10] border border-[#1F242D]">
                REPO COMING SOON
              </span>
            ) : (
              <>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="px-2.5 py-1 rounded-[4px] bg-[#0B0D10] border border-[#1F242D] hover:border-[#38BDF8] text-xs font-mono text-[#38BDF8] hover:text-white transition-colors inline-flex items-center gap-1.5"
                    aria-label={`Open live demo for ${project.title}`}
                  >
                    <span>LIVE</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="px-2.5 py-1 rounded-[4px] bg-[#0B0D10] border border-[#1F242D] hover:border-[#38BDF8] text-xs font-mono text-[#9CA3AF] hover:text-[#38BDF8] transition-colors inline-flex items-center gap-1.5"
                    aria-label={`Open GitHub repository for ${project.title}`}
                  >
                    <Github className="w-3 h-3" />
                    <span>GITHUB</span>
                  </a>
                )}
              </>
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
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
