'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * LenisProvider — Initialises Lenis smooth scroll and integrates with GSAP ScrollTrigger.
 * Must wrap the entire page as a client component.
 */
export default function LenisProvider({ children }) {
  useEffect(() => {
    let lenis;
    let rafId;

    const init = async () => {
      const Lenis = (await import('lenis')).default;

      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
      });

      // Sync Lenis scroll with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      // Use GSAP ticker for consistent frame timing
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
      gsap.ticker.lagSmoothing(0);

      // Force refresh ScrollTrigger to calculate dynamic heights correctly
      setTimeout(() => ScrollTrigger.refresh(), 500);
      setTimeout(() => ScrollTrigger.refresh(), 1500);
      setTimeout(() => ScrollTrigger.refresh(), 3000);
    };

    init();

    return () => {
      if (lenis) lenis.destroy();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return <>{children}</>;
}
