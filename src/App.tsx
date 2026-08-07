import { lazy, Suspense, useState } from "react";
import BootScreen from "./components/BootScreen";
import TerminalDashboard from "./components/TerminalDashboard";

// Three.js particle field — code-split so it never blocks first paint.
const Starfield = lazy(() => import("./components/Starfield"));

export default function App() {
  const [bootCompleted, setBootCompleted] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#0a0e14] crt-screen-distorted">
      {/* Dynamic CRT monitor scans and distortion overlays */}
      <div className="crt-overlay" />

      {/* Design-DNA backdrop: blueprint grid + ambient 3D particle field */}
      <div className="grid-bg fixed inset-0 z-0 pointer-events-none" aria-hidden="true" />
      <Suspense fallback={null}>
        <Starfield />
      </Suspense>

      <div className="relative z-10">
        {!bootCompleted ? (
          <BootScreen onBootComplete={() => setBootCompleted(true)} />
        ) : (
          <TerminalDashboard />
        )}
      </div>
    </div>
  );
}
