/**
 * useLenis — Locomotive-Grade Smooth Scroll Engine
 * 
 * Exposes scroll velocity as a CSS variable (--scroll-velocity)
 * for reactive transforms throughout the app.
 * 
 * Key Locomotive Scroll techniques:
 * - Velocity tracking with lerp smoothing
 * - CSS variable output for velocity-reactive effects
 * - Direction detection (--scroll-direction: 1 or -1)
 * - Normalized speed (0-1) for uniform distortion mapping
 */

import { useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';

export const useLenis = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const velocityRef = useRef(0);
  const smoothVelocityRef = useRef(0);

  // Lerp utility for buttery velocity smoothing
  const lerp = useCallback((start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,          // Slightly longer for cinematic weight
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo.out curve
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Track velocity for Locomotive-style effects
    lenis.on('scroll', (args: any) => {
      velocityRef.current = args.velocity;
    });

    function raf(time: number) {
      lenis.raf(time);

      // Smooth the velocity with lerp — prevents jittery transforms
      // 0.08 = slow decay = long "tail" after scroll stops (cinematic inertia)
      smoothVelocityRef.current = lerp(
        smoothVelocityRef.current,
        velocityRef.current,
        0.08
      );

      // Clamp to normalized range [0, 1] for uniform mapping
      const normalizedVelocity = Math.min(
        Math.abs(smoothVelocityRef.current) / 4,
        1
      );

      // Direction: 1 = down, -1 = up
      const direction = smoothVelocityRef.current >= 0 ? 1 : -1;

      // Output to CSS variables — this is the Locomotive Scroll secret
      // Every element can now react to scroll speed via pure CSS
      document.documentElement.style.setProperty(
        '--scroll-velocity',
        normalizedVelocity.toFixed(4)
      );
      document.documentElement.style.setProperty(
        '--scroll-velocity-raw',
        smoothVelocityRef.current.toFixed(4)
      );
      document.documentElement.style.setProperty(
        '--scroll-direction',
        String(direction)
      );

      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [lerp]);

  return lenisRef;
};

export default useLenis;
