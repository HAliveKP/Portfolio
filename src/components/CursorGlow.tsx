import React, { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';

export const CursorGlow: React.FC = () => {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch || shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [shouldReduceMotion]);

  if (!pos || shouldReduceMotion) return null;

  return (
    <div
      className="fixed pointer-events-none z-30 transition-opacity duration-300 hidden lg:block"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: 'translate(-50%, -50%)',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(0, 245, 255, 0.05) 0%, rgba(56, 189, 248, 0.02) 40%, transparent 70%)',
        borderRadius: '50%',
      }}
      aria-hidden="true"
    />
  );
};
