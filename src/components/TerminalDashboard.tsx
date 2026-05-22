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
  Gamepad
} from "lucide-react";
import { PROJECTS_REGISTRY, PUZZLES_DIARY } from "../data/portfolioData";
import { TerminalLine, LeaderboardEntry, ProjectDef, PuzzleDef } from "../types";

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

export default function TerminalDashboard() {
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [systemLoad, setSystemLoad] = useState(0.35);
  const [systemTime, setSystemTime] = useState("");
  const [uptimeDays, setUptimeDays] = useState(0);
  const [uptimeParts, setUptimeParts] = useState({ h: 0, m: 0, s: 0 });

  // Interactive contact workflow state (for guide-along in terminal)
  const [contactState, setContactState] = useState<"idle" | "name" | "email" | "msg" | "sending">("idle");
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });

  // Quiz interactive state
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizDifficulty, setQuizDifficulty] = useState<"Normal" | "Extra Hard">("Normal");
  const [submittingScore, setSubmittingScore] = useState(false);
  const [highScoreSaved, setHighScoreSaved] = useState(false);

  // Leaderboard fetched states
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [loadingLeaders, setLoadingLeaders] = useState(false);
  const [leaderboardSearch, setLeaderboardSearch] = useState("");

  const [pwd, setPwd] = useState<string>("/");
  const [theme, setTheme] = useState<string>("matrix");
  const [crtEnabled, setCrtEnabled] = useState<boolean>(true);

  // Mounted project state (for code display console)
  const [mountedProject, setMountedProject] = useState<string>(PROJECTS_REGISTRY[0].slug);
  const [simulatedExtractPct, setSimulatedExtractPct] = useState<number | null>(null);

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

  // Real-time Uptime counter based on Harikrishna Pokhrel birth date: June 12, 2003
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

  // System stats fluctuation simulation & dynamic diagnostic simulator logs
  useEffect(() => {
    const statsTimer = setInterval(() => {
      setSystemLoad((prev) => {
        const delta = (Math.random() - 0.5) * 0.08;
        return Math.min(Math.max(prev + delta, 0.15), 0.98);
      });
      const d = new Date();
      setSystemTime(d.toLocaleTimeString());
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
      const ts = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setDiagnosticsLogs(prev => {
        const next = [...prev, `[${ts}] ${randomLine}`];
        return next.slice(-20); // Keep last 20 elements
      });
    }, 3000);

    // Initial Welcome Message print
    printWelcome();
    fetchLeaderboard();

    return () => {
      clearInterval(statsTimer);
      clearInterval(diagTimer);
    };
  }, []);

  useEffect(() => {
    document.body.className = theme !== "matrix" ? `theme-${theme}` : '';
  }, [theme]);

  useEffect(() => {
    document.body.style.setProperty('--crt-opacity', crtEnabled ? '0.3' : '0');
    document.body.style.setProperty('--crt-bloom', crtEnabled ? '10px' : '0px');
  }, [crtEnabled]);

  // Auto Scroll on log updates
  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Play keyboard mechanical click sounds
  const playClickSound = (f = 400, d = 0.02) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const audioCtx = audioCtxRef.current;
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }
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
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }
      const now = audioCtx.currentTime;
      if (success) {
        // High ascending retro game sound (Success chime)
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
        // Low descending crash sound (Fault chime)
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

  // Helper printer
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
    appendLine("█ Hkp terminal [v1.2.9]", "success");
    appendLine("==========================================================================", "accent");
    appendLine("WELCOME, VISITOR. Core computational intelligence synchronizers active.", "system");
    appendLine("This terminal processes actual portfolio directories, skills, and coding puzzles in real-time.", "system");
    appendLine("Type '/help' to read the directory systems manual or access custom diagnostics widgets.", "success");
    appendLine("You can click on the fast-navigation terminal labels below to trigger immediate diagnostics.", "accent");
    appendLine("==========================================================================", "accent");
    appendLine("guest@hk-cloner:~#", "user");
  };

  // REST Backend Integrations
  const fetchLeaderboard = async () => {
    setLoadingLeaders(true);
    try {
      const res = await fetch("/api/leaderboard");
      if (res.ok) {
        const data = await res.json();
        setLeaders(data);
      }
    } catch (err) {
      console.warn("Unable to connect to live leaderboard API. Defaulting to local buffer.");
    } finally {
      setLoadingLeaders(false);
    }
  };

  const handleCommandSubmit = async (cmdString: string) => {
    const raw = cmdString.trim();
    if (!raw) return;

    playClickSound(600, 0.05);
    appendLine(`guest@hk-cloner:~# ${raw}`, "user");
    setInputVal("");

    // Contact form prompt bypasses the standard parser if active
    if (contactState !== "idle") {
      handleContactStep(raw);
      return;
    }

    const parts = raw.split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (command) {
      case "/help":
        appendLine("SYS_SECURE_MANUAL: LOADING AVAILABLE UTILITIES...", "accent");
        appendLine("Here is the list of available commands and core navigation scripts:", "system");
        appendLine("  /me          - Renders Harikrishna Pokhrel's Stylized player identity card", "success");
        appendLine("  /skills      - Activates real-time skill performance and diagnostic graph meters", "success");
        appendLine("  /projects    - Maps out the developed software portfolios secure registers", "success");
        appendLine("  /play        - Begins dynamic terminal algorithmic debugging challenges", "success");
        appendLine("  /leaderboard - Synchronizes of player metrics scores from cloud servers", "success");
        appendLine("  /contact     - Initializes secure message channel transmission flow", "success");
        appendLine("  /theme       - Open terminal customizer for visual themes and CRT controls", "success");
        appendLine("  /clear       - Flushes terminal history buffer and wipes logs", "success");
        appendLine("  /ask [query] - Consult Harikrishna's digital clonar double using Gemini AI", "success");
        appendLine("  [V-FS] ls, cd, cat, pwd - Navigate the simulated virtual filesystem", "success");
        appendLine("Press any of the quick-run shortcuts in top bar to load immediate overlays.", "accent");
        break;

      case "/theme":
        appendLine("LOADING VISUAL CONFIGURATION MATRIX...", "accent");
        appendLine("", "system", "theme");
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
        appendLine("MOUNTING RESUME PROFILE MATRIX...", "accent");
        appendLine("", "system", "me");
        break;

      case "/skills":
        appendLine("EXTRACTING TECHNOLOGICAL INTERCONNECTED READINGS...", "accent");
        appendLine("", "system", "skills");
        break;

      case "/projects":
        if (args.length > 0) {
          const matchStr = args.join(" ").toLowerCase().replace(/[^a-z]/g, "");
          const matched = PROJECTS_REGISTRY.find(p => p.slug.includes(matchStr) || p.name.toLowerCase().includes(matchStr));
          if (matched) {
            setMountedProject(matched.slug);
            appendLine(`MOUNTING CONSOLE DIRECTORY FOR: ${matched.name}...`, "accent");
            appendLine("", "system", "projects_detail", { project: matched });
            break;
          }
        }
        appendLine("INDEXING SECURE DIRECTORY TREE... COMPLETE.", "accent");
        appendLine("", "system", "projects");
        break;

      case "/play":
        let diff: "Normal" | "Extra Hard" = "Normal";
        if (args.length > 0 && args[0].toLowerCase().includes("hard")) {
          diff = "Extra Hard";
        }
        setQuizDifficulty(diff);
        setHighScoreSaved(false);
        setScore(0);
        
        // Filter puzzles by difficulty
        const candidates = PUZZLES_DIARY.filter(p => p.difficulty === diff);
        const randomChallenge = candidates[Math.floor(Math.random() * candidates.length)];
        setActiveQuizId(randomChallenge.id);

        appendLine(`INITIALIZING DEBUGGING MINI-GAME IN [${diff.toUpperCase()}] MODE...`, "accent");
        appendLine("", "system", "play", { puzzle: randomChallenge });
        break;

      case "/leaderboard":
        appendLine("SYNCHRONIZING REPUTATION RATING DATASET...", "accent");
        await fetchLeaderboard();
        appendLine("", "system", "leaderboard");
        break;

      case "/contact":
        appendLine("ACQUIRING ENVELOPE HANDLES... COMPLETED.", "accent");
        setContactForm({ name: "", email: "", message: "" });
        setContactState("name");
        appendLine("System detected. Establish a secure channel. Maintain a relation and enlarge your connection.", "accent");
        appendLine("[TRANSFORM OVERLAY MODE: INITIALIZED] Please type your Name to begin message encoding:", "success");
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
        // Try fallback check if user was just answering A, B, C, or D to quiz
        if (activeQuizId && ["a", "b", "c", "d"].includes(command)) {
          const currentQuiz = PUZZLES_DIARY.find(p => p.id === activeQuizId);
          if (currentQuiz) {
            const index = command.charCodeAt(0) - 97; // a -> 0, b -> 1...
            handleQuizAnswer(currentQuiz, index);
            break;
          }
        }
        appendLine(`COMMAND FAULT: '${command}' not certified in central kernel registries. Type '/help' for options.`, "error");
    }
  };

  // Contact step handler
  const handleContactStep = async (messageText: string) => {
    const txt = messageText.trim();
    if (contactState === "name") {
      setContactForm(prev => ({ ...prev, name: txt }));
      setContactState("email");
      appendLine("Identification recorded. Please insert your retrieval communication coordinates (Email Address):", "success");
    } else if (contactState === "email") {
      if (!txt.includes("@")) {
        appendLine("SIGNATURE INVALID: Email lacks '@' coordinate notation. Please verify and re-type:", "error");
        return;
      }
      setContactForm(prev => ({ ...prev, email: txt }));
      setContactState("msg");
      appendLine("Communications established. Input your encrypted message packet payload details / MESSAGE BODY:", "success");
    } else if (contactState === "msg") {
      const finalForm = { ...contactForm, message: txt };
      setContactForm(finalForm);
      setContactState("sending");
      appendLine("SENDING PACKET RELAY ENVELOPES OUT TO hpokhrel794@gmail.com...", "accent");

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
          appendLine(`  ROUTED TO: ${resData.recipient}`, "system");
          appendLine("==========================================================", "accent");
        } else {
          throw new Error();
        }
      } catch (err) {
        playChime(false);
        appendLine("TRANSMISSION ERROR: Secure channel routing failed. Saving transaction to local files.", "error");
      } finally {
        setContactState("idle");
      }
    }
  };

  // AI response fetching
  const triggerAiQuery = async (queryText: string) => {
    appendLine(`SCANNING COGNITIVE ARRAY CLUSTERS FOR: "${queryText}"...`, "accent");
    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: queryText })
      });
      if (res.ok) {
        const data = await res.json();
        // Print character by character response simulator
        appendLine(data.answer, "accent");
        playChime(true);
      } else {
        throw new Error();
      }
    } catch (err) {
      appendLine("AI SYNERGY TIMEOUT: Failed to query processor. Fact memory: BSc (Hons) CS with AI student at Softwarica College.", "error");
    }
  };

  // Quiz evaluation
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
      appendLine(`  Explanation: ${puzzle.explanation}`, "system");
      appendLine("==========================================================", "accent");
      appendLine("", "system", "save_score", { points: earned, diff: puzzle.difficulty });
    } else {
      playChime(false);
      appendLine("==========================================================", "accent");
      appendLine(`[FAILED] SYSTEM FLOPPED! TRIPPED COMPILATION ERROR.`, "error");
      appendLine(`  Explanation: ${puzzle.explanation}`, "system");
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
        appendLine(`Rating synchronized securely for operator: "${username.toUpperCase()}"`, "success");
        setHighScoreSaved(true);
        fetchLeaderboard();
      }
    } catch (e) {
      appendLine("Score synchronization failure. Storing index client-side.", "error");
    } finally {
      setSubmittingScore(false);
    }
  };

  // Fake download extraction simulation
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
          // Launch real github link!
          window.open(proj.repoUrl, "_blank", "noopener,noreferrer");
        }, 500);
      }
      setSimulatedExtractPct(currentPct);
    }, 150);
  };

  // Quick nav commands
  const handleQuickCommand = (cmd: string) => {
    handleCommandSubmit(cmd);
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-cyber-dark text-[#e0e6ed] flex flex-col font-mono relative selection:bg-cyber-green selection:text-black select-none md:select-text h-screen overflow-hidden">
      {/* Decorative scanning line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-cyber-green/5 shadow-[0_0_10px_#00ff66] pointer-events-none scanline-sweep z-50" />
      
      {/* HUD Header Bar */}
      <header className="bg-black/90 border-b border-cyber-green/15 px-4 py-2.5 flex flex-col md:flex-row justify-between items-center text-[11px] md:text-xs text-cyber-green shrink-0 z-10 space-y-2 md:space-y-0 select-none">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 glow-green font-bold">
            <TermIcon className="w-4.5 h-4.5 animate-pulse" />
            <span>Hkp terminal v1.2.9:~</span>
          </div>
          <span className="text-cyber-green/35">|</span>
          <div className="flex items-center space-x-2 text-cyber-green/75">
            <span className="text-[10px] bg-cyber-green/15 text-cyber-green px-1.5 py-0.5 rounded uppercase font-bold animate-pulse">SESSION: ACTIVE_USER_01</span>
            <span className="hidden md:inline">LOC: 27.7172° N, 85.3240° E</span>
          </div>
        </div>

        {/* Dynamic ticking time counter alive metric */}
        <div className="flex items-center space-x-4 py-1 flex-wrap justify-center text-cyber-blue glow-blue font-bold text-center">
          <div className="flex items-center space-x-1 border border-cyber-blue/30 px-2 py-0.5 rounded bg-cyber-blue/5">
            <Cpu className="w-3.5 h-3.5 animate-spin-slow" />
            <span className="text-[10px] md:text-xs">UPTIME: {uptimeDays}D:{uptimeParts.h.toString().padStart(2, "0")}:{uptimeParts.m.toString().padStart(2, "0")}:{uptimeParts.s.toString().padStart(2, "0")}</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <span className="text-cyber-green/40">SYS_LOAD:</span>
            <span className="w-12 bg-cyber-green/10 border border-cyber-green/30 h-2 rounded overflow-hidden inline-block relative">
              <span className="h-full bg-cyber-green absolute left-0 top-0 transition-all duration-500" style={{ width: `${systemLoad * 100}%` }} />
            </span>
            <span className="text-[10px] text-cyber-green/75">{(systemLoad * 100).toFixed(0)}%</span>
          </div>
          <span className="text-cyber-green/35">|</span>
          <button 
            onClick={() => setSoundEnabled(!soundEnabled)} 
            className="text-cyber-green/60 hover:text-cyber-green transition-colors cursor-pointer p-0.5"
            title="Toggle Audio Feedback"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Grid Workspace Container */}
      <div className="flex-grow flex flex-col md:grid md:grid-cols-12 md:gap-4 p-4 md:p-6 overflow-hidden min-h-0">
        
        {/* Left Column: Diagnostics & System Metrics (Visible on Desktop) */}
        <aside className="hidden md:flex md:col-span-3 flex-col gap-4 overflow-hidden h-full">
          {/* Diagnostics Logs panel */}
          <div className="border border-cyber-green/25 p-3.5 bg-black/80 flex-grow h-1/2 flex flex-col min-h-0 relative rounded shadow-[inset_0_0_15px_rgba(0,255,65,0.02)]">
            <div className="flex items-center justify-between border-b border-cyber-green/20 pb-2 mb-2">
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-blue animate-ping shrink-0" />
                <h3 className="text-[11px] font-bold text-cyber-blue tracking-wider uppercase">LIVE_DIAGNOSTICS</h3>
              </div>
              <button 
                onClick={() => {
                  playClickSound(800, 0.05);
                  const ts = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                  setDiagnosticsLogs(prev => [
                    ...prev, 
                    `[${ts}] [SYS] MANUAL_INTEGRITY_CHECK: 100% PASS`
                  ].slice(-20));
                }}
                className="text-[8px] bg-cyber-blue/10 border border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/20 hover:text-white px-1.5 py-0.5 rounded tracking-tighter uppercase transition-colors shrink-0 cursor-pointer"
                title="Trigger Manual Diagnostic Check"
              >
                PING_OS
              </button>
            </div>
            
            <div className="text-[9px] md:text-[10px] space-y-1.5 overflow-y-auto flex-grow scrollbar-thin select-text pr-1">
              {diagnosticsLogs.map((log, index) => {
                let colorClass = "text-slate-300";
                if (log.includes("[KERN]")) colorClass = "text-fuchsia-400 font-semibold";
                else if (log.includes("[YOLO]")) colorClass = "text-cyber-blue font-semibold";
                else if (log.includes("[DB]")) colorClass = "text-amber-400";
                else if (log.includes("[API]")) colorClass = "text-emerald-400 font-bold";
                else if (log.includes("[AI]")) colorClass = "text-indigo-300 font-semibold";
                else if (log.includes("SEC")) colorClass = "text-[#00FF41]";
                
                return (
                  <p key={index} className={`${colorClass} hover:bg-white/5 px-1 py-0.5 rounded transition-colors font-mono leading-tight select-none`}>
                    &gt; {log}
                  </p>
                );
              })}
              <p className="animate-pulse text-[#00FF41] mt-2 font-bold select-none">&gt; RUNNING_HEARTBEAT_READY...</p>
            </div>
          </div>

          {/* Stats Bar chart/progress panel */}
          <div className="border border-cyber-green/20 p-3 bg-black/40 h-1/2 flex flex-col justify-between shrink-0">
            <h3 className="text-[11px] font-bold border-b border-cyber-green/20 mb-2 pb-1 text-cyber-blue tracking-wider uppercase">CORE_STATS</h3>
            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-[9px] mb-1"><span>CPU</span><span>{(systemLoad * 100).toFixed(0)}%</span></div>
                <div className="w-full bg-[#00FF41]/10 h-1"><div className="bg-[#00FF41] h-full transition-all duration-300" style={{ width: `${systemLoad * 100}%` }}></div></div>
              </div>
              <div>
                <div className="flex justify-between text-[9px] mb-1"><span>MEM</span><span>1.2GB</span></div>
                <div className="w-full bg-[#00FF41]/10 h-1"><div className="bg-cyber-blue h-full w-[65%]"></div></div>
              </div>
              <div>
                <div className="flex justify-between text-[9px] mb-1"><span>LATENCY</span><span>14ms</span></div>
                <div className="w-full bg-[#00FF41]/10 h-1"><div className="bg-white h-full w-[12%]"></div></div>
              </div>
            </div>
          </div>
        </aside>

        {/* Center Column: Interactive Bash command shell widget */}
        <section className="col-span-12 md:col-span-6 flex flex-col border border-cyber-green/30 bg-black/60 shadow-[0_0_30px_rgba(0,255,65,0.05)] h-full overflow-hidden min-h-0 rounded">
          <div className="flex items-center justify-between px-3 py-1.5 bg-[#00FF41]/10 border-b border-cyber-green/30 shrink-0 select-none">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
            </div>
            <span className="text-[9px] uppercase tracking-tighter opacity-50 text-cyber-green">guest@hk-cloner:~# — active_stream_80x24</span>
          </div>

          {/* Terminal stream log */}
          <main className="flex-grow overflow-y-auto px-4 py-4 flex flex-col space-y-3.5 scrollbar-thin scroll-smooth min-h-0">
            {history.map((line) => {
              if (line.componentName) {
                // Render beautiful Interactive JSX custom templates
                return (
                  <div key={line.id} className="my-2 border-l-2 border-cyber-green/20 pl-4 py-1">
                    {/* 1. Profile me player sheet */}
                    {line.componentName === "me" && (
                      <div className="terminal-panel-blue rounded p-5 max-w-2xl text-xs md:text-sm text-cyber-blue leading-relaxed border border-cyber-blue/30 shadow-[0_0_20px_rgba(0,229,255,0.05)]">
                        <div className="flex flex-col sm:flex-row justify-between items-start border-b border-cyber-blue/25 pb-3 mb-4 space-y-3 sm:space-y-0">
                          <div>
                            <h2 className="text-xl font-bold uppercase glow-blue tracking-wider">HARIKRISHNA POKHREL</h2>
                            <p className="text-[11px] text-cyber-blue/60 uppercase tracking-widest mt-0.5">ALIAS: hk // SECURITY IDENT: CLASS_1</p>
                          </div>
                          <div className="bg-cyber-blue/15 px-3 py-1 border border-cyber-blue/30 rounded text-[11px] uppercase tracking-widest font-bold text-center self-stretch sm:self-auto">
                            STATUS: ACTIVE DEVELOPER
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-cyber-blue/50 uppercase text-[10px] tracking-widest mb-1 font-bold">Academic Dossier</p>
                            <p className="font-semibold text-slate-100">BSc (Hons) Computer Science with Artificial Intelligence</p>
                            <p className="text-xs text-cyber-blue/70">Softwarica College of IT & E-Commerce / Coventry University</p>
                          </div>
                          <div>
                            <p className="text-cyber-blue/50 uppercase text-[10px] tracking-widest mb-1 font-bold">Biological Grounding</p>
                            <p className="text-slate-100">Studying and deploying Neural Networks, Computer Vision models, and Enterprise Web Interfaces in Kathmandu, Nepal.</p>
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-cyber-blue/50 uppercase text-[10px] tracking-widest mb-1 font-bold">Research & Vision Node Focus</p>
                            <p className="text-slate-100 font-semibold">Convolutional Neural Networks, YOLOv3/v8 Core Detection Pipelines, MySQL DB Optimizations, & REST Web API Architecture.</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 2. Interactive Skills graph list */}
                    {line.componentName === "skills" && (
                      <div className="terminal-panel p-5 max-w-2xl rounded text-xs md:text-sm">
                        <h2 className="text-base font-bold uppercase tracking-wider text-cyber-green glow-green flex items-center space-x-2 border-b border-cyber-green/10 pb-2 mb-4">
                          <Layers className="w-4.5 h-4.5" />
                          <span>COGNITIVE PERFORMANCE READOUT MATRIX</span>
                        </h2>
                        <div className="space-y-3">
                          {[
                            { title: "Python Integration Network", val: 90, code: "PY_SYS_CORE" },
                            { title: "YOLO v3/v8 Vision Nodes", val: 86, code: "YOLO_VISION" },
                            { title: "Machine Learning (scikit/pytorch)", val: 80, code: "NEURAL_NET" },
                            { title: "MySQL / Relational Database Design", val: 82, code: "SQL_RELATIONAL" },
                            { title: "Flask / Backend Orchestrator", val: 85, code: "REST_ROUTER" },
                            { title: "Java Development Structure", val: 70, code: "SWING_JVM" },
                            { title: "React SPA & Modern Tailwind CSS", val: 82, code: "UI_RENDER_NODE" }
                          ].map((item, idx) => (
                            <div key={idx} className="space-y-1 select-none">
                              <div className="flex justify-between text-[11px] text-cyber-green/75">
                                <span className="font-bold">{item.title}</span>
                                <span className="font-mono text-[10px] bg-cyber-green/10 px-1 rounded uppercase">{item.code} // {item.val}%</span>
                              </div>
                              <div className="h-4 w-full bg-black/50 border border-cyber-green/20 rounded-sm relative overflow-hidden flex items-center px-1">
                                {/* Static filling bars */}
                                <div className="h-2 bg-gradient-to-r from-cyber-green/70 to-emerald-400/90 rounded-sm transition-all duration-1000" style={{ width: `${item.val}%` }} />
                                {/* Overlayed ascii ticks */}
                                <div className="absolute inset-x-0 bottom-0 text-[8px] text-cyber-green/10 flex justify-between select-none px-4">
                                  <span>|</span><span>|</span><span>|</span><span>|</span><span>|</span><span>|</span><span>|</span><span>|</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 3. Secure Projects register tree */}
                    {line.componentName === "projects" && (
                      <div className="terminal-panel p-5 max-w-3xl rounded text-xs leading-relaxed">
                        <p className="text-cyber-green/60 mb-2 uppercase tracking-wide">// SECURE DIRECTORY LISTING: ROOT/PROJECTS_VAULT</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                          {PROJECTS_REGISTRY.map((p) => (
                            <div 
                              key={p.id} 
                              onClick={() => handleQuickCommand(`/projects ${p.slug}`)}
                              className="p-3 bg-black/40 border border-cyber-green/15 hover:border-cyber-green/45 rounded transition-all duration-300 group cursor-pointer flex justify-between items-center"
                            >
                              <div>
                                <p className="font-bold text-cyber-blue group-hover:text-cyber-green transition-colors">{p.name}</p>
                                <p className="text-[10px] text-cyber-green/50 mt-0.5 tracking-wider font-mono">{p.stats}</p>
                              </div>
                              <span className="text-[10px] bg-cyber-green/10 px-2 py-0.5 rounded text-cyber-green font-bold uppercase tracking-widest">MOUNT</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 border-t border-cyber-green/10 pt-3 text-[11px] text-cyber-green/50">
                          Type <span className="text-cyber-green">/projects [project_slug]</span> to open dedicated code mounting terminal console windows natively.
                        </div>
                      </div>
                    )}

                    {/* 4. Project detail interactive browser */}
                    {line.componentName === "projects_detail" && line.componentProps?.project && (
                      <div className="terminal-panel-blue p-5 max-w-3xl rounded mt-1 select-text">
                        {(() => {
                          const proj: ProjectDef = line.componentProps.project;
                          const isMounted = mountedProject === proj.slug;
                          return (
                            <div className="space-y-4">
                              <div className="flex flex-col sm:flex-row justify-between items-start border-b border-cyber-blue/20 pb-3">
                                <div>
                                  <h3 className="text-lg font-bold text-cyber-blue glow-blue">{proj.name}</h3>
                                  <span className="text-[10px] bg-cyber-blue/15 text-cyber-blue/80 border border-cyber-blue/30 px-1.5 py-0.5 rounded uppercase mt-1 inline-block select-all">{proj.repoUrl}</span>
                                </div>
                                <div className="text-[11px] text-cyber-blue/60 mt-2 sm:mt-0 uppercase tracking-widest bg-black/40 px-2.5 py-1 border border-cyber-blue/15 rounded">
                                  INDEX: {proj.stats}
                                </div>
                              </div>

                              <p className="text-slate-200 text-xs md:text-sm">{proj.description}</p>

                              <div className="flex flex-wrap gap-1.5">
                                {proj.tech.map((t, i) => (
                                  <span key={i} className="text-[10px] bg-cyber-blue/10 text-cyber-blue px-2 py-0.5 border border-cyber-blue/25 rounded font-mono uppercase">{t}</span>
                                ))}
                              </div>

                              {/* Code console view mock representation */}
                              <div className="bg-black/95 rounded border border-cyber-blue/20 p-4 font-mono text-[11px] leading-relaxed relative overflow-hidden my-3">
                                <div className="absolute top-1 right-2 text-[8px] text-cyber-blue/40 font-mono select-none">CODE EXECUTIVE PARSER // EDITABLE</div>
                                <pre className="text-[#a6accd] overflow-x-auto whitespace-pre">{proj.simulationCode}</pre>
                              </div>

                              <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
                                <span className="text-[10px] text-cyber-blue/40 tracking-widest uppercase font-mono">FILE ENCRYPT: COMPILER COMPLIANT // RELIABLE</span>
                                
                                {simulatedExtractPct !== null && mountedProject === proj.slug ? (
                                  <div className="flex items-center space-x-3 text-cyber-blue font-bold text-xs select-none">
                                    <RefreshCw className="w-4 h-4 animate-spin text-cyber-blue" />
                                    <span>DOWNLOADING DIGITAL REPO: {simulatedExtractPct}%</span>
                                  </div>
                                ) : (
                                  <button 
                                    onClick={() => {
                                      setMountedProject(proj.slug);
                                      triggerDownloadSimulation(proj);
                                    }}
                                    className="px-5 py-2 bg-cyber-blue text-black hover:bg-white hover:text-cyber-blue transition-colors font-bold uppercase tracking-wider text-xs rounded cursor-pointer glow-blue"
                                  >
                                    EXTRACT SECURE SOURCE CODE
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    )}

                    {/* 5. Play coding minigame window console */}
                    {line.componentName === "play" && line.componentProps?.puzzle && (
                      <div className="terminal-panel p-5 max-w-3xl rounded select-text">
                        {(() => {
                          const p: PuzzleDef = line.componentProps.puzzle;
                          return (
                            <div className="space-y-4">
                              <div className="flex justify-between items-center border-b border-cyber-green/10 pb-2 flex-wrap gap-2">
                                <h3 className="text-base font-bold text-cyber-green glow-green uppercase flex items-center space-x-2">
                                  <Gamepad className="w-5 h-5 animate-pulse" />
                                  <span>PUZZLE IDENT: {p.title}</span>
                                </h3>
                                <span className="text-[10px] bg-cyber-green/10 border border-cyber-green/30 text-cyber-green px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                                  DIFFICULTY: {p.difficulty} // +{p.points} REP
                                </span>
                              </div>

                              <p className="text-slate-200 text-xs md:text-sm">{p.description}</p>

                              <div className="bg-black/95 border border-cyber-green/20 rounded p-4 font-mono text-xs text-emerald-100 overflow-x-auto">
                                <pre>{p.codeSnippet}</pre>
                              </div>

                              <p className="text-cyber-green/60 text-[11px] uppercase tracking-[0.15em]">// MULTIPLE CHOICE: SELECT THE CORRECT REPAIR SIGNATURE</p>

                              <div className="space-y-2 select-none">
                                {p.choices.map((choice, index) => {
                                  const charPrefix = String.fromCharCode(65 + index); // A, B, C, D
                                  return (
                                    <button
                                      key={index}
                                      onClick={() => handleQuizAnswer(p, index)}
                                      className="w-full text-left p-3 bg-black/40 border border-cyber-green/10 hover:border-cyber-green/40 hover:bg-cyber-green/5 text-slate-300 text-xs rounded transition-all duration-200 flex items-start space-x-3 cursor-pointer"
                                    >
                                      <span className="bg-cyber-green/15 text-cyber-green border border-cyber-green/30 w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">{charPrefix}</span>
                                      <span>{choice}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    )}

                    {/* 6. Score saver highscore rating portal */}
                    {line.componentName === "save_score" && line.componentProps?.points && (
                      <div className="terminal-panel p-5 max-w-xl rounded flex flex-col space-y-3">
                        <p className="font-bold text-cyber-green text-sm glow-green uppercase">RECORD COGNITIVE SCORE TO GLOBAL LEADERBOARD</p>
                        <p className="text-[11px] text-cyber-green/70">
                          Your response compiled with flying colors. Secure points: <strong>{line.componentProps.points} Reputation</strong> under mode <strong>{line.componentProps.diff}</strong>.
                        </p>
                        {!highScoreSaved ? (
                          <div className="flex space-x-2 items-center">
                            <input
                              id="score-username-input"
                              type="text"
                              maxLength={15}
                              placeholder="ENTER SECURITY HANDLE (E.G. NEON_RIDER)"
                              className="bg-black border border-cyber-green/35 text-cyber-green font-mono text-xs px-3 py-2 rounded focus:outline-none focus:border-cyber-green flex-grow tracking-widest placeholder:text-cyber-green/20 uppercase"
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  const input = e.currentTarget.value;
                                  handleScoreSubmission(input, line.componentProps.points, line.componentProps.diff);
                                }
                              }}
                            />
                            <button
                              onClick={(e) => {
                                const inputEl = document.getElementById("score-username-input") as HTMLInputElement;
                                if (inputEl) {
                                  handleScoreSubmission(inputEl.value, line.componentProps.points, line.componentProps.diff);
                                }
                              }}
                              disabled={submittingScore}
                              className="px-4 py-2 bg-cyber-green text-black font-bold uppercase tracking-wider text-xs rounded hover:bg-white hover:text-cyber-green cursor-pointer disabled:opacity-50"
                            >
                              {submittingScore ? "SAVING..." : "COMMIT"}
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2 text-cyber-green text-xs font-bold bg-cyber-green/10 p-2.5 rounded border border-cyber-green/25">
                            <CheckCircle2 className="w-5.5 h-5.5" />
                            <span>SCORE SUCCESSFULLY SYNCED INTO BACKEND LEDGER DATABASE. CHEERS!</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* 7. Theme Customizer */}
                    {line.componentName === "theme" && (
                      <div className="terminal-panel p-5 max-w-2xl rounded text-xs select-none border border-cyber-yellow/30 bg-black/90 shadow-[0_0_20px_rgba(255,234,0,0.1)]">
                        <div className="flex items-center justify-between border-b border-cyber-yellow/20 pb-3 mb-4">
                          <h2 className="text-sm md:text-base font-bold text-cyber-yellow tracking-widest glow-yellow uppercase flex items-center space-x-2">
                            <Sparkles className="w-5 h-5 animate-pulse" />
                            <span>VISUAL CONFIGURATION MATRIX</span>
                          </h2>
                        </div>
                        
                        <div className="space-y-5">
                          <div>
                            <p className="text-[10px] text-cyber-yellow/60 uppercase tracking-widest mb-2 font-bold">OPERATIONAL COLOR THEME DECK</p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              {[
                                { id: "matrix", name: "MATRIX GREEN", bg: "bg-green-500/20", border: "border-green-500/50", text: "text-green-400" },
                                { id: "amber", name: "AMBER FALLOUT", bg: "bg-amber-500/20", border: "border-amber-500/50", text: "text-amber-400" },
                                { id: "blue", name: "SUB-ZERO BLUE", bg: "bg-cyan-500/20", border: "border-cyan-500/50", text: "text-cyan-400" },
                                { id: "neon", name: "NEON VAPOR", bg: "bg-fuchsia-500/20", border: "border-fuchsia-500/50", text: "text-fuchsia-400" },
                              ].map((t) => (
                                <button
                                  key={t.id}
                                  onClick={() => { playClickSound(800, 0.05); setTheme(t.id); }}
                                  className={`p-3 border rounded text-center flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${theme === t.id ? t.bg + " " + t.border + " " + t.text + " shadow-[0_0_15px_currentColor]" : "bg-black/50 border-white/10 text-slate-400 hover:border-white/30"}`}
                                >
                                  <div className={`w-4 h-4 rounded-full ${t.bg} border ${t.border}`}></div>
                                  <span className="text-[9px] font-bold tracking-wider uppercase">{t.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          <div className="pt-2 border-t border-cyber-yellow/10">
                            <p className="text-[10px] text-cyber-yellow/60 uppercase tracking-widest mb-3 font-bold">ANALOG HARDWARE EMULATION</p>
                            <div className="flex items-center justify-between bg-black/60 border border-white/10 p-3 rounded">
                              <div>
                                <p className="text-xs font-bold text-slate-300">CRT Monitor Artifacts & Scanlines</p>
                                <p className="text-[9px] text-slate-500 mt-1">Simulates electromagnetic rendering distortion.</p>
                              </div>
                              <button 
                                onClick={() => { playClickSound(500, 0.05); setCrtEnabled(!crtEnabled); }}
                                className={`px-4 py-1.5 rounded font-bold text-[10px] tracking-wider uppercase transition-all cursor-pointer border ${crtEnabled ? "bg-cyber-yellow/20 border-cyber-yellow/50 text-cyber-yellow" : "bg-black border-slate-600 text-slate-500"}`}
                              >
                                {crtEnabled ? "ENABLED" : "BYPASSED"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 8. Leaderboard table results */}
                    {line.componentName === "leaderboard" && (
                      <div className="terminal-panel p-5 max-w-3xl rounded text-xs select-text border border-cyber-blue/30 bg-black/90 shadow-[0_0_25px_rgba(0,186,255,0.1)]">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyber-blue/20 pb-3 mb-4">
                          <h2 className="text-sm md:text-base font-bold text-cyber-blue tracking-widest glow-blue uppercase flex items-center space-x-2">
                            <Award className="w-5 h-5 animate-pulse" />
                            <span>COGNITIVE RATING LEDGER // SECURE NETWORK</span>
                          </h2>
                          <span className="text-[9px] bg-cyber-blue/15 border border-cyber-blue/30 text-cyber-blue px-2.5 py-0.5 rounded font-mono uppercase">
                            PERSISTED SCHEMA: sqlite3_json
                          </span>
                        </div>

                        {/* Search Operative and Refresh Bar */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4 bg-cyber-blue/5 border border-cyber-blue/15 p-2 rounded">
                          <div className="relative flex-grow">
                            <input 
                              type="text" 
                              placeholder="SEARCH OPERATIVE SECURITY HANDLE..." 
                              value={leaderboardSearch}
                              onChange={(e) => {
                                playClickSound(500, 0.01);
                                setLeaderboardSearch(e.target.value);
                              }}
                              className="w-full bg-black border border-cyber-blue/25 text-cyber-blue placeholder:text-cyber-blue/20 text-[10px] md:text-xs font-mono px-3 py-1.5 focus:outline-none focus:border-cyber-blue rounded uppercase tracking-wider"
                            />
                            {leaderboardSearch && (
                              <button 
                                onClick={() => setLeaderboardSearch("")}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-cyber-blue/40 hover:text-white cursor-pointer hover:underline text-[9px]"
                              >
                                CLEAR
                              </button>
                            )}
                          </div>
                          <button 
                            onClick={async () => {
                              playClickSound(800, 0.05);
                              await fetchLeaderboard();
                            }}
                            className="px-3.5 py-1.5 bg-cyber-blue/10 border border-cyber-blue/30 hover:bg-cyber-blue hover:text-black transition-all text-cyber-blue text-[10px] rounded flex items-center justify-center gap-1.5 cursor-pointer uppercase font-bold shrink-0 shadow-[0_0_10px_rgba(0,229,255,0.05)]"
                          >
                            <RefreshCw className={`w-3.5 h-3.5 ${loadingLeaders ? 'animate-spin' : ''}`} />
                            <span>Sync Ledger</span>
                          </button>
                        </div>

                        {loadingLeaders ? (
                          <div className="flex flex-col items-center justify-center py-10 space-y-3">
                            <RefreshCw className="w-8 h-8 animate-spin text-cyber-blue" />
                            <span className="text-cyber-blue/50 tracking-widest text-[10px] uppercase font-mono">INTERROGATING SECURITY DATABASE LEDGER...</span>
                          </div>
                        ) : (
                          <div className="overflow-x-auto select-all">
                            <table className="w-full text-left font-mono">
                              <thead>
                                <tr className="border-b border-cyber-blue/20 text-cyber-blue/55 uppercase text-[9px] md:text-[10px] tracking-wider">
                                  <th className="py-2.5 pl-2">RANK</th>
                                  <th>OPERATOR IDENTITY</th>
                                  <th>RATING score</th>
                                  <th>SECURITY LEVEL</th>
                                  <th>MODE</th>
                                  <th className="pr-2">TIMESTAMP</th>
                                </tr>
                              </thead>
                              <tbody>
                                {(() => {
                                  const filtered = leaders.filter(entry => 
                                    entry.username.toLowerCase().includes(leaderboardSearch.toLowerCase())
                                  );
                                  if (filtered.length === 0) {
                                    return (
                                      <tr>
                                        <td colSpan={6} className="py-8 text-center text-cyber-blue/30 uppercase text-[10px]">
                                          {leaderboardSearch ? "NO MATCHING OPERATIVES CACHED" : "NO PERSISTED LEDGER RECORDS RECORDED"}
                                        </td>
                                      </tr>
                                    );
                                  }
                                  return filtered.map((entry, idx) => {
                                    const scoreVal = Number(entry.score) || 0;
                                    let clearanceLevel = "USER_GUEST";
                                    let badgeColor = "border-slate-500/20 text-slate-400";
                                    
                                    if (scoreVal >= 900) {
                                      clearanceLevel = "SEC_OVERLORD";
                                      badgeColor = "text-fuchsia-400 border-fuchsia-500/30 bg-fuchsia-500/10 shadow-[0_0_10px_rgba(217,70,239,0.15)]";
                                    } else if (scoreVal >= 700) {
                                      clearanceLevel = "ELITE_DECRYPT";
                                      badgeColor = "text-cyber-blue border-cyber-blue/30 bg-cyber-blue/10 shadow-[0_0_10px_rgba(6,182,212,0.15)]";
                                    } else if (scoreVal >= 500) {
                                      clearanceLevel = "CYPHER_CRACKER";
                                      badgeColor = "text-amber-400 border-amber-500/30 bg-amber-500/10";
                                    }

                                    // Custom visual rank accents
                                    let rankTag = (idx + 1).toString().padStart(2, "0");
                                    let rankBg = "bg-white/5";
                                    if (idx === 0) {
                                      rankTag = "🥇 01";
                                      rankBg = "bg-yellow-500/10 text-yellow-300 font-bold border border-yellow-500/30";
                                    } else if (idx === 1) {
                                      rankTag = "🥈 02";
                                      rankBg = "bg-slate-300/10 text-slate-100 font-bold border border-slate-300/30";
                                    } else if (idx === 2) {
                                      rankTag = "🥉 03";
                                      rankBg = "bg-amber-600/10 text-amber-300 font-bold border border-amber-600/20";
                                    }

                                    return (
                                      <tr 
                                        key={entry.id} 
                                        className={`border-b border-cyber-blue/5 hover:bg-cyber-blue/5 transition-colors group ${
                                          entry.username.toLowerCase() === "ada_lov" || entry.username.toLowerCase() === "babbage_ghost" ? "bg-cyan-500/5 text-cyber-blue" : "text-slate-300"
                                        }`}
                                      >
                                        <td className="py-3 pl-2">
                                          <span className={`px-2 py-0.5 rounded text-[9px] ${rankBg}`}>
                                            {rankTag}
                                          </span>
                                        </td>
                                        <td className="font-bold tracking-widest text-slate-100 uppercase select-all">
                                          {entry.username}
                                        </td>
                                        <td className="font-bold text-cyber-blue group-hover:text-cyber-green transition-colors text-xs md:text-sm select-all">
                                          {scoreVal} REP
                                        </td>
                                        <td>
                                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${badgeColor} select-none`}>
                                            {clearanceLevel}
                                          </span>
                                        </td>
                                        <td className="text-[10px] uppercase font-semibold text-slate-400">
                                          {entry.difficulty}
                                        </td>
                                        <td className="text-[10px] text-slate-500 pr-2">
                                          {entry.date}
                                        </td>
                                      </tr>
                                    );
                                  });
                                })()}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              }

              // Otherwise render classic retro stdout terminal typography
              let colorClass = "text-[#c0cddb]";
              if (line.type === "success") colorClass = "text-cyber-green font-semibold";
              if (line.type === "error") colorClass = "text-cyber-red font-bold";
              if (line.type === "accent") colorClass = "text-cyber-blue font-semibold";
              if (line.type === "user") colorClass = "text-cyber-yellow";

              return (
                <div key={line.id} className={`${colorClass} leading-relaxed break-words text-xs md:text-sm whitespace-pre-wrap select-text font-mono`}>
                  {line.text}
                </div>
              );
            })}

            <div ref={terminalBottomRef} />
          </main>

          {/* Prompt input field footer nested directly under output container */}
          <footer className="p-4 bg-black border-t border-cyber-green/15 shrink-0 select-none">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleCommandSubmit(inputVal);
              }}
              className="flex items-center space-x-3 w-full"
            >
              <div className="text-cyber-green font-extrabold text-xs md:text-sm flex items-center space-x-1 select-none shrink-0">
                <span className="text-emerald-500 animate-pulse">●</span>
                <span className="font-mono">guest@hk-cloner:~#</span>
              </div>
              
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                  playClickSound(400, 0.012);
                }}
                placeholder={
                  contactState === "name" ? "ENTER YOUR DIGITAL USERNAME HANDLE..." :
                  contactState === "email" ? "ENTER EMAIL (E.G. COMMUNICATOR@DOMAIN)..." :
                  contactState === "msg" ? "TYPE EMAIL TRANSMISSION DESCP Payload..." :
                  "TYPE COMMAND (e.g., /me, /skills, /projects, /play, /ask what is yolov3)..."
                }
                className="flex-grow bg-transparent text-cyber-green border-none focus:outline-none focus:ring-0 font-mono text-xs md:text-sm tracking-wider select-all placeholder:text-cyber-green/20 uppercase"
                autoFocus
              />
              
              <button 
                type="submit" 
                className="text-cyber-green hover:text-white transition-colors p-1"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </form>
          </footer>
        </section>

        {/* Right Column: Secure Communication links & Leaderboard (Visible on Desktop) */}
        <aside className="hidden md:flex md:col-span-3 flex-col gap-4 overflow-hidden h-full">
          {/* Secure channels packet relay */}
          <div className="border border-cyber-green/20 p-4 bg-black/40 flex flex-col shrink-0 select-text">
            <h3 className="text-[11px] font-bold border-b border-cyber-green/20 mb-3 pb-1 text-cyber-blue tracking-wider uppercase">SECURE_CHANNEL</h3>
            <p className="text-[9px] mb-4 opacity-70">Establish a secure channel. Maintain a relation and enlarge your connection.</p>
            <div className="space-y-4 text-[11px]">
              <div className="group">
                <div className="text-[9px] opacity-40 uppercase">GITHUB</div>
                <a href="https://github.com/HAliveKP" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors block text-cyber-blue font-bold">/HAliveKP</a>
              </div>
              <div className="group">
                <div className="text-[9px] opacity-40 uppercase">LinkedIn</div>
                <a href="https://linkedin.com/in/harikrishna-pokhrel-59a68a25a" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors block text-cyber-blue font-bold">Harikrishna Pokhrel</a>
              </div>
              <div className="group">
                <div className="text-[9px] opacity-40 uppercase">GMAIL</div>
                <a href="mailto:hpokhrel794@gmail.com" className="hover:text-white truncate block text-[11px] text-cyber-green font-mono hover:underline">hpokhrel794@gmail.com</a>
              </div>
            </div>
          </div>

           {/* Quick Stats table / Rating leaderboard preview */}
          <div className="border border-cyber-green/25 p-4 bg-black/80 flex-grow flex flex-col min-h-0 select-text rounded shadow-[inset_0_0_15px_rgba(0,186,255,0.02)]">
            <div className="flex items-center justify-between border-b border-cyber-green/20 mb-3 pb-1.5">
              <h3 className="text-[11px] font-bold text-cyber-blue tracking-wider uppercase flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-cyber-blue animate-pulse" />
                <span>TOP OPERATORS</span>
              </h3>
              <span className="text-[8px] bg-cyber-blue/15 text-cyber-blue px-1.5 py-0.2 rounded font-mono font-bold uppercase select-none">
                LIVE_FEED
              </span>
            </div>

            <div className="space-y-2.5 text-[10px] overflow-y-auto flex-grow scrollbar-thin pr-1">
              {leaders.slice(0, 7).map((entry, idx) => {
                const scoreVal = Number(entry.score) || 0;
                let badgeSymbol = `${idx + 1}.`;
                let entryGlow = "hover:bg-white/5";
                
                if (idx === 0) {
                  badgeSymbol = "🥇";
                  entryGlow = "bg-yellow-500/5 border-l border-yellow-500/20";
                } else if (idx === 1) {
                  badgeSymbol = "🥈";
                  entryGlow = "bg-slate-300/5 border-l border-slate-300/20";
                } else if (idx === 2) {
                  badgeSymbol = "🥉";
                  entryGlow = "bg-amber-600/5 border-l border-amber-600/20";
                }

                let clTag = "GUEST";
                let clColor = "text-slate-500";
                if (scoreVal >= 900) { clTag = "OVRLD"; clColor = "text-fuchsia-400"; }
                else if (scoreVal >= 700) { clTag = "ELITE"; clColor = "text-cyber-blue"; }
                else if (scoreVal >= 500) { clTag = "CRYPH"; clColor = "text-amber-400"; }

                return (
                  <div 
                    key={entry.id || idx} 
                    className={`flex items-center justify-between border-b border-white/5 pb-1.5 font-mono text-[10px] px-1.5 py-1 rounded transition-all duration-200 ${entryGlow}`}
                  >
                    <div className="flex items-center space-x-2 truncate max-w-[140px]">
                      <span className="text-xs shrink-0 select-none">{badgeSymbol}</span>
                      <div className="truncate">
                        <p className="text-slate-200 font-bold truncate tracking-wide uppercase select-all">{entry.username}</p>
                        <p className="text-[8px] text-slate-500 tracking-tighter uppercase font-mono">{entry.difficulty}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-cyber-blue font-bold tracking-tight select-all">{scoreVal} pts</p>
                      <p className={`text-[7px] font-bold tracking-widest uppercase ${clColor} select-none`}>[{clTag}]</p>
                    </div>
                  </div>
                );
              })}
              {leaders.length === 0 && (
                <div className="text-[9px] opacity-40 uppercase py-6 text-center">No ledger values synchronized.</div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-4 pt-1">
              <button 
                onClick={() => handleQuickCommand("/play")}
                className="w-full py-1.5 bg-cyber-green/10 border border-cyber-green/30 text-[9px] hover:bg-cyber-green/20 transition-all uppercase tracking-wider text-cyber-green font-bold cursor-pointer text-center rounded-sm"
              >
                Launch Game
              </button>
              <button 
                onClick={() => handleQuickCommand("/leaderboard")}
                className="w-full py-1.5 bg-cyber-blue/10 border border-cyber-blue/30 text-[9px] hover:bg-cyber-blue/20 transition-all uppercase tracking-wider text-cyber-blue font-bold cursor-pointer text-center rounded-sm"
              >
                View Ledger
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Suggests actions & command links below screen for Premium UX */}
      <section className="bg-black/40 border-t border-cyber-green/10 px-4 py-2 flex flex-wrap gap-2 items-center text-[10px] select-none shrink-0 border-b border-cyber-green/10">
        <span className="text-cyber-green/40 uppercase tracking-widest font-bold">QUICK_RUN:</span>
        <button onClick={() => handleQuickCommand("/me")} className="px-2.5 py-1 bg-cyber-blue/10 hover:bg-cyber-blue/20 border border-cyber-blue/30 text-cyber-blue rounded text-[10px] font-bold uppercase transition-transform hover:-translate-y-0.5 cursor-pointer flex items-center space-x-1">
          <User className="w-3.5 h-3.5" />
          <span>ABOUT PROFILE</span>
        </button>
        <button onClick={() => handleQuickCommand("/skills")} className="px-2.5 py-1 bg-cyber-green/10 hover:bg-cyber-green/20 border border-cyber-green/30 text-cyber-green rounded text-[10px] font-bold uppercase transition-transform hover:-translate-y-0.5 cursor-pointer flex items-center space-x-1">
          <Layers className="w-3.5 h-3.5" />
          <span>SKILLS MATRIX</span>
        </button>
        <button onClick={() => handleQuickCommand("/projects")} className="px-2.5 py-1 bg-cyber-blue/10 hover:bg-cyber-blue/20 border border-cyber-blue/30 text-cyber-blue rounded text-[10px] font-bold uppercase transition-transform hover:-translate-y-0.5 cursor-pointer flex items-center space-x-1">
          <FolderGit className="w-3.5 h-3.5" />
          <span>PROJECTS VAULT</span>
        </button>
        <button onClick={() => handleQuickCommand("/play")} className="px-2.5 py-1 bg-cyber-green/10 hover:bg-cyber-green/20 border border-cyber-green/30 text-cyber-green rounded text-[10px] font-bold uppercase transition-transform hover:-translate-y-0.5 cursor-pointer flex items-center space-x-1">
          <Gamepad className="w-3.5 h-3.5" />
          <span>PLAY PUZZLE</span>
        </button>
        <button onClick={() => handleQuickCommand("/leaderboard")} className="px-2.5 py-1 bg-cyber-blue/10 hover:bg-cyber-blue/20 border border-cyber-blue/30 text-cyber-blue rounded text-[10px] font-bold uppercase transition-transform hover:-translate-y-0.5 cursor-pointer flex items-center space-x-1">
          <Award className="w-3.5 h-3.5" />
          <span>LEADERBOARD</span>
        </button>
        <button onClick={() => handleQuickCommand("/contact")} className="px-2.5 py-1 bg-cyber-green/10 hover:bg-cyber-green/20 border border-cyber-green/30 text-cyber-green rounded text-[10px] font-bold uppercase transition-transform hover:-translate-y-0.5 cursor-pointer flex items-center space-x-1">
          <Send className="w-3.5 h-3.5" />
          <span>SECURE SEND</span>
        </button>
        <button onClick={() => handleQuickCommand("/clear")} className="px-2.5 py-1 bg-cyber-red/10 hover:bg-cyber-red/20 border border-cyber-red/30 text-cyber-red rounded text-[10px] font-bold uppercase transition-transform hover:-translate-y-0.5 cursor-pointer flex items-center space-x-1">
          <Trash2 className="w-3.5 h-3.5" />
          <span>CLEAR SCREEN</span>
        </button>
      </section>

      {/* Footer Status Bar */}
      <footer className="mt-auto flex justify-between items-center text-[10px] border-t border-cyber-green/20 pt-2 px-4 py-2 bg-black shrink-0 text-cyber-green/60 font-mono select-none">
        <div className="flex gap-4">
          <span className="bg-[#00FF41] text-black px-1.5 font-bold uppercase tracking-wider text-[9px] animate-pulse">PROMPT READY</span>
          <span className="opacity-50 italic hidden md:inline">Type '/help' for system commands list</span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="opacity-50 uppercase text-[9px]">Encrypted Transmission:</span>
          <span className="text-cyber-blue font-bold text-[9px]">AES-256-GCM</span>
        </div>
      </footer>
    </div>
  );
}
