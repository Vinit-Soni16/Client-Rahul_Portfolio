'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useInView } from 'react-intersection-observer';

// Glowing abstract fragments
function Fragments({ count = 40 }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 15 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -20 + Math.random() * 40;
      const yFactor = -20 + Math.random() * 40;
      const zFactor = -20 + Math.random() * 40;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.max(0.3, Math.cos(t));
      
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    if (meshRef.current) {
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <dodecahedronGeometry args={[0.4, 0]} />
      <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={0.8} wireframe />
    </instancedMesh>
  );
}

function AboutSceneContent() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#00E5FF" />
      <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#0066FF" />
      
      <Float speed={1} rotationIntensity={1} floatIntensity={1.5}>
        <Fragments count={25} />
      </Float>

      <Sparkles count={50} scale={20} size={3} speed={0.2} opacity={0.4} color="#0066FF" />
    </>
  );
}

export default function AboutScene() {
  const { ref, inView } = useInView({ rootMargin: '400px', triggerOnce: false });

  return (
    <div ref={ref} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 0 }}>
      {inView && (
        <Canvas dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: 'high-performance' }} performance={{ min: 0.5 }}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
          <AboutSceneContent />
        </Canvas>
      )}
    </div>
  );
}
