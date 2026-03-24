"use client";
import React, { Suspense, useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Sparkles, Torus } from '@react-three/drei';
import * as THREE from 'three';
import scss from "./SectionLoader.module.scss";

const SteampunkGear = ({ radius, width, speed, color, spokes = 6 }) => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) meshRef.current.rotation.z += delta * speed;
  });

  const gearParts = useMemo(() => ({
    teeth: Array.from({ length: 40 }),
    spokeArray: Array.from({ length: spokes })
  }), [spokes]);

  return (
    
    <group ref={meshRef}>
      <Torus args={[radius, width, 16, 100]}>
        <meshStandardMaterial color={color} metalness={1} roughness={0.1} />
      </Torus>
      <Torus args={[radius * 0.9, width * 0.5, 16, 100]}>
        <meshStandardMaterial color={color} metalness={1} roughness={0.2} />
      </Torus>
      {gearParts.teeth.map((_, i) => (
        <mesh key={`t-${i}`} rotation={[0, 0, (i * Math.PI * 2) / 40]} position={[radius, 0, 0]}>
          <boxGeometry args={[width * 2.5, width * 1.5, width * 3]} />
          <meshStandardMaterial color={color} metalness={1} roughness={0.3} />
        </mesh>
      ))}
      {gearParts.spokeArray.map((_, i) => (
        <mesh key={`s-${i}`} rotation={[0, 0, (i * Math.PI * 2) / spokes]} position={[radius / 2, 0, 0]}>
          <boxGeometry args={[radius, width * 0.3, width * 0.2]} />
          <meshStandardMaterial color={color} metalness={1} roughness={0.2} />
        </mesh>
      ))}
      <Torus args={[width * 2, width * 0.5, 16, 32]}>
        <meshStandardMaterial color={color} metalness={1} roughness={0.1} />
      </Torus>
    </group>
  );
};

const SceneContent = () => {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.6;
      groupRef.current.rotation.x = 0.4 + Math.cos(t * 0.2) * 0.1;
      groupRef.current.rotation.y = 0.2 + Math.sin(t * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <SteampunkGear radius={10} width={0.35} speed={0.1} color="#5a4d3f" spokes={12} />
      <SteampunkGear radius={7.5} width={0.3} speed={-0.2} color="#b89344" spokes={8} />
      <SteampunkGear radius={5} width={0.25} speed={0.4} color="#d4af37" spokes={6} />
      <SteampunkGear radius={3} width={0.2} speed={-0.8} color="#fcc201" spokes={4} />

      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="#ffaa00" emissive="#ff4400" emissiveIntensity={20} />
      </mesh>
      
      <pointLight intensity={80} distance={15} color="#ff6600" />
    </group>
  );
};

const SectionLoader = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <section className={scss.sectionWrapper}>
      <div className={scss.canvasContainer}>
        <Canvas camera={{ position: [0, 0, 25], fov: 45 }} gl={{ alpha: true }}>
          <fog attach="fog" args={['#5d7a92', 15, 35]} />
          
          <ambientLight intensity={0.5} />
          <spotLight position={[20, 20, 10]} angle={0.3} intensity={1200} color="#b0d4ff" />
          
          <Suspense fallback={null}>
            <SceneContent />
            <Sparkles count={150} scale={25} size={2} speed={0.4} color="#fff" />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>

      <div className={scss.contentOverlay}>
        <h2 className={scss.sectionTitle}>Winter is Coming</h2>
        <div className={scss.separator}></div>
      </div>
    </section>
  );
};

export default SectionLoader;