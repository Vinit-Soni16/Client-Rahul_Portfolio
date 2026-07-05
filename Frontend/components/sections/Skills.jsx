'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
const AdobeIcon = ({ text, color, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill={color}/>
    <text x="12" y="16" fill="white" fontSize="11" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">{text}</text>
  </svg>
);

const CameraIcon = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 8V20H20V8H4ZM12 18C9.79 18 8 16.21 8 14C8 11.79 9.79 10 12 10C14.21 10 16 11.79 16 14C16 16.21 14.21 18 12 18ZM15 6L13.17 4H10.83L9 6H5C4.45 6 4 6.45 4 7C4 7.55 4.45 8 5 8H19C19.55 8 20 7.55 20 7C20 6.45 19.55 6 19 6H15Z" fill={color}/>
    <circle cx="12" cy="14" r="2.5" fill={color}/>
  </svg>
);
const SOFTWARE_SKILLS = [
  { name: 'Photoshop', icon: (props) => <AdobeIcon text="Ps" color="#31A8FF" {...props} /> },
  { name: 'Premiere Pro', icon: (props) => <AdobeIcon text="Pr" color="#9999FF" {...props} /> },
  { name: 'After Effects', icon: (props) => <AdobeIcon text="Ae" color="#9999FF" {...props} /> },
  { name: 'Lightroom', icon: (props) => <AdobeIcon text="Lr" color="#31A8FF" {...props} /> },
  { name: 'Media Encoder', icon: (props) => <AdobeIcon text="Me" color="#9999FF" {...props} /> },
  { name: 'Shutter', icon: (props) => <CameraIcon color="#FFFFFF" {...props} /> },
];

const EXPERIENCES = [
  {
    role: 'Documentary Video Editor',
    company: 'YouTube / Case Study',
    videoId: 'I423jooLueM',
    desc: 'Edited this high-retention documentary style video. Focused on seamless transitions, intense sound design, and color grading to keep the viewer hooked from start to finish.',
  }
];

export default function Skills() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(cardsRef.current.filter(Boolean),
      { opacity: 0, y: 100, rotationY: 20, scale: 0.9 },
      {
        opacity: 1, y: 0, rotationY: 0, scale: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%'
        }
      }
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      style={{
        position: 'relative',
        background: 'transparent',
        padding: '10rem 0',
        zIndex: 5,
        overflow: 'hidden'
      }}
    >
      {/* Software Marquee Section (Full Width) */}
      <div style={{ marginBottom: '8rem', position: 'relative', zIndex: 2, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h3 style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1rem',
            color: 'var(--accent)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}>
            Tools of the Trade
          </h3>
        </div>
        
        <div style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          padding: '2rem 0',
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
        }}>
          <style jsx>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .marquee-content {
              display: flex;
              width: max-content;
              animation: marquee 20s linear infinite;
            }
            .marquee-content:hover {
              animation-play-state: paused;
            }
            .skill-item {
              display: flex;
              align-items: center;
              gap: 1.5rem;
              padding: clamp(0.8rem, 2vw, 1.2rem) clamp(1.5rem, 4vw, 3rem);
              background: rgba(255, 255, 255, 0.03);
              border: 1px solid rgba(255, 255, 255, 0.05);
              border-radius: 100px;
              margin: 0 1.5rem;
              transition: all 0.3s ease;
              cursor: pointer;
            }
            .skill-item:hover {
              background: rgba(255, 255, 255, 0.1);
              border-color: var(--accent);
              transform: translateY(-5px);
              box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 0 15px rgba(0, 229, 255, 0.2);
            }
            .skill-name {
              font-family: var(--font-syne);
              font-weight: 700;
              font-size: 1.2rem;
              color: var(--text-primary);
              white-space: nowrap;
            }
          `}</style>
          <div className="marquee-content">
            {/* Double the list for seamless infinite scroll */}
            {[...SOFTWARE_SKILLS, ...SOFTWARE_SKILLS, ...SOFTWARE_SKILLS].map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div key={index} className="skill-item">
                  <Icon size={32} />
                  <span className="skill-name">{skill.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)', position: 'relative', zIndex: 2 }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="script-title" style={{
            fontFamily: 'var(--font-script)',
            fontSize: 'clamp(1.8rem, 5vw, 4rem)',
            color: 'var(--accent)',
            transform: 'rotate(-3deg)',
            textShadow: '0 0 20px rgba(0, 229, 255, 0.3)'
          }}>
            Featured Work
          </h2>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 10vw, 8rem)',
            fontWeight: 900,
            color: 'var(--text-primary)',
            textTransform: 'uppercase',
            margin: 0,
            lineHeight: 0.9,
            textShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 40px rgba(0, 229, 255, 0.1)'
          }}>
            SHOWCASE
          </h3>
        </div>
      </div>

      {/* Single Featured Video Layout (Optimized Stacked Design - Extra Wide) */}
      <div style={{
        width: '100%',
        maxWidth: '1400px',
        padding: '0 clamp(1rem, 2vw, 2rem)',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2
      }}>
        {EXPERIENCES.map((exp, i) => (
          <div
            key={i}
            ref={el => cardsRef.current[i] = el}
            className="glass"
            style={{
              borderRadius: '24px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.4s ease, border-color 0.4s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
          >
            {/* Subtle inner glow */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              zIndex: 10
            }} />

            {/* Image / Video Container (Edge to Edge within card) */}
            <div style={{
              width: '100%',
              aspectRatio: '16/9',
              background: '#000',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {exp.videoId ? (
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={`https://www.youtube.com/embed/${exp.videoId}?rel=0&controls=1`}
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                ></iframe>
              ) : (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-syne)', color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '0.2em' }}>{exp.placeholder}</div>
              )}
            </div>

            {/* Text Content */}
            <div style={{ padding: 'clamp(1.5rem, 4vw, 3rem)' }}>
              <h4 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 4vw, 2.2rem)',
                color: 'var(--text-primary)',
                lineHeight: 1.1,
                marginBottom: '1rem',
                fontWeight: 700
              }}>
                {exp.role}
              </h4>
              <p style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                color: 'var(--accent)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1.5rem',
                paddingBottom: '1.5rem',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
              }}>
                {exp.company}
              </p>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.05rem',
                color: '#aaaaaa',
                lineHeight: 1.7
              }}>
                {exp.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
