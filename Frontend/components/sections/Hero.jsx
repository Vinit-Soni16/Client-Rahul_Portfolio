'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TICKER_ITEMS = [
  'CREATIVE VIDEO EDITOR', 'VISUAL STORYTELLER', 'MOTION GRAPHICS',
  'ADOBE PREMIERE PRO', 'AFTER EFFECTS', 'COLOR GRADING', 'CONTENT CREATION',
];

export default function Hero() {
  const greetRef   = useRef(null);
  const nameRef    = useRef(null);
  const roleRef    = useRef(null);
  const btnsRef    = useRef(null);
  const scrollRef  = useRef(null);
  const sectionRef = useRef(null);
  const nameParallaxRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({ delay: 0.5 }); 

    tl.fromTo(greetRef.current,
      { opacity: 0, y: 30, rotationX: -20 },
      { opacity: 1, y: 0, rotationX: 0, duration: 0.8, ease: 'power4.out' }
    )
    .fromTo(nameRef.current,
      { opacity: 0, scale: 0.9, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'back.out(1.5)' }, '-=0.4'
    )
    .fromTo(roleRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }, '-=0.6'
    )
    .fromTo(btnsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3'
    )
    .fromTo(scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 }, '-=0.2'
    );

    // Subtle Parallax on scroll for cinematic feel
    gsap.to(nameParallaxRef.current, {
      yPercent: 30,
      scale: 1.05,
      opacity: 0.1,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const scrollToWork = (e) => {
    e.preventDefault();
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="noise-bg"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '700px',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Vanta replaces HeroScene */}

      {/* Cinematic Gradient Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(7, 7, 10, 0.9) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Hero Text Content — Sleek & Cinematic */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        padding: '0 clamp(1rem, 5vw, 2rem)',
        maxWidth: '1200px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        {/* Glowing Cyan Greeting */}
        <p
          ref={greetRef}
          className="glow-text-cyan script-title"
          style={{
            fontFamily: 'var(--font-script)',
            fontSize: 'clamp(1.5rem, 6vw, 4rem)',
            letterSpacing: '0.02em',
            transform: 'rotate(-3deg)',
            zIndex: 3
          }}
        >
          POV: You found your
        </p>

        {/* Massive Overlapping Name */}
        <div ref={nameParallaxRef} style={{ zIndex: 2, margin: '0' }}>
          <h1
            ref={nameRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 19vw, 12rem)',
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 0.85,
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              textShadow: '0 0 15px rgba(0, 229, 255, 0.8), 0 0 30px rgba(0, 229, 255, 0.6), 0 0 50px rgba(0, 229, 255, 0.4), 0 10px 40px rgba(0,0,0,0.8)',
              margin: '0',
            }}
          >
            VIDEO<br/>EDITOR
          </h1>
        </div>

        {/* Bold Role Statement */}
        <p
          ref={roleRef}
          className="glass"
          style={{
            fontFamily: 'var(--font-syne)',
            fontSize: 'clamp(0.8rem, 3vw, 1.2rem)',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--text-primary)',
            marginTop: '3rem',
            marginBottom: '3rem',
            padding: 'clamp(0.8rem, 2vw, 1rem) clamp(1.2rem, 4vw, 2rem)',
            borderRadius: '100px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          Rahul Sharma <span style={{ color: 'var(--accent)' }}>✦</span> Creative Storyteller
        </p>

        {/* Modern Cinematic CTA Buttons */}
        <div
          ref={btnsRef}
          style={{
            display: 'flex',
            gap: '1.5rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          <a
            href="#work"
            onClick={scrollToWork}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '1rem 2.5rem',
              background: 'var(--text-primary)',
              color: 'var(--bg)',
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize: '1rem',
              letterSpacing: '0.1em',
              textDecoration: 'none',
              borderRadius: '100px',
              transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 229, 255, 0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--text-primary)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            VIEW MY WORK
          </a>
          <a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '1rem 2.5rem',
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize: '1rem',
              letterSpacing: '0.1em',
              textDecoration: 'none',
              borderRadius: '100px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'background 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.borderColor = 'var(--text-primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}
          >
            HIRE ME
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        style={{
          position: 'absolute',
          bottom: '4rem',
          right: 'clamp(1rem, 5vw, 3rem)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <div style={{
          writingMode: 'vertical-rl',
          fontFamily: 'var(--font-syne)',
          fontWeight: 600,
          fontSize: '0.75rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}>SCROLL</div>
        <div className="scroll-dot" style={{
          width: '2px',
          height: '40px',
          background: 'linear-gradient(to bottom, var(--text-primary), transparent)',
          borderRadius: '2px'
        }} />
      </div>

      {/* Bottom Ticker - Sleek Dark Mode */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        borderTop: '1px solid var(--border)',
        overflow: 'hidden',
        padding: '0.8rem 0',
        background: 'rgba(7, 7, 10, 0.8)',
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{ display: 'flex', animation: 'ticker-scroll 25s linear infinite' }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 500,
              letterSpacing: '0.15em',
              color: 'var(--text-muted)',
              paddingRight: '3rem',
              flexShrink: 0,
            }}>
              {item} <span style={{ color: 'var(--accent)', marginRight: '3rem' }}>✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
