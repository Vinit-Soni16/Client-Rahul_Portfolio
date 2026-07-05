'use client';

import { useScroll, useSpring, motion } from 'framer-motion';

/**
 * ScrollProgress — Thin #0066FF line at top tracking scroll 0→100%.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="scroll-progress-bar"
      style={{ scaleX, transformOrigin: '0%' }}
    />
  );
}
