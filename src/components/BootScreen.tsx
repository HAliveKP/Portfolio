import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Cpu, Shield, Wifi } from "lucide-react";

interface BootScreenProps {
  onBootComplete: () => void;
}

const BOOT_LOGS = [
  "INITIALIZING COGNITIVE INTERFACE SYSTEM MATRIX...",
  "MOUNTING GITHUB REPOSITORY INDEX (github.com/HAliveKP)... OK",
  "LINKING DISCORD AGENT HANDLER (HERMES ADMIN BOT)... OK",
  "CALIBRATING CARBON TELEMETRY MODULE (GREEN COMPASS)... OK",
  "SYNCING SKILLS LEDGER (CREDISKILL NEPAL PLATFORM)... OK",
  "SPAWNING RESEARCH ORCHESTRATOR AGENTS (CAPSTONE)... READY",
  "GEMINI-2.5-FLASH PROCESSOR SYNERGY STACK... CONNECTED",
  "SECURE SOCKET CONNECTION BINDING AT HOST 0.0.0.0:3000... ESTABLISHED",
  "LOADING CRYPTO REPUTATION ALGORITHMIC CHALLENGES... READY",
  "OS SYSTEM LEVEL: HK RETRO-FUTURE PORTFOLIO TERMINAL SECURE LINK v1.0.0"
];

const SKIP_FLAG = "hk-terminal-skip-boot";

export default function BootScreen({ onBootComplete }: BootScreenProps) {
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [bootProgress, setBootProgress] = useState(0);
  const [isBooted, setIsBooted] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  // Return visitors who already saw the boot sequence go straight through.
  useEffect(() => {
    try {
      if (localStorage.getItem(SKIP_FLAG) === "1") {
        onBootComplete();
      }
    } catch (e) {
      /* storage unavailable — ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Single soft beep per completed line (was: beep every 3 characters).
  const playBeep = (freq: number, duration: number) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.008, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  };

  const playStartupSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = audioCtx.currentTime;
      const notes = [261.63, 329.63, 392.0, 523.25];
      notes.forEach((note, index) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(note, now + index * 0.1);
        gain.gain.setValueAtTime(0.015, now + index * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.00001, now + index * 0.1 + 0.3);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + index * 0.1);
        osc.stop(now + index * 0.1 + 0.35);
      });
    } catch (e) {}
  };

  // Typewriter effect logic
  useEffect(() => {
    if (currentLineIndex < BOOT_LOGS.length) {
      const currentFullLine = BOOT_LOGS[currentLineIndex];
      if (currentCharIndex < currentFullLine.length) {
        const timer = setTimeout(() => {
          setCurrentCharIndex((prev) => prev + 1);
        }, 18);
        return () => clearTimeout(timer);
      } else {
        playBeep(440 + currentLineIndex * 20, 0.05);
        const timer = setTimeout(() => {
          setDisplayedLogs((prev) => [...prev, currentFullLine]);
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, 90);
        return () => clearTimeout(timer);
      }
    } else {
      setIsBooted(true);
    }
  }, [currentLineIndex, currentCharIndex]);

  // Progress bar logic
  useEffect(() => {
    const timer = setInterval(() => {
      setBootProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 6;
      });
    }, 150);
    return () => clearInterval(timer);
  }, []);

  const handleStart = () => {
    playStartupSound();
    setIsGlitching(true);
    exitBoot(() => {
      try {
        localStorage.setItem(SKIP_FLAG, "1");
      } catch (e) {}
      onBootComplete();
    });
  };

  const [exiting, setExiting] = useState(false);

  const exitBoot = (cb: () => void) => {
    // Dissolve exit: 65-75% of the entrance duration (motion-design rule).
    setExiting(true);
    window.setTimeout(cb, 220);
  };

  const handleSkip = () => {
    try {
      localStorage.setItem(SKIP_FLAG, "1");
    } catch (e) {}
    exitBoot(onBootComplete);
  };

  const renderProgressBar = () => {
    const totalBlocks = 20;
    const filledBlocks = Math.floor((bootProgress / 100) * totalBlocks);
    return "█".repeat(filledBlocks) + "░".repeat(totalBlocks - filledBlocks);
  };

  return (
    <div
      className={`min-h-screen bg-[#080b0f] relative flex items-center justify-center p-4 overflow-hidden transition-all duration-200 ease-out ${
        isGlitching ? "animate-glitch" : ""
      } ${exiting ? "opacity-0 scale-[0.985]" : ""}`}
    >
      <div className="noise-overlay" />

      {/* SKIP is available from the very first frame */}
      <button
        onClick={handleSkip}
        className="absolute top-4 right-4 z-20 font-terminal text-[10px] tracking-widest uppercase text-cyber-cyan/50 hover:text-cyber-cyan border border-cyber-cyan/20 hover:border-cyber-cyan/60 px-3 py-1.5 rounded transition-colors cursor-pointer"
        aria-label="Skip boot sequence"
      >
        SKIP &gt;&gt;
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-3xl data-panel p-8 min-h-[500px] flex flex-col justify-between z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="flex justify-between items-start mb-6"
        >
          <div className="text-[10px] font-terminal text-cyber-cyan/40">
            HK_OS_V1.0.0 // SYSTEM_BOOT
          </div>
          <div className="flex space-x-2 text-cyber-cyan/40">
            <Shield className="w-4 h-4 animate-pulse" />
            <Wifi className="w-4 h-4" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-flex items-center space-x-2 bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30 px-3 py-1 rounded-full text-[10px] font-display tracking-widest mb-4"
          >
            <Cpu className="w-3 h-3 animate-spin" />
            <span>NEURAL CORE ACTIVE</span>
          </motion.div>
          <h1 className="text-4xl md:text-6xl mb-2 font-display">HK_TERMINAL</h1>
          <p className="text-[10px] text-cyber-cyan/60 uppercase tracking-[0.3em] font-body">
            Neon-Phosphor Noir Interface
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.34, ease: [0.4, 0, 0.2, 1] }}
          className="bg-black/60 border border-cyber-cyan/10 p-4 font-terminal text-xs text-cyber-green/80 flex-grow mb-6 overflow-y-auto max-h-[200px] scrollbar-thin"
        >
          <div className="space-y-1">
            {displayedLogs.map((log, i) => (
              <div key={i} className="flex items-start">
                <span className="text-cyber-cyan/40 mr-2">[{i.toString().padStart(2, "0")}]</span>
                <span>{log}</span>
              </div>
            ))}
            {currentLineIndex < BOOT_LOGS.length && (
              <div className="flex items-start">
                <span className="text-cyber-cyan/40 mr-2">[{currentLineIndex.toString().padStart(2, "0")}]</span>
                <span>
                  {BOOT_LOGS[currentLineIndex].substring(0, currentCharIndex)}
                  <span className="animate-pulse">_</span>
                </span>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.46, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col items-center"
        >
          <div className="w-full max-w-md mb-6">
            <div className="flex justify-between text-[10px] font-terminal text-cyber-cyan/60 mb-2">
              <span>SYSTEM_LOAD</span>
              <span>{bootProgress}%</span>
            </div>
            <div className="font-terminal text-cyber-cyan tracking-widest text-lg md:text-xl text-center">
              [{renderProgressBar()}]
            </div>
          </div>

          <AnimatePresence>
            {isBooted && bootProgress === 100 ? (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleStart}
                className="btn-primary group"
              >
                <div className="btn-primary-accent" />
                <Terminal className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                <span>EXECUTE CORE_CONNECTION</span>
              </motion.button>
            ) : (
              <div className="text-[10px] font-terminal text-cyber-cyan/40 animate-pulse uppercase tracking-widest">
                Waiting for system calibration... (or hit SKIP)
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
