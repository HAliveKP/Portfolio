import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Terminal, Cpu, Database, Eye, Shield, Wifi } from "lucide-react";

interface BootScreenProps {
  onBootComplete: () => void;
}

export default function BootScreen({ onBootComplete }: BootScreenProps) {
  const [bootStep, setBootStep] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [diagnostics, setDiagnostics] = useState<string[]>([]);
  const [synthLoaded, setSynthLoaded] = useState(false);

  // Sound generator using Web Audio API (completely zero-dependency retro sound FX!)
  const playBeep = (freq: number, duration: number, type: OscillatorType = "sine") => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio context might be blocked or unsupported
    }
  };

  const playStartupSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = audioCtx.currentTime;
      // Arpeggio
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

  const bootLogs = [
    "INITIALIZING COGNITIVE INTERFACE SYSTEM MATRIX...",
    "DETECTATIVE ARCHITECTURE: INTEL(R) CORE(TM) NEURAL EXTRAPOLATION_V3",
    "CHECKING VIRTUAL SOCKET INGRESS ENVELOPES... STABLE",
    "MAPPING COMPUTER VISION REPOSITORIES (YOLO GRAPHICS ADAPTER)... OK",
    "CALCULATING ECO-ACCOUNTING COEFFICIENTS (GREEN COMPASS CORE v1.2)... LOADED",
    "SEEKING COMMUNITY SKILLS BARTER DIRECTORIES (SAHAYOGI STORAGE)... INITIALIZED",
    "SECURE SOCKET CONNECTION BINDING AT HOST 0.0.0.0:3000... ESTABLISHED",
    "AISTUDIO GEMINI-3.5-FLASH PROCESSOR SYNERGY STACK... CONNECTED",
    "PRE-PARSING CRYPTO REPUTATION ALGORITHMIC CHALLENGES... READY",
    "OS SYSTEM LEVEL: HK RETRO-FUTURE PORTFOLIO TERMINAL SECURE LINK v1.2.9"
  ];

  useEffect(() => {
    if (bootStep < bootLogs.length) {
      const timer = setTimeout(() => {
        setDiagnostics((prev) => [...prev, bootLogs[bootStep]]);
        playBeep(440 + bootStep * 80, 0.08, "sine");
        setBootStep((prev) => prev + 1);
      }, 350 + Math.random() * 200);
      return () => clearTimeout(timer);
    } else {
      setSynthLoaded(true);
    }
  }, [bootStep]);

  const handleStart = () => {
    setHasStarted(true);
    playStartupSound();
    // Delay for transition
    setTimeout(() => {
      onBootComplete();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-cyber-dark relative flex items-center justify-center p-4 overflow-hidden led-grid crt-screen-distorted selection:bg-cyber-green selection:text-black">
      {/* Laser horizontal sweep lines animation */}
      <div className="absolute top-0 left-0 w-full h-1 bg-cyber-green/10 shadow-[0_0_15px_#00ff66] pointer-events-none scanline-sweep z-50" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={hasStarted ? { opacity: 0, scale: 1.05 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full max-w-3xl terminal-panel p-6 md:p-8 rounded-lg relative overflow-hidden flex flex-col justify-between min-h-[550px] border border-cyber-green/20"
        style={{ boxShadow: "0 0 35px rgba(0, 255, 102, 0.05)" }}
      >
        {/* Panel Glitch Overlay corner symbols */}
        <div className="absolute top-2 left-2 text-[10px] text-cyber-green/40 font-mono">
          SYS.BOOT_DEC_v1.2.9 // [HK-OS]
        </div>
        <div className="absolute top-2 right-2 flex space-x-2 text-cyber-green/40">
          <Shield className="w-4.5 h-4.5 animate-pulse-slow" />
          <Wifi className="w-4.5 h-4.5" />
        </div>

        {/* Head branding */}
        <div className="text-center pt-4 select-none">
          <motion.div
            animate={{ scale: [1, 1.01, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-flex items-center justify-center space-x-2 bg-cyber-green/10 text-cyber-green border border-cyber-green/30 px-3 py-1.5 rounded-full text-xs font-mono tracking-widest glow-green mb-4"
          >
            <Cpu className="w-4 h-4 animate-spin-slow" />
            <span>AUTHENTIC CORE IDENTIFICATION MATRIX</span>
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyber-green via-cyber-blue to-emerald-400 font-mono">
            Hkp_os v1.2
          </h1>
          <p className="text-xs text-cyber-green/60 uppercase tracking-[0.2em] font-mono mt-1">
            RETRO-FUTURISTIC CYBERNETIC COGNITION PORFTOLIO
          </p>
        </div>

        {/* Simulated Bios logs */}
        <div className="bg-black/60 border border-cyber-green/10 rounded p-4 font-mono text-[11px] md:text-xs text-cyber-green/80 flex-grow my-6 overflow-y-auto max-h-[220px] h-[220px] scrollbar-thin">
          <div className="space-y-1.5">
            {diagnostics.map((line, i) => (
              <div key={i} className="flex items-start">
                <span className="text-cyber-green/40 mr-2 select-none">[{i.toString().padStart(2, "0")}]</span>
                <span className="break-all">{line}</span>
              </div>
            ))}
            {bootStep < bootLogs.length && (
              <div className="flex items-center space-x-1 mt-1 text-cyber-blue">
                <span className="animate-pulse">▒</span>
                <span className="text-[10px] tracking-widest uppercase">READING SYSTEM CLUSTERS...</span>
              </div>
            )}
            {synthLoaded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-cyber-blue mt-3 border-t border-cyber-green/10 pt-2 flex items-center justify-between"
              >
                <span>[SYSTEM CHECK COMPLETED: POOL NOMINAL]</span>
                <span>SYS_PORT_3000_OK</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Start Button area */}
        <div className="flex flex-col items-center justify-center pt-2">
          {synthLoaded ? (
            <motion.button
              id="start-connection-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="relative px-8 py-3.5 bg-gradient-to-r from-cyber-green/20 to-cyber-blue/20 hover:from-cyber-green/30 hover:to-cyber-blue/30 text-cyber-green rounded border border-cyber-green/50 font-bold uppercase tracking-widest text-sm cursor-pointer glow-green shadow-[0_0_20px_rgba(0,255,102,0.15)] flex items-center space-x-3 transition-all duration-300 group overflow-hidden"
            >
              {/* Button light sweeps */}
              <div className="absolute top-0 -left-16 w-12 h-full bg-white/10 skew-x-12 group-hover:animate-[sweep_1s_ease-out_infinite]" style={{ animation: "sweep 1.5s ease-out infinite" }} />
              <Terminal className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>INITIALIZE CORE CONNECTION</span>
            </motion.button>
          ) : (
            <div className="flex items-center space-x-3 text-cyber-green/40 font-mono text-xs select-none">
              <div className="w-5 h-5 border-2 border-t-transparent border-cyber-green animate-spin rounded-full" />
              <span>CALIBRATING HOLOGRAPH DETECTOR INDEX...</span>
            </div>
          )}
          <div className="mt-4 text-[10px] text-cyber-green/30 uppercase tracking-[0.1em] font-mono text-center">
            Clicking Starts Secure Fullstack Emulated Terminal Stream // No Assets Required
          </div>
        </div>
      </motion.div>
    </div>
  );
}
