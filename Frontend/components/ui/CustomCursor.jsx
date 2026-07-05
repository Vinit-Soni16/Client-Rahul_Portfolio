'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      gsap.to(dot, { x: mx, y: my, duration: 0.06, ease: 'none' });
    };

    const lerp = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      gsap.set(ring, { x: rx, y: ry });
      requestAnimationFrame(lerp);
    };
    lerp();

    const onOver = (e) => {
      const el = e.target.closest('a, button, [data-cursor]');
      if (el) {
        gsap.to(ring, { scale: 2.5, borderColor: '#00E5FF', opacity: 1, duration: 0.3, ease: 'power2.out' });
        gsap.to(dot,  { scale: 0, duration: 0.2 });
      }
    };
    const onOut = () => {
      gsap.to(ring, { scale: 1, borderColor: 'rgba(0, 229, 255, 0.6)', opacity: 1, duration: 0.3 });
      gsap.to(dot,  { scale: 1, duration: 0.2 });
    };

    const onClick = () => {
      gsap.fromTo(ring,
        { scale: 1 },
        { scale: 3.5, opacity: 0, duration: 0.4, ease: 'power2.out',
          onComplete: () => gsap.set(ring, { scale: 1, opacity: 1 }) }
      );
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout',  onOut);
    window.addEventListener('click',     onClick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout',  onOut);
      window.removeEventListener('click',     onClick);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
