'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';
import { gsap } from 'gsap';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);

  const screenRef = useRef(null);
  const overlayRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!visible) return;

    // Intense (Khatarnak) 3D Stagger Entrance
    gsap.fromTo('.port-char', 
      { 
        opacity: 0, 
        scale: 4, 
        z: 800, 
        rotationX: 180, 
        rotationY: 90,
        filter: 'blur(30px)' 
      },
      { 
        opacity: 1, 
        scale: 1, 
        z: 0, 
        rotationX: 0, 
        rotationY: 0,
        filter: 'blur(0px)', 
        duration: 1.5, 
        stagger: 0.1, 
        ease: 'expo.out',
        onComplete: () => {
          // Ambient floating after entrance
          gsap.to('.port-char', {
            y: -15,
            rotationX: 10,
            rotationY: 5,
            duration: 2,
            yoyo: true,
            repeat: -1,
            stagger: 0.05,
            ease: 'sine.inOut'
          });
        }
      }
    );

    let raf;
    const tick = () => {
      progressRef.current += 0.5; // Smooth steady progress
      
      if (progressRef.current <= 100) {
        setProgress(Math.floor(progressRef.current));
        raf = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setTimeout(triggerExit, 800);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [visible]);

  function triggerExit() {
    const tl = gsap.timeline({ onComplete: () => setVisible(false) });
    
    // Intense exit animation
    tl.to('.port-char', {
      opacity: 0,
      scale: 3,
      z: 500,
      rotationX: () => Math.random() * 360 - 180,
      rotationY: () => Math.random() * 360 - 180,
      filter: 'blur(20px)',
      duration: 0.8,
      stagger: 0.05,
      ease: 'power3.in'
    })
    .to(overlayRef.current, { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, "-=0.3")
    .to(screenRef.current, { opacity: 0, duration: 1.0, ease: 'power2.inOut' }, "-=0.2");
  }

  if (!visible) return null;

  return (
    <div 
      ref={screenRef}
      style={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: 99999, 
        backgroundColor: '#040406', // Matches CinematicBackground
        overflow: 'hidden',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=Caveat:wght@700&family=Syne:wght@800&display=swap');

        /* Sleek 3D Text Effect */
        .cinematic-3d-text {
          font-family: 'Syne', sans-serif;
          font-size: clamp(4rem, 20vw, 180px);
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.04em;
          margin: 0;
          line-height: 0.85;
          text-transform: uppercase;
          display: flex;
          flex-direction: column;
          align-items: center;
          
          /* Extreme Futuristic 3D Extrusion (Diagonal Cyan to Blue) */
          text-shadow: 
            1px 1px 0 #00E5FF,
            2px 2px 0 #00E5FF,
            3px 3px 0 #00BFFF,
            4px 4px 0 #0099FF,
            5px 5px 0 #0066FF,
            6px 6px 0 #0044DD,
            7px 7px 0 #0022AA,
            15px 15px 30px rgba(0,0,0,0.9),
            0 0 60px rgba(0, 229, 255, 0.4);
            
          transform-style: preserve-3d;
        }

        .signature-text {
          font-family: 'Caveat', cursive;
          font-size: clamp(2rem, 5vw, 40px);
          color: #ffffff;
          text-shadow: 0 2px 10px rgba(0,0,0,0.8);
          line-height: 1;
        }

        .year-text {
          font-family: 'Syne', sans-serif;
          font-size: clamp(0.9rem, 2vw, 18px);
          color: #00E5FF;
          letter-spacing: 0.2em;
          font-weight: 800;
          text-align: right;
          margin-top: 0.2rem;
          text-shadow: 0 2px 10px rgba(0,0,0,0.8);
        }
      `}} />

      {/* ── Cinematic Background (Mirrors Home Page) ── */}
      <Canvas
        camera={{ position: [0, 0, 5] }}
        dpr={[1, 1.5]}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }}
      >
        <fog attach="fog" args={['#040406', 2, 12]} />
        {/* Same cinematic particles as the main page */}
        <Sparkles count={250} scale={15} size={2} speed={0.4} opacity={0.5} color="#00E5FF" />
        <Sparkles count={150} scale={15} size={4} speed={0.2} opacity={0.2} color="#0066FF" />
        <Stars radius={50} depth={30} count={2500} factor={3} saturation={0} fade speed={0.5} />
      </Canvas>

      {/* Vignette Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, transparent 0%, #040406 120%)',
        zIndex: 2,
        pointerEvents: 'none'
      }} />

      {/* ── UI Overlay ── */}
      <div 
        ref={overlayRef} 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
        }}
      >
        {/* Animated 3D "PORT FOLIO" Text */}
        <div style={{ perspective: '1200px', marginBottom: '5vh' }}>
          <h1 ref={textRef} className="cinematic-3d-text">
            <div style={{ display: 'flex' }}>
              {"PORT".split('').map((char, i) => (
                <span key={`p-${i}`} className="port-char" style={{ display: 'inline-block' }}>
                  {char}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex' }}>
              {"FOLIO".split('').map((char, i) => (
                <span key={`f-${i}`} className="port-char" style={{ display: 'inline-block' }}>
                  {char}
                </span>
              ))}
            </div>
          </h1>
        </div>

        {/* Minimalist Progress Bar */}
        <div style={{ position: 'absolute', bottom: '15vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <div style={{
            fontFamily: '"Syne", sans-serif',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1,
            marginBottom: '1rem',
            textShadow: '0 4px 10px rgba(0,0,0,0.5)'
          }}>
            {progress}%
          </div>

          <div style={{
            width: '100%',
            maxWidth: '300px', 
            height: '4px', 
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '2px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              top: 0, left: 0, height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #0066FF, #00E5FF)',
              boxShadow: '0 0 10px rgba(0,229,255,0.5)',
              transition: 'width 0.1s linear'
            }} />
          </div>
        </div>
      </div>

      {/* ── Signature Overlay ── */}
      <div style={{
        position: 'absolute',
        right: 'clamp(20px, 5vw, 40px)',
        bottom: 'clamp(20px, 5vw, 40px)',
        zIndex: 20,
        textAlign: 'right',
        pointerEvents: 'none'
      }}>
        <div className="signature-text" style={{ transform: 'rotate(-5deg)' }}>
          Rahul Sharma
        </div>
        <div className="year-text" style={{ transform: 'rotate(-5deg)' }}>
          2026
        </div>
      </div>

    </div>
  );
}
