'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['about', 'experience', 'work', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: scrolled ? '1rem clamp(1rem, 5vw, 2rem)' : '1.5rem clamp(1rem, 5vw, 2rem)',
          background: scrolled ? 'rgba(7, 7, 10, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0, 229, 255, 0.1)' : '1px solid transparent',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.5)' : 'none'
        }}
      >
        {/* Logo */}
        <a href="/" style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: '1.5rem',
          color: '#fff',
          textDecoration: 'none',
          letterSpacing: '0.05em',
          position: 'relative',
          zIndex: 1001
        }}>
          RAHUL<span style={{ color: 'var(--accent)' }}>.</span>
        </a>

        {/* Email — hidden on mobile */}
        <a href="mailto:work.toorahul@gmail.com" className="hidden-mobile" style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          textDecoration: 'none',
          letterSpacing: '0.05em',
          transition: 'color 0.3s'
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          work.toorahul@gmail.com
        </a>

        {/* Desktop Nav Links */}
        <ul className="nav-links hidden-mobile" style={{
          display: 'flex',
          gap: 'clamp(1rem, 3vw, 2.5rem)',
          listStyle: 'none',
          margin: 0,
          padding: 0
        }}>
          {['about', 'experience', 'work', 'contact'].map((id) => {
            const isActive = activeSection === id;
            return (
              <li key={id} style={{ position: 'relative' }}>
                <a
                  href={`#${id}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(id); }}
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: isActive ? '#fff' : 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                    position: 'relative',
                    padding: '0.5rem 0'
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = isActive ? '#fff' : 'var(--text-muted)'}
                >
                  {id}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '2px',
                          background: 'var(--accent)',
                          boxShadow: '0 0 10px rgba(0,229,255,0.5)'
                        }}
                      />
                    )}
                  </AnimatePresence>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile Hamburger Icon */}
        <div 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '30px',
            height: '30px',
            cursor: 'pointer',
            zIndex: 1001
          }}
        >
          <span style={{
            display: 'block', width: '24px', height: '2px', background: '#fff', marginBottom: '6px',
            transition: '0.3s', transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
          }} />
          <span style={{
            display: 'block', width: '24px', height: '2px', background: '#fff', marginBottom: '6px',
            transition: '0.3s', opacity: mobileMenuOpen ? 0 : 1
          }} />
          <span style={{
            display: 'block', width: '24px', height: '2px', background: '#fff',
            transition: '0.3s', transform: mobileMenuOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none'
          }} />
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(7, 7, 10, 0.95)',
              backdropFilter: 'blur(20px)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2rem'
            }}
          >
            {['about', 'experience', 'work', 'contact'].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(id); }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: activeSection === id ? 'var(--accent)' : '#fff',
                  textDecoration: 'none'
                }}
              >
                {id}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
