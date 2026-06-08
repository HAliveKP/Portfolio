import React, { useState, useEffect, useRef } from "react";
import { 
  Terminal as TermIcon, 
  HelpCircle, 
  User, 
  Award, 
  Layers, 
  FolderGit, 
  Cpu, 
  BookOpen, 
  Send, 
  RefreshCw, 
  Volume2, 
  VolumeX, 
  Sparkles,
  CheckCircle2,
  Trash2,
  AlertOctagon,
  Github,
  Linkedin,
  Mail,
  Gamepad,
  Clock,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  Menu,
  X,
  Copy,
  ExternalLink as LinkIcon
} from "lucide-react";
import { PROJECTS_REGISTRY, PUZZLES_DIARY, CONTACT_LINKS } from "../data/portfolioData";
import { TerminalLine, LeaderboardEntry, ProjectDef, PuzzleDef } from "../types";
import TerminalShooter from "./TerminalShooter";

const VIRTUAL_FS: Record<string, { type: "dir", contents: string[] }> = {
  "/": {
    type: "dir",
    contents: ["about.txt", "projects", "skills", "classified"]
  },
  "/projects": {
    type: "dir",
    contents: ["yolo_vision.md", "rest_api.md", "portfolio.md"]
  },
  "/skills": {
    type: "dir",
    contents: ["python.txt", "react.txt", "database.txt"]
  },
  "/classified": {
    type: "dir",
    contents: ["sys_override.sh", "encrypted_payload.dat", "password_hint.txt"]
  }
};

const FS_FILES_CONTENT: Record<string, string> = {
  "/about.txt": "Name: Harikrishna Pokhrel\nStatus: Online\nRole: Full-stack AI/ML Student at Softwarica College.",
  "/projects/yolo_vision.md": "# YOLO Vision Model\nDetected Developer at 99.2% confidence. Port 3000.",
  "/projects/rest_api.md": "# REST API Architectures\nMicroservices scaled horizontally via Docker and managed via NGINX.",
  "/projects/portfolio.md": "Terminal OS portfolio (this very node). Recursion detected.",
  "/skills/python.txt": "Proficiency: Expert\nLibraries: TensorFlow, PyTorch, Pandas, FastAPI",
  "/skills/react.txt": "Proficiency: Advanced\nLibraries: React 18, Vite, Tailwind CSS",
  "/skills/database.txt": "Proficiency: Advanced\nEngines: PostgreSQL, MongoDB, SQLite",
  "/classified/sys_override.sh": "PERMISSION DENIED: You lack OVERLORD privileges.",
  "/classified/encrypted_payload.dat": "0xFE5A 0x19B3 0x00FF 0x1110 0xAAAA (ENCRYPTED)",
  "/classified/password_hint.txt": "Hint: The answer to the universe."
};

const NAV_ITEMS = [
  { label: "PROFILE", cmd: "/me", icon: <User className="w-4 h-4" /> },
  { label: "SKILLS", cmd: "/skills", icon: <Layers className="w-4 h-4" /> },
  { label: "PROJECTS", cmd: "/projects", icon: <FolderGit className="w-4 h-4" /> },
  { label: "PLAY_GRID", cmd: "/play", icon: <Gamepad className="w-4 h-4" /> },
  { label: "LEADERBOARD", cmd: "/leaderboard", icon: <Award className="w-4 h-4" /> },
  { label: "CONTACT", cmd: "/contact", icon: <Send className="w-4 h-4" /> },
];

export default function TerminalDashboard() {
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [systemLoad, setSystemLoad] = useState(0.35);
  const [systemTime, setSystemTime] = useState("");
  const [uptimeDays, setUptimeDays] = useState(0);
  const [uptimeParts, setUptimeParts] = useState({ h: 0, m: 0, s: 0 });
  const [activeSection, setActiveSection] = useState<string | null>("PROFILE");
  const [isLoadingSection, setIsLoadingSection] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const [contactState, setContactState] = useState<"idle" | "name" | "email" | "msg" | "sending">("idle");
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });

  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizDifficulty, setQuizDifficulty] = useState<"Normal" | "Extra Hard">("Normal");
  const [submittingScore, setSubmittingScore] = useState(false);
  const [highScoreSaved, setHighScoreSaved] = useState(false);

  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [loadingLeaders, setLoadingLeaders] = useState(false);
  const [leaderboardSearch, setLeaderboardSearch] = useState("");

  const [pwd, setPwd] = useState<string>("/");
  const [theme, setTheme] = useState<string>("matrix");

  const [mountedProject, setMountedProject] = useState<string>(PROJECTS_REGISTRY[0].slug);
  const [simulatedExtractPct, setSimulatedExtractPct] = useState<number | null>(null);
  const [inspectingProject, setInspectingProject] = useState<ProjectDef | null>(null);
  const [skillFilter, setSkillFilter] = useState<string>("ALL");

  const [diagnosticsLogs, setDiagnosticsLogs] = useState<string[]>([
    "SYS_BOOT: RESOLVED_COMPILER_READY",
    "KERN_STABLE: CACHED OK // SYSD_INIT",
    "YOLO_V3_COCO: DEEP_NETS_STABLE_98.4%",
    "PORT_3000: HOST_UP_INGRESS_ROUTED",
    "SEC_KEY: VALID_KEYCHAIN_LOADED",
    "NEURAL_NET: TENSOR_POOL_ACTIVE"
  ]);

  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const bDate = new Date("2003-06-12T00:00:00Z");
    const interval = setInterval(() => {
      const now = new Date();
      const diffMs = now.getTime() - bDate.getTime();
      const totalSecs = Math.floor(diffMs / 1000);
      const days = Math.floor(totalSecs / (3600 * 24));
      const hours = Math.floor((totalSecs % (3600 * 24)) / 3600);
      const mins = Math.floor((totalSecs % 3600) / 60);
      const secs = totalSecs % 60;
      setUptimeDays(days);
      setUptimeParts({ h: hours, m: mins, s: secs });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const statsTimer = setInterval(() => {
      setSystemLoad((prev) => {
        const delta = (Math.random() - 0.5) * 0.08;
        return Math.min(Math.max(prev + delta, 0.15), 0.98);
      });
      const d = new Date();
      setSystemTime(d.toLocaleTimeString([], { hour12: false }));
    }, 1500);

    const diagnosticTemplates = [
      "[KERN] SYSD_SWEEP: reclaimed 184MB memory buffer",
      "[YOLO] ACTIVE_FRAME: detected class 'developer' (99.2%)",
      "[YOLO] CORE_VISION: tracking active sessions on port 3000",
      "[DB] INDEX_PING: persistent ledger storage sync successful",
      "[API] GET /api/leaderboard returned status code 200 (OK)",
      "[PORT] INGRESS MONITOR: traffic flow on host 0.0.0.0:3000 nominal",
      "[AI] PIPELINE: model gemini-3.5-flash calibrated",
      "[SEC] TRANSMISSION: stream encrypted with AES-256-GCM cipher",
      "[KERN] HIGH-TENSION: network socket latency clocked at 12ms",
      "[YOLO] CLASSIFIED Node: currency nepalese_rupee validator online",
      "[SYS] CPU_HEARTBEAT: cores normalized at 4.20GHz",
      "[DB] ENVELOPE CONTROLLER: contacts backup ledger updated"
    ];

    const diagTimer = setInterval(() => {
      const randomLine = diagnosticTemplates[Math.floor(Math.random() * diagnosticTemplates.length)];
      const ts = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
      setDiagnosticsLogs(prev => {
        const next = [...prev, `[${ts}] ${randomLine}`];
        return next.slice(-20);
      });
    }, 3000);

    printWelcome();
    fetchLeaderboard();

    return () => {
      clearInterval(statsTimer);
      clearInterval(diagTimer);
    };
  }, []);

  useEffect(() => {
    // Only scroll to bottom if we are not navigating to a specific section
    if (!isLoadingSection) {
      terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isLoadingSection]);

  useEffect(() => {
    const observerOptions = {
      root: document.querySelector('.terminal-content-area'),
      threshold: 0.5,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const navItem = NAV_ITEMS.find(item => item.label.toLowerCase() === id);
          if (navItem) setActiveSection(navItem.label);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [history]);

  const navigateTo = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // If section doesn't exist in history, trigger the command
      const navItem = NAV_ITEMS.find(item => item.label.toLowerCase() === sectionId);
      if (navItem) {
        handleCommandSubmit(navItem.cmd);
        // Wait for render then scroll
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
    setIsMobileMenuOpen(false);
  };

  const playClickSound = (f = 400, d = 0.02) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const audioCtx = audioCtxRef.current;
      if (audioCtx.state === "suspended") audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(f + (Math.random() - 0.5) * 100, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + d);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + d);
    } catch (e) {}
  };

  const playChime = (success: boolean) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const audioCtx = audioCtxRef.current;
      if (audioCtx.state === "suspended") audioCtx.resume();
      const now = audioCtx.currentTime;
      if (success) {
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          gain.gain.setValueAtTime(0.03, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.00001, now + idx * 0.08 + 0.25);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.3);
        });
      } else {
        [220, 164, 110].forEach((freq, idx) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(freq, now + idx * 0.1);
          gain.gain.setValueAtTime(0.04, now + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.00001, now + idx * 0.1 + 0.35);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + idx * 0.1);
          osc.stop(now + idx * 0.1 + 0.4);
        });
      }
    } catch (e) {}
  };

  const appendLine = (text: string, type: any = "system", compName?: string, compProps?: any) => {
    setHistory((prev) => [
      ...prev,
      {
        id: String(Date.now()) + "-" + Math.random().toString(16).substring(2, 6),
        type,
        text,
        componentName: compName,
        componentProps: compProps
      }
    ]);
  };

  const printWelcome = () => {
    appendLine("█ HK_TERMINAL [v1.0.0]", "success");
    appendLine("==========================================================================", "accent");
    appendLine("WELCOME, OPERATOR. COGNITIVE INTERFACE SYNCHRONIZED.", "system");
    appendLine("Type '/help' to read the manual or use the sidebar for rapid access.", "success");
    appendLine("==========================================================================", "accent");
    appendLine("visitor@hk-os:~#", "user");
  };

  const fetchLeaderboard = async () => {
    setLoadingLeaders(true);
    try {
      const res = await fetch("/api/leaderboard");
      if (res.ok) {
        const data = await res.json();
        setLeaders(data);
      }
    } catch (err) {
      console.warn("Unable to connect to live leaderboard API.");
    } finally {
      setLoadingLeaders(false);
    }
  };

  const handleCommandSubmit = async (cmdString: string) => {
    const raw = cmdString.trim();
    if (!raw) return;

    playClickSound(600, 0.05);
    appendLine(`visitor@hk-os:~# ${raw}`, "user");
    setInputVal("");

    if (contactState !== "idle") {
      handleContactStep(raw);
      return;
    }

    const parts = raw.split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    const matchedNavItem = NAV_ITEMS.find(item => item.cmd === command);
    if (matchedNavItem) {
      setActiveSection(matchedNavItem.label);
      setIsLoadingSection(true);
      setTimeout(() => setIsLoadingSection(false), 800);
      setIsMobileMenuOpen(false);
    }

    switch (command) {
      case "/help":
        appendLine("SYS_SECURE_MANUAL: LOADING AVAILABLE UTILITIES...", "accent");
        appendLine("Here is the list of available commands and core navigation scripts:", "system");
        appendLine("  /me          - Harikrishna Pokhrel's Stylized player identity card", "success");
        appendLine("  /skills      - Real-time skill performance diagnostic meters", "success");
        appendLine("  /projects    - Maps out the developed software portfolios", "success");
        appendLine("  /play        - Dynamic terminal algorithmic debugging challenges", "success");
        appendLine("  /leaderboard - Synchronizes of player metrics scores", "success");
        appendLine("  /contact     - Initializes secure message channel transmission", "success");
        appendLine("  /clear       - Flushes terminal history buffer", "success");
        appendLine("  /ask [query] - Consult Harikrishna's digital clone via Gemini AI", "success");
        appendLine("  [V-FS] ls, cd, cat, pwd - Navigate the virtual filesystem", "success");
        break;

      case "pwd":
        appendLine(pwd, "success");
        break;

      case "ls":
        const currentDirContent = VIRTUAL_FS[pwd];
        if (currentDirContent) {
          appendLine(currentDirContent.contents.join("  "), "success");
        } else {
          appendLine(`ls: cannot access '${pwd}': No such file or directory`, "error");
        }
        break;

      case "cd":
        if (args.length === 0 || args[0] === "~" || args[0] === "/") {
          setPwd("/");
        } else if (args[0] === "..") {
          if (pwd !== "/") {
            const parts = pwd.split("/").filter(Boolean);
            parts.pop();
            setPwd("/" + parts.join("/"));
          }
        } else {
          const target = args[0];
          const newPath = target.startsWith("/") ? target : (pwd === "/" ? "/" + target : pwd + "/" + target);
          if (VIRTUAL_FS[newPath]) {
            setPwd(newPath);
          } else {
            appendLine(`cd: ${target}: No such directory`, "error");
          }
        }
        break;

      case "cat":
        if (args.length === 0) {
          appendLine("cat: missing operand", "error");
        } else {
          const target = args[0];
          let searchPath = target;
          if (!target.startsWith("/")) {
            searchPath = pwd === "/" ? "/" + target : pwd + "/" + target;
          }
          if (FS_FILES_CONTENT[searchPath]) {
            appendLine(FS_FILES_CONTENT[searchPath], "success");
          } else if (VIRTUAL_FS[searchPath]) {
            appendLine(`cat: ${target}: Is a directory`, "error");
          } else {
            appendLine(`cat: ${target}: No such file or directory`, "error");
          }
        }
        break;

      case "/me":
        appendLine("", "system", "me");
        break;

      case "/skills":
        appendLine("", "system", "skills");
        break;

      case "/projects":
        if (args.length > 0) {
          const matchStr = args.join(" ").toLowerCase().replace(/[^a-z]/g, "");
          const matched = PROJECTS_REGISTRY.find(p => p.slug.includes(matchStr) || p.name.toLowerCase().includes(matchStr));
          if (matched) {
            setMountedProject(matched.slug);
            appendLine("", "system", "projects_detail", { project: matched });
            break;
          }
        }
        appendLine("", "system", "projects");
        break;

      case "/play":
        if (args.length > 0 && args[0].toLowerCase() === "game") {
          appendLine("", "system", "game");
          break;
        }
        let diff: "Normal" | "Extra Hard" = "Normal";
        if (args.length > 0 && args[0].toLowerCase().includes("hard")) {
          diff = "Extra Hard";
        }
        setQuizDifficulty(diff);
        setHighScoreSaved(false);
        setScore(0);
        const candidates = PUZZLES_DIARY.filter(p => p.difficulty === diff);
        const randomChallenge = candidates[Math.floor(Math.random() * candidates.length)];
        setActiveQuizId(randomChallenge.id);
        appendLine("Type '/play game' to launch BUG_BLASTER or solve this puzzle:", "success");
        appendLine("", "system", "play", { puzzle: randomChallenge });
        break;

      case "/leaderboard":
        await fetchLeaderboard();
        appendLine("", "system", "leaderboard");
        break;

      case "/contact":
        appendLine("", "system", "contact");
        break;

      case "/clear":
        setHistory([]);
        break;

      case "/ask":
        if (args.length === 0) {
          appendLine("FORMAT PENALTY: `/ask [your question context]` required.", "error");
        } else {
          const prompt = args.join(" ");
          await triggerAiQuery(prompt);
        }
        break;

      default:
        if (activeQuizId && ["a", "b", "c", "d"].includes(command)) {
          const currentQuiz = PUZZLES_DIARY.find(p => p.id === activeQuizId);
          if (currentQuiz) {
            const index = command.charCodeAt(0) - 97;
            handleQuizAnswer(currentQuiz, index);
            break;
          }
        }
        appendLine(`ERROR 404 — MODULE '${command}' NOT FOUND`, "error");
        appendLine(">> SYSTEM_RECOVERY: Type '/help' to list valid operational modules.", "accent");
    }
  };

  const handleContactStep = async (messageText: string) => {
    const txt = messageText.trim();
    if (contactState === "name") {
      setContactForm(prev => ({ ...prev, name: txt }));
      setContactState("email");
      appendLine("Identification recorded. Please insert your retrieval communication coordinates (Email Address):", "success");
    } else if (contactState === "email") {
      if (!txt.includes("@")) {
        appendLine("SIGNATURE INVALID: Email lacks '@' notation. Please verify and re-type:", "error");
        return;
      }
      setContactForm(prev => ({ ...prev, email: txt }));
      setContactState("msg");
      appendLine("Communications established. Input your encrypted message packet payload:", "success");
    } else if (contactState === "msg") {
      const finalForm = { ...contactForm, message: txt };
      setContactForm(finalForm);
      setContactState("sending");
      appendLine("SENDING PACKET RELAY ENVELOPES...", "accent");

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalForm)
        });
        if (response.ok) {
          const resData = await response.json();
          playChime(true);
          appendLine("==========================================================", "accent");
          appendLine(`[TRANSMISSION SUCCESSFULLY SENT] Secure relay signed.`, "success");
          appendLine(`  TIME STAMP: ${resData.time}`, "system");
          appendLine(`  ENCRYPT HASH: ${resData.hash}`, "system");
          appendLine("==========================================================", "accent");
        } else {
          throw new Error();
        }
      } catch (err) {
        playChime(false);
        appendLine("TRANSMISSION ERROR: Secure channel routing failed.", "error");
      } finally {
        setContactState("idle");
      }
    }
  };

  const triggerAiQuery = async (queryText: string) => {
    appendLine(queryText, "chat_user");
    const aiPrefixLine = { id: 'ai-prefix-' + Date.now(), type: "chat_ai", text: "HK_AI > _", isTyping: true };
    setHistory(prev => [...prev, aiPrefixLine as any]);

    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: queryText })
      });
      if (res.ok) {
        const data = await res.json();
        setHistory(prev => prev.filter(l => l.id !== aiPrefixLine.id));
        appendLine(`HK_AI > ${data.answer}`, "chat_ai");
        playChime(true);
      } else {
        throw new Error();
      }
    } catch (err) {
      setHistory(prev => prev.filter(l => l.id !== aiPrefixLine.id));
      appendLine("AI SYNERGY TIMEOUT: Failed to query processor.", "error");
    }
  };

  const handleQuizAnswer = (puzzle: PuzzleDef, selectedIndex: number) => {
    if (!activeQuizId) return;
    setActiveQuizId(null);
    const isMatch = selectedIndex === puzzle.correctChoiceIndex;
    if (isMatch) {
      playChime(true);
      const earned = puzzle.points;
      setScore(earned);
      appendLine("==========================================================", "accent");
      appendLine(`[SOLVED] CAPABILITY CERTIFICATE RECONSTRUCTED!`, "success");
      appendLine(`  Points Awarded:  +${earned} Reputations`, "success");
      appendLine("==========================================================", "accent");
      appendLine("", "system", "save_score", { points: earned, diff: puzzle.difficulty });
    } else {
      playChime(false);
      appendLine("==========================================================", "accent");
      appendLine(`[FAILED] SYSTEM FLOPPED! TRIPPED COMPILATION ERROR.`, "error");
      appendLine("==========================================================", "accent");
    }
  };

  const handleScoreSubmission = async (username: string, scoreVal: number, diffVal: string) => {
    if (!username.trim()) return;
    setSubmittingScore(true);
    try {
      const res = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, score: scoreVal, difficulty: diffVal })
      });
      if (res.ok) {
        playChime(true);
        appendLine(`Rating synchronized for: "${username.toUpperCase()}"`, "success");
        setHighScoreSaved(true);
        fetchLeaderboard();
      }
    } catch (e) {
      appendLine("Score synchronization failure.", "error");
    } finally {
      setSubmittingScore(false);
    }
  };

  const triggerDownloadSimulation = (proj: ProjectDef) => {
    setSimulatedExtractPct(0);
    playClickSound(800, 0.4);
    let currentPct = 0;
    const tracker = setInterval(() => {
      currentPct += Math.floor(Math.random() * 15) + 5;
      if (currentPct >= 100) {
        currentPct = 100;
        clearInterval(tracker);
        setTimeout(() => {
          setSimulatedExtractPct(null);
          playChime(true);
          window.open(proj.repoUrl, "_blank", "noopener,noreferrer");
        }, 500);
      }
      setSimulatedExtractPct(currentPct);
    }, 150);
  };

  const handleQuickCommand = (cmd: string) => {
    handleCommandSubmit(cmd);
    inputRef.current?.focus();
  };

  return (
    <div className="h-screen bg-cyber-bg-void text-white/75 flex flex-col font-body relative overflow-hidden select-none md:select-text">
      <div className="noise-overlay" />
      
      {/* HUD Header Bar */}
      <header className="h-[48px] bg-cyber-cyan/5 border-b border-cyber-cyan/30 flex justify-between items-center px-4 md:px-6 shrink-0 z-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-cyber-cyan/5 to-transparent w-1/4 h-full -translate-x-full animate-[shimmer_4s_infinite]" />

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-cyber-cyan btn-icon border-none w-8 h-8"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse shadow-[0_0_8px_rgba(57,255,20,0.5)]" />
            <span className="text-[10px] font-display text-cyber-cyan tracking-[0.1em] uppercase hidden xs:inline">[ SYSTEM: ONLINE ]</span>
          </div>
        </div>

        <div className="font-display text-cyber-cyan text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase text-center flex-grow truncate px-2 hover:animate-glitch cursor-default">
          HK://CYBER_TERMINAL v1.0.0
        </div>

        <div className="flex items-center space-x-3 md:space-x-6 text-[10px] font-terminal text-cyber-cyan/80">
          <div className="hidden sm:flex items-center space-x-2">
            <Clock className="w-3 h-3" />
            <span>{systemTime}</span>
          </div>
          <button onClick={() => setSoundEnabled(!soundEnabled)} className="text-cyber-cyan/40 hover:text-cyber-cyan p-1">
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </header>

      <div className="flex-grow flex overflow-hidden relative">
        {/* Sidebar Nav - Desktop + Mobile Drawer */}
        <aside className={`${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative top-[48px] md:top-0 left-0 w-64 h-[calc(100%-48px)] md:h-full flex flex-col border-r border-cyber-cyan/10 bg-cyber-bg-void/95 md:bg-black/20 shrink-0 z-40 transition-transform duration-300`}>
          <nav className="flex-grow py-6 overflow-y-auto">
            <div className="px-6 mb-4 text-[10px] font-display text-cyber-cyan/40 tracking-widest uppercase">Navigation</div>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => navigateTo(item.label.toLowerCase())}
                className={`w-full flex items-center px-6 py-3 group relative transition-all duration-300 ${activeSection === item.label ? 'bg-cyber-cyan/10 border-l-2 border-cyber-cyan' : 'border-l-2 border-transparent hover:bg-white/5'}`}
              >
                <span className="text-cyber-cyan mr-3 font-terminal">{">"}</span>
                <div className="relative overflow-hidden flex-grow text-left">
                  <span className={`inline-block whitespace-nowrap overflow-hidden transition-all duration-700 w-full font-terminal text-xs tracking-widest uppercase ${activeSection === item.label ? 'text-white' : 'text-white/40 group-hover:text-white group-hover:animate-[typewriter_1s_steps(20)]'}`}>
                    {item.label}
                  </span>
                </div>
                <div className={`transition-all duration-300 ${activeSection === item.label ? 'text-cyber-cyan scale-110' : 'text-white/20 group-hover:text-cyber-cyan/60'}`}>
                  {item.icon}
                </div>
              </button>
            ))}
          </nav>

          <div className="p-6 border-t border-cyber-cyan/10 bg-black/40 space-y-6 hidden md:block">
            <div className="px-0 text-[10px] font-display text-cyber-cyan/40 tracking-widest uppercase">Diagnostics</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="data-panel p-2 bg-black/40 border-cyber-cyan/10">
                <div className="text-[10px] text-cyber-cyan/60 uppercase font-terminal flex justify-between">CPU<ChevronUp className="w-2.5 h-2.5 text-cyber-green" /></div>
                <div className="text-lg font-display text-white">{(systemLoad * 100).toFixed(0)}</div>
              </div>
              <div className="data-panel p-2 bg-black/40 border-cyber-cyan/10">
                <div className="text-[10px] text-cyber-cyan/60 uppercase font-terminal flex justify-between">MEM<ChevronDown className="w-2.5 h-2.5 text-cyber-red" /></div>
                <div className="text-lg font-display text-white">1.2</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Backdrop */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30 mt-[48px]"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-grow flex flex-col bg-cyber-bg-dark/40 overflow-hidden relative" role="main">
          <section className="flex-grow flex flex-col overflow-hidden m-2 md:m-6 data-panel border-cyber-cyan/20">
            <div className="h-8 bg-cyber-cyan/5 border-b border-cyber-cyan/10 flex items-center px-4 justify-between shrink-0">
              <div className="flex space-x-1.5">
                <div className="w-2 h-2 rounded-full bg-cyber-red/30" />
                <div className="w-2 h-2 rounded-full bg-cyber-amber/30" />
                <div className="w-2 h-2 rounded-full bg-cyber-green/30" />
              </div>
              <div className="text-[8px] md:text-[9px] font-terminal text-cyber-cyan/40 uppercase tracking-widest truncate max-w-[200px]">
                visitor@hk-os:~{pwd}
              </div>
            </div>

            <div className="terminal-content-area flex-grow overflow-y-auto p-3 md:p-6 space-y-4 font-terminal scrollbar-thin">
              {isLoadingSection && (
                <div className="text-cyber-cyan font-terminal text-xs md:text-sm animate-pulse">
                  {">"} LOADING [{activeSection}]...
                </div>
              )}

              {!isLoadingSection && history.map((line) => (
                <div key={line.id} className={`animate-in fade-in duration-500 ${line.type === 'chat_user' ? 'flex justify-end' : ''}`}>
                  {line.componentName ? (
                    <div
                      id={line.componentName === "me" ? "profile" : line.componentName === "skills" ? "skills" : line.componentName === "projects" ? "projects" : line.componentName === "game" ? "game" : line.componentName === "contact" ? "contact" : undefined}
                      ref={el => {
                        if (line.componentName) {
                          const key = line.componentName === "me" ? "profile" : line.componentName;
                          sectionRefs.current[key] = el;
                        }
                      }}
                      className="my-2 md:my-4 border-l border-cyber-cyan/20 pl-3 md:pl-4 py-1 md:py-2 w-full"
                    >
                      {line.componentName === "me" && (
                        <div className="data-panel p-4 md:p-6 border-cyber-cyan/30">
                          <h2 className="mb-4 md:mb-6 panel-title text-cyber-cyan text-sm md:text-base">PROFILE_DATA // [HK]</h2>
                          <div className="grid md:grid-cols-2 gap-6 md:gap-8 text-sm">
                            <div className="space-y-4">
                              <div className="border-b border-white/5 pb-2">
                                <p className="text-cyber-cyan/60 uppercase text-[8px] md:text-[9px] mb-1 font-display tracking-widest">Operator Identity</p>
                                <p className="text-white font-bold text-base md:text-lg">Harikrishna Pokhrel</p>
                              </div>
                              <div>
                                <p className="text-cyber-cyan/60 uppercase text-[8px] md:text-[9px] mb-1 font-display tracking-widest">Dossier Summary</p>
                                <p className="text-[11px] md:text-xs leading-relaxed opacity-70">Full-stack AI/ML student dedicated to building neural digital interfaces and scalable backend architectures.</p>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div className="bg-white/5 p-3 md:p-4 border border-white/10 rounded">
                                <p className="text-cyber-cyan/60 uppercase text-[8px] md:text-[9px] mb-2 font-display tracking-widest">Active Specializations</p>
                                <ul className="text-[11px] md:text-xs space-y-2 text-cyber-green font-bold">
                                  <li>{">"} COMPUTER_VISION</li>
                                  <li>{">"} NEURAL_NETS</li>
                                  <li>{">"} BACKEND_API</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {line.componentName === "skills" && (
                        <div className="data-panel p-4 md:p-6 border-cyber-cyan/30">
                          <div className="flex justify-between items-center mb-6">
                            <h2 className="panel-title text-cyber-cyan text-sm md:text-base">SKILLS_MATRIX</h2>
                            <div className="flex space-x-2">
                                {["ALL", "EXPERT", "PROFICIENT"].map(f => (
                                    <button
                                        key={f}
                                        onClick={() => setSkillFilter(f)}
                                        className={`text-[9px] font-display px-2 py-1 border transition-all ${skillFilter === f ? 'bg-cyber-cyan/20 border-cyber-cyan text-cyber-cyan' : 'border-white/10 text-white/40 hover:text-white/60'}`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                          </div>
                          <div className="grid xs:grid-cols-1 sm:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-4 md:gap-y-6">
                            {[
                              { label: "PYTHON_SYS", val: 92, type: "EXPERT" },
                              { label: "NEURAL_NETS", val: 84, type: "EXPERT" },
                              { label: "YOLO_VISION", val: 88, type: "EXPERT" },
                              { label: "REACT_OS", val: 82, type: "PROFICIENT" },
                              { label: "SQL_REL", val: 85, type: "PROFICIENT" },
                              { label: "FLASK_ORCH", val: 80, type: "PROFICIENT" }
                            ].filter(s => skillFilter === "ALL" || s.type === skillFilter).map(s => (
                              <div key={s.label} className="animate-in fade-in slide-in-from-left-2 duration-300">
                                <div className="flex justify-between text-[9px] md:text-[10px] mb-1 uppercase font-terminal">
                                  <span className="text-white/60 tracking-widest">{s.label}</span>
                                  <span className={s.type === 'EXPERT' ? 'text-cyber-cyan' : 'text-cyber-green'}>[{s.val}%]</span>
                                </div>
                                <div className="h-3 md:h-4 bg-black/40 border border-white/10 flex items-center px-1">
                                  <div className={`h-1.5 md:h-2 flex space-x-[2px] w-full`}>
                                    {Array.from({ length: 15 }).map((_, i) => (
                                      <div
                                        key={i}
                                        className={`h-full flex-grow transition-all duration-1000 ${i < (s.val / 6.6) ? (s.type === 'EXPERT' ? 'bg-cyber-cyan shadow-[0_0_5px_rgba(0,245,255,0.5)]' : 'bg-cyber-green shadow-[0_0_5px_rgba(57,255,20,0.5)]') : 'bg-white/5'}`}
                                        style={{ transitionDelay: `${i * 50}ms` }}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {line.componentName === "projects" && (
                        <div className="grid xs:grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                          {PROJECTS_REGISTRY.map(p => (
                            <div key={p.id} className="data-panel p-3 md:p-4 project-card status-active group">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-display text-[11px] md:text-sm text-cyber-cyan truncate">{p.name}</h3>
                                <div className={`status-badge border scale-75 origin-right ${
                                    p.stats.includes("Completed") ? 'bg-cyber-green/10 text-cyber-green border-cyber-green/20' :
                                    p.stats.includes("Deployed") ? 'bg-cyber-cyan/10 text-cyber-cyan border-cyber-cyan/20' :
                                    'bg-cyber-amber/10 text-cyber-amber border-cyber-amber/20'
                                }`}>
                                  <div className={`status-dot ${
                                      p.stats.includes("Completed") ? 'bg-cyber-green' :
                                      p.stats.includes("Deployed") ? 'bg-cyber-cyan' : 'bg-cyber-amber'
                                  }`} />
                                  {p.stats.includes("Completed") ? 'STABLE' : p.stats.includes("Deployed") ? 'DEPLOYED' : 'WIP'}
                                </div>
                              </div>
                              <p className="text-[10px] opacity-60 mb-3 line-clamp-2 h-8">{p.description}</p>
                              <div className="flex justify-between items-center">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => window.open(p.repoUrl, "_blank", "noopener,noreferrer")}
                                        className="text-white/40 hover:text-cyber-cyan transition-colors"
                                        title="View Source"
                                    >
                                        <Github className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => setInspectingProject(p)}
                                        className="text-white/40 hover:text-cyber-amber transition-colors"
                                        title="Inspect Data"
                                    >
                                        <Cpu className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                                <button onClick={() => navigateTo('projects')} className="btn-secondary py-0.5 px-2 text-[9px] opacity-0 group-hover:opacity-100 transition-opacity">MOUNT</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {line.componentName === "game" && (
                        <TerminalShooter
                          onGameOver={(finalScore) => {
                            appendLine(`GAME_OVER: MISSION FAILED. SCORE: ${finalScore}`, "error");
                            handleScoreSubmission("OPERATOR", finalScore, "BUG_BLASTER");
                          }}
                        />
                      )}

                      {line.componentName === "leaderboard" && (
                        <div className="data-panel overflow-hidden border-cyber-cyan/30">
                          <div className="bg-cyber-cyan/5 px-4 md:px-6 py-3 md:py-4 border-b border-cyber-cyan/10 flex justify-between items-center">
                            <h2 className="panel-title text-cyber-cyan text-xs md:text-sm">COGNITIVE_LEADERBOARD</h2>
                            <button
                              onClick={() => { fetchLeaderboard(); playClickSound(); }}
                              className="btn-icon w-6 h-6 border-none text-cyber-cyan/60 hover:text-cyber-cyan"
                              title="Refresh Leaderboard"
                            >
                              <RefreshCw className={`w-3.5 h-3.5 ${loadingLeaders ? 'animate-spin' : ''}`} />
                            </button>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full text-left font-terminal text-[10px] md:text-[11px]">
                              <thead>
                                <tr className="text-white/40 uppercase tracking-widest border-b border-white/5">
                                  <th className="px-4 md:px-6 py-3">Rank</th>
                                  <th className="px-4 md:px-6 py-3">Operator</th>
                                  <th className="px-4 md:px-6 py-3">Score</th>
                                </tr>
                              </thead>
                              <tbody>
                                {leaders.map((entry, idx) => (
                                  <tr key={entry.id} className={`border-b border-white/5 ${idx % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                                    <td className="px-4 md:px-6 py-3">
                                      <span className={`font-bold ${idx < 3 ? 'text-cyber-amber' : 'text-white/40'}`}>{(idx + 1).toString().padStart(2, '0')}</span>
                                    </td>
                                    <td className="px-4 md:px-6 py-3 text-white uppercase font-bold tracking-widest truncate max-w-[100px]">{entry.username}</td>
                                    <td className="px-4 md:px-6 py-3 text-cyber-green font-bold">{entry.score}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {line.componentName === "contact" && (
                        <div className="grid gap-4 md:grid-cols-3">
                          {CONTACT_LINKS.map((link) => (
                            <a
                              key={link.label}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="data-panel p-4 group relative flex flex-col items-center text-center transition-all duration-300 hover:border-white/40"
                              style={{ '--primary': link.color } as any}
                            >
                              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="status-badge bg-cyber-green/10 text-cyber-green border border-cyber-green/20 scale-75">
                                  <div className="status-dot bg-cyber-green" />LINK ACTIVE
                                </div>
                              </div>
                              <div className="mb-3 p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                                {link.icon === 'github' && <Github className="w-6 h-6" style={{ color: link.color }} />}
                                {link.icon === 'mail' && <Mail className="w-6 h-6" style={{ color: link.color }} />}
                                {link.icon === 'linkedin' && <Linkedin className="w-6 h-6" style={{ color: link.color }} />}
                              </div>
                              <div className="font-display text-xs tracking-widest text-white/90 mb-1">{link.label}</div>
                              <div className="font-terminal text-[10px] text-white/40 group-hover:text-white/60 transition-colors">{link.handle}</div>
                              <div className="mt-3 text-[10px] text-cyber-cyan opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0">
                                OPEN_CHANNEL →
                              </div>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className={`text-[11px] md:text-sm whitespace-pre-wrap font-terminal leading-relaxed ${
                      line.type === "success" ? "text-cyber-green" :
                      line.type === "error" ? "text-cyber-red" :
                      line.type === "accent" ? "text-cyber-cyan" :
                      line.type === "user" ? "text-cyber-amber" :
                      line.type === "chat_user" ? "text-cyber-cyan bg-cyber-cyan/10 border-l-2 border-cyber-cyan px-4 py-2 max-w-[80%]" :
                      line.type === "chat_ai" ? `text-cyber-green ${line.isTyping ? 'animate-pulse' : ''}` : "text-white/70"
                    }`}>
                      {line.text}
                    </div>
                  )}
                </div>
              ))}
              <div ref={terminalBottomRef} />
            </div>

            {/* Prompt Footer */}
            <footer className="p-3 md:p-4 bg-black/40 border-t border-cyber-cyan/10 shrink-0">
              <form onSubmit={(e) => { e.preventDefault(); handleCommandSubmit(inputVal); }} className="flex items-center space-x-2 md:space-x-3">
                <div className="text-cyber-cyan font-bold text-[10px] md:text-sm font-terminal shrink-0">{">"} visitor@hk-os:~#</div>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => { setInputVal(e.target.value); playClickSound(400, 0.01); }}
                  placeholder="Type command..."
                  className="flex-grow bg-transparent text-cyber-cyan border-none focus:outline-none focus:ring-0 font-terminal text-[11px] md:text-sm tracking-wider uppercase placeholder:text-cyber-cyan/10"
                  autoFocus
                />
                <button type="submit" className="text-cyber-cyan btn-icon border-none w-8 h-8 flex items-center justify-center" aria-label="Send Command">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </footer>
          </section>
        </main>
      </div>

      {inspectingProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="data-panel w-full max-w-2xl max-h-[80vh] flex flex-col border-cyber-amber/40">
                <div className="bg-cyber-amber/10 px-4 py-3 border-b border-cyber-amber/20 flex justify-between items-center">
                    <h3 className="font-display text-cyber-amber text-sm tracking-widest uppercase">INSPECTING_PROJECT: {inspectingProject.name}</h3>
                    <button onClick={() => setInspectingProject(null)} className="text-cyber-amber/60 hover:text-cyber-amber"><X className="w-5 h-5"/></button>
                </div>
                <div className="p-6 overflow-y-auto font-terminal space-y-6">
                    <div>
                        <p className="text-[10px] text-white/40 uppercase mb-2 tracking-widest">{">> ANALYZING_STACK"}</p>
                        <div className="flex flex-wrap gap-2">
                            {inspectingProject.tech.map(t => (
                                <span key={t} className="bg-white/5 border border-white/10 px-2 py-1 text-[10px] text-white/70">{t}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-[10px] text-white/40 uppercase tracking-widest">{">> SOURCE_SIMULATION"}</p>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(inspectingProject.simulationCode);
                                    playClickSound(800);
                                }}
                                className="text-[9px] text-cyber-cyan hover:underline flex items-center"
                            >
                                <Copy className="w-3 h-3 mr-1" /> COPY_CODE
                            </button>
                        </div>
                        <pre className="bg-black/60 p-4 rounded text-[10px] text-cyber-green overflow-x-auto border border-white/5">
                            {inspectingProject.simulationCode}
                        </pre>
                    </div>
                </div>
                <div className="p-4 bg-black/40 border-t border-white/5 flex justify-end">
                    <button onClick={() => window.open(inspectingProject.repoUrl, '_blank')} className="btn-primary py-1.5 px-4 text-xs">
                        <Github className="w-3.5 h-3.5 mr-2" /> OPEN_REPOSITORY
                    </button>
                </div>
            </div>
        </div>
      )}

      <footer className="h-8 bg-black border-t border-cyber-cyan/20 flex justify-between items-center px-4 shrink-0 text-[8px] md:text-[9px] font-terminal text-cyber-cyan/60 uppercase tracking-widest z-50">
        <div className="flex space-x-4">
          <span className="hidden xs:inline text-white/20">[ESC: BACK]</span>
          <span className="text-white/20">[TAB: NAV]</span>
          <span className="text-white/20">[ENT: SEL]</span>
        </div>
        <div className="flex space-x-4 items-center">
          <div className="hidden sm:block">HK v1.0.0 — MIT</div>
          <a href="https://github.com/HAliveKP" target="_blank" className="hover:text-cyber-cyan transition-colors"><Github className="w-3 h-3" /></a>
          <div className="border-l border-cyber-cyan/10 pl-4 md:pl-6 truncate max-w-[100px] md:max-w-none">PING: 12ms | VISITOR_001</div>
        </div>
      </footer>
    </div>
  );
}
