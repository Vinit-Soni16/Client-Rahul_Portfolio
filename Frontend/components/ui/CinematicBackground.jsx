'use client';
import { Canvas } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';

export default function CinematicBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', backgroundColor: '#040406' }}>
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5] }}>
        <fog attach="fog" args={['#040406', 2, 12]} />
        
        {/* Cinematic dust particles floating slowly */}
        <Sparkles count={250} scale={15} size={2} speed={0.4} opacity={0.5} color="#00E5FF" />
        <Sparkles count={150} scale={15} size={4} speed={0.2} opacity={0.2} color="#0066FF" />
        
        {/* Deep background stars */}
        <Stars radius={50} depth={30} count={2500} factor={3} saturation={0} fade speed={0.5} />
      </Canvas>
      
      {/* Vignette Overlay for deeper cinematic look */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, transparent 0%, #040406 120%)',
        zIndex: 1
      }} />
    </div>
  );
}
