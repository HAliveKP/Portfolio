import React, { useEffect } from 'react';
import { Project } from '../data/portfolioData';
import {
  X,
  Github,
  ExternalLink,
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && project) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0B0D10]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} Details`}
    >
      <div className="w-full max-w-2xl max-h-[90vh] rounded-[8px] bg-[#111418] border border-[#1F242D] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#161B22] px-6 py-4 border-b border-[#1F242D] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#38BDF8] bg-[#0B0D10] px-2.5 py-1 rounded-[4px] border border-[#1F242D]">
              {project.tag || 'PROJECT'}
            </span>
            {project.badge && (
              <span className="font-mono text-xs text-[#9CA3AF] tracking-[0.06em] uppercase">
                {project.badge}
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-[4px] hover:bg-[#0B0D10] text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#38BDF8]"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Title */}
          <div>
            <h2 className="font-syne font-bold text-2xl sm:text-3xl text-[#F3F4F6]">
              {project.title}
            </h2>
            <div className="flex items-center gap-2 mt-2 font-mono text-xs text-[#4B5563]">
              <span>STATUS:</span>
              <span className="text-[#38BDF8] uppercase">{project.status}</span>
            </div>
          </div>

          {/* Description */}
          <p className="font-sans text-sm text-[#9CA3AF] leading-relaxed">
            {project.description}
          </p>

          {/* Honest Takeaway if present */}
          {project.learned && (
            <div className="p-4 rounded-[4px] bg-[#161B22] border-l-2 border-[#38BDF8]">
              <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#38BDF8] mb-1">
                ENGINEERING TAKEAWAY
              </div>
              <p className="font-sans text-xs text-[#F3F4F6] italic">
                "{project.learned}"
              </p>
            </div>
          )}

          {/* Tech Stack */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#4B5563] mb-2">
              TECHNOLOGIES
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[11px] uppercase tracking-[0.06em] px-2.5 py-1 rounded-[4px] bg-[#0B0D10] border border-[#1F242D] text-[#9CA3AF]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-[#161B22] px-6 py-4 border-t border-[#1F242D] flex flex-wrap items-center justify-between gap-4 shrink-0">
          <button
            onClick={onClose}
            className="font-mono text-xs text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors"
          >
            [ CLOSE MODAL ]
          </button>

          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-[4px] bg-[#111418] border border-[#1F242D] hover:border-[#38BDF8] text-xs font-mono text-[#38BDF8] hover:text-white transition-colors flex items-center gap-2"
              >
                <span>[ LIVE DEMO ↗ ]</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-[4px] bg-[#38BDF8] hover:bg-white text-[#0B0D10] font-mono text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-2"
              >
                <Github className="w-3.5 h-3.5" />
                <span>[ GITHUB ↗ ]</span>
              </a>
            ) : project.repoComingSoon ? (
              <span className="font-mono text-xs text-[#00E5FF] px-3 py-1.5 rounded-[4px] bg-[#0B0D10] border border-[#1F242D]">
                REPO COMING SOON
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
