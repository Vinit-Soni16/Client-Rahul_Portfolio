'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';



export default function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const textRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);
    
    // Hardcoded access key as requested
    formData.append("access_key", "e0579f5b-bc9a-4133-83dc-9cfb75e7936f");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setResult("Form Submitted Successfully!");
        event.target.reset();
        setTimeout(() => setResult(""), 5000); // Clear after 5 seconds
      } else {
        setResult(data.message || "Something went wrong.");
      }
    } catch (error) {
      setResult("Error submitting form.");
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%'
      }
    });

    tl.fromTo(textRef.current,
      { opacity: 0, y: 80, filter: 'blur(15px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power4.out' }
    )
    .fromTo(formRef.current,
      { opacity: 0, scale: 0.9, x: 50 },
      { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: 'power3.out' },
      '-=1'
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('work.toorahul@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        position: 'relative',
        background: 'transparent',
        padding: '12rem 0 6rem',
        zIndex: 10,
        overflow: 'hidden'
      }}
    >


      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 clamp(1rem, 5vw, 2rem)',
        position: 'relative',
        zIndex: 2,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '4rem',
        alignItems: 'center'
      }}>
        
        {/* Left Side: Massive Typography */}
        <div ref={textRef}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4rem, 13vw, 8rem)',
            fontWeight: 900,
            color: 'var(--text-primary)',
            lineHeight: 0.85,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            textShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 40px rgba(0, 229, 255, 0.1)',
            margin: '0 0 2rem 0'
          }}>
            LET'S<br/>
            <span style={{ color: 'var(--accent)', textShadow: '0 0 20px rgba(0, 229, 255, 0.4)' }}>
              TALK.
            </span>
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1.2rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            marginBottom: '3rem',
            maxWidth: '400px'
          }}>
            Got a vision? Let's bring it to life. I'm currently available for freelance video editing and social media projects.
          </p>

          {/* Email Click to copy */}
          <div 
            onClick={copyEmail}
            className="glass"
            style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              borderRadius: '100px',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: '1rem',
              color: 'var(--accent)',
              border: '1px solid rgba(0, 229, 255, 0.3)',
              transition: 'transform 0.2s, background 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0, 229, 255, 0.1)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 229, 255, 0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'; e.currentTarget.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)'; }}
            onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.98)'; }}
            onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            {copied ? 'COPIED TO CLIPBOARD!' : 'WORK.TOORAHUL@GMAIL.COM'}
          </div>
        </div>

        {/* Right Side: Cinematic Form */}
        <div ref={formRef} className="glass" style={{
          padding: 'clamp(2rem, 5vw, 4rem)',
          borderRadius: '24px',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(0, 229, 255, 0.15)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(0, 229, 255, 0.05)'
        }}>
          {/* Subtle inner glow */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
          }} />
          
          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative', zIndex: 1 }}>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
                Your Name
              </label>
              <input type="text" name="name" placeholder="John Doe" required style={{
                width: '100%',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '12px',
                color: '#fff',
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                padding: '1.2rem',
                outline: 'none',
                transition: 'border-color 0.3s, box-shadow 0.3s, background 0.3s'
              }} 
              onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 229, 255, 0.2)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
                Your Email
              </label>
              <input type="email" name="email" placeholder="john@example.com" required style={{
                width: '100%',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '12px',
                color: '#fff',
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                padding: '1.2rem',
                outline: 'none',
                transition: 'border-color 0.3s, box-shadow 0.3s, background 0.3s'
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 229, 255, 0.2)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
                Message
              </label>
              <textarea name="message" placeholder="Tell me about your project..." rows={4} required style={{
                width: '100%',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '12px',
                color: '#fff',
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                padding: '1.2rem',
                outline: 'none',
                resize: 'none',
                transition: 'border-color 0.3s, box-shadow 0.3s, background 0.3s'
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 229, 255, 0.2)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
              />
            </div>

            <button type="submit" style={{
              background: 'linear-gradient(45deg, var(--accent), #00b4d8)',
              color: '#000',
              fontFamily: 'var(--font-syne)',
              fontWeight: 900,
              fontSize: '1.1rem',
              letterSpacing: '0.15em',
              padding: '1.2rem',
              borderRadius: '100px',
              border: 'none',
              cursor: 'pointer',
              marginTop: '1rem',
              textTransform: 'uppercase',
              boxShadow: '0 10px 20px rgba(0, 229, 255, 0.2)',
              transition: 'background 0.3s, transform 0.2s, box-shadow 0.3s'
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 229, 255, 0.4)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 229, 255, 0.2)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.98)'; }}
            onMouseUp={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
            >
              SEND MESSAGE
            </button>
            {result && (
              <div style={{
                textAlign: 'center',
                fontFamily: 'var(--font-sans)',
                color: result.includes('Success') ? '#4caf50' : (result.includes('Error') || result.includes('wrong') ? '#f44336' : 'var(--accent)'),
                fontSize: '0.9rem',
                marginTop: '-1rem'
              }}>
                {result}
              </div>
            )}
          </form>
        </div>

      </div>
    </section>
  );
}
