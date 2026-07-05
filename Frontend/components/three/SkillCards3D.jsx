'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, RoundedBox, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useInView } from 'react-intersection-observer';

const SKILLS_DATA = [
  { name: 'Premiere Pro', position: [-2.2, 1.2, 0], color: '#00E5FF' },
  { name: 'Photoshop', position: [2.2, 1.2, 0], color: '#0066FF' },
  { name: 'After Effects', position: [-2.4, -0.6, 0.5], color: '#AA00FF' },
  { name: 'Lightroom', position: [2.4, -0.6, 0.5], color: '#00E5FF' },
  { name: 'Media Encoder', position: [0, 2.2, -1], color: '#ffffff' },
  { name: 'VFX & Motion', position: [0, -1.8, 0.2], color: '#0066FF' },
];

function SkillCard({ name, position, color }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle individual rotations
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5 + position[0]) * 0.1;
      meshRef.current.rotation.y = Math.cos(state.clock.getElapsedTime() * 0.5 + position[1]) * 0.1;
      
      // pop out effect
      const targetZ = hovered ? position[2] + 0.8 : position[2];
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.1);
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        {/* Glassmorphic box */}
        <RoundedBox
          args={[3.0, 1.0, 0.1]}
          radius={0.05}
          smoothness={2}
        >
          <meshPhysicalMaterial
            color={hovered ? '#121218' : '#07070a'}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.8}
            emissive={hovered ? color : '#000000'}
            emissiveIntensity={hovered ? 0.5 : 0}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
          />
        </RoundedBox>

        {/* Glow Border Frame */}
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[3.05, 1.05]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={hovered ? 0.8 : 0.1}
            side={THREE.DoubleSide}
          />
        </mesh>

        <Text
          position={[0, 0, 0.08]}
          fontSize={0.22}
          color={hovered ? "#ffffff" : "#cccccc"}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.15}
        >
          {name.toUpperCase()}
        </Text>
      </Float>
    </group>
  );
}

function CardsGroup() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {SKILLS_DATA.map((skill, idx) => (
        <SkillCard key={idx} {...skill} />
      ))}
    </group>
  );
}

export default function SkillCards3D() {
  const { ref, inView } = useInView({ rootMargin: '400px', triggerOnce: false });

  return (
    <div ref={ref} className="w-full h-[400px] md:h-[500px] relative">
      {inView && (
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, powerPreference: 'high-performance' }}
          performance={{ min: 0.5 }}
        >
          <ambientLight intensity={0.2} />
          
          {/* Cinematic Lighting */}
          <pointLight position={[5, 5, 5]} intensity={2} color="#00E5FF" />
          <pointLight position={[-5, -5, 5]} intensity={1.5} color="#0066FF" />
          <directionalLight position={[0, 5, 2]} intensity={0.5} color="#ffffff" />

          <CardsGroup />

          <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2 + 0.2} minPolarAngle={Math.PI / 2 - 0.2} />
        </Canvas>
      )}
    </div>
  );
}
