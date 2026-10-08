import React, { useState, useEffect, useRef, useMemo } from 'react';
import { PORTFOLIO_DATA, PROJECTS, Project } from '../data/portfolioData';
import {
  Search,
  Hash,
  FolderGit2,
  FileText,
  Terminal,
  ExternalLink,
  CornerDownLeft,
  X,
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onOpenResume: () => void;
  onOpenTerminal: () => void;
}

interface PaletteItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Section' | 'Project' | 'Action';
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onOpenResume,
  onOpenTerminal,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const allItems: PaletteItem[] = useMemo(() => {
    const sections: PaletteItem[] = [
      {
        id: 'sec-hero',
        title: 'Hero / Initialization',
        subtitle: 'Go to overview and tagline',
        category: 'Section',
        icon: <Hash className="w-3.5 h-3.5 text-[#38BDF8]" />,
        action: () => scrollTo('hero'),
      },
      {
        id: 'sec-proof',
        title: 'Verified Proof',
        subtitle: '01 // Background and academic credentials',
        category: 'Section',
        icon: <Hash className="w-3.5 h-3.5 text-[#38BDF8]" />,
        action: () => scrollTo('proof'),
      },
      {
        id: 'sec-work',
        title: 'Featured Work & Repositories',
        subtitle: '02 // Bot, research assistant & GreenCompass',
        category: 'Section',
        icon: <Hash className="w-3.5 h-3.5 text-[#38BDF8]" />,
        action: () => scrollTo('work'),
      },
      {
        id: 'sec-thinking',
        title: 'How I Think (Core Principles)',
        subtitle: '03 // Grounding, safety gates, and toy models',
        category: 'Section',
        icon: <Hash className="w-3.5 h-3.5 text-[#38BDF8]" />,
        action: () => scrollTo('thinking'),
      },
      {
        id: 'sec-journey',
        title: 'Journey & Trajectory',
        subtitle: '04 // Timeline, Softwarica & AWS Cloud Club',
        category: 'Section',
        icon: <Hash className="w-3.5 h-3.5 text-[#38BDF8]" />,
        action: () => scrollTo('journey'),
      },
      {
        id: 'sec-beyond',
        title: 'Beyond Code: Music & Songwriting',
        subtitle: '05 // Parallel craft & Web Audio synth',
        category: 'Section',
        icon: <Hash className="w-3.5 h-3.5 text-[#38BDF8]" />,
        action: () => scrollTo('beyond'),
      },
      {
        id: 'sec-now',
        title: 'Now: Active Changelog',
        subtitle: '06 // Current focus (Updated Oct 2026)',
        category: 'Section',
        icon: <Hash className="w-3.5 h-3.5 text-[#38BDF8]" />,
        action: () => scrollTo('now'),
      },
      {
        id: 'sec-contact',
        title: 'Contact & Communication',
        subtitle: '07 // Send transmission or copy email',
        category: 'Section',
        icon: <Hash className="w-3.5 h-3.5 text-[#38BDF8]" />,
        action: () => scrollTo('contact'),
      },
    ];

    const projectItems: PaletteItem[] = PROJECTS.map((p) => ({
      id: `proj-${p.id}`,
      title: p.title,
      subtitle: p.description,
      category: 'Project' as const,
      icon: <FolderGit2 className="w-3.5 h-3.5 text-[#38BDF8]" />,
      action: () => onSelectProject(p),
    }));

    const actionItems: PaletteItem[] = [
      {
        id: 'act-resume',
        title: 'View / Download Curriculum Vitae',
        subtitle: 'Open structured resume and PDF download',
        category: 'Action',
        icon: <FileText className="w-3.5 h-3.5 text-[#38BDF8]" />,
        action: onOpenResume,
      },
      {
        id: 'act-terminal',
        title: 'Launch Interactive Terminal CLI',
        subtitle: 'Easter egg command-line environment (~)',
        category: 'Action',
        icon: <Terminal className="w-3.5 h-3.5 text-[#00E5FF]" />,
        action: onOpenTerminal,
      },
      {
        id: 'act-github',
        title: 'Browse GitHub Repositories',
        subtitle: 'github.com/HAliveKP',
        category: 'Action',
        icon: <ExternalLink className="w-3.5 h-3.5 text-[#9CA3AF]" />,
        action: () => window.open(PORTFOLIO_DATA.profile.github, '_blank'),
      },
      {
        id: 'act-portfolio',
        title: 'Live Portfolio Website',
        subtitle: 'harikrishnapokhrel.com.np',
        category: 'Action',
        icon: <ExternalLink className="w-3.5 h-3.5 text-[#9CA3AF]" />,
        action: () => window.open(PORTFOLIO_DATA.profile.portfolioUrl, '_blank'),
      },
      {
        id: 'act-linkedin',
        title: 'Connect on LinkedIn',
        subtitle: 'linkedin.com/in/harikrishna-pokhrel',
        category: 'Action',
        icon: <ExternalLink className="w-3.5 h-3.5 text-[#9CA3AF]" />,
        action: () => window.open(PORTFOLIO_DATA.profile.linkedin, '_blank'),
      },
    ];

    return [...sections, ...projectItems, ...actionItems];
  }, [onSelectProject, onOpenResume, onOpenTerminal]);

  // Filter items by search query
  const filteredItems = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return allItems;
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(trimmed) ||
        item.subtitle.toLowerCase().includes(trimmed) ||
        item.category.toLowerCase().includes(trimmed)
    );
  }, [allItems, query]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  // Keyboard navigation: ArrowUp, ArrowDown, Enter, Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (filteredItems.length === 0) return;
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (filteredItems.length === 0) return;
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems.length > 0 && filteredItems[selectedIndex]) {
          const selected = filteredItems[selectedIndex];
          onClose();
          selected.action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  // Keep selected item scrolled into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector<HTMLElement>(`[data-index="${selectedIndex}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0B0D10]/80 backdrop-blur-md flex items-start justify-center pt-20 sm:pt-28 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl rounded-[8px] bg-[#07080A] border border-[#1F242D] shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-[#1F242D] bg-[#111418]">
          <Search className="w-4 h-4 text-[#38BDF8] shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a section, project, or command..."
            className="w-full bg-transparent border-none outline-none font-sans text-sm text-[#F3F4F6] placeholder:text-[#4B5563] focus:ring-0 p-0"
            autoComplete="off"
            spellCheck={false}
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-[4px] hover:bg-[#161B22] text-[#4B5563] hover:text-[#9CA3AF] transition-colors"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block font-mono text-[10px] text-[#4B5563] uppercase px-1.5 py-0.5 rounded-[2px] bg-[#0B0D10] border border-[#1F242D]">
              ESC
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          className="max-h-[380px] overflow-y-auto p-2 space-y-1"
        >
          {filteredItems.length === 0 ? (
            <div className="py-12 px-4 text-center space-y-2">
              <div className="font-mono text-xs text-[#9CA3AF]">
                NO COMMANDS FOUND FOR "{query}"
              </div>
              <div className="font-sans text-xs text-[#4B5563]">
                Try searching for "Bot", "Research", "GreenCompass", or "Resume".
              </div>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = selectedIndex === idx;

              return (
                <div
                  key={item.id}
                  data-index={idx}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  onClick={() => {
                    onClose();
                    item.action();
                  }}
                  className={`px-3 py-2.5 rounded-[4px] cursor-pointer flex items-center justify-between transition-colors border ${
                    isSelected
                      ? 'bg-[#161B22] border-[#38BDF8]/40 text-[#F3F4F6]'
                      : 'bg-transparent border-transparent text-[#9CA3AF] hover:bg-[#111418]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-1.5 rounded-[4px] border ${
                        isSelected
                          ? 'bg-[#0B0D10] border-[#38BDF8]/40'
                          : 'bg-[#111418] border-[#1F242D]'
                      }`}
                    >
                      {item.icon}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-sans text-xs font-semibold text-[#F3F4F6] truncate">
                          {item.title}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-[#4B5563] px-1.5 py-0.2 rounded-[2px] bg-[#0B0D10] border border-[#1F242D]">
                          {item.category}
                        </span>
                      </div>
                      <div className="font-sans text-[11px] text-[#9CA3AF] truncate mt-0.5">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="hidden sm:flex items-center gap-1 font-mono text-[10px] text-[#38BDF8] shrink-0 pl-2">
                      <span>SELECT</span>
                      <CornerDownLeft className="w-3 h-3" />
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="px-4 py-2.5 bg-[#111418] border-t border-[#1F242D] flex flex-wrap items-center justify-between text-[11px] font-mono text-[#4B5563]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded-[2px] bg-[#0B0D10] border border-[#1F242D] text-[#9CA3AF]">
                ↑
              </kbd>
              <kbd className="px-1 py-0.5 rounded-[2px] bg-[#0B0D10] border border-[#1F242D] text-[#9CA3AF]">
                ↓
              </kbd>
              <span>to navigate</span>
            </span>

            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded-[2px] bg-[#0B0D10] border border-[#1F242D] text-[#9CA3AF]">
                ↵
              </kbd>
              <span>to select</span>
            </span>
          </div>

          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded-[2px] bg-[#0B0D10] border border-[#1F242D] text-[#9CA3AF]">
              ESC
            </kbd>
            <span>to close</span>
          </span>
        </div>
      </div>
    </div>
  );
};
