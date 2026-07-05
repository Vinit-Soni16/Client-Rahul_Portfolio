'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, PerspectiveCamera, Sparkles } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import { useInView } from 'react-intersection-observer';

function PremiumMesh() {
  const meshRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.05;
    meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
  });

  return (
    <group ref={meshRef} position={[0, 0, -3]}>
      <mesh>
        <torusKnotGeometry args={[5, 1.5, 150, 32]} />
        <meshStandardMaterial 
          color="#001133"
          emissive="#0066FF"
          emissiveIntensity={0.4}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Outer floating cyan particles */}
      <Sparkles count={150} scale={20} size={4} speed={0.4} opacity={0.6} color="#00E5FF" />
      <Sparkles count={150} scale={20} size={2} speed={0.2} opacity={0.3} color="#0066FF" />
    </group>
  );
}

export default function HeroScene() {
  const { ref, inView } = useInView({ rootMargin: '400px', triggerOnce: false });

  return (
    <div ref={ref} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 0 }}>
      {inView && (
        <Canvas dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: 'high-performance' }} performance={{ min: 0.5 }}>
          <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
          
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#00E5FF" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#0066FF" />
          
          <Stars radius={50} depth={50} count={1000} factor={3} saturation={0} fade speed={1} />
          
          <PremiumMesh />
          
        </Canvas>
      )}
    </div>
  );
}
