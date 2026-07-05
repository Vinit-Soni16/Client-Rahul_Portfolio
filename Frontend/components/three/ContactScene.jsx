'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Environment, Text, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useInView } from 'react-intersection-observer';

function AtSymbols({ count = 12 }) {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      groupRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: count }).map((_, i) => {
        const theta = (i / count) * Math.PI * 2;
        const radius = 6 + Math.random() * 4;
        const x = Math.cos(theta) * radius;
        const y = -6 + Math.random() * 12;
        const z = Math.sin(theta) * radius;

        return (
          <Float key={i} speed={1.5} rotationIntensity={1} floatIntensity={1}>
            <Text
              position={[x, y, z]}
              rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
              fontSize={1 + Math.random() * 1.5}
              color="#00E5FF"
              fillOpacity={0.1}
              outlineWidth={0.015}
              outlineColor="#00E5FF"
            >
              @
            </Text>
          </Float>
        );
      })}
    </group>
  );
}

function ContactSceneContent() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#00E5FF" />
      <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#0066FF" />
      
      <AtSymbols count={8} />

      <Sparkles count={100} scale={15} size={4} speed={0.2} opacity={0.3} color="#00E5FF" />
      <Sparkles count={50} scale={15} size={4} speed={0.2} opacity={0.3} color="#00E5FF" />
    </>
  );
}

export default function ContactScene() {
  const { ref, inView } = useInView({ rootMargin: '400px', triggerOnce: false });

  return (
    <div ref={ref} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 0 }}>
      {inView && (
        <Canvas dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: 'high-performance' }} performance={{ min: 0.5 }}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
          <ContactSceneContent />
        </Canvas>
      )}
    </div>
  );
}
