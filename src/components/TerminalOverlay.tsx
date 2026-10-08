import React, { useState, useRef, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { X } from 'lucide-react';

interface TerminalOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

interface CommandLog {
  command: string;
  output: React.ReactNode;
}

export const TerminalOverlay: React.FC<TerminalOverlayProps> = ({
  isOpen,
  onClose,
  onOpenResume,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandLog[]>([
    {
      command: 'init',
      output: (
        <div className="text-[#9CA3AF] space-y-1">
          <div className="text-[#38BDF8] font-bold">
            Obsidian Kinetic CLI v2.4 // Harikrishna Pokhrel (HKP)
          </div>
          <div>Location: Kathmandu, Nepal · Session active</div>
          <div>Type <span className="text-[#00E5FF]">help</span> to display available commands.</div>
        </div>
      ),
    },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const logsBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    logsBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    setCmdHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs text-[#9CA3AF]">
            <div className="text-[#38BDF8] font-semibold">AVAILABLE COMMANDS:</div>
            <div>  <span className="text-[#00E5FF]">whoami</span>       - Display builder identity & academic credentials</div>
            <div>  <span className="text-[#00E5FF]">projects</span>     - List all 6 public engineering repositories</div>
            <div>  <span className="text-[#00E5FF]">khula-gyan</span>   - Flagship case study details & citation mechanism</div>
            <div>  <span className="text-[#00E5FF]">principles</span>   - View the 3 core engineering heuristics</div>
            <div>  <span className="text-[#00E5FF]">now</span>          - Show current sprint changelog (Updated Oct 2026)</div>
            <div>  <span className="text-[#00E5FF]">music</span>        - Read rationale on composition & songwriting</div>
            <div>  <span className="text-[#00E5FF]">cat resume</span>   - Print structured resume & trigger PDF viewer</div>
            <div>  <span className="text-[#00E5FF]">contact</span>      - Display email, GitHub & LinkedIn links</div>
            <div>  <span className="text-[#00E5FF]">clear</span>        - Clear terminal screen</div>
            <div>  <span className="text-[#00E5FF]">exit</span>         - Close terminal session</div>
          </div>
        );
        break;

      case 'whoami':
        output = (
          <div className="space-y-1 text-xs text-[#9CA3AF]">
            <div className="text-[#F3F4F6] font-semibold">{PORTFOLIO_DATA.profile.name} ({PORTFOLIO_DATA.profile.handle})</div>
            <div>Role:       {PORTFOLIO_DATA.profile.title}</div>
            <div>Degree:     {PORTFOLIO_DATA.profile.education}</div>
            <div>Location:   {PORTFOLIO_DATA.profile.location} [{PORTFOLIO_DATA.profile.coordinates}]</div>
            <div>Timezone:   {PORTFOLIO_DATA.profile.timezone}</div>
            <div>Status:     {PORTFOLIO_DATA.profile.status}</div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-xs text-[#9CA3AF]">
            <div className="text-[#38BDF8] font-semibold">VERIFIED REPOSITORIES & PROJECTS:</div>
            {PORTFOLIO_DATA.projects.map((p, idx) => (
              <div key={p.id} className="p-2 bg-[#0B0D10] border border-[#1F242D] rounded-[4px]">
                <div className="flex items-center justify-between">
                  <span className="text-[#F3F4F6] font-medium">{idx + 1}. {p.title}</span>
                  <span className="text-[10px] text-[#38BDF8] uppercase font-mono">{p.status}</span>
                </div>
                <div className="text-[#9CA3AF] text-[11px] mt-1">{p.description}</div>
                <div className="text-[#4B5563] text-[10px] mt-1 font-mono">{p.stack.join(' · ')}</div>
                {p.repoUrl && (
                  <div className="text-[#38BDF8] text-[10px] mt-1 font-mono">{p.repoUrl}</div>
                )}
                {p.repoComingSoon && (
                  <div className="text-[#00E5FF] text-[10px] mt-1 font-mono">[ REPO COMING SOON ]</div>
                )}
              </div>
            ))}
          </div>
        );
        break;

      case 'khula-gyan':
        output = (
          <div className="space-y-1.5 text-xs text-[#9CA3AF]">
            <div className="text-[#00E5FF] font-bold">KHULA GYAN // IN PROGRESS</div>
            <div>Focus: Open-source RAG assistant for Nepali civic documents with page-level citations.</div>
            <div className="text-[#38BDF8]">Status: Currently building (Sprint 2026)</div>
            <div className="text-[#9CA3AF]">Repository: [ REPO COMING SOON ]</div>
          </div>
        );
        break;

      case 'principles':
        output = (
          <div className="space-y-2 text-xs text-[#9CA3AF]">
            <div className="text-[#38BDF8] font-semibold">THREE CORE PRINCIPLES:</div>
            {PORTFOLIO_DATA.principles.map((pr) => (
              <div key={pr.number}>
                <div className="text-[#F3F4F6] font-medium">// {pr.number} {pr.title}</div>
                <div className="text-[11px] italic">"{pr.quote}"</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'now':
        output = (
          <div className="space-y-1.5 text-xs text-[#9CA3AF]">
            <div className="text-[#38BDF8] font-semibold">NOW // {PORTFOLIO_DATA.now.updated}</div>
            {PORTFOLIO_DATA.now.items.map((it, idx) => (
              <div key={idx}>
                <span className="text-[#00E5FF] font-medium">[{it.category}]:</span> {it.headline} — {it.detail}
              </div>
            ))}
          </div>
        );
        break;

      case 'music':
        output = (
          <div className="space-y-1 text-xs text-[#9CA3AF]">
            <div className="text-[#38BDF8] font-semibold">SONGWRITING & ENGINEERING // PARALLEL CRAFT</div>
            <div>"Writing a song and architecting software draw from the exact same creative muscle: establishing a motif, managing tension, cutting the superfluous, and iterating until the idea resonates."</div>
            <div>Featured motif: Kathmandu Nightscape (D Minor, 76 BPM)</div>
          </div>
        );
        break;

      case 'cat resume':
      case 'resume':
        output = (
          <div className="space-y-1 text-xs text-[#9CA3AF]">
            <div className="text-[#38BDF8] font-semibold">RESUME // HARIKRISHNA POKHREL</div>
            <div>BSc (Hons) Artificial Intelligence · Coventry University (Softwarica)</div>
            <div>Location: Kathmandu, Nepal</div>
            <div>Opening interactive resume viewer...</div>
          </div>
        );
        setTimeout(() => onOpenResume(), 400);
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-xs text-[#9CA3AF]">
            <div>Email:    <a href="mailto:hpokhrel794@gmail.com" className="text-[#38BDF8] underline">hpokhrel794@gmail.com</a></div>
            <div>GitHub:   <a href="https://github.com/hpokhrel" target="_blank" rel="noreferrer" className="text-[#38BDF8] underline">github.com/hpokhrel</a></div>
            <div>LinkedIn: <a href="https://www.linkedin.com/in/harikrishna-pokhrel" target="_blank" rel="noreferrer" className="text-[#38BDF8] underline">linkedin.com/in/harikrishna-pokhrel</a></div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        output = (
          <div className="text-red-400 text-xs">
            command not found: {rawCmd}. Type <span className="text-[#38BDF8]">help</span> for list of commands.
          </div>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: rawCmd, output }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(cmdHistory[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdHistory.length === 0 || historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[nextIdx] || '');
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0B0D10]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Obsidian Kinetic Terminal Mode"
    >
      <div className="w-full max-w-3xl h-[80vh] max-h-[640px] rounded-[8px] bg-[#07080A] border border-[#1F242D] flex flex-col overflow-hidden">
        {/* Terminal Header Bar */}
        <div className="bg-[#111418] px-4 py-3 border-b border-[#1F242D] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-[1px] bg-[#1F242D] cursor-pointer" onClick={onClose} />
            <span className="w-2 h-2 rounded-[1px] bg-[#1F242D]" />
            <span className="w-2 h-2 rounded-[1px] bg-[#1F242D]" />
            <span className="ml-2 font-mono text-xs text-[#9CA3AF] tracking-[0.06em]">
              hkp@kathmandu: ~ (Terminal Mode Easter Egg)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-[#4B5563] hidden sm:inline">
              PRESS ESC TO EXIT
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-[4px] hover:bg-[#161B22] text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors"
              aria-label="Close terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div
          className="flex-1 p-5 overflow-y-auto font-mono text-xs text-[#F3F4F6] space-y-3 cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-[#38BDF8]">
                <span className="text-[#4B5563]">hkp@kathmandu:~$</span>
                <span>{item.command}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}

          {/* Active input line */}
          <div className="flex items-center gap-2 text-[#F3F4F6] pt-1">
            <span className="text-[#4B5563] shrink-0">hkp@kathmandu:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-[#F3F4F6] font-mono text-xs p-0 focus:ring-0"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </div>
          <div ref={logsBottomRef} />
        </div>

        {/* Terminal Footer Quick Buttons */}
        <div className="bg-[#111418] px-4 py-2.5 border-t border-[#1F242D] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono shrink-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[#4B5563]">QUICK:</span>
            {['whoami', 'projects', 'principles', 'now', 'cat resume', 'contact'].map((c) => (
              <button
                key={c}
                onClick={() => handleCommand(c)}
                className="px-2 py-0.5 rounded-[2px] bg-[#0B0D10] border border-[#1F242D] text-[#9CA3AF] hover:text-[#38BDF8] transition-colors"
              >
                {c}
              </button>
            ))}
          </div>
          <button
            onClick={() => handleCommand('clear')}
            className="text-[#4B5563] hover:text-[#F3F4F6]"
          >
            clear
          </button>
        </div>
      </div>
    </div>
  );
};
