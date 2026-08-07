// Motion tokens distilled from the design-skill libraries:
//  - motion-design-skill (LottieFiles): timing, easing, choreography principles
//  - vibe-animation-skill: vocabulary -> GSAP patterns
//  - design-dna: quantified motion schema (easing, duration scale)
import gsap from "gsap";
import { useEffect, useRef } from "react";

// --- Easing curves (design_dna.motion.easing) ---
export const EASE = {
  // Premium / authoritative: minimal overshoot, confident arrival
  premium: "power2.out",
  // Energetic: strong deceleration for hero/boot moments
  energetic: "expo.out",
  // Playful: subtle overshoot for micro-interactions
  playful: "back.out(1.6)",
  // Standard exit
  exit: "power2.in",
  // Continuous ambient motion
  ambient: "sine.inOut",
} as const;

// --- Duration scale (design_dna.motion.duration_scale) ---
export const DURATION = {
  micro: 0.18, // presses, toggles, focus
  normal: 0.32, // entrances, hover lifts
  macro: 0.6, // boot choreography, panel assembly
  ambient: 2.4, // breathing glows, continuous loops
} as const;

// --- Entrance pattern: direct slide-in (premium personality) ---
// Offset 15-25px, opacity 0 -> 1, premium easing, 0% overshoot.
export function revealFromBelow(targets: gsap.TweenTarget, opts: { duration?: number; delay?: number; stagger?: number } = {}) {
  return gsap.from(targets, {
    y: 22,
    autoAlpha: 0,
    duration: opts.duration ?? DURATION.normal,
    delay: opts.delay ?? 0,
    stagger: opts.stagger ?? 0,
    ease: EASE.premium,
    overwrite: "auto",
  });
}

// --- Assembled entrance (multi-part, staggered 60-90ms) ---
export function assemble(targets: gsap.TweenTarget, opts: { duration?: number; delay?: number; stagger?: number } = {}) {
  return gsap.from(targets, {
    scale: 0.96,
    autoAlpha: 0,
    duration: opts.duration ?? DURATION.macro,
    delay: opts.delay ?? 0,
    stagger: opts.stagger ?? 0.07,
    ease: EASE.energetic,
    overwrite: "auto",
  });
}

// --- Dissolve exit: exits run 65-75% of the entrance duration ---
export function dissolveExit(targets: gsap.TweenTarget, opts: { duration?: number } = {}) {
  return gsap.to(targets, {
    autoAlpha: 0,
    scale: 0.985,
    duration: opts.duration ?? DURATION.normal * 0.7,
    ease: EASE.exit,
    overwrite: "auto",
  });
}

// --- Press micro-interaction (playful back-ease) ---
export function press(targets: gsap.TweenTarget) {
  return gsap.fromTo(
    targets,
    { scale: 0.96 },
    { scale: 1, duration: DURATION.micro, ease: EASE.playful, overwrite: "auto" }
  );
}

// --- React hook: run a GSAP effect once on mount (StrictMode-safe) ---
export function useGsapOnce(fn: (ctx: gsap.Context) => void, deps: unknown[] = []) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const ctx = gsap.context(fn, ref);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
}
