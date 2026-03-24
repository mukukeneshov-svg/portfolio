"use client";
import React, { Suspense, useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Sparkles, Float, Torus } from '@react-three/drei';
import scss from "./Loading.module.scss";

// --- Вспомогательный компонент шестерни ---
const SteampunkGear = ({ radius, width, speed, color, spokes = 6 }) => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * speed;
    }
  });

  const gearParts = useMemo(() => {
    const teeth = Array.from({ length: 40 });
    const spokeArray = Array.from({ length: spokes });
    return { teeth, spokeArray };
  }, [spokes]);

  return (

    <group ref={meshRef} >
      <Torus args={[radius, width, 16, 100]}>
        <meshStandardMaterial color={color} metalness={1} roughness={0.2} />
      </Torus>

      {gearParts.teeth.map((_, i) => (
        <mesh 
          key={`tooth-${i}`} 
          rotation={[0, 0, (i * Math.PI * 2) / 40]} 
          position={[radius, 0, 0]}
        >
          <boxGeometry args={[width * 2, width * 1.2, width * 2.5]} />
          <meshStandardMaterial color={color} metalness={1} roughness={0.3} />
        </mesh>
      ))}

      {gearParts.spokeArray.map((_, i) => (
        <mesh 
          key={`spoke-${i}`} 
          rotation={[0, 0, (i * Math.PI * 2) / spokes]}
          position={[radius / 2, 0, 0]}
        >
          <boxGeometry args={[radius, width * 0.5, width * 0.5]} />
          <meshStandardMaterial color={color} metalness={1} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
};

// --- Основная 3D сцена ---
const SceneContent = () => {
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Эффект приближения камеры
    state.camera.position.z = 22 - Math.min(t * 0.5, 5); 
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <group rotation={[0.4, 0.2, 0]}>
          {/* Кольца механизмов */}
          <SteampunkGear radius={10} width={0.35} speed={0.15} color="#5a4025" spokes={12} />
          <SteampunkGear radius={7.5} width={0.3} speed={-0.25} color="#8a6d3b" spokes={8} />
          <SteampunkGear radius={5} width={0.25} speed={0.4} color="#d4af37" spokes={6} />
          <SteampunkGear radius={3} width={0.2} speed={-0.8} color="#fcc201" spokes={4} />

          {/* Ядро */}
          <mesh>
            <sphereGeometry args={[0.7, 32, 32]} />
            <meshStandardMaterial color="#ff2200" emissive="#ff8800" emissiveIntensity={10} />
          </mesh>
          <pointLight intensity={100} distance={15} color="#ff4400" />
        </group>
      </Float>
      <Sparkles count={200} scale={25} size={1.8} speed={0.2} color="#fcc201" />
    </>
  );
};

// --- Главный экспорт ---
const Loading = ({ onFinished }) => {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Показываем прелоадер 7 секунд
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        if (onFinished) onFinished();
      }, 1000); // Время на fade-out
    }, 7000); 

    return () => clearTimeout(timer);
  }, [onFinished]);

  if (!mounted) return null;

  return (
    <div className={`${scss.preloaderWrapper} ${!isVisible ? scss.fadeOut : ''}`}>
      <div className={scss.canvasContainer}>
        <Canvas camera={{ position: [0, 0, 25] }} shadows>
          <color attach="background" args={['#080604']} />
          <ambientLight intensity={0.5} />
          <spotLight position={[15, 20, 10]} angle={0.3} intensity={1000} color="#ffaa00" />
          
          <Suspense fallback={null}>
            <SceneContent />
            <Environment preset="night" />
          </Suspense>
        </Canvas>
      </div>
      
      <div className={scss.textContainer}>
        <h1 className={scss.loadingText}>Winter is Coming</h1>
        <div className={scss.progressBar}>
          <div className={scss.progressFill}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;