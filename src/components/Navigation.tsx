import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ArrowDown, Terminal, X, Mail, Github, Linkedin, Search } from 'lucide-react';

interface NavigationProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
  onOpenCommandPalette: () => void;
  activeSection: string;
}

interface NavItem {
  id: string;
  num: string;
  label: string;
}

const NAV_LINKS: NavItem[] = [
  { id: 'work', num: '01', label: 'Work' },
  { id: 'thinking', num: '02', label: 'Think' },
  { id: 'journey', num: '03', label: 'Journey' },
  { id: 'beyond', num: '04', label: 'Beyond' },
  { id: 'now', num: '05', label: 'Now' },
  { id: 'contact', num: '06', label: 'Contact' },
];

export const Navigation: React.FC<NavigationProps> = ({
  onOpenTerminal,
  onOpenResume,
  onOpenCommandPalette,
  activeSection: initialActiveSection,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolledPast24, setIsScrolledPast24] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>(initialActiveSection || 'work');

  const lastScrollYRef = useRef(0);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const firstMobileLinkRef = useRef<HTMLButtonElement>(null);

  // Sync active section if parent updates it
  useEffect(() => {
    if (initialActiveSection && initialActiveSection !== 'hero') {
      setActiveId(initialActiveSection);
    }
  }, [initialActiveSection]);

  // Scroll spy via IntersectionObserver for accurate desktop highlighting
  useEffect(() => {
    const sectionElements = NAV_LINKS.map((link) => document.getElementById(link.id)).filter(
      (el): el is HTMLElement => el !== null
    );

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -55% 0px',
        threshold: 0,
      }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Scroll handling: progress bar, 24px transparent boundary, and hide/show on scroll past hero
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;

      // 1. Progress line (0 to 100%)
      if (totalScroll > 0) {
        const progress = (scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }

      // 2. Transparent boundary at 24px
      setIsScrolledPast24(scrollY > 24);

      // 3. Hide on scroll down past hero (~420px), show on scroll up (never hide if mobile menu open)
      const lastScrollY = lastScrollYRef.current;
      const scrollDelta = scrollY - lastScrollY;

      if (!mobileMenuOpen) {
        if (scrollY > 420) {
          if (scrollDelta > 8) {
            // Scrolling down
            setIsNavVisible(false);
          } else if (scrollDelta < -8) {
            // Scrolling up
            setIsNavVisible(true);
          }
        } else {
          // Inside hero viewport
          setIsNavVisible(true);
        }
      } else {
        setIsNavVisible(true);
      }

      lastScrollYRef.current = scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // Body scroll locking when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      // Auto focus first link inside menu for accessibility
      setTimeout(() => firstMobileLinkRef.current?.focus(), 120);

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  // Escape key listener to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const scrollTo = useCallback((id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveId(id);
    }
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 h-16 transition-all duration-200 ease-out ${
          isNavVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolledPast24
            ? 'bg-[#0B0D10]/72 backdrop-blur-[16px] border-b border-[#1F242D]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-[1360px] mx-auto h-full px-5 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* LEFT: Monogram [ HKP ] in JetBrains Mono */}
          <div className="flex items-center">
            <button
              onClick={onOpenTerminal}
              className="group min-h-[44px] min-w-[44px] flex items-center gap-1.5 px-2.5 py-1.5 rounded-[4px] bg-[#111418] border border-[#1F242D] hover:border-[#38BDF8]/40 hover:bg-[#161B22] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
              title="Click to toggle Terminal Mode (Easter Egg)"
              aria-label="Open Terminal Mode Easter Egg"
            >
              <span className="font-mono text-xs font-semibold tracking-wider text-[#F3F4F6] group-hover:text-[#38BDF8] transition-colors">
                [ HKP ]
              </span>
              <Terminal className="w-3.5 h-3.5 text-[#4B5563] group-hover:text-[#38BDF8] transition-colors" />
            </button>
          </div>

          {/* CENTER: Desktop Navigation (>= 1024px / lg) - 6 links with 32px gap */}
          <nav
            className="hidden lg:flex items-center gap-8"
            aria-label="Primary"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.id;

              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="relative group min-h-[44px] flex items-center py-2 px-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] rounded-[4px]"
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="flex items-baseline">
                    {/* Index number: JetBrains Mono 10px superscript */}
                    <span
                      className={`font-mono text-[10px] mr-1.5 transition-colors select-none ${
                        isActive
                          ? 'text-[#38BDF8]'
                          : 'text-[#4B5563] group-hover:text-[#38BDF8]'
                      }`}
                    >
                      {link.num}
                    </span>

                    {/* Label: Inter 13px, 500 weight */}
                    <span
                      className={`font-sans text-[13px] font-medium transition-colors ${
                        isActive
                          ? 'text-[#F3F4F6]'
                          : 'text-[#9CA3AF] group-hover:text-[#F3F4F6]'
                      }`}
                    >
                      {link.label}
                    </span>
                  </span>

                  {/* 1px #38BDF8 underline sliding between active links */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-underline"
                      className="absolute bottom-1.5 left-0 right-0 h-[1px] bg-[#38BDF8]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* RIGHT: Desktop [ ⌘K ] Command Palette Hint & [ RESUME ] Ghost Button (>= 1024px) */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Subtle Command-Palette ⌘K Mono Chip */}
            <button
              onClick={onOpenCommandPalette}
              className="min-h-[44px] flex items-center gap-1.5 px-2.5 py-1.5 rounded-[4px] bg-[#111418]/60 border border-[#1F242D] hover:border-[#38BDF8]/50 text-[11px] font-mono text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
              title="Search sections and projects (⌘K)"
              aria-label="Open Command Palette (⌘K)"
            >
              <Search className="w-3 h-3 text-[#4B5563]" />
              <span className="tracking-wider">⌘K</span>
            </button>

            {/* Resume button */}
            <button
              onClick={onOpenResume}
              className="min-h-[44px] flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-[#111418]/60 border border-[#1F242D] hover:border-[#38BDF8]/50 text-xs font-mono uppercase tracking-[0.06em] text-[#F3F4F6] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
              aria-label="Open and download resume"
            >
              <span>[ RESUME ]</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#38BDF8]" />
            </button>
          </div>

          {/* RIGHT MOBILE/TABLET (< 1024px): "MENU" / "CLOSE" Mono Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center px-3 py-2 rounded-[4px] bg-[#111418] border border-[#1F242D] hover:border-[#38BDF8]/50 text-xs font-mono tracking-[0.06em] text-[#F3F4F6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-overlay"
            >
              <span>{mobileMenuOpen ? 'CLOSE' : 'MENU'}</span>
            </button>
          </div>
        </div>

        {/* Thin 2px scroll-progress line fixed along the bottom edge of the bar, filled #38BDF8 */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1F242D]/40 pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="h-full bg-[#38BDF8] transition-all duration-75"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* FULL-SCREEN TABLET & MOBILE OVERLAY (< 1024px) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-overlay"
            ref={mobileMenuRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => {
              // Close on outside tap
              if (e.target === mobileMenuRef.current) {
                setMobileMenuOpen(false);
              }
            }}
            className="fixed inset-0 z-50 lg:hidden bg-[#0B0D10]/96 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-10"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            {/* Overlay Top Bar */}
            <div className="flex items-center justify-between border-b border-[#1F242D] pb-5">
              <span className="font-mono text-xs font-semibold text-[#38BDF8] tracking-wider">
                [ HKP ] // NAVIGATION
              </span>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-[4px] bg-[#111418] border border-[#1F242D] text-[#9CA3AF] hover:text-[#F3F4F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
                aria-label="Close navigation overlay"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stacked Large Links in Syne 32px with Staggered Fade-in */}
            <nav className="my-auto py-8 flex flex-col gap-5 sm:gap-6" aria-label="Mobile Primary">
              {NAV_LINKS.map((link, idx) => {
                const isActive = activeId === link.id;

                return (
                  <motion.button
                    ref={idx === 0 ? firstMobileLinkRef : undefined}
                    key={link.id}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: idx * 0.04, // 40ms stagger between items
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => scrollTo(link.id)}
                    className="min-h-[48px] text-left flex items-baseline gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] rounded-[4px] py-1"
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="font-mono text-sm tracking-wider text-[#38BDF8] select-none">
                      {link.num}
                    </span>
                    <span
                      className={`font-syne text-[32px] sm:text-[38px] font-bold tracking-tight transition-colors ${
                        isActive
                          ? 'text-[#F3F4F6]'
                          : 'text-[#9CA3AF] group-hover:text-[#F3F4F6]'
                      }`}
                    >
                      {link.label}
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#38BDF8] ml-2 self-center" />
                    )}
                  </motion.button>
                );
              })}
            </nav>

            {/* Overlay Bottom: Search, Resume Button and Email / GitHub / LinkedIn links */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.28 }}
              className="pt-6 border-t border-[#1F242D] flex flex-col gap-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCommandPalette();
                  }}
                  className="min-h-[44px] flex items-center gap-2 px-3 py-2 rounded-[4px] bg-[#111418] border border-[#1F242D] hover:border-[#38BDF8]/60 font-mono text-xs text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
                >
                  <Search className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>COMMAND PALETTE</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="min-h-[44px] flex items-center gap-2 px-4 py-2.5 rounded-[4px] bg-[#111418] border border-[#1F242D] hover:border-[#38BDF8]/60 font-mono text-xs text-[#F3F4F6] tracking-[0.06em] uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
                >
                  <span>[ RESUME ]</span>
                  <ArrowDown className="w-3.5 h-3.5 text-[#38BDF8]" />
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTerminal();
                  }}
                  className="min-h-[44px] flex items-center gap-2 font-mono text-xs text-[#00E5FF] px-3 py-2 rounded-[4px] hover:bg-[#111418] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>TERMINAL CLI</span>
                </button>
              </div>

              {/* Direct links */}
              <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-[#9CA3AF]">
                <a
                  href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                  className="min-h-[44px] flex items-center gap-1.5 hover:text-[#38BDF8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
                >
                  <Mail className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>EMAIL</span>
                </a>
                <a
                  href={PORTFOLIO_DATA.profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] flex items-center gap-1.5 hover:text-[#38BDF8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
                >
                  <Github className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>GITHUB</span>
                </a>
                <a
                  href={PORTFOLIO_DATA.profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] flex items-center gap-1.5 hover:text-[#38BDF8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>LINKEDIN</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
