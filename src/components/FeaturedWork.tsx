import React from 'react';
import { motion } from 'motion/react';
import { PROJECTS, Project } from '../data/portfolioData';
import { FlagshipProjectCard } from './FlagshipProjectCard';
import { ProjectCard } from './ProjectCard';
import { ArrowUpRight } from 'lucide-react';

interface FeaturedWorkProps {
  onSelectProject: (project: Project) => void;
}

export const FeaturedWork: React.FC<FeaturedWorkProps> = ({ onSelectProject }) => {
  // Flagship project: Bot spanning full width
  const flagshipProject = PROJECTS.find((p) => p.id === 'bot') || PROJECTS[0];
  // The other 5 projects in the 2-column grid
  const otherProjects = PROJECTS.filter((p) => p.id !== flagshipProject?.id);

  return (
    <section
      id="work"
      className="py-24 sm:py-32 lg:py-40 px-5 sm:px-8 lg:px-12 max-w-[1360px] mx-auto border-t border-[#1F242D]"
      aria-label="Featured Work and Engineering Projects"
    >
      {/* Section Header */}
      <div className="flex flex-col gap-4 mb-16 lg:mb-20">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.06em] text-[#38BDF8]">
            // 02
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.06em] text-[#4B5563]">
            FEATURED WORK & VERIFIED REPOSITORIES
          </span>
        </div>
        <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl text-[#F3F4F6] tracking-tight">
          Systems Built to Figure Things Out.
        </h2>
        <p className="font-sans text-sm sm:text-base text-[#9CA3AF] max-w-2xl leading-relaxed">
          Real repositories and deployed applications across Discord bots, multi-agent research tools, carbon intelligence, and academic software architectures.
        </p>
      </div>

      {/* Flagship Card: Full Width (Bot) */}
      {flagshipProject && (
        <div className="mb-6">
          <FlagshipProjectCard
            project={flagshipProject}
            onSelect={onSelectProject}
          />
        </div>
      )}

      {/* The Other 5 Projects: 2-Column Grid of Equal Cards Below */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 [grid-auto-rows:1fr] mb-16"
      >
        {otherProjects.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={idx + 1}
            onSelect={onSelectProject}
          />
        ))}
      </motion.div>

      {/* Final Row: "View all repositories on GitHub ↗" */}
      <div className="pt-8 border-t border-[#1F242D] flex flex-wrap items-center justify-between gap-4">
        <span className="font-mono text-xs text-[#4B5563]">
          TOTAL: 9 PUBLIC REPOSITORIES ON GITHUB
        </span>

        <a
          href="https://github.com/HAliveKP?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs uppercase tracking-[0.06em] text-[#38BDF8] hover:text-white transition-colors flex items-center gap-1.5 group px-3 py-1.5 rounded-[4px] bg-[#111418] border border-[#1F242D] hover:border-[#38BDF8]"
        >
          <span>View all repositories on GitHub</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </section>
  );
};

