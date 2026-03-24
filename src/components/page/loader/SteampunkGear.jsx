const SteampunkGear = ({ radius, width, speed, color, spokes = 6 }) => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * speed;
    }
  });

  const gearParts = useMemo(() => ({
    teeth: Array.from({ length: 40 }),
    spokeArray: Array.from({ length: spokes })
  }), [spokes]);

  return (
    <group ref={meshRef}>
      {/* 1. Внешний обод (Тонкое кольцо) */}
      <Torus args={[radius, width, 16, 100]}>
        <meshStandardMaterial color={color} metalness={1} roughness={0.1} />
      </Torus>

      {/* 2. Внутренний обод (Чтобы шестерня казалась толще и сложнее) */}
      <Torus args={[radius * 0.9, width * 0.5, 16, 100]}>
        <meshStandardMaterial color={color} metalness={1} roughness={0.2} />
      </Torus>

      {/* 3. Зубцы (Прикреплены к внешнему ободу) */}
      {gearParts.teeth.map((_, i) => (
        <mesh 
          key={`tooth-${i}`} 
          rotation={[0, 0, (i * Math.PI * 2) / 40]} 
          position={[radius, 0, 0]}
        >
          {/* boxGeometry: [ширина, высота, толщина] */}
          <boxGeometry args={[width * 2.5, width * 1.5, width * 3]} />
          <meshStandardMaterial color={color} metalness={1} roughness={0.3} />
        </mesh>
      ))}

      {/* 4. Спицы (Соединяют центр с ободом, оставляя пустое пространство) */}
      {gearParts.spokeArray.map((_, i) => (
        <mesh 
          key={`spoke-${i}`} 
          rotation={[0, 0, (i * Math.PI * 2) / spokes]}
          // Смещаем спицу так, чтобы она шла от центра к краю
          position={[radius / 2, 0, 0]} 
        >
          <boxGeometry args={[radius, width * 0.3, width * 0.2]} />
          <meshStandardMaterial color={color} metalness={1} roughness={0.2} />
        </mesh>
      ))}
      
      {/* 5. Маленькая втулка в центре каждой шестерни */}
      <Torus args={[width * 2, width * 0.5, 16, 32]}>
        <meshStandardMaterial color={color} metalness={1} roughness={0.1} />
      </Torus>
    </group>
  );
};