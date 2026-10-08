import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Project } from '../data/portfolioData';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';

interface GlowProjectCardProps {
  project: Project;
  onSelect?: (project: Project) => void;
  index: number;
}

export const GlowProjectCard: React.FC<GlowProjectCardProps> = ({
  project,
  onSelect,
  index,
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
      variants={{
        hidden: { opacity: 0, y: 18 },
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
      className="relative p-6 lg:p-7 rounded-[8px] bg-[#111418] border border-[#1F242D] hover:border-[#38BDF8]/40 transition-colors duration-200 flex flex-col justify-between group overflow-hidden"
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

      {/* Content Area */}
      <div className="relative z-20">
        {/* Card Top Row */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[10px] font-medium tracking-[0.06em] uppercase text-[#38BDF8] bg-[#0B0D10] px-2.5 py-1 rounded-[4px] border border-[#1F242D]">
            {project.tag || 'PROJECT'}
          </span>
          {project.badge && (
            <span className="font-mono text-[10px] text-[#4B5563] tracking-[0.06em] uppercase">
              {project.badge}
            </span>
          )}
        </div>

        {/* Card Title */}
        <h3 className="font-syne font-bold text-xl text-[#F3F4F6] group-hover:text-white transition-colors">
          {project.title}
        </h3>

        {/* Card Description */}
        <p className="font-sans text-xs text-[#9CA3AF] mt-3 leading-relaxed">
          {project.description}
        </p>

        {/* Optional honest learned line */}
        {project.learned && (
          <div className="mt-4 p-3 rounded-[4px] bg-[#0B0D10] border border-[#1F242D]">
            <p className="font-sans text-xs text-[#F3F4F6] italic">
              "{project.learned}"
            </p>
          </div>
        )}
      </div>

      {/* Card Footer: Tech Stack & Actions */}
      <div className="relative z-20 mt-6 pt-4 border-t border-[#1F242D] flex flex-col gap-3">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] uppercase tracking-[0.06em] px-2 py-0.5 rounded-[4px] bg-[#0B0D10] border border-[#1F242D] text-[#9CA3AF]"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-1">
          {project.repoComingSoon ? (
            <span className="font-mono text-[10px] tracking-[0.06em] uppercase text-[#00E5FF] px-2.5 py-1 rounded-[4px] bg-[#0B0D10] border border-[#1F242D]">
              REPO COMING SOON
            </span>
          ) : (
            <div className="flex items-center gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-2.5 py-1 rounded-[4px] bg-[#0B0D10] border border-[#1F242D] hover:border-[#38BDF8] text-[11px] font-mono text-[#38BDF8] hover:text-white transition-colors flex items-center gap-1"
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
                  className="px-2.5 py-1 rounded-[4px] bg-[#0B0D10] border border-[#1F242D] hover:border-[#38BDF8] text-[11px] font-mono text-[#9CA3AF] hover:text-[#38BDF8] transition-colors flex items-center gap-1"
                >
                  <Github className="w-3 h-3" />
                  <span>GITHUB</span>
                </a>
              )}
            </div>
          )}

          {onSelect && (
            <button
              onClick={() => onSelect(project)}
              className="font-mono text-[11px] text-[#9CA3AF] hover:text-[#38BDF8] transition-colors flex items-center gap-1"
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
