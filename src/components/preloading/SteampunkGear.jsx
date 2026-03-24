import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Torus } from '@react-three/drei';

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
    <group ref={meshRef}>
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

export default SteampunkGear;