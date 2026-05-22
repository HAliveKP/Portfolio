import React, { useState } from "react";
import BootScreen from "./components/BootScreen";
import TerminalDashboard from "./components/TerminalDashboard";

export default function App() {
  const [bootCompleted, setBootCompleted] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#0a0e14] crt-screen-distorted">
      {/* Dynamic CRT CRT monitor scans and distortion overlays */}
      <div className="crt-overlay" />
      
      {!bootCompleted ? (
        <BootScreen onBootComplete={() => setBootCompleted(true)} />
      ) : (
        <TerminalDashboard />
      )}
    </div>
  );
}
