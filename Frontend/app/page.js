

import dynamic from 'next/dynamic';

// ── Global UI ─────────────────────────────────────────────────────────
import CustomCursor   from '@/components/ui/CustomCursor';
import ScrollProgress from '@/components/ui/ScrollProgress';
import Navbar         from '@/components/ui/Navbar';
import LoadingScreen  from '@/components/ui/LoadingScreen';
import CinematicBackground from '@/components/ui/CinematicBackground';
import LenisProvider  from '@/components/ui/LenisProvider';
import SocialSidebar  from '@/components/ui/SocialSidebar';

// ── Sections (all dynamic + no SSR) ───────────────────────────────────
const Hero        = dynamic(() => import('@/components/sections/Hero'),        { ssr: false });
const About       = dynamic(() => import('@/components/sections/About'),       { ssr: false });
const Experience  = dynamic(() => import('@/components/sections/Skills'),      { ssr: false });
const Work        = dynamic(() => import('@/components/sections/Portfolio'),   { ssr: false });
const Contact     = dynamic(() => import('@/components/sections/Contact'),     { ssr: false });

export default function HomePage() {
  return (
    <LenisProvider>
      {/* Global Overlays */}
      <LoadingScreen />
      <CinematicBackground />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <SocialSidebar />

      {/* Page */}
      <main>
        <Hero />
        <About />
        <Experience />
        <Work />
        <Contact />
      </main>
    </LenisProvider>
  );
}
