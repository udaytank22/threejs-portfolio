import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Ocean() {
  const waterRef = useRef();

  useFrame((state) => {
    if (waterRef.current) {
      // Simple wave animation
      waterRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1 - 0.5;
    }
  });

  return (
    <mesh ref={waterRef} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[1000, 1000, 64, 64]} />
      <meshStandardMaterial 
        color="#006994" 
        roughness={0.1} 
        metalness={0.8}
        transparent={true}
        opacity={0.9}
      />
    </mesh>
  );
}
