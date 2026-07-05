'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';

export default function About() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      }
    });

    tl.fromTo(headingRef.current,
      { opacity: 0, x: -100, skewX: 10, filter: 'blur(10px)' },
      { opacity: 1, x: 0, skewX: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power4.out' }
    )
    .fromTo(textRef.current,
      { opacity: 0, y: 50, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
      '-=1'
    )
    .fromTo(statsRef.current?.children,
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(1.5)' },
      '-=0.8'
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        position: 'relative',
        background: 'transparent',
        padding: '10rem 0',
        zIndex: 5,
        overflow: 'hidden'
      }}
    >


      {/* Cinematic Gradient Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        background: 'linear-gradient(180deg, rgba(7,7,10,0.9) 0%, rgba(0,229,255,0.05) 50%, rgba(7,7,10,0.9) 100%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        position: 'relative',
        zIndex: 2,
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '4rem',
      }}>
        {/* Massive Header */}
        <div ref={headingRef}>
          <p className="script-title" style={{
            fontFamily: 'var(--font-script)',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            color: 'var(--accent)',
            transform: 'rotate(-3deg)',
            textShadow: '0 0 20px rgba(0, 229, 255, 0.3)'
          }}>Behind the edits</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 17vw, 10rem)',
            fontWeight: 900,
            color: 'var(--text-primary)',
            lineHeight: 0.85,
            letterSpacing: '-0.02em',
            textShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 40px rgba(0, 229, 255, 0.1)',
            textTransform: 'uppercase',
            margin: 0
          }}>
            THE<br/>STORY
          </h2>
        </div>

        {/* Content Block */}
        <div ref={textRef} className="glass" style={{
          padding: 'clamp(2rem, 5vw, 4rem)',
          borderRadius: '24px',
          maxWidth: '800px',
          marginLeft: 'auto',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle inner glow */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
          }} />
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            lineHeight: 1.8,
            color: 'var(--text-primary)',
            marginBottom: '2rem'
          }}>
            I’m Rahul, a <strong style={{ color: 'var(--accent)', fontFamily: 'var(--font-syne)', fontWeight: 800 }}>Video Editor & Visual Storyteller</strong> who transforms ideas into high-retention content. I specialize in creating engaging documentaries, fast-paced reels, cinematic edits, and motion graphics that capture attention from the very first second.
          </p>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            lineHeight: 1.8,
            color: 'var(--text-muted)'
          }}>
            Whether it’s seamless editing in Premiere Pro, dynamic animations in After Effects, or polished visuals in Photoshop, my goal is simple: create content that looks premium, tells a story, and keeps viewers watching until the end. <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontWeight: 600, letterSpacing: '0.05em', display: 'block', marginTop: '1.5rem' }}>MAKE EVERY FRAME COUNT.</span>
          </p>
        </div>

        {/* Stats / Badges */}
        <div ref={statsRef} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '2rem',
          marginTop: '4rem',
          width: '100%'
        }}>
          {[
            { label: 'YEARS EXPERTISE', value: '3+' },
            { label: 'PROJECTS DELIVERED', value: '200+' },
            { label: 'CLIENTS', value: '100+' },
            { label: 'VIEWS GENERATED', value: '10M+' }
          ].map((stat, i) => (
            <div key={i} className="glass" style={{
              padding: '2.5rem 1.5rem',
              borderRadius: '20px',
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.08)',
              transition: 'transform 0.3s, border-color 0.3s',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', fontWeight: 900, color: 'var(--accent)', lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontFamily: 'var(--font-syne)', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '0.15em', marginTop: '1rem', textTransform: 'uppercase' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
