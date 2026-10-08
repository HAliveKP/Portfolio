/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { PORTFOLIO_DATA, Project } from './data/portfolioData';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { ProofStrip } from './components/ProofStrip';
import { FeaturedWork } from './components/FeaturedWork';
import { HowIThink } from './components/HowIThink';
import { Journey } from './components/Journey';
import { BeyondCode } from './components/BeyondCode';
import { NowSection } from './components/NowSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

// Lazy-loaded dialogs & overlays for optimized initial bundle and high Lighthouse score
const ProjectModal = lazy(() =>
  import('./components/ProjectModal').then((mod) => ({ default: mod.ProjectModal }))
);
const ResumeModal = lazy(() =>
  import('./components/ResumeModal').then((mod) => ({ default: mod.ResumeModal }))
);
const TerminalOverlay = lazy(() =>
  import('./components/TerminalOverlay').then((mod) => ({ default: mod.TerminalOverlay }))
);
const CommandPalette = lazy(() =>
  import('./components/CommandPalette').then((mod) => ({ default: mod.CommandPalette }))
);

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Active section observer on scroll
  useEffect(() => {
    const sectionIds = ['work', 'thinking', 'journey', 'beyond', 'now', 'contact'];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = 220; // Trigger threshold

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - offset;
          if (scrollY >= top) {
            setActiveSection(id);
            return;
          }
        }
      }
      setActiveSection('hero');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global keyboard shortcuts (⌘K/Ctrl+K opens Command Palette, ` opens Terminal mode)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K shortcut for command palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
        return;
      }

      // Backquote shortcut for terminal overlay
      if ((e.key === '`' || e.key === '~') && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0B0D10] text-[#F3F4F6] selection:bg-[#38BDF8]/20 selection:text-[#38BDF8]">
      {/* Background Subtle Architectural Hairline Grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(31, 36, 45, 0.28) 1px, transparent 1px), linear-gradient(to bottom, rgba(31, 36, 45, 0.28) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* Background Subtle Analog Noise Texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.035] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Fixed Sticky Nav with Progress Bar, Desktop ⌘K Chip, and Active Highlighter */}
      <Navigation
        activeSection={activeSection}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Content Area */}
      <main id="main-content" className="relative z-10">
        {/* 1. Hero */}
        <Hero
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        {/* 2. Proof Strip */}
        <ProofStrip />

        {/* 3. Featured Work with Cursor Cyan Glow and Staggered Reveal */}
        <FeaturedWork onSelectProject={(project) => setSelectedProject(project)} />

        {/* 4. How I Think */}
        <HowIThink />

        {/* 5. Journey */}
        <Journey />

        {/* 6. Beyond Code */}
        <BeyondCode />

        {/* 7. Now */}
        <NowSection />

        {/* 8. Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
        />
      </div>

      {/* Modals & Overlays loaded on demand via Suspense */}
      <Suspense fallback={null}>
        {/* Command Palette */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onSelectProject={(project) => setSelectedProject(project)}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}

        {isResumeOpen && (
          <ResumeModal
            isOpen={isResumeOpen}
            onClose={() => setIsResumeOpen(false)}
          />
        )}

        {isTerminalOpen && (
          <TerminalOverlay
            isOpen={isTerminalOpen}
            onClose={() => setIsTerminalOpen(false)}
            onOpenResume={() => {
              setIsTerminalOpen(false);
              setIsResumeOpen(true);
            }}
          />
        )}
      </Suspense>
    </div>
  );
}
