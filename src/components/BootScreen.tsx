import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Cpu, Shield, Wifi } from "lucide-react";

interface BootScreenProps {
  onBootComplete: () => void;
}

const BOOT_LOGS = [
  "INITIALIZING COGNITIVE INTERFACE SYSTEM MATRIX...",
  "DETECTATIVE ARCHITECTURE: INTEL(R) CORE(TM) NEURAL EXTRAPOLATION_V3",
  "CHECKING VIRTUAL SOCKET INGRESS ENVELOPES... STABLE",
  "MAPPING COMPUTER VISION REPOSITORIES (YOLO GRAPHICS ADAPTER)... OK",
  "CALCULATING ECO-ACCOUNTING COEFFICIENTS (GREEN COMPASS CORE v1.2)... LOADED",
  "SEEKING COMMUNITY SKILLS BARTER DIRECTORIES (SAHAYOGI STORAGE)... INITIALIZED",
  "SECURE SOCKET CONNECTION BINDING AT HOST 0.0.0.0:3000... ESTABLISHED",
  "AISTUDIO GEMINI-3.5-FLASH PROCESSOR SYNERGY STACK... CONNECTED",
  "PRE-PARSING CRYPTO REPUTATION ALGORITHMIC CHALLENGES... READY",
  "OS SYSTEM LEVEL: HK RETRO-FUTURE PORTFOLIO TERMINAL SECURE LINK v1.0.0"
];

export default function BootScreen({ onBootComplete }: BootScreenProps) {
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [bootProgress, setBootProgress] = useState(0);
  const [isBooted, setIsBooted] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  // Sound generator
  const playBeep = (freq: number, duration: number, type: OscillatorType = "sine") => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
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
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
      notes.forEach((note, index) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(note, now + index * 0.1);
        gain.gain.setValueAtTime(0.02, now + index * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.00001, now + index * 0.1 + 0.4);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + index * 0.1);
        osc.stop(now + index * 0.1 + 0.5);
      });
    } catch (e) {}
  };

  // Typewriter effect logic
  useEffect(() => {
    if (currentLineIndex < BOOT_LOGS.length) {
      const currentFullLine = BOOT_LOGS[currentLineIndex];
      if (currentCharIndex < currentFullLine.length) {
        const timer = setTimeout(() => {
          setCurrentCharIndex(prev => prev + 1);
          if (currentCharIndex % 3 === 0) playBeep(440 + currentLineIndex * 20, 0.05);
        }, 18);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setDisplayedLogs(prev => [...prev, currentFullLine]);
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }, 80);
        return () => clearTimeout(timer);
      }
    } else {
      setIsBooted(true);
    }
  }, [currentLineIndex, currentCharIndex]);

  // Progress bar logic
  useEffect(() => {
    const timer = setInterval(() => {
      setBootProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const handleStart = () => {
    playStartupSound();
    setIsGlitching(true);
    setTimeout(() => {
      onBootComplete();
    }, 400);
  };

  const renderProgressBar = () => {
    const totalBlocks = 20;
    const filledBlocks = Math.floor((bootProgress / 100) * totalBlocks);
    return "█".repeat(filledBlocks) + "░".repeat(totalBlocks - filledBlocks);
  };

  return (
    <div className={`min-h-screen bg-[#080b0f] relative flex items-center justify-center p-4 overflow-hidden ${isGlitching ? 'animate-glitch' : ''}`}>
      <div className="noise-overlay" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-3xl data-panel p-8 min-h-[500px] flex flex-col justify-between z-10"
      >
        <div className="flex justify-between items-start mb-6">
          <div className="text-[10px] font-terminal text-cyber-cyan/40">
            HK_OS_V1.0.0 // SYSTEM_BOOT
          </div>
          <div className="flex space-x-2 text-cyber-cyan/40">
            <Shield className="w-4 h-4 animate-pulse" />
            <Wifi className="w-4 h-4" />
          </div>
        </div>

        <div className="text-center mb-8">
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
        </div>

        <div className="bg-black/60 border border-cyber-cyan/10 p-4 font-terminal text-xs text-cyber-green/80 flex-grow mb-6 overflow-y-auto max-h-[200px] scrollbar-thin">
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
                <span>{BOOT_LOGS[currentLineIndex].substring(0, currentCharIndex)}<span className="animate-pulse font-bold text-cyber-cyan">▋</span></span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center">
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
                Waiting for system calibration...
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
