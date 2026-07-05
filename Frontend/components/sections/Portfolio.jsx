'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const PROJECTS = [
  {
    num: '01',
    client: 'REAL ESTATE EDITING',
    category: 'YouTube & Long-form',
    desc: 'High-converting real estate content focused on premium visuals, smooth pacing, and cinematic storytelling. Every edit is designed to showcase properties professionally while increasing audience engagement and buyer interest.',
    goals: ['Lead Generation', 'Property Showcase', 'Brand Authority'],
    work: ['Premiere Pro', 'After effects', 'Motion Graphics'],
    videos: ['Real Estate.MP4', 'Real Estate-1.MP4']
  },
  {
    num: '02',
    client: 'REEL EDITING',
    category: 'Social Media Strategy',
    desc: 'Fast-paced short-form content crafted for maximum retention and engagement. Every reel is edited with smooth transitions, captions, and trending editing techniques to capture attention within the first few seconds.',
    goals: ['Audience Growth', 'Higher Engagement', 'Viral Reach'],
    work: ['Capcut', 'Premiere pro', 'Colour grading'],
    videos: ['Reel Editing.MP4', 'Reel Editing-1.MP4']
  },
  {
    num: '03',
    client: 'TYPOGRAPHY EDITING',
    category: 'Social Media Marketing',
    desc: 'Creative typography edits that transform simple videos into visually engaging content. Designed with dynamic text animations, rhythm-based motion, and clean compositions to maximize viewer retention.',
    goals: ['Viewer Retention', 'Visual Impact', 'Content Differentiation'],
    work: ['Premiere pro', 'Motion Design', 'Text-Based Storytelling'],
    videos: ['Typography Editin.mp4', 'Typography Editing-1.mp4'],
    layout: 'horizontal'
  }
];

const VideoCard = ({ src, clientName, index, layout }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const isHorizontal = layout === 'horizontal';

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div style={{
      aspectRatio: isHorizontal ? '16/9' : '9/16',
      width: '100%',
      maxWidth: isHorizontal ? '500px' : 'none',
      margin: isHorizontal ? '0 auto' : '0',
      background: 'var(--bg-secondary)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: '12px',
      padding: '0.5rem',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      transform: isHorizontal ? 'none' : `translateY(${index > 0 ? (index % 2 !== 0 ? '-20px' : '0') : '0'})`,
      transition: 'transform 0.3s ease, border-color 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = isHorizontal ? 'scale(1.02)' : 'scale(1.05)'; e.currentTarget.style.zIndex = '10'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform = isHorizontal ? 'none' : `translateY(${index > 0 ? (index % 2 !== 0 ? '-20px' : '0') : '0'})`; e.currentTarget.style.zIndex = '1'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
    >
      {/* Fake Instagram Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', padding: '0 0.2rem' }}>
        <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--accent)' }} />
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}></div>
      </div>

      {/* Video Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        flex: 1,
        borderRadius: '6px',
        overflow: 'hidden',
        background: '#000'
      }}>
        <video 
          ref={videoRef}
          src={`/${src}`}
          autoPlay 
          loop 
          muted 
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        
        {/* Mute/Unmute Button */}
        <button 
          onClick={toggleMute}
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            background: 'rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(4px)',
            color: '#fff',
            zIndex: 5,
            fontSize: '1rem',
            padding: 0
          }}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>

      {/* Fake Instagram Footer */}
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', padding: '0 0.2rem', color: 'var(--accent)' }}>
        <span>♥</span> <span>💬</span> <span>↗</span>
      </div>
    </div>
  );
};

export default function Portfolio() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const projectRefs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate Main Title
    gsap.fromTo(titleRef.current,
      { opacity: 0, scale: 0.9, y: 50, filter: 'blur(10px)' },
      {
        opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      }
    );

    // Animate Each Project Block
    projectRefs.current.forEach((proj, i) => {
      if(!proj) return;
      gsap.fromTo(proj,
        { opacity: 0, y: 100, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: proj, start: 'top 85%' }
        }
      );
      
      // Parallax effect on the giant background number
      const giantNum = proj.querySelector('.giant-num');
      if (giantNum) {
        gsap.to(giantNum, {
          y: 100,
          ease: 'none',
          scrollTrigger: { trigger: proj, start: 'top bottom', end: 'bottom top', scrub: true }
        });
      }
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      style={{
        background: 'transparent',
        padding: '8rem 0',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden'
      }}
    >
      {/* Background Cyan Glow Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(0, 229, 255, 0.05) 0%, transparent 80%)',
        pointerEvents: 'none',
        zIndex: 1
      }}/>
      
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)', position: 'relative', zIndex: 2 }}>
        
        {/* Massive Section Title */}
        <div ref={titleRef} style={{ textAlign: 'center', marginBottom: '8rem' }}>
          <h2 className="script-title" style={{
            fontFamily: 'var(--font-script)',
            color: 'var(--accent)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            transform: 'rotate(-3deg)',
            position: 'relative',
            zIndex: 2,
            textShadow: '0 0 20px rgba(0, 229, 255, 0.3)'
          }}>
            POV: Your strategy is your real portfolio
          </h2>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 19vw, 14rem)',
            fontWeight: 900,
            color: 'var(--text-primary)',
            lineHeight: 0.8,
            letterSpacing: '-0.02em',
            textShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 40px rgba(0, 229, 255, 0.1)',
            margin: 0
          }}>
            PORT<br/>FOLIO
          </h3>
          <div style={{
            fontFamily: 'var(--font-syne)',
            fontSize: 'clamp(0.8rem, 1.5vw, 1.2rem)',
            fontWeight: 700,
            letterSpacing: '0.3em',
            color: 'var(--text-primary)',
            marginTop: '3rem',
            background: 'rgba(255, 255, 255, 0.05)',
            display: 'inline-block',
            padding: '1rem 3rem',
            borderRadius: '100px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            SOCIAL MEDIA & VIDEO EDITING
          </div>
        </div>

        {/* Projects Magazine Layout */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
          {PROJECTS.map((proj, idx) => (
            <div 
              key={proj.num} 
              ref={el => projectRefs.current[idx] = el}
              className="glass"
              style={{
                borderRadius: '24px',
                padding: 'clamp(2rem, 5vw, 4rem)',
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '4rem',
                alignItems: 'center',
                overflow: 'hidden'
              }}
            >
              {/* Subtle inner glow */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
              }} />
              {/* Giant Background Number */}
              <div className="giant-num" style={{
                position: 'absolute',
                top: '-40px',
                right: '20px',
                fontFamily: 'var(--font-display)',
                fontSize: '15rem',
                fontWeight: 900,
                color: 'rgba(0, 229, 255, 0.05)',
                lineHeight: 1,
                zIndex: 0,
                pointerEvents: 'none'
              }}>
                {proj.num}
              </div>

              {/* Left Details (Like Screenshot 2) */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h4 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 4vw, 4rem)',
                  fontWeight: 900,
                  color: 'var(--text-primary)',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                  lineHeight: 1
                }}>
                  CLIENT : {proj.client}
                </h4>
                <p style={{
                  fontFamily: 'var(--font-script)',
                  fontSize: '2rem',
                  color: 'var(--accent)',
                  marginBottom: '2rem'
                }}>
                  Brand Description
                </p>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                  marginBottom: '3rem',
                  maxWidth: '500px'
                }}>
                  {proj.desc}
                </p>

                {/* Tags Grid */}
                <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1.5rem 2rem', alignItems: 'start' }}>
                  
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '0.5rem', opacity: 0.7 }}>
                    CLIENT GOALS:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    {proj.goals.map(g => (
                      <span key={g} style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        color: 'var(--text-primary)',
                        padding: '0.4rem 1rem',
                        border: '1px solid rgba(0, 229, 255, 0.4)',
                        boxShadow: '0 0 10px rgba(0, 229, 255, 0.1)',
                        borderRadius: '20px',
                        background: 'rgba(0, 229, 255, 0.05)'
                      }}>{g}</span>
                    ))}
                  </div>

                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '0.5rem', opacity: 0.7 }}>
                    WORK DONE:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    {proj.work.map(w => (
                      <span key={w} style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        color: 'var(--text-primary)',
                        padding: '0.4rem 1rem',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '20px',
                        background: 'rgba(255, 255, 255, 0.05)'
                      }}>{w}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Gallery / Mockups */}
              <div style={{ 
                position: 'relative', 
                zIndex: 2, 
                display: proj.layout === 'horizontal' ? 'flex' : 'grid',
                flexDirection: proj.layout === 'horizontal' ? 'column' : 'unset',
                gridTemplateColumns: proj.layout === 'horizontal' ? 'unset' : 'repeat(auto-fit, minmax(180px, 1fr))', 
                gap: proj.layout === 'horizontal' ? '2rem' : '1rem',
                justifyContent: proj.layout === 'horizontal' ? 'center' : 'start',
                alignItems: proj.layout === 'horizontal' ? 'center' : 'stretch'
              }}>
                {proj.videos.map((videoSrc, index) => (
                  <VideoCard key={index} src={videoSrc} clientName={proj.client} index={index} layout={proj.layout} />
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
